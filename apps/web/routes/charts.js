const express = require('express');
const moment = require('moment');

const {Server, Task} = require('../../../models');

const chartsRouter = express.Router();

chartsRouter.get('/aggregate/day-tasks', async (req, res) => {
  try {
    console.log('get chart "day-tasks"');

    const name = 'задачи выполненные за день';
    const servers_task_list = [];
    const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    const recived_date = req.query.day;
    const servers = await Server.find({});

    const selected_day = {
      start: moment(recived_date).startOf('day'),
      end: moment(recived_date).endOf('day')
    }

    for (let server of servers) {
      const serverId = server._id.valueOf();
      const server_name = server.name;

      const tasks_per_hour = [];

      for (let start = moment(selected_day.start); start <= selected_day.end; start.add(1, 'hour')) {

        const date = {
          $gte: start.format('YYYY-MM-DD HH:00:00'),
          $lte: start.format('YYYY-MM-DD HH:59:59'),
        };

        const complete_tasks_count = await Task.countDocuments({
          serverId,
          date,
          isComplete: true,
        });

        tasks_per_hour.push(complete_tasks_count);
      }

      servers_task_list.push({
        name: server_name,
        tasks: tasks_per_hour,
      })
    }

    res.json({
      name: name,
      tasks: {
        labels: labels,
        complete: servers_task_list,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      name: name,
      tasks: [],
    });
  }
});


chartsRouter.get('/:serverId', async (req, res) => {
  try {
    const serverId = req.params.serverId;
    const end = moment();
    const start = moment().subtract(30, 'days');
    const labels = [];
    const complete = [];
    const notComplete = [];
    for (; start <= end; start.add(1, 'days')) {
      const date = {
        $gte: start.format('YYYY-MM-DD 00:00:00'),
        $lte: start.format('YYYY-MM-DD 23:59:59'),
      };
      labels.push(start.format('DD.MM'));
      complete.push(await Task.countDocuments({
        serverId,
        date,
        isComplete: true,
      }));
      notComplete.push(await Task.countDocuments({
        serverId,
        date,
        isComplete: false,
      }));
    }
    res.json({
      tasks: {
        labels,
        complete,
        notComplete,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      tasks: {
        labels: [],
        complete: [],
        notComplete: [],
      },
    });
  }
});

module.exports = {
  chartsRouter,
};
