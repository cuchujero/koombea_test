const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const userServices = require('../src/services/usersServices'); 
const bd = require('../src/database/models'); 
const expect = chai.expect;

describe('User Services', () => {
  describe('getUsers', () => {
    it('should return all users when userId is not provided', async () => {
      const findAllStub = sinon.stub(bd.User, 'findAll');
      findAllStub.returns([
        { id: 1, userName: 'user1' },
        { id: 2, userName: 'user2' },
      ]);

      const result = await userServices.getUsers(null);

      expect(result).to.deep.equal([
        { id: 1, userName: 'user1' },
        { id: 2, userName: 'user2' },
      ]);
    });

    it('should return a user by ID when userId is provided', async () => {
      const findByPkStub = sinon.stub(bd.User, 'findByPk');
      findByPkStub.withArgs(1).returns({ id: 1, userName: 'user1' });
      const result = await userServices.getUsers(1);
      expect(result).to.deep.equal({ id: 1, userName: 'user1' });
    });
    afterEach(() => {
      sinon.restore();
    });
  });

  describe('createUser', () => {
    
it('should return 200 and "user created" when user does not exist', async () => {
    const findOneStub = sinon.stub(bd.User, 'findOne');
    findOneStub.returns(Promise.resolve(null));
  
    const userObject = {
      id: 1,
      userName: 'testuser',
      password: bcrypt.hashSync('password', 10),
      type: 'normal',
      created_at: moment.utc(),
      updated_at: moment.utc(),
      deleted_at: null,
    };
  
    const createStub = sinon.stub(bd.User, 'create');
    createStub.returns(Promise.resolve(userObject));
  
    const userData = {
      userName: 'testuser',
      password: 'password',
    };
  
    const result = await userServices.createUser(userData);
  
    sinon.assert.calledOnce(findOneStub);
    sinon.assert.calledOnce(createStub);
  
    expect(result).to.deep.equal({ code: 200, message: 'user created' });
  });

    it('should return 409 and "user name already signed up" when user already exists', async () => {
      const findOneStub = sinon.stub(bd.User, 'findOne');
      findOneStub.returns({
        id: 1,
        userName: 'testuser',
        password: bcrypt.hashSync('password', 10),
        type: 'normal',
        created_at: moment.utc(),
        updated_at: moment.utc(),
        deleted_at: null,
      });

      const userData = {
        userName: 'testuser',
        password: 'password',
      };

      const result = await userServices.createUser(userData);

      expect(result.code).equal(409);
    });

    it('should handle errors during user creation', async () => {
      const findOneStub = sinon.stub(bd.User, 'findOne');
      findOneStub.throws(new Error('Database error'));

      const userData = {
        userName: 'testuser',
        password: 'password',
      };

      try {
        await userServices.createUser(userData);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });

    afterEach(() => {
      sinon.restore();
    });
  });

  describe('loginUser', () => {

    it('should return 200 and "access correct" when username and password are correct', async () => {
        const userData = {
          userName: 'testuser',
          password: 'correctpassword',
        };
      
        const req = { session: {} };
      
        const findOneStub = sinon.stub(bd.User, 'findOne');
        findOneStub.returns({
          id: 1,
          userName: 'testuser',
          password: bcrypt.hashSync('correctpassword', 10),
        });
      
        const result = await userServices.loginUser(userData, req);
      
        expect(result.code).equal(200);
      
        findOneStub.restore();
      });

    it('should return 404 and "user name not found" when the username does not exist', async () => {
      const findOneStub = sinon.stub(bd.User, 'findOne');
      findOneStub.returns(null);

      const userData = {
        userName: 'nonexistentuser',
        password: 'password',
      };

      const req = { session: {} };

      const result = await userServices.loginUser(userData, req);

      expect(result).to.deep.equal({ code: 404, message: 'user name not found' });
    });

    it('should return 401 and "password incorrect" when the password is incorrect', async () => {
      const findOneStub = sinon.stub(bd.User, 'findOne');
      findOneStub.returns({
        id: 1,
        userName: 'testuser',
        password: bcrypt.hashSync('correctpassword', 10), // Correct password
        type: 'normal',
        created_at: moment.utc(),
        updated_at: moment.utc(),
        deleted_at: null,
      });

      const userData = {
        userName: 'testuser',
        password: 'incorrectpassword',
      };

      const req = { session: {} };

      const result = await userServices.loginUser(userData, req);

      expect(result).to.deep.equal({ code: 401, message: 'password incorrect' });
    });

    it('should handle errors during login', async () => {
      const findOneStub = sinon.stub(bd.User, 'findOne');
      findOneStub.throws(new Error('Database error'));

      const userData = {
        userName: 'testuser',
        password: 'password',
      };

      const req = { session: {} };

      try {
        await userServices.loginUser(userData, req);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });

    afterEach(() => {
      sinon.restore();
    });
  });

});
