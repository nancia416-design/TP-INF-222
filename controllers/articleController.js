const Article = require('../models/articleModel');

exports.createArticle = function (req, res) {
  const titre = req.body.titre;
  const contenu = req.body.contenu;
  const auteur = req.body.auteur;
  const date = req.body.date;
  const categorie = req.body.categorie;
  const tags = req.body.tags;

  if (!titre || !contenu || !auteur || !date || !categorie) {
    return res.status(400).json({
      message: 'Les champs titre, contenu, auteur, date et categorie sont obligatoires.'
    });
  }

  Article.create(
    {
      titre: titre,
      contenu: contenu,
      auteur: auteur,
      date: date,
      categorie: categorie,
      tags: tags
    },
    function (err, article) {
      if (err) {
        return res.status(500).json({
          message: 'Erreur serveur',
          error: err.message
        });
      }

      res.status(201).json({
        message: 'Article créé avec succès',
        article: article
      });
    }
  );
};

exports.getAllArticles = function (req, res) {
  const filters = {
    categorie: req.query.categorie,
    auteur: req.query.auteur,
    date: req.query.date
  };

  Article.getAll(filters, function (err, articles) {
    if (err) {
      return res.status(500).json({
        message: 'Erreur serveur',
        error: err.message
      });
    }

    res.status(200).json(articles);
  });
};

exports.getArticleById = function (req, res) {
  const id = req.params.id;

  Article.getById(id, function (err, article) {
    if (err) {
      return res.status(500).json({
        message: 'Erreur serveur',
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({
        message: 'Article non trouvé'
      });
    }

    res.status(200).json(article);
  });
};

exports.updateArticle = function (req, res) {
  const id = req.params.id;
  const titre = req.body.titre;
  const contenu = req.body.contenu;
  const categorie = req.body.categorie;
  const tags = req.body.tags;

  if (!titre || !contenu || !categorie) {
    return res.status(400).json({
      message: 'Les champs titre, contenu et categorie sont obligatoires.'
    });
  }

  Article.update(
    id,
    {
      titre: titre,
      contenu: contenu,
      categorie: categorie,
      tags: tags
    },
    function (err, changes) {
      if (err) {
        return res.status(500).json({
          message: 'Erreur serveur',
          error: err.message
        });
      }

      if (changes === 0) {
        return res.status(404).json({
          message: 'Article non trouvé'
        });
      }

      res.status(200).json({
        message: 'Article mis à jour avec succès'
      });
    }
  );
};

exports.deleteArticle = function (req, res) {
  const id = req.params.id;

  Article.delete(id, function (err, changes) {
    if (err) {
      return res.status(500).json({
        message: 'Erreur serveur',
        error: err.message
      });
    }

    if (changes === 0) {
      return res.status(404).json({
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      message: 'Article supprimé avec succès'
    });
  });
};

exports.searchArticles = function (req, res) {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({
      message: 'Le paramètre query est obligatoire.'
    });
  }

  Article.search(query, function (err, articles) {
    if (err) {
      return res.status(500).json({
        message: 'Erreur serveur',
        error: err.message
      });
    }

    res.status(200).json(articles);
  });
};
