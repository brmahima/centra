const express = require('express')
const Sequelize = require('Sequelize')
const bodyParser = require('body-parser')
 
const Admin = require('././modules/admin')
const app = express()

app.use(bodyParser.json())

const jwt = require('jsonwebtoken');
const fs = require('fs')

// ... our other endpoints

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": req.body.name }, privateKey, { algorithm: 'HS256'});
    res.send(token);
})
app.get('/secret', isAuthenticated, (req, res) => { 
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
})

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
      
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
    
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
        
            if (err) {  
             
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
        t
            return next();
        });
    } else {
 
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}

app.listen(3000,()=>{
console.log('server is running')
})