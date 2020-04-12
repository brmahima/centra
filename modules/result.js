sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('result', {
resultId:{
    field:'resultId',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
shortResult:{
    field:'shortResult',
    type:Sequelize.STRING,
    defaultValue:""
},
equation:{
    field:'equation',
    type:Sequelize.STRING
},
pdfName:{
    field:'pdfName',
    type:Sequelize.STRING
},

createdAt:{
    field:'createdAt',
    type:Sequelize.DATE
},
updatedAt:{
    field:'updatedAt',
    type:Sequelize.DATE
}

   

},{ freezeTableName:true})