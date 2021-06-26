const express = require("express");
const { QueryTypes, json } = require("sequelize");
const { sequelize } = require("../models");
const router = express.Router();
const Employe = require("../models/Employe");
const Utilisateur = require("../models/Utilisateur");
const bcrypt=require("bcrypt");


//L'api de selection de tous les employés
router.get("/", async (req, res) => {
  try {
    //const employess=await Employe.findAll({ include: Utilisateur })
    const Employes = await sequelize.query(
      "select * from employe e,utilisateur u where e.Utilisateur_idUtilisateur=u.idUtilisateur and e.deletedEmploye=0 and u.deletedUtilisateur=0",
      { type: QueryTypes.SELECT }
    );
    res.json(Employes);
  } catch (error) {
    console.error(error);
  }
});

//l'api d'insertion d'un nouveau employé

router.post("/creerEmploye", async (req, res) => {
  
  try {
    const hash=await bcrypt.hash(req.body.passwordUtilisateur,5);
    const user = await sequelize.query(
      "INSERT INTO `equitationdb`.`utilisateur` (`nomUtilisateur`, `prenomUtilisateur`, `emailUtilisateur`, `passwordUtilisateur`, `telephoneUtilisateur`, `adresseUtilisateur`, `deletedUtilisateur`) VALUES (:nomUtilisateur, :prenomUtilisateur, :emailUtilisateur, :passwordUtilisateur, :telephoneUtilisateur, :adresseUtilisateur, :deletedUtilisateur);",
      {
        replacements: {
          nomUtilisateur: req.body.nomUtilisateur,
          prenomUtilisateur: req.body.prenomUtilisateur,
          emailUtilisateur: req.body.emailUtilisateur,
          passwordUtilisateur: hash,
          telephoneUtilisateur: req.body.telephoneUtilisateur,
          adresseUtilisateur: req.body.adresseUtilisateur,
          deletedUtilisateur: 0,
        },
        type: QueryTypes.INSERT,
      }
    );

    console.log(user);
    let role=1;
    if(req.body.admin){
      role=2;
    }
    const employe = await sequelize.query(
      "INSERT INTO `equitationdb`.`employe` (`matriculeEmploye`, `fonctionEmploye`, `departementEmploye`, `dateembaucheEmploye`, `deletedEmploye`, `Utilisateur_idUtilisateur`, `roleEmploye`) VALUES (:matriculeEmploye, :fonctionEmploye, :departementEmploye, :dateembaucheEmploye, :deletedEmploye, :Utilisateur_idUtilisateur, :roleEmploye);",
      {
        replacements: {
          matriculeEmploye: req.body.matriculeEmploye,
          fonctionEmploye: req.body.fonctionEmploye,
          departementEmploye: req.body.departementEmploye,
          dateembaucheEmploye: req.body.dateembaucheEmploye,
          deletedEmploye: 0,
          Utilisateur_idUtilisateur: user[0],
          roleEmploye: role,
        },
        type: QueryTypes.INSERT,
      }
    );
    console.log(employe);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

//L'api de suppression d'un employe
router.post("/supprimerEmploye", async (req, res) => {
  try {
    const employe = await Employe.update(
      { deletedEmploye: 1 },
      { where: { idEmploye: req.body.idEmploye } }
    );
    const utilisateur = await Utilisateur.update(
      { deletedUtilisateur: 1 },
      { where: { idUtilisateur: req.body.idUtilisateur } }
    );
    // console.log(employe);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});

//L'api de modification d'un employé

router.post("/modifierEmploye", async (req, res) => {
  console.log(req.body[0]);
  try {
    let role=1;
    if(req.body[1].admin){
      role=2;
    }
    const employe = await Employe.update(
      {
        matriculeEmploye: req.body[1].matriculeEmploye,
        fonctionEmploye: req.body[1].fonctionEmploye,
        departementEmploye: req.body[1].departementEmploye,
        dateembaucheEmploye: req.body[1].dateembaucheEmploye,
        roleEmploye: role
      },
      { where: { idEmploye: req.body[0].idEmploye } }
    );
    const utilisateur = await Utilisateur.update(
      { 
        nomUtilisateur: req.body[1].nomUtilisateur,
        prenomUtilisateur: req.body[1].prenomUtilisateur,
        emailUtilisateur: req.body[1].emailUtilisateur,
        adresseUtilisateur: req.body[1].adresseUtilisateur,
        udateUtilisateur: req.body[1].udateUtilisateur
      },
      { where: { idUtilisateur: req.body[0].idUtilisateur } }
    );
     
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
    console.error(error);
  }
});

module.exports = router;
