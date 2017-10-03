var app = require('./config/server');
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server ON ' + port );
});
