const mysql = ('mysql');
const util = require ('util')

const connection = mysql.createConnections({

    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee'


})

connections.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;