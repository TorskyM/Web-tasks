const noteRoutes = require('./route');

module.exports = function(app, db) {
  noteRoutes(app, db);

};