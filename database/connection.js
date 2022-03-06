const mongoose = require('mongoose');

module.exports = async () => {
    try {
        console.log(process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Database Connected');
    } catch (error) {
        console.log('Database Connectivity Error', error);
        throw new Error(error);
    }
}