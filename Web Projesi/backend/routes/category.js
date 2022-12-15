const express = require("express");
const connection = require("../connection");
const router = express.Router();

var authentication = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/addCategory", authentication.authenticateToken, checkRole.checkRole, (req,res,next)=>
{
    let category = req.body;
    let query = "insert into tbl_category (name) values (?)";
    connection.query(query, [category.name], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            return res.status(200).json({message: "Category added successfully"});
        }
    })
})

router.get("/getAllCategory", authentication.authenticateToken, (req,res,next)=>
{
    query = "select * from tbl_category order by name";
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
})

router.patch("/updateCategory", authentication.authenticateToken, checkRole.checkRole, (req,res,next)=>
{
    let newValue = req.body;

    query = "update tbl_category set name=? where categoryId=?";
    connection.query(query, [newValue.name, newValue.categoryId], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.affectedRows == 0)
            {
                return res.status(404).json({message: "Category couldn't find"});
            }
            else
            {
                return res.status(200).json({message: "Category updated successfully"});
            }
        }
    })
})

module.exports= router;