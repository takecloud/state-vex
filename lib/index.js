(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.stateVex = {})));
}(this, (function (exports) { 'use strict';

function createStore (wrapper, key) {
  var newStore = Object.create(null);
  if (wrapper && key) {
    wrapper.key = newStore;
    return wrapper
  } else {
    return newStore
  }
}

var Store = {
  createStore: createStore
}

var depID = 1;
var watcher = null;

var Dep = function Dep () {
  this.id = depID++;
  this.subs = [];
};
Dep.prototype.addSub = function addSub (fn) {
  this.subs[this.subs.length] = fn;
};
Dep.prototype.delSub = function delSub (fn) {
  this.subs.splice(
    this.subs.findIndex(function (x) { return x === fn; }), 1
  );
};
Dep.prototype.clear = function clear () {
  this.subs.length = 0;
};
Dep.prototype.collect = function collect (fn) {
    if ( fn === void 0 ) fn = watcher;

  if (fn && !this.subs.find(function (x) { return x === fn; })) {
    this.addSub(fn);
  }
};
Dep.prototype.notify = function notify (newVal, oldVal) {
  this.subs.forEach(function (func) { return func(newVal, oldVal); });
};

// 如果不使用打包工具的话, 这样写要比 Dep.watcher.val 的形式舒服些
Object.defineProperty(Dep, 'watcher', {
  enumerable: false,
  configurable: true,
  get: function () {
    return watcher
  },
  set: function (newWather) {
    watcher = newWather;
  }
});

/** 一个非常简单的响应式状态管理 本意用来实现小程序中模板对全局对象中某个属性的订阅 */

var VXID = 1;
var handleDep = null;

function walkChains (key, obj, fn) {
  var segments = key.split('.');
  var deepObj = obj;
  while (segments.length) {
    deepObj = deepObj[segments.shift()];
    fn && fn();
  }
}

var VX = function VX () {
  this.id = VXID++;
  this.store = Store.createStore();
};
VX.prototype.watch = function watch (key, fn, options, obj) {
    if ( options === void 0 ) options = { immediately: false };
    if ( obj === void 0 ) obj = this.store;

  Dep.watcher = fn;
  walkChains(key, obj);
  Dep.watcher = null;
  options.immediately && fn(options.defaultParams);
};
VX.prototype.unwatch = function unwatch (key, fn, obj) {
    if ( obj === void 0 ) obj = this.store;

  walkChains(key, obj, function () { return handleDep.delSub(fn); });
};
VX.prototype.unwatchAll = function unwatchAll (key, fn, obj) {
    if ( obj === void 0 ) obj = this.store;

  walkChains(key, obj, function () { return handleDep.clear(); });
};
VX.prototype.set = function set (key, val, options, obj) {
    var this$1 = this;
    if ( options === void 0 ) options = {};
    if ( obj === void 0 ) obj = this.store;

  // console.log(key, val, obj, this)

  /** 对象值链 */
  var segments = key.split('.');
  while (segments.length > 1) {
    var handleKey = segments.shift();
    var handleVal = obj[handleKey];
    if (typeof handleVal === 'object') {
      obj = handleVal;
    } else if (!handleVal) {
      obj = (
        key = handleKey, obj[handleKey] = {}, obj[handleKey]);
    } else {
      console.warn('already has val');
    }
  }
  key = segments[0];
  /** walk */
  if (val && typeof val === 'object' && !(val instanceof Array)) {
    Object.entries(val).map(function (entry) {
      var k = entry[0];
        var v = entry[1];
      this$1.set(k, v, {}, val);
    });
  }
  /** defineProperty */
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      handleDep = dep;
      handleDep.collect();
      return options.formatter ? options.formatter(val) : val
    },
    set: function (newVal) {
      if (newVal === val) {
        return
      }
      dep.notify(newVal, val);
      val = newVal;
    }
  });
};
VX.prototype.del = function del (key, obj) {
    if ( obj === void 0 ) obj = this.store;

  walkChains(key, obj, function () { return handleDep.clear(); });
  delete obj[key];
};
VX.prototype.delAll = function delAll (obj) {
    var this$1 = this;
    if ( obj === void 0 ) obj = this.store;

  Object.keys(obj).map(function (key) { return this$1.del(key); });
};

exports['default'] = VX;

Object.defineProperty(exports, '__esModule', { value: true });

})));
