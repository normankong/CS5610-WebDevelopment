const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const dotenv = require("dotenv").config();

console.log(process.env.AUTH0_DOMAIN)
console.log(process.env.AUTH0_AUDIENCE)

module.exports = {
  checkJWT: jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
  }),
};