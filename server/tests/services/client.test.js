const clientService = require('../../services/client');
const testHelpers = require('../helpers');

beforeAll(async () => {
  try {
    await testHelpers.generateClients();
  } catch (error) {
    console.log('ERROR: ', error);
  }
});

afterAll(async () => {
  await testHelpers.destroyClients();
});

describe('Client', () => {
  const expectedClient = {
    id: 1,
    firstName: 'Sandor',
    lastName: 'MacGee',
    email: 'smacgee0@a8.net',
    addressLineOne: '6778 Lakewood Gardens Court',
    city: 'Arvada',
  };

  describe('Fetch Client', () => {
    test('Find and return client by id', async () => {
      const [client, message] = await clientService.getClient(1);

      expect(client).not.toBeNull();

      expect(client).toMatchObject(expectedClient);
    });

    test('Fails to find a client with provided id', async () => {
      const [client] = await clientService.getClient(1111);

      expect(client).toBeFalsy();
    });

    test('Fails to find a client with provided id and returns a message', async () => {
      const id = 1903;

      const expectedMessage = `Client with id: ${id} is not found`;

      const [client, message] = await clientService.getClient(id);

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Sanitize Client', () => {
    test('Removes createdAt and updatedAt attributes', async () => {
      const [clientInfo] = await clientService.getClient(1);

      const sanatizedClient = clientService.sanitizeClient(clientInfo);

      expect(clientInfo).not.toBeNull();

      expect(sanatizedClient).toMatchObject(expectedClient);
    });
  });

  describe('Client exists', () => {
    test('Return true if the client already exists', async () => {
      const email = 'trouzet3@china.com.cn';

      const [result] = await clientService.exists({ email });

      expect(result).toBeTruthy();
    });

    test('Return false if the client does not exists', async () => {
      const email = 'trouzet34535@china.com.cn';

      const [result] = await clientService.exists({ email });

      expect(result).toBeFalsy();
    });
  });

  describe('Create Client', () => {
    test('Creates and returns client with provided attributes', async () => {
      const clientEntry = {
        firstName: 'Sandor',
        lastName: 'MacGee',
        email: 'smacgsdsdsee0@a8.net',
        addressLineOne: '6778 Lakewood Gardens Court',
        addressLineTwo: null,
        city: 'Arvada',
        state: 'Colorado',
        country: 'United States',
        postCode: '80005',
        contactNumber: '303-178-2741',
        workNumber: '702-310-7016',
      };

      const expectedNewClient = {
        ...clientEntry,
        id: expect.any(Number),
      };

      const [client] = await clientService.addClient(clientEntry);

      expect(client).not.toBeNull();

      expect(client).toMatchObject(expectedNewClient);
    });
  });

  describe('Update Client', () => {
    test('Update Client by id and return client', async () => {
      const input = {
        id: 2,
        firstName: 'ConneyWithK',
      };

      const expectedClient = {
        firstName: 'ConneyWithK',
      };

      const [client, message] = await clientService.updateClient(input.id, input);

      expect(client).not.toBeNull();

      expect(client).toMatchObject(expectedClient);
    });

    test('Failed to update client and returns a message', async () => {
      const input = {
        id: 444444,
        firstName: 'ConneyWithK',
      };

      const [client, message] = await clientService.updateClient(input.id, input);

      const expectedMessage = `Unable to update the client`;

      expect(client).toBeFalsy();

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Delete Client', () => {
    test('Delete Client by id and return true', async () => {
      const id = 4;

      const [client, message] = await clientService.deleteClient(id);

      expect(client).toBeTruthy();
    });

    test('Failed to delete client and returns a message', async () => {
      const id = 444444;

      const [client, message] = await clientService.deleteClient(id);

      const expectedMessage = `Unable to delete the client`;

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );

      expect(client).toBeFalsy();
    });
  });
});
