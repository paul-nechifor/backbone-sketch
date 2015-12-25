var app = require('./app');
var http = require('http');

app.set('port', Number(process.env.port) || 3000);

console.log('Starting server on port ' + app.get('port') + '.');
http.createServer(app).listen(app.get('port'));
