/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(9)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(28)
	__vue_script__ = __webpack_require__(30)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\train\\category\\category.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./category.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../../node_modules/autoprefixer-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./category.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "\n.category .top-bar{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:15px 0 25px 0;text-align:center;background:#353B4B;color:white;}\n.category .top-bar>div{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;border-left:1px solid rgba(255,255,255,0.1);}\n.category .top-bar>div:first-child{border-left:0;}\n.category .datas>div.number{font-size:60px;}\n.category .datas>div.number:after{content:'';display:block;height:0;width:120px;border-top:1px solid rgba(255,255,255,0.2);margin:7px auto;}\n.category .datas>div:last-child{font-size:20px;color:#939dba;}\n.category ul{-webkit-transition:0.25s;transition:0.25s;}\n.category .tree-root:last-child{border-bottom:1px solid #eee;}\n.category .tree-root li>div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}\n.category .tree-root li{border-top:1px solid #eee;line-height:40px;padding-left:24px;}\n.category .tree-root .toggle-icon{-webkit-transition:0.1s;transition:0.1s;display:inline-block;margin:0 4px 0 0;font-size:14px;color:#888;}\n.category .tree-root .toggle-icon.up{-webkit-transform:rotate(-180deg);transform:rotate(-180deg);}\n.category .tree-root span.name{cursor:pointer;-webkit-transition:0.25s;transition:0.25s;}\n.category .tree-root li>div:hover span.name{color:#268dff;}\n.category .tree-root li>div:hover span.name.red{color:red;}\n.category .tree-root li>div:hover .xa-icon-boxs{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}\n.category .xa-icon-boxs{display:none;}\n.category .xa-icon-box.xa-txt-red:hover .iconfont{color:red;}\n\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(7);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _tree = __webpack_require__(31);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            query: {
	                type: 1
	            },
	            classQuery: { id: '', pid: 0, name: '', remark: '' },
	            queryData: [],
	            currentClass: null,
	            dialog: {
	                title: '创建分类',
	                isShowDialog: false,
	                buttons: [{
	                    text: '取消',
	                    className: '',
	                    clickEvent: 'cancelEvent'
	                }, {
	                    text: '确定',
	                    className: 'xa-bg-blue',
	                    clickEvent: 'confirmlEvent'
	                }]
	            }
	        };
	    },

	    events: {
	        addEvent: function addEvent(item) {
	            this.currentClass = item;
	            this.classQuery = { id: '', pid: item.id || 0, name: '', remark: '' };
	            this.dialog.title = "添加分类";
	            this.dialog.isShowDialog = true;
	        },
	        editEvent: function editEvent(item) {
	            this.currentClass = item;
	            this.classQuery = { id: item.id, pid: item.pid || 0, name: item.name, remark: item.remark };
	            this.dialog.title = "编辑分类";
	            this.dialog.isShowDialog = true;
	        },
	        forbidEvent: function forbidEvent(item) {
	            this.forbid(item);
	        },
	        stopEvent: function stopEvent(item) {},
	        cancelEvent: function cancelEvent() {
	            this.dialog.isShowDialog = false;
	        },
	        confirmlEvent: function confirmlEvent() {
	            if (!this.classQuery.name) {
	                alert('请输入分类名称');
	                return;
	            }
	            this.dialog.isShowDialog = false;
	            this.save();
	        }
	    },
	    methods: {
	        getQueryData: function getQueryData() {
	            var _this = this;

	            this.$root.isLoading = true;
	            this.service.getCategoryList(this.query).then(function (data) {
	                _this.queryData = data;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this.$root.isLoading = false;
	            });
	        },
	        save: function save() {
	            var _this2 = this;

	            this.$root.isLoading = true;
	            this.service.addCategory(this.classQuery).then(function (data) {
	                if (_this2.currentClass) {
	                    if (_this2.classQuery.id) {
	                        //编辑
	                        _this2.currentClass.name = _this2.classQuery.name;
	                        _this2.currentClass.remark = _this2.classQuery.remark;
	                    } else {
	                        //添加
	                        if (!_this2.currentClass.sub || !_this2.currentClass.sub.length) {
	                            _this2.currentClass.sub = [];
	                        }
	                        _this2.currentClass.sub.push({
	                            id: data,
	                            name: _this2.classQuery.name,
	                            remark: _this2.classQuery.remark,
	                            sub: [],
	                            status: 1
	                        });
	                    }
	                    _this2.currentClass = null;
	                } else {
	                    //添加根分类
	                }
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this2.$root.isLoading = false;
	            });
	        },
	        forbid: function forbid(item) {
	            var _this3 = this;

	            // status:1 正常  2禁用
	            this.$root.isLoading = true;
	            var status = item.status == 1 ? 2 : 1;
	            this.service.forbidCategory({ id: item.id, status: status, ids: (0, _stringify2.default)(item.ids) }).then(function (data) {
	                item.status = status;
	                item.sub = data;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this3.$root.isLoading = false;
	            });
	        },
	        addRootClass: function addRootClass() {
	            this.currentClass = null;
	            this.classQuery = { id: '', pid: 0, name: '', remark: '' };
	            this.dialog.title = "添加分类";
	            this.dialog.isShowDialog = true;
	        }
	    },
	    props: ['service'],
	    route: {
	        data: function data(_ref) {
	            var next = _ref.next;

	            this.$root.title = '分类管理';
	        }
	    },
	    components: {
	        xaTree: _tree2.default
	    },
	    ready: function ready() {
	        this.getQueryData();
	    }
	};

	// </script>
	// <style>
	//     .category .top-bar{display:flex;padding:15px 0 25px 0;text-align:center;background:#353B4B;color:white;}
	//     .category .top-bar>div{flex:1;border-left:1px solid rgba(255,255,255,0.1);}
	//     .category .top-bar>div:first-child{border-left:0;}
	//     .category .datas>div.number{font-size:60px;}
	//     .category .datas>div.number:after{content:'';display:block;height:0;width:120px;border-top:1px solid rgba(255,255,255,0.2);margin:7px auto;}
	//     .category .datas>div:last-child{font-size:20px;color:#939dba;}
	//     .category ul{transition:0.25s;}
	//     .category .tree-root:last-child{border-bottom:1px solid #eee;}
	//     .category .tree-root li>div{display:flex;}
	//     .category .tree-root li{border-top:1px solid #eee;line-height:40px;padding-left:24px;}
	//     .category .tree-root .toggle-icon{transition:0.1s;display:inline-block;margin:0 4px 0 0;font-size:14px;color:#888;}
	//     .category .tree-root .toggle-icon.up{transform:rotate(-180deg);}
	//     .category .tree-root span.name{cursor:pointer;transition:0.25s;}
	//     .category .tree-root li>div:hover span.name{color:#268dff;}
	//     .category .tree-root li>div:hover span.name.red{color:red;}
	//     .category .tree-root li>div:hover .xa-icon-boxs{display:flex;}
	//     .category .xa-icon-boxs{display:none;}
	//     .category .xa-icon-box.xa-txt-red:hover .iconfont{color:red;}
	//
	// </style>
	// <template>
	// <div class="xa-page category">
	//     <header class="xa-header">
	//         <div @click="addRootClass" title="创建一级分类" class="xa-header-icon">
	//             <i class="iconfont icon-tianjia"></i>
	//         </div>
	//         <div class="line"></div>
	//         <div @click="" class="xa-header-icon">
	//             <i class="iconfont icon-dingdanliebiaoyincang201"></i>
	//         </div>
	//     </header>
	//     <div class="xa-page-container">
	//         <ul class="tree-root" v-for="item in queryData">
	//             <xa-tree :model="item"></xa-tree>
	//         </ul>
	//     </div>
	//
	//     <xa-prompt :title="dialog.title" :buttons="dialog.buttons" :show.sync="dialog.isShowDialog">
	//         <div style="width:500px;padding:10px 20px;">
	//             <div class="form-group">
	//                 <label>分类名称</label>
	//                 <input v-model="classQuery.name" type="text" class="form-control"></div>
	//             <div class="form-group">
	//                 <label>分类描述</label>
	//                 <textarea v-model="classQuery.remark" class="form-control" rows="5" style="resize:vertical;"></textarea>
	//             </div>
	//         </div>
	//     </xa-prompt>
	// </div>
	// </template>
	//
	// <script>

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(32)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\tree.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(33)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tree.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<li>
	// 		<div @click="toggle">
	// 			<div style="flex:1;">
	// 				<i v-if="hasChild" :class="{'up':open}" class="iconfont icon-jiantouxia toggle-icon"></i>
	// 				<span class="name" :class="{'red':model.status == 2}" :title="model.remark">{{model.name}}</span>
	// 			</div>
	// 			<div class="xa-icon-boxs">
	// 				<div @click.stop="setEvent('addEvent',model)" class="xa-icon-box" title="添加下级分类"><i class="iconfont icon-2 xa-txt-20"></i></div>
	// 				<div @click.stop="setEvent('editEvent',model)" class="xa-icon-box" title="修改"><i class="iconfont icon-bianji xa-txt-20"></i></div>
	// 				<div @click.stop="setEvent('forbidEvent',model)" :class="{'xa-txt-red':model.status == 2}" class="xa-icon-box" :title="model.status==2?'点击启用':'点击停用'"><i class="iconfont icon-jinyong xa-txt-20"></i></div>
	// 			</div>
	// 		</div>
	// 		<ul v-show="open" v-if="hasChild">
	// 			<xa-tree v-for="model in model.sub" :model="model"></xa-tree>
	// 		</ul>
	// 	</li>
	// </template>
	// <script>
	exports.default = {
		name: 'xaTree',
		data: function data() {
			return {
				open: false
			};
		},

		computed: {
			hasChild: function hasChild() {
				return this.model.sub && this.model.sub.length;
			}
		},
		methods: {
			toggle: function toggle() {
				if (this.hasChild) {
					this.open = !this.open;
				}
			},
			setEvent: function setEvent(eventName, item) {
				this.$dispatch(eventName, item);
			}
		},
		props: {
			model: Object
		}
	};
	// </script>

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "\n<li>\n\t<div @click=\"toggle\">\n\t\t<div style=\"flex:1;\">\n\t\t\t<i v-if=\"hasChild\" :class=\"{'up':open}\" class=\"iconfont icon-jiantouxia toggle-icon\"></i>\n\t\t\t<span class=\"name\" :class=\"{'red':model.status == 2}\" :title=\"model.remark\">{{model.name}}</span>\n\t\t</div>\n\t\t<div class=\"xa-icon-boxs\">\n\t\t\t<div @click.stop=\"setEvent('addEvent',model)\" class=\"xa-icon-box\" title=\"添加下级分类\"><i class=\"iconfont icon-2 xa-txt-20\"></i></div>\n\t\t\t<div @click.stop=\"setEvent('editEvent',model)\" class=\"xa-icon-box\" title=\"修改\"><i class=\"iconfont icon-bianji xa-txt-20\"></i></div>\n\t\t\t<div @click.stop=\"setEvent('forbidEvent',model)\" :class=\"{'xa-txt-red':model.status == 2}\" class=\"xa-icon-box\" :title=\"model.status==2?'点击启用':'点击停用'\"><i class=\"iconfont icon-jinyong xa-txt-20\"></i></div>\n\t\t</div>\n\t</div>\n\t<ul v-show=\"open\" v-if=\"hasChild\">\n\t\t<xa-tree v-for=\"model in model.sub\" :model=\"model\"></xa-tree>\n\t</ul>\n</li>\n";

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n<div class=\"xa-page category\">\r\n    <header class=\"xa-header\">\r\n        <div @click=\"addRootClass\" title=\"创建一级分类\" class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-tianjia\"></i>\r\n        </div>\r\n        <div class=\"line\"></div>\r\n        <div @click=\"\" class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-dingdanliebiaoyincang201\"></i>\r\n        </div>\r\n    </header>\r\n    <div class=\"xa-page-container\">\r\n        <ul class=\"tree-root\" v-for=\"item in queryData\">\r\n            <xa-tree :model=\"item\"></xa-tree>\r\n        </ul>\r\n    </div>\r\n\r\n    <xa-prompt :title=\"dialog.title\" :buttons=\"dialog.buttons\" :show.sync=\"dialog.isShowDialog\">\r\n        <div style=\"width:500px;padding:10px 20px;\">\r\n            <div class=\"form-group\">\r\n                <label>分类名称</label>\r\n                <input v-model=\"classQuery.name\" type=\"text\" class=\"form-control\"></div>\r\n            <div class=\"form-group\">\r\n                <label>分类描述</label>\r\n                <textarea v-model=\"classQuery.remark\" class=\"form-control\" rows=\"5\" style=\"resize:vertical;\"></textarea>\r\n            </div>\r\n        </div>\r\n    </xa-prompt>\r\n</div>\r\n";

/***/ }
/******/ ]);