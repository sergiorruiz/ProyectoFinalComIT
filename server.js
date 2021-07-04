const express = require("express");
const app = express();
const path = require("path");
const hdb = require("express-handlebars");
const dbDatosPersonales = require("./db-datospersonales");

const datos = [];


app.engine("handlebars", hdb({
    defaultLayout: "main",
    layoutsDir: "client/views/layout"
}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "client/views"));

app.use(express.static(path.join(__dirname, "client")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("reparaciones")
});

app.get("/reparaciones", (req, res) => {
    res.render("reparaciones")});

app.post("/reparaciones", function(req, res) {
        
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
        "name": nombre,
        "email":email,
        "problema":problema,
        "costo":costo
    }
        
        
        console.log(email);
        console.log(datos);

        dbDatosPersonales.insertarDatos(datos,
             (err) => { res.render("error", {error: "NO INSERTO NADA"})},
             () => {res.redirect("/main")});
        
})


    

app.listen(3500, () => {
    console.log("Servidor ON")
})