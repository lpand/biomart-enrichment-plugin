var gulp = require("gulp")
var shell = require("shelljs/global")
var jshint = require('gulp-jshint')

gulp.task("compile", function () {
    var currDir = pwd();
    cd("../../../../..")
    if (exec("ant").code !== 0) {
        echo("There has been an error with ant compilation");
    }
    cd(currDir)
})

gulp.task("watch", function () {
    gulp.watch("app/**/*.{js,css,html}", ["compile"]).
        on("change", function (evt) {
            console.log("File "+evt.path+" was "+evt.type+", running tasks...");
        })
})


gulp.task('lint', function() {
    gulp.src('app/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("default", ["watch"])