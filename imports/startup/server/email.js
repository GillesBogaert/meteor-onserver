/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Locations } from '../../api/locations/locations';
import { Rides } from '../../api/rides/rides';

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://postmaster@sandboxa0cfaf6dcd374569841b2be96b8b4961.mailgun.org:a133541ffdf8edceb51843e372b5425f-e89319ab-0e77013b@smtp.mailgun.org:587'
});