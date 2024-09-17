import template from './groupsList.template';

const groupsList = {
  template: template(),
  controller: [
    'Group',
    function(Group) {
      this.groups = Group.query();
    }],
};

export {groupsList};
