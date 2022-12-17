const { query } = require("express");
const express = require("express");
const connection = require("../connection");
const router = express.Router();

var authentication = require("../services/authentication");
var checkRole = require("../services/checkRole");




router.post("/add", authentication.authenticateToken, checkRole.checkRole, (req,res)=>
{
    let game = req.body;
    let query= "insert into tbl_game (name, description, price, isActive, categoryId) values(?,?,?,'true',?)";
    connection.query(query, [game.name, game.description, game.price, game.categoryId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            return res.status(200).json({message: "Game added successfully"});
        }
    })
});

router.get("/getAll", authentication.authenticateToken, (req,res,next)=>
{
    let query = "select game.gameId, game.name, game.description, game.price, game.isActive, category.categoryId, "+
            "category.name as categoryName " + 
            "from tbl_game game Inner Join tbl_category category "+
            "where game.categoryId = category.categoryId";
    connection.query(query, (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            return res.status(200).json(results);
        }
    })
});

router.get("/getByCategory/:categoryId", authentication.authenticateToken, (req,res,next)=>
{
    const categoryId = req.params.categoryId;
    let query = "select game.gameId, game.name, game.description, game.price, game.isActive " +
            "from tbl_game game Inner Join tbl_category category "+
            "where game.categoryId = category.categoryId and game.categoryId=? and game.isActive='true'";
    connection.query(query, [categoryId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.length == 0)
            {
                return res.status(400).json({message: "There is no game at this category"});
            }
            return res.status(200).json(results);
        }
    })
});

router.get("/getById/:gameId", authentication.authenticateToken, (req,res,next)=>
{
    const gameId= req.params.gameId;
    let query = "select  game.name, game.description, game.price, game.isActive, category.categoryId, "+
            "category.name as categoryName " + 
            "from tbl_game game Inner Join tbl_category category "+
            "where game.categoryId = category.categoryId and game.gameId=? and game.isActive='true'";
    connection.query(query, [gameId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.length == 0)
            {
                return res.status(400).json({message: "There is no game with this Id"});
            }
            return res.status(200).json(results[0]);
        }
    })
});


router.patch("/update", authentication.authenticateToken, checkRole.checkRole, (req,res,next)=>
{
    let game= req.body;
    let query = "update tbl_game set name=?, categoryId=?, description=?, price=? where gameId=?";
    connection.query(query, [game.name, game.categoryId, game.description, game.price, game.gameId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message: "Game couldn't find"});
            }
            else
            {
                return res.status(200).json({message: "Game updated successfully"});
            }
        }
    })
});

router.delete("/deletebyId/:gameId", authentication.authenticateToken, checkRole.checkRole, (req,res,next)=>
{
    const gameId= req.params.gameId;
    let query = "delete from tbl_game where gameId=?";
    connection.query(query, [gameId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message: "Game couldn't find"});
            }
            else
            {
                return res.status(200).json({message: "Game deleted successfully"});
            }
        }
    })
})

router.patch("/updateStatus", authentication.authenticateToken, checkRole.checkRole, (req,res,next)=>
{
    let game= req.body;
    let query = "update tbl_game set isActive=? where gameId=?";
    connection.query(query, [game.isActive, game.gameId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message: "Game couldn't find"});
            }
            else
            {
                return res.status(200).json({message: "Game status updated successfully"});
            }
        }
    })
});



module.exports= router;