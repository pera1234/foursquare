module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['app/components/venue-explorer/*.js'],
        dest: 'dist/venue.explorer.build.js',
      },
    },
    uglify: {
      build: {
        src: 'dist/venue.explorer.build.js',
        dest: 'dist/venue.explorer.build.min.js'
      }
    },
    watch: {
    scripts: {
        files: ['app/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
            spawn: false,
        },
    }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['concat', 'uglify']);

};