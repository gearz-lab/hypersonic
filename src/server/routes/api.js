var express = require('express');
var usersServerApi = require('../api/usersServerApi');
var mainMenuServerApi = require('../api/mainMenuServerApi');
var applicationDomainServerApi = require('../api/applicationDomainServerApi');
var entityServerApi = require('../api/entityServerApi');

export default function setupApi(db) {

    var router = express.Router();

    usersServerApi.setup(router, db);
    mainMenuServerApi.setup(router, db);
    applicationDomainServerApi.setup(router, db);
    entityServerApi.setup(router, db);

    return router;
}

