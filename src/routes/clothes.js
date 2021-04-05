'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Clothes = require('../models/data-collection-class.js');
const clothesModel = require('../models/clothes.js');
const clothes = new Clothes(clothesModel);
const router = express.Router();

router.get('/', getClothes);
router.get('/:id', validator, getClothesById);
router.post('/', createClothes);
router.put('/:id', validator, updateClothes);
router.delete('/:id', validator, deleteClothes);


async function getClothes(req, res, next) {
    try {
        const resObj = await clothes.read();
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

function getClothesById(req, res, next) {
    clothes
        .read(req.params.id)
        .then((responseData) => {
            res.json(responseData[0]);
        })
        .catch((error) => {
            next(error);
        });
}

async function createClothes(req, res) {
    const clothesObject = req.body;
    try {
        const resObj = await clothes.create(clothesObject);
        res.status(201).json(resObj);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateClothes(req, res, next) {
    const clothesObject = req.body;
    try {
        const resObj = await clothes.update(req.params.id, clothesObject);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

async function deleteClothes(req, res, next) {
    try {
        const resObj = await clothes.delete(req.params.id);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

module.exports = router;