'use strict';Object.defineProperty(exports,'__esModule',{value:true});var getAllUsers = function getAllUsers(admin, data, _) {
  return admin.auth().listUsers(1000, data.nextPageToken).then(function (users) {
    return users;
  }).catch(function (err) {
    return err;
  });
};exports.getAllUsers=getAllUsers;