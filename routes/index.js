'use strict';
const fs = require('fs');
const path = require('path');

// module.exports = function(app) {
//     fs.readdirSync(__dirname).forEach(function(file) {
//         if (file === "index.js") return;

//         let basename = file.split('.')[0];

//         if (!fs.lstatSync(__dirname + '/' + file).isDirectory()) {
//             app.use('/api/' + basename, require('./' + file));
//         }

//     })
// }

module.exports = function() {
    let _fns = {};
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === 'index.js') return;

        let ext = path.extname(file);
        let basename = path.basename(file, ext);
        _fns[basename] = require('./' + file);
    });


    return _fns;
}