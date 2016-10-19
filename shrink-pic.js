#!/usr/bin/env node

var program = require('commander');
var package = require('./package.json');
var fs = require('fs');
var path = require('path');
var async = require('async');
var mkpath = require('mkpath');

var API_KEY_FILE_NAME = 'key.hash';
var APP_DIR = __dirname;
var API_KEY_FILE_PATH = path.join(APP_DIR, API_KEY_FILE_NAME);
var DEFAULT_DESTINATION_FOLDER_NAME = 'shrink-pic';
var SINGLE_COMPRESSED_FILE_PREFIX = 'shrink_';
var imgCompressTask = [];
var app = require('./app');

// Default Options
var option = {
    sourceDir: '',
    destinationDir: '',
    levelOfCompression: '1',
    apiKey: ''
};

// Help Window
program
    .version(package.version)
    .usage('[ -d destinationFolder ] [ -i 3 ] [ -k SedasdeEEW1231asd213 ] -s sourceFolder ')
    .option('-s, --source <source-directory-path>', 'mention the source directory path.')
    .option('-d, --destination <destination-directory-path>', 'mention destination directory path.')
    // .option('-l, --level <level-of-compresssion>', 'mention level of compression.')
    .option('-k, --apikey <api-key-save>', 'mention api key to save or renew.')
    .parse(process.argv);

option.sourceDir = program.source || option.sourceDir;
option.destinationDir = program.destination || option.destinationDir;
option.levelOfCompression = program.level || option.levelOfCompression;
option.apiKey = program.apikey;

// If API key option filled.
if (option.apiKey) {
    var KEY = option.apiKey && option.apiKey.trim();
    var status = app.createApiKey(API_KEY_FILE_PATH, KEY);
    if(status){
        app.log('\n  - Key successfully saved. -');
    }else{
        app.log('\n  ---- ERROR INFO ----\n - API key not able to save. \n ' + status);
        app.exit();
    }
}

// Check API key exist.
if (app.checkApiKeyExist(API_KEY_FILE_PATH)) {
    option.apiKey = app.readApiKey(API_KEY_FILE_PATH);
    option.apiKey = option.apiKey.toString();
    if (option.sourceDir) {
        var sourceStat = fs.lstatSync(option.sourceDir);
        if(sourceStat.isDirectory()){
            //If destination not mentioned
            if(!option.destinationDir){
                option.destinationDir = path.join(option.sourceDir, DEFAULT_DESTINATION_FOLDER_NAME);
            }
            mkpath.sync(option.destinationDir);
            var listOfFiles = app.readImageFilesFromDirectory(option.sourceDir);
            listOfFiles.forEach(function (imgLink) {
                var fileName = path.basename(imgLink);
                var destinationCompletePath = path.join(option.destinationDir, fileName);
                imgCompressTask.push(function(callback){
                    app.compressImage(imgLink, destinationCompletePath, callback);
                });
            });
            async.series(imgCompressTask, function (err, data) {
                console.log('Final: ',arguments);
                app.exit();
            })
        }else if(sourceStat.isFile()){
            var fileName='';
            var restOfPath = '';
            if(option.destinationDir){
                var statExistFile = fs.existsSync(option.destinationDir);
                if(!statExistFile){
                    // do nothing
                }else{
                    var destStat = fs.lstatSync(option.destinationDir);
                    if(destStat.isDirectory()){
                        fileName = path.basename(option.sourceDir);
                        option.destinationDir = path.join(option.sourceDir, SINGLE_COMPRESSED_FILE_PREFIX + fileName);
                    }
                }
            }else{
                fileName = path.basename(option.sourceDir);
                restOfPath = path.dirname(option.sourceDir);
                console.log('yo ',restOfPath);
                option.destinationDir = restOfPath;
                option.destinationDir = path.join(option.destinationDir, SINGLE_COMPRESSED_FILE_PREFIX + fileName);
            }
            app.compressImage(option.sourceDir, option.destinationDir, function (err, data) {
                console.log(arguments);
                app.exit();
            });
        }else{
            app.log('Dont understand source content.');
            app.exit();
        }
    } else {
        app.log('\nArgument missing, Try command: `shrink-pic -h` to get more help\n');
        app.exit();
    }
} else {
    app.log('\n  ---- ERROR INFO ----\n  - API key not found.\n  - To generate api key.\n  - Visit: https://tinypng.com/developers\n');
}
