import chai from 'chai';
import {buildMassive} from '../../src/server/lib/helpers/massiveHelper';
import {BASE, ENTITY, LAYOUT} from '../../src/server/lib/repositories/Repository';
import appConfig from '../appConfig';
import DataContext from '../../src/server/lib/database/DataContext';
import _ from 'underscore';

function log(obj) {
    return console.log(JSON.stringify(obj, null, 4));
}

//_.map(appConfig.entities, e => e.name).concat('user')
var massive = buildMassive(appConfig.connectionString, _.map(appConfig.entities, e => e.name).concat('user'));


var now = new Date();
var dataContext = new DataContext(appConfig, massive)
var repo = dataContext.getRepository('contact');
repo.search('Shany', 1, undefined, LAYOUT)
    .then((...args) => {
        log(args);
        log(new Date() - now);
    });