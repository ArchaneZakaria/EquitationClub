const { Sequelize, DataTypes } = require("sequelize");
const Employe = require("./Employe");
const sequelize = new Sequelize({
  define: {
    
    timestamps: false,
  },
  database: "equitationdb",
  username: "root",
  dialect: "mysql",
});

const Utilisateur = sequelize.define(
  "Utilisateur",
  {
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nomUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenomUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephoneUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adresseUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datenaissanceUtilisateur: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cbyUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cdateUtilisateur: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ubyUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    udateUtilisateur: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dbyUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ddateUtilisateur: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    roleUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Utilisateur",
    freezeTableName: true,
  }
);

module.exports = Utilisateur;
