var mongoose = require("mongoose"),
path = require("path"),
fs = require("fs"), //fs allows us to read and write files
mp = path.join(__dirname, "./../models");

mongoose.connect("mongodb+srv://admin:Password%40123@cluster0.i1cez.mongodb.net/polldb?retryWrites=true&w=majority", function(err){
    console.log(err);
});
mongoose.Promise = global.Promise;

console.log(mongoose.connection.readyState);

fs.readdirSync(mp).forEach(function(file){
if(file.indexOf(".js") >=0){
    require(mp + "/" + file);
}
})