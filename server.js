var path = require('path');
var express = require('express');

// Views use pug to render basic html page
const app = new express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Static files to serve:
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  //res.render('index');
})

app.listen(3000);

console.log('Server now listening on port ' + 3000);


// router.get('*', function (req, res){
//   res.sendFile(path.resolve(__dirname, 'dist'));
//   //res.render('index');
// })