module.exports = {
    server: {
        host: 'localhost',
        port: 8080
    },
    db: {
        host: 'localhost',
        port: 27017,
        db: 'checkappdb',
        url: 'mongodb://127.0.0.1:27017/checkappdb'
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        username: "checkappteste@gmail.com",
        password: "checkapp@9005",
        accountName: "CheckApp",
        verifyEmailUrl: "activation"
    }
};