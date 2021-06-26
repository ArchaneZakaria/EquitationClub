const { Sequelize, DataTypes } = require('sequelize');
const Utilisateur = require('./Utilisateur');
const sequelize = new Sequelize({
  define: {
    timestamps: false,
    
  },database:"equitationdb"
  ,username:"root",
  dialect:"mysql"
});

const Employe = sequelize.define("Employe", {
    
    idEmploye: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey:true,
      autoIncrement:true
    },
    matriculeEmploye: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fonctionEmploye: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departementEmploye: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    dateembaucheEmploye: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedEmploye: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Utilisateur_idUtilisateur:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
            // This is a reference to another model
            model: Utilisateur,
      
            // This is the column name of the referenced model
            key: 'idUtilisateur',
      
            }
      },
    roleEmploye: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    
  },
  {
    
    tableName: 'Employe'
    ,freezeTableName: true
  });
  Employe.hasOne(Utilisateur, {
    foreignKey: 'idUtilisateur'
  });
  Employe.belongsTo(Utilisateur)
  module.exports = Employe;
