const bd = require('../database/models'); 
const moment = require('moment-timezone');
const axios = require('axios');
const cheerio = require('cheerio');

const services = {

    getLinks: (LinkId,req,session) => {

        if (!req.limit) req.limit=10;
        if (!req.offset) req.offset=0;

        if (req.userId){
            return bd.Link.findAll({include: [{association: 'user'}, {association: 'linksScrappers'}], where: {User_id: req.userId},  limit: req.limit, offset: req.offset, });
        }

        if ((session.userId) && (req.userSession)){
            return bd.Link.findAll({include: [{association: 'user'}, {association: 'linksScrappers'}], where: {User_id: session.userId},  limit: req.limit, offset: req.offset,});
        }

        return LinkId? bd.Link.findByPk(LinkId,{include: [{association: 'user'}, {association: 'linksScrappers', limit: req.limit, offset: req.offset}]}) : bd.Link.findAll();
    },

    createLink: async (linkData,userId) => {
        let linkCreated = await bd.Link.create({
            url: linkData.url,
            created_at: moment.utc(),
            User_id: userId
        });
        
        return {code: 200, message: 'link created', data: linkCreated};
    },

    updateLink: async (linkData) => {
        await bd.Link.update({
            url: linkData.url
        });

        return {code: 200, message: 'link data modify'};
    },

    deleteLink: async (linkData) => {
        await bd.Link.destroy(
            {where: { id: linkData.id }}
        );

        return {code:200, message: 'link deleted'};
    },

    scrapeLink: async (url,linkId) => {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
                 
            $('a').each(async (index, element) => {
              const href = $(element).attr('href');
              const body = $(element).clone().children().remove().end().text();
              if (href && body) {
                await bd.LinkScrapper.create({
                    urlScrapped: href,
                    urlReference: body.trim(),
                    Link_id: linkId
                });            
               
              }
            });
            return $('a').length;    
          } catch (error) {
            console.error('Error:', error);
          }
    }
      
}


module.exports = services;