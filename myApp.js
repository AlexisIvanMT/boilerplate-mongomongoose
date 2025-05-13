
require('dotenv').config(); // para leer las variables del .env
const mongoose = require('mongoose'); // para conectarse a la base de datos
const Schema = mongoose.Schema; // para crear el esquema de la base de datos

// ==============================
// Conectar a la base de datos
// mongoose.connect() es un método que se utiliza para conectarse a la base de datos  
// ==============================
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a la base de datos');
    console.log('Estado:', mongoose.connection.readyState);
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

// ==============================
// Definir el esquema de la base de datos
// mongoose.Schema() es un constructor que se utiliza para crear un esquema de la base de datos
// ==============================
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// ==============================
// Crear el modelo a partir del esquema
// El modelo es una clase que nos permite crear y manipular documentos en la base de datos
// mongoose.model() es un método que se utiliza para crear un modelo a partir de un esquema
// El primer parámetro es el nombre del modelo y el segundo es el esquema
// ==============================
Person = mongoose.model("Person", personSchema);


// ==============================
// Crear un nuevo documento
// El documento es una instancia del modelo
// El método save() guarda el documento en la base de datos
// ==============================
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

// ==============================
// Se crea un array de personas para crear muchas personas a la vez
// ==============================
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

// ==============================
// Crear muchas personas a la vez
// Model.create() es un método estático que se utiliza para crear documentos en la base de datos
// El método Model.create() toma un array de objetos y los guarda en la base de datos
// El método Model.create() devuelve una promesa que se resuelve con los documentos creados
// ==============================
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

// ==============================
// Buscar personas por nombre
// El método Model.find() se utiliza para buscar documentos en la base de datos
// El método Model.find() toma un objeto con la condición de búsqueda y un callback
// El callback recibe dos parámetros: err y data  
// ==============================
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.error('❌ Error al buscar la persona:', err);
      done(err);
    }else{
      console.log('✅ Persona encontrada:', data);
      done(null, data);
     }
 
})
};

// ==============================
// Buscar una persona por su comida favorita  
// El método Model.findOne() se utiliza para buscar un solo documento en la base de datos
// El método Model.findOne() toma un objeto con la condición de búsqueda y un callback
// ============================
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food }, (err, data) => {
     if (err) {
    console.error('❌ Error al buscar la persona:', err);
  done(err);
}else{
    console.log('✅ Persona encontrada:', data);
    done(null, data);
  }
});
};
   

// ==============================
// Buscar una persona por su ID
// El método Model.findById() se utiliza para buscar un documento por su ID
// El método Model.findById() toma el ID de la persona y un callback
// El collback se ejecuta cuando se encuentra la persona o hay un error
// ==============================
const findPersonById = (personId, done) => {
 Person.findById(personId, (err, data) => {
    if (err) {
      console.error('❌ Error al buscar la persona:', err);
      done(err);
    } else {
      console.log('✅ Persona encontrada:', data);
      done(null, data);
    }
  });
};


// ==============================
// Editar una persona y guardar los cambios
// El método Model.findByIdAndUpdate() se utiliza para buscar un documento por su ID y actualizarlo
// El método Model.findByIdAndUpdate() toma el ID de la persona, un objeto con los datos a actualizar y un callback
// El callback se ejecuta cuando se encuentra la persona o hay un error 
// Una vez que terminamos de editar la persona, se guarda el documento actualizado en la base de datos
// El método done() se utiliza para devolver el resultado de la operación
// ==============================
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      console.error('❌ Error al buscar la persona:', err);
      done(err);
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) {
          console.error('❌ Error al guardar la persona:', err);
          done(err);
        } else {
          console.log('✅ Persona actualizada:', updatedPerson);
          done(null, updatedPerson);
        }
      });
    }
  });
};

// ==============================
// Actualizar una persona por su nombre
// El método Model.findOneAndUpdate() se utiliza para buscar un documento por su nombre y actualizarlo
// Recibe los parametros:
// 1. El nombre de la persona a buscar  
// 2. El objeto con los datos a actualizar
// 3. Un objeto con opciones, en este caso { new: true } para devolver el documento actualizado
// ==============================
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        console.error('❌ Error al actualizar la persona:', err);
        done(err);
      } else {
        console.log('✅ Persona actualizada:', updatedPerson);
        done(null, updatedPerson);
      }
    }
  );
};

// ==============================
// Eliminar una persona por su ID
// El método Model.findByIdAndRemove() se utiliza para buscar un documento por su ID y eliminarlo 
// Recibe los parametros:
// 1. El ID de la persona a eliminar  
// 2. Un callback que recibe dos parametros: err y removedPerson
//    - err: si hay un error al eliminar la persona     
//    - removedPerson: el documento eliminado
// ==============================

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      console.error('❌ Error al eliminar:', err);
      return done(err);
    }

    if (!removedPerson) {
      console.log('🚫 No se encontró ninguna persona con ese ID');
      return done(null, null); // No hay error, pero tampoco documento
    }

    console.log('🗑️ Persona eliminada:', removedPerson);
    done(null, removedPerson);
  });
};

// ==============================
// Eliminar muchas personas por su nombre
// El método Model.deleteMany() se utiliza para eliminar documentos que coinciden con una condición
// Recibe los parametros:
// 1. Un objeto con la condición para eliminar los documentos
// 2. Un callback que recibe dos parametros: err y data
//    - err: si hay un error al eliminar las personas
//    - data: un objeto con la información de las personas eliminadas
// ==============================
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";  
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.error('❌ Error al eliminar personas:', err);
      done(err);
    } else {
      console.log('✅ Personas eliminadas:', data);
      done(null, data);
    }
  });
};

// ==============================
// Encadenar consultas
// El método Model.find() se utiliza para buscar documentos en la base de datos 
// El método sort() se utiliza para ordenar los documentos
// El método limit() se utiliza para limitar el número de documentos devueltos
// El método select() se utiliza para seleccionar los campos que se desean devolver
// El método exec() se utiliza para ejecutar la consulta y devolver una promesa
// Recibe los parametros:
// 1. Un objeto con la condición para buscar los documentos
// 2. Un objeto con las opciones para la consulta
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // Ordenar por nombre ascendente
    .limit(2) // Limitar a 2 resultados
    .select("-age") // Excluir el campo "age"
    .exec((err, data) => {
      if (err) {
        console.error('❌ Error en la consulta encadenada:', err);
        done(err);
      } else {
        console.log('✅ Consulta encadenada exitosa:', data);
        done(null, data);
      }
    });
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
