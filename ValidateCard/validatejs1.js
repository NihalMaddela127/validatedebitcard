let express = require('express');
let bodyParser =require("body-parser");
let path = require("path");
let app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser());

let transvalidate = function(req, res, next){
    let transNumber = req.query.transnumber;
    if(transNumber.length < 12 ){
        res.send('Transaction number must be 12 digits');
    }
    else{
        res.render('pages/trans');
    }
    next();
}

let cardvalidate = function(req, res, next){
    let cardNumber = req.body.cardno;
    let cardHolder = req.body.cardhl;
    let cardCvv = req.body.cardcv;
    if(cardNumber.length < 16 || cardHolder.length == '' || cardCvv.length != 3){
        next(err);
    } 
    else{
        res.render('pages/success');
    }   
    next();
}

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.post('/login',cardvalidate, function(req, res){
    app.get('/feed',function(req, res){
        
    });
});

app.get('/trans', transvalidate, function(req, res) {
    res.render('pages/trans');
});

app.use(function(err,req,res,next){
    if(err){
        res.render('pages/error')
    }
});

app.listen(3000);
console.log('3000 is the magic port');