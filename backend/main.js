var app = require('./app');
var http = require('http');

app.set('port', Number(process.env.port) || 3000);

process.stdout.write('Starting server on port ' + app.get('port') + '.\n');
http.createServer(app).listen(app.get('port'));
