/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
        { name: 'trumbowyg', target: '~2.1.0' },
    ]);
  }
};
