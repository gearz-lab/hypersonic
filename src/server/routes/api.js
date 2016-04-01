var express = require('express');
var usersServerApi = require('../api/usersServerApi');
var mainMenuServerApi = require('../api/mainMenuServerApi');
var entityServerApi = require('../api/entityServerApi');

export default function setupApi(appConfig, db) {
    if (!appConfig) throw Error('\'appConfig\' should be truthy');
    if (!db) throw Error('\'db\' should be truthy');
    
    var router = express.Router();

    usersServerApi.setup(router, appConfig, db);
    mainMenuServerApi.setup(router, appConfig, db);
    entityServerApi.setup(router, appConfig, db);

    return router;
}

