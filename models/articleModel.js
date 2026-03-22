const db = require('../config/db');

const Article = {
  create: function (article, callback) {
    const titre = article.titre;
    const contenu = article.contenu;
    const auteur = article.auteur;
    const date = article.date;
    const categorie = article.categorie;
    const tags = JSON.stringify(article.tags || []);

    const sql = `
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [titre, contenu, auteur, date, categorie, tags], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, {
          id: this.lastID,
          titre: titre,
          contenu: contenu,
          auteur: auteur,
          date: date,
          categorie: categorie,
          tags: article.tags || []
        });
      }
    });
  },

  getAll: function (filters, callback) {
    let sql = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (filters.categorie) {
      sql += ' AND categorie = ?';
      params.push(filters.categorie);
    }

    if (filters.auteur) {
      sql += ' AND auteur = ?';
      params.push(filters.auteur);
    }

    if (filters.date) {
      sql += ' AND date = ?';
      params.push(filters.date);
    }

    db.all(sql, params, function (err, rows) {
      if (err) {
        callback(err, null);
      } else {
        const formattedRows = rows.map(function (article) {
          return {
            id: article.id,
            titre: article.titre,
            contenu: article.contenu,
            auteur: article.auteur,
            date: article.date,
            categorie: article.categorie,
            tags: article.tags ? JSON.parse(article.tags) : []
          };
        });
        callback(null, formattedRows);
      }
    });
  },

  getById: function (id, callback) {
    const sql = 'SELECT * FROM articles WHERE id = ?';

    db.get(sql, [id], function (err, row) {
      if (err) {
        callback(err, null);
      } else if (!row) {
        callback(null, null);
      } else {
        callback(null, {
          id: row.id,
          titre: row.titre,
          contenu: row.contenu,
          auteur: row.auteur,
          date: row.date,
          categorie: row.categorie,
          tags: row.tags ? JSON.parse(row.tags) : []
        });
      }
    });
  },

  update: function (id, article, callback) {
    const titre = article.titre;
    const contenu = article.contenu;
    const categorie = article.categorie;
    const tags = JSON.stringify(article.tags || []);

    const sql = `
      UPDATE articles
      SET titre = ?, contenu = ?, categorie = ?, tags = ?
      WHERE id = ?
    `;

    db.run(sql, [titre, contenu, categorie, tags, id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  delete: function (id, callback) {
    const sql = 'DELETE FROM articles WHERE id = ?';

    db.run(sql, [id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  search: function (query, callback) {
    const sql = `
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
    `;
    const searchValue = '%' + query + '%';

    db.all(sql, [searchValue, searchValue], function (err, rows) {
      if (err) {
        callback(err, null);
      } else {
        const formattedRows = rows.map(function (article) {
          return {
            id: article.id,
            titre: article.titre,
            contenu: article.contenu,
            auteur: article.auteur,
            date: article.date,
            categorie: article.categorie,
            tags: article.tags ? JSON.parse(article.tags) : []
          };
        });
        callback(null, formattedRows);
      }
    });
  }
};

module.exports = Article;
