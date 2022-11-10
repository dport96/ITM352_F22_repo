var fs = require('fs');

var filename = __dirname + '/user_data.json';
// var users_reg_data = require(filename);
var data =  fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(data);

console.log(users_reg_data["kazman"]['password']);