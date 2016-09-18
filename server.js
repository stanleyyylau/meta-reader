var express = require('express');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: './uploads/'});

//nothing happens here

var port = process.env.PORT || 5000;



app.use(express.static('public'));


app.get('/',function(req,res){
    res.send(index.html);
})

//upload handler is define in another router
app.post('/upload', upload.single('photho'), function (req, res){
    console.log(req.file);
    res.send({size: req.file.size});
});


// catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error Handler

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});



app.listen(port, function(){
  console.log('Server is on...', port);
});
