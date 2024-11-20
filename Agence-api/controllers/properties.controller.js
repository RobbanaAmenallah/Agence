
const express = require('express');
const Properties = require('../models/properties'); // Correction ici, vérifiez bien le chemin du modèle

const app = express()

// Route pour obtenir toutes les propriétés
app.get('/', (req, res) => {
    Properties
        .find()
        .then((properties) => {
            res.status(200).send(properties);
        })
        .catch(() => {
            res.status(400).send({ message: "Error fetching data" });
        });
});

// Route pour créer une nouvelle propriété
app.post('/', (req, res) => {
    // Récupérer les données envoyées par le client
    const { name, price, category, bedrooms, bathrooms, area, floor, parking } = req.body;

    // Créer un nouvel objet propriété
    const propertiesToSave = new Properties({
        name,
        price,
        category,
        bedrooms,
        bathrooms,
        area,
        floor,
        parking
    });

    propertiesToSave
        .save()
        .then(() => {
            res.status(201).send({ message: "Property saved!" });
        })
        .catch((error) => {
            res.status(400).send({ message: "Error saving property", error });
        });
});

app.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const property = await Properties.findOneAndDelete({ _id: id })

        if (!property) {
            res.status(400).send({ message: "property not found" })

        }
        else {
            res.status(200).send({ message: "property deleted" })
        }
    } catch (error) {
        res.status(400).send({ message: "Error fetching data", error: error })
    }
})

app.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const property = await Properties.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!property) {
            return res.status(404).send({ message: "Property not found" });
        }

        // Retourne la propriété mise à jour
        return res.status(200).send(property);
    } catch (error) {
        // Gestion plus générique des erreurs
        return res.status(400).send({ message: "Error updating property", error: error.message });
    }
});

app.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const property = await Properties.findOne({_id: id})

        if (!property){
            res.status(400).send({ message: "property not found" })

        }
        else{
            res.status(200).send(property)
        }
    } catch (error) {
        res.status(400).send({ message: "Error fetching data", error : error })
    }
})

module.exports = app;
