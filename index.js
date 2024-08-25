const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
