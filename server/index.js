const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());
app.use(express.json());

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'crudEmpleados'
})

app.post("/create", (req, res) => {

    const {nombre, apellido, edad , pais, cargo, anio} = req.body;

    console.log(nombre, apellido, edad, pais, cargo, anio);

    db.query('INSERT INTO crudcliente (nombre, apellido, edad, pais, cargo, anio) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, edad, pais, cargo, anio], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    });
    /* db.query('INSERT INTO empleados (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?)', [nombre, apellido, email, telefono], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Values Inserted");           npx nodemon index.js
        }
    }); */
})

app.get("/clientes", (req, res) => {
    db.query('SELECT * FROM crudcliente', (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    }); 
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query('DELETE FROM crudcliente WHERE id = ?', id, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });    
});

app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const {Nombre, apellido, edad, pais, cargo, anio} = req.body;
    db.query('UPDATE crudcliente SET nombre = ?, apellido = ?, edad = ?, pais = ?, cargo = ?, anio = ? WHERE id = ?', [Nombre, apellido, edad, pais, cargo, anio, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });    
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/* npm nodemon index.js */