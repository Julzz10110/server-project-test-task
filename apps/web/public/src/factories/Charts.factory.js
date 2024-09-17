const Charts = [
  '$resource',
  function($resource) {
    return $resource('/charts/aggregate/day-tasks', { param: '@param' }, {
      serverCharts: {
        url: '/charts/:serverId',
        method: 'get',
        isArray: false,
      },
    });
  },
];

export {Charts};
