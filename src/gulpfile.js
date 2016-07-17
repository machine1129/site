var gulp = require('gulp');
var gutil = require("gulp-util");
var RevAll = require("gulp-rev-all");
var gulpReplace = require("gulp-replace");
var path = require("path");
var named = require("vinyl-named");
var webpack = require("webpack-stream");
var webpackConfig = gulp.env.dev ? require("./webpack.config.js") : require("./config/webpack.build.config.js");
var fs = require("fs");
var version = {};
var releasePath = "../dist";
gulp.task("webpack", function(){
    var rev = new RevAll({
        transformFilename: function (file, hash) {
            version["."+file.path.substring(file.base.length).replace(/\\/g,'/')] = hash.substr(0, 7);
            return file.path;
        }
    });
    return gulp.src(['main.js','views/**/*.js','views/**/*.vue','!views/base/**/*.vue'])
        .pipe(named(function(file){
            // console.log(file.path);
            return file.path.substring(0,file.path.lastIndexOf('.'));
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(releasePath))
        .pipe(rev.revision());
});

gulp.task("static", [], function () {
    return gulp.src(['api/**/*.*'])
        .pipe(named())
        .pipe(gulp.dest(path.join(releasePath, "api")));
});

gulp.task("version", ['webpack','static'], function(){
    var newVersion = 'window.VERSION = '+JSON.stringify(version);
    try{
        var oldVersion = fs.readFileSync(releasePath+'/version.js').toString();
        if(oldVersion !== newVersion){
            var indexHtml = fs.readFileSync('./index.html', 'utf-8')
                .replace(/\.\/version.js(\?t\=\d+){0,1}/,'./version.js?t='+Date.now())
            fs.writeFileSync('./index.html', indexHtml);
            fs.writeFileSync(releasePath+"/version.js", newVersion);
        }
    }catch(e){
        if(e.code == 'ENOENT'){     //文件不存在
            fs.writeFileSync(releasePath+"/version.js", newVersion);
        }else{
            console.log(e);
        }
    }
    return gulp.src('./index.html')
            .pipe(gulpReplace(/main\.js(\?v=\w{7}){0,1}/,'main.js?v=' + version['./main.js']))
            .pipe(gulp.dest(releasePath));
});
gulp.task("gwatch",function(){
    // gulp.watch('views/**/*.*', ['version']);
    gulp.watch(['main.js','common/**/*.*','base/app.vue'],function(o){
        gulp.src('./main.js')
        .pipe(named(function(file){
            return file.path.substring(0,file.path.lastIndexOf('.'));
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(releasePath))
    });

    gulp.watch(['base/aside.vue','component/**/*.*'],function(o){
        gulp.src('./views/train/index.vue')
        .pipe(named(function(file){
            return file.path.substring(0,file.path.lastIndexOf('.'));
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(releasePath))
    });

    gulp.watch('views/**/*.*',function(o){
        gulp.src(o.path)
        .pipe(named(function(file){
            return file.path.substring(0,file.path.lastIndexOf('.'));
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(releasePath))
    });

    gulp.watch(['component/exam/**/*.*','component/preview.vue'],function(o){
        gulp.src('views/train/exam/**/*.*')
        .pipe(named(function(file){
            return file.path.substring(0,file.path.lastIndexOf('.'));
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(releasePath))
    });

    gulp.watch('api/**/*.json',['static']);
});
var defaultTask = ['version']
gulp.env.dev && defaultTask.push('gwatch');
gulp.task("default",defaultTask);