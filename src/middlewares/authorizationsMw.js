require('dotenv').config();

function userAuthorization(req, res, next){
    req.session.userId? next(): res.json({code: 401, message: 'not authorized'}); 
}

function requestAuthorization(req, res, next){
    if (req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            const scheme = parts[0]; 
            const token = parts[1];
            if (scheme === 'Bearer') {
                if (token==process.env.BEARER_TOKEN) {
                    next();
                }
                else {
                res.json({code: 401, message: 'not authorized'});
                }
            } 
            else {
            res.status(401).json({ error: 'Invalid token scheme' });
            }
        } 
        else {
          res.status(401).json({ error: 'Invalid authorization header format' });
        }
      } 
      else {
        res.status(401).json({ error: 'Authorization header missing' });
      }
}



module.exports = {userAuthorization, requestAuthorization}