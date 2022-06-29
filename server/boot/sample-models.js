'use strict';

module.exports = function(app) {
  app.dataSources.mysqlD1s.automigrate('TestAppUser', function(err) {
    if (err) throw err;

    app.models.TestAppUser.create([{
      name: 'Rahul',
      email: 'rahul@gmail.com',
      contactNo: 65645651,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }, {
      name: 'Raheem',
      email: 'raheem@gmail.com',
      contactNo: 65684556,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }, {
      name: 'purush',
      email: 'purush@gmail.com',
      contactNo: 56484165,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
      isActive: true,
    }], function(err, appUser) {
      if (err) throw err;

      console.log('Models created: \n', appUser);

      app.dataSources.mysqlD1s.automigrate('TestBank', function(err) {
        if (err) throw err;

        app.models.TestBank.create([{
          name: 'ICICI',
          branch: 'Madinaguda',
          location: 'Hyderabad',
          ifscCode: 'ICIC62463267',
          pincode: 500086,
          isActive: true,
        }, {
          name: 'HDFC',
          branch: 'LB Nagar',
          location: 'Hyderabad',
          ifscCode: 'HDF2631782',
          pincode: 587224,
          isActive: true,
        }, {
          name: 'Kotak',
          branch: 'Miyapur',
          location: 'Hyderabad',
          ifscCode: 'KTK8736172',
          pincode: 513878,
          isActive: true,
        }, {
          name: 'HSBC',
          branch: 'Kukatpally',
          location: 'Hyderabad',
          ifscCode: 'HSBC8273723',
          pincode: 523892,
          isActive: true,
        }, {
          name: 'UCO Bank',
          branch: 'Bandlaguda Jagir',
          location: 'Hyderabad',
          ifscCode: 'UCOB7836187',
          pincode: 502032,
          isActive: true,
        }, {
          name: 'Indusland Bank',
          branch: 'Suncity',
          location: 'Hyderabad',
          ifscCode: 'IND87326837',
          pincode: 502032,
          isActive: true,
        }], function(err, banks) {
          if (err) throw err;
          console.log('Models created: \n', banks);

          app.dataSources.mysqlD1s.automigrate('TestUserBank', function(err) {
            if (err) throw err;

            app.models.TestUserBank.create([{
              bankName: 'ICICI',
              branch: 'Madinaguda',
              accountNumber: '8274757487438',
              isActive: true,
              userId: 2,
              bankId: 1,
            }, {
              bankName: 'HDFC',
              branch: 'LB Nagar',
              accountNumber: '43545656754',
              isActive: true,
              userId: 3,
              bankId: 2,
            },
            {
              bankName: 'HSBC',
              branch: 'Kukatpally',
              accountNumber: '76876876565',
              isActive: true,
              userId: 1,
              bankId: 4,
            }], function(err, userBank) {
              if (err) throw err;

              console.log('Models created: \n', userBank);
            });
          });
        });
      });
    });
  });
};
