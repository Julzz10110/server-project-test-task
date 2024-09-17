stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function stateConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
      .state({
        name: 'servers',
        url: '/servers',
        component: 'serversList',
      })
      .state({
        name: 'servers.view',
        url: '/view/:id',
        component: 'serversView',
      })
      .state({
        name: 'servers.edit',
        url: '/edit/:id',
        component: 'serversEdit',
      })
      .state({
        name: 'servers.create',
        url: '/create',
        component: 'serversEdit',
      })
      .state({
        name: 'journals',
        url: '/journals',
        component: 'journalsMain',
      })
      .state({
        name: 'charts',
        url: '/charts',
        component: 'chartsMain',
      })
      .state({
        name: 'groups',
        url: '/groups',
        component: 'groupsList',
      })
      .state({
        name: 'groups.view',
        url: '/view/:id',
        component: 'groupsView',
      })
      .state({
        name: 'groups.edit',
        url: '/edit/:id',
        component: 'groupsEdit',
      })
      .state({
        name: 'groups.create',
        url: '/create',
        component: 'groupsEdit',
      });
}
