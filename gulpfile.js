var gulp = require('gulp');

require('@recipher/gulp')(gulp, { test: { coverage: 55 }});

gulp.task('default', [ 'test' ]);
