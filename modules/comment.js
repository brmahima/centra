sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('comment', {
CommentId:{
    field:'comment_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
CommentDetials:{
    field:'detials',
    type:Sequelize.STRING,
    defaultValue:""
},
Likes:{
    type:Sequelize.INTEGER
},

Dislikes:{
    field:'dislike',
    type:Sequelize.INTEGER
},
Date:{
    field:'date',
    type:Sequelize.DATE
},
Time:{
    field:'time',
    type:Sequelize.TIME
},
PostId:{
    field:'post_id',
    type:Sequelize.INTEGER,
    foreignKey:true
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