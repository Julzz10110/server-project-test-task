const express = require('express');

const {serversRouter} = require('./servers');
const {groupsRouter} = require("./groups");
const {journalsRouter} = require('./journals');
const {tasksRouter} = require('./tasks');
const {chartsRouter} = require('./charts');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    account: req.account,
    user: req.user,
    apps: req.relatedApplications,
  });
});

router.use('/servers', serversRouter);
router.use('/groups', groupsRouter);
router.use('/journals', journalsRouter);
router.use('/tasks', tasksRouter);
router.use('/charts', chartsRouter);

module.exports = router;
