import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';

Meteor.publish('Rides', function getRides() {
  return Rides.find({}, { limit: 5, sort: { createdAt: -1 } });
  // return Rides.find({ userId: this.userId }, { limit: 5, sort: { createdAt: -1 } });
});

Meteor.publish('allUsers', function(){
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile : 1}}).fetch()
  console.log(Meteor.users.find({}, {fields: {username: 1, emails: 1}}))

});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});
