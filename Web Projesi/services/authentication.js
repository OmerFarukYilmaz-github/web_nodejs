require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next)
{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
   
    if(token == null) // auth yok
    {   
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.TOKEN_KEY, (err, response)=>
    {
        if(err) // auth istenen gibi degil
        {
            return res.sendStatus(403);
        }
        
        res.locals = response;
        next();
    })
}

module.exports = { authenticateToken: authenticateToken }