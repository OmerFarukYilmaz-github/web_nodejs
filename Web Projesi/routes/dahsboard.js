const express = require("express");
const connection = require("../connection");
const router = express.Router();

var authentication = require("../services/authentication");


router.get("/details", authentication.authenticateToken, (req,res,next)=>
{
    var categoryCount, gameCount;
    var query = "select count(categoryId) as categoryCount from tbl_category";
    connection.query(query, (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            categoryCount = results[0].categoryCount;
        }
    })

    query = "select count(gameId) as gameCount from tbl_game";
    connection.query(query, (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            gameCount = results[0].gameCount;
            return res.status(200).json({categoryCount, gameCount});
        }
    })

})



module.exports= router;