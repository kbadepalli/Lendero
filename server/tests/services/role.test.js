const roleService = require('../../services/role');
const testHelpers = require('../helpers');

beforeAll(async () => {
  await testHelpers.generateRoles();
});

afterAll(async () => {
  await testHelpers.destroyRoles();
});

describe('Role', () => {
  const expectedRole = {
    id: 1,
    name: 'Admin',
  };

  describe('Fetch Role', () => {
    test('Find and return role by id', async () => {
      const [role] = await roleService.getRole(1);

      expect(role).not.toBeNull();

      expect(role).toMatchObject(expectedRole);
    });

    test('Fails to find a role with provided id', async () => {
      const [role] = await roleService.getRole(1111);

      expect(role).toBeFalsy();
    });

    test('Fails to find a role with provided id and returns a message', async () => {
      const id = 1903;

      const expectedMessage = `Role with id: ${id} is not found`;

      const [role, message] = await roleService.getRole(id);

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Sanitize Role', () => {
    test('Removes active, createdAt, and updatedAt attributes', async () => {
      const [roleInfo] = await roleService.getRole(1);

      const sanatizedRole = roleService.sanitizeRole(roleInfo);

      expect(roleInfo).not.toBeNull();

      expect(sanatizedRole).toEqual(expectedRole);
    });
  });

  describe('Role exists', () => {
    test('Return true if the role already exists', async () => {
      const id = 1;

      const [result] = await roleService.exists(id);

      expect(result).toBeTruthy();
    });

    test('Return false if the role does not exists', async () => {
      const id = 666;

      const [result] = await roleService.exists(id);

      expect(result).toBeFalsy();
    });
  });

  describe('Create Role', () => {
    test('Creates and returns role with provided attributes', async () => {
      const roleEntry = {
        name: 'sample role',
      };

      const expectedNewRole = {
        ...roleEntry,
        id: expect.any(Number),
      };

      const [role] = await roleService.addRole(roleEntry);

      expect(role).not.toBeNull();

      expect(role).toMatchObject(expectedNewRole);
    });
  });

  describe('Update Role', () => {
    test('Update Role by id and return role', async () => {
      const input = {
        id: 4,
        name: 'Executive S',
      };

      const expectedRole = {
        name: 'Executive S',
      };

      const [role, message] = await roleService.updateRole(input.id, input);

      expect(role).not.toBeNull();

      expect(role).toMatchObject(expectedRole);
    });

    test('Failed to update role and returns a message', async () => {
      const input = {
        id: 444444,
        name: 'Tabbie D',
      };

      const [role, message] = await roleService.updateRole(input.id, input);

      const expectedMessage = `Unable to update the role`;

      expect(role).toBeFalsy();

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );
    });
  });

  describe('Delete Role', () => {
    test('Delete Role by id and return true', async () => {
      const id = 4;

      const [role, message] = await roleService.deleteRole(id);

      expect(role).toBeTruthy();
    });

    test('Failed to delete role and returns a message', async () => {
      const id = 444444;

      const [role, message] = await roleService.deleteRole(id);

      const expectedMessage = `Unable to delete the role`;

      expect(message).toEqual(
        expect.objectContaining({
          message: expectedMessage,
        })
      );

      expect(role).toBeFalsy();
    });
  });
});
