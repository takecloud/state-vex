!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.stateVex={})}(this,function(t){"use strict";function f(){this.id=n++,this.subs=[]}var e={createStore:function(t,e){var n=Object.create(null);return t&&e?(t.key=n,t):n}},n=1,o=null;f.prototype.addSub=function(t){this.subs[this.subs.length]=t},f.prototype.delSub=function(e){this.subs.splice(this.subs.findIndex(function(t){return t===e}),1)},f.prototype.clear=function(){this.subs.length=0},f.prototype.collect=function(e){void 0===e&&(e=o),e&&!this.subs.find(function(t){return t===e})&&this.addSub(e)},f.prototype.notify=function(e,n){this.subs.forEach(function(t){return t(e,n)})},Object.defineProperty(f,"watcher",{enumerable:!1,configurable:!0,get:function(){return o},set:function(t){o=t}});var i=1,a=null;function u(t,e,n){for(var o=t.split("."),i=e;o.length;)i=i[o.shift()],n&&n()}function r(){this.id=i++,this.store=e.createStore()}r.prototype.watch=function(n,o,i,r){return void 0===i&&(i={immediately:!1}),void 0===r&&(r=this.store),new Promise(function(e){if(f.watcher=o,u(n,r),f.watcher=null,i.immediately){var t=o(i.defaultParams);t instanceof Promise?t.then(function(t){return e(t)}):e(t)}})},r.prototype.unwatch=function(t,e,n){void 0===n&&(n=this.store),u(t,n,function(){return a.delSub(e)})},r.prototype.unwatchAll=function(t,e,n){void 0===n&&(n=this.store),u(t,n,function(){return a.clear()})},r.prototype.set=function(t,o,e,n){var i=this;void 0===e&&(e={}),void 0===n&&(n=this.store);for(var r=t.split(".");1<r.length;){var u=r.shift(),s=n[u];"object"==typeof s?n=s:s?console.warn("already has val"):(n[t=u]={},n=n[u])}t=r[0],!o||"object"!=typeof o||o instanceof Array||Object.entries(o).map(function(t){var e=t[0],n=t[1];i.set(e,n,{},o)});var c=new f;Object.defineProperty(n,t,{enumerable:!0,configurable:!0,get:function(){return(a=c).collect(),e.formatter?e.formatter(o):o},set:function(t){t!==o&&(c.notify(t,o),o=t)}})},r.prototype.del=function(t,e){void 0===e&&(e=this.store),u(t,e,function(){return a.clear()}),delete e[t]},r.prototype.delAll=function(t){var e=this;void 0===t&&(t=this.store),Object.keys(t).map(function(t){return e.del(t)})},t.default=r,Object.defineProperty(t,"__esModule",{value:!0})});