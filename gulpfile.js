var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('default', function () {
    // building the docs require React compilation, which is made automatically
    // by Babel, so it makes more sense to just run a node script.
    // Running it through Gulp it not easy.
    return run('webpack').exec();
});