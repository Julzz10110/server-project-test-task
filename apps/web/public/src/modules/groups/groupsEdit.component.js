import template from './groupsEdit.template';

const groupsEdit = {
  template: template(),
  controller: [
    'Group',
    '$stateParams',
    '$state',
    'NotificationService',
    function(Group, $stateParams, $state, NotificationService) {
        if($stateParams.id) {
            this.group = Group.get({id:$stateParams.id});
        } else {
            this.group = new Group();
        }
        this.save = function() {
            this.group.$save(function(){
                NotificationService.showSuccess('Группа сохранена');
                $state.go('groups', {}, {reload: true});
            })
        }

    }],
};

export {groupsEdit};
