'use strict';

module.exports = function(app){

    var myController = require('../controllers/myController');

    app.route('/signup')
    .post(myController.signup);

    app.route("/getAllUsers")
    .get(myController.getAllUsers);
}