const express = require('express');
const { query } = require('../connection');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();



router.post('/signup',  (req,res) =>  
{
    let user = req.body;

    var query =  "select email,password,role,status from tbl_user where email=?"
    connection.query( query, [user.email], (err,results) => 
    {
        if(err)
        {     
            return res.status(500).json(err); 
        }
        else
        { 
            // eger o emaile sahip baska kullanici yoksa ekle
            if(results.length <= 0)
            {
                query = "insert into tbl_user(name,contactNumber,email,password,status,role) values (?,?,?,?,'false','user')"
                connection.query(query,[user.name, user.contactNumber, user.email, user.password],(err,results)=>
                {
                    if(err)
                    {
                        return res.status(500).json(err);
                    }
                    else
                    {
                        return res.status(200).json({message: "Successfully Registered"});
                    }
                })
            }
            else
            {
                return res.status(400).json({message: "Email already exist"});
            }
        }
    })
})

router.post('/login', (req,res)=>
{
    const user = req.body;
    var query = "select email, password, role, status from tbl_user where email=?"
    connection.query(query, [user.email], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.length <= 0 || results[0].password != user.password)
            {
                return res.status(401).json({message: "Wrong UserName or password"});
            }
            else if(results[0].status == "false")
            {
                return res.status(401).json({message: "Please wait for Admin approval"});
            }
            else if (results[0].password == user.password)
            {
                const response = {email: results[0].email, role: results[0].role};
                const accessToken = jwt.sign(response, process.env.TOKEN_KEY, {expiresIn:"8H"});
                res.status(200).json({token: accessToken}); 

            }
            else
            {
                return res.status(400).json({message: "Unfortunately a mistake occured!!"});
            }
        }
    })
})

var transporter = nodemailer.createTransport
(
    {
        service: "gmail",
        auth: 
        {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    }
)

router.post('/forgetPassword', (req, res)=>
{
    const user = req.body;
    var query = "select email, password from tbl_user where email=?"
    connection.query(query, [user.email], (err,results)=>
    {
        if(err)
        {
            return res.status(500).json(err);
        }
        else
        {
            if(results.length <=0)
            {
                return res.status(200).json({message: "There is no user with this e-mail"});
            }
            else
            {
                var mailOptions = 
                {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'OFY-The Admin',
                    html: "<p><b>Your Infos for login   </b><br><b>Email:  </b>"+results[0].email+
                          "<br><b>Password: </b>"+results[0].password+
                          "<br><a href='http://localhost:4200/'>Login Page</a;></p>"
                };

                transporter.sendMail(mailOptions, function(err, info)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("Forget Password mail has been sent:    "+info.response );
                    }
                });

                return res.status(200).json({message: "Login infos sent to your mail"});
            }
        }
    })

})

module.exports= router;