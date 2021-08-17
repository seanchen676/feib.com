// generated on 2019-11-30 using generator-webapp 4.0.0-7
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync");
const del = require("del");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { argv } = require("yargs");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const isDev = !isProd && !isTest;

const Src = "app";
const Dist = "dist";
const Tmp = ".tmp";

const file = {
  html: "",
  js: "/scripts",
  css: "/styles",
  img: "/images",
  lib: "/lib",
  font: "/fonts",
  component: "/components",
};

const srcPath = formatePath(Src);
const tmpPath = formatePath(Tmp);
const distPath = formatePath(Dist);

const srcFilePath = formateFilePath(Src);
const tmpFilePath = formateFilePath(Tmp);
// const distFilePath = formateFilePath(Dist);

function formatePath(p) {
  return {
    // 資料夾路徑設定
    html: `${p + file.html}`,
    js: `${p + file.js}`,
    css: `${p + file.css}`,
    img: `${p + file.img}`,
    lib: `${p + file.lib}`,
    font: `${p + file.font}`,
    component: `${p + file.component}`,
  };
}

function formateFilePath(p) {
  return {
    // 資料夾檔案設定
    html: `${p + file.html}/*.html`,
    js: `${p + file.js}/**/*.js`,
    css: `${p + file.css}/*.scss`,
    img: `${p + file.img}/**/**`,
    lib: `${p + file.lib}/**/**`,
    font: `${p + file.font}/**/*.{eot,svg,ttf,woff,woff2}`,
    component: `${p + file.component}/**/**`,
  };
}

function styles() {
  return src(srcFilePath.css) // 'app/styles/*.scss'
    .pipe($.plumber())
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe(
      $.sass
        .sync({
          outputStyle: "expanded",
          precision: 10,
          includePaths: ["."],
        })
        .on("error", $.sass.logError)
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(isDev, $.sourcemaps.write()))
    .pipe(dest(tmpPath.css)) // '.tmp/styles'
    .pipe(server.reload({ stream: true }));
}

function scripts() {
  return src(srcFilePath.js) //'app/scripts/**/*.js'
    .pipe($.plumber())
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(isDev, $.sourcemaps.write(".")))
    .pipe(dest(tmpPath.js)) // '.tmp/scripts'
    .pipe(server.reload({ stream: true }));
}

const lintBase = (files) => {
  return src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(server.reload({ stream: true, once: true }))
    .pipe($.eslint.format())
    .pipe($.if(!server.active, $.eslint.failAfterError()));
};
function lint() {
  return lintBase(srcFilePath.js) // 'app/scripts/**/*.js'
    .pipe(dest(srcPath.js)); // 'app/scripts'
}
function lintTest() {
  return lintBase("test/spec/**/*.js").pipe(dest("test/spec"));
}

function html() {
  return src(srcFilePath.html) // 'app/*.html'
    .pipe($.fileInclude({ prefix: "##", basepath: "@file" }))
    .pipe($.useref({ searchPath: [Tmp, Src, "."] })) // ['.tmp', 'app', '.']
    // .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
    // .pipe(
    //   $.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })]))
    // )
    // .pipe(
    //   $.if(
    //     /\.html$/,
    //     $.htmlmin({
    //       collapseWhitespace: true,
    //       minifyCSS: true,
    //       minifyJS: { compress: { drop_console: true } },
    //       processConditionalComments: true,
    //       removeComments: true,
    //       removeEmptyAttributes: true,
    //       removeScriptTypeAttributes: true,
    //       removeStyleLinkTypeAttributes: true,
    //     })
    //   )
    // )
    .pipe($.if(!isProd, dest(Tmp), dest(Dist))); // $.if(!isProd, dest('.tmp'), dest('dist'))
}

function images() {
  return src(srcFilePath.img, { since: lastRun(images) }) // 'app/images/**/**'
    // .pipe($.imagemin())
    .pipe($.if(!isProd, dest(tmpPath.img), dest(distPath.img))); // $.if(!isProd, dest('.tmp/images'), dest('dist/images'))
}

function fonts() {
  return src(srcFilePath.font) // 'app/fonts/**/*.{eot,svg,ttf,woff,woff2}'
    .pipe($.if(!isProd, dest(tmpPath.font), dest(distPath.font))); // $.if(!isProd, dest('.tmp/fonts'), dest('dist/fonts'))
}

function lib() {
  return src(srcFilePath.lib) // 'app/lib/**/*'
    .pipe($.if(!isProd, dest(tmpPath.lib), dest(distPath.lib))); // $.if(!isProd, dest('.tmp/lib'), dest('dist/lib'))
}

function extras() {
  return src([Src + "/*", "!" + Src + "/*.html"], {
    // ['app/*', '!app/*.html']
    dot: true,
  }).pipe(dest(Dist)); // 'dist'
}

function clean() {
  return del([Tmp, Dist]); // ['.tmp', 'dist']
}

function measureSize() {
  return src(Dist + "/**/*") // 'dist/**/*'
    .pipe($.size({ title: "build", gzip: true }));
}

const build = series(
  clean,
  parallel(
    series(lint, parallel(styles, scripts), html),
    images,
    fonts,
    lib,
    extras
  ),
  measureSize
);

function startAppServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: [Tmp, Src], // '.tmp', 'app'
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });

  watch([
    srcFilePath.html, // 'app/*.html'
    srcFilePath.img, // 'app/images/**/**'
    tmpFilePath.font, // '.tmp/fonts/**/*'
    tmpFilePath.lib, // '.tmp/lib/**/*'
    srcFilePath.component, // 'app/components/**/*'
  ]).on("change", server.reload);

  watch(srcFilePath.html, html); // 'app/*.html'
  watch(srcFilePath.component, html); // 'app/components/**/*'
  watch(srcFilePath.css, styles); // 'app/styles/**/*.scss'
  watch(srcFilePath.js, scripts); // 'app/scripts/**/*.js'
  watch(srcFilePath.font, fonts); // 'app/fonts/**/*'
  watch(srcFilePath.img, images); // 'app/images/**/*'
  watch(srcFilePath.lib, lib); // 'app/lib/**/*'
}

function startTestServer() {
  server.init({
    notify: false,
    port,
    ui: false,
    server: {
      baseDir: "test",
      routes: {
        "/scripts": tmpPath.js, // '/scripts': '.tmp/scripts'
        "/node_modules": "node_modules",
      },
    },
  });

  watch(srcFilePath.js, scripts); // 'app/scripts/**/*.js'
  watch(["test/spec/**/*.js", "test/index.html"]).on("change", server.reload);
  watch("test/spec/**/*.js", lintTest);
}

function startDistServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: Dist, // 'dist'
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
}

let serve;
if (isDev) {
  serve = series(
    clean,
    scripts,
    html,
    parallel(styles, fonts, lib, images),
    startAppServer
  );
} else if (isTest) {
  serve = series(clean, scripts, startTestServer);
} else if (isProd) {
  serve = series(build, startDistServer);
}

exports.serve = serve;
exports.build = build;
exports.default = build;
