const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
// const images = require("./images");

const Sauce = require('./models/Sauce');

const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://testocr:testocr4@cluster0.kh4sd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



// app.post('/api/stuff', (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body
//   });
//   thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
//     .catch(error => res.status(400).json({ error }));
// });

// app.use('/api/stuff', (req, res, next) => {
//   Thing.find()
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({ error }));
// });


// app.get('/api/stuff/:id', (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// });


// app.put('/api/stuff/:id', (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !' }))
//     .catch(error => res.status(400).json({ error }));
// });

// app.use('/api/stuff', (req, res, next) => {
//   const stuff = [
//     {
//       _id: 'oeihfzeoi',
//       title: 'Mon premier objet',
//       description: 'Les infos de mon premier objet',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       price: 4900,
//       userId: 'qsomihvqios',
//     },
//     {
//       _id: 'oeihfzeomoihi',
//       title: 'Mon deuxième objet',
//       description: 'Les infos de mon deuxième objet',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       price: 2900,
//       userId: 'qsomihvqios',
//     },
//   ];
//   res.status(200).json(stuff);
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec succès !');
// });


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;