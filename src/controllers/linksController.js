const linksServices = require('../services/linksServices'); 

const controller = {
	getLinks: async (req, res)=> {
		res.json(await linksServices.getLinks(req.params.id,req.query,req.session));
	},
	createLink: async (req, res)=> {
		const response = (await linksServices.createLink(req.body,req.session.userId));
		const linksScrappedTotal = await linksServices.scrapeLink(req.body.url,response.data.id);
		res.json({link: response, linksRelatedTotal: linksScrappedTotal});
	},
	updateLink: async (req, res)=> {
		res.json(await linksServices.updateLink(req.body));
	},
	deleteLink: async (req, res)=> {
		res.json(await linksServices.deleteLink(req.body));
	},
};

module.exports = controller;