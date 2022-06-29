/* eslint-disable max-len */
'use strict';

module.exports = function(TestBank) {
  TestBank.createBank = function(name, branch, location, ifscCode, pincode, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!name || typeof name !== 'string') { return reject('Invalid Name'); }
      if (!branch) { return reject('Invalid BranchName'); }
      if (!location) { return reject('Invalid Location'); }
      if (!ifscCode) { return reject('Invalid IFSC Code'); }
      if (!pincode) { return reject('Invalid Pincode'); }

      TestBank.find({where: {ifscCode: ifscCode}})
        .then(data => {
          if (data.length !== 0) {
            return reject('Bank Already Exists');
          }
          let newTestBank = {
            name: name,
            branch: branch,
            location: location,
            ifscCode: ifscCode,
            pincode: pincode,
            isActive: true,
          };
          return TestBank.create(newTestBank);
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null || typeof callback === 'function') {
      promise.then((data) => {
        return callback(null, data);
      })
        .catch(err => {
          return callback(err);
        });
    } else {
      return promise;
    }
  };

  TestBank.remoteMethod('createBank', {
    http: {
      path: '/createBank',
      verb: 'post',
    },
    accepts: [{
      arg: 'name',
      type: 'string',
    }, {
      arg: 'branch',
      type: 'string',
    }, {
      arg: 'location',
      type: 'string',
    }, {
      arg: 'ifscCode',
      type: 'string',
    }, {
      arg: 'pincode',
      type: 'string',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestBank.getBankDetails = function(bankId, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!bankId) { return reject(new Error('Invalid Bank ID')); }

      TestBank.findById(bankId)
        .then(data => {
          if (!data) {
            return reject(new Error('Bank deosn\'t exists'));
          }
          return resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
    if (callback !== null || typeof callback === 'function') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestBank.remoteMethod('getBankDetails', {
    http: {
      path: '/GetBankDetails',
      verb: 'get',
    },
    accepts: [{
      arg: 'bankId',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestBank.updateBank = function(bankId, name, branch, location, ifscCode, pincode, callback) {
    const promise = new Promise((resolve, reject) => {
      TestBank.findById(bankId)
        .then(existingBank => {
          if (!existingBank) {
            return reject('Invalid Bank ID');
          } else {
            if (name || typeof name === 'string') {
              existingBank.name = name;
            }
            if (branch || typeof branch === 'string') {
              existingBank.branch = branch;
            }
            if (location || typeof location === 'string') {
              existingBank.location = location;
            }
            if (ifscCode) {
              existingBank.ifscCode = ifscCode;
            }
            if (pincode) {
              existingBank.pincode = pincode;
            }
            return existingBank.save()
              .then(data => {
                return resolve(data);
              })
              .catch(err => {
                return reject(err);
              });
          }
        });
    });
    if (callback !== null || typeof callback === 'function') {
      promise.then(data => {
        callback(null, data);
      }).catch(err => {
        callback(err);
      });
    } else {
      return promise;
    }
  };

  TestBank.remoteMethod('updateBank', {
    http: {
      path: '/UpdateBank',
      verb: 'put',
    },
    accepts: [{
      arg: 'bankId',
      type: 'number',
    }, {
      arg: 'name',
      type: 'string',
    }, {
      arg: 'branch',
      type: 'string',
    }, {
      arg: 'location',
      type: 'string',
    }, {
      arg: 'ifscCode',
      type: 'string',
    }, {
      arg: 'pincode',
      type: 'string',
    }],
    returns: [{
      arg: 'data',
      type: 'obj',
    }],
  });

  TestBank.removeBank = function(bankId, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!bankId) { return reject('Invalid Bank ID'); }

      TestBank.findById(bankId)
        .then(existingBank => {
          if (!existingBank) {
            return reject('Bank doesn\'t exists');
          } else {
            existingBank.isActive = false;
          }
          return existingBank.save();
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null || typeof callback === 'function') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestBank.remoteMethod('removeBank', {
    http: {
      path: '/DeleteTestBank',
      verb: 'put',
    },
    accepts: [{
      arg: 'TestBankId',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });
};
