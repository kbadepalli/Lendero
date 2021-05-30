const clientService = require('../../services/client');
const loanService = require('../../services/loan');
const testHelpers = require('../helpers');

beforeAll(async () => {
  try {
    await testHelpers.generateLoans();
  } catch (error) {
    console.log('ERROR: ', error);
  }
});

afterAll(async () => {
  await testHelpers.destroyLoans();
});

describe('Loan', () => {
  const expectedLoan = {
    id: 1,
    loanName: expect.any(String),
  };

  describe('Fetch Loan', () => {
    test('Find and return loan by id', async () => {
      const [loan, message] = await loanService.getLoan(1);

      expect(loan).not.toBeNull();

      expect(loan).toMatchObject(expectedLoan);
    });

    test('Fails to find a loan with provided id', async () => {
      const [loan] = await loanService.getLoan(1111);

      expect(loan).toBeFalsy();
    });

    test('Fails to find a loan with provided id and returns a message', async () => {
      const id = 1903;

      const expectedMessage = `Loan with id: ${id} is not found`;

      const [loan, message] = await loanService.getLoan(id);

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Sanitize Loan', () => {
    test('Removes createdAt and updatedAt attributes', async () => {
      const [loanInfo] = await loanService.getLoan(1);

      const sanatizedLoan = loanService.sanitizeLoan(loanInfo);

      expect(loanInfo).not.toBeNull();

      expect(sanatizedLoan).toMatchObject(expectedLoan);
    });
  });

  describe('Create Loan', () => {
    test('Creates and returns loan with provided attributes', async () => {
      const loanEntry = {
        documentNumber: '6958',
        loanAmount: '90789.0000',
        dateOfLoan: '2012-09-05',
        rateOfInterest: '1.1800',
        clientId: 1,
        loanPeriod: 46,
        loanName: 'Personal Loan',
      };

      const expectedNewLoan = {
        ...loanEntry,
        id: expect.any(Number),
      };

      const [loan] = await loanService.addLoan(loanEntry);

      expect(loan).not.toBeNull();

      expect(loan).toMatchObject(expectedNewLoan);
    });
  });

  describe('Update Loan', () => {
    test('Update Loan by id and return loan', async () => {
      const input = {
        id: 2,
        loanName: 'Personal Loan',
      };

      const expectedLoan = {
        loanName: 'Personal Loan',
      };

      const [loan, message] = await loanService.updateLoan(input.id, input);

      expect(loan).not.toBeNull();

      expect(loan).toMatchObject(expectedLoan);
    });

    test('Failed to update loan and returns a message', async () => {
      const input = {
        id: 444444,
        loanName: 'Personal Loan',
      };

      const [loan, message] = await loanService.updateLoan(input.id, input);

      const expectedMessage = `Unable to update the loan`;

      expect(loan).toBeFalsy();

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Delete Loan', () => {
    test('Delete Loan by id and return true', async () => {
      const id = 4;

      const [loan, message] = await loanService.deleteLoan(id);

      expect(loan).toBeTruthy();
    });

    test('Failed to delete loan and returns a message', async () => {
      const id = 444444;

      const [loan, message] = await loanService.deleteLoan(id);

      const expectedMessage = `Unable to delete the loan`;

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );

      expect(loan).toBeFalsy();
    });
  });
});
