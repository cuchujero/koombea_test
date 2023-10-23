const usersServices = require('../services/usersServices'); 

const controller = {
	getUsers: async (req, res)=> {
		res.json(await usersServices.getUsers(req.params.id));
	},
	createUser: async (req, res)=> {
		res.json(await usersServices.createUser(req.body));
	},
	loginUser: async (req, res)=> {
		res.json(await usersServices.loginUser(req.body,req));
	},
	recoverPasswordUser: async (req, res)=> {
		res.json(await usersServices.recoverPasswordUser(req.body));
	},
	updateUser: async (req, res)=> {
		res.json(await usersServices.updateUser(req.body));
	},
	deleteUser: async (req, res)=> {
		res.json(await usersServices.deleteUser(req.body));
	},
};

module.exports = controller;