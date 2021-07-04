function dbDatos(dbInfo) {
    return {
      id: dbInfo.id,
      fecha: dbInfo.fecha,
      nombre: dbInfo.nombre,
      modelo: dbInfo.marca,
      problema: dbInfo.problema,
      costo: dbInfo.email,
      estado: dbInfo.costo,
    };
  }

  module.exports = {
      dbDatos
  };