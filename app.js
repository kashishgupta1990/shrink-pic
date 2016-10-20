var fs = require('fs');
var path = require('path');
var tinify = require("tinify");
var Spinner = require('cli-spinner').Spinner;

var _setApiKey = function (key) {
    tinify.key = key;
};

var _compressImage = function (imageLink, destinationLink, callback) {
    var completeStr = imageLink + ' -> ' + destinationLink;
    var spinner = new Spinner('Compressing: ' + completeStr);
    spinner.start();
    spinner.setSpinnerDelay(500);
    tinify.fromFile(imageLink).toFile(destinationLink, function (err) {
        if(err){
            callback(err);
        }else{
            callback(null, 'Completed: ' + completeStr.trim() + '\t [Free Account Limit Used: ' + tinify.compressionCount + '/500]');
        }
        spinner.stop(true);
        return;
    });
};

var _readImageFilesFromDirectory = function (dirPath) {
    var allFileList = fs.readdirSync(dirPath);
    var imgFileList = allFileList.filter(function (filePath) {
        var completePath = path.join(dirPath, filePath);
        var stat = fs.lstatSync(completePath);
        if (stat.isFile()) {
            var ext = path.extname(completePath).toLowerCase().trim();
            if (ext.toLowerCase().trim() === '.jpg' || ext === '.jpeg' || ext === '.png') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
    imgFileList = imgFileList.map(function (imgName) {
        return path.join(dirPath, imgName);
    });
    return imgFileList;
};

var _exit = function () {
    process.exit();
};

var _createApiKey = function (apiKeyPath, key) {
    var code = fs.writeFileSync(apiKeyPath, key);
    return code ? false : true;

};

var _log = function (msg) {
    console.log(msg);
};

var _checkApiKeyExist = function (apiKeyPath) {
    return fs.existsSync(apiKeyPath)
};

var _readApiKey = function (apiKeyPath) {
    return fs.readFileSync(apiKeyPath);
};

module.exports = {
    exit: _exit,
    log: _log,
    setApiKey: _setApiKey,
    createApiKey: _createApiKey,
    checkApiKeyExist: _checkApiKeyExist,
    readApiKey: _readApiKey,
    readImageFilesFromDirectory: _readImageFilesFromDirectory,
    compressImage: _compressImage
};


