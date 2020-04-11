sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('user', {
UserId:{
    field:'user_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
Name:{
    field:'name',
    type:Sequelize.STRING,
    defaultValue:""
},
Phone:{
    field:'phone',
    type:Sequelize.STRING
},

Password:{
    field:'password',
    type:Sequelize.INTEGER
},

UserType:{
    field:'user_type',
    type:Sequelize.INTEGER
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