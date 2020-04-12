sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('user', {
userId:{
    field:'userId',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
fristName:{
    field:'firstname',
    type:Sequelize.STRING, 
    defaultValue:""
},
lastName:{
    field:'lastname',
    type:Sequelize.STRING,
    defaultValue:""
},
phone:{
    field:'phone',
    type:Sequelize.STRING
},

password:{
    field:'password',
    type:Sequelize.INTEGER
},

isAdmin:{
    field:'isAdmin',
    type:Sequelize.BOOLEAN
},
createdAt:{
    field:'createdAt',
    type:Sequelize.DATE
},
updatedAt:{
    field:'updatedAt',
    type:Sequelize.DATE
}

   

},{ freezeTableName:true
    ,
    timestamps: true})