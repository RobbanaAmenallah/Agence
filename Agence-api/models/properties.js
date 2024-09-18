const mongoose = require('mongoose');
const Category = require('./category'); // Assurez-vous que ce modèle existe

const PropertiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String ,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,  
        required: true,
    },
    floor: {
        type: Number, 
        required: true,
    },
    parking: {
        type: Number,  
        required: true,
    }
});

const Properties = mongoose.model('Properties', PropertiesSchema);

module.exports = Properties;
