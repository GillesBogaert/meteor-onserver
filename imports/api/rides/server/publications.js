import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';

Meteor.publish('Rides', function getRides() {
  return Rides.find({}, { limit: 5, sort: { createdAt: -1 } });
  // return Rides.find({ userId: this.userId }, { limit: 5, sort: { createdAt: -1 } });
});

Meteor.publish('allUsers', function(){
  return Meteor.users.find({}, {fields: {username: 1, emails: 1}})

});