sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')
module.exports = sequelize.define('result', {
ResultId:{
    field:'result_id',
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true

},
ShortResult:{
    field:'short_result',
    type:Sequelize.STRING,
    defaultValue:""
},
Equation:{
    field:'equation',
    type:Sequelize.STRING
},
PDFName:{
    field:'pdf_name',
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