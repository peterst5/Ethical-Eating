var mysql = require('mysql');
var dbConfig = require('../db_config.js')

var con = mysql.createConnection(dbConfig);

process.stdout.write('Connecting to database... ');
con.connect(function(err) {
    if (err) OnSqlError(con, err);
    process.stdout.write('Success\n');

    process.stdout.write('Dropping \'user\' table... ');
    var sql = 'DROP TABLE user;';

    con.query(sql, function(err, result) {
        if (err) OnSqlError(con, err);
        process.stdout.write('Success\n');

        process.stdout.write('Disconnecting... ');
        con.end(function(err) {
            if (err) OnSqlError(con, err);
            process.stdout.write('Success\n');
        });
    });
});