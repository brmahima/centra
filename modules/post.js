sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('post', {
PostId:{
    field:'post_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
PostDetials:{
    field:'detials',
    type:Sequelize.STRING,
    defaultValue:""
},
Image:{
    field:'image',
    type:Sequelize.STRING
},
Likes:{
    type:Sequelize.INTEGER
},

Dislikes:{
    field:'dislikes',
    type:Sequelize.INTEGER
},
Date:{
    field:'date',
    type:Sequelize.DATE
},
Time:{
    field:'time',
    type:Sequelize.STRING
},
UserId:{
    field:'user_id',
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