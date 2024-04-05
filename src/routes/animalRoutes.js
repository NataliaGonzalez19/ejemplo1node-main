const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal");
const animal = require("../models/animal");
//Nuevo animal
router.post("/animals", (req, res) => {
    const animal = animalSchema(req.body);
    animal
        .save()
        .then((data) => res.json(data)) //Promesa de la petición then si no me devuelve algo positivo pues el catch me muestra el error 
        .catch((error) => res.json({ message: error }));
});

router.get("/animals", (req, res) => {
    animalSchema.find()
        .then((data) => res.json(data)) //Promesa de la petición then si no me devuelve algo positivo pues el catch me muestra el error 
        .catch((error) => res.json({ message: error }));
});

module.exports = router; //El exports lo coloco para poder utilizar esto en otra parte

