var fs = require('fs');
var path = require('path');
var tinify = require("tinify");

tinify.key = "cwIrdmI45ieO4PJVyY7x1dmsbTcebozy";


var init = function () {

    var source = tinify.fromFile("./test/lion.png");
    source.toFile("lion.png");


};

var _compressImage = function (imageLink, destinationLink, callback) {
    tinify.fromFile(imageLink).toFile(destinationLink, function (err) {
        if(err){
            return callback(err);
        }else{
            return callback(null, 'Shrink Success: '+destinationLink);
        }
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
    createApiKey: _createApiKey,
    checkApiKeyExist: _checkApiKeyExist,
    readApiKey: _readApiKey,
    readImageFilesFromDirectory: _readImageFilesFromDirectory,
    compressImage: _compressImage
};


