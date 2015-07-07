module.exports=function(grunt) {

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    gruntCfg = {
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app.js',
                dest: '/tmp/app.min.js'
            }
        },
        watch: {},
        tmod: {
            options: {
                base: './public/js/mod/'
            }
        }
    };


    var jsRoot = './public/js/';
    var cssRoot = './public/css/';

    var modRoot = path.join(jsRoot, 'mod');

    var mods = fs.readdirSync(modRoot);
    mods.forEach(function(dirName, i) {
        var _path = path.join(modRoot, dirName);
        var stats = fs.statSync(_path);
        if(stats.isDirectory()) {
            gruntCfg.tmod['template'] = {
                src: [jsRoot + 'mod/'+dirName+'/*.html'],
                dest: jsRoot + 'mod/'+dirName+'.js'
            };
            gruntCfg.watch['template'] = {
                files: [_path+'/*.html'],
                tasks: ['tmod:('+dirName+')']
            };
        }
    });

    grunt.initConfig(gruntCfg);
    grunt.loadNpmTasks('grunt-tmod');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('custom_task', function() {
        grunt.log.write('Logging some stuff..').ok();
    });

    grunt.registerTask('default', ['custom_task','tmod','watch']);


};
