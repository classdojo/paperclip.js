(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var defaultAdapter = require(23);
var template       = require(32);
var extend         = require(71);

/**
 */

module.exports = {
  transpile   : require(33).transpile,
  Attribute   : require(2),
  Component   : require(16),
  noConflict: function() {
    delete global.paperclip;
  },
  template: function(source, adapter) {
    return template(source, extend({}, defaultAdapter, adapter || {}));
  }
};

if (typeof window !== "undefined") {
  window.paperclip = module.exports;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"16":16,"2":2,"23":23,"32":32,"33":33,"71":71}],2:[function(require,module,exports){
var protoclass = require(70);

/**
 */

function Base(ref, key, value, view) {
  this.ref      = ref;
  this.node     = ref; // DEPRECATED
  this.key      = key;
  this.value    = value;
  this.view     = view;
  this.template = view.template;
  this.document = view.template.options.document;
  this.initialize();
}

/**
 */

protoclass(Base, {
  initialize: function() {
  },
  update: function() {
  }
});

/**
 */

module.exports = Base;

},{"70":70}],3:[function(require,module,exports){
var BaseAttribute = require(2);

/**
 */

module.exports = BaseAttribute.extend({

  /**
   */

  update: function() {

    var classes = this.value;

    if (typeof classes === "string") {
      return this.node.setAttribute("class", classes);
    }

    if (!classes) {
      return this.node.removeAttribute("class");
    }

    var classesToUse = this.node.getAttribute("class");
    classesToUse     = classesToUse ? classesToUse.split(" ") : [];

    for (var classNames in classes) {

      var useClass = classes[classNames];
      var classNamesArray = classNames.split(/[,\s]+/g);

      for (var i = 0, n = classNamesArray.length; i < n; i++) {
        var className = classNamesArray[i];

        var j = classesToUse.indexOf(className);
        if (useClass) {
          if (!~j) {
            classesToUse.push(className);
          }
        } else if (~j) {
          classesToUse.splice(j, 1);
        }
      }
    }

    this.node.setAttribute("class", classesToUse.join(" "));
  }
});

module.exports.test = function(vnode, key, value) {
  return typeof value !== "string";
};

},{"2":2}],4:[function(require,module,exports){
var KeyCodedEventAttribute = require(13);

/**
 */

module.exports = KeyCodedEventAttribute.extend({
  keyCodes: [8]
});

},{"13":13}],5:[function(require,module,exports){
var BaseAttribue = require(2);

/**
 */

module.exports = BaseAttribue.extend({
  initialize: function() {
    this.view.transitions.push(this);
  },
  enter: function() {
    this.value.call(this.view, this.node, function() { });
  }
});

},{"2":2}],6:[function(require,module,exports){
var BaseAttribue = require(2);

/**
 */

module.exports = BaseAttribue.extend({
  initialize: function() {
    this.view.transitions.push(this);
  },
  exit: function(complete) {
    this.value.call(this.view, this.node, complete);
  }
});

},{"2":2}],7:[function(require,module,exports){
var BaseAttribute = require(2);

/**
 */

module.exports = BaseAttribute.extend({
  value: true,
  initialize: function() {
    this.update();
  },
  update: function() {
    if (this.value !== false) {
      this.node.removeAttribute("disabled");
    } else {
      this.node.setAttribute("disabled", "disabled");
    }
  }
});

},{"2":2}],8:[function(require,module,exports){
var KeyCodedEventAttribute = require(13);

/**
 */

module.exports = KeyCodedEventAttribute.extend({
  keyCodes: [13]
});

},{"13":13}],9:[function(require,module,exports){
var KeyCodedEventAttribute = require(13);

/**
 */

module.exports = KeyCodedEventAttribute.extend({
  keyCodes: [27]
});

},{"13":13}],10:[function(require,module,exports){
var Base   = require(2);

/**
 */

module.exports = Base.extend({
  initialize: function() {
    if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
    this.ref.addEventListener(this.event, this._onEvent.bind(this));
  },
  _onEvent: function(event) {
    this.value(event);
  }
});

},{"2":2}],11:[function(require,module,exports){
(function (process){
var BaseAttribute = require(2);

/**
 */

module.exports = BaseAttribute.extend({

  /**
   */

  update: function() {
    if (!this.value) return;
    if (this.node.focus) {
      var self = this;

      if (!process.browser) return this.node.focus();

      // focus after being on screen. Need to break out
      // of animation, so setTimeout is the best option
      setTimeout(function() {
        self.node.focus();
      }, 1);
    }
  }
});

}).call(this,require(51))
},{"2":2,"51":51}],12:[function(require,module,exports){

module.exports = {
  onClick       : require(10),
  onDoubleClick : require(10),
  onLoad        : require(10),
  onSubmit      : require(10),
  onMouseDown   : require(10),
  onMouseMove   : require(10),
  onMouseUp     : require(10),
  onChange      : require(10),
  onMouseOver   : require(10),
  onMouseOut    : require(10),
  onFocusIn     : require(10),
  onFocusOut    : require(10),
  onKeyDown     : require(10),
  onKeyUp       : require(10),
  onDragStart   : require(10),
  onDragStop    : require(10),
  onDragEnd     : require(10),
  onDragOver    : require(10),
  onDragEnter   : require(10),
  onDragLeave   : require(10),
  onDrop        : require(10),
  onSelectStart : require(10),
  onEnter       : require(8),
  onDelete      : require(4),
  focus         : require(11),
  onEscape      : require(9),
  class         : require(3),
  style         : require(14),
  value         : require(15),
  checked       : require(15),
  easeIn        : require(5),
  easeOut       : require(6),
  enable        : require(7)
};

},{"10":10,"11":11,"14":14,"15":15,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}],13:[function(require,module,exports){
var EventAttribute = require(10);

/**
 */

module.exports = EventAttribute.extend({

  /**
   */

  event: "keydown",

  /**
   */

  keyCodes: [],

  /**
   */

  _onEvent: function(event) {

    if (!~this.keyCodes.indexOf(event.keyCode)) {
      return;
    }

    EventAttribute.prototype._onEvent.apply(this, arguments);
  }
});

},{"10":10}],14:[function(require,module,exports){
var BaseAttribute = require(2);

/**
 */

module.exports = BaseAttribute.extend({

  /**
   */

  initialize: function() {
    this._currentStyles = {};
  },

  /**
   */

  update: function() {

    var styles = this.value;

    if (typeof styles === "string") {
      this.node.setAttribute("style", styles);
      return;
    }

    var newStyles = {};

    for (var name in styles) {
      var style = styles[name];
      if (style !== this._currentStyles[name]) {
        newStyles[name] = this._currentStyles[name] = style || "";
      }
    }

    for (var key in newStyles) {
      this.node.style[key] = newStyles[key];
    }
  }
});

/**
 */


module.exports.test = function(vnode, key, value) {
  return typeof value !== "string";
};

},{"2":2}],15:[function(require,module,exports){
var BaseAttribute = require(2);
var _bind         = require(35);

/**
 */

module.exports = BaseAttribute.extend({

  /**
   */

  _events: ["change", "keyup", "input"],

  /**
   */

  initialize: function() {
    this._onInput = _bind(this._onInput, this);
    var self = this;
    this._events.forEach(function(event) {
      self.node.addEventListener(event, self._onInput);
    });
  },

  /**
   */

  // bind: function() {
  //   BaseAttribute.prototype.bind.call(this);
  //
  //   var self = this;
  //
  //   // TODO - move this to another attribute helper (more optimal)
  //   if (/^(text|password|email)$/.test(this.node.getAttribute("type"))) {
  //     this._autocompleteCheckInterval = setInterval(function() {
  //       self._onInput();
  //     }, process.browser ? 500 : 10);
  //   }
  // },

  /**
   */

  // unbind: function() {
  //   BaseAttribute.prototype.unbind.call(this);
  //   clearInterval(this._autocompleteCheckInterval);
  //
  //   var self = this;
  // },

  /**
   */

  update: function() {

    var model = this.model = this.value;

    if (!model) return;

    if (!model || !model.__isReference) {
      throw new Error("input value must be a reference. Make sure you have <~> defined");
    }

    if (model.gettable) {
      this._elementValue(this._parseValue(model.value()));
    }
  },

  _parseValue: function(value) {
    if (value == null || value === "") return void 0;
    return value;
  },

  /**
   */

  _onInput: function(event) {

    clearInterval(this._autocompleteCheckInterval);

    // ignore some keys
    if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
      event.stopPropagation();
    }

    var value = this._parseValue(this._elementValue());

    if (!this.model) return;

    if (String(this.model.value()) == String(value))  return;

    this.model.value(value);
  },

  /**
   */

  _elementValue: function(value) {

    var isCheckbox        = /checkbox/.test(this.node.type);
    var isRadio           = /radio/.test(this.node.type);
    var isRadioOrCheckbox = isCheckbox || isRadio;
    var hasValue          = Object.prototype.hasOwnProperty.call(this.node, "value");
    var isInput           = hasValue || /input|textarea|checkbox/.test(this.node.nodeName.toLowerCase());

    if (!arguments.length) {
      if (isCheckbox) {
        return Boolean(this.node.checked);
      } else if (isInput) {
        return this.node.value || "";
      } else {
        return this.node.innerHTML || "";
      }
    }

    if (value == null) {
      value = "";
    } else {
      clearInterval(this._autocompleteCheckInterval);
    }

    if (isRadioOrCheckbox) {
      if (isRadio) {
        if (String(value) === String(this.node.value)) {
          this.node.checked = true;
        }
      } else {
        this.node.checked = value;
      }
    } else if (String(value) !== this._elementValue()) {

      if (isInput) {
        this.node.value = value;
      } else {
        this.node.innerHTML = value;
      }
    }
  }
});

/**
 */


module.exports.test = function(vnode, key, value) {
  return typeof value !== "string";
};

},{"2":2,"35":35}],16:[function(require,module,exports){
var protoclass = require(70);
var template   = require(32);
var fragment   = require(44);
var extend     = require(71);

/**
 */

function Component(section, vnode, attributes, view) {
  this.section       = section;
  this.vnode         = vnode;
  this.view          = view;
  this.document      = view.template.options.document;
  this.attributes    = {};
  if (vnode.childNodes) this.childTemplate = template(fragment(vnode.childNodes), view.template.options);
  for (var key in attributes) this.setAttribute(key, attributes[key]);
  this.initialize();
};

/**
 */

module.exports = protoclass(Component, {

  // TODO - add basic attribute validation here

  /**
   */

  initialize: function() {
    // OVERRIDE ME
  },

  /**
   */

  setAttribute: function(key, value) {
    this.attributes[key] = value;
  }
});

},{"32":32,"44":44,"70":70,"71":71}],17:[function(require,module,exports){
module.exports = {
  repeat : require(18),
  show   : require(19),
  stack  : require(20),
  switch : require(21),
  unsafe : require(22)
};

},{"18":18,"19":19,"20":20,"21":21,"22":22}],18:[function(require,module,exports){
var extend = require(71);
var Base   = require(16);

/**
 */

function RepeatComponent() {
  Base.apply(this, arguments);
  this._children   = [];
}

/**
 */

function _each(target, iterate) {

  if (!target) return;

  if (target.forEach) {
    // use API here since target could be an object
    target.forEach(iterate);
  } else {
    for (var key in target) {
      if (target.hasOwnProperty(key)) iterate(target[key], key);
    }
  }
}

/**
 */

module.exports = Base.extend(RepeatComponent, {

  /**
   */

  initialize: function() {
    // TODO - throw error of props don't exist here
  },

  /**
   */

  setAttribute: function(k, v) {
    this[k] = v;
  },

  /**
   */

  update: function(context) {

    var as       = this.as;
    var each     = this.each;
    var key      = this.key || "key";

    var n        = 0;
    var self     = this;
    var parent   = this.view;

    var properties;

    _each(each, function(model, k) {

      var child;

      if (as) {
        properties       = { };
        properties[key]  = k;
        properties[as]   = model;
      } else {
        properties = model;
      }

      // TODO - provide SAME context here for speed and stability
      if (n >= self._children.length) {
        child = self.childTemplate.view(properties, {
          parent: parent
        });
        self._children.push(child);
        self.section.appendChild(child.render());
      } else {
        child = self._children[n];
        child.update(properties);
      }

      n++;
    });

    this._children.splice(n).forEach(function(child) {
      child.remove();
    });
  }
});

},{"16":16,"71":71}],19:[function(require,module,exports){
var Base = require(16);

/**
 */

function ShowComponent() {
  Base.apply(this, arguments);
}

/**
 */

module.exports = Base.extend(ShowComponent, {

  /**
   */

  update: function(context) {
    var show = !!this.attributes.when;

    if (this._show === show) return;

    this._show = show;

    if (show) {
      this._view = this.childTemplate.view(this.view.context);
      this.section.appendChild(this._view.render());
    } else {

      if (this._view) {
        this._view.remove();
      }

      this._view = void 0;
    }
  }
});

},{"16":16}],20:[function(require,module,exports){
var BaseComponent = require(16);
var template      = require(32);

/**
 */

function StackComponent(options) {
  BaseComponent.apply(this, arguments);

  var self = this;

  this.childTemplates = this.childTemplate.vnode.target.childNodes.map(function(vnode) {
    return template(vnode, self.view.template.options);
  });
}

/**
 */

module.exports = BaseComponent.extend(StackComponent, {

  /**
   */

  update: function(context) {

    var currentTemplate;
    var show = this.attributes.state;

    if (typeof show === "number") {
      currentTemplate = this.childTemplates[show];
    } else {

      // match by name
      for (var i = this.childTemplates.length; i--;) {
        var childTemplate = this.childTemplates[i];
        if (childTemplate.vnode.target.attributes.name === show) {
          currentTemplate = childTemplate;
          break;
        }
      }
    }


    if (this.currentTemplate !== currentTemplate) {

      if (this.currentView) {
        this.currentView.remove();
        this.currentView = void 0;
      }

      this.currentTemplate = currentTemplate;

      if (this.currentTemplate) {
        this.currentView = currentTemplate.view(context);
        this.section.appendChild(this.currentView.render());
      }
    } else if (this.currentView) {
      this.currentView.update(context);
    }
  }
});

},{"16":16,"32":32}],21:[function(require,module,exports){
var BaseComponent = require(16);
var _bind         = require(35);
var template      = require(32);
var vdocument     = require(41);
var fragment      = require(44);

/**
 */

function SwitchComponent() {
  BaseComponent.apply(this, arguments);

  var self = this;

  // console.log(this.vnode);
  // console.log(this.vnode)

  this.childTemplates = this.vnode.target.childNodes.map(function(vnode) {
    return template(vnode, self.view.template.options);
  });

  // this.vChildTemplates = this.vnode.target.childNodes.map(function(vnode) {

    // return template(vnode)
  // });
}

/**
 */

module.exports = BaseComponent.extend(SwitchComponent, {

  /**
   */

  update: function(context) {

    var child;
    var element;


    for (var i = 0, n = this.childTemplates.length; i < n; i++) {
      child = this.childTemplates[i];
      var dynamicVNode = child.vnode;
      element      = dynamicVNode.target;
      var atts = {};

      if (!dynamicVNode.bindingClass) break;

      // eesh - no beuno, but works well for now
      dynamicVNode.bindingClass.prototype.update2.call({
        view: this.view,
        setAttribute: function(k, v) {
          atts[k] = v;
        },
        setProperty: function(k, v) {
          atts[k] = v;
        }
      });

      if (atts.when) break;

    }

    if (this.currentChild == child) {
      return this._view.update(context);
    }

    if (this._view) {
      this._view.remove();
    }

    if (i == n) return;

    this.currentChild = child;

    var childChildTemplate = template(fragment(element.childNodes), this.view.template.options);

    this._view = childChildTemplate.view(context);
    this.section.appendChild(this._view.render());
  }
});

},{"16":16,"32":32,"35":35,"41":41,"44":44}],22:[function(require,module,exports){
(function (global){
var Base = require(16);

/**
 */

function UnsafeComponent() {
  Base.apply(this, arguments);
}

/**
 */

module.exports = Base.extend(UnsafeComponent, {

  /**
   */

  update: function(context) {

    var value = this.attributes.html;

    // dirty check if is a binding
    if (typeof value === "object" && value.evaluate) {
      value = void 0;
    }

    if (this.currentValue && this.currentValue === value) {
      if (this.currentValue.render) {
        this.currentValue.update(this.currentValue.context);
        return;
      }
    }

    // has a remove script
    if (this.currentValue && this.currentValue.remove) {
      this.currentValue.remove();
    }

    this.currentValue = value;

    if (!value) {
      return this.section.removeChildNodes();
    }

    var node;


    if (value.render) {
      value.remove();
      node = value.render();
    } else if (value.nodeType != null) {
      node = value;
    } else {
      if (this.document !== global.document) {
        node = this.document.createTextNode(String(value));
      } else {
        var div = this.document.createElement("div");
        div.innerHTML = String(value);
        node = this.document.createDocumentFragment();
        var cn = Array.prototype.slice.call(div.childNodes);
        for (var i = 0, n = cn.length; i < n; i++) {
          node.appendChild(cn[i]);
        }
      }
    }

    this.section.removeChildNodes();
    this.section.appendChild(node);
  }
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"16":16}],23:[function(require,module,exports){
module.exports = {

  /**
   */

  attributes: require(12),

  /**
   */

  components: require(17),

  /**
   */

  viewClass: require(28),

  /**
   */

  modifiers: require(24)
};

},{"12":12,"17":17,"24":24,"28":28}],24:[function(require,module,exports){
module.exports = {
  uppercase: function(value) {
    return String(value).toUpperCase();
  },
  lowercase: function(value) {
    return String(value).toLowerCase();
  },
  titlecase: function(value) {
    var str;

    str = String(value);
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },
  json: function(value, count, delimiter) {
    return JSON.stringify.apply(JSON, arguments);
  },
  isNaN: function(value) {
    return isNaN(value);
  },
  round: Math.round
};

},{}],25:[function(require,module,exports){
var protoclass = require(70);

/**
 */

function Reference(view, path, gettable, settable) {
  this.view     = view;
  this.path     = path;
  this.settable = settable !== false;
  this.gettable = gettable !== false;
}

/**
 */

protoclass(Reference, {

  /**
   */

  __isReference: true,

  /**
   */

  value: function(value) {
    if (!arguments.length) {
      return this.gettable ? this.view.get(this.path) : void 0;
    }
    if (this.settable) this.view.set(this.path, value);
  },

  /**
   */

  toString: function() {
    return this.view.get(this.path);
  }
});

module.exports = Reference;

},{"70":70}],26:[function(require,module,exports){
(function (process){
var protoclass = require(70);
var async      = require(34);

/**
 */

function Transitions() {
  this._enter = [];
  this._exit  = [];
}

/**
 */

module.exports = protoclass(Transitions, {

  /**
   */

  push: function(transition) {
    if (transition.enter) this._enter.push(transition);
    if (transition.exit) this._exit.push(transition);
  },

  /**
   */

  enter: function() {
    if (!this._enter.length) return false;
    for (var i = 0, n = this._enter.length; i < n; i++) {
      this._enter[i].enter();
    }
  },

  /**
   */

  exit: function(complete) {
    if (!this._exit.length) return false;
    var self = this;
    process.nextTick(function() {
      async.each(self._exit, function(transition, next) {
        transition.exit(next);
      }, complete);
    });

    return true;
  }
});

}).call(this,require(51))
},{"34":34,"51":51,"70":70}],27:[function(require,module,exports){
/* istanbul ignore next */
function _stringifyNode(node) {

  var buffer = "";

  if (node.nodeType === 11) {
    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      buffer += _stringifyNode(node.childNodes[i]);
    }
    return buffer;
  }

  buffer = node.nodeValue || node.outerHTML || "";

  if (node.nodeType === 8) {
    buffer = "<!--" + buffer + "-->";
  }

  return buffer;
}

module.exports = _stringifyNode;

},{}],28:[function(require,module,exports){
(function (global){
var ivd            = require(61);
var extend         = require(71);
var BaseView       = ivd.View;
var _stringifyNode = require(27);
var Transitions    = require(26);
var Reference      = require(25);

/**
 */

function _set(target, keypath, value) {

  var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
  var ct   = target;
  var key;

  for (var i = 0, n = keys.length - 1; i < n; i++) {
    key = keys[i];
    if (!ct[key]) {
      ct[key] = {};
    }
    ct = ct[key];
  }

  ct[keys[keys.length - 1]] = value;
  return value;
}


/**
 */

function PaperclipView(node, template, options) {

  if (!options) options = {};

  this.parent       = options.parent;
  this.transitions  = new Transitions();
  this._remove      = this._remove.bind(this);

  BaseView.call(this, node, template, options);
}

/**
 */

extend(PaperclipView.prototype, BaseView.prototype, {

  /**
   */

  _getters: {},
  _callers: {},

  /**
   */

  get: function(keypath) {
    var pt = typeof keypath !== "string" ? keypath.join(".") : keypath;
    var getter;

    if (!(getter = this._getters[pt])) {
      getter = this._getters[pt] = new Function("return this." + pt);
    }

    var v;

    try {
      v = getter.call(this.context);
    } catch (e) {
      v = void 0;
    }

    return v != void 0 ? v : this.parent ? this.parent.get(keypath) : void 0;
  },

  /**
   */

  set: function(keypath, value, update) {
    if (typeof path === "string") path = path.split(".");
    var ret = _set(this.context, keypath, value);
    this.update(this.context);
  },

  /**
   */

  setProperties: function(properties) {
    extend(this.context, properties);
    this.update(this.context);
  },

  /**
   */

  ref: function(keypath, gettable, settable) {
    if (!this._refs) this._refs = {};

    return new Reference(this, keypath, gettable, settable);
    // return this._refs[keypath] || (this._refs[keypath] = new Reference(this, keypath, gettable, settable));
  },

  /**
   */

  call: function(keypath, params) {

    var caller;

    if (!(caller = this._callers[keypath])) {
      var ctxPath = ["this"].concat(keypath.split("."));
      ctxPath.pop();
      ctxPath = ctxPath.join(".");
      caller = this._callers[keypath] = new Function("params", "return this." + keypath + ".apply(" + ctxPath + ", params);");
    }

    try {
      v = caller.call(this.context, params);
    } catch (e) {
    }

    return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;
  },

  /**
   */

  update: function(context) {
    BaseView.prototype.update.call(this, this.context = context);
  },

  /**
   * for testing. TODO - move this stuff to sections instead.
   */

  toString: function() {

    if (this.template.section.document === global.document) {
      return _stringifyNode(this.section.start ? this.section.start.parentNode : this.section.node);
    }

    return (this.section.start ? this.section.start.parentNode : this.section.node).toString();
  },

  /**
   */

  render: function() {

    // re-bind if the old context exists.
    if (!this.context && this.__context) {
      var context    = this.__context;
      this.__context = void 0;
      this.update(context);
    }

    var section = BaseView.prototype.render.call(this);
    this.transitions.enter();
    return section;
  },

  /**
   */

  remove: function() {
    if (this.__context) return;
    if (this.transitions.exit(this._remove)) return;
    this._remove();
    return this;
  },

  /**
   */

  _remove: function() {
    BaseView.prototype.remove.call(this);

    // cache the context incase we re-render this view
    this.__context = this.context;

    // remove the context & unbind all the bindings
    this.update(void 0);
  }
});

/**
 */

module.exports = PaperclipView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"25":25,"26":26,"27":27,"61":61,"71":71}],29:[function(require,module,exports){
var extend     = require(71);
var transpiler = require(33);

/**
 */

function Compiler() { }

/**
 */

extend(Compiler.prototype, {

  /**
   */

  compile: function(source, options) {
    var js = transpiler.transpile(source, options);
    return new Function("return " + js)();
  }
});

/**
 */

module.exports = new Compiler();

},{"33":33,"71":71}],30:[function(require,module,exports){
var extend = require(71);

module.exports = function(initialize, update) {

  if (!update) update = function() { };

  /**
   */

  function Binding(ref, view) {
    this.ref              = ref;
    this.view             = view;
    this.template         = view.template;
    this.options          = this.template.options;
    this.attributeClasses = this.options.attributes || {};
    this.initialize();
    this.attrBindings     = {};
  }

  /**
   */

  extend(Binding.prototype, {

    /**
     */

    initialize: initialize || function() { },

    /**
     */

    update2: update || function() { },

    /**
     */

    setAttribute: function(key, value) {
      if (!this.setAsRegisteredAttribute(key, value)) {
        if (value != void 0) {
          this.ref.setAttribute(key, value);
        } else {
          this.ref.removeAttribute(key);
        }
      }
    },

    /**
     */

    setProperty: function(key, value) {
      if (!this.setAsRegisteredAttribute(key, value)) {

        // no node type? It's a registered component.
        if (!this.ref.nodeType) {
          this.ref.setAttribute(key, value);
        } else {
          this.ref[key] = value;
        }
      }
    },

    /**
     */

    setAsRegisteredAttribute: function(key, value) {
      if (this.attrBindings[key]) {
        this.attrBindings[key].value = value;
      } else {
        var attrClass = this.attributeClasses[key];
        if (attrClass) {
          this.attrBindings[key] = new attrClass(this.ref, key, value, this.view);
        } else {
          return false;
        }
      }
      return true;
    },

    /**
     */

    update: function(context) {
      this.update2(context);
      for(var key in this.attrBindings) {
        this.attrBindings[key].update(context);
      }
    }
  });

  return Binding;
};

},{"71":71}],31:[function(require,module,exports){
module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleIndices = { Start: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          function(children) { return children; },
          peg$FAILED,
          "<!DOCTYPE",
          { type: "literal", value: "<!DOCTYPE", description: "\"<!DOCTYPE\"" },
          [],
          /^[^>]/,
          { type: "class", value: "[^>]", description: "[^>]" },
          ">",
          { type: "literal", value: ">", description: "\">\"" },
          function(info) {
                return ["doctype", info.join("")];
              },
          function(children) { return trimTextExpressions(children); },
          "<!--",
          { type: "literal", value: "<!--", description: "\"<!--\"" },
          void 0,
          "-->",
          { type: "literal", value: "-->", description: "\"-->\"" },
          function(v) { return v; },
          function(value) {
              return ["comment", trimEnds(value.join(""))];
            },
          "<",
          { type: "literal", value: "<", description: "\"<\"" },
          "area",
          { type: "literal", value: "area", description: "\"area\"" },
          "base",
          { type: "literal", value: "base", description: "\"base\"" },
          "br",
          { type: "literal", value: "br", description: "\"br\"" },
          "col",
          { type: "literal", value: "col", description: "\"col\"" },
          "command",
          { type: "literal", value: "command", description: "\"command\"" },
          "embed",
          { type: "literal", value: "embed", description: "\"embed\"" },
          "hr",
          { type: "literal", value: "hr", description: "\"hr\"" },
          "img",
          { type: "literal", value: "img", description: "\"img\"" },
          "input",
          { type: "literal", value: "input", description: "\"input\"" },
          "keygen",
          { type: "literal", value: "keygen", description: "\"keygen\"" },
          "link",
          { type: "literal", value: "link", description: "\"link\"" },
          "meta",
          { type: "literal", value: "meta", description: "\"meta\"" },
          "param",
          { type: "literal", value: "param", description: "\"param\"" },
          "source",
          { type: "literal", value: "source", description: "\"source\"" },
          "track",
          { type: "literal", value: "track", description: "\"track\"" },
          "wbr",
          { type: "literal", value: "wbr", description: "\"wbr\"" },
          null,
          "/>",
          { type: "literal", value: "/>", description: "\"/>\"" },
          function(nodeName, attributes, endTag) {

              if (endTag && nodeName != endTag.name) {
                expected("</" + nodeName + ">");
              }

              return ["element", nodeName, attributes, []];
            },
          "</",
          { type: "literal", value: "</", description: "\"</\"" },
          function(name) {
                return {
                  name: name
                };
              },
          function(startTag, children, endTag) {

              if (startTag.name != endTag.name) {
                expected("</" + startTag.name + ">");
              }

              return ["element", startTag.name, startTag.attributes, children];
            },
          function(value) {
                return ["text", trimNewLineChars(value.join(""))];
              },
          "{{",
          { type: "literal", value: "{{", description: "\"{{\"" },
          function() {
                return text();
              },
          function(info) { return info; },
          function(info) { return ["element", info.name, info.attributes, []]; },
          function(name, attrs) {
                return {
                  name: name,
                  attributes: attrs
                };
              },
          function(attributes) {
                return attributes;
            },
          /^[a-zA-Z0-9:_.\-]/,
          { type: "class", value: "[a-zA-Z0-9:_.\\-]", description: "[a-zA-Z0-9:_.\\-]" },
          function(word) { return word.join(""); },
          "=",
          { type: "literal", value: "=", description: "\"=\"" },
          function(name, values) {
                return ["attribute", name, values];
              },
          function(name, property) {
                return ["property", name, property];
              },
          function(name) {
                return ['attribute', name, []];
              },
          "\"",
          { type: "literal", value: "\"", description: "\"\\\"\"" },
          /^[^"]/,
          { type: "class", value: "[^\"]", description: "[^\"]" },
          function() { return ["string", text()]; },
          function(values) { return attrValues(values); },
          "'",
          { type: "literal", value: "'", description: "\"'\"" },
          /^[^']/,
          { type: "class", value: "[^']", description: "[^']" },
          "}}",
          { type: "literal", value: "}}", description: "\"}}\"" },
          function(value) {
                return ["script", value];
              },
          function(script) {
              return ["block", script[1]];
            },
          "?",
          { type: "literal", value: "?", description: "\"?\"" },
          ":",
          { type: "literal", value: ":", description: "\":\"" },
          function(condition, left, right) {
                return ["condition", condition, left, right];
              },
          "(",
          { type: "literal", value: "(", description: "\"(\"" },
          ")",
          { type: "literal", value: ")", description: "\")\"" },
          function(params) {
                return params;
              },
          "()",
          { type: "literal", value: "()", description: "\"()\"" },
          function() { return []; },
          ",",
          { type: "literal", value: ",", description: "\",\"" },
          function(param1, rest) {
                return [param1].concat(rest.map(function(v) {
                  return v[1];
                }));
              },
          function(left, right) {
                return ["assign", left, right];
              },
          "&&",
          { type: "literal", value: "&&", description: "\"&&\"" },
          "||",
          { type: "literal", value: "||", description: "\"||\"" },
          "===",
          { type: "literal", value: "===", description: "\"===\"" },
          "==",
          { type: "literal", value: "==", description: "\"==\"" },
          "!==",
          { type: "literal", value: "!==", description: "\"!==\"" },
          "!=",
          { type: "literal", value: "!=", description: "\"!=\"" },
          ">==",
          { type: "literal", value: ">==", description: "\">==\"" },
          ">=",
          { type: "literal", value: ">=", description: "\">=\"" },
          "<==",
          { type: "literal", value: "<==", description: "\"<==\"" },
          "<=",
          { type: "literal", value: "<=", description: "\"<=\"" },
          "+",
          { type: "literal", value: "+", description: "\"+\"" },
          "-",
          { type: "literal", value: "-", description: "\"-\"" },
          "%",
          { type: "literal", value: "%", description: "\"%\"" },
          "*",
          { type: "literal", value: "*", description: "\"*\"" },
          "/",
          { type: "literal", value: "/", description: "\"/\"" },
          function(left, operator, right) {
                return ["operator", operator, left, right];
              },
          function(value) { return value; },
          function(expression, modifiers) {

                for (var i = 0, n = modifiers.length; i < n; i++) {
                  expression = ["modifier", modifiers[i].name, [expression].concat(modifiers[i].parameters)];
                }

                return expression;
              },
          "|",
          { type: "literal", value: "|", description: "\"|\"" },
          function(name, parameters) {
              return {
                name: name,
                parameters: parameters || []
              };
            },
          function(context) { return context; },
          "!",
          { type: "literal", value: "!", description: "\"!\"" },
          function(not, value) {
                return ["not", value];
              },
          function(not, value) {
                return ["negative", value];
              },
          /^[0-9]/,
          { type: "class", value: "[0-9]", description: "[0-9]" },
          function(value) {
                return ["literal", parseFloat(text())];
              },
          ".",
          { type: "literal", value: ".", description: "\".\"" },
          function(group) { return ["group", group]; },
          function(expression) {
                return expression;
              },
          "true",
          { type: "literal", value: "true", description: "\"true\"" },
          "false",
          { type: "literal", value: "false", description: "\"false\"" },
          function(value) {
                return ["literal", value === "true"];
              },
          "undefined",
          { type: "literal", value: "undefined", description: "\"undefined\"" },
          function() { return ["literal", void 0]; },
          "NaN",
          { type: "literal", value: "NaN", description: "\"NaN\"" },
          function() { return ["literal", NaN]; },
          "Infinity",
          { type: "literal", value: "Infinity", description: "\"Infinity\"" },
          function() { return ["literal", Infinity]; },
          "null",
          { type: "literal", value: "null", description: "\"null\"" },
          "NULL",
          { type: "literal", value: "NULL", description: "\"NULL\"" },
          function() { return ["literal", null]; },
          function(reference, parameters) {
                return ["call", reference, parameters];
              },
          "^",
          { type: "literal", value: "^", description: "\"^\"" },
          "~>",
          { type: "literal", value: "~>", description: "\"~>\"" },
          "<~>",
          { type: "literal", value: "<~>", description: "\"<~>\"" },
          "~",
          { type: "literal", value: "~", description: "\"~\"" },
          "<~",
          { type: "literal", value: "<~", description: "\"<~\"" },
          function(bindingType, reference, path) {
                path = [reference].concat(path.map(function(p) { return p[1]; }));
                return ["reference", path, bindingType];
              },
          /^[a-zA-Z_$0-9]/,
          { type: "class", value: "[a-zA-Z_$0-9]", description: "[a-zA-Z_$0-9]" },
          function(name) { return text(); },
          "{",
          { type: "literal", value: "{", description: "\"{\"" },
          "}",
          { type: "literal", value: "}", description: "\"}\"" },
          function(values) {
                return ["hash", values];
              },
          function(values) {
                var s = {};
                for (var i = 0, n = values.length; i < n; i++) {
                  s[values[i].key] = values[i].value;
                }
                return s;
              },
          function(firstValue, additionalValues) {
                return [
                  firstValue
                ].concat(additionalValues.length ? additionalValues[0][1] : []);
              },
          function(key, value) {
                return {
                  key: key,
                  value: value
                };
              },
          function(key) { return key[1]; },
          function(key) { return key; },
          { type: "other", description: "string" },
          function(chars) {
                return ["string", chars.join("")];
              },
          "\\",
          { type: "literal", value: "\\", description: "\"\\\\\"" },
          function() { return text(); },
          "\\\"",
          { type: "literal", value: "\\\"", description: "\"\\\\\\\"\"" },
          "\\'",
          { type: "literal", value: "\\'", description: "\"\\\\'\"" },
          { type: "any", description: "any character" },
          /^[a-zA-Z]/,
          { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
          function(chars) { return chars.join(""); },
          /^[ \n\r\t]/,
          { type: "class", value: "[ \\n\\r\\t]", description: "[ \\n\\r\\t]" }
        ],

        peg$bytecode = [
          peg$decode("7!"),
          peg$decode("!7#+' 4!6 !! %"),
          peg$decode("!.\"\"\"2\"3#+q$7U+g% $0%\"\"1!3&+,$,)&0%\"\"1!3&\"\"\" !+B%7U+8%.'\"\"2'3(+(%4%6)%!\"%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("! $7%*5 \"7'*/ \"7$*) \"7(*# \"73,;&7%*5 \"7'*/ \"7$*) \"7(*# \"73\"+' 4!6*!! %"),
          peg$decode("!7U+\xC7$.+\"\"2+3,+\xB7% $!!8..\"\"2.3/9*$$\"\" -\"# !+2$7S+(%4\"60\"! %$\"# !\"# !+T$,Q&!!8..\"\"2.3/9*$$\"\" -\"# !+2$7S+(%4\"60\"! %$\"# !\"# !\"\"\" !+B%..\"\"2.3/+2%7U+(%4%61%!\"%$%# !$$# !$## !$\"# !\"# !*# \"7\""),
          peg$decode("!.2\"\"2233+\u012A$.4\"\"2435*\xD1 \".6\"\"2637*\xC5 \".8\"\"2839*\xB9 \".:\"\"2:3;*\xAD \".<\"\"2<3=*\xA1 \".>\"\"2>3?*\x95 \".@\"\"2@3A*\x89 \".B\"\"2B3C*} \".D\"\"2D3E*q \".F\"\"2F3G*e \".H\"\"2H3I*Y \".J\"\"2J3K*M \".L\"\"2L3M*A \".N\"\"2N3O*5 \".P\"\"2P3Q*) \".R\"\"2R3S+f%7-+\\%.'\"\"2'3(*) \".U\"\"2U3V*# \" T+:%7&*# \" T+*%4%6W%##\" %$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7U+\u010C$.X\"\"2X3Y+\xFC%.4\"\"2435*\xD1 \".6\"\"2637*\xC5 \".8\"\"2839*\xB9 \".:\"\"2:3;*\xAD \".<\"\"2<3=*\xA1 \".>\"\"2>3?*\x95 \".@\"\"2@3A*\x89 \".B\"\"2B3C*} \".D\"\"2D3E*q \".F\"\"2F3G*e \".H\"\"2H3I*Y \".J\"\"2J3K*M \".L\"\"2L3M*A \".N\"\"2N3O*5 \".P\"\"2P3Q*) \".R\"\"2R3S+8%.'\"\"2'3(+(%4$6Z$!!%$$# !$## !$\"# !\"# !"),
          peg$decode("!7*+>$7#+4%7.+*%4#6[##\"! %$## !$\"# !\"# !*# \"7+"),
          peg$decode("! $7)+&$,#&7)\"\"\" !+' 4!6\\!! %"),
          peg$decode("!!8.2\"\"2233*) \".]\"\"2]3^9*$$\"\" -\"# !+1$7S+'%4\"6_\" %$\"# !\"# !"),
          peg$decode("!7U+\\$.2\"\"2233+L%7,+B%.'\"\"2'3(+2%7U+(%4%6`%!\"%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7U+\\$.2\"\"2233+L%7,+B%.U\"\"2U3V+2%7U+(%4%6a%!\"%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7/+3$7-+)%4\"6b\"\"! %$\"# !\"# !"),
          peg$decode("!7U+D$ $70,#&70\"+2%7U+(%4#6c#!!%$## !$\"# !\"# !"),
          peg$decode("!.X\"\"2X3Y+B$7/+8%.'\"\"2'3(+(%4#6Z#!!%$## !$\"# !\"# !"),
          peg$decode("!7U+M$ $0d\"\"1!3e+,$,)&0d\"\"1!3e\"\"\" !+(%4\"6f\"! %$\"# !\"# !"),
          peg$decode("!7/+W$7U+M%.g\"\"2g3h+=%7U+3%71+)%4%6i%\"$ %$%# !$$# !$## !$\"# !\"# !*t \"!7/+W$7U+M%.g\"\"2g3h+=%7U+3%72+)%4%6j%\"$ %$%# !$$# !$## !$\"# !\"# !*/ \"!7/+' 4!6k!! %"),
          peg$decode("!.l\"\"2l3m+\u0146$ $72*\x9B \"! $!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0n\"\"1!3o+#%'\"%$\"# !\"# !+U$,R&!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0n\"\"1!3o+#%'\"%$\"# !\"# !\"\"\" !+& 4!6p! %,\xA1&72*\x9B \"! $!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0n\"\"1!3o+#%'\"%$\"# !\"# !+U$,R&!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0n\"\"1!3o+#%'\"%$\"# !\"# !\"\"\" !+& 4!6p! %\"+8%.l\"\"2l3m+(%4#6q#!!%$## !$\"# !\"# !*\u0157 \"!.r\"\"2r3s+\u0146$ $72*\x9B \"! $!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0t\"\"1!3u+#%'\"%$\"# !\"# !+U$,R&!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0t\"\"1!3u+#%'\"%$\"# !\"# !\"\"\" !+& 4!6p! %,\xA1&72*\x9B \"! $!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0t\"\"1!3u+#%'\"%$\"# !\"# !+U$,R&!!8.]\"\"2]3^9*$$\"\" -\"# !+3$0t\"\"1!3u+#%'\"%$\"# !\"# !\"\"\" !+& 4!6p! %\"+8%.r\"\"2r3s+(%4#6q#!!%$## !$\"# !\"# !"),
          peg$decode("!.]\"\"2]3^+V$7U+L%74+B%7U+8%.v\"\"2v3w+(%4%6x%!\"%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!72+' 4!6y!! %"),
          peg$decode("!77+^$.z\"\"2z3{+N%74+D%.|\"\"2|3}+4%74+*%4%6~%#$\" %$%# !$$# !$## !$\"# !\"# !*# \"77"),
          peg$decode("!.\"\"23\x80+B$76+8%.\x81\"\"2\x813\x82+(%4#6\x83#!!%$## !$\"# !\"# !*4 \"!.\x84\"\"2\x843\x85+& 4!6\x86! %"),
          peg$decode("!74+q$ $!.\x87\"\"2\x873\x88+-$74+#%'\"%$\"# !\"# !,>&!.\x87\"\"2\x873\x88+-$74+#%'\"%$\"# !\"# !\"+)%4\"6\x89\"\"! %$\"# !\"# !"),
          peg$decode("!7<+C$.g\"\"2g3h+3%77+)%4#6\x8A#\"\" %$## !$\"# !\"# !*# \"78"),
          peg$decode("!79+\u0104$.\x8B\"\"2\x8B3\x8C*\xDD \".\x8D\"\"2\x8D3\x8E*\xD1 \".\x8F\"\"2\x8F3\x90*\xC5 \".\x91\"\"2\x913\x92*\xB9 \".\x93\"\"2\x933\x94*\xAD \".\x95\"\"2\x953\x96*\xA1 \".\x97\"\"2\x973\x98*\x95 \".\x99\"\"2\x993\x9A*\x89 \".'\"\"2'3(*} \".\x9B\"\"2\x9B3\x9C*q \".\x9D\"\"2\x9D3\x9E*e \".2\"\"2233*Y \".\x9F\"\"2\x9F3\xA0*M \".\xA1\"\"2\xA13\xA2*A \".\xA3\"\"2\xA33\xA4*5 \".\xA5\"\"2\xA53\xA6*) \".\xA7\"\"2\xA73\xA8+4%78+*%4#6\xA9##\"! %$## !$\"# !\"# !*# \"79"),
          peg$decode("!7U+<$7:+2%7U+(%4#6\xAA#!!%$## !$\"# !\"# !"),
          peg$decode("!7=+;$ $7;,#&7;\"+)%4\"6\xAB\"\"! %$\"# !\"# !*) \"7H*# \"7<"),
          peg$decode("!.\xAC\"\"2\xAC3\xAD+W$7U+M%7J+C%75*# \" T+3%7U+)%4%6\xAE%\"\"!%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7U+<$7>+2%7U+(%4#6\xAF#!!%$## !$\"# !\"# !"),
          peg$decode("!.\xB0\"\"2\xB03\xB1+3$7=+)%4\"6\xB2\"\"! %$\"# !\"# !*b \"!.\xB0\"\"2\xB03\xB1*) \".\xA1\"\"2\xA13\xA2+3$7=+)%4\"6\xB3\"\"! %$\"# !\"# !*/ \"7B*) \"7H*# \"7<"),
          peg$decode("7A*5 \"7K*/ \"7?*) \"7P*# \"7I"),
          peg$decode("!!.\xA1\"\"2\xA13\xA2*# \" T+i$! $0\xB4\"\"1!3\xB5+,$,)&0\xB4\"\"1!3\xB5\"\"\" !+3$7@*# \" T+#%'\"%$\"# !\"# !*# \"7@+#%'\"%$\"# !\"# !+' 4!6\xB6!! %"),
          peg$decode("!.\xB7\"\"2\xB73\xB8+H$ $0\xB4\"\"1!3\xB5+,$,)&0\xB4\"\"1!3\xB5\"\"\" !+#%'\"%$\"# !\"# !"),
          peg$decode("!.\"\"23\x80+B$74+8%.\x81\"\"2\x813\x82+(%4#6\xB9#!!%$## !$\"# !\"# !"),
          peg$decode("!7C*5 \"7D*/ \"7G*) \"7E*# \"7F+' 4!6\xBA!! %"),
          peg$decode("!.\xBB\"\"2\xBB3\xBC*) \".\xBD\"\"2\xBD3\xBE+' 4!6\xBF!! %"),
          peg$decode("!.\xC0\"\"2\xC03\xC1+& 4!6\xC2! %"),
          peg$decode("!.\xC3\"\"2\xC33\xC4+& 4!6\xC5! %"),
          peg$decode("!.\xC6\"\"2\xC63\xC7+& 4!6\xC8! %"),
          peg$decode("!.\xC9\"\"2\xC93\xCA*) \".\xCB\"\"2\xCB3\xCC+& 4!6\xCD! %"),
          peg$decode("!7<+3$75+)%4\"6\xCE\"\"! %$\"# !\"# !"),
          peg$decode("!.\xCF\"\"2\xCF3\xD0*M \".\xD1\"\"2\xD13\xD2*A \".\xD3\"\"2\xD33\xD4*5 \".\xD5\"\"2\xD53\xD6*) \".\xD7\"\"2\xD73\xD8*# \" T+\x90$7U+\x86%7J+|% $!.\xB7\"\"2\xB73\xB8+-$7J+#%'\"%$\"# !\"# !,>&!.\xB7\"\"2\xB73\xB8+-$7J+#%'\"%$\"# !\"# !\"+4%7U+*%4%6\xD9%#$\"!%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("! $0\xDA\"\"1!3\xDB+,$,)&0\xDA\"\"1!3\xDB\"\"\" !+' 4!6\xDC!! %"),
          peg$decode("!.\xDD\"\"2\xDD3\xDE+\\$7U+R%7L*# \" T+B%7U+8%.\xDF\"\"2\xDF3\xE0+(%4%6\xE1%!\"%$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7M+' 4!6\xE2!! %"),
          peg$decode("!7N+q$ $!.\x87\"\"2\x873\x88+-$7M+#%'\"%$\"# !\"# !,>&!.\x87\"\"2\x873\x88+-$7M+#%'\"%$\"# !\"# !\"+)%4\"6\xE3\"\"! %$\"# !\"# !"),
          peg$decode("!7U+]$7O+S%7U+I%.|\"\"2|3}+9%74*# \" T+)%4%6\xE4%\"# %$%# !$$# !$## !$\"# !\"# !"),
          peg$decode("!7P+' 4!6\xE5!! %*/ \"!7J+' 4!6\xE6!! %"),
          peg$decode("8!.l\"\"2l3m+J$ $7Q,#&7Q\"+8%.l\"\"2l3m+(%4#6\xE8#!!%$## !$\"# !\"# !*[ \"!.r\"\"2r3s+J$ $7R,#&7R\"+8%.r\"\"2r3s+(%4#6\xE8#!!%$## !$\"# !\"# !9*\" 3\xE7"),
          peg$decode("!!8.l\"\"2l3m*) \".\xE9\"\"2\xE93\xEA9*$$\"\" -\"# !+1$7S+'%4\"6\xEB\" %$\"# !\"# !*) \".\xEC\"\"2\xEC3\xED"),
          peg$decode("!!8.r\"\"2r3s*) \".\xE9\"\"2\xE93\xEA9*$$\"\" -\"# !+1$7S+'%4\"6\xEB\" %$\"# !\"# !*) \".\xEE\"\"2\xEE3\xEF"),
          peg$decode("-\"\"1!3\xF0"),
          peg$decode("! $0\xF1\"\"1!3\xF2+,$,)&0\xF1\"\"1!3\xF2\"\"\" !+' 4!6\xF3!! %"),
          peg$decode(" $0\xF4\"\"1!3\xF5,)&0\xF4\"\"1!3\xF5\"")
        ],

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$decode(s) {
      var bc = new Array(s.length), i;

      for (i = 0; i < s.length; i++) {
        bc[i] = s.charCodeAt(i) - 32;
      }

      return bc;
    }

    function peg$parseRule(index) {
      var bc    = peg$bytecode[index],
          ip    = 0,
          ips   = [],
          end   = bc.length,
          ends  = [],
          stack = [],
          params, i;

      function protect(object) {
        return Object.prototype.toString.apply(object) === "[object Array]" ? [] : object;
      }

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(protect(peg$consts[bc[ip + 1]]));
              ip += 2;
              break;

            case 1:
              stack.push(peg$currPos);
              ip++;
              break;

            case 2:
              stack.pop();
              ip++;
              break;

            case 3:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 4:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 5:
              stack.splice(-2, 1);
              ip++;
              break;

            case 6:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 7:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 8:
              stack.pop();
              stack.push(input.substring(stack[stack.length - 1], peg$currPos));
              ip++;
              break;

            case 9:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 10:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 11:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 12:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 14:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 15:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 16:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 17:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 18:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 19:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 20:
              peg$reportedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 21:
              peg$reportedPos = peg$currPos;
              ip++;
              break;

            case 22:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
              for (i = 0; i < bc[ip + 3]; i++) {
                params[i] = stack[stack.length - 1 - params[i]];
              }

              stack.splice(
                stack.length - bc[ip + 2],
                bc[ip + 2],
                peg$consts[bc[ip + 1]].apply(null, params)
              );

              ip += 4 + bc[ip + 3];
              break;

            case 23:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 24:
              peg$silentFails++;
              ip++;
              break;

            case 25:
              peg$silentFails--;
              ip++;
              break;

            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }

        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }

      return stack[0];
    }


    /*jshint laxcomma:false */

    function trimWhitespace(ws) {
      return trimNewLineChars(ws).replace(/(^[\r\n]+)|([\r\n]+$)/, " ");
    }

    function trimEnds(ws) {
      return ws.replace(/(^\s+)|(\s+$)/, "").replace(/[\r\n]/g, "\\n");
    }

    function trimNewLineChars(ws) {
      return ws.replace(/[ \r\n\t]+/g, " ");
    }

    function trimmedText() {
      return trimWhitespace(text());
    }

    function attrValues(values) {

      values = values.filter(function(v) {
        return !/^[\n\t\r]+$/.test(v.value);
      });

      if (values.length === 1 && values[0].type === "string") {
        return values[0];
      } else {
        return values;
      }
    }

    function trimTextExpressions(expressions) {

      function _trim(exprs) {
        var expr;
        for (var i = exprs.length; i--;) {
          expr = exprs[i];
          if (expr.type == "textNode" && !/\S/.test(expr.value) && !expr.decoded) {
            exprs.splice(i, 1);
          } else {
            break;
          }
        }
        return exprs;
      }

      return _trim(_trim(expressions.reverse()).reverse());
    }

    function expression(name) {
      return Array.prototype.slice.call(arguments);
    }



    peg$result = peg$parseRule(peg$startRuleIndex);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
},{}],32:[function(require,module,exports){
var ivd                = require(45);
var compiler           = require(29);
var extend             = require(71);
var createBindingClass = require(30);



/**
 */

module.exports = function(source, options) {

  var vnode;
  var createVNode;

  if (typeof source === "object") {
    vnode = source;
  } else {

    // TODO - use options parser here
    createVNode = typeof source === "string" ? compiler.compile(source, options) : source;
    vnode       = createVNode(ivd.fragment, ivd.element, ivd.text, ivd.comment, ivd.dynamic, createBindingClass);
  }

  if (!options) options = {};

  if (!options.document && typeof document !== "undefined") {
    options.document = document;
  }

  return ivd.template(vnode, options);
};

},{"29":29,"30":30,"45":45,"71":71}],33:[function(require,module,exports){
var extend = require(71);
var parser = require(31);
var he     = require(52);

/**
 */

function Transpiler() {
  for (var k in this) {
    if (k.charAt(0) === "_") {
      this[k] = this[k].bind(this);
    }
  }
  this.transpile = this.transpile.bind(this);
}

/**
 */

function _dashToCamelCase(string) {
  return string.split("-").map(function(part, i) {
    var p = part.toLowerCase();
    return i > 0 ? p.charAt(0).toUpperCase() + p.substr(1) : p;
  }).join("");
}
/**
 */

extend(Transpiler.prototype, {

  /**
   */

  transpile: function(source) {
    return this._root(parser.parse(source));
  },

  /**
   */

  _root: function(elements) {

    var buffer = "function(fragment, element, text, comment, dynamic, createBindingClass) {";
    var fragment = "fragment([" + this._children(elements) + "])";
    buffer += "return " + fragment;
    buffer += "}";

    return buffer;
  },

  /**
   */

  _expression: function(expression) {
    return this["_" + expression[0]](expression);
  },

  /**
   * check for stuff like <li repeat.each={{items}}></li>
   */

  _element: function(expression) {


    var exprs = {};
    var prev  = expression;
    var attrs = [];

    expression[2].forEach(function(attr, i) {

      var key    = attr[1];
      var value  = attr[2];
      var keyParts = key.split(".");

      // check for things like <li repeat.each={{items}}></li>
      if (keyParts.length > 1) {

        if (!exprs[keyParts[0]]) {

          expression = exprs[keyParts[0]] = ["element", keyParts[0], [], [[
            "element",
            expression[1],
            attrs,
            expression[3]
          ]]];
        }

        exprs[keyParts[0]][2].push([attr[0], keyParts[1], value]);
      } else {
        attrs.push(attr);
      }
    });

    return this._element2(expression);
  },

  /**
   */

  _children: function(children) {
    var items = [];

    children = children.concat();

    while(children.length) {
        var child = children[children.length - 1];
        if (child[0] !== "text") break;
        child[1] = child[1].replace(/[\s\r\n\t]+$/,"");
        if (/^[\s\r\n\t]+$/.test(child[1])) {
            children.pop();
        } else {
            break;
        }
    }

    return children.map(this._expression).join(", ");
  },

  /**
   */

  _element2: function(expression) {
    var buffer   = "element('" + expression[1] + "'";

    var dynamicAttributes = [];

    buffer += ", {";

    var attrs = [];

    buffer += expression[2].map(function(attr) {

      var key    = attr[1];
      var value  = attr[2];

      if (!value.length || (value.length === 1 && value[0][0] === "string")) {
        return "'" + key + "':" + (value.length ? this._expression(value[0]) : "true");
      } else {
        dynamicAttributes.push(attr);
      }
    }.bind(this)).filter(function(str) {
      return !!str;
    }).join(",");

    buffer += "}";

    var childBuffer = this._children(expression[3])
    if (childBuffer.length) {
      buffer += ", " + childBuffer;
    }

    buffer += ")";

    if (dynamicAttributes.length) {

      var dynamicAttrBuffer = "";
      var staticAttrBuffer  = "";

      dynamicAttributes.forEach(function(expression) {

        var type = expression[0];
        // var key  = _dashToCamelCase(expression[1]);

        dynamicAttrBuffer += "this";
        if (type === "block") {
          dynamicAttrBuffer += ".ref.nodeValue = " + this._expression(expression[1]);
        } else if (type === "attribute") {
          var value = expression[2].map(this._expression).join("+");
          if (value == "") {
            value = "true";
          }
          dynamicAttrBuffer += ".setAttribute('" + expression[1] + "', " + value + ");";
        } else if (type === "property") {
          // dynamicAttrBuffer += ".ref." + expression[1] + "=" + this._expression(expression[2]);
          dynamicAttrBuffer += ".setProperty('" + expression[1] + "', " + this._expression(expression[2]) + ");";
        }
      }.bind(this));

      if (dynamicAttrBuffer.length) {
        dynamicAttrBuffer = "function(context) {" + dynamicAttrBuffer + "}";
      }

      if (staticAttrBuffer.length) {
        staticAttrBuffer = "function() { var self = this; " + staticAttrBuffer + "}";
      }

      if (dynamicAttrBuffer.length || staticAttrBuffer.length) {
        buffer  = "dynamic(" + buffer + ",";
        buffer += "createBindingClass(" + (staticAttrBuffer.length ? staticAttrBuffer : "void 0") + ", " + (dynamicAttrBuffer ? dynamicAttrBuffer : "void 0") + ")";
        buffer += ")";
      }
    }


    return buffer;
  },

  /**
   */

  __addReference: function(expression) {
    var name = "_" + (++this._refCounter);
    this._refs[name] = expression;
    return name;
  },

  /**
   */

  _block: function(expression) {

    // TODO - check for unbound expressions here
    var buffer = "dynamic(text(), createBindingClass(void 0, function(context) {";
    buffer += "this.ref.nodeValue = " + this._expression(expression[1]) + ";";
    return buffer + "}))";
  },

  /**
   */

  _text: function(expression) {
    return "text('" + he.decode(expression[1]) + "')";
  },

  /**
   */

  _comment: function(expression) {
    return "comment('" + expression[1] + "')";
  },

  /**
   */

  _hash: function(expression) {

    var items = expression[1];

    var buffer = [];

    for (var key in items) {
      buffer.push("'" + key + "':" + this._expression(items[key]));
    }

    return "{" + buffer.join(",") + "}";
  },

  /**
   */

  _script: function(expression) {
    return this._expression(expression[1]);
  },

  /**
   */

  _reference: function(expression) {
    if (expression[2]) {

      var gettable = !!~expression[2].indexOf("<~");
      var settable = !!~expression[2].indexOf("~>");

      return "this.view.ref('" + expression[1].join(".") + "', " + gettable + ", " + settable + ")";
    }
    return "this.view.get('" + expression[1].join(".") + "')";
  },

  /**
   */

  _string: function(expression) {
    return "'" + expression[1] + "'";
  },

  /**
   */

  _operator: function(expression) {
    return this._expression(expression[2]) + expression[1] + this._expression(expression[3]);
  },

  /**
   */

  _condition: function(expression) {
    return this._expression(expression[1])  +
    "?" + this._expression(expression[2]) +
    ":" + this._expression(expression[3]);
  },

  /**
   */

  _literal: function(expression) {
    return expression[1];
  },

  /**
   */

  _not: function(expression) {
    return "!" + this._expression(expression[1]);
  },

  /**
   */

  _negative: function(expression) {
    return "-" + this._expression(expression[1]);
  },

  /**
   */

  _call: function(expression) {
    var buffer = "this.view.call('" + expression[1][1].join(".") + "', [";
    buffer += expression[2].map(this._expression).join(",");
    return buffer + "])";
  },

  /**
   */

  _modifier: function(expression) {
    return "this.options.modifiers." + expression[1] + "(" + expression[2].map(this._expression).join(",") + ")";
  },

  /**
   */

  _group: function(expression) {
    return "(" + this._expression(expression[1]) + ")";
  },

  /**
   */

  __findExpressions: function(type, expr) {
    var exprs = [];

    this.__traverse(expr, function(expr) {
      if (expr[0] === type) exprs.push(expr);
    });

    return exprs;
  },

  /**
   */

  __traverse: function(expr, iterator) {
    iterator(expr);
    expr.forEach(function(v) {
      if (v && typeof v === "object") {
        this.__traverse(v, iterator);
      }
    }.bind(this));

  }
});

/**
 */

module.exports = new Transpiler();

},{"31":31,"52":52,"71":71}],34:[function(require,module,exports){
module.exports = {

  /**
   */

  each: function(items, each, complete) {

    var total     = items.length;
    var completed = 0;

    items.forEach(function(item) {
      var called = false;
      each(item, function() {
        if (called) throw new Error("callback called twice");
        called = true;
        if (++completed === total && complete) complete();
      });
    });
  }
};

},{}],35:[function(require,module,exports){
module.exports = function(callback, context) {
  if (callback.bind) return callback.bind.apply(callback, [context].concat(Array.prototype.slice.call(arguments, 2)));
  return function() {
    return callback.apply(context, arguments);
  };
};

},{}],36:[function(require,module,exports){
var extend        = require(71);
var getNodeByPath = require(37);
var getNodePath   = require(38);

/**
 */

function FragmentSection(document, start, end) {
  this.document = document;

  this.start = start || document.createTextNode("");
  this.end   = end   || document.createTextNode("");

  if (!this.start.parentNode) {
    var parent = document.createDocumentFragment();
    parent.appendChild(this.start);
    parent.appendChild(this.end);
  }
}

/**
 */

extend(FragmentSection.prototype, {

  /**
   */

  appendChild: function(node) {
    this.end.parentNode.insertBefore(node, this.end);
  },

  /**
   */

  render: function() {
    return this.start.parentNode;
  },

  /**
   */

  remove: function() {
    var node     = this.removeChildNodes();
    node.insertBefore(this.start, node.childNodes[0]);
    node.appendChild(this.end);
    return this;
  },

  /**
   */

  removeChildNodes: function() {
    var node    = this.document.createDocumentFragment();
    var start   = this.start;
    var current = start.nextSibling;
    var end     = this.end;

    while (current !== end) {
      node.appendChild(current);
      current = start.nextSibling;
    }

    return node;
  },

  /**
   */

  createMarker: function() {
    return new Marker(this.document, getNodePath(this.start), getNodePath(this.end));
  },

  /**
   */

  clone: function() {
    var parentClone;

    // fragment?
    if (this.start.parentNode.nodeType === 11) {
      parentClone = this.start.parentNode.cloneNode(true);
    } else {
      parentClone  = this.document.createDocumentFragment();
      var children = this._getChildNodes();
      var n        = children.length;

      for (var i = 0; i < n; i++) {
        parentClone.appendChild(children[i].cloneNode(true));
      }
    }

    var first = parentClone.childNodes[0];
    var last  = parentClone.childNodes[parentClone.childNodes.length - 1];

    return new FragmentSection(this.document, first, last);
  },

  /**
   */

  _getChildNodes: function() {
    var current = this.start;
    var end     = this.end.nextSibling;
    var children = [];
    while (current !== end) {
      children.push(current);
      current = current.nextSibling;
    }
    return children;
  }
});

/**
 */

function Marker(document, startPath, endPath) {
  this.document  = document;
  this.startPath = startPath;
  this.endPath   = endPath;
}

/**
 */

extend(Marker.prototype, {

  /**
   */

  createSection: function(root) {
    return new FragmentSection(this.document, getNodeByPath(root, this.startPath), getNodeByPath(root, this.endPath));
  }
});

module.exports = FragmentSection;

},{"37":37,"38":38,"71":71}],37:[function(require,module,exports){
module.exports = function(root, path) {

  var c = root;

  for (var i = 0, n = path.length; i < n; i++) {
    c = c.childNodes[path[i]];
  }

  return c;
};

},{}],38:[function(require,module,exports){
module.exports = function(node) {

  var path = [];
  var p    = node.parentNode;
  var c    = node;

  while (p) {

    path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
    c = p;

    p = p.parentNode;

    // virtual nodes - must be skipped
    while (p && p.nodeType > 12) p = p.parentNode;
  }

  return path;
};

},{}],39:[function(require,module,exports){
var extend        = require(71);
var getNodeByPath = require(37);
var getNodePath   = require(38);

/**
 */

function NodeSection(document, node) {
  this.document = document;
  this.node     = node;
}

/**
 */

extend(NodeSection.prototype, {

  /**
   */

  createMarker: function() {
    return new Marker(this.document, getNodePath(this.node));
  },

  /**
   */

  appendChild: function(childNode) {
    this.node.appendChild(childNode);
  },

  /**
   */

  render: function() {
    return this.node;
  },

  /**
   */

  remove: function() {
    if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
  },

  /**
   */

  removeChildNodes: function() {
    while(this.node.childNodes.length) this.node.removeChild(this.childNodes[0]);
  },

  /**
   */

  clone: function() {
    return new NodeSection(this.document, this.node.cloneNode(true));
  }
});

/**
 */

function Marker(document, path) {
  this.document = document;
  this.path     = path;
}

/**
 */

extend(Marker.prototype, {

  /**
   */

  createSection: function(root) {
    return new NodeSection(this.document, this.findNode(root));
  },

  /**
   */

  findNode: function(root) {
    return getNodeByPath(root, this.path);
  }
});

module.exports = NodeSection;

},{"37":37,"38":38,"71":71}],40:[function(require,module,exports){
/**
 */

function Comment(nodeValue) {
  this.nodeValue = nodeValue || "";
  this.target    = this;
}

/**
 */

Comment.prototype.nodeType = 8;

/**
 */

Comment.prototype.freeze = function(options) {
  return options.document.createComment(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Comment(nodeValue);
};

},{}],41:[function(require,module,exports){
var text     = require(49);
var element  = require(43);
var fragment = require(44);
var comment  = require(40);

module.exports = {

  /**
   */

  createTextNode: function(nodeValue) {
    return text(nodeValue);
  },

  /**
   */

  createDocumentFragment: function() {
    return fragment([]);
  },

  /**
   */

  createElement: function(nodeName) {
    return element(nodeName);
  }
};

},{"40":40,"43":43,"44":44,"49":49}],42:[function(require,module,exports){
var extend        = require(71);
var getNodePath   = require(38);
var getNodeByPath = require(37);

/**
 */

function DynamicNode(vnode, bindingClass) {
  this.vnode            = vnode;
  this.bindingClass     = bindingClass;
  this.vnode.parentNode = this;
  this.target           = vnode;
}

/**
 */

DynamicNode.prototype.freeze = function(options, hydrators) {
  if (options.components[this.vnode.nodeName]) {
    return this.freezeComponent(options, hydrators);
  } else {
    return this.freezeElement(options, hydrators);
  }
};

/**
 */

DynamicNode.prototype.freezeComponent = function(options, hydrators) {
  var h2 = [];
  var element = this.vnode.freeze(options, h2);
  hydrators.push(new ComponentHydrator(h2[0], this.bindingClass, options));
  return element;
};

/**
 */

DynamicNode.prototype.freezeElement = function(options, hydrators) {
  var node = this.vnode.freeze(options, hydrators);
  hydrators.push(new Hydrator(node, this.bindingClass, options));
  return node;
};

/**
 */

function Hydrator(ref, bindingClass, options) {
  this.options      = options;
  this.ref          = ref;
  this.bindingClass = bindingClass;
}

/**
 */

extend(Hydrator.prototype, {

  /**
   */

  hydrate: function(root, view) {
    if (!this._refPath) this._refPath = getNodePath(this.ref);
    view.bindings.push(new this.bindingClass(getNodeByPath(root, this._refPath), view));
  }
});
/**
 */

function ComponentHydrator(hydrator, bindingClass, options) {
  this.options       = options;
  this.hydrator      = hydrator;
  this.bindingClass  = bindingClass;
}

/**
 */

extend(ComponentHydrator.prototype, {
  hydrate: function(root, view) {
    this.hydrator.hydrate(root, view);
    var component = view.bindings[view.bindings.length - 1];
    view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(component, view));
  }
});

/**
 */

module.exports = function(vnode, bindingClass) {
  return new DynamicNode(vnode, bindingClass);
};

},{"37":37,"38":38,"71":71}],43:[function(require,module,exports){
var createSection    = require(46);
var fragment         = require(44);
var FragmentSection  = require(36);
var NodeSection      = require(39);

/**
 */

function Element(nodeName, attributes, childNodes) {
  this.nodeName   = String(nodeName).toLowerCase();
  this._nodeNameNoDashes = this.nodeName.replace(/-/g, "");
  this.attributes = attributes || {};
  this.childNodes = childNodes;
  this.target     = this;
  for (var i = childNodes.length; i--;) {
    childNodes[i].parentNode = this;
  }
}

/**
 */

Element.prototype.nodeType = 1;

/**
 */

Element.prototype.freeze = function(options, hydrators) {

  var components = options.components || {};
  var attributes = options.attributes || {};

  if (components[this._nodeNameNoDashes]) {
    return this._freezeComponent(components[this._nodeNameNoDashes], options, hydrators);
  }

  return this._freezeElement(options, hydrators);
};

/**
 */

Element.prototype.setAttribute = function(key, value) {
  this.attributes[key] = value;
};

/**
 */

Element.prototype._freezeComponent = function(clazz, options, hydrators) {

  // TODO - check parent node to see if there are anymore children. If not, then user NodeSection
  var section = new FragmentSection(options.document);
  hydrators.push(new ComponentHydrator(clazz, section, this, this._splitAttributes(options), options));
  return section.render();
};

/**
 */

Element.prototype._freezeElement = function(options, hydrators) {

  var element = options.document.createElement(this.nodeName);

  var inf = this._splitAttributes(options);

  for (var attrName in inf.staticAttributes) {
    element.setAttribute(attrName, inf.staticAttributes[attrName]);
  }

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    element.appendChild(this.childNodes[i].freeze(options, hydrators));
  }

  if (Object.keys(inf.dynamicAttributes).length) {
    hydrators.push(new ElementAttributeHydrator(new NodeSection(options.document, element), options, inf.dynamicAttributes));
  }

  return element;
};


/**
 */

Element.prototype._splitAttributes = function(options) {

  var dynamicAttributes = {};
  var staticAttributes  = {};

  if (options.attributes) {
    for (var key in this.attributes) {
      var attrClass = options.attributes[key];
      if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
        dynamicAttributes[key] = this.attributes[key];
      } else {
        staticAttributes[key]  = this.attributes[key];
      }
    }
  } else {
    staticAttributes = this.attributes;
  }


  return {
    dynamicAttributes : dynamicAttributes,
    staticAttributes  : staticAttributes
  };
};

/**
*/

function ComponentHydrator(clazz, section, element, attrInfo, options) {
  this.clazz                = clazz;
  this.section              = section;
  this.element              = element;
  this.dynamicAttributes    = attrInfo.dynamicAttributes;
  this.attributes           = attrInfo.staticAttributes;
  this.hasDynamicAttributes = !!Object.keys(attrInfo.dynamicAttributes).length;
  this.options              = options;
}

/**
*/

ComponentHydrator.prototype.hydrate = function(root, view) {
  if (!this._marker) this._marker = this.section.createMarker();
  var ref = new this.clazz(this._marker.createSection(root), this.element, this.attributes, view);
  if (this.hasDynamicAttributes) {
    _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
  }
  if (ref.update) view.bindings.push(ref);
};

/**
 */

module.exports = function(name, attributes, children) {
  return new Element(name, attributes, Array.prototype.slice.call(arguments, 2));
};

/**
 */

function ElementAttributeHydrator(section, options, dynamicAttributes) {
  this.section           = section;
  this.options           = options;
  this.dynamicAttributes = dynamicAttributes;
}

/**
 */

ElementAttributeHydrator.prototype.hydrate = function(root, view) {
  if (!this._marker) this._marker = this.section.createMarker();
  _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.dynamicAttributes, view);
};

/**
 */

function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
  for (var key in dynamicAttributes) {
    var clazz = options.attributes[key];
    var attr = new clazz(ref, key, dynamicAttributes[key], view);
    if (attr.update) view.bindings.push(attr);
  }
}

},{"36":36,"39":39,"44":44,"46":46}],44:[function(require,module,exports){

/**
 */

function Fragment(childNodes) {
  this.childNodes = childNodes;
  this.target     = this;
  for (var i = childNodes.length; i--;) childNodes[i].parentNode = this;
}

/**
 */

Fragment.prototype.nodeType = 11;

/**
 */

Fragment.prototype.freeze = function(options, hydrators) {

  var fragment = options.document.createDocumentFragment();

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    fragment.appendChild(this.childNodes[i].freeze(options, hydrators));
  }

  return fragment;
};

/**
 */

module.exports = function(children) {
  if (children.length === 1) return children[0];
  return new Fragment(children);
};

},{}],45:[function(require,module,exports){
/**
 */

module.exports = {
  element   : require(43),
  fragment  : require(44),
  text      : require(49),
  dynamic   : require(42),
  comment   : require(40),
  template  : require(48),
  View      : require(50)
};

},{"40":40,"42":42,"43":43,"44":44,"48":48,"49":49,"50":50}],46:[function(require,module,exports){
var extend          = require(71);
var FragmentSection = require(36);
var NodeSection     = require(39);

module.exports = function(document, node) {
  if (node.nodeType === 11) {
    var section = new FragmentSection(document);
    section.appendChild(node);
    return section;
  } else {
    return new NodeSection(document, node);
  }
};

},{"36":36,"39":39,"71":71}],47:[function(require,module,exports){
module.exports = function(template) {

  function Component(section, vnode, attributes, view) {
    this.section    = section;
    this.vnode      = vnode;
    this.attributes = attributes;
    this.view       = view;

    this.childView = template.view();
    this.section.appendChild(this.childView.render());
  }

  Component.prototype.template = template;

  Component.prototype.setAttribute = function(key, value) {
    this.attributes[key] = value;
  };

  Component.prototype.update = function(context) {
    this.childView.update(this.attributes);
  };

  return Component;
}

},{}],48:[function(require,module,exports){
var defaultDocument   = require(69);
var View              = require(50);
var extend            = require(71);
var FragmentSection   = require(36);
var NodeSection       = require(39);
var templateComponent = require(47);

function _cleanupComponents(hash) {
  var c1 = hash || {};
  var c2 = {};

  for (var k in c1) {
    if (c1[k].__isTemplate) c1[k]  =  templateComponent(c1[k]);
    c2[k.toLowerCase()] = c1[k];
  }

  return c2;
}

/**
 */

function _cleanupOptions(options) {
  return extend({}, options, {
    components: _cleanupComponents(options.components),
    attributes: options.attributes
  });
}

/**
 */

function Template(vnode, options) {

  this.vnode = vnode;

  // hydrates nodes when the template is used
  this._hydrators = [];

  options = _cleanupOptions(extend({
    document  : defaultDocument
  }, options));

  this.viewClass = options.viewClass || View;
  this.options   = options;
  this.modifiers = options.modifiers || {};

  // freeze & create the template node immediately
  var node = vnode.freeze(options, this._hydrators);

  if (node.nodeType === 11) {
    this.section = new FragmentSection(options.document);
    this.section.appendChild(node);
  } else {
    this.section = new NodeSection(options.document, node);
  }
}

/**
 */

Template.prototype.__isTemplate = true;

/**
 * creates a new view
 */

Template.prototype.view = function(context, options) {

  // TODO - make compatible with IE 8
  var section     = this.section.clone();

  var view = new this.viewClass(section, this, options);

  for (var i = 0, n = this._hydrators.length; i < n; i++) {
    this._hydrators[i].hydrate(section.node || section.start.parentNode, view);
  }

  // only set the context if it exists. Should be a very explicit thing.
  if (context) view.update(context);

  // TODO - set section instead of node
  return view;
};

/**
 */

module.exports = function(vnode, options) {
  return new Template(vnode, options);
};

},{"36":36,"39":39,"47":47,"50":50,"69":69,"71":71}],49:[function(require,module,exports){
/**
 */

function Text(nodeValue) {
  this.nodeValue = nodeValue || "";
  this.target    = this;
}

/**
 */

Text.prototype.freeze = function(options) {
  return options.document.createTextNode(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Text(nodeValue);
};

},{}],50:[function(require,module,exports){
/**
 */

function View(section, template, options) {
  this.section  = section;
  this.bindings = [];
  this.template = template;
  this.options  = options;
}

/**
 * updates the view
 */

View.prototype.update = function(context) {
  for (var i = 0, n = this.bindings.length; i < n; i++) {
    this.bindings[i].update(context);
  }
};

/**
 */

View.prototype.render = function() {
  return this.section.render();
};

/**
 */

View.prototype.remove = function() {
  return this.section.remove();
};

/**
 */

module.exports = View;

},{}],51:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],52:[function(require,module,exports){
(function (global){
/*! http://mths.be/he v0.5.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// http://whatwg.org/html/tokenization.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// http://whatwg.org/html/tokenization.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xC1':'Aacute','\xE1':'aacute','\u0102':'Abreve','\u0103':'abreve','\u223E':'ac','\u223F':'acd','\u223E\u0333':'acE','\xC2':'Acirc','\xE2':'acirc','\xB4':'acute','\u0410':'Acy','\u0430':'acy','\xC6':'AElig','\xE6':'aelig','\u2061':'af','\uD835\uDD04':'Afr','\uD835\uDD1E':'afr','\xC0':'Agrave','\xE0':'agrave','\u2135':'aleph','\u0391':'Alpha','\u03B1':'alpha','\u0100':'Amacr','\u0101':'amacr','\u2A3F':'amalg','&':'amp','\u2A55':'andand','\u2A53':'And','\u2227':'and','\u2A5C':'andd','\u2A58':'andslope','\u2A5A':'andv','\u2220':'ang','\u29A4':'ange','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u2221':'angmsd','\u221F':'angrt','\u22BE':'angrtvb','\u299D':'angrtvbd','\u2222':'angsph','\xC5':'angst','\u237C':'angzarr','\u0104':'Aogon','\u0105':'aogon','\uD835\uDD38':'Aopf','\uD835\uDD52':'aopf','\u2A6F':'apacir','\u2248':'ap','\u2A70':'apE','\u224A':'ape','\u224B':'apid','\'':'apos','\xE5':'aring','\uD835\uDC9C':'Ascr','\uD835\uDCB6':'ascr','\u2254':'colone','*':'ast','\u224D':'CupCap','\xC3':'Atilde','\xE3':'atilde','\xC4':'Auml','\xE4':'auml','\u2233':'awconint','\u2A11':'awint','\u224C':'bcong','\u03F6':'bepsi','\u2035':'bprime','\u223D':'bsim','\u22CD':'bsime','\u2216':'setmn','\u2AE7':'Barv','\u22BD':'barvee','\u2305':'barwed','\u2306':'Barwed','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u0411':'Bcy','\u0431':'bcy','\u201E':'bdquo','\u2235':'becaus','\u29B0':'bemptyv','\u212C':'Bscr','\u0392':'Beta','\u03B2':'beta','\u2136':'beth','\u226C':'twixt','\uD835\uDD05':'Bfr','\uD835\uDD1F':'bfr','\u22C2':'xcap','\u25EF':'xcirc','\u22C3':'xcup','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A06':'xsqcup','\u2605':'starf','\u25BD':'xdtri','\u25B3':'xutri','\u2A04':'xuplus','\u22C1':'Vee','\u22C0':'Wedge','\u290D':'rbarr','\u29EB':'lozf','\u25AA':'squf','\u25B4':'utrif','\u25BE':'dtrif','\u25C2':'ltrif','\u25B8':'rtrif','\u2423':'blank','\u2592':'blk12','\u2591':'blk14','\u2593':'blk34','\u2588':'block','=\u20E5':'bne','\u2261\u20E5':'bnequiv','\u2AED':'bNot','\u2310':'bnot','\uD835\uDD39':'Bopf','\uD835\uDD53':'bopf','\u22A5':'bot','\u22C8':'bowtie','\u29C9':'boxbox','\u2510':'boxdl','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u250C':'boxdr','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2500':'boxh','\u2550':'boxH','\u252C':'boxhd','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2534':'boxhu','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u229F':'minusb','\u229E':'plusb','\u22A0':'timesb','\u2518':'boxul','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u2514':'boxur','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u2502':'boxv','\u2551':'boxV','\u253C':'boxvh','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2524':'boxvl','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u251C':'boxvr','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u02D8':'breve','\xA6':'brvbar','\uD835\uDCB7':'bscr','\u204F':'bsemi','\u29C5':'bsolb','\\':'bsol','\u27C8':'bsolhsub','\u2022':'bull','\u224E':'bump','\u2AAE':'bumpE','\u224F':'bumpe','\u0106':'Cacute','\u0107':'cacute','\u2A44':'capand','\u2A49':'capbrcup','\u2A4B':'capcap','\u2229':'cap','\u22D2':'Cap','\u2A47':'capcup','\u2A40':'capdot','\u2145':'DD','\u2229\uFE00':'caps','\u2041':'caret','\u02C7':'caron','\u212D':'Cfr','\u2A4D':'ccaps','\u010C':'Ccaron','\u010D':'ccaron','\xC7':'Ccedil','\xE7':'ccedil','\u0108':'Ccirc','\u0109':'ccirc','\u2230':'Cconint','\u2A4C':'ccups','\u2A50':'ccupssm','\u010A':'Cdot','\u010B':'cdot','\xB8':'cedil','\u29B2':'cemptyv','\xA2':'cent','\xB7':'middot','\uD835\uDD20':'cfr','\u0427':'CHcy','\u0447':'chcy','\u2713':'check','\u03A7':'Chi','\u03C7':'chi','\u02C6':'circ','\u2257':'cire','\u21BA':'olarr','\u21BB':'orarr','\u229B':'oast','\u229A':'ocir','\u229D':'odash','\u2299':'odot','\xAE':'reg','\u24C8':'oS','\u2296':'ominus','\u2295':'oplus','\u2297':'otimes','\u25CB':'cir','\u29C3':'cirE','\u2A10':'cirfnint','\u2AEF':'cirmid','\u29C2':'cirscir','\u2232':'cwconint','\u201D':'rdquo','\u2019':'rsquo','\u2663':'clubs',':':'colon','\u2237':'Colon','\u2A74':'Colone',',':'comma','@':'commat','\u2201':'comp','\u2218':'compfn','\u2102':'Copf','\u2245':'cong','\u2A6D':'congdot','\u2261':'equiv','\u222E':'oint','\u222F':'Conint','\uD835\uDD54':'copf','\u2210':'coprod','\xA9':'copy','\u2117':'copysr','\u21B5':'crarr','\u2717':'cross','\u2A2F':'Cross','\uD835\uDC9E':'Cscr','\uD835\uDCB8':'cscr','\u2ACF':'csub','\u2AD1':'csube','\u2AD0':'csup','\u2AD2':'csupe','\u22EF':'ctdot','\u2938':'cudarrl','\u2935':'cudarrr','\u22DE':'cuepr','\u22DF':'cuesc','\u21B6':'cularr','\u293D':'cularrp','\u2A48':'cupbrcap','\u2A46':'cupcap','\u222A':'cup','\u22D3':'Cup','\u2A4A':'cupcup','\u228D':'cupdot','\u2A45':'cupor','\u222A\uFE00':'cups','\u21B7':'curarr','\u293C':'curarrm','\u22CE':'cuvee','\u22CF':'cuwed','\xA4':'curren','\u2231':'cwint','\u232D':'cylcty','\u2020':'dagger','\u2021':'Dagger','\u2138':'daleth','\u2193':'darr','\u21A1':'Darr','\u21D3':'dArr','\u2010':'dash','\u2AE4':'Dashv','\u22A3':'dashv','\u290F':'rBarr','\u02DD':'dblac','\u010E':'Dcaron','\u010F':'dcaron','\u0414':'Dcy','\u0434':'dcy','\u21CA':'ddarr','\u2146':'dd','\u2911':'DDotrahd','\u2A77':'eDDot','\xB0':'deg','\u2207':'Del','\u0394':'Delta','\u03B4':'delta','\u29B1':'demptyv','\u297F':'dfisht','\uD835\uDD07':'Dfr','\uD835\uDD21':'dfr','\u2965':'dHar','\u21C3':'dharl','\u21C2':'dharr','\u02D9':'dot','`':'grave','\u02DC':'tilde','\u22C4':'diam','\u2666':'diams','\xA8':'die','\u03DD':'gammad','\u22F2':'disin','\xF7':'div','\u22C7':'divonx','\u0402':'DJcy','\u0452':'djcy','\u231E':'dlcorn','\u230D':'dlcrop','$':'dollar','\uD835\uDD3B':'Dopf','\uD835\uDD55':'dopf','\u20DC':'DotDot','\u2250':'doteq','\u2251':'eDot','\u2238':'minusd','\u2214':'plusdo','\u22A1':'sdotb','\u21D0':'lArr','\u21D4':'iff','\u27F8':'xlArr','\u27FA':'xhArr','\u27F9':'xrArr','\u21D2':'rArr','\u22A8':'vDash','\u21D1':'uArr','\u21D5':'vArr','\u2225':'par','\u2913':'DownArrowBar','\u21F5':'duarr','\u0311':'DownBreve','\u2950':'DownLeftRightVector','\u295E':'DownLeftTeeVector','\u2956':'DownLeftVectorBar','\u21BD':'lhard','\u295F':'DownRightTeeVector','\u2957':'DownRightVectorBar','\u21C1':'rhard','\u21A7':'mapstodown','\u22A4':'top','\u2910':'RBarr','\u231F':'drcorn','\u230C':'drcrop','\uD835\uDC9F':'Dscr','\uD835\uDCB9':'dscr','\u0405':'DScy','\u0455':'dscy','\u29F6':'dsol','\u0110':'Dstrok','\u0111':'dstrok','\u22F1':'dtdot','\u25BF':'dtri','\u296F':'duhar','\u29A6':'dwangle','\u040F':'DZcy','\u045F':'dzcy','\u27FF':'dzigrarr','\xC9':'Eacute','\xE9':'eacute','\u2A6E':'easter','\u011A':'Ecaron','\u011B':'ecaron','\xCA':'Ecirc','\xEA':'ecirc','\u2256':'ecir','\u2255':'ecolon','\u042D':'Ecy','\u044D':'ecy','\u0116':'Edot','\u0117':'edot','\u2147':'ee','\u2252':'efDot','\uD835\uDD08':'Efr','\uD835\uDD22':'efr','\u2A9A':'eg','\xC8':'Egrave','\xE8':'egrave','\u2A96':'egs','\u2A98':'egsdot','\u2A99':'el','\u2208':'in','\u23E7':'elinters','\u2113':'ell','\u2A95':'els','\u2A97':'elsdot','\u0112':'Emacr','\u0113':'emacr','\u2205':'empty','\u25FB':'EmptySmallSquare','\u25AB':'EmptyVerySmallSquare','\u2004':'emsp13','\u2005':'emsp14','\u2003':'emsp','\u014A':'ENG','\u014B':'eng','\u2002':'ensp','\u0118':'Eogon','\u0119':'eogon','\uD835\uDD3C':'Eopf','\uD835\uDD56':'eopf','\u22D5':'epar','\u29E3':'eparsl','\u2A71':'eplus','\u03B5':'epsi','\u0395':'Epsilon','\u03F5':'epsiv','\u2242':'esim','\u2A75':'Equal','=':'equals','\u225F':'equest','\u21CC':'rlhar','\u2A78':'equivDD','\u29E5':'eqvparsl','\u2971':'erarr','\u2253':'erDot','\u212F':'escr','\u2130':'Escr','\u2A73':'Esim','\u0397':'Eta','\u03B7':'eta','\xD0':'ETH','\xF0':'eth','\xCB':'Euml','\xEB':'euml','\u20AC':'euro','!':'excl','\u2203':'exist','\u0424':'Fcy','\u0444':'fcy','\u2640':'female','\uFB03':'ffilig','\uFB00':'fflig','\uFB04':'ffllig','\uD835\uDD09':'Ffr','\uD835\uDD23':'ffr','\uFB01':'filig','\u25FC':'FilledSmallSquare','fj':'fjlig','\u266D':'flat','\uFB02':'fllig','\u25B1':'fltns','\u0192':'fnof','\uD835\uDD3D':'Fopf','\uD835\uDD57':'fopf','\u2200':'forall','\u22D4':'fork','\u2AD9':'forkv','\u2131':'Fscr','\u2A0D':'fpartint','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\u2154':'frac23','\u2156':'frac25','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\u2044':'frasl','\u2322':'frown','\uD835\uDCBB':'fscr','\u01F5':'gacute','\u0393':'Gamma','\u03B3':'gamma','\u03DC':'Gammad','\u2A86':'gap','\u011E':'Gbreve','\u011F':'gbreve','\u0122':'Gcedil','\u011C':'Gcirc','\u011D':'gcirc','\u0413':'Gcy','\u0433':'gcy','\u0120':'Gdot','\u0121':'gdot','\u2265':'ge','\u2267':'gE','\u2A8C':'gEl','\u22DB':'gel','\u2A7E':'ges','\u2AA9':'gescc','\u2A80':'gesdot','\u2A82':'gesdoto','\u2A84':'gesdotol','\u22DB\uFE00':'gesl','\u2A94':'gesles','\uD835\uDD0A':'Gfr','\uD835\uDD24':'gfr','\u226B':'gg','\u22D9':'Gg','\u2137':'gimel','\u0403':'GJcy','\u0453':'gjcy','\u2AA5':'gla','\u2277':'gl','\u2A92':'glE','\u2AA4':'glj','\u2A8A':'gnap','\u2A88':'gne','\u2269':'gnE','\u22E7':'gnsim','\uD835\uDD3E':'Gopf','\uD835\uDD58':'gopf','\u2AA2':'GreaterGreater','\u2273':'gsim','\uD835\uDCA2':'Gscr','\u210A':'gscr','\u2A8E':'gsime','\u2A90':'gsiml','\u2AA7':'gtcc','\u2A7A':'gtcir','>':'gt','\u22D7':'gtdot','\u2995':'gtlPar','\u2A7C':'gtquest','\u2978':'gtrarr','\u2269\uFE00':'gvnE','\u200A':'hairsp','\u210B':'Hscr','\u042A':'HARDcy','\u044A':'hardcy','\u2948':'harrcir','\u2194':'harr','\u21AD':'harrw','^':'Hat','\u210F':'hbar','\u0124':'Hcirc','\u0125':'hcirc','\u2665':'hearts','\u2026':'mldr','\u22B9':'hercon','\uD835\uDD25':'hfr','\u210C':'Hfr','\u2925':'searhk','\u2926':'swarhk','\u21FF':'hoarr','\u223B':'homtht','\u21A9':'larrhk','\u21AA':'rarrhk','\uD835\uDD59':'hopf','\u210D':'Hopf','\u2015':'horbar','\uD835\uDCBD':'hscr','\u0126':'Hstrok','\u0127':'hstrok','\u2043':'hybull','\xCD':'Iacute','\xED':'iacute','\u2063':'ic','\xCE':'Icirc','\xEE':'icirc','\u0418':'Icy','\u0438':'icy','\u0130':'Idot','\u0415':'IEcy','\u0435':'iecy','\xA1':'iexcl','\uD835\uDD26':'ifr','\u2111':'Im','\xCC':'Igrave','\xEC':'igrave','\u2148':'ii','\u2A0C':'qint','\u222D':'tint','\u29DC':'iinfin','\u2129':'iiota','\u0132':'IJlig','\u0133':'ijlig','\u012A':'Imacr','\u012B':'imacr','\u2110':'Iscr','\u0131':'imath','\u22B7':'imof','\u01B5':'imped','\u2105':'incare','\u221E':'infin','\u29DD':'infintie','\u22BA':'intcal','\u222B':'int','\u222C':'Int','\u2124':'Zopf','\u2A17':'intlarhk','\u2A3C':'iprod','\u2062':'it','\u0401':'IOcy','\u0451':'iocy','\u012E':'Iogon','\u012F':'iogon','\uD835\uDD40':'Iopf','\uD835\uDD5A':'iopf','\u0399':'Iota','\u03B9':'iota','\xBF':'iquest','\uD835\uDCBE':'iscr','\u22F5':'isindot','\u22F9':'isinE','\u22F4':'isins','\u22F3':'isinsv','\u0128':'Itilde','\u0129':'itilde','\u0406':'Iukcy','\u0456':'iukcy','\xCF':'Iuml','\xEF':'iuml','\u0134':'Jcirc','\u0135':'jcirc','\u0419':'Jcy','\u0439':'jcy','\uD835\uDD0D':'Jfr','\uD835\uDD27':'jfr','\u0237':'jmath','\uD835\uDD41':'Jopf','\uD835\uDD5B':'jopf','\uD835\uDCA5':'Jscr','\uD835\uDCBF':'jscr','\u0408':'Jsercy','\u0458':'jsercy','\u0404':'Jukcy','\u0454':'jukcy','\u039A':'Kappa','\u03BA':'kappa','\u03F0':'kappav','\u0136':'Kcedil','\u0137':'kcedil','\u041A':'Kcy','\u043A':'kcy','\uD835\uDD0E':'Kfr','\uD835\uDD28':'kfr','\u0138':'kgreen','\u0425':'KHcy','\u0445':'khcy','\u040C':'KJcy','\u045C':'kjcy','\uD835\uDD42':'Kopf','\uD835\uDD5C':'kopf','\uD835\uDCA6':'Kscr','\uD835\uDCC0':'kscr','\u21DA':'lAarr','\u0139':'Lacute','\u013A':'lacute','\u29B4':'laemptyv','\u2112':'Lscr','\u039B':'Lambda','\u03BB':'lambda','\u27E8':'lang','\u27EA':'Lang','\u2991':'langd','\u2A85':'lap','\xAB':'laquo','\u21E4':'larrb','\u291F':'larrbfs','\u2190':'larr','\u219E':'Larr','\u291D':'larrfs','\u21AB':'larrlp','\u2939':'larrpl','\u2973':'larrsim','\u21A2':'larrtl','\u2919':'latail','\u291B':'lAtail','\u2AAB':'lat','\u2AAD':'late','\u2AAD\uFE00':'lates','\u290C':'lbarr','\u290E':'lBarr','\u2772':'lbbrk','{':'lcub','[':'lsqb','\u298B':'lbrke','\u298F':'lbrksld','\u298D':'lbrkslu','\u013D':'Lcaron','\u013E':'lcaron','\u013B':'Lcedil','\u013C':'lcedil','\u2308':'lceil','\u041B':'Lcy','\u043B':'lcy','\u2936':'ldca','\u201C':'ldquo','\u2967':'ldrdhar','\u294B':'ldrushar','\u21B2':'ldsh','\u2264':'le','\u2266':'lE','\u21C6':'lrarr','\u27E6':'lobrk','\u2961':'LeftDownTeeVector','\u2959':'LeftDownVectorBar','\u230A':'lfloor','\u21BC':'lharu','\u21C7':'llarr','\u21CB':'lrhar','\u294E':'LeftRightVector','\u21A4':'mapstoleft','\u295A':'LeftTeeVector','\u22CB':'lthree','\u29CF':'LeftTriangleBar','\u22B2':'vltri','\u22B4':'ltrie','\u2951':'LeftUpDownVector','\u2960':'LeftUpTeeVector','\u2958':'LeftUpVectorBar','\u21BF':'uharl','\u2952':'LeftVectorBar','\u2A8B':'lEg','\u22DA':'leg','\u2A7D':'les','\u2AA8':'lescc','\u2A7F':'lesdot','\u2A81':'lesdoto','\u2A83':'lesdotor','\u22DA\uFE00':'lesg','\u2A93':'lesges','\u22D6':'ltdot','\u2276':'lg','\u2AA1':'LessLess','\u2272':'lsim','\u297C':'lfisht','\uD835\uDD0F':'Lfr','\uD835\uDD29':'lfr','\u2A91':'lgE','\u2962':'lHar','\u296A':'lharul','\u2584':'lhblk','\u0409':'LJcy','\u0459':'ljcy','\u226A':'ll','\u22D8':'Ll','\u296B':'llhard','\u25FA':'lltri','\u013F':'Lmidot','\u0140':'lmidot','\u23B0':'lmoust','\u2A89':'lnap','\u2A87':'lne','\u2268':'lnE','\u22E6':'lnsim','\u27EC':'loang','\u21FD':'loarr','\u27F5':'xlarr','\u27F7':'xharr','\u27FC':'xmap','\u27F6':'xrarr','\u21AC':'rarrlp','\u2985':'lopar','\uD835\uDD43':'Lopf','\uD835\uDD5D':'lopf','\u2A2D':'loplus','\u2A34':'lotimes','\u2217':'lowast','_':'lowbar','\u2199':'swarr','\u2198':'searr','\u25CA':'loz','(':'lpar','\u2993':'lparlt','\u296D':'lrhard','\u200E':'lrm','\u22BF':'lrtri','\u2039':'lsaquo','\uD835\uDCC1':'lscr','\u21B0':'lsh','\u2A8D':'lsime','\u2A8F':'lsimg','\u2018':'lsquo','\u201A':'sbquo','\u0141':'Lstrok','\u0142':'lstrok','\u2AA6':'ltcc','\u2A79':'ltcir','<':'lt','\u22C9':'ltimes','\u2976':'ltlarr','\u2A7B':'ltquest','\u25C3':'ltri','\u2996':'ltrPar','\u294A':'lurdshar','\u2966':'luruhar','\u2268\uFE00':'lvnE','\xAF':'macr','\u2642':'male','\u2720':'malt','\u2905':'Map','\u21A6':'map','\u21A5':'mapstoup','\u25AE':'marker','\u2A29':'mcomma','\u041C':'Mcy','\u043C':'mcy','\u2014':'mdash','\u223A':'mDDot','\u205F':'MediumSpace','\u2133':'Mscr','\uD835\uDD10':'Mfr','\uD835\uDD2A':'mfr','\u2127':'mho','\xB5':'micro','\u2AF0':'midcir','\u2223':'mid','\u2212':'minus','\u2A2A':'minusdu','\u2213':'mp','\u2ADB':'mlcp','\u22A7':'models','\uD835\uDD44':'Mopf','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\u039C':'Mu','\u03BC':'mu','\u22B8':'mumap','\u0143':'Nacute','\u0144':'nacute','\u2220\u20D2':'nang','\u2249':'nap','\u2A70\u0338':'napE','\u224B\u0338':'napid','\u0149':'napos','\u266E':'natur','\u2115':'Nopf','\xA0':'nbsp','\u224E\u0338':'nbump','\u224F\u0338':'nbumpe','\u2A43':'ncap','\u0147':'Ncaron','\u0148':'ncaron','\u0145':'Ncedil','\u0146':'ncedil','\u2247':'ncong','\u2A6D\u0338':'ncongdot','\u2A42':'ncup','\u041D':'Ncy','\u043D':'ncy','\u2013':'ndash','\u2924':'nearhk','\u2197':'nearr','\u21D7':'neArr','\u2260':'ne','\u2250\u0338':'nedot','\u200B':'ZeroWidthSpace','\u2262':'nequiv','\u2928':'toea','\u2242\u0338':'nesim','\n':'NewLine','\u2204':'nexist','\uD835\uDD11':'Nfr','\uD835\uDD2B':'nfr','\u2267\u0338':'ngE','\u2271':'nge','\u2A7E\u0338':'nges','\u22D9\u0338':'nGg','\u2275':'ngsim','\u226B\u20D2':'nGt','\u226F':'ngt','\u226B\u0338':'nGtv','\u21AE':'nharr','\u21CE':'nhArr','\u2AF2':'nhpar','\u220B':'ni','\u22FC':'nis','\u22FA':'nisd','\u040A':'NJcy','\u045A':'njcy','\u219A':'nlarr','\u21CD':'nlArr','\u2025':'nldr','\u2266\u0338':'nlE','\u2270':'nle','\u2A7D\u0338':'nles','\u226E':'nlt','\u22D8\u0338':'nLl','\u2274':'nlsim','\u226A\u20D2':'nLt','\u22EA':'nltri','\u22EC':'nltrie','\u226A\u0338':'nLtv','\u2224':'nmid','\u2060':'NoBreak','\uD835\uDD5F':'nopf','\u2AEC':'Not','\xAC':'not','\u226D':'NotCupCap','\u2226':'npar','\u2209':'notin','\u2279':'ntgl','\u22F5\u0338':'notindot','\u22F9\u0338':'notinE','\u22F7':'notinvb','\u22F6':'notinvc','\u29CF\u0338':'NotLeftTriangleBar','\u2278':'ntlg','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA1\u0338':'NotNestedLessLess','\u220C':'notni','\u22FE':'notnivb','\u22FD':'notnivc','\u2280':'npr','\u2AAF\u0338':'npre','\u22E0':'nprcue','\u29D0\u0338':'NotRightTriangleBar','\u22EB':'nrtri','\u22ED':'nrtrie','\u228F\u0338':'NotSquareSubset','\u22E2':'nsqsube','\u2290\u0338':'NotSquareSuperset','\u22E3':'nsqsupe','\u2282\u20D2':'vnsub','\u2288':'nsube','\u2281':'nsc','\u2AB0\u0338':'nsce','\u22E1':'nsccue','\u227F\u0338':'NotSucceedsTilde','\u2283\u20D2':'vnsup','\u2289':'nsupe','\u2241':'nsim','\u2244':'nsime','\u2AFD\u20E5':'nparsl','\u2202\u0338':'npart','\u2A14':'npolint','\u2933\u0338':'nrarrc','\u219B':'nrarr','\u21CF':'nrArr','\u219D\u0338':'nrarrw','\uD835\uDCA9':'Nscr','\uD835\uDCC3':'nscr','\u2284':'nsub','\u2AC5\u0338':'nsubE','\u2285':'nsup','\u2AC6\u0338':'nsupE','\xD1':'Ntilde','\xF1':'ntilde','\u039D':'Nu','\u03BD':'nu','#':'num','\u2116':'numero','\u2007':'numsp','\u224D\u20D2':'nvap','\u22AC':'nvdash','\u22AD':'nvDash','\u22AE':'nVdash','\u22AF':'nVDash','\u2265\u20D2':'nvge','>\u20D2':'nvgt','\u2904':'nvHarr','\u29DE':'nvinfin','\u2902':'nvlArr','\u2264\u20D2':'nvle','<\u20D2':'nvlt','\u22B4\u20D2':'nvltrie','\u2903':'nvrArr','\u22B5\u20D2':'nvrtrie','\u223C\u20D2':'nvsim','\u2923':'nwarhk','\u2196':'nwarr','\u21D6':'nwArr','\u2927':'nwnear','\xD3':'Oacute','\xF3':'oacute','\xD4':'Ocirc','\xF4':'ocirc','\u041E':'Ocy','\u043E':'ocy','\u0150':'Odblac','\u0151':'odblac','\u2A38':'odiv','\u29BC':'odsold','\u0152':'OElig','\u0153':'oelig','\u29BF':'ofcir','\uD835\uDD12':'Ofr','\uD835\uDD2C':'ofr','\u02DB':'ogon','\xD2':'Ograve','\xF2':'ograve','\u29C1':'ogt','\u29B5':'ohbar','\u03A9':'ohm','\u29BE':'olcir','\u29BB':'olcross','\u203E':'oline','\u29C0':'olt','\u014C':'Omacr','\u014D':'omacr','\u03C9':'omega','\u039F':'Omicron','\u03BF':'omicron','\u29B6':'omid','\uD835\uDD46':'Oopf','\uD835\uDD60':'oopf','\u29B7':'opar','\u29B9':'operp','\u2A54':'Or','\u2228':'or','\u2A5D':'ord','\u2134':'oscr','\xAA':'ordf','\xBA':'ordm','\u22B6':'origof','\u2A56':'oror','\u2A57':'orslope','\u2A5B':'orv','\uD835\uDCAA':'Oscr','\xD8':'Oslash','\xF8':'oslash','\u2298':'osol','\xD5':'Otilde','\xF5':'otilde','\u2A36':'otimesas','\u2A37':'Otimes','\xD6':'Ouml','\xF6':'ouml','\u233D':'ovbar','\u23DE':'OverBrace','\u23B4':'tbrk','\u23DC':'OverParenthesis','\xB6':'para','\u2AF3':'parsim','\u2AFD':'parsl','\u2202':'part','\u041F':'Pcy','\u043F':'pcy','%':'percnt','.':'period','\u2030':'permil','\u2031':'pertenk','\uD835\uDD13':'Pfr','\uD835\uDD2D':'pfr','\u03A6':'Phi','\u03C6':'phi','\u03D5':'phiv','\u260E':'phone','\u03A0':'Pi','\u03C0':'pi','\u03D6':'piv','\u210E':'planckh','\u2A23':'plusacir','\u2A22':'pluscir','+':'plus','\u2A25':'plusdu','\u2A72':'pluse','\xB1':'pm','\u2A26':'plussim','\u2A27':'plustwo','\u2A15':'pointint','\uD835\uDD61':'popf','\u2119':'Popf','\xA3':'pound','\u2AB7':'prap','\u2ABB':'Pr','\u227A':'pr','\u227C':'prcue','\u2AAF':'pre','\u227E':'prsim','\u2AB9':'prnap','\u2AB5':'prnE','\u22E8':'prnsim','\u2AB3':'prE','\u2032':'prime','\u2033':'Prime','\u220F':'prod','\u232E':'profalar','\u2312':'profline','\u2313':'profsurf','\u221D':'prop','\u22B0':'prurel','\uD835\uDCAB':'Pscr','\uD835\uDCC5':'pscr','\u03A8':'Psi','\u03C8':'psi','\u2008':'puncsp','\uD835\uDD14':'Qfr','\uD835\uDD2E':'qfr','\uD835\uDD62':'qopf','\u211A':'Qopf','\u2057':'qprime','\uD835\uDCAC':'Qscr','\uD835\uDCC6':'qscr','\u2A16':'quatint','?':'quest','"':'quot','\u21DB':'rAarr','\u223D\u0331':'race','\u0154':'Racute','\u0155':'racute','\u221A':'Sqrt','\u29B3':'raemptyv','\u27E9':'rang','\u27EB':'Rang','\u2992':'rangd','\u29A5':'range','\xBB':'raquo','\u2975':'rarrap','\u21E5':'rarrb','\u2920':'rarrbfs','\u2933':'rarrc','\u2192':'rarr','\u21A0':'Rarr','\u291E':'rarrfs','\u2945':'rarrpl','\u2974':'rarrsim','\u2916':'Rarrtl','\u21A3':'rarrtl','\u219D':'rarrw','\u291A':'ratail','\u291C':'rAtail','\u2236':'ratio','\u2773':'rbbrk','}':'rcub',']':'rsqb','\u298C':'rbrke','\u298E':'rbrksld','\u2990':'rbrkslu','\u0158':'Rcaron','\u0159':'rcaron','\u0156':'Rcedil','\u0157':'rcedil','\u2309':'rceil','\u0420':'Rcy','\u0440':'rcy','\u2937':'rdca','\u2969':'rdldhar','\u21B3':'rdsh','\u211C':'Re','\u211B':'Rscr','\u211D':'Ropf','\u25AD':'rect','\u297D':'rfisht','\u230B':'rfloor','\uD835\uDD2F':'rfr','\u2964':'rHar','\u21C0':'rharu','\u296C':'rharul','\u03A1':'Rho','\u03C1':'rho','\u03F1':'rhov','\u21C4':'rlarr','\u27E7':'robrk','\u295D':'RightDownTeeVector','\u2955':'RightDownVectorBar','\u21C9':'rrarr','\u22A2':'vdash','\u295B':'RightTeeVector','\u22CC':'rthree','\u29D0':'RightTriangleBar','\u22B3':'vrtri','\u22B5':'rtrie','\u294F':'RightUpDownVector','\u295C':'RightUpTeeVector','\u2954':'RightUpVectorBar','\u21BE':'uharr','\u2953':'RightVectorBar','\u02DA':'ring','\u200F':'rlm','\u23B1':'rmoust','\u2AEE':'rnmid','\u27ED':'roang','\u21FE':'roarr','\u2986':'ropar','\uD835\uDD63':'ropf','\u2A2E':'roplus','\u2A35':'rotimes','\u2970':'RoundImplies',')':'rpar','\u2994':'rpargt','\u2A12':'rppolint','\u203A':'rsaquo','\uD835\uDCC7':'rscr','\u21B1':'rsh','\u22CA':'rtimes','\u25B9':'rtri','\u29CE':'rtriltri','\u29F4':'RuleDelayed','\u2968':'ruluhar','\u211E':'rx','\u015A':'Sacute','\u015B':'sacute','\u2AB8':'scap','\u0160':'Scaron','\u0161':'scaron','\u2ABC':'Sc','\u227B':'sc','\u227D':'sccue','\u2AB0':'sce','\u2AB4':'scE','\u015E':'Scedil','\u015F':'scedil','\u015C':'Scirc','\u015D':'scirc','\u2ABA':'scnap','\u2AB6':'scnE','\u22E9':'scnsim','\u2A13':'scpolint','\u227F':'scsim','\u0421':'Scy','\u0441':'scy','\u22C5':'sdot','\u2A66':'sdote','\u21D8':'seArr','\xA7':'sect',';':'semi','\u2929':'tosa','\u2736':'sext','\uD835\uDD16':'Sfr','\uD835\uDD30':'sfr','\u266F':'sharp','\u0429':'SHCHcy','\u0449':'shchcy','\u0428':'SHcy','\u0448':'shcy','\u2191':'uarr','\xAD':'shy','\u03A3':'Sigma','\u03C3':'sigma','\u03C2':'sigmaf','\u223C':'sim','\u2A6A':'simdot','\u2243':'sime','\u2A9E':'simg','\u2AA0':'simgE','\u2A9D':'siml','\u2A9F':'simlE','\u2246':'simne','\u2A24':'simplus','\u2972':'simrarr','\u2A33':'smashp','\u29E4':'smeparsl','\u2323':'smile','\u2AAA':'smt','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u042C':'SOFTcy','\u044C':'softcy','\u233F':'solbar','\u29C4':'solb','/':'sol','\uD835\uDD4A':'Sopf','\uD835\uDD64':'sopf','\u2660':'spades','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u228F':'sqsub','\u2291':'sqsube','\u2290':'sqsup','\u2292':'sqsupe','\u25A1':'squ','\uD835\uDCAE':'Sscr','\uD835\uDCC8':'sscr','\u22C6':'Star','\u2606':'star','\u2282':'sub','\u22D0':'Sub','\u2ABD':'subdot','\u2AC5':'subE','\u2286':'sube','\u2AC3':'subedot','\u2AC1':'submult','\u2ACB':'subnE','\u228A':'subne','\u2ABF':'subplus','\u2979':'subrarr','\u2AC7':'subsim','\u2AD5':'subsub','\u2AD3':'subsup','\u2211':'sum','\u266A':'sung','\xB9':'sup1','\xB2':'sup2','\xB3':'sup3','\u2283':'sup','\u22D1':'Sup','\u2ABE':'supdot','\u2AD8':'supdsub','\u2AC6':'supE','\u2287':'supe','\u2AC4':'supedot','\u27C9':'suphsol','\u2AD7':'suphsub','\u297B':'suplarr','\u2AC2':'supmult','\u2ACC':'supnE','\u228B':'supne','\u2AC0':'supplus','\u2AC8':'supsim','\u2AD4':'supsub','\u2AD6':'supsup','\u21D9':'swArr','\u292A':'swnwar','\xDF':'szlig','\t':'Tab','\u2316':'target','\u03A4':'Tau','\u03C4':'tau','\u0164':'Tcaron','\u0165':'tcaron','\u0162':'Tcedil','\u0163':'tcedil','\u0422':'Tcy','\u0442':'tcy','\u20DB':'tdot','\u2315':'telrec','\uD835\uDD17':'Tfr','\uD835\uDD31':'tfr','\u2234':'there4','\u0398':'Theta','\u03B8':'theta','\u03D1':'thetav','\u205F\u200A':'ThickSpace','\u2009':'thinsp','\xDE':'THORN','\xFE':'thorn','\u2A31':'timesbar','\xD7':'times','\u2A30':'timesd','\u2336':'topbot','\u2AF1':'topcir','\uD835\uDD4B':'Topf','\uD835\uDD65':'topf','\u2ADA':'topfork','\u2034':'tprime','\u2122':'trade','\u25B5':'utri','\u225C':'trie','\u25EC':'tridot','\u2A3A':'triminus','\u2A39':'triplus','\u29CD':'trisb','\u2A3B':'tritime','\u23E2':'trpezium','\uD835\uDCAF':'Tscr','\uD835\uDCC9':'tscr','\u0426':'TScy','\u0446':'tscy','\u040B':'TSHcy','\u045B':'tshcy','\u0166':'Tstrok','\u0167':'tstrok','\xDA':'Uacute','\xFA':'uacute','\u219F':'Uarr','\u2949':'Uarrocir','\u040E':'Ubrcy','\u045E':'ubrcy','\u016C':'Ubreve','\u016D':'ubreve','\xDB':'Ucirc','\xFB':'ucirc','\u0423':'Ucy','\u0443':'ucy','\u21C5':'udarr','\u0170':'Udblac','\u0171':'udblac','\u296E':'udhar','\u297E':'ufisht','\uD835\uDD18':'Ufr','\uD835\uDD32':'ufr','\xD9':'Ugrave','\xF9':'ugrave','\u2963':'uHar','\u2580':'uhblk','\u231C':'ulcorn','\u230F':'ulcrop','\u25F8':'ultri','\u016A':'Umacr','\u016B':'umacr','\u23DF':'UnderBrace','\u23DD':'UnderParenthesis','\u228E':'uplus','\u0172':'Uogon','\u0173':'uogon','\uD835\uDD4C':'Uopf','\uD835\uDD66':'uopf','\u2912':'UpArrowBar','\u2195':'varr','\u03C5':'upsi','\u03D2':'Upsi','\u03A5':'Upsilon','\u21C8':'uuarr','\u231D':'urcorn','\u230E':'urcrop','\u016E':'Uring','\u016F':'uring','\u25F9':'urtri','\uD835\uDCB0':'Uscr','\uD835\uDCCA':'uscr','\u22F0':'utdot','\u0168':'Utilde','\u0169':'utilde','\xDC':'Uuml','\xFC':'uuml','\u29A7':'uwangle','\u299C':'vangrt','\u228A\uFE00':'vsubne','\u2ACB\uFE00':'vsubnE','\u228B\uFE00':'vsupne','\u2ACC\uFE00':'vsupnE','\u2AE8':'vBar','\u2AEB':'Vbar','\u2AE9':'vBarv','\u0412':'Vcy','\u0432':'vcy','\u22A9':'Vdash','\u22AB':'VDash','\u2AE6':'Vdashl','\u22BB':'veebar','\u225A':'veeeq','\u22EE':'vellip','|':'vert','\u2016':'Vert','\u2758':'VerticalSeparator','\u2240':'wr','\uD835\uDD19':'Vfr','\uD835\uDD33':'vfr','\uD835\uDD4D':'Vopf','\uD835\uDD67':'vopf','\uD835\uDCB1':'Vscr','\uD835\uDCCB':'vscr','\u22AA':'Vvdash','\u299A':'vzigzag','\u0174':'Wcirc','\u0175':'wcirc','\u2A5F':'wedbar','\u2259':'wedgeq','\u2118':'wp','\uD835\uDD1A':'Wfr','\uD835\uDD34':'wfr','\uD835\uDD4E':'Wopf','\uD835\uDD68':'wopf','\uD835\uDCB2':'Wscr','\uD835\uDCCC':'wscr','\uD835\uDD1B':'Xfr','\uD835\uDD35':'xfr','\u039E':'Xi','\u03BE':'xi','\u22FB':'xnis','\uD835\uDD4F':'Xopf','\uD835\uDD69':'xopf','\uD835\uDCB3':'Xscr','\uD835\uDCCD':'xscr','\xDD':'Yacute','\xFD':'yacute','\u042F':'YAcy','\u044F':'yacy','\u0176':'Ycirc','\u0177':'ycirc','\u042B':'Ycy','\u044B':'ycy','\xA5':'yen','\uD835\uDD1C':'Yfr','\uD835\uDD36':'yfr','\u0407':'YIcy','\u0457':'yicy','\uD835\uDD50':'Yopf','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDCCE':'yscr','\u042E':'YUcy','\u044E':'yucy','\xFF':'yuml','\u0178':'Yuml','\u0179':'Zacute','\u017A':'zacute','\u017D':'Zcaron','\u017E':'zcaron','\u0417':'Zcy','\u0437':'zcy','\u017B':'Zdot','\u017C':'zdot','\u2128':'Zfr','\u0396':'Zeta','\u03B6':'zeta','\uD835\uDD37':'zfr','\u0416':'ZHcy','\u0436':'zhcy','\u21DD':'zigrarr','\uD835\uDD6B':'zopf','\uD835\uDCB5':'Zscr','\uD835\uDCCF':'zscr','\u200D':'zwj','\u200C':'zwnj'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|iacute|Uacute|plusmn|otilde|Otilde|Agrave|agrave|yacute|Yacute|oslash|Oslash|Atilde|atilde|brvbar|Ccedil|ccedil|ograve|curren|divide|Eacute|eacute|Ograve|oacute|Egrave|egrave|ugrave|frac12|frac14|frac34|Ugrave|Oacute|Iacute|ntilde|Ntilde|uacute|middot|Igrave|igrave|iquest|aacute|laquo|THORN|micro|iexcl|icirc|Icirc|Acirc|ucirc|ecirc|Ocirc|ocirc|Ecirc|Ucirc|aring|Aring|aelig|AElig|acute|pound|raquo|acirc|times|thorn|szlig|cedil|COPY|Auml|ordf|ordm|uuml|macr|Uuml|auml|Ouml|ouml|para|nbsp|Euml|quot|QUOT|euml|yuml|cent|sect|copy|sup1|sup2|sup3|Iuml|iuml|shy|eth|reg|not|yen|amp|AMP|REG|uml|ETH|deg|gt|GT|LT|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {'Aacute':'\xC1','aacute':'\xE1','Abreve':'\u0102','abreve':'\u0103','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','Acirc':'\xC2','acirc':'\xE2','acute':'\xB4','Acy':'\u0410','acy':'\u0430','AElig':'\xC6','aelig':'\xE6','af':'\u2061','Afr':'\uD835\uDD04','afr':'\uD835\uDD1E','Agrave':'\xC0','agrave':'\xE0','alefsym':'\u2135','aleph':'\u2135','Alpha':'\u0391','alpha':'\u03B1','Amacr':'\u0100','amacr':'\u0101','amalg':'\u2A3F','amp':'&','AMP':'&','andand':'\u2A55','And':'\u2A53','and':'\u2227','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angmsd':'\u2221','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','Aogon':'\u0104','aogon':'\u0105','Aopf':'\uD835\uDD38','aopf':'\uD835\uDD52','apacir':'\u2A6F','ap':'\u2248','apE':'\u2A70','ape':'\u224A','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','Aring':'\xC5','aring':'\xE5','Ascr':'\uD835\uDC9C','ascr':'\uD835\uDCB6','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','Atilde':'\xC3','atilde':'\xE3','Auml':'\xC4','auml':'\xE4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','Bcy':'\u0411','bcy':'\u0431','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','Beta':'\u0392','beta':'\u03B2','beth':'\u2136','between':'\u226C','Bfr':'\uD835\uDD05','bfr':'\uD835\uDD1F','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bNot':'\u2AED','bnot':'\u2310','Bopf':'\uD835\uDD39','bopf':'\uD835\uDD53','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxHd':'\u2564','boxhD':'\u2565','boxHD':'\u2566','boxhu':'\u2534','boxHu':'\u2567','boxhU':'\u2568','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsolb':'\u29C5','bsol':'\\','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpE':'\u2AAE','bumpe':'\u224F','Bumpeq':'\u224E','bumpeq':'\u224F','Cacute':'\u0106','cacute':'\u0107','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','cap':'\u2229','Cap':'\u22D2','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','Ccaron':'\u010C','ccaron':'\u010D','Ccedil':'\xC7','ccedil':'\xE7','Ccirc':'\u0108','ccirc':'\u0109','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','Cdot':'\u010A','cdot':'\u010B','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','CHcy':'\u0427','chcy':'\u0447','check':'\u2713','checkmark':'\u2713','Chi':'\u03A7','chi':'\u03C7','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cir':'\u25CB','cirE':'\u29C3','cire':'\u2257','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','Colone':'\u2A74','colone':'\u2254','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','Cscr':'\uD835\uDC9E','cscr':'\uD835\uDCB8','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cup':'\u222A','Cup':'\u22D3','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','Darr':'\u21A1','dArr':'\u21D3','dash':'\u2010','Dashv':'\u2AE4','dashv':'\u22A3','dbkarow':'\u290F','dblac':'\u02DD','Dcaron':'\u010E','dcaron':'\u010F','Dcy':'\u0414','dcy':'\u0434','ddagger':'\u2021','ddarr':'\u21CA','DD':'\u2145','dd':'\u2146','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','Delta':'\u0394','delta':'\u03B4','demptyv':'\u29B1','dfisht':'\u297F','Dfr':'\uD835\uDD07','dfr':'\uD835\uDD21','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','DJcy':'\u0402','djcy':'\u0452','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','Dopf':'\uD835\uDD3B','dopf':'\uD835\uDD55','Dot':'\xA8','dot':'\u02D9','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','DownArrowBar':'\u2913','downarrow':'\u2193','DownArrow':'\u2193','Downarrow':'\u21D3','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVectorBar':'\u2956','DownLeftVector':'\u21BD','DownRightTeeVector':'\u295F','DownRightVectorBar':'\u2957','DownRightVector':'\u21C1','DownTeeArrow':'\u21A7','DownTee':'\u22A4','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','Dscr':'\uD835\uDC9F','dscr':'\uD835\uDCB9','DScy':'\u0405','dscy':'\u0455','dsol':'\u29F6','Dstrok':'\u0110','dstrok':'\u0111','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','DZcy':'\u040F','dzcy':'\u045F','dzigrarr':'\u27FF','Eacute':'\xC9','eacute':'\xE9','easter':'\u2A6E','Ecaron':'\u011A','ecaron':'\u011B','Ecirc':'\xCA','ecirc':'\xEA','ecir':'\u2256','ecolon':'\u2255','Ecy':'\u042D','ecy':'\u044D','eDDot':'\u2A77','Edot':'\u0116','edot':'\u0117','eDot':'\u2251','ee':'\u2147','efDot':'\u2252','Efr':'\uD835\uDD08','efr':'\uD835\uDD22','eg':'\u2A9A','Egrave':'\xC8','egrave':'\xE8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','Emacr':'\u0112','emacr':'\u0113','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp13':'\u2004','emsp14':'\u2005','emsp':'\u2003','ENG':'\u014A','eng':'\u014B','ensp':'\u2002','Eogon':'\u0118','eogon':'\u0119','Eopf':'\uD835\uDD3C','eopf':'\uD835\uDD56','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','Epsilon':'\u0395','epsilon':'\u03B5','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','Esim':'\u2A73','esim':'\u2242','Eta':'\u0397','eta':'\u03B7','ETH':'\xD0','eth':'\xF0','Euml':'\xCB','euml':'\xEB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','Fcy':'\u0424','fcy':'\u0444','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','Ffr':'\uD835\uDD09','ffr':'\uD835\uDD23','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','Fopf':'\uD835\uDD3D','fopf':'\uD835\uDD57','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','Gamma':'\u0393','gamma':'\u03B3','Gammad':'\u03DC','gammad':'\u03DD','gap':'\u2A86','Gbreve':'\u011E','gbreve':'\u011F','Gcedil':'\u0122','Gcirc':'\u011C','gcirc':'\u011D','Gcy':'\u0413','gcy':'\u0433','Gdot':'\u0120','gdot':'\u0121','ge':'\u2265','gE':'\u2267','gEl':'\u2A8C','gel':'\u22DB','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','gescc':'\u2AA9','ges':'\u2A7E','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','Gfr':'\uD835\uDD0A','gfr':'\uD835\uDD24','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','GJcy':'\u0403','gjcy':'\u0453','gla':'\u2AA5','gl':'\u2277','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','Gopf':'\uD835\uDD3E','gopf':'\uD835\uDD58','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','Gscr':'\uD835\uDCA2','gscr':'\u210A','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gtcc':'\u2AA7','gtcir':'\u2A7A','gt':'>','GT':'>','Gt':'\u226B','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','HARDcy':'\u042A','hardcy':'\u044A','harrcir':'\u2948','harr':'\u2194','hArr':'\u21D4','harrw':'\u21AD','Hat':'^','hbar':'\u210F','Hcirc':'\u0124','hcirc':'\u0125','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','Hstrok':'\u0126','hstrok':'\u0127','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','Iacute':'\xCD','iacute':'\xED','ic':'\u2063','Icirc':'\xCE','icirc':'\xEE','Icy':'\u0418','icy':'\u0438','Idot':'\u0130','IEcy':'\u0415','iecy':'\u0435','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','Igrave':'\xCC','igrave':'\xEC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','IJlig':'\u0132','ijlig':'\u0133','Imacr':'\u012A','imacr':'\u012B','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','Im':'\u2111','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','incare':'\u2105','in':'\u2208','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','intcal':'\u22BA','int':'\u222B','Int':'\u222C','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','IOcy':'\u0401','iocy':'\u0451','Iogon':'\u012E','iogon':'\u012F','Iopf':'\uD835\uDD40','iopf':'\uD835\uDD5A','Iota':'\u0399','iota':'\u03B9','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','Itilde':'\u0128','itilde':'\u0129','Iukcy':'\u0406','iukcy':'\u0456','Iuml':'\xCF','iuml':'\xEF','Jcirc':'\u0134','jcirc':'\u0135','Jcy':'\u0419','jcy':'\u0439','Jfr':'\uD835\uDD0D','jfr':'\uD835\uDD27','jmath':'\u0237','Jopf':'\uD835\uDD41','jopf':'\uD835\uDD5B','Jscr':'\uD835\uDCA5','jscr':'\uD835\uDCBF','Jsercy':'\u0408','jsercy':'\u0458','Jukcy':'\u0404','jukcy':'\u0454','Kappa':'\u039A','kappa':'\u03BA','kappav':'\u03F0','Kcedil':'\u0136','kcedil':'\u0137','Kcy':'\u041A','kcy':'\u043A','Kfr':'\uD835\uDD0E','kfr':'\uD835\uDD28','kgreen':'\u0138','KHcy':'\u0425','khcy':'\u0445','KJcy':'\u040C','kjcy':'\u045C','Kopf':'\uD835\uDD42','kopf':'\uD835\uDD5C','Kscr':'\uD835\uDCA6','kscr':'\uD835\uDCC0','lAarr':'\u21DA','Lacute':'\u0139','lacute':'\u013A','laemptyv':'\u29B4','lagran':'\u2112','Lambda':'\u039B','lambda':'\u03BB','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larrb':'\u21E4','larrbfs':'\u291F','larr':'\u2190','Larr':'\u219E','lArr':'\u21D0','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','latail':'\u2919','lAtail':'\u291B','lat':'\u2AAB','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','Lcaron':'\u013D','lcaron':'\u013E','Lcedil':'\u013B','lcedil':'\u013C','lceil':'\u2308','lcub':'{','Lcy':'\u041B','lcy':'\u043B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','LeftArrowBar':'\u21E4','leftarrow':'\u2190','LeftArrow':'\u2190','Leftarrow':'\u21D0','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVectorBar':'\u2959','LeftDownVector':'\u21C3','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','LeftRightArrow':'\u2194','Leftrightarrow':'\u21D4','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTeeArrow':'\u21A4','LeftTee':'\u22A3','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangleBar':'\u29CF','LeftTriangle':'\u22B2','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVectorBar':'\u2958','LeftUpVector':'\u21BF','LeftVectorBar':'\u2952','LeftVector':'\u21BC','lEg':'\u2A8B','leg':'\u22DA','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','lescc':'\u2AA8','les':'\u2A7D','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','Lfr':'\uD835\uDD0F','lfr':'\uD835\uDD29','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','LJcy':'\u0409','ljcy':'\u0459','llarr':'\u21C7','ll':'\u226A','Ll':'\u22D8','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','Lmidot':'\u013F','lmidot':'\u0140','lmoustache':'\u23B0','lmoust':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','LongLeftArrow':'\u27F5','Longleftarrow':'\u27F8','longleftrightarrow':'\u27F7','LongLeftRightArrow':'\u27F7','Longleftrightarrow':'\u27FA','longmapsto':'\u27FC','longrightarrow':'\u27F6','LongRightArrow':'\u27F6','Longrightarrow':'\u27F9','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','Lopf':'\uD835\uDD43','lopf':'\uD835\uDD5D','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','Lstrok':'\u0141','lstrok':'\u0142','ltcc':'\u2AA6','ltcir':'\u2A79','lt':'<','LT':'<','Lt':'\u226A','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','Map':'\u2905','map':'\u21A6','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','Mcy':'\u041C','mcy':'\u043C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','Mfr':'\uD835\uDD10','mfr':'\uD835\uDD2A','mho':'\u2127','micro':'\xB5','midast':'*','midcir':'\u2AF0','mid':'\u2223','middot':'\xB7','minusb':'\u229F','minus':'\u2212','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','Mopf':'\uD835\uDD44','mopf':'\uD835\uDD5E','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','Mu':'\u039C','mu':'\u03BC','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','Nacute':'\u0143','nacute':'\u0144','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natural':'\u266E','naturals':'\u2115','natur':'\u266E','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','Ncaron':'\u0147','ncaron':'\u0148','Ncedil':'\u0145','ncedil':'\u0146','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','Ncy':'\u041D','ncy':'\u043D','ndash':'\u2013','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','ne':'\u2260','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','Nfr':'\uD835\uDD11','nfr':'\uD835\uDD2B','ngE':'\u2267\u0338','nge':'\u2271','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','nGt':'\u226B\u20D2','ngt':'\u226F','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','NJcy':'\u040A','njcy':'\u045A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nlE':'\u2266\u0338','nle':'\u2270','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nLt':'\u226A\u20D2','nlt':'\u226E','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','Not':'\u2AEC','not':'\xAC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangle':'\u22EA','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangle':'\u22EB','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','nparallel':'\u2226','npar':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','nprec':'\u2280','npreceq':'\u2AAF\u0338','npre':'\u2AAF\u0338','nrarrc':'\u2933\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','Nscr':'\uD835\uDCA9','nscr':'\uD835\uDCC3','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsubE':'\u2AC5\u0338','nsube':'\u2288','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupE':'\u2AC6\u0338','nsupe':'\u2289','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','Ntilde':'\xD1','ntilde':'\xF1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','Nu':'\u039D','nu':'\u03BD','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','Oacute':'\xD3','oacute':'\xF3','oast':'\u229B','Ocirc':'\xD4','ocirc':'\xF4','ocir':'\u229A','Ocy':'\u041E','ocy':'\u043E','odash':'\u229D','Odblac':'\u0150','odblac':'\u0151','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','OElig':'\u0152','oelig':'\u0153','ofcir':'\u29BF','Ofr':'\uD835\uDD12','ofr':'\uD835\uDD2C','ogon':'\u02DB','Ograve':'\xD2','ograve':'\xF2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','Omacr':'\u014C','omacr':'\u014D','Omega':'\u03A9','omega':'\u03C9','Omicron':'\u039F','omicron':'\u03BF','omid':'\u29B6','ominus':'\u2296','Oopf':'\uD835\uDD46','oopf':'\uD835\uDD60','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','orarr':'\u21BB','Or':'\u2A54','or':'\u2228','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','Oscr':'\uD835\uDCAA','oscr':'\u2134','Oslash':'\xD8','oslash':'\xF8','osol':'\u2298','Otilde':'\xD5','otilde':'\xF5','otimesas':'\u2A36','Otimes':'\u2A37','otimes':'\u2297','Ouml':'\xD6','ouml':'\xF6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','para':'\xB6','parallel':'\u2225','par':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','Pcy':'\u041F','pcy':'\u043F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','Pfr':'\uD835\uDD13','pfr':'\uD835\uDD2D','Phi':'\u03A6','phi':'\u03C6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','Pi':'\u03A0','pi':'\u03C0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plus':'+','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','prap':'\u2AB7','Pr':'\u2ABB','pr':'\u227A','prcue':'\u227C','precapprox':'\u2AB7','prec':'\u227A','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','pre':'\u2AAF','prE':'\u2AB3','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportional':'\u221D','Proportion':'\u2237','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','Pscr':'\uD835\uDCAB','pscr':'\uD835\uDCC5','Psi':'\u03A8','psi':'\u03C8','puncsp':'\u2008','Qfr':'\uD835\uDD14','qfr':'\uD835\uDD2E','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','Qscr':'\uD835\uDCAC','qscr':'\uD835\uDCC6','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','Racute':'\u0154','racute':'\u0155','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarr':'\u2192','Rarr':'\u21A0','rArr':'\u21D2','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','Rarrtl':'\u2916','rarrtl':'\u21A3','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','Rcaron':'\u0158','rcaron':'\u0159','Rcedil':'\u0156','rcedil':'\u0157','rceil':'\u2309','rcub':'}','Rcy':'\u0420','rcy':'\u0440','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','Re':'\u211C','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','Rho':'\u03A1','rho':'\u03C1','rhov':'\u03F1','RightAngleBracket':'\u27E9','RightArrowBar':'\u21E5','rightarrow':'\u2192','RightArrow':'\u2192','Rightarrow':'\u21D2','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVectorBar':'\u2955','RightDownVector':'\u21C2','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTeeArrow':'\u21A6','RightTee':'\u22A2','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangleBar':'\u29D0','RightTriangle':'\u22B3','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVectorBar':'\u2954','RightUpVector':'\u21BE','RightVectorBar':'\u2953','RightVector':'\u21C0','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoustache':'\u23B1','rmoust':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','Sacute':'\u015A','sacute':'\u015B','sbquo':'\u201A','scap':'\u2AB8','Scaron':'\u0160','scaron':'\u0161','Sc':'\u2ABC','sc':'\u227B','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','Scedil':'\u015E','scedil':'\u015F','Scirc':'\u015C','scirc':'\u015D','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','Scy':'\u0421','scy':'\u0441','sdotb':'\u22A1','sdot':'\u22C5','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','Sfr':'\uD835\uDD16','sfr':'\uD835\uDD30','sfrown':'\u2322','sharp':'\u266F','SHCHcy':'\u0429','shchcy':'\u0449','SHcy':'\u0428','shcy':'\u0448','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','Sigma':'\u03A3','sigma':'\u03C3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','SOFTcy':'\u042C','softcy':'\u044C','solbar':'\u233F','solb':'\u29C4','sol':'/','Sopf':'\uD835\uDD4A','sopf':'\uD835\uDD64','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squ':'\u25A1','squf':'\u25AA','srarr':'\u2192','Sscr':'\uD835\uDCAE','sscr':'\uD835\uDCC8','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','Star':'\u22C6','star':'\u2606','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','subE':'\u2AC5','sube':'\u2286','subedot':'\u2AC3','submult':'\u2AC1','subnE':'\u2ACB','subne':'\u228A','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succapprox':'\u2AB8','succ':'\u227B','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','sup':'\u2283','Sup':'\u22D1','supdot':'\u2ABE','supdsub':'\u2AD8','supE':'\u2AC6','supe':'\u2287','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supnE':'\u2ACC','supne':'\u228B','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','Tau':'\u03A4','tau':'\u03C4','tbrk':'\u23B4','Tcaron':'\u0164','tcaron':'\u0165','Tcedil':'\u0162','tcedil':'\u0163','Tcy':'\u0422','tcy':'\u0442','tdot':'\u20DB','telrec':'\u2315','Tfr':'\uD835\uDD17','tfr':'\uD835\uDD31','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','Theta':'\u0398','theta':'\u03B8','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','ThinSpace':'\u2009','thinsp':'\u2009','thkap':'\u2248','thksim':'\u223C','THORN':'\xDE','thorn':'\xFE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','timesbar':'\u2A31','timesb':'\u22A0','times':'\xD7','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','topbot':'\u2336','topcir':'\u2AF1','top':'\u22A4','Topf':'\uD835\uDD4B','topf':'\uD835\uDD65','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','Tscr':'\uD835\uDCAF','tscr':'\uD835\uDCC9','TScy':'\u0426','tscy':'\u0446','TSHcy':'\u040B','tshcy':'\u045B','Tstrok':'\u0166','tstrok':'\u0167','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','Uacute':'\xDA','uacute':'\xFA','uarr':'\u2191','Uarr':'\u219F','uArr':'\u21D1','Uarrocir':'\u2949','Ubrcy':'\u040E','ubrcy':'\u045E','Ubreve':'\u016C','ubreve':'\u016D','Ucirc':'\xDB','ucirc':'\xFB','Ucy':'\u0423','ucy':'\u0443','udarr':'\u21C5','Udblac':'\u0170','udblac':'\u0171','udhar':'\u296E','ufisht':'\u297E','Ufr':'\uD835\uDD18','ufr':'\uD835\uDD32','Ugrave':'\xD9','ugrave':'\xF9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','Umacr':'\u016A','umacr':'\u016B','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','Uogon':'\u0172','uogon':'\u0173','Uopf':'\uD835\uDD4C','uopf':'\uD835\uDD66','UpArrowBar':'\u2912','uparrow':'\u2191','UpArrow':'\u2191','Uparrow':'\u21D1','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','UpDownArrow':'\u2195','Updownarrow':'\u21D5','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','Upsilon':'\u03A5','upsilon':'\u03C5','UpTeeArrow':'\u21A5','UpTee':'\u22A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','Uring':'\u016E','uring':'\u016F','urtri':'\u25F9','Uscr':'\uD835\uDCB0','uscr':'\uD835\uDCCA','utdot':'\u22F0','Utilde':'\u0168','utilde':'\u0169','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','Uuml':'\xDC','uuml':'\xFC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','Vcy':'\u0412','vcy':'\u0432','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','veebar':'\u22BB','vee':'\u2228','Vee':'\u22C1','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','Vfr':'\uD835\uDD19','vfr':'\uD835\uDD33','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','Vopf':'\uD835\uDD4D','vopf':'\uD835\uDD67','vprop':'\u221D','vrtri':'\u22B3','Vscr':'\uD835\uDCB1','vscr':'\uD835\uDCCB','vsubnE':'\u2ACB\uFE00','vsubne':'\u228A\uFE00','vsupnE':'\u2ACC\uFE00','vsupne':'\u228B\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','Wcirc':'\u0174','wcirc':'\u0175','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','Wfr':'\uD835\uDD1A','wfr':'\uD835\uDD34','Wopf':'\uD835\uDD4E','wopf':'\uD835\uDD68','wp':'\u2118','wr':'\u2240','wreath':'\u2240','Wscr':'\uD835\uDCB2','wscr':'\uD835\uDCCC','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','Xfr':'\uD835\uDD1B','xfr':'\uD835\uDD35','xharr':'\u27F7','xhArr':'\u27FA','Xi':'\u039E','xi':'\u03BE','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','Xopf':'\uD835\uDD4F','xopf':'\uD835\uDD69','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','Xscr':'\uD835\uDCB3','xscr':'\uD835\uDCCD','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','Yacute':'\xDD','yacute':'\xFD','YAcy':'\u042F','yacy':'\u044F','Ycirc':'\u0176','ycirc':'\u0177','Ycy':'\u042B','ycy':'\u044B','yen':'\xA5','Yfr':'\uD835\uDD1C','yfr':'\uD835\uDD36','YIcy':'\u0407','yicy':'\u0457','Yopf':'\uD835\uDD50','yopf':'\uD835\uDD6A','Yscr':'\uD835\uDCB4','yscr':'\uD835\uDCCE','YUcy':'\u042E','yucy':'\u044E','yuml':'\xFF','Yuml':'\u0178','Zacute':'\u0179','zacute':'\u017A','Zcaron':'\u017D','zcaron':'\u017E','Zcy':'\u0417','zcy':'\u0437','Zdot':'\u017B','zdot':'\u017C','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','Zeta':'\u0396','zeta':'\u03B6','zfr':'\uD835\uDD37','Zfr':'\u2128','ZHcy':'\u0416','zhcy':'\u0436','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','Zscr':'\uD835\uDCB5','zscr':'\uD835\uDCCF','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'Aacute':'\xC1','aacute':'\xE1','Acirc':'\xC2','acirc':'\xE2','acute':'\xB4','AElig':'\xC6','aelig':'\xE6','Agrave':'\xC0','agrave':'\xE0','amp':'&','AMP':'&','Aring':'\xC5','aring':'\xE5','Atilde':'\xC3','atilde':'\xE3','Auml':'\xC4','auml':'\xE4','brvbar':'\xA6','Ccedil':'\xC7','ccedil':'\xE7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','Eacute':'\xC9','eacute':'\xE9','Ecirc':'\xCA','ecirc':'\xEA','Egrave':'\xC8','egrave':'\xE8','ETH':'\xD0','eth':'\xF0','Euml':'\xCB','euml':'\xEB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','Iacute':'\xCD','iacute':'\xED','Icirc':'\xCE','icirc':'\xEE','iexcl':'\xA1','Igrave':'\xCC','igrave':'\xEC','iquest':'\xBF','Iuml':'\xCF','iuml':'\xEF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','Ntilde':'\xD1','ntilde':'\xF1','Oacute':'\xD3','oacute':'\xF3','Ocirc':'\xD4','ocirc':'\xF4','Ograve':'\xD2','ograve':'\xF2','ordf':'\xAA','ordm':'\xBA','Oslash':'\xD8','oslash':'\xF8','Otilde':'\xD5','otilde':'\xF5','Ouml':'\xD6','ouml':'\xF6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','THORN':'\xDE','thorn':'\xFE','times':'\xD7','Uacute':'\xDA','uacute':'\xFA','Ucirc':'\xDB','ucirc':'\xFB','Ugrave':'\xD9','ugrave':'\xF9','uml':'\xA8','Uuml':'\xDC','uuml':'\xFC','Yacute':'\xDD','yacute':'\xFD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see http://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(symbol) {
		return '&#x' + symbol.charCodeAt(0).toString(16).toUpperCase() + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return hexEscape(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, hexEscape);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return '&#x' + codePoint.toString(16).toUpperCase() + ';';
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, hexEscape);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`.
				codePoint = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`.
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// Ambiguous ampersand; see http://mths.be/notes/ambiguous-ampersands.
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			// If we’re still here, it’s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				// Note: there is no need to check `has(decodeMapLegacy, reference)`.
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '0.5.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return he;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],53:[function(require,module,exports){
var extend        = require(68);
var getNodeByPath = require(54);
var getNodePath   = require(55);

/**
 */

function FragmentSection(document, start, end) {
  this.document = document;

  this.start = start || document.createTextNode("");
  this.end   = end   || document.createTextNode("");

  if (!this.start.parentNode) {
    var parent = document.createDocumentFragment();
    parent.appendChild(this.start);
    parent.appendChild(this.end);
  }
}

/**
 */

extend(FragmentSection.prototype, {

  /**
   */

  appendChild: function(node) {
    this.end.parentNode.insertBefore(node, this.end);
  },

  /**
   */

  render: function() {
    return this.start.parentNode;
  },

  /**
   */

  remove: function() {
    var node     = this.document.createDocumentFragment();
    var start    = this.start;
    var current  = start.nextSibling;
    var end      = this.end;

    while (current !== end) {
      node.appendChild(current);
      current = start.nextSibling;
    }

    node.insertBefore(start, node.childNodes[0]);
    node.appendChild(end);

    return this;
  },

  /**
   */

  createMarker: function() {
    return new Marker(this.document, getNodePath(this.start), getNodePath(this.end));
  },

  /**
   */

  clone: function() {
    var parentClone;

    // fragment?
    if (this.start.parentNode.nodeType === 11) {
      parentClone = this.start.parentNode.cloneNode(true);
    } else {
      parentClone  = this.document.createDocumentFragment();
      var children = this._getChildNodes();
      var n        = children.length;

      for (var i = 0; i < n; i++) {
        parentClone.appendChild(children[i].cloneNode(true));
      }
    }

    var first = parentClone.childNodes[0];
    var last  = parentClone.childNodes[parentClone.childNodes.length - 1];

    return new FragmentSection(this.document, first, last);
  },

  /**
   */

  _getChildNodes: function() {
    var current = this.start;
    var end     = this.end.nextSibling;
    var children = [];
    while (current !== end) {
      children.push(current);
      current = current.nextSibling;
    }
    return children;
  }
});

/**
 */

function Marker(document, startPath, endPath) {
  this.document  = document;
  this.startPath = startPath;
  this.endPath   = endPath;
}

/**
 */

extend(Marker.prototype, {

  /**
   */

  createSection: function(root) {
    return new FragmentSection(this.document, getNodeByPath(root, this.startPath), getNodeByPath(root, this.endPath));
  }
});

module.exports = FragmentSection;

},{"54":54,"55":55,"68":68}],54:[function(require,module,exports){
arguments[4][37][0].apply(exports,arguments)
},{"37":37}],55:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"38":38}],56:[function(require,module,exports){
var extend        = require(68);
var getNodeByPath = require(54);
var getNodePath   = require(55);

/**
 */

function NodeSection(document, node) {
  this.document = document;
  this.node     = node;
}

/**
 */

extend(NodeSection.prototype, {

  /**
   */

  createMarker: function() {
    return new Marker(this.document, getNodePath(this.node));
  },

  /**
   */

  appendChild: function(childNode) {
    this.node.appendChild(childNode);
  },

  /**
   */

  render: function() {
    return this.node;
  },

  /**
   */

  remove: function() {
    if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
  },

  /**
   */

  clone: function() {
    return new NodeSection(this.document, this.node.cloneNode(true));
  }
});

/**
 */

function Marker(document, path) {
  this.document = document;
  this.path     = path;
}

/**
 */

extend(Marker.prototype, {

  /**
   */

  createSection: function(root) {
    return new NodeSection(this.document, this.findNode(root));
  },

  /**
   */

  findNode: function(root) {
    return getNodeByPath(root, this.path);
  }
});

module.exports = NodeSection;

},{"54":54,"55":55,"68":68}],57:[function(require,module,exports){
/**
 */

function Comment(nodeValue) {
  this.nodeValue = nodeValue || "";
}

/**
 */

Comment.prototype.nodeType = 8;

/**
 */

Comment.prototype.freeze = function(options) {
  return options.document.createComment(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Comment(nodeValue);
};

},{}],58:[function(require,module,exports){
var extend        = require(68);
var getNodePath   = require(55);
var getNodeByPath = require(54);

/**
 */

function DynamicNode(vnode, bindingClass) {
  this.vnode            = vnode;
  this.bindingClass     = bindingClass;
  this.vnode.parentNode = this;
}

/**
 */

DynamicNode.prototype.freeze = function(options, hydrators) {
  if (options.components[this.vnode.nodeName]) {
    return this.freezeComponent(options, hydrators);
  } else {
    return this.freezeElement(options, hydrators);
  }
};

/**
 */

DynamicNode.prototype.freezeComponent = function(options, hydrators) {
  var h2 = [];
  var element = this.vnode.freeze(options, h2);
  hydrators.push(new ComponentHydrator(h2[0], this.bindingClass, options));
  return element;
};

/**
 */

DynamicNode.prototype.freezeElement = function(options, hydrators) {
  var node = this.vnode.freeze(options, hydrators);
  hydrators.push(new Hydrator(node, this.bindingClass, options));
  return node;
};

/**
 */

function Hydrator(ref, bindingClass, options) {
  this.options      = options;
  this.ref          = ref;
  this.bindingClass = bindingClass;
}

/**
 */

extend(Hydrator.prototype, {

  /**
   */

  hydrate: function(root, view) {
    if (!this._refPath) this._refPath = getNodePath(this.ref);
    view.bindings.push(new this.bindingClass(getNodeByPath(root, this._refPath), view));
  }
});
/**
 */

function ComponentHydrator(hydrator, bindingClass, options) {
  this.options       = options;
  this.hydrator      = hydrator;
  this.bindingClass  = bindingClass;
}

/**
 */

extend(ComponentHydrator.prototype, {
  hydrate: function(root, view) {
    this.hydrator.hydrate(root, view);
    var component = view.bindings[view.bindings.length - 1];
    view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(component, view));
  }
});

/**
 */

module.exports = function(vnode, bindingClass) {
  return new DynamicNode(vnode, bindingClass);
};

},{"54":54,"55":55,"68":68}],59:[function(require,module,exports){
var createSection    = require(62);
var fragment         = require(60);
var FragmentSection  = require(53);
var NodeSection      = require(56);

/**
 */

function Element(nodeName, attributes, childNodes) {
  this.nodeName   = String(nodeName).toLowerCase();
  this.attributes = attributes;
  this.childNodes = childNodes;
  for (var i = childNodes.length; i--;) {
    childNodes[i].parentNode = this;
  }
}

/**
 */

Element.prototype.nodeType = 1;

/**
 */

Element.prototype.freeze = function(options, hydrators) {

  var components = options.components || {};
  var attributes = options.attributes || {};

  if (components[this.nodeName]) {
    return this._freezeComponent(components[this.nodeName], options, hydrators);
  }

  return this._freezeElement(options, hydrators);
};

/**
 */

Element.prototype._freezeComponent = function(clazz, options, hydrators) {

  // TODO - check parent node to see if there are anymore children. If not, then user NodeSection
  var section = new FragmentSection(options.document);
  var frag    = fragment.apply(this, this.childNodes);
  hydrators.push(new ComponentHydrator(clazz, section, frag, this._splitAttributes(options), options));
  return section.render();
};

/**
 */

Element.prototype._freezeElement = function(options, hydrators) {

  var element = options.document.createElement(this.nodeName);

  var inf = this._splitAttributes(options);

  for (var attrName in inf.staticAttributes) {
    element.setAttribute(attrName, inf.staticAttributes[attrName]);
  }

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    element.appendChild(this.childNodes[i].freeze(options, hydrators));
  }

  if (Object.keys(inf.dynamicAttributes).length) {
    hydrators.push(new ElementAttributeHydrator(new NodeSection(options.document, element), options, inf.dynamicAttributes));
  }

  return element;
};


/**
 */

Element.prototype._splitAttributes = function(options) {

  var dynamicAttributes = {};
  var staticAttributes  = {};

  if (options.attributes) {
    for (var key in this.attributes) {
      var attrClass = options.attributes[key];
      if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
        dynamicAttributes[key] = this.attributes[key];
      } else {
        staticAttributes[key]  = this.attributes[key];
      }
    }
  } else {
    staticAttributes = this.attributes;
  }


  return {
    dynamicAttributes : dynamicAttributes,
    staticAttributes  : staticAttributes
  };
};

/**
*/

function ComponentHydrator(clazz, section, childNodes, attrInfo, options) {
  this.clazz                = clazz;
  this.section              = section;
  this.childNodes           = childNodes;
  this.dynamicAttributes    = attrInfo.dynamicAttributes;
  this.attributes           = attrInfo.staticAttributes;
  this.hasDynamicAttributes = !!Object.keys(attrInfo.dynamicAttributes).length;
  this.options              = options;
}

/**
*/

ComponentHydrator.prototype.hydrate = function(root, view) {
  if (!this._marker) this._marker = this.section.createMarker();
  var ref = new this.clazz(this._marker.createSection(root), this.childNodes, this.attributes, view);
  if (this.hasDynamicAttributes) {
    _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
  }
  if (ref.update) view.bindings.push(ref);
};

/**
 */

module.exports = function(name, attributes, children) {
  return new Element(name, attributes, Array.prototype.slice.call(arguments, 2));
};

/**
 */

function ElementAttributeHydrator(section, options, dynamicAttributes) {
  this.section           = section;
  this.options           = options;
  this.dynamicAttributes = dynamicAttributes;
}

/**
 */

ElementAttributeHydrator.prototype.hydrate = function(root, view) {
  if (!this._marker) this._marker = this.section.createMarker();
  _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.dynamicAttributes, view);
};

/**
 */

function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
  for (var key in dynamicAttributes) {
    var clazz = options.attributes[key];
    var attr = new clazz(ref, key, dynamicAttributes[key], view);
    if (attr.update) view.bindings.push(attr);
  }
}

},{"53":53,"56":56,"60":60,"62":62}],60:[function(require,module,exports){

/**
 */

function Fragment(childNodes) {
  this.childNodes = childNodes;
  for (var i = childNodes.length; i--;) childNodes[i].parentNode = this;
}

/**
 */

Fragment.prototype.nodeType = 11;

/**
 */

Fragment.prototype.freeze = function(options, hydrators) {

  var fragment = options.document.createDocumentFragment();

  for (var i = 0, n = this.childNodes.length; i < n; i++) {
    fragment.appendChild(this.childNodes[i].freeze(options, hydrators));
  }

  return fragment;
};

/**
 */

module.exports = function() {
  var children = Array.prototype.slice.call(arguments);
  if (children.length === 1) return children[0];
  return new Fragment(children);
};

},{}],61:[function(require,module,exports){
/**
 */

module.exports = {
  element   : require(59),
  fragment  : require(60),
  text      : require(65),
  dynamic   : require(58),
  comment   : require(57),
  template  : require(63),

  View      : require(66)
};

},{"57":57,"58":58,"59":59,"60":60,"63":63,"65":65,"66":66}],62:[function(require,module,exports){
var extend          = require(68);
var FragmentSection = require(53);
var NodeSection     = require(56);

module.exports = function(document, node) {
  if (node.nodeType === 11) {
    var section = new FragmentSection(document);
    section.appendChild(node);
    return section;
  } else {
    return new NodeSection(document, node);
  }
};

},{"53":53,"56":56,"68":68}],63:[function(require,module,exports){
var defaultDocument   = require(67);
var View              = require(66);
var extend            = require(68);
var FragmentSection   = require(53);
var NodeSection       = require(56);
var templateComponent = require(64);

function _cleanupComponents(hash) {
  var c1 = hash || {};
  var c2 = {};

  for (var k in c1) {
    if (c1[k].__isTemplate) c1[k]  =  templateComponent(c1[k]);
    c2[k.toLowerCase()] = c1[k];
  }

  return c2;
}

/**
 */

function _cleanupOptions(options) {
  return extend({}, options, {
    components: _cleanupComponents(options.components),
    attributes: options.attributes
  });
}

/**
 */

function Template(vnode, options) {

  this.vnode = vnode;

  // hydrates nodes when the template is used
  this._hydrators = [];

  options = _cleanupOptions(extend({
    document  : defaultDocument
  }, options));

  this.viewClass = options.viewClass || View;
  this.options   = options;

  // freeze & create the template node immediately
  var node = vnode.freeze(options, this._hydrators);

  if (node.nodeType === 11) {
    this.section = new FragmentSection(options.document);
    this.section.appendChild(node);
  } else {
    this.section = new NodeSection(options.document, node);
  }
}

/**
 */

Template.prototype.__isTemplate = true;

/**
 * creates a new view
 */

Template.prototype.view = function(context, options) {

  // TODO - make compatible with IE 8
  var section     = this.section.clone();

  var view = new this.viewClass(section, this, options);

  for (var i = 0, n = this._hydrators.length; i < n; i++) {
    this._hydrators[i].hydrate(section.node || section.start.parentNode, view);
  }

  if (context) view.update(context);

  // TODO - set section instead of node
  return view;
};

/**
 */

module.exports = function(vnode, options) {
  return new Template(vnode, options);
};

},{"53":53,"56":56,"64":64,"66":66,"67":67,"68":68}],64:[function(require,module,exports){
module.exports = function(template) {

  function Component(section, vnode, attributes, view) {
    this.section    = section;
    this.vnode      = vnode;
    this.attributes = attributes;
    this.view       = view;

    this.childView = template.view();
    this.section.appendChild(this.childView.render());
  }

  Component.prototype.template = template;

  Component.prototype.update = function(context) {
    this.childView.update(context);
  };

  return Component;
}

},{}],65:[function(require,module,exports){
/**
 */

function Text(nodeValue) {
  this.nodeValue = nodeValue || "";
}

/**
 */

Text.prototype.freeze = function(options) {
  return options.document.createTextNode(this.nodeValue);
};

/**
 */

module.exports = function(nodeValue) {
  return new Text(nodeValue);
};

},{}],66:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"50":50}],67:[function(require,module,exports){
module.exports = document;

},{}],68:[function(require,module,exports){
module.exports = extend

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],69:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"67":67}],70:[function(require,module,exports){
function _copy (to, from) {

  for (var i = 0, n = from.length; i < n; i++) {

    var target = from[i];

    for (var property in target) {
      to[property] = target[property];
    }
  }

  return to;
}

function protoclass (parent, child) {

  var mixins = Array.prototype.slice.call(arguments, 2);

  if (typeof child !== "function") {
    if(child) mixins.unshift(child); // constructor is a mixin
    child   = parent;
    parent  = function() { };
  }

  _copy(child, parent); 

  function ctor () {
    this.constructor = child;
  }

  ctor.prototype  = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
  child.parent    = child.superclass = parent;

  _copy(child.prototype, mixins);

  protoclass.setup(child);

  return child;
}

protoclass.setup = function (child) {


  if (!child.extend) {
    child.extend = function(constructor) {

      var args = Array.prototype.slice.call(arguments, 0);

      if (typeof constructor !== "function") {
        args.unshift(constructor = function () {
          constructor.parent.apply(this, arguments);
        });
      }

      return protoclass.apply(this, [this].concat(args));
    }

    child.mixin = function(proto) {
      _copy(this.prototype, arguments);
    }

    child.create = function () {
      var obj = Object.create(child.prototype);
      child.apply(obj, arguments);
      return obj;
    }
  }

  return child;
}


module.exports = protoclass;
},{}],71:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"68":68}]},{},[1]);
