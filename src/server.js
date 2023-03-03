require('dotenv').config();
const app = require('./app');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.listen(port, () => console.log('ouvindooo porta', port));
