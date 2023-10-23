const chai = require('chai');
const sinon = require('sinon');
const moment = require('moment-timezone');
const axios = require('axios');
const cheerio = require('cheerio');
const linksServices = require('../src/services/linksServices');
const bd = require('../src/database/models');
const expect = chai.expect;

describe('Links Services', () => {
  describe('getLinks', () => {
    it('should return all links when LinkId is not provided', async () => {
      const findAllStub = sinon.stub(bd.Link, 'findAll');
      findAllStub.returns([
        { id: 1, url: 'https://example.com/link1' },
        { id: 2, url: 'https://example.com/link2' },
      ]);

      const req = { limit: 10, offset: 0 };
      const result = await linksServices.getLinks(null, req, {});

      expect(result).to.deep.equal([
        { id: 1, url: 'https://example.com/link1' },
        { id: 2, url: 'https://example.com/link2' },
      ]);
    });

    it('should return a link by ID when LinkId is provided', async () => {
      const findByPkStub = sinon.stub(bd.Link, 'findByPk');
      findByPkStub.withArgs(1).returns({ id: 1, url: 'https://example.com/link1' });
      const result = await linksServices.getLinks(1, {}, {});

      expect(result).to.deep.equal({ id: 1, url: 'https://example.com/link1' });
    });

    it('should return links for a specific user when userId and userSession are provided', async () => {
      const findAllStub = sinon.stub(bd.Link, 'findAll');
      findAllStub.returns([
        { id: 1, url: 'https://example.com/link1', User_id: 1 },
        { id: 2, url: 'https://example.com/link2', User_id: 1 },
      ]);

      const req = { limit: 10, offset: 0, userId: 1, userSession: true };
      const session = { userId: 1 };

      const result = await linksServices.getLinks(null, req, session);

      expect(result).to.deep.equal([
        { id: 1, url: 'https://example.com/link1', User_id: 1 },
        { id: 2, url: 'https://example.com/link2', User_id: 1 },
      ]);
    });

    it('should handle errors during getLinks', async () => {
      const findAllStub = sinon.stub(bd.Link, 'findAll');
      findAllStub.throws(new Error('Database error'));

      const req = { limit: 10, offset: 0 };
      const session = {};

      try {
        await linksServices.getLinks(null, req, session);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('createLink', () => {
    it('should return 200 and "link created" when a link is successfully created', async () => {
      const createStub = sinon.stub(bd.Link, 'create');
      createStub.returns({
        id: 1,
        url: 'https://example.com/newlink',
        created_at: moment.utc(),
        User_id: 1,
      });

      const linkData = { url: 'https://example.com/newlink' };
      const userId = 1;

      const result = await linksServices.createLink(linkData, userId);

      expect(result.code).equal(200);
    });

    it('should handle errors during createLink', async () => {
      const createStub = sinon.stub(bd.Link, 'create');
      createStub.throws(new Error('Database error'));

      const linkData = { url: 'https://example.com/newlink' };
      const userId = 1;

      try {
        await linksServices.createLink(linkData, userId);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('scrapeLink', () => {
    it('should scrape and create link scrappers for a given URL and linkId', async () => {
      const axiosGetStub = sinon.stub(axios, 'get');
      axiosGetStub.returns({
        data: '<html><body><a href="https://example.com/page1">Link 1</a></body></html>',
      });

      const linkId = 1;

      const result = await linksServices.scrapeLink('https://example.com/page1', linkId);

      expect(result).to.equal(1); // Number of links found in the mocked HTML
    });

    it('should handle errors during link scraping', async () => {
      const axiosGetStub = sinon.stub(axios, 'get');
      axiosGetStub.throws(new Error('Network error'));

      const linkId = 1;

      try {
        await linksServices.scrapeLink('https://example.com/page1', linkId);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
