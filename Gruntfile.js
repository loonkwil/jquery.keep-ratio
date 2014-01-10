module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Project configuration.
  grunt.initConfig({
    qunit: {
      files: ['test/index.html']
    }
  });

  // Task to run tests
  grunt.registerTask('test', ['qunit']);
};
