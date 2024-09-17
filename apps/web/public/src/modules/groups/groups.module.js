import {groupsList} from './groupsList.component';
import {groupsEdit} from './groupsEdit.component';
import {groupsView} from './groupsView.component';

export const groupsModule = angular.module('groups', [])
    .component('groupsList', groupsList)
    .component('groupsEdit', groupsEdit)
    .component('groupsView', groupsView)
