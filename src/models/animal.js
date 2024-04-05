const mongoose = require("mongoose"); // importando el componente mogoose
const animalSchema = mongoose.Schema({ //mongoose.Schema ,metodo que define las colecciones
    nombre: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: false,
    }
});
module.exports = mongoose.model("Animal", animalSchema); //si omitimos esta linea no va a funcionar le estamos diciendo a moongose que utilice el metodo model para crear la coleccion
