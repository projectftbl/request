var gulp = require('gulp');

require('@ftbl/gulp')(gulp, { test: { coverage: 60 }});

gulp.task('default', [ 'test' ]);
