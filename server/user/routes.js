var User = require('./controller');

module.exports = function(app) {
    // API Server Endpoints
    app.post('/user', User.create);
    app.post('/login', User.login);
    app.post('/forgotPassword', User.forgotPassword);
    app.post('/resendVerificationEmail', User.resendVerificationEmail);
    app.get('/activation/:token', User.verifyEmail);
}