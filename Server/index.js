const express=require('express')
const app=express()
const mysql=require('mysql')
const db=require("./models")
const cors=require("cors")

app.use(express.json())
app.use(cors())
//Routers
const utilisateurRouter=require('./routes/Utilisateur')
const EmployeRouter=require('./routes/Employe')
app.use("/Utilisateur",utilisateurRouter)
app.use("/Employe",EmployeRouter)



db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log('running on port 3001')
    });
})

/*
const db =mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'equitationdb'
});

app.get('/',(req,res)=>{
    const sqlInsert=
    "INSERT INTO `equitationdb`.`utilisateur` (`nomUtilisateur`, `prenomUtilisateur`, `emailUtilisateur`, `passwordUtilisateur`, `telephoneUtilisateur`) VALUES ('asasas', 'slasasl', 'dsdksmdsk', 'kdssdk', 'fack');"
    db.query(sqlInsert,(err,result)=>{
        res.send("hello mdf");
    })
})

app.listen(3001,()=>{
    console.log('running on port 3001')
})*/