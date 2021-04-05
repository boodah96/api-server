'use strict';
const express = require('express');
const validator = require('../middleware/validator.js');
const Food = require('../models/data-collection-class.js');
const foodModel = require('../models/food.js');
const food = new Food(foodModel);
const router = express.Router();

router.get('/', getFood);
router.get('/:id', validator, getFoodById);
router.post('/', createfood);
router.put('/:id', validator, updateFood);
router.delete('/:id', validator, deleteFood);


async function getFood(req, res, next) {
    try {
        const resObj = await food.read();
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

function getFoodById(req, res, next) {
    food
        .read(req.params.id)
        .then((responseData) => {
            res.json(responseData[0]);
        })
        .catch((error) => {
            next(error);
        });
}

async function createfood(req, res) {
    const foodObject = req.body;
    try {
        const resObj = await food.create(foodObject);
        res.status(201).json(resObj);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateFood(req, res, next) {
    const foodObject = req.body;
    try {
        const resObj = await food.update(req.params.id, foodObject);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

async function deleteFood(req, res, next) {
    try {
        const resObj = await food.delete(req.params.id);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

module.exports = router;