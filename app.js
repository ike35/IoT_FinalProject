// require Express
var express = require('express');
var bodyParser = require('body-parser');
var mqtt    = require('mqtt');


var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/fonts', express.static(__dirname + '/public/font-awesome/fonts'));
app.use(bodyParser.json());


var client  = mqtt.connect('mqtt://iot.eclipse.org');

client.on('connect', function () {
  client.subscribe('ike');
  // client.publish('oneplusone/a', 'kerker');
});

// var thing-name = 'key';
var handsome = "蘇彥大哥";

app.get('/', function(req, res) {
    console.log(req.query.name + ' - light on');
    client.publish('oneplusone/a', 'light;open');
    res.render('index.ejs', {
        'name': '蘇彥大哥'
    });
    // client.publish('oneplusone/a', handsome);
});

app.get('/sign-up', function(req, res) {
    res.render('sign-up.ejs', {
        'name': '蘇彥大哥'
    });
});

app.get('/sign-in', function(req, res) {
    res.render('sign-in.ejs', {
        'name': '蘇彥大哥'
    });
});

app.get('/take-photo', function(req, res) {
    res.render('take-photo.ejs', {
        'name': '蘇彥大哥'
    });
});

var thing_su = ['key', 'phone', 'wallet', 'helmet', 'laptop'];
var thing_already_su = [];
var thing_su_new = [];
var thing_mom = ['wallet', 'laptop'];
var thing_already_mom = [];
var thing_dad = ['phone', 'key', 'laptop'];
var thing_already_dad = [];

app.get('/reminder', function(req, res) {
    thing_su_new = [];
    res.render('reminder.ejs', {
        'name': '蘇彥大哥',
        'thing': thing_su,
        'thing_already': thing_already_su
    });
});

app.get('/reminder-res', function(req, res) {
    console.log('text: ' + req.query.name);
    if (thing_already_su.indexOf(req.query.name) >= 0) {
      // thing_already_su.splice(thing_already_su.indexOf(req.query.name), 1);
      thing_su_new.splice(thing_su_new.indexOf(req.query.name), 1);
      console.log(thing_su_new);
    }
    else {
      thing_already_su.push(req.query.name);
      thing_su_new.push(req.query.name);
      console.log(thing_su_new);
    }
    res.end();
});

app.get('/find', function(req, res) {
    console.log('finding: ' + thing_already_su.length +'  '+thing_su.length);
    if ((thing_su.length === thing_already_su.length) && thing_su_new.length === 0) {
      res.render('nice-day.ejs');
    } else if(thing_su.length === thing_already_su.length) {
      for (var i = 0 ; i < thing_su_new.length ; i ++) {
        client.publish('oneplusone/a', thing_su_new[i] + ';open');
        console.log('Send to edison: ' + thing_su_new[i]);
      }
      console.log(thing_su_new.length);
      res.render('find-my.ejs', {
        'thing_name': thing_su_new,
        'finish': true
      });
    }
    else {
      for (var i = 0 ; i < thing_su_new.length ; i ++) {
        client.publish('oneplusone/a', thing_su_new[i] + ';open');
        console.log('Send to edison: ' + thing_su_new[i]);
      }
      res.render('find-my.ejs', {
        'thing_name': thing_su_new,
        'finish': false
      });
    }
    // return res.send('done');
});

app.get('/users', function(req, res) {
    thing_already_su = [];
    res.render('users.ejs', {
        'name': '蘇彥大哥'
    });
});

app.get('/nice-day', function(req, res) {
    res.render('nice-day.ejs', {
        'name': '蘇彥大哥'
    });
});

app.get('/main', function(req, res) {
    res.render('main.ejs', {
        'name': '蘇彥大哥',
        'tips_from': ['大哥', '指導老師'],
        'tips': ['...蘇彥，你忘了帶好多東西，快回房間檢查！', '你怎麼又忘了帶東西！！！'],
        'things': ['安全帽', '鑰匙', '錢包', '鑰匙', '錢包'],
        'things_image': ['helmet', 'key', 'wallet', 'key', 'wallet']
    });
});

var light_count = 0;
app.get('/text', function(req, res) {
    console.log('text: ' + req.query.name);
    if (req.query.name === 'closeLight') {
      console.log(req.query.name + ' - light off');
      client.publish('oneplusone/a', 'light;close');
    }
    // secret function
    if (req.query.name === 'camera') {
      if (light_count % 2 == 0) {
        console.log(req.query.name + ' - light on');
        client.publish('oneplusone/a', 'light;open');
      }
      else {
        console.log(req.query.name + ' - light off');
        client.publish('oneplusone/a', 'light;close');
      }
      light_count += 1;
    }
    res.end();
});

app.get('/off', function(req, res) {
    console.log('close: ' + req.query.name);
    client.publish('oneplusone/a', req.query.name + ';close');
    res.end();
});

app.listen(1234, function() {
    console.log('ready on port 1234');
});