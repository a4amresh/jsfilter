module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        files: grunt.file.readJSON("files.json"),
        watch: {
            main: {
                options: {
                    livereload: true
                },
                files: "src/assets/sass/**/*.scss",
                tasks: ['sass']
            },
            libs: {
                options: {
                    livereload: true
                },
                files: ["src/assets/libs/**/*.js", "src/assets/libs/**/*.css"],
                tasks: ['concat']
            }
        },
        sass: {
            main: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/assets/css/<%= pkg.name%>.css': "src/assets/sass/project.scss"
                }
            }
        },
        concat: {
            css: {
                src: ['<%= files.css %>'],
                dest: "src/assets/css/<%= pkg.name%>.libs.css"
            },
            mainJs: {
                src: ['<%= files.js.main %>'],
                dest: "src/assets/js/<%= pkg.name%>.js"
            },
            libsJs: {
                src: ['<%= files.js.libs %>'],
                dest: "src/assets/js/<%= pkg.name%>.libs.js"
            }
        },
        cssmin: {
            main: {
                files: {
                    'src/assets/css/<%= pkg.name%>.min.css': "src/assets/css/<%= pkg.name%>.css",
                    "src/assets/css/<%= pkg.name%>.libs.min.css": ['<%= files.css %>']
                }
            }
        },
        uglify: {
            main: {
                files: {
                    "src/assets/js/<%= pkg.name%>.min.js": ['src/assets/js/<%= pkg.name%>.js'],
                    "src/assets/js/<%= pkg.name%>.libs.min.js": ['src/assets/js/<%= pkg.name%>.libs.js']
                }
            }
        },
        clean: {
            dev: ['dist/development'],
            pro: ['dist/production']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**', '!**/sass/**'],
                    dest: 'dist/development'
                }]
            },
            pro: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**', '!**/sass/**', '!**/libs/**'],
                    dest: 'dist/production'
                }]
            }
        },
        useminPrepare: {
            html: 'src/*.html',
            options: {
                dest: 'dist/production'
            }
        },
        usemin: {
            html: ['dist/production/*.html']
        },
        express: {
            server: {
                options: {
                    port: 9000,
                    bases: ['src'],
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:9000'
            }
        }
    });

    /*====================
    	Load Npm Tasks
    ====================*/
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');


    /*====================
    	Register Tasks
    ====================*/
    /*--Default Task ==> Command:: grunt
    --------------------------*/
    grunt.registerTask('default', ['watch']);

    /*--Project test ==> Command:: grunt test
    --------------------------*/
    grunt.registerTask('test', ['express', 'open', 'watch']);

    /*--Project Build for development ==> Command:: grunt dev
    --------------------------*/
    grunt.registerTask('dev', ['clean:dev', 'copy:dev']);


    /*--Project Build for Production ==> Command:: grunt build
    --------------------------*/
    grunt.registerTask('build', [
        'concat',
        'cssmin',
        'uglify',
        'clean:pro',
        'copy:pro',
        'usemin'
    ]);

};