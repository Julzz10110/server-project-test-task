import template from './groupsView.template';

const groupsView = {
  template: template(),
  controller: [
    'Group',
    'Server',
    '$stateParams',
    function (Group, Server, $stateParams) {
        this.group = Group.get({id: $stateParams.id});
        this.servers = Server.query();
        this.filteredServers = function() {
            return (this.servers).filter(serv => serv.groupId === this.group._id);
        }
    }],
};

export {groupsView};
