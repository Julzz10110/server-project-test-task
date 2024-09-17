const express = require('express');
const moment = require('moment');

const {Group} = require('../../../models');

const groupsRouter = express.Router();

groupsRouter.get('/', async (req, res) => {
    try {
        console.log('get groups');
        const groups = await Group.find({});
        res.json(groups);
    } catch (err) {
        console.log(err);
        res.json([]);
    }
});

groupsRouter.get('/:id', async (req, res) => {
    try {
        console.log('get groups id', req.params.id);
        res.json(await Group.findOne({
            _id: req.params.id
        }));
    } catch (err) {
        console.log(err);
        res.json({});
    }
});

groupsRouter.post('/', async (req, res) => {
    try {
        console.log('post groups');
        const group = new Group(req.body);
        res.json(await group.save());
    } catch (err) {
        console.log(err);
        res.json({});
    }
});

groupsRouter.post('/:id', async (req, res) => {
    try {
        console.log('post groups id', req.params.id);
        const group = await Group.findOne({
            _id: req.params.id
        });
        if (group) {
            res.json(await (Object.assign(group, req.body)).save());
        } else {
            res.json({});
        }
    } catch (err) {
        console.log(err);
        res.json({});
    }
});

module.exports = {
    groupsRouter
}