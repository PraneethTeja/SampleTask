/* eslint-disable max-len */
'use strict';

module.exports = function(TestUserBank) {
  TestUserBank.createUserBankDetails = function(bankName, branch, accountNumber, userId, bankId, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!bankName) { return reject('Invalid Bank Name'); }
      if (!branch) { return reject('Invalid Branch Name'); }
      if (!accountNumber) { return reject('Invalid Account Number'); }

      let newUserDetails = {
        bankName: bankName,
        branch: branch,
        accountNumber: accountNumber,
        isActive: true,
        userId: userId,
        bankId: bankId,
      };
      return resolve(TestUserBank.create(newUserDetails));
    });
    if (callback !== null || typeof callback === 'string') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestUserBank.remoteMethod('createUserBankDetails', {
    http: {
      path: '/CreateUserBankDetails',
      verb: 'post',
    },
    accepts: [{
      arg: 'bankName',
      type: 'string',
    }, {
      arg: 'branch',
      type: 'string',
    }, {
      arg: 'accountNumber',
      type: 'string',
    }, {
      arg: 'userId',
      type: 'number',
    }, {
      arg: 'bankId',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestUserBank.getUserBankDetails = function(userId, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!userId) {
        return reject('Invalid Bank ID');
      }
      TestUserBank.find({where: {userId: userId}})
        .then(existingUserBankDetails => {
          return resolve(existingUserBankDetails);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null || typeof callback === 'string') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestUserBank.remoteMethod('getUserBankDetails', {
    http: {
      path: '/GetUserBankDetails',
      verb: 'get',
    },
    accepts: [{
      arg: 'userId',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestUserBank.updateUserDetails = function(bankName, branch, accountNumber, userId, bankId, callback) {
    const promise = new Promise((resolve, reject) => {
      if (!bankName) { return reject('Invalid Bank name'); }
      if (!branch) { return reject('Invalid Branch name'); }
      if (!accountNumber) { return reject('Invalid Account number'); }
      if (!userId) { return reject('Invalid User ID'); }
      if (!bankId) { return reject('Invalid Bank ID'); }

      TestUserBank.findById(bankId)
        .then(existingUserBankDetails => {
          if (!existingUserBankDetails) {
            return reject('Invalid Bank ID');
          } else {
            if (!bankName) {
              existingUserBankDetails.bankName = bankName;
            }
            if (!branch) {
              existingUserBankDetails.branch = branch;
            }
            if (!accountNumber) {
              existingUserBankDetails.accountNumber = accountNumber;
            }
            if (!userId) {
              existingUserBankDetails.userId = userId;
            }
            if (!bankId) {
              existingUserBankDetails.bankId = bankId;
            }
            return existingUserBankDetails.save();
          }
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(err);
        });
    });
    if (callback !== null || typeof callback === 'string') {
      promise.then(data => {
        return callback(null, data);
      }).catch(err => {
        return callback(err);
      });
    } else {
      return promise;
    }
  };

  TestUserBank.remoteMethod('updateUserDetails', {
    http: {
      path: '/UpdateUser',
      verb: 'put',
    },
    accepts: [{
      arg: 'bankName',
      type: 'string',
    }, {
      arg: 'branch',
      type: 'string',
    }, {
      arg: 'accountNumber',
      type: 'string',
    }, {
      arg: 'bankId',
      type: 'number',
    }],
    returns: [{
      arg: 'data',
      type: 'object',
    }],
  });

  TestUserBank.removeUserBank = (userId, callback) => {
    const promise = new Promise((resolve, reject) => {
      if (!userId) { return reject('Invalid User ID'); }

      TestUserBank.findById(userId)
        .then(existingUserBank => {
          if (!existingUserBank) {
            return reject('No Userbank Found');
          } else {
            existingUserBank.isActive = false;
            return resolve(existingUserBank);
          }
        })
        .then(data => {
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

  TestUserBank.remoteMethod('removeUserBank', {
    http: {
      path: '/RemoveUserBank',
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
