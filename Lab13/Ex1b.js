var filename = __dirname + '/user_data.json';
var users_reg_data = require(filename);
console.log(users_reg_data["kazman"]['password']);