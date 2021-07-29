const connection = require("./connections")


var db = {
    findAllEmployees:function () {
        connection.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });

    }


}













module.exports = db