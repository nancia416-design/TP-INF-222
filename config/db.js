const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', function (err) {
  if (err) {
    console.error('Erreur de connexion à SQLite :', err.message);
  } else {
    console.log('Connexion à la base SQLite réussie.');

    db.run(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        contenu TEXT NOT NULL,
        auteur TEXT NOT NULL,
        date TEXT NOT NULL,
        categorie TEXT NOT NULL,
        tags TEXT
      )
    `, function (error) {
      if (error) {
        console.error('Erreur lors de la création de la table articles :', error.message);
      } else {
        console.log('Table articles prête.');
      }
    });
  }
});

module.exports = db;
