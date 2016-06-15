'use strict';

var http = require('http');
http.createServer(function (req, res) {
  req.on('data', function (data) {
    console.log('body: ' + data);
  });
  console.log('method: ' + req.method);
  console.log('headers: ' + JSON.stringify(req.headers));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type');
  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(JSON.stringify(mockData(req)));
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

function mockData(req) {
  var authToken = {
    data: {
      type: 'authenticationTokens',
      id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
      value: 'this_is_an_authentication_token'
    }
  };
  var configuration = {
    data: {
      medication: {
        time: '00:01',
        name: 'Mirtazapine'
      },
      physician: {
        firstName: 'Hanna',
        lastName: 'Sylvester',
        phoneNumber: '800-555-1234'
      },
      researchAssistant: {
        firstName: 'Bob',
        lastName: 'Mochacchino',
        email: 'bob@loblaw.com',
        phoneNumber: '800-555-5309'
      }
    }
  };

  if (req.method === 'OPTIONS') {
    return {};
  } else if (req.method === 'POST') {
    return authToken;
  } else if (req.method === 'GET') {
    return configuration;
  }
}
