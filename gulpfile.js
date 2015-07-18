var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('build', function () {
    return run('webpack --config webpack.config.prod.js').exec();
});

gulp.task('default', ['build']);