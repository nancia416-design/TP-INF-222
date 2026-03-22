
Blog API Backend

Description

Ce projet est une API backend développée dans le cadre du cours **INF222 – Programmation Web**.  
Il s'agit d’un service permettant de gérer un blog simple à travers différentes opérations sur des articles.

L’API offre des fonctionnalités complètes de gestion des articles, notamment la création, la lecture, la mise à jour, la suppression ainsi que la recherche d’articles.

Elle est conçue pour être testée localement et documentée à l’aide de Swagger.

Objectifs du projet

- Mettre en pratique les concepts du développement backend
- Comprendre le fonctionnement des API REST
- Manipuler une base de données
- Documenter une API avec Swagger
- Structurer un projet backend proprement


 Technologies utilisées

- Node.js (environnement d’exécution)
- Express.js (framework backend)
- SQLite / MySQL / MongoDB (base de données)
- Swagger UI (documentation de l’API)
- Postman (tests des endpoints)


 Fonctionnalités

L’API permet de :

- Créer un article
- Afficher tous les articles
- Afficher un article spécifique
- Modifier un article
- Supprimer un article
- Rechercher des articles


 Structure du projet

project/
│── routes/
│── controllers/
│── models/
│── config/
│── app.js
│── package.json


- routes/ : définition des endpoints
- controllers/ : logique métier
- models/ : gestion de la base de données
- config/ : configuration du projet


 Installation

 1. Cloner le projet

git clone <lien-du-repo>
cd blog-api

2. Installer les dépendances

npm install

3. Lancer le serveur

npm start

•Le serveur démarre sur:
http://localhost:3000
•La documentation est accéssible via:
http://localhost:3000/api-docs

•Endpoints principaux

•Créer un article:POST /api/articles
•Récupérer tous les articles:GET /api/articles
•Récupérer un article:GET /api/articles/{id}
•Modifier un article:PUT /api/articles/{id}
•Supprimer un article:DELETE /api/articles/{id}
•Rechercher un article:GET /api/articles/search?query=texte

•Bonnes pratiques appliquées
Validation des données d’entrée
Utilisation des codes HTTP :
200 : succès
201 : création réussie
400 : requête invalide
404 : ressource non trouvée
500 : erreur serveur
Organisation en couches (routes, contrôleurs, modèles)
