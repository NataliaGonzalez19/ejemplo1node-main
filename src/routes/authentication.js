const express = require("express");
//const bcrypt = require("bcrypt");//
const jwt = require("jsonwebtoken");


const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/user");
router.post('/signup', async (req, res) => {
    const { usuario, correo, clave } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        clave: clave
    });
    //user.clave = await user.encryptClave(user.clave);//
    await user.save(); //save es un método de mongoose para guardar datos en MongoDB 
    res.json({
        message: "Usuario guardado."
    });

});

//inicio de sesión
router.post("/login", async (req, res) => {
    // validaciones
    const { error } = userSchema.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //Buscando el usuario por su dirección de correo
    const user2 = await userSchema.findOne({ correo: req.body.correo });
    //validando si no se encuentra
    if (!user2) return res.status(400).json({ error: "Usuario no existe" });
    //Transformando la contraseña a su valor original para 
    //compararla con la clave que se ingresa en el inicio de sesión
    //const validPassword = await bcrypt.compare(req.body.clave, user.clave);//
    //if (!validPassword)//
    //return res.status(400).json({ error: "Clave no válida" });//
    const token = jwt.sign({ id: user2._id }, process.env.PMB, {
        expiresIn: 60 * 60 * 24, //un día en segundos
    });
    res.json({
        auth: true,
        token,
    });

});

module.exports = router;
