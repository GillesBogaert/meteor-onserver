import { Meteor } from 'meteor/meteor';
import { Rides } from '../rides';


// In Meteor a publication is a named API on the server that constructs a set of data to send to a client. 
// A client initiates a subscription which connects to a publication, and receives that data. 
// That data consists of a first batch sent when the subscription is initialized and then incremental
// updates as the published data changes. 


// publication for all rides
// find function uses no parameters so all rides are passed along
// limits to 300 results and sorts by last created. 

Meteor.publish('Rides', function getRides() {
   return Rides.find({}, { limit: 300, sort: { createdAt: -1 } });
});


/**
 * Returns a subset of the Rides collection where only the rides containing the
 * userid are returned. Limits results by 5 and sorts by last created 
 */

Meteor.publish('Rides.person', function getRides() {
  return Rides.find({ userId: this.userId }, { limit: 5, sort: { createdAt: -1 } });
});

/**
 * Returns all users objects and within those objects only the fields username, email and profile are returned
 */

Meteor.publish('allUsers', function(){
  return Meteor.users.find({}, {fields: {username: 1, emails: 1, profile : 1}})
  console.log(Meteor.users.find({}, {fields: {username: 1, emails: 1}}))

});

/**
 * REturns collection with only one ride
 * This is a test function and not used
 * within this rides object only the field drivers is returned
 */

Meteor.publish('availableDrivers', function publishfunction({rideid}) {
  //return Rides.find({ _id : rideid}, {fields : {drivers: 1}})
  return Rides.find({ _id : rideid}, {fields : {drivers : 1}});
})

/**
 * Publishes the userdata for the currently logged in user
 * This is handled by the meteor accounts modules (this.userId)
 */

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});

