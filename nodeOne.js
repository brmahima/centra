const express = require('express')

const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Catogry = require('././modules/catogry')
const Gender = require('././modules/gender')
const Space = require('././modules/space')
const SpaceType = require('././modules/spaceType')
const Age = require('././modules/age')
const Possibility = require('././modules/Possibility')
const User = require('./modules/user')
const Post = require('././modules/post')
const Comment = require('././modules/comment')
const Result = require('./modules/result')
const bcrypt = require('bcrypt')
const multer = require("multer")
const jwt = require('jsonwebtoken');
const fs = require('fs')

const storage = multer.diskStorage({
    
    destination: (req, file, callBack) => {
       
        callBack(null, './uploads');
        
    },
    filename: (req, file, callBack) => {
        
        callBack(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }


})

const upload = multer({
    storage: storage
})


const app = express()

app.use(bodyParser.json())


app.use('/pdf', express.static(__dirname + '/uploads'))

var cors = require('cors')
app.use(cors())
User.belongsTo(Post, {
    foreignKey: 'user_id'
})



app.get('/api/catogry',isAuthenticated, (req, res) => {
    Catogry.findAll().then((catogry) => {
    if(catogry){
        res.json({
            'query':1,
            'catogry':catogry
        })
    }
      
    })

})


app.post('/api/user',upload.none(),(req,res)=>{
    bcrypt.hash(req.body.Password, 10, function(err, hash) {
        User.findOne({
            where:{
                Phone:req.body.Phone
            }
        }).then((result)=>{
            if(!result){
                User.create({
                    Name: req.body.Name,
                    Phone: req.body.Phone,
                    Password: hash,
                    UserType: req.body.UserType
            
                }).then((user) => {
            
                    res.json({
                        'query': 1,
                        'user':user})
                })
            }
        })
       
    })
})
app.get('/api/user',(req,res)=>{
    User.findAll().then((user)=>{
      
           res.json({
            'query': 1,
            'user':user
        }) 
    
       
    })
})
app.put('/api/user',upload.none(), (req, res) => {

    User.findByPk(req.body.UserId).then((user) => {
        //check if exisits
        if (user) {
            // updating
            user.update(req.body).then((userU) => {
                res.json({
                    'query': 1,
                    'user':userU})
            })
        } else {
            res.json({
                'query': -1,
                "cause": "not found"
            })
        }

    })
})



app.get('/api/login',upload.none(),(req,res)=>{
    
    User.findOne({
        where:{
            Phone:req.body.Phone
        }
    }).then((user)=>{
        if(user){
            let privateKey = fs.readFileSync('./private.pem', 'utf8');
            let token = jwt.sign({ "body": req.body.Phone }, privateKey, { algorithm: 'HS256'});
            bcrypt.compare(req.body.Password, user.Password, function(err, result) {
                if(result){
                    user.Password = ""
                    res.json({
                        'query': 1,
                        'user':user,
                        'token':token
                    })
                }
            })
        }
    })
  

})



app.get('/api/option/:catogry',isAuthenticated,upload.none(),(req,res)=>{
    let catogry = req.params.catogry
    Age.findAll({
        where: {
        Inside: {
            [Op.like]: '%'+catogry+'%'
        }
      }}).then((age) => {
        Space.findAll({
            where: {
            Inside: {
                [Op.like]: '%'+catogry+'%'
            }
          }}).then((space) => {
            
            SpaceType.findAll({
                where: {
                Inside: {
                    [Op.like]: '%'+catogry+'%'
                }
              }}).then((spacetype) => {
                
                Possibility.findAll({
                    where: {
                    Inside: {
                        [Op.like]: '%'+catogry+'%'
                    }
                  }}).then((possibility) => {
                    Gender.findAll({
                        where: {
                        Inside: {
                            [Op.like]: '%'+catogry+'%'
                        }
                      }}).then((gender) => {
                        res.json({
                            'gender':gender,
                            'age':age,
                            'space':space,
                            'spaceType':spacetype,
                            'possibitity':possibility
                        })
                       
                    })
                        
                })
            })
        })
       
    })
})

app.post('/api/post',upload.none(),(req,res)=>{
            Post.create({
                PostDetials:req.body.PostDetials,
                Image:req.body.Image,
                Likes:0,
                Dislikes:0,
                Date:req.body.Date,
                Time:req.body.Time,
                UserId:req.body.UserId
        
            }).then((post) => {
        
                res.json({
                    'query': 1,
                    'post':post
                })
            })
        })
 app.get('/api/post',(req,res)=>{
            Post.findAll().then((post)=>{
              
                   res.json({
                    'query': 1,
                    'post':post
                }) 
            
               
            })
        })
app.put('/api/post',upload.none(), (req, res) => {
        
            Post.findByPk(req.body.PostId).then((post) => {
                //check if exisits
                if (post) {
                    // updating
                    post.update(req.body).then((postU) => {
                        res.json({
                            'query': 1,
                            'post':postU})
                    })
                } else {
                    res.json({
                        'query': -1,
                        "cause": "not found"
                    })
                }
        
            })
        })
app.delete('/api/post/:id', (req, res) => {
            let id = req.params.id
        
            Post.findByPk(id).then((post) => {
                //check if exisits
                if (post) {
                   
                   post.destroy().then(()=>{
                       res.json({
                        'query': 1,
                        "cause": "deleted"
                       })
                   })
                } else {
                    res.json({
                        'query': -1,
                        "cause": "not found"
                    })
                }
        
            })
        })

app.post('/api/result',upload.single('PDFName'),(req,res)=>{
    Result.findOne({
        where:{
            Equation:req.body.Equation
        }
    }).then((result)=>{
        if(!result){
            Result.create({
                ShortResult: req.body.ShortResult,
                Equation: req.body.Equation,
                PDFName: req.file.filename
        
            }).then((resu) => {
        
                res.json({
                    'query': 1,
                    'result':resu})
            })
        }else{
            fs.unlinkSync('./uploads/'+req.file.filename)
            res.json({
                'query': -1,
                'cuase':'The result its found'}) 
        }
    })
})

app.get('/api/result',upload.none(),(req,res)=>{
    Result.findAll({
        where :{
            Equation:req.body.Equation
        },
        attributes:['result_id','short_result','equation']
    }).then((result)=>{
              
        res.json({
         'query': 1,
         'result':result
     }) 
 
    
 })
})

app.get('/api/download',upload.none(),(req,res)=>{
    Result.findOne({
        where :{
            Equation:req.body.Equation
        },
        attributes:['pdf_name']
    }).then((result)=>{
              console.log(result)
        res.json({
         'query': 1,
         'url':"http://localhost:3001/uploads/"+result.dataValues.pdf_name
     }) 
 
    
 })
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
                
                    return next();
                });
            } else {
         
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
        }


   


app.listen(3001,()=>{
    console.log('server is running in port 3001')
    })