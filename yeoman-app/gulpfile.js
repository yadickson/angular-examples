const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const rename = require('gulp-rename');
const fs = require('file-system');
const order = require('gulp-order');
const print = require('gulp-print');
const mainNpmFiles = require('gulp-main-npm-files');
const styleNpmFiles = require('gulp-style-npm-files');
const fontNpmFiles = require('gulp-font-npm-files');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const angularFilesort = require('gulp-angular-filesort');
const series = require('stream-series');
const es = require('event-stream');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const karma = require('karma').Server;
const jshint = require("gulp-jshint");

let dev = true;
let minimal = false;
let dest = 'dist';

const paths = {
    appScripts: ['app/scripts/**/*.js'],
    appStyles: ['app/styles/*.scss'],
    appViews: 'app/**/*.html',
    appIcon: 'app/*.ico',
    appImages: 'app/images/**/*',
    appFonts: 'app/fonts/**/*',
    appTests: ['test/**/*.js'],
    testHtml: 'test/*.html'
}

function vendorScripts() {
    return gulp.src(mainNpmFiles()
            .concat('!node_modules/**/index.js')
            .concat('node_modules/angular/angular.js')
            .concat('node_modules/bootstrap/**/bootstrap.js')
        )
        .pipe(order([
            'jquery.js',
            'angular.js',
            'angular-ui-router.js',
            'bootstrap.js',
            '*'
        ]));
}

function appScripts() {
    return gulp.src(paths.appScripts)
        .pipe(angularFilesort())
        .pipe(order([
            'main.js',
            '*'
        ]))
        .pipe(jshint())
        .pipe(jshint.reporter());
}

function vendorStyles() {
    return gulp.src(styleNpmFiles());
}

function vendorTestScripts() {
    return gulp.src(mainNpmFiles()
            .concat('!node_modules/**/index.js')
            .concat('node_modules/angular/angular.js')
            .concat('node_modules/bootstrap/**/bootstrap.js')
            .concat('node_modules/angular-mocks/angular-mocks.js')
        )
        .pipe(order([
            'jquery.js',
            'angular.js',
            'angular-ui-router.js',
            'angular-mocks.js',
            'bootstrap.js',
            '*'
        ]));
}

function appTests() {
    return gulp.src(paths.appTests);
}

function appStyles() {
    return gulp.src(paths.appStyles);
}

function appViews() {
    return gulp.src(paths.appViews);
}

function karmaFiles() {
    return inject(series(vendorScripts(), vendorTestScripts(), appScripts(), appTests()), {
        starttag: 'files: [',
        endtag: '],',
        relative: true,
        transform: function(filepath, file, i, length) {
            return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
        }
    });
}

function buildVendorScripts() {
    return vendorScripts()
        .pipe($.if(minimal, babel({
            presets: ['env', 'babili']
        })))
        .pipe($.if(minimal, concat('vendors.js')))
        .pipe($.if(minimal, uglify()))
        .pipe(gulp.dest(dest + '/js'));
}

function buildVendorStyles() {
    return vendorStyles()
        .pipe(sass().on('error', sass.logError))
        .pipe($.if(minimal, cleanCSS()))
        .pipe($.if(minimal, concat('vendor.css')))
        .pipe(gulp.dest(dest + '/css'));
}

function buildScripts() {
    return appScripts()
        .pipe($.if(minimal, babel({
            presets: ['env', 'babili']
        })))
        .pipe($.if(minimal, concat('app.js')))
        .pipe($.if(minimal, uglify()))
        .pipe(gulp.dest(dest + '/js'));
}

function buildTestScripts() {
    return appTests()
        .pipe(gulp.dest(dest + '/test'));
}

function buildVendorTestScripts() {
    return vendorTestScripts()
        .pipe(gulp.dest(dest + '/js'));
}

function buildStyles() {
    return appStyles()
        .pipe(sass().on('error', sass.logError))
        .pipe($.if(minimal, cleanCSS()))
        .pipe($.if(minimal, concat('app.css')))
        .pipe(gulp.dest(dest + '/css'));
}

gulp.task('clean', () => {
    return del(['.tmp', 'build', 'dist', 'coverage', 'reports', 'yarn*', '*.tgz', '*.zip', '.karma*'])
});

gulp.task('default', ['build'], () => {});

gulp.task('serve', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: dest
        }
    });

    gulp.watch(paths.appScripts, ['scripts']);
    gulp.watch(paths.appStyles, ['styles']);
    gulp.watch(paths.appViews, ['html']);
    gulp.watch(paths.appImages, ['images']);
    gulp.watch(paths.appFonts, ['fonts']);
    gulp.watch(paths.appIcon, ['icons']);
});

gulp.task('serve:dist', ['dist'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: dest
        }
    });
});

gulp.task('serve:test', ['testHtml'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: dest
        }
    });

    gulp.watch(paths.appScripts, ['scripts']);
    gulp.watch([paths.appTests, dest + '/*.html']).on('change', reload);
});

gulp.task('scripts', () => {
    return buildScripts()
        .pipe(reload({
            stream: true
        }));
});

gulp.task('styles', () => {
    return buildStyles()
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts', () => {
    return gulp.src(fontNpmFiles()
            .concat(paths.appFonts)
        )
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(dest + '/fonts'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('images', () => {
    return gulp.src(paths.appImages)
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest(dest + '/images'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('icon', () => {
    return gulp.src(paths.appIcon)
        .pipe(gulp.dest(dest))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('html', () => {

    return gulp.src(paths.appViews)
        .pipe(inject(series(buildVendorScripts(), buildScripts(), buildVendorStyles(), buildStyles()), {
            ignorePath: dest,
            addRootSlash: false
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('testHtml', ['build'], () => {

    return gulp.src(paths.testHtml)
        .pipe(inject(series(buildVendorTestScripts(), buildScripts(), buildTestScripts()), {
            ignorePath: dest,
            addRootSlash: false
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('pretest', ['clean'], function() {

    fs.writeFileSync('.karma.conf.js', fs.readFileSync('karma.conf.js'));

    return gulp.src('.karma.conf.js')
        .pipe(karmaFiles())
        .pipe(gulp.dest('./'));
});

gulp.task('test', ['pretest'], function() {
    return new karma({
        configFile: __dirname + '/.karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('build', () => {
    return new Promise(resolve => {
        minimal = false;
        dest = 'build';
        runSequence(['clean'], ['compile'], resolve);
    });
});

gulp.task('dist', () => {
    return new Promise(resolve => {
        minimal = true;
        dest = 'dist';
        runSequence(['clean'], ['compile'], resolve);
    });
});

gulp.task('compile', ['fonts', 'images', 'icon', 'html'], () => {});