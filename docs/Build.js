import React from 'react';
import Router from 'react-router';
import path from 'path';
import rimraf from 'rimraf-promise';
import fsep from 'fs-extra-promise';

import Routes from './Routes.js';

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

console.log('Building docs');

let pages = ['home.html', 'liveSchemaEditor.html'];

rimraf(docsBuilt)
    .then(() => fsep.mkdir(docsBuilt))
    .then(() => {
        let writes = pages.map(fileName => new Promise((resolve, reject) => {
            Router.run(Routes, '/' + fileName, Handler => {
               let RootHtml = React.renderToString(React.createElement(Handler));
                return fsep.writeFile(path.join(docsBuilt, fileName), RootHtml)
                    .then(write => resolve(write));
            });
        }));
    })
    .then(() => console.log('Built docs'));
