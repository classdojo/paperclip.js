// Generated by CoffeeScript 1.6.2
var BlockBinding, base,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

base = require("./base");

BlockBinding = (function(_super) {
  __extends(BlockBinding, _super);

  /*
  */


  BlockBinding.prototype.type = "block";

  /*
  */


  function BlockBinding(script, children) {
    this.script = script;
    this.children = children;
    BlockBinding.__super__.constructor.call(this);
  }

  /*
  */


  BlockBinding.prototype._writeHead = function(info, callback) {
    this._bindingStart(info);
    return callback();
  };

  /*
  */


  BlockBinding.prototype._writeTail = function(info, callback) {
    this._bindingEnd(info);
    return callback();
  };

  /*
  */


  BlockBinding.prototype.clone = function() {
    return new BlockBinding(this.script, base.cloneEach(this.children));
  };

  return BlockBinding;

})(require("./bindable"));

module.exports = BlockBinding;