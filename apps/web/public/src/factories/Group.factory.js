const Group = [
    '$resource',
    function($resource) {
      return $resource('/groups/:id', {id: '@_id'}, {
      });
    },
  ];
  
  export {Group};
  