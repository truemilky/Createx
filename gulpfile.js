// gulpfile.js

const { src, dest, watch, series, parallel } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const del = require("del");
const fileInclude = require("gulp-file-include");
const svgSprite = require("gulp-svg-sprite");

const isProd = process.env.NODE_ENV === "production";

/* ---------- PATHS ---------- */

const paths = {
  html: {
    src: "src/pages/**/*.html",
    watch: ["src/pages/**/*.html", "src/partials/**/*.html"],
    dest: "dist/",
  },
  styles: {
    src: "src/css/**/*.css",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js/",
  },
  assets: {
    src: ["src/assets/**/*", "!src/assets/icons/**/*.svg"],
    dest: "dist/assets/",
  },
  icons: {
    src: "src/assets/icons/**/*.svg",
    dest: "dist/assets/icons/",
  },
};

/* ---------- CLEAN ---------- */

function clean() {
  return del(["dist"]);
}

/* ---------- HTML ---------- */

function html() {
  return src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      gulpIf(
        isProd,
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
    )
    .pipe(dest(paths.html.dest));
}

/* ---------- STYLES ---------- */
/* stream ТОЛЬКО для CSS */

function styles() {
  return src(paths.styles.src)
    .pipe(concat("style.css"))
    .pipe(gulpIf(isProd, cleanCSS({ level: 2 })))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

/* ---------- SCRIPTS ---------- */

function scripts() {
  return src(paths.scripts.src)
    .pipe(concat("main.js"))
    .pipe(gulpIf(isProd, uglify()))
    .pipe(dest(paths.scripts.dest));
}

/* ---------- ASSETS ---------- */

function assets() {
  return src(paths.assets.src, { encoding: false })
    .pipe(dest(paths.assets.dest));
}

/* ---------- SVG SPRITE ---------- */

function sprite() {
  return src(paths.icons.src)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: ".",          // без symbol/
            sprite: "sprite.svg",
            example: false,
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    name: "removeAttrs",
                    params: {
                      attrs: ["fill", "stroke"],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(paths.icons.dest));
}

/* ---------- SERVER ---------- */

function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    port: 3000,
    open: true,
    notify: false,
    files: ["dist/**/*"], // ← ТОЛЬКО ТУТ
  });

  watch(paths.html.watch, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.assets.src, assets);
  watch(paths.icons.src, sprite);
}

/* ---------- BUILD ---------- */

const build = series(
  clean,
  parallel(html, styles, scripts, assets, sprite)
);

exports.clean = clean;
exports.build = build;
exports.default = series(build, serve);
