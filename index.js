/* jshint node: true */
'use strict';

var path = require("path");
var fs = require("fs");

module.exports = {
  name: 'ember-cli-trumbowyg',

  included: function(app) {
    if (typeof app.import !== "function") {
      app = app.app;
    }

    this._super.included(app);

    var trumbowygDist = path.join(app.bowerDirectory, 'trumbowyg', 'dist')
    app.import(path.join(trumbowygDist, 'trumbowyg.min.js'));
    app.import(path.join(trumbowygDist, 'ui/trumbowyg.min.css'));

    app.import(path.join(trumbowygDist, 'ui/icons.svg'), { destDir: 'assets/ui' });
    var plugins = ['base64', 'colors', 'noembed', 'pasteimage', 'preformatted', 'upload'];

    plugins.forEach(function(plugin){
      var pluginJs = path.join(trumbowygDist, 'plugins', plugin, 'trumbowyg.' + plugin +  '.min.js')
      var pluginCss = path.join(trumbowygDist, 'plugins', plugin, 'ui', 'trumbowyg.' + plugin +  '.min.css');

      app.import(pluginJs);
      if (fs.existsSync(pluginCss)) {
        app.import(pluginCss);
      }
    });

    var langs = ['ru'];
    langs.forEach(function(lang){
      app.import(path.join(trumbowygDist, 'langs', lang + '.min.js'));
    });
  }
};
