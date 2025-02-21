//import mongoose from 'mongoose';
const mongoose=require("mongoose");

main().then(() => {
    console.log("connected to db");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017', {dbName: 'test'});
}


let dbSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number
    }
});

let Data = mongoose.model("Data", dbSchema);



// let newdata = new Data({
//     name: "manish",
//     email: "asd@gmail.com",
//     phone: 343665
// });

// newdata.save()
//     .then(() => {
//         console.log('User saved!');
//     })
//     .catch((err) => {
//         console.error('Error saving user:', err);
//     });

 module.exports = Data;