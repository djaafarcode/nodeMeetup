let express = require('express');
let app = express();
let mustache = require('mustache');
let fs = require('fs');
let bodyParser = require('body-parser');
let tabArt = [];
//Djaafar
let tabuser = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let tabEvent = [{
    name: "test",
    content: "ceci est un test"
}];

app.use("/", express.static("public"));

app.post("/event", function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.post("/event/add", function(req, res) {
    let obj = {};
    obj.title = req.body.title;
    obj.content = req.body.content;
    tabArt.push(obj);
    res.send(tabArt);
});
app.post("/event/del", function(req, res) {
    array.splice(req.body.id, 1);
    res.send('okay');
});
app.get("/", function(req, res) {
    res.render("index");
});

// ####### Djaafar #######

//Create a path
app.post("/user/add", function(req, res) {
    console.log(req.body);
    //add tab value of form client.
    tabuser.push(req.body);
    console.log(tabuser);
    res.send(req.body);
});

//load file adduser on the path.
app.get("/adduser", function(req, res) {
    res.render("adduser");
});
// ####### Djaafar #######

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    });
});
app.listen(9000, function(err) {
    if (err) {
        console.log(err);
        return;
    };
    console.log('Server Ok');

});

app.set('views', './template');
app.set('view engine', "html");