const {Sequelize}=require('sequelize');
const sequelize=new Sequelize(
    "login_details",
    "root",
    "root",{
        host:"localhost",
        dialect:"mysql"
    }
);
module.exports=sequelize;