const fs = require('fs');
const sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const createSauce = new sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: "",
    usersDisliked: ""
  });
  createSauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  sauce.findOne({
    _id: req.params.id
  })
    .then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })

    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;
  if (like === 0) {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        usersLiked = userId;
        // sauceId.like = sauceId.like++;
        likes = +1

      })
      .then(() => res.status(200).json({ message: "like" }))
      .catch(() => res.status(400).json({ message: "vous likez déjà ce produit" }))
  } else if (like === 0) {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        usersliked = userId;
        likes = -1;
        // sauceId.like = sauceId.like--;
      })
      .then(() => res.status(200).json({ message: "dislike" }))
      .catch(() => res.status(400).json({ message: "vous dislikez déjà ce produit" }))
  } else if (like === -1) {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        usersDisliked = userId;
        dislikes = -1;
        // sauceId.like = sauceId.like--;
      })
      .then(() => res.status(200).json({ message: "dislike" }))
      .catch(() => res.status(400).json({ message: "vous dislikez déjà ce produit" }))
  }

};


// exports.likeSauce = (req, res, next) => {
//   // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
//   // Like présent dans le body
//   let like = req.body.like
//   // On prend le userID
//   let userId = req.body.userId
//   // On prend l'id de la sauce
//   let sauceId = req.params.id

//   if (like === 1) {
//     sauce.findOne({ _id: req.params.id })
//       .then(sauce => {
//         usersLiked = 1;
//       })
//       .then(() => res.status(200).json({ message: "like" }))
//       .catch(() => res.status(400).json({ message: "vous likez déjà ce produit" }));

//   }


//   // _id: sauceId,
//   //   usersLiked = usersLiked++