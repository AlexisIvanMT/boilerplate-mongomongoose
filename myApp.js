
require('dotenv').config(); // para leer las variables del .env
const mongoose = require('mongoose'); // para conectarse a la base de datos
const Schema = mongoose.Schema; // para crear el esquema de la base de datos


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    console.log('Estado:', mongoose.connection.readyState);
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
// Crear el modelo a partir del esquema
// El modelo es una clase que nos permite crear y manipular documentos en la base de datos
Person = mongoose.model("Person", personSchema);


// Crear un nuevo documento
// El documento es una instancia del modelo
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });
  person.save((err, data) => {
    if (err) {
      console.error('❌ Error al guardar la persona:', err);
      done(err);
    } else {
      console.log('✅ Persona guardada:', data);
      done(null, data);
    }
  })
};


/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

// Crear muchas personas a la vez
// Model.create() es un método estático que se utiliza para crear documentos en la base de datos
// El método Model.create() toma un array de objetos y los guarda en la base de datos
// El método Model.create() devuelve una promesa que se resuelve con los documentos creados
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error('❌ Error al guardar las personas:', err);
      done(err);
    } else {
      console.log('✅ Personas guardadas:', data);
      done(null, data);
    }
  });
  
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
