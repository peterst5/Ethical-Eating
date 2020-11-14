const bcrypt = require('bcryptjs');

module.exports = function(pool) {
    var module = {};

    module.create = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
    
        var sql = 'SELECT Email FROM user WHERE Email = ?;';
        var values = [email];
    
        return pool.query(sql, values, function(err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'success': false,
                    'message': 'an error occurred'
                });
            }

            if (result.length > 0) {
                return res.status(200).json({
                    'success': false,
                    'message': 'email address is not available'
                });
            }

            var sql = 'INSERT INTO user (Email, Password) VALUES (?, ?);';
            var hashedPassword = bcrypt.hashSync(password, 10);
            var values = [email, hashedPassword];

            pool.query(sql, values, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'success': false,
                        'message': 'an error occurred'
                    });
                }

                return res.status(200).json({
                    'success': true,
                    'message': 'thank you, come again'
                });
            })
        });
    }

    return module;
}

return module;