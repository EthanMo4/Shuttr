if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required');
}

if (!process.env.SECRET) {
    throw new Error('SECRET environment variable is required');
}

module.exports = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI,
    secret: process.env.SECRET
};