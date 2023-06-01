const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes); // 모든 API 엔드포인트는 '/api'로 시작합니다.

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
