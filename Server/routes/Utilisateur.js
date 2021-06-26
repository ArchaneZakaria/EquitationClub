const express=require('express');
const  router=express.Router();
const Utilisateur=require("../models/Utilisateur");
const bcrypt=require("bcrypt");
const e = require('express');

router.get("/",async (req,res)=>{
	try {
		//Utilisateur.sync({ force: true });
    console.log("All models were synchronized successfully.");
		const users=await Utilisateur.findAll()
	res.json(users)
	  } catch (error) {
		console.error(error);
	  }
    
});


router.post("/", async (req,res)=>{
	try {
		//something
		const newUtilisateur=req.body;
	//res.json(newUtilisateur);
	await Utilisateur.create(newUtilisateur);
   res.json(newUtilisateur);
	  } catch (error) {
		console.error(error);
	  }
    
})

router.post("/login", async (req,res)=>{
	const body=req.body;
	const user=await Utilisateur.findOne({where:{emailUtilisateur:body.emailUtilisateur,deletedUtilisateur:0}});
		//{emailUtilisateur:body.emailUtilisateur},{deletedUtilisateur:0})
    if(user){
		const validPassword=await bcrypt.compare(body.passwordUtilisateur,user.passwordUtilisateur);
		if(validPassword){
			res.status(200).json({message:"Connexion réussi"});
		}else{
			res.status(400).json({error:"Connexion echoué"})
		}
	}else{
		res.status(401).json({error:"Utilisateur introuvable"})
	}
})

module.exports=router;