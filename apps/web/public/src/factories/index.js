import {Server} from './Server.factory';
import {Group} from './Group.factory';
import {Task} from './Task.factory';
import {Charts} from './Charts.factory';

export const factoriesModule = angular.module('factories', [])
    .factory('Server', Server)
    .factory('Group', Group)
    .factory('Task', Task)
    .factory('Charts', Charts);
