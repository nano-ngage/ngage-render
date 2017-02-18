var path = require('path');
var express = require('express');

// Views use pug to render basic html page
const app = new express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files to serve:
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);

console.log('Server now listening on port ' + 3000);
