/*jshint node:true*/
module.exports = {
  afterInstall: function(options) {
    return this.addBowerPackagesToProject([
        { name: 'trumbowyg', target: '~2.1.0' },
    ]);
  }
};
