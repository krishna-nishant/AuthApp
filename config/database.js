const mongoose = require("mongoose")

require("dotenv").config()

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('DB Connection Succesful') })
        .catch((err) => {
            console.log('Received an error')
            console.error(err);
            process.exit(1)
        });
}