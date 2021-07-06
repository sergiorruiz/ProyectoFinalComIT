const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;

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

const leerDatos = (cbErr, cbOk) => {
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

  const editarDatos = (turno,cbErr, cbOk) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, conok) => {
      if(err) {
          cbErr(err);
          console.log(err)
          return;
      };
  
      const datospersonalesBase = conok.db(dataBase).collection(collectionName);
      
      datospersonalesBase.findOneAndUpdate(
        {_id: ObjectId(turno.id)},
        {$set: {costo: turno.costo, estado: turno.estado}}
        , (err, res) => {
          if(err){
            cbErr(err);
            return;
          }
          conok.close();    
          cbOk();
        });
  });
  }; 

  const eliminarDatos = (id, cbErr, cbOk) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, conok) => {
      if(err) {
          cbErr(err);
          console.log(err)
          return;
      };
  
      const datospersonalesBase = conok.db(dataBase).collection(collectionName);
      
      datospersonalesBase.deleteOne({ _id: ObjectId(id.id) }, (err, result) => {
        if (err) {
          cbError(err);
          return;
        }
          conok.close();
          cbOk();
        });
    });
  };

module.exports = {
  insertarDatos,
  leerDatos,
  editarDatos,
  eliminarDatos
};