const mongoose = require('mongoose');
const userActionSchema = new mongoose.Schema({
  date: String,
  serverId: String,
  user: String,
  action: String,
});

const groupActionSchema = new mongoose.Schema({
  date: String,
  groupId: String,
  user: String,
  action: String,
});

userActionSchema.index({
  serverId: 1,
  date: -1,
});

groupActionSchema.index({
  groupId: 1,
  date: -1,
});


module.exports = {
  userActionSchema,
  groupActionSchema
};
