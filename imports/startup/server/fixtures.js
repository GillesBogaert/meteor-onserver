/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Locations } from '../../api/locations/locations';
import { Rides } from '../../api/rides/rides';

Meteor.startup(() => {
  process.env.MAIL_URL = "";
  if (Locations.find().count() === 0) {
    const fuelStations = JSON.parse(Assets.getText('alt_fuel_stations.json'));

    console.time('DB_Seed');

    console.log(`Seeding DB with ${fuelStations.fuel_stations.length} documents`);
    console.log('Seeding DB...');

    const LocationsRaw = Locations.rawCollection();
    const bulkLocationsOp = LocationsRaw.initializeUnorderedBulkOp();
    bulkLocationsOp.executeSync = Meteor.wrapAsync(bulkLocationsOp.execute);

    fuelStations.fuel_stations.forEach((location) => {
      bulkLocationsOp.insert({
        _id: Random.id(),
        ...location,
        location: { type: 'Point', coordinates: [location.longitude, location.latitude] },
      });
    });
    bulkLocationsOp.executeSync();

    console.log('End DB Seed');
  }
  // if (Rides.find().count() === 0) {
  //   const seed = [
  //     {
  //       name : 'test',
  //       startLocation : {
  //         street : 'Paul lebrunstraat',
  //         nr : '37',
  //         City : 'Leuven',
  //         Date : new Date(),
  //       },
  //       endLocation : {
  //         street : 'Paul lebrunstraat End',
  //         nr : '37 End',
  //         City : 'Leuven End',
  //         Date : new Date() + 'End',
  //       }
  //     }
  //   ]

  //   Rides.insert(seed[0])
  //   console.log('Added fixtures', Rides.find().fetch())
  // }
});
