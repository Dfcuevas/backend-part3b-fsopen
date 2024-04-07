const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ingdcuevas:${password}@cluster0.3r3ozen.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// El esquema le dice a mongoose como se almacenaran los objetos en la base de datos
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Los modelos son las llamadas funciones constructoras que crean nuevos objetos JavaScript basados en los parametros proporcionados.
const Note = mongoose.model("Note", noteSchema);

//La app crea un nuevo objeto de nota con la ayuda del modelo Note.
const note = new Note({
  content: "Quiero que sea feliz, ella y Sarita",
  important: true,
});

// Guardar el objeto en la base de datos ocurre con el método save, que se puede proporcionar con un controlador de eventos con el metodo then:

/* note.save().then((result) => {
  console.log("note saved!", result);
  mongoose.connection.close();
}); */

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });

  mongoose.connection.close();
});
