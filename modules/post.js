sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('post', {
postId:{
    field:'postId',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
postDetials:{
    field:'detials',
    type:Sequelize.STRING,
    defaultValue:""
},
image:{
    field:'image',
    type:Sequelize.STRING
},
date:{
    field:'date',
    type:Sequelize.DATE
},
time:{
    field:'time',
    type:Sequelize.STRING
},
userId:{
    field:'userId',
    type:Sequelize.INTEGER,
    foreignKey:true
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