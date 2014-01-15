module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        // directory vars
        jsDir           : 'js/',
        cssDir          : 'css/',
        lessDir         : 'less/',

        // process less to css
        less: {
            dev: {
                files: {
                    "<%= cssDir %>postachio-help.css": "<%= lessDir %>postachio-help.less"
                }
            },
            prod: {
                options: {
                    cleancss: true
                },
                files: {
                    "<%= cssDir %>postachio-help.css": "<%= lessDir %>postachio-help.less"
                }
            }
        },

        // concatenate javascript files
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    '<%= jsDir %>postachio-help.min.js': [
                        '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
                        'fonts/symbolset/ss-standard.js',                        
                        '<%= jsDir %>postachio-help.js',
                    ]
                }
            }
        },

        // minify javascript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %>' +
                        ' - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            js: {
                files: {
                    '<%= jsDir %>postachio.min.js': ['<%= jsDir %>postachio.min.js']
                }
            }
        },

        // listen for changes
        watch: {
            options: {
                nospawn: true
            },
            dev: {
                files: ['<%= jsDir %>**/*.js', '<%= lessDir %>**/*.less'],
                tasks: ['less:dev', 'concat']
            },
            prod: {
                files: '<%= watch.dev.files %>', // same as dev above
                tasks: ['less:prod', 'concat', 'uglify']
            }
        }

    });

    // grunt plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // tasks
    grunt.registerTask('default', ['concat:js', 'less:dev', 'watch:dev']);
    grunt.registerTask('prod', ['concat:js', 'less:prod', 'uglify:js']);
};
