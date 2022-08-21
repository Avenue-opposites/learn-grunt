module.exports = function(grunt) {

    // Project configuration.
    //初始化配置grunt任务
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      //任务配置
      uglify: {//压缩文件
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        build:{
          files: {
            'build/js/build.min.js': ['./build/js/build.js']
          }
        }
      },
      concat: {//合并文件
        options: {
          separator: ';',
        },
        dist: {
          src: ['./src/js/*.js'],
          dest: './build/js/build.js',
        },
      },
      jshint:{
        options:{
          //指定配置文件
          jshintrc:'./JShint.jshintrc'
        },
        //指定检查的文件
        build:['./Gruntfile.js','./src/js/*.js']
      },
      cssmin: {
        options: {
          //快速压缩
          mergeIntoShorthands: false,
          //四舍五入精确度
          roundingPrecision: -1
        },
        target: {
          files: {
            './build/css/build.min.css': ['./src/css/*.css']
          }
        }
      },
      watch: {
        scripts: {
          files: ['./src/js/*.js','./src/css/*.css'],
          // tasks: ['concat','jshint','uglify','cssmin'],
          tasks: ['concat','uglify','cssmin'],
          options: {
            //生产模式
            //默认变量更新,true则为全局更新
            spawn: false,
          },
        },
      },
    });

    //加载grunt任务插件
    //加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //注册任务
    //默认被执行的任务列表。
    //grunt任务是同步的
    // grunt.registerTask('default',['concat','jshint','uglify','cssmin']);
    grunt.registerTask('default',['concat','uglify','cssmin']);
    grunt.registerTask('Watch',['default','watch']);
  
  };