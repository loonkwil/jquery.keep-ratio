module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    qunit: {
      files: ['test/index.html']
    },
    jshint: {
      all: ['*.js', 'test/**/*.js']
    },
  });

  // Task to run tests
  grunt.registerTask('test', ['qunit', 'jshint']);
};
