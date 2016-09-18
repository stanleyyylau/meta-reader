var express = require('express');
var app = express();
var multer  = require('multer')
var config = require('./config.js')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    // the original file extent
    var lastIndex = file.originalname.lastIndexOf('.');
    var fileExtention = file.originalname.slice(lastIndex);
    console.log(fileExtention);
    file.fullFileName = file.fieldname + '-' + Date.now() + fileExtention;
    cb(null, file.fullFileName);
  }
})

var upload = multer({ storage: storage })

// var upload = multer({ dest: './uploads/'});

//nothing happens here

var port = process.env.PORT || 5000;



app.use(express.static('public'));


app.get('/',function(req,res){
    res.send(index.html);
})

//upload handler is define in another router
app.post('/upload', upload.single('file'), function (req, res){
    console.log(req.file);
    console.log(req.file.fullFileName);
    res.send({size: req.file.size,
              url: config.imgUrl + req.file.fullFileName
    });
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
