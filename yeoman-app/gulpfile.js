// generated on 2017-10-10 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
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

let dev = true;
let minimal = false;
let dest = 'dist';

gulp.task('styles', () => {
    return gulp.src('app/styles/*.scss')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
        }))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', () => {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe($.babel())
        .pipe($.if(dev, $.sourcemaps.write('.')))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({
            stream: true
        }));
});

function lint(files) {
    return gulp.src(files)
        .pipe($.eslint({
            fix: true
        }))
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/scripts/**/*.js')
        .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js')
        .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src('app/**/*.html')
        .pipe($.useref({
            searchPath: ['.tmp', 'app', '.']
        }))
        .pipe($.if(/\.js$/, $.uglify({
            compress: {
                drop_console: true
            }
        })))
        .pipe($.if(/\.css$/, $.cssnano({
            safe: true,
            autoprefixer: false
        })))
        .pipe($.if(/\.html$/, $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: {
                compress: {
                    drop_console: true
                }
            },
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
            .concat('app/fonts/**/*'))
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
    return gulp.src([
        'app/*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'build', 'dist', 'coverage', 'reports']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
        browserSync.init({
            notify: false,
            port: 9000,
            server: {
                baseDir: ['.tmp', 'app'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch([
            'app/*.html',
            'app/images/**/*',
            '.tmp/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('app/styles/**/*.scss', ['styles']);
        gulp.watch('app/scripts/**/*.js', ['scripts']);
        gulp.watch('app/fonts/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('serve:dist', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync.init({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.scss')
        .pipe($.filter(file => file.stat && file.stat.size))
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap-sass'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean', 'wiredep'], 'build', resolve);
    });
});

// Coverage report

const karma = require('karma').Server;

function vendorJS() {
    return gulp.src(mainNpmFiles()
            .concat('!node_modules/**/index.js')
            .concat('node_modules/angular/angular.js')
            .concat('node_modules/angular-ui-router/release/angular-ui-router.js')
            .concat('node_modules/angular-mocks/angular-mocks.js')
        )
        .pipe(order([
            'jquery.js',
            'angular.js',
            'angular-ui-router.js',
            'angular-mocks.js',
            '*'
        ]));
}

function appJS() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(angularFilesort())
        .pipe(order([
            'main.js',
            '*'
        ]));
}

function testJS() {
    return gulp.src('test/**/*.js');
}

function karmaFiles() {
    return inject(series(vendorJS(), appJS(), testJS()), {
        starttag: 'files: [',
        endtag: '],',
        relative: true,
        transform: function(filepath, file, i, length) {
            return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
        }
    });
}

gulp.task('pretest', function() {

    fs.writeFileSync('.karma.conf.js', fs.readFileSync('karma.conf.js'));

    return gulp.src('.karma.conf.js')
        .pipe(karmaFiles())
        .pipe(gulp.dest('./'));
});

gulp.task('karma', function() {

    return new karma({
        configFile: __dirname + '/.karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('test', function() {

    return new Promise(resolve => {
        runSequence(['pretest'], ['karma'], resolve);
    });
});


gulp.task('ngbuild', () => {
    return new Promise(resolve => {
        minimal = false;
        dest = 'build';
        runSequence(['clean'], ['compile'], resolve);
    });
});

gulp.task('ngdist', () => {
    return new Promise(resolve => {
        minimal = true;
        dest = 'dist';
        runSequence(['clean'], ['compile'], resolve);
    });
});

gulp.task('compile', () => {

    var vendor = gulp.src(mainNpmFiles()
            .concat('!node_modules/**/index.js')
            .concat('node_modules/angular/angular.js')
            .concat('node_modules/bootstrap/**/bootstrap.js')
        )
        .pipe(order([
            'jquery.js',
            'angular.js',
            'bootstrap.js',
            '*'
        ]))
        .pipe($.if(minimal, babel({
            presets: ['env', 'babili']
        })))
        .pipe($.if(minimal, concat('vendors.js')))
        .pipe($.if(minimal, uglify()))
        .pipe(gulp.dest(dest + '/js'));

    var app = gulp.src('app/scripts/**/*.js')
        .pipe(angularFilesort())
        .pipe(order([
            'main.js',
            '*'
        ]))
        .pipe($.if(minimal, babel({
            presets: ['env', 'babili']
        })))
        .pipe($.if(minimal, concat('app.js')))
        .pipe($.if(minimal, uglify()))
        .pipe(gulp.dest(dest + '/js'));

    var cssVendor = gulp.src(styleNpmFiles())
        .pipe(sass().on('error', sass.logError))
        .pipe($.if(minimal, cleanCSS()))
        .pipe($.if(minimal, concat('vendor.css')))
        .pipe(gulp.dest(dest + '/css'));

    var cssApp = gulp.src('app/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe($.if(minimal, cleanCSS()))
        .pipe($.if(minimal, concat('app.css')))
        .pipe(gulp.dest(dest + '/css'));

    var fonst = gulp.src(fontNpmFiles()
            .concat('app/fonts/*')
        )
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(dest + '/fonts'));

    var html = gulp.src('app/**/*.html')
        .pipe(inject(series(vendor, app, cssVendor, cssApp), {
            ignorePath: dest,
            addRootSlash: false
        }))
        .pipe(gulp.dest(dest));
});