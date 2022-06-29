/* eslint-disable max-len */
'use strict';

// Define API name
// Purpose of the API - add a new user to the database
// Define parameters required - name, email, contact
// Validate parameters(throw error if required) - v
// Write logic (find query to check email address exists)
// Define data to return

module.exports = function(TestAppuser) {
  TestAppuser.createUser = (name, email, contactNo, callback) => {
    const promise = new Promise((resolve, reject) => {
      if (!name || typeof name !== 'string') {
        return reject('Invalid Name');
      }
      if (!email) {
        return reject('Invalid Email');
      }
      if (!contactNo) {
        return reject('Invalid Contact Number');
      }

      TestAppuser.find({where: {email: email}})
        .then(data => {
          if (data.length !== 0) {
            return reject('User Already Exists');
          }

          let newUser = {
            name: name,
            email: email,
            contactNo: contactNo,
            createdDate: new Date(),
            lastModifiedDate: new Date(),
            isActive: true,
          };
          return TestAppuser.create(newUser);
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestAppuser.remoteMethod('createUser', {
    http: {
      path: '/CreateUser',
      verb: 'post',
    },
    accepts: [{
      arg: 'name',
      type: 'string',
    }, {
      arg: 'email',
      type: 'string',
    }, {
      arg: 'contactNo',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestAppuser.fetchUserDetails = (userId, callback) => {
    const promise =  new Promise((resolve, reject) => {
      if (!userId) {
        return reject('Invalid ID');
      }
      TestAppuser.findById(userId)
        .then(data => {
          if (!data) {
            return reject('User doesn\'t exists');
          }
          return resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(function(data) {
        return callback(null, data);
      }).catch(function(err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestAppuser.remoteMethod('fetchUserDetails', {
    http: {
      path: '/user',
      verb: 'get',
    },
    accepts: {
      arg: 'userId',
      type: 'number',
    },
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestAppuser.updateUserDetails = (userId, name, email, contactNo, callback) => {
    const promise = new Promise((resolve, reject) => {
      TestAppuser.findById(userId)
        .then(existingUser => {
          if (name && typeof name === 'string') {
            existingUser.name = name;
          }
          if (email && typeof email === 'string') {
            existingUser.email = email;
          }
          if (contactNo && typeof contactNo === 'string') {
            existingUser.contactNo = contactNo;
          }
          existingUser.lastModifiedDate = new Date();
          return existingUser.save();
        })
        .then((data) => {
          return resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(function(data) {
        return callback(null, data);
      }).catch(function(err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestAppuser.remoteMethod('updateUserDetails', {
    http: {
      path: '/UpdateUser',
      verb: 'put',
    },
    accepts: [{
      arg: 'userId',
      type: 'number',
    }, {
      arg: 'name',
      type: 'string',
    }, {
      arg: 'email',
      type: 'string',
    }, {
      arg: 'contactNo',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestAppuser.removeUser = (userId, callback) => {
    const promise = new Promise((resolve, reject) => {
      if (!userId) { return reject('Invalid User ID'); };

      TestAppuser.findById(userId)
        .then(existingUser => {
          if (!existingUser) {
            return reject('No User Found');
          } else {
            existingUser.lastModifiedDate = new Date();
            existingUser.isActive = false;
            return resolve(existingUser);
          }
        })
        .then(data => {
          if (!data) { return reject('User not found'); };
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null && typeof callback === 'function') {
      promise.then(function(data) {
        return callback(null, data);
      }).catch(function(err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestAppuser.remoteMethod('removeUser', {
    http: {
      path: '/RemoveUser',
      verb: 'put',
    },
    accepts: {
      arg: 'userId',
      type: 'number',
    },
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });
};

