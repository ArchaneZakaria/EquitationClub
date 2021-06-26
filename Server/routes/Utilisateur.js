const express=require('express');
const  router=express.Router();
const Utilisateur=require("../models/Utilisateur");

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

module.exports=router;