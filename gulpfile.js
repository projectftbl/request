var gulp = require('gulp');

require('@ftbl/gulp')(gulp, { test: { coverage: 55 }});

gulp.task('default', [ 'test' ]);
