/*jshint node:true */
'use strict';

var config = require('./gulpconfig.js');
var gulp = require('gulp');
var nopt = require('nopt'); // handle CLI arguments
var fs = require('fs');

var plugins = require('gulp-load-plugins')();

// helpers
/**
 * Get the version number
 * @param {Array.<string>} packageFiles
 * @throws {Error}
 * @return {string}
 */
var getVersionNumberFromFile = function(packageFiles) {
    if (packageFiles.length === 0) {
        throw new Error(
            'Where are your package files (package.json, bower.json)?'
        );
    }

    var packageFile = packageFiles[0];
    var fileContent = fs.readFileSync(
        __dirname + '/' + packageFile, { encoding: 'utf-8' }
    );

    var pkg = JSON.parse(fileContent);
    if (!pkg.hasOwnProperty('version')) {
        throw new Error(
            'Your package file (' + packageFile +
                ') does not contain any version number!'
        );
    }

    return pkg.version;
};

// parse CLI arguments with nopt
nopt.invalidHandler = function(key) {
    var msg = 'Invalid "' + key + '" parameter!';
    throw new Error(msg);
};

nopt.typeDefs.release = {
    type: 'release',
    validate: function(data, key, val) {
        val = (val + '').toLowerCase();

        // https://github.com/mojombo/semver/issues/110#issuecomment-19433829
        var semver = new RegExp(
            '^' +
            '(0|[1-9]\\d*)' + // major
            '\\.(0|[1-9]\\d*)' + // minor
            '\\.(0|[1-9]\\d*)' + // patch
            '(?:-' + // start prerelease
                '(' + // capture
                    '(?:' + // first identifier
                        '0|' + // 0, or
                        '[1-9]\\d*|' + // numeric identifier, or
                        '\\d*[a-z-][a-z0-9-]*' +
                    ')' + // end first identifier
                    '(?:\\.' + // dot-separated
                        '(?:0|[1-9]\\d*|\\d*[a-z-][a-z0-9-]*)' +
                    ')*' + // zero or more of those
                ')' + // end prerelease capture
            ')?' + // prerelease is optional
            '(?:' + // build tag (non-capturing)
                '\\+[0-9a-z-]+(?:\\.[0-9a-z-]+)*' +
            ')?' + // build tag is optional
            '$'
        );
        // major: 1.0.0
        // minor: 0.1.0
        // patch: 0.0.2
        var shortHands = [ 'major', 'minor', 'patch' ];

        if (shortHands.indexOf(val) === -1 && !semver.test(val)) {
            return false;
        }
        data[key] = val;
    }
};

var argv = nopt({ release: 'release' }, { r: '--release' }, process.argv, 1);

// set the default values
argv.release = argv.release || 'patch';

// Task for bumping the version number
// Usage: `gulp bump [--release <version>]`
gulp.task('bump', [ 'dist', 'bump-version-number' ], function() {
    return gulp.start('bump-commit-and-tag');
});

gulp.task('bump-version-number', function() {
    var options = {};

    var key = ([ 'major', 'minor', 'patch' ].indexOf(argv.release) !== -1) ?
        'type' : 'version';
    options[key] = argv.release;

    var packageFiles = config.plugins.bump.packageFiles;
    return gulp.src(packageFiles).
        pipe(plugins.bump(options)).
        pipe(gulp.dest('./'));
});

gulp.task('bump-commit-and-tag', [ 'bump-commit' ], function() {
    return gulp.start('bump-tag');
});

gulp.task('bump-commit', function() {
    var packageFiles = config.plugins.bump.packageFiles;

    var version = 'v' + getVersionNumberFromFile(packageFiles);
    var message = 'Release ' + version;

    var filesToCommit = [].concat(packageFiles, config.path.dist + '/**');
    return gulp.src(filesToCommit).pipe(plugins.git.commit(message));
});

gulp.task('bump-tag', function(cb) {
    var packageFiles = config.plugins.bump.packageFiles;

    var version = 'v' + getVersionNumberFromFile(packageFiles);
    var message = 'Release ' + version;

    plugins.git.tag(version, message, null, cb);
});

// Task for testing and linting
// Usage: `gulp test` or if you want to run the testing and the linting tasks
// separately use: `gulp qunit` and `gulp lint`
gulp.task('test', [ 'qunit', 'lint' ]);

gulp.task('qunit', function() {
    return gulp.src(config.path.test + '/index.html').pipe(plugins.qunit());
});

gulp.task('lint', [ 'jshint', 'jscs', 'jsonlint' ]);

gulp.task('jshint', function() {
    var files = config.filesForAnalyze.js;
    if (files.length === 0) { return; }

    return gulp.src(files).
        pipe(plugins.jshint()).
        pipe(plugins.jshint.reporter());
});

gulp.task('jscs', function() {
    var files = config.filesForAnalyze.js;
    if (files.length === 0) { return; }

    return gulp.src(files).pipe(plugins.jscs());
});

gulp.task('jsonlint', function() {
    var files = config.filesForAnalyze.json;
    if (files.length === 0) { return; }

    return gulp.src(files).
        pipe(plugins.jsonlint()).
        pipe(plugins.jsonlint.reporter());
});

// Task for distributing
// Usage: `gulp dist` or `gulp`
gulp.task('default', [ 'dist' ]);

gulp.task('dist', [ 'dist-concat' ], function() {
    return gulp.start('dist-minify');
});

gulp.task('dist-concat', function() {
    return gulp.src(config.path.src + '/**/*.js').
        pipe(plugins.concat('jquery.keep-ratio.js')).
        pipe(gulp.dest(config.path.dist));
});

gulp.task('dist-minify', function() {
    return gulp.src(config.path.dist + '/jquery.keep-ratio.js').
        pipe(plugins.concat('jquery.keep-ratio.min.js')).
        pipe(plugins.uglify()).
        pipe(gulp.dest(config.path.dist));
});
