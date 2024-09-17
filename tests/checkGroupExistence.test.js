import {jest} from '@jest/globals';

const axios = require('axios');
const config = require('config');

jest.mock('axios');
test('check if group of exact server exist (if groupId is valid)', async () => {

  const serverData = {
        _id: "66e9e26899f7b97cf3505394",
        name: "test_server",
        host: "127.0.0.115",
        username: "test_user",
        password: "test_pass",
        groupId: "66e9e24899f7b97cf350538f",
        status: "stoped",
        __v: 0
  };

  axios.get.mockResolvedValue({serverData});
  
  const result = await fetch( 'http://localhost:' 
                              + config.get('apps.web.port') 
                              + '/groups', {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                },
                            })
                               .then(response => response.json());

  expect(result.filter(obj => 
            obj.groupId != serverData.groupId).length === 1)
            .toBe(true);

});