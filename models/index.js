const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = Promise;

const settingsConnection = mongoose.createConnection(config.get('mongodb'));

const {serverSchema} = require('./server');
const {groupSchema} = require('./group');
const {userActionSchema} = require('./user-action');
const {taskSchema} = require('./task');

const Server = settingsConnection.model('servers', serverSchema);
const Group = settingsConnection.model('groups', groupSchema);
const UserAction = settingsConnection.model('useractions', userActionSchema);
const Task = settingsConnection.model('tasks', taskSchema);


module.exports = {
  Server,
  Group,
  UserAction,
  Task,
};
