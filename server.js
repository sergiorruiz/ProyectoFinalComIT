const express = require("express");
const app = express();
const path = require("path");
const hdb = require("express-handlebars");
const nodemailer = require("nodemailer");
const dbDatosPersonales = require("./db-datospersonales");


app.engine("handlebars", hdb({
    defaultLayout: "main",
    layoutsDir: "client/views/layout"
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "client/views"));

app.use(express.static(path.join(__dirname, "client")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    dbDatosPersonales.leerDatos(
        err => res.render("error", { content: "ERRoR"}), 
        datos => res.render("reparaciones", {
            datos: datos,
            encodedJson : encodeURIComponent(JSON.stringify(datos))
        })
        )});

app.get("/cliente", (req, res) => {
    res.render("tarjetacontacto")
})

//NodeMail
app.post("/tarjetaContacto", (req, res) => {
    const salidaEmail = `
    <p>Notificación por Estado de Reparación</p>
    <h3>Detalle Contacto</h3>
    <ul>
        <li>Nombre: ${req.body.nombre}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${req.body.mensaje}</p>`;

    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "sergiorruiz88@gmail.com", // generated ethereal user
      pass: "ijftbdacoyipwjre", // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
    let mailOptions = {
    from: '"Servicio Tecnico ComunidadIT 👻" <sergiorruiz88@gmail.com>', // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Hola ✔", // Subject line
    text: "Hello world?", // plain text body
    html: salidaEmail, // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
          return console.log(err)
      }

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

res.render("tarjetacontacto", {
    msj: "Email Enviado"
})

})
    
app.post("/agregar-reparaciones", function(req, res) {
        
    let fecha = req.body.fecha;
    let nombre =req.body.nombre;
    let marca = req.body.marca;
    let modelo =req.body.modelo;
    let email = req.body.email;
    let tel =req.body.tel;
    let problema = req.body.problema;
    let costo =req.body.costo;
    let estado = req.body.estado
  
    let datos = {
        "fecha": fecha,
        "name": nombre,
        "marca": marca,
        "modelo": modelo,
        "email":email,
        "tel": tel,
        "problema":problema,
        "costo":costo,
        "estado": estado
    }
        
        dbDatosPersonales.insertarDatos(datos,
        (err) => { res.render("error", {error: "NO INSERTO NADA"})},
        () => {res.redirect("/")});
        
})

app.post("/modificarDatos", (req, res) => {
    const turno = req.body;
    console.log("turnoModificar", turno);
    console.log(req.body)
    dbDatosPersonales.editarDatos(turno,
        err => res.render("error", { content: "Error"}),
        datos => res.redirect("/"))
})

app.get("/eliminarDatos", (req, res) => {
    const turno = req.body;
    console.log("eliminar", turno);
    });

app.listen(3500, () => {
    console.log("Servidor ON")
})