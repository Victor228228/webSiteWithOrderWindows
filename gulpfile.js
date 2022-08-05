"use strict";

const gulp = require("gulp"); // импорт пакетов, которые используем в сборке
const webpack = require("webpack-stream"); // импорт пакетов, которые используем в сборке
const browsersync = require("browser-sync"); // импорт пакетов, которые используем в сборке

/*

const dist = "./dist/"; // путь в который все компелируется (конечный проект там)
*/

const dist = "H:\\OpenServer\\domains\\localhost333irvisOkna";

gulp.task("copy-html", () => { // отслеживает изменения вносимые в html файл
    return gulp.src("./src/index.html") // где лежит html
                .pipe(gulp.dest(dist)) // перемещаем в папку дист перегнанный файл через gulp
                .pipe(browsersync.stream()); // запускаем browsersync для того что бы страница перезагрузилась
});

gulp.task("build-js", () => { //таск по компеляции скриптов, черновая компеляция в режими разработчика
    return gulp.src("./src/js/main.js") //компелируем главный файл main.js
                .pipe(webpack({ //запуская webpack
                    mode: 'development', // режим разработки
                    output: {
                        filename: 'script.js'  //куда складывать после компеляции
                    },
                    watch: false,
                    devtool: "source-map", // карта проекта, какие скрипты ,от куда и куда идут
                    module: {  // подключаемый модуль webpack
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader', // подключаем babel
                              options: {
                                presets: [['@babel/preset-env', { // присет babel, preset-env самый стандартный и распростроненный
                                    debug: true, //для показа в консоль где была ошибка
                                    corejs: 3, // подлючаем полифилы - код написанный в старом формате. что бы новый код конвектироваля в старый формат для старых браузеров
                                    useBuiltIns: "usage" // анализирует и подключает только те полифилы,которые действительно необходимы в проекте
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist)) // тот файл который получился отправляем в папку dist
                .on("end", browsersync.reload); // запускаем browsersync для того что бы страница перезагрузилась
});

gulp.task("copy-assets", () => { // отслеживает изменения вносимые в папку assets
    return gulp.src("./src/assets/**/*.*") // берем из папки assets любые папки и файлы
                .pipe(gulp.dest(dist + "/assets")) // перемещаем в папку дист перегнанный файл через gulp
                .on("end", browsersync.reload); // запускаем browsersync для того что бы страница перезагрузилась
});

gulp.task("watch", () => { //таска которая запускает отдельный сервер
    browsersync.init({
		server: "./dist/", // серверит файлы которые находятся в папке дист
		port: 4000, // указываем порт
		notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html")); //что бы gulp следил за изменением файлов
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets")); //что бы gulp следил за изменением файлов
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js")); //что бы gulp следил за изменением файлов
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js")); //что бы изменения вносились даже до запуска gulp, если что-то было изменено до запуска gulp

gulp.task("build-prod-js", () => { // делает тоже самое что и gulp.task("build-js", но в чистовом уже варианте в режими продакшен
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build")); //задача которая запускается по умолчанию
