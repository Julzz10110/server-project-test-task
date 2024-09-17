import template from './serversView.template';

const serversView = {
  template: template(),
  controller: [
    'Server',
    '$stateParams',
    'NotificationService',
    'Charts',
    '$uibModal',
    function(Server, $stateParams, NotificationService, Charts, $uibModal) {
      this.server = Server.get({id: $stateParams.id});
      this.charts = Charts.serverCharts({serverId: $stateParams.id});
      this.showServerInfo = function() {
        $uibModal.open({
          component: 'showPayloadModal',
          size: 'lg',
          resolve: {
            payload: this.server,
          },
        }).result.catch(angular.noop);
      };
      this.start = function(force = false) {
        if (force || confirm('Вы хотите запустить сервер?')) {
          this.server.$start(function() {
            NotificationService.showSuccess('Сервер запущен');
          });
        }
      };
      this.stop = function(force = false) {
        if (force || confirm('Вы хотите остановить сервер?')) {
          this.server.$stop(function() {
            NotificationService.showSuccess('Сервер остановлен');
          });
        }
      };
      this.restart = function() {
        if (confirm('Вы хотите перезапустить сервер?')) {
          
          this.server.$restart(function() {
            NotificationService.showNotification('Перезапуск сервера...');
            });

          new Promise(
            setTimeout(() => {
              this.stop(true);
            }, 3000)
            .then(
              setTimeout(() => {
                this.start(true);
              }, 5000)
            ),
            new Error('ОШИБКА: Перезапуск сервера прерван')
            ).then(NotificationService.showSuccess('Сервер перезапущен'),  
                              error => NotificationService.showError(error.message));
                            
        }
      };
    }],
};

export {serversView};
