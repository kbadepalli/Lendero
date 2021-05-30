const userService = require('../../services/user');
const authService = require('../../services/auth');
const testHelpers = require('../helpers');

beforeAll(async () => {
  await testHelpers.generateUsers();
  await testHelpers.generateRoles();
});

afterAll(async () => {
  await testHelpers.destroyUsers();
  await testHelpers.destroyRoles();
});

describe('User', () => {
  const expectedUser = {
    id: 1,
    fullName: 'Kaitlynn Meas',
    email: 'kmeas0@adobe.com',
    roleId: 45,
    active: 1,
    role: { id: 45, name: 'Statistician IV' },
  };

  describe('Fetch User', () => {
    test('Find and return user by id', async () => {
      const [user] = await userService.getUser(1);

      expect(user).not.toBeNull();

      expect(user).toMatchObject(expectedUser);
    });

    test('Fails to find a user with provided id', async () => {
      const [user] = await userService.getUser(1111);

      expect(user).toBeFalsy();
    });

    test('Fails to find a user with provided id and returns a message', async () => {
      const id = 1903;

      const expectedMessage = `User with id: ${id} is not found`;

      const [user, message] = await userService.getUser(id);

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });

    test('Find and return user by email', async () => {
      const [user] = await userService.getUserByEmail('kmeas0@adobe.com');

      expect(user).not.toBeNull();

      expect(user).toMatchObject(expectedUser);
    });

    test('Fails to find a user with provided email', async () => {
      const [user] = await userService.getUserByEmail('something@thing.com');

      expect(user).toBeFalsy();
    });

    test('Fails to find a user with provided email and returns a message', async () => {
      const email = 'something@thing.com';

      const expectedMessage = `User with email: ${email} is not found`;

      const [user, message] = await userService.getUserByEmail(email);

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Sanitize User', () => {
    test('Removes password, resetPasswordToken, createdAt, and updatedAt', async () => {
      const [userInfo] = await userService.getUser(1);

      const sanatizedUser = userService.sanitizeUser(userInfo);

      expect(userInfo).not.toBeNull();

      expect(sanatizedUser).toEqual(expectedUser);
    });
  });

  describe('User exists', () => {
    test('Return true if the user already exists', async () => {
      const userEmail = 'kmeas0@adobe.com';

      const [result] = await userService.exists({ email: userEmail });

      expect(result).toBeTruthy();
    });

    test('Return false if the user does not exists', async () => {
      const userEmail = 'something@thing.com';

      const [result] = await userService.exists({ email: userEmail });
      console.log(result);
      expect(result).toBeFalsy();
    });
  });

  describe('Create User', () => {
    test('Creates and returns user with provided attributes', async () => {
      const userEntry = {
        fullName: 'Kaitlynn Meas',
        email: 'newUser@kroneo.com',
        roleId: 45,
      };

      const expectedNewUser = {
        ...userEntry,
        active: 1,
        role: {},
      };

      const [user] = await userService.addUser(userEntry);

      expect(user).not.toBeNull();

      expect(user).toMatchObject(expectedNewUser);
    });

    test('Creates a user and hash password if provided', async () => {
      const input = {
        fullName: 'Kaitlynn Meas',
        email: 'newUser@something.com',
        roleId: 45,
        password: 'pwdSomething',
      };

      const expectedNewUser = {
        fullName: 'Kaitlynn Meas',
        email: 'newUser@something.com',
        roleId: 45,
        active: 1,
        role: {},
      };

      const hashPassword = authService.hashPassword(input.password);

      const [user] = await userService.addUser(input);

      expect(user).toMatchObject(expectedNewUser);

      expect(hashPassword !== input.password).toBeTruthy();
    });
  });

  describe('Update User', () => {
    test('Update User by id and return user', async () => {
      const input = {
        id: 4,
        fullName: 'Tabbie D',
      };

      const expectedUser = {
        fullName: 'Tabbie D',
        email: 'tdenial3@ebay.co.uk',
        roleId: 30,
        active: 1,
        role: {},
      };

      const [user, message] = await userService.updateUser(input.id, input);

      expect(user).not.toBeNull();

      expect(user).toMatchObject(expectedUser);
    });

    test('Failed to update user and returns a message', async () => {
      const input = {
        id: 444444,
        fullName: 'Tabbie D',
      };

      const [user, message] = await userService.updateUser(input.id, input);

      const expectedMessage = `Unable to update the user`;

      expect(user).toBeFalsy();

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Delete User', () => {
    test('Delete User by id and return true', async () => {
      const id = 4;

      const [user, message] = await userService.deleteUser(id);

      expect(user).toBeTruthy();
    });

    test('Failed to delete user and returns a message', async () => {
      const id = 444444;

      const [user, message] = await userService.deleteUser(id);

      const expectedMessage = `Unable to delete the user`;

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );

      expect(user).toBeFalsy();
    });
  });
});
