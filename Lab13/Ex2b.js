var fs = require('fs');

var filename = __dirname + '/user_data.json';
// var users_reg_data = require(filename);
if(fs.existsSync(filename)) {
    var file_stats = fs.statSync(filename);
    console.log(`user_data.json has ${file_stats.size} characters`);
    var data =  fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(data);
    
    console.log(users_reg_data["kazman"]['password']);
} else {
    console.log(`${filename} does not exist!`);
}
