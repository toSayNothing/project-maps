// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8gxZX":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "162c69a12ee749c6";
module.bundle.HMR_BUNDLE_ID = "bcb14f99ff2fdcd4";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"bGzKl":[function(require,module,exports) {
// controller
var _cac = require("cac");
var _generateHtml = require("./generateHtml");
var _initConfig = require("./initConfig");
// import path from "path";
const cli = _cac.cac("project-maps");
// 1. init config
cli.command("init").action(async ()=>{
    console.log("call-init", process.cwd());
    try {
        await _initConfig.outputDefaultConfig(process.cwd());
    } catch (error) {
        process.exit(1);
    }
});
//2. tree
cli.command("tree").action(async ()=>{
    console.log("call-tree");
    try {
        await _initConfig.getUserFolderMaps(process.cwd());
    } catch (error) {
        process.exit(1);
    }
});
// 3. generate html
cli.command("generate").action(async ()=>{
    console.log("call-generate");
    try {
        await _generateHtml.generateHtml(process.cwd());
    } catch (error) {
        process.exit(1);
    }
});
// all in one
cli.command("map").action(async ()=>{
    console.log("call-map");
    const workPath = process.cwd();
    try {
        await _initConfig.outputDefaultConfig(workPath);
        await _initConfig.getUserFolderMaps(workPath);
        await _generateHtml.generateHtml(workPath);
    } catch (error) {
        process.exit(1);
    }
});
cli.help();
cli.version(require("../package.json").version);
cli.parse();

},{"./generateHtml":"1qohP","./initConfig":"5NSuf","../package.json":"ltbbF"}],"1qohP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateHtml", ()=>generateHtml
);
// 1. generate html file
var _promises = require("fs/promises");
var _promisesDefault = parcelHelpers.interopDefault(_promises);
var _path = require("path");
var _pathDefault = parcelHelpers.interopDefault(_path);
var _constants = require("./constants");
const generateHtml = async (outputPath)=>{
    // e D:\project\frontend-5.0\node_modules\project-maps\dist
    console.log("---", __dirname, "--", process.cwd(), "--", __filename);
    const chartJsPath = _pathDefault.default.relative(__dirname, __filename.replace(/mapcli\.js/g, "chart.js"));
    console.log("chartJsPath", chartJsPath);
    const str = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Project-Maps</title>
      <style>
        * {
          padding: 0;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div style="width: 100vw; height: 100vh; display: flex">
        <div id="container" style="flex: 1"></div>
      </div>
      <script src="./${_constants.OUTPUT_TREE_FILENAME}"></script>
      <script src="./${chartJsPath}"></script>
    </body>
  </html>

  `;
    // link chart.js url
    try {
        await _promisesDefault.default.writeFile(_pathDefault.default.resolve(outputPath, _constants.OUTPUT_HTML_FILENAME), str);
        console.log(`write-${_constants.OUTPUT_HTML_FILENAME}.js-success`);
    } catch (error) {
        console.error(`write-${_constants.OUTPUT_HTML_FILENAME}.js-error`, error);
    }
};

},{"./constants":"fQZ7C","@parcel/transformer-js/src/esmodule-helpers.js":"gURsi"}],"fQZ7C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_CONFIG", ()=>DEFAULT_CONFIG
);
parcelHelpers.export(exports, "OUTPUT_CONFIG_FILENAME", ()=>OUTPUT_CONFIG_FILENAME
);
parcelHelpers.export(exports, "OUTPUT_TREE_FILENAME", ()=>OUTPUT_TREE_FILENAME
);
parcelHelpers.export(exports, "OUTPUT_HTML_FILENAME", ()=>OUTPUT_HTML_FILENAME
);
parcelHelpers.export(exports, "WINDOW_TREE_KEY", ()=>WINDOW_TREE_KEY
);
const DEFAULT_CONFIG = {
    exclude: [
        "node_modules"
    ],
    relativepathDesc: {
        ".git": {
            desc: "git workspace",
            collapsed: true
        },
        ".husky": {
            desc: "husky workspace",
            collapsed: true
        },
        ".vscode": {
            desc: "vscode config",
            collapsed: true
        },
        dist: {
            desc: "",
            collapsed: true
        },
        "yarn.lock": {
            desc: "yarn package lock file",
            collapsed: true
        }
    }
};
const OUTPUT_CONFIG_FILENAME = "projectMaps.config.js";
const OUTPUT_TREE_FILENAME = "projectMaps.tree.js";
const OUTPUT_HTML_FILENAME = "projectMaps.views.html";
const WINDOW_TREE_KEY = "projectMapsTree";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gURsi"}],"gURsi":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5NSuf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "outputDefaultConfig", ()=>outputDefaultConfig
);
parcelHelpers.export(exports, "getUserFolderMaps", ()=>getUserFolderMaps
);
// this file has two missions:
// 1. output default config for user
// 2. get all folder tree data with config
var _promises = require("fs/promises");
var _promisesDefault = parcelHelpers.interopDefault(_promises);
var _path = require("path");
var _pathDefault = parcelHelpers.interopDefault(_path);
var _filesize = require("filesize");
var _filesizeDefault = parcelHelpers.interopDefault(_filesize);
var _constants = require("./constants");
const outputDefaultConfig = async (outputPath)=>{
    const oldUserConfig = getUserConfig();
    // check old config file, then merge it
    // console.log("oldUserConfig", oldUserConfig);
    const toWriteConfig = oldUserConfig ? {
        exclude: [
            ...new Set(oldUserConfig.exclude.concat(_constants.DEFAULT_CONFIG.exclude)), 
        ],
        // merge user desc and default desc
        relativepathDesc: [
            ...new Set([
                ...Object.keys(_constants.DEFAULT_CONFIG.relativepathDesc),
                ...Object.keys(oldUserConfig.relativepathDesc), 
            ]), 
        ].reduce((acc, cur)=>{
            var _cur, _cur1;
            acc[cur] = Object.assign({
            }, (_cur = oldUserConfig.relativepathDesc[cur]) !== null && _cur !== void 0 ? _cur : {
            }, (_cur1 = _constants.DEFAULT_CONFIG.relativepathDesc[cur]) !== null && _cur1 !== void 0 ? _cur1 : {
            });
            return acc;
        }, {
        })
    } : _constants.DEFAULT_CONFIG;
    try {
        await _promisesDefault.default.writeFile(_pathDefault.default.resolve(outputPath, _constants.OUTPUT_CONFIG_FILENAME), `module.exports = ` + JSON.stringify(toWriteConfig, null, 2));
        console.log("write-projectMaps.config.js-success");
    } catch (err) {
        console.error("write-projectMaps.config.js-error", err);
    }
};
function makeTreeDataItem(parentName, fullPath, relativePath, size, desc, isDir, collapsed) {
    const obj = {
        parentName,
        fullPath,
        relativePath,
        size,
        desc,
        collapsed
    };
    if (isDir) obj.children = {
    };
    return obj;
}
const getUserConfig = ()=>{
    try {
        const userConfig = require(_pathDefault.default.resolve(process.cwd(), _constants.OUTPUT_CONFIG_FILENAME));
        return userConfig;
    } catch (error) {
        console.error("getUserConfig-error,use default config");
        return _constants.DEFAULT_CONFIG;
    }
};
const searchPath = async (pathName, userConfig, parentName, obj)=>{
    let arr = await _promisesDefault.default.readdir(_pathDefault.default.resolve(pathName));
    arr = arr.filter((fileName)=>!userConfig.exclude.includes(fileName)
    );
    await Promise.all(arr.map(async (fileName)=>{
        var ref, ref1;
        const fullFileName = _pathDefault.default.resolve(pathName, fileName);
        const curRelativePath = _pathDefault.default.relative(process.cwd(), fullFileName);
        var ref2;
        const curDesc = (ref2 = (ref = userConfig.relativepathDesc[curRelativePath]) === null || ref === void 0 ? void 0 : ref.desc) !== null && ref2 !== void 0 ? ref2 : "";
        var ref3;
        const curCollapsed = (ref3 = (ref1 = userConfig.relativepathDesc[curRelativePath]) === null || ref1 === void 0 ? void 0 : ref1.collapsed) !== null && ref3 !== void 0 ? ref3 : "";
        const stat = await _promisesDefault.default.stat(fullFileName);
        const isDir = stat.isDirectory();
        obj[fileName] = makeTreeDataItem(parentName, fullFileName, curRelativePath, _filesizeDefault.default(stat.size), curDesc, isDir, curCollapsed);
        var _children;
        if (isDir) await searchPath(fullFileName, userConfig, fileName, (_children = obj[fileName].children) !== null && _children !== void 0 ? _children : {
        });
    }));
};
const getUserFolderMaps = async (rootPath)=>{
    const treeObj = {
    };
    const userConfig = getUserConfig();
    try {
        await searchPath(rootPath, userConfig, "root", treeObj);
        await _promisesDefault.default.writeFile(_pathDefault.default.resolve(rootPath, _constants.OUTPUT_TREE_FILENAME), `window.${_constants.WINDOW_TREE_KEY} = ` + JSON.stringify(treeObj, null, 2));
        console.log("write-projectMaps.tree.js-success");
    } catch (error) {
        console.log("write-projectMaps.tree.js-error", error);
    }
};

},{"./constants":"fQZ7C","@parcel/transformer-js/src/esmodule-helpers.js":"gURsi"}],"ltbbF":[function(require,module,exports) {
module.exports = JSON.parse("{\"name\":\"project-maps\",\"version\":\"1.0.3\",\"description\":\"visualize your project\",\"bin\":{\"project-maps\":\"./bin/project-maps.js\"},\"files\":[\"dist/\"],\"engines\":{\"node\":\">= 12\"},\"mapcli\":\"dist/mapcli.js\",\"chart\":\"dist/chart.js\",\"targets\":{\"mapcli\":{\"sourceMap\":false,\"source\":\"src/main.ts\",\"engines\":{\"node\":\">= 12\"}},\"chart\":{\"sourceMap\":false,\"source\":\"src/chart.ts\",\"engines\":{\"browsers\":\"> 0.5%, last 2 versions, not dead\"}}},\"scripts\":{\"build\":\"parcel build --no-cache\",\"build:mapcli\":\"parcel build --target mapcli --no-cache\",\"build:chart\":\"parcel build --target chart --no-cache\",\"watch\":\"parcel watch\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/toSayNothing/project-maps.git\"},\"keywords\":[\"visualize\",\"project\",\"maps\"],\"author\":\"toSayNothing\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/toSayNothing/project-maps/issues\"},\"homepage\":\"https://github.com/toSayNothing/project-maps#readme\",\"devDependencies\":{\"@parcel/packager-ts\":\"^2.0.1\",\"@parcel/transformer-typescript-types\":\"^2.0.1\",\"@types/node\":\"^17.0.4\",\"parcel\":\"^2.0.1\",\"typescript\":\">=3.0.0\"},\"dependencies\":{\"cac\":\"^6.7.12\",\"chalk\":\"^5.0.0\",\"echarts\":\"^5.2.2\",\"filesize\":\"^8.0.6\",\"vscode-icons-js\":\"^11.6.1\"}}");

},{}]},["8gxZX","bGzKl"], "bGzKl", "parcelRequire0bdd")

