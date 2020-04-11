sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('spacetype', {
SpaceTypeId:{
    field:'space_type_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
Name:{
    field:'name',
    type:Sequelize.STRING,
    defaultValue:""
},
F_id:{
    field:'f_id',
    type:Sequelize.INTEGER
},
Inside:{
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