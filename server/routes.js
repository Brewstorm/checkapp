module.exports = function(app) {
    // API Server Endpoints
    require("./user/routes")(app);
};