var express = require('express');

var app = express();

var static = require('path').resolve(__dirname, 'dist');
app.use('/', express.static(static));

app.listen(3001);