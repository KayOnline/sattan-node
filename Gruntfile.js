module.exports=function(grunt) {

    var fs = require('fs');
    var path = require('path');

    var jsRoot = './public/js/';
    var cssRoot = './public/css/';
    var modRoot = path.join(jsRoot, 'mod');

    // Project configuration.
    gruntCfg = {
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                expand: true,
                cwd: 'public/js',
                src: ['**/*.js', '!*.min.js'],
                dest: 'public/js',
                ext: '.min.js'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'public/css',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
            }
        },
        tmod: {
            options: {
                base: './public/js/mod/'
            }
        },
        watch: {
            jsminify: {
                files: ['public/js/*.js'],
                tasks: ['uglify']
            },
            cssminify: {
                files: ['public/css/*.css'],
                tasks: ['cssmin']
            }
        }
    };

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
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('custom_task', function() {
        grunt.log.write('Do custom task...').ok();
    });

    //grunt.registerTask('default', ['custom_task', 'watch']);
    grunt.registerTask('default', ['custom_task', 'tmod', 'uglify', 'cssmin', 'watch']);


};
