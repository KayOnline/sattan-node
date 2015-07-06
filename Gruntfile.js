module.exports=function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.registerTask('default', 'Log 1111some stuff', function() {
        grunt.log.write('Logging some stuff..<%= pkg.name%>').ok();
    });

};
