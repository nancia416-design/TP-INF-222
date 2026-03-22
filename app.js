const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const articleRoutes = require('./routes/articleRoutes');
const swaggerSpec = require('./docs/swagger');
require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', function (req, res) {
  res.json({
    message: 'Bienvenue sur l API du blog'
  });
});

app.use('/api', articleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, function () {
  console.log('Serveur lancé sur http://localhost:' + PORT);
  console.log('Documentation Swagger : http://localhost:' + PORT + '/api-docs');
});
