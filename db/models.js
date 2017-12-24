const Sequelize=require('sequelize');
const dataTypes=Sequelize.DataTypes;
const DB=require('../config.json').DB;

const db=new Sequelize(DB.DATABASE,DB.USER,DB.PASSWORD,{
    host:DB.HOST,
    dialect:'mysql'
});

const catalogue=db.define('catalogue',
    {
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:dataTypes.STRING,
            allowNull:false
        },
        imagePath:{
            type:dataTypes.STRING,
            allowNull:false
        },
        price:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type:dataTypes.TEXT,
            allowNull:true
        }
    },{
        freezeTableName:true
    });

db.sync({force:true})
    .then(()=>{
        console.log("Database configured")
    })
    .catch((err)=>{
        console.log(err.message);
    });

exports.catalogue=catalogue;