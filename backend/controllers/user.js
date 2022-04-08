const bcrypt = require("bcrypt");

const User = require('../models/User');

let jwt = require("jsonwebtoken");
require('dotenv').config();



exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));


};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: process.env.TOKEN_KEY
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



// exports.login = (req, res) => {
//   if (req.body.email == "gerarddeux@gmail.com" && req.body.password == "aaa") {
//     let token = jwt.sign({ userId: 10 }, process.env.TOKEN_KEY);
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: "Login ou mot de pass incorrect" })
//   }
// }


// exports.test = (req, res) => {
//   res.status(200).json({ message: "vous êtes authentifié" });
// }