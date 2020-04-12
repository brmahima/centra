sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('space', {
spaceId:{
    field:'spaceId',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
name:{
    field:'name',
    type:Sequelize.STRING,
    defaultValue:""
},
sample:{

    type:Sequelize.INTEGER
},
inside:{
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