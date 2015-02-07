var BaseAccessor = require("./base");

module.exports = BaseAccessor.extend({

  /**
   */

  _getters: {},

  /**
   */

  _setters: {},

  /**
   */

  _watchers: [],

  /**
   */

  castObject: function(object) { return object; },

  /**
   */

  call: function(object, path, params) {

    var fnName = path.pop(),
    fnCtx      = path.length ? this.get(object, path) : object;

    if (!fnCtx) return;
    return fnCtx[fnName].apply(fnCtx, params);
  },

  /**
   */

  get: function(object, path) {

    if (typeof path === "string") path = [path];

    var pt = path.join("."), getter;
    if (!(getter = this._getters[pt])) {
      getter = this._getters[pt] = new Function("return this." +pt);
    }

    // is undefined - fugly, but works for this test.
    try {
      return getter.call(object);
    } catch (e) {
      return void 0;
    }
  },

  /**
   */

  set: function(object, path, value) {

    if (typeof path === "string") path = [path];

    var pt = path.join("."), setter;
    if (!(setter = this._setters[pt])) {
      setter = this._setters[pt] = new Function("value", "return this." +pt+"=value");
    }

    var ret;
    // is undefined - fugly, but works for this test.
    try {
      ret = setter.call(object, value);
    } catch (e) {
      return void 0;
    }

    this.apply();

    return ret;
  },

  /**
   */

  watchProperty: function(object, path, listener) {
    var self = this;

    // assign a value to bypass the first trigger. 
    var currentValue, firstCall = true;
    return this._addWatcher(function () {
      var newValue = self.get(object, path);
      if (!firstCall && newValue === currentValue && typeof newValue !== "function") return;
      firstCall = true;
      var oldValue = currentValue;
      currentValue = newValue;
      listener(newValue, currentValue);
    });
  },

  /**
   */

  _addWatcher: function (applyChanges) {

    var self = this;

    var watcher = {
      apply: applyChanges,
      trigger: applyChanges,
      dispose: function () {
        var i = self._watchers.indexOf(watcher);
        if (~i) self._watchers.splice(i, 1);
      }
    };

    this._watchers.push(watcher);

    return watcher;
  },

  /**
   */

  watchEvent: function(object, event, listener) {

    if (Object.prototype.toString.call(object) === "[object Array]" && event === "change") {
      return this._watchArrayChangeEvent(object, listener);
    }

    return {
      dispose: function(){ }
    };
  },

  /**
   */

  _watchArrayChangeEvent: function (object, listener) {
    var copy = object.concat();
    return this._addWatcher(function () {

      var hasChanged = object.length !== copy.length;

      if (!hasChanged) {
        for (var i = 0, n = copy.length; i < n; i++) {
          hasChanged = (copy[i] !== object[i]);
          if(hasChanged) break;
        }
      }

      if (hasChanged) {
        copy = object.concat();
        listener();
      }
    });
  },

  /**
   * TODO - deserialize is improper. Maybe use
   * 
   */

  normalizeCollection: function(collection) {
    return collection;
  },

  /**
   */

  normalizeObject: function(object) {
    return object;
  },

  /**
   */

  apply: function() {
    for (var i = 0, n = this._watchers.length; i < n; i++) {
      this._watchers[i].apply();
    }
  }
});