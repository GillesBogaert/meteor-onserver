import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';


// Rides
Meteor.publish('Rides', function getRides() {
   return Rides.find({}, { limit: 300, sort: { createdAt: -1 } });
});

Meteor.publish('Rides.person', function getRides() {
  return Rides.find({ userId: this.userId }, { limit: 5, sort: { createdAt: -1 } });
});

// Acounts

Meteor.publish('allUsers', function(){
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile : 1}})
  console.log(Meteor.users.find({}, {fields: {username: 1, emails: 1}}))

});

Meteor.publish('availableDrivers', function(rideid) {
  //return Rides.find({ _id : rideid}, {fields : {drivers: 1}})
  return Rides.find({id_ : 'wyEFqqyjivgWdjEri'}, { fields : {drivers : 1}, limit: 300, sort: { createdAt: -1 } });
})


Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});

