const bd = require('../database/models'); 
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

const services = {

    getUsers: (userId) => {
        return userId? bd.User.findByPk(userId) : bd.User.findAll({where: {deleted_at: null}});
    },
    
    createUser: async (userData) => {

        const userSearch = await bd.User.findOne({where: {userName: userData.userName}});

        if(userSearch){
            return {code: 409, message: 'user name already sing up. Try another one'};
        }
  
        await bd.User.create({
            userName: userData.userName,
            password: bcrypt.hashSync(userData.password,10),
            type: "normal",
            created_at: moment.utc(),
            updated_at: moment.utc(),
            deleted_at: null,
        });
        
        return {code: 200, message: 'user created'};
    },

    loginUser: async (userData,req) => {
       const userSearch = await bd.User.findOne({where: {userName: userData.userName}});

        if (!userSearch){
            return {code: 404, message: 'user name not found'};
        }

        if(bcrypt.compareSync(userData.password, userSearch.password)){
            req.session.userId = userSearch.id;
            req.session.userName = userSearch.userName;
            return {code: 200, message: 'access correct', data: userSearch};
        }

        return {code: 401, message: 'password incorrect'};
    },

    recoverPasswordUser: async (userData) => {
        const randomNumbersString = (Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1)).join(',');
        await bd.User.update(
            {password: randomNumbersString},
            {where: { id: userData.id }}
        );

        return {code: 200, message: 'password changed', data: randomNumbersString};
    },

    updateUser: async (userData) => {
        await bd.User.update({
            userName: userData.userName,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
        });

        return {code: 200, message: 'user data modify'};
    },

    deleteUser: async (userData) => {
        await bd.User.update(
            {deleted_at: moment.utc()},
            {where: { id: userData.id }}
        );

        return {code:200, message: 'user deleted'};
    }
      
}


module.exports = services;