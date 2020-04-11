sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('catogry', {
CatogryId:{
    field:'catogry_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
Name:{
    field:'name',
    type:Sequelize.STRING,
    defaultValue:""
},
Sample:{
    field:'sample',
    type:Sequelize.STRING
},
Desc:{
    type:Sequelize.STRING
},

Image:{
    type:Sequelize.STRING
},


createAt:{
    field:'createdAt',
    type:Sequelize.DATE
},
updateAt:{
    field:'updatedAt',
    type:Sequelize.DATE
}

   

},{ freezeTableName:true})