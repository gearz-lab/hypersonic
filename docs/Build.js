import path from 'path';
import rimraf from 'rimraf-promise';
import fsep from 'fs-extra-promise';

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

console.log('Building docs');

rimraf(docsBuilt)
    .then(() => fsep.mkdir(docsBuilt))
    .then(() => console.log('Built docs'));
