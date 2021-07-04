const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://SergioRuiz:6jb2eSPHs924RHm7@cluster0.fp9nx.mongodb.net/Taller?retryWrites=true&w=majority';
const dataBase = 'Taller';
const collectionName = 'Clientes';


const insertarDatos = (datos, cbErr, cbOk) => {
MongoClient.connect(url, { useUnifiedTopology: true }, (err, conok) => {
    if(err) {
        cbErr(err);
        return;
    };

    const datospersonalesBase = conok.db(dataBase).collection(collectionName);
    
    datospersonalesBase.insertOne(datos, (err, res) =>{
      if(err){
        cbErr(err);
        return;
      }
      conok.close();
      cbOk();
      });
    });
};

const leerDatos = (datos, cbErr, cbOk) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, conok) => {
      if(err) {
          cbErr(err);
          console.log(err)
          return;
      };
  
      const datospersonalesBase = conok.db(dataBase).collection(collectionName);
      
      datospersonalesBase.find({}).toArray((err, res) => {
        if(err){
          cbErr(err);
          console.log(err)
          return;
        }
        console.log(res);
        conok.close();
        cbOk(res);
        });
      });
  }; 

module.exports = {
  insertarDatos,
  leerDatos
};