var app = require('./app');
var db = require('./db');
var http = require('http');

app.set('port', Number(process.env.port) || 3000);

var connectionString = process.env.connectionString
  || 'postgres://postgres:password@localhost:5432/db';

db.init(connectionString, function (err) {
  if (err) { throw err; }
  process.stdout.write('Starting server on port ' + app.get('port') + '.\n');
  http.createServer(app).listen(app.get('port'));
});
