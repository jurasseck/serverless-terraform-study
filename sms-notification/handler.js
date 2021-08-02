'use strict';

module.exports.send = async event => {
  console.log('Faz de conta que enviou o SMS')
  return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
