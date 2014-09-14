/*jshint node:true */
'use strict';

var config = {};

// Configurable paths
// Don't use leading or trailing slashes!
config.path = {
    src: 'src',
    test: 'test',
    dist: 'dist'
};

// Files for linting and stuff like that
config.filesForAnalyze = {
    js: [
        config.path.src + '/**/*.js',
        config.path.test + '/**/*.js',
        'gulpconfig.js',
        'gulpfile.js'
    ],
    json: [
        '.jscs.json',
        '.jshintrc',
        'bower.json',
        'package.json'
    ]
};

// Plugins preferences
config.plugins = {
    // Bumps the version number (and create a git commit and tag)
    bump: {
        packageFiles: [ 'package.json', 'bower.json' ],
    }
};

module.exports = config;
