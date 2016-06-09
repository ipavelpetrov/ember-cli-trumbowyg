/* jshint node: true */
'use strict';

var path = require("path");
var fs = require("fs");

module.exports = {
  name: 'ember-cli-trumbowyg',

  included: function(app) {
    function getAppOption(optionName) {
        return app.options &&
          app.options['ember-cli-trubowyg'] &&
          app.options['ember-cli-trubowyg'][optionName];
    }

    if (typeof app.import !== "function") {
      app = app.app;
    }

    this._super.included(app);

    var trumbowygDist = path.join(app.bowerDirectory, 'trumbowyg', 'dist')
    var trumbowygLangsDist = path.join(trumbowygDist, 'langs');
    var trumbowygPluginsDist = path.join(trumbowygDist, 'plugins');

    app.import(path.join(trumbowygDist, 'trumbowyg.min.js'));
    app.import(path.join(trumbowygDist, 'ui/trumbowyg.min.css'));
    app.import(path.join(trumbowygDist, 'ui/icons.svg'), { destDir: 'assets/ui' });

    var plugins = getAppOption('plugins');
    if (!plugins) {
      plugins = fs.readdirSync(trumbowygPluginsDist);
    }

    plugins.forEach(function(plugin){
      var pluginJs = path.join(trumbowygPluginsDist, plugin, 'trumbowyg.' + plugin +  '.min.js')
      var pluginCss = path.join(trumbowygPluginsDist, plugin, 'ui', 'trumbowyg.' + plugin +  '.min.css');

      app.import(pluginJs);
      if (fs.existsSync(pluginCss)) {
        app.import(pluginCss);
      }
    });

    var langs = getAppOption('langs');
    if (!langs) {
      langs = fs.readdirSync(trumbowygLangsDist)
        .map(function(fileName){ return (fileName.match(/^(.+)\.min\.js/) || {})[1]; })
        .filter(function(langs){ return !!langs;})
    }

    langs.forEach(function(lang){
      app.import(path.join(trumbowygDist, 'langs', lang + '.min.js'));
    });
  }
};
