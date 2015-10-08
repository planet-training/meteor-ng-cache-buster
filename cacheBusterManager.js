var crypto = Npm.require('crypto');
var fs = Npm.require('fs');


var path = Npm.require('path');
var recursive = Npm.require('recursive-readdir');

var publicFolderLocation = '../web.browser/app';
var absolutePublicFolderLocation = path.resolve(publicFolderLocation);


var entries = {};

NgCacheBusterManager = {
    manage: manage,
    manageAll: manageAll,
    setEntry: setEntry,

};

function manageAll(dir) {
    ensurePathStart(dir);

    var fullDir = publicFolderLocation + dir;
    fullDir = path.resolve(fullDir);
    recursive(fullDir, function (err, files) {

        if (err) {
            console.warn('CacheBusterManager could not process dir: %s', dir, err);
        } else {
            files.forEach(function (file) {

                var fileName = file.substring(absolutePublicFolderLocation.length);
                if (fileName.indexOf('/') !== 0) {
                    fileName = '/' + fileName;
                }
                manage(fileName);
            });
        }
    });
}
function manage(filename) {
    ensurePathStart(filename);

    try {

        var s = fs.ReadStream(publicFolderLocation + filename);

        var md5 = crypto.createHash('md5');
        s.on('data', function (d) {
            md5.update(d);
        });

        s.on('end', function () {
            var d = md5.digest('hex');
            console.log('CacheBuster managing: %s, hash: %s', filename, d);
            setEntry(filename, d);
        });
        s.on('error', function(err){
            console.error('error while processing %s', filename, err);
        });
    } catch (e) {
        console.error('Could not access %s', filename, e);
    }
}
function ensurePathStart(name) {
    if (name.indexOf('/') !== 0) {
        throw new Error('Managed file paths must start with /', name);
    }
}
function setEntry(serverRelativeUrl, hash) {
    entries[serverRelativeUrl] = hash;
}
WebApp.connectHandlers.use(function (req, res, next) {
    if (Inject.appUrl(req.url)) {
        Inject.obj('ngCacheKeys', entries);
    }
    next();
});