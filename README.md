# KOOMBEA Test

A project for an user can scrap web sites  


## Author

Jerónimo Sola


## Description

in this website an user can scrap url from websites.  
A user can sing up, login and see all the websites stored.


## Running instructions

**npm install** --> install dependencies  
**npm start** &nbsp; --> run locally in port 3000  
**npm test** &nbsp; --> run all unit test

## env file

TEST_DB_USERNAME=jero12345
TEST_DB_PASSWORD=Arturo123!
TEST_DB_DATABASE=jero12345_userscrapper
TEST_DB_HOST=mysql-jero12345.alwaysdata.net
TEST_DB_DIALECT=mysql
TEST_DB_PORT=3306
PRODUCTION_DB_USERNAME=jero12345
PRODUCTION_DB_PASSWORD=Arturo123!
PRODUCTION_DB_DATABASE=jero12345_userscrapper
PRODUCTION_DB_HOST=mysql-jero12345.alwaysdata.net
PRODUCTION_DB_DIALECT=mysql
PRODUCTION_DB_PORT=3306
BEARER_TOKEN=TTxxddse40301dwer13467e1ll@ew
SESSION_SECRET_KEY=TTxxddse40301dwer13467e1ll@ew


## Routes

http://localhost:3000/ --> Login

http://localhost:3000/register --> Sing up

http://localhost:3000/home --> User home (login needed)

http://localhost:3000/detail --> User website detail (login needed)


## Dependencies

axios
bcrypt
chai
cheerio
cors
dotenv
express
express-session
express-validator
method-override
mocha
moment-timezone
multer
mysql2
nodemon
sequelize
sequelize-cli
sinon


## Documentation 

Database script
Api documentation


## Future upgrades

Frontend Pagination: Pagination on the frontend is not finish. The backend services have already incorporated the functionality to handle limit and offset.

Bearer Token Authorization: The implementation of bearer token authorization for access is complete. All that remains is to apply the requestAuthorization middleware to the requests.

Enhanced API Documentation: There is a need to enhance, complete and formalize the API documentation. It should provide more comprehensive and structured information.

URL Separation: Today is does not distinguish between different types of URLs in the documentation. For example, separating "javascript:void(0)" and "/pathfinder/pathfinder_talent.php" from other types of URLs. in the requirements is was not describe.

User a frontend framework and avoid show critical data in the frontend (like bearer token) and archive a more organized code.
