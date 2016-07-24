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

	module.exports = __webpack_require__(62);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
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
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(48)
	__vue_script__ = __webpack_require__(50)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\exam\\info.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(51)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./info.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5e542f3e&scoped=true!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./info.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5e542f3e&scoped=true!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./info.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "\n.exam-info .top-bar[_v-5e542f3e]{height:40px;line-height:40px;text-align:center;background:#767B84;color:white;}\n.exam-info .top-bar>span[_v-5e542f3e]{margin:0 8px;}\n.exam-info .xa-line[_v-5e542f3e]{border-bottom:1px solid #ccc;}\n.exam-info .xa-line>div[_v-5e542f3e]{border-right:1px solid #ccc;}\n.exam-info .xa-line>div[_v-5e542f3e]:last-child{border-right:0;}\n.exam-info .xa-line>div>span[_v-5e542f3e]{padding:0 10px;}\n", ""]);

	// exports


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <style scoped>
	//     .exam-info .top-bar{height:40px;line-height:40px;text-align:center;background:#767B84;color:white;}
	//     .exam-info .top-bar>span{margin:0 8px;}
	//     .exam-info .xa-line{border-bottom:1px solid #ccc;}
	//     .exam-info .xa-line>div{border-right:1px solid #ccc;}
	//     .exam-info .xa-line>div:last-child{border-right:0;}
	//     .exam-info .xa-line>div>span{padding:0 10px;}
	// </style>
	// <template>
	//     <div class="exam-info">
	//         <div class="top-bar">
	//             <span>ADS</span>
	//             <span>第四次模拟考试</span>
	//         </div>
	//         <div class="xa-lines">
	//             <div class="xa-line xa-box xa-bg-eee">
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">考试类型:飞行器</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">创建人:飞行器</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">创建时间:飞行器</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">考试时间:飞行器</span></div>
	//             </div>
	//             <div class="xa-line xa-box xa-bg-eee">
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">考试时长:60分钟</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">状态:进行中</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">课程考核:是</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">课程编号:A872345</span></div>
	//                 <div class="xa-flex xa-txt-center"><span class="xa-text">综合占比:50%</span></div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['queryData']
	};

	// </script>

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n<div class=\"exam-info\" _v-5e542f3e=\"\">\n    <div class=\"top-bar\" _v-5e542f3e=\"\">\n        <span _v-5e542f3e=\"\">ADS</span>\n        <span _v-5e542f3e=\"\">第四次模拟考试</span>\n    </div>\n    <div class=\"xa-lines\" _v-5e542f3e=\"\">\n        <div class=\"xa-line xa-box xa-bg-eee\" _v-5e542f3e=\"\">\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">考试类型:飞行器</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">创建人:飞行器</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">创建时间:飞行器</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">考试时间:飞行器</span></div>\n        </div>\n        <div class=\"xa-line xa-box xa-bg-eee\" _v-5e542f3e=\"\">\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">考试时长:60分钟</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">状态:进行中</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">课程考核:是</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">课程编号:A872345</span></div>\n            <div class=\"xa-flex xa-txt-center\" _v-5e542f3e=\"\"><span class=\"xa-text\" _v-5e542f3e=\"\">综合占比:50%</span></div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(63)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\train\\exam\\paper.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(74)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./paper.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _info = __webpack_require__(47);

	var _info2 = _interopRequireDefault(_info);

	var _question = __webpack_require__(64);

	var _question2 = _interopRequireDefault(_question);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// <div class="xa-page exam-paper">
	//     <header class="xa-header">
	//         <div class="xa-header-icon">
	//             <i class="iconfont icon-htmal5icon30"></i>
	//         </div>
	//     </header>
	//     <div class="xa-page-container">
	//         <info></info>
	//         <div>
	//             <div class="xa-box xa-line xa-txt-blue xa-border-bottom" style="padding:8px 20px;">
	//                 <div class="xa-flex">P20的基础知识（单选题）</div>
	//                 <div class="xa-flex xa-txt-right">总分：20分 题数：10题</div>
	//             </div>
	//             <question></question>
	//             <div class="xa-center xa-absolute-bottom" style="background:rgba(0,153,255,0.9)">
	//                 <div class="xa-btn-large xa-bg-white xa-txt-blue">上一项目</div>
	//                 <div class="xa-btn-large xa-txt-white xa-border-white" style="line-height:36px;">下一项目</div>
	//             </div>
	//         </div>
	//     </div>
	// </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            query: {
	                start_date: ''
	            },
	            queryData: {
	                data: []
	            }
	        };
	    },

	    props: ['service'],
	    methods: {
	        getQueryData: function getQueryData() {
	            var _this = this;

	            this.$root.isLoading = true;
	            this.service.getExamList(this.query).then(function (data) {
	                _this.queryData = data;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this.$root.isLoading = false;
	            });
	        }
	    },
	    components: {
	        info: _info2.default,
	        question: _question2.default
	    },
	    route: {
	        data: function data(_ref) {
	            var next = _ref.next;

	            this.$root.title = '考试详情';
	        }
	    },
	    ready: function ready() {
	        this.getQueryData();
	    }
	};
	// </script>

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(65)
	__vue_script__ = __webpack_require__(67)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\exam\\question.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(73)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./question.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-08de6e76&scoped=true!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./question.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-08de6e76&scoped=true!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./question.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "\n\t.paper-questions[_v-08de6e76]{padding-bottom:60px;}\n    .paper-question[_v-08de6e76]:nth-child(2n){background:#F6F6F6;}\n    .paper-question[_v-08de6e76]{border-bottom:1px solid #ddd;padding:5px 10px;}\n    .paper-question img[_v-08de6e76]{max-height:200px;max-width:800px;}\n    .paper-question .border-bottom[_v-08de6e76]{border-bottom:1px solid #ccc;}\n    .paper-question .question-left[_v-08de6e76]{width:300px;border-left:1px solid #ccc;}\n    .paper-question .question-left>div[_v-08de6e76]{width:100%;padding-left:10px;}\n", ""]);

	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _preview = __webpack_require__(68);

	var _preview2 = _interopRequireDefault(_preview);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            url: ''
	        };
	    },

	    methods: {
	        preview: function preview(url) {
	            this.url = url;
	        }
	    },
	    props: ['paper-question'],
	    components: { preview: _preview2.default },
	    ready: function ready() {}
	};

	// </script>
	// <style scoped>
	// 	.paper-questions{padding-bottom:60px;}
	//     .paper-question:nth-child(2n){background:#F6F6F6;}
	//     .paper-question{border-bottom:1px solid #ddd;padding:5px 10px;}
	//     .paper-question img{max-height:200px;max-width:800px;}
	//     .paper-question .border-bottom{border-bottom:1px solid #ccc;}
	//     .paper-question .question-left{width:300px;border-left:1px solid #ccc;}
	//     .paper-question .question-left>div{width:100%;padding-left:10px;}
	// </style>
	// <template>
	// <div class="paper-questions">
	// 	<div class="xa-box paper-question">
	// 		<div class="xa-flex">
	// 		    <div class="xa-line">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>
	// 		    <div class="xa-line" style="position:relative;">
	// 		    	<img @click="preview('http://imgst-dl.meilishuo.net/pic/_o/84/a4/a30be77c4ca62cd87156da202faf_1440_900.jpg')" src="http://imgst-dl.meilishuo.net/pic/_o/84/a4/a30be77c4ca62cd87156da202faf_1440_900.jpg">
	// 		    </div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiosel xa-txt-blue xa-txt-18" style="margin-right:5px;"></i>A、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>B、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>C、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>D、这个是答案描述是吧不要选A</div>
	// 		</div>
	// 		<div class="xa-center question-left">
	// 			<div>
	// 				<div class="xa-line-min">做题人数：50</div>
	// 				<div class="xa-line-min border-bottom">正确率：80%</div>
	// 				<div class="xa-line xa-box"><div class="xa-flex xa-txt-green">A：10人</div><div class="xa-flex">B：20人</div></div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">C：10人</div><div class="xa-flex">D：20人</div></div>
	// 			</div>
	// 		</div>
	// 	</div>
	// 	<div class="xa-box paper-question">
	// 		<div class="xa-flex">
	// 		    <div class="xa-line">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>
	// 		    <div class="xa-line">
	// 		    	<img @click="preview('http://image.xinmin.cn/2011/09/24/20110924102403077849.jpg')" src="http://image.xinmin.cn/2011/09/24/20110924102403077849.jpg">
	// 		    </div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiosel xa-txt-blue xa-txt-18" style="margin-right:5px;"></i>A、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>B、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>C、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>D、这个是答案描述是吧不要选A</div>
	// 		</div>
	// 		<div class="xa-center question-left">
	// 			<div>
	// 				<div class="xa-line-min">做题人数：50</div>
	// 				<div class="xa-line-min border-bottom">正确率：80%</div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">A：10人</div><div class="xa-flex">B：20人</div></div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">C：10人</div><div class="xa-flex">D：20人</div></div>
	// 			</div>
	// 		</div>
	// 	</div><div class="xa-box paper-question">
	// 		<div class="xa-flex">
	// 		    <div class="xa-line">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiosel xa-txt-blue xa-txt-18" style="margin-right:5px;"></i>A、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>B、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>C、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>D、这个是答案描述是吧不要选A</div>
	// 		</div>
	// 		<div class="xa-center question-left">
	// 			<div>
	// 				<div class="xa-line-min">做题人数：50</div>
	// 				<div class="xa-line-min border-bottom">正确率：80%</div>
	// 				<div class="xa-line xa-box"><div class="xa-flex xa-txt-green">A：10人</div><div class="xa-flex">B：20人</div></div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">C：10人</div><div class="xa-flex">D：20人</div></div>
	// 			</div>
	// 		</div>
	// 	</div><div class="xa-box paper-question">
	// 		<div class="xa-flex">
	// 		    <div class="xa-line">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiosel xa-txt-blue xa-txt-18" style="margin-right:5px;"></i>A、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>B、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>C、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>D、这个是答案描述是吧不要选A</div>
	// 		</div>
	// 		<div class="xa-center question-left">
	// 			<div>
	// 				<div class="xa-line-min">做题人数：50</div>
	// 				<div class="xa-line-min border-bottom">正确率：80%</div>
	// 				<div class="xa-line xa-box"><div class="xa-flex xa-txt-green">A：10人</div><div class="xa-flex">B：20人</div></div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">C：10人</div><div class="xa-flex">D：20人</div></div>
	// 			</div>
	// 		</div>
	// 	</div><div class="xa-box paper-question">
	// 		<div class="xa-flex">
	// 		    <div class="xa-line">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>
	// 		    <div class="xa-line">
	// 		    	<img @click="preview('http://hbimg.b0.upaiyun.com/d52a6865e802234ffe8de29af3df4e555286fdb9574af-MWOTId_fw658')" src="http://hbimg.b0.upaiyun.com/d52a6865e802234ffe8de29af3df4e555286fdb9574af-MWOTId_fw658">
	// 		    </div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiosel xa-txt-blue xa-txt-18" style="margin-right:5px;"></i>A、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>B、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>C、这个是答案描述是吧不要选A</div>
	// 		    <div class="xa-line-min"><i class="iconfont icon-radiodef xa-txt-gray xa-txt-18" style="margin-right:5px;"></i>D、这个是答案描述是吧不要选A</div>
	// 		</div>
	// 		<div class="xa-center question-left">
	// 			<div>
	// 				<div class="xa-line-min">做题人数：50</div>
	// 				<div class="xa-line-min border-bottom">正确率：80%</div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">A：10人</div><div class="xa-flex">B：20人</div></div>
	// 				<div class="xa-line xa-box"><div class="xa-flex">C：10人</div><div class="xa-flex">D：20人</div></div>
	// 			</div>
	// 		</div>
	// 	</div>
	// 	<preview :url.sync="url"></preview>
	// </div>
	// </template>
	//
	// <script>

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(69)
	__vue_script__ = __webpack_require__(71)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\preview.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(72)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./preview.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-51faecfb&scoped=true!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preview.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-51faecfb&scoped=true!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preview.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "\n.preview[_v-51faecfb]{position:fixed;top:0;left:0;z-index:1000;-webkit-transition:0.2s;transition:0.2s;border:5px solid white;box-shadow:3px 3px 20px #666,0 0 8px #666 inset;background:rgba(0,0,0,0.5);max-width:90%;max-height:90%;overflow:hidden;min-height:100px;min-width:100px;}\n.preview .preview-box[_v-51faecfb]{height:100%;width:100%;}\n.preview .preview-box>img[_v-51faecfb]{max-height:100%;max-width:100%;}\n.preview .close[_v-51faecfb]{position:absolute;height:40px;width:40px;top:10px;right:10px;background:rgba(255,255,255,0.9);border-radius:100%;cursor:pointer;}\n.preview .close[_v-51faecfb]:hover{background:white;}\n.preview .close:hover .iconfont[_v-51faecfb]{color:red;}\n", ""]);

	// exports


/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <style scoped>
	// 	.preview{position:fixed;top:0;left:0;z-index:1000;transition:0.2s;border:5px solid white;box-shadow:3px 3px 20px #666,0 0 8px #666 inset;background:rgba(0,0,0,0.5);max-width:90%;max-height:90%;overflow:hidden;min-height:100px;min-width:100px;}
	// 	.preview .preview-box{height:100%;width:100%;}
	// 	.preview .preview-box>img{max-height:100%;max-width:100%;}
	// 	.preview .close{position:absolute;height:40px;width:40px;top:10px;right:10px;background:rgba(255,255,255,0.9);border-radius:100%;cursor:pointer;}
	// 	.preview .close:hover{background:white;}
	// 	.preview .close:hover .iconfont{color:red;}
	// </style>
	// <template>
	// 	<div :style="{transform:url?'scale(1)':'scale(0)'}"  class="preview">
	// 		<div class="preview-box">
	// 	    	<img @load="picLoaded" :src="url">
	// 		</div>
	// 		<div @click="closePreview" class="close xa-center">
	// 			<i class="iconfont icon-jieshu xa-txt-22"></i>	
	// 		</div>
	// 	</div>
	// </template>
	// <script>
	exports.default = {
		props: {
			url: {
				type: String,
				twoWay: true
			}
		},
		methods: {
			closePreview: function closePreview() {
				this.$el.style.transition = "0.2s";
				this.url = '';
				window.onmousewheel = undefined;
			},
			picLoaded: function picLoaded(e) {
				this.$el.style.top = (document.documentElement.clientHeight - e.target.height) / 2 + 'px';
				this.$el.style.left = (document.documentElement.clientWidth - e.target.width) / 2 + 'px';
				this.$el.style.transition = "0s";
				var img = this.$el.querySelector('img');
				img.style.transform = "scale(1)";
				var scale = 1;
				window.onmousewheel = function (e) {
					if (e.wheelDelta > 0) {
						//上
						scale += scale < 2 ? 0.05 : 0;
					} else {
						scale -= scale > 0.2 ? 0.05 : 0;
					}
					img.style.transform = "scale(" + scale + ")";
					e.stopPropagation();
					return false;
				};
			}
		},
		ready: function ready() {
			window.Xa.drag(this.$el);
		}
	};
	// </script>

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n<div :style=\"{transform:url?'scale(1)':'scale(0)'}\" class=\"preview\" _v-51faecfb=\"\">\n\t<div class=\"preview-box\" _v-51faecfb=\"\">\n    \t<img @load=\"picLoaded\" :src=\"url\" _v-51faecfb=\"\">\n\t</div>\n\t<div @click=\"closePreview\" class=\"close xa-center\" _v-51faecfb=\"\">\n\t\t<i class=\"iconfont icon-jieshu xa-txt-22\" _v-51faecfb=\"\"></i>\t\n\t</div>\n</div>\n";

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n<div class=\"paper-questions\" _v-08de6e76=\"\">\n\t<div class=\"xa-box paper-question\" _v-08de6e76=\"\">\n\t\t<div class=\"xa-flex\" _v-08de6e76=\"\">\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>\n\t\t    <div class=\"xa-line\" style=\"position:relative;\" _v-08de6e76=\"\">\n\t\t    \t<img @click=\"preview('http://imgst-dl.meilishuo.net/pic/_o/84/a4/a30be77c4ca62cd87156da202faf_1440_900.jpg')\" src=\"http://imgst-dl.meilishuo.net/pic/_o/84/a4/a30be77c4ca62cd87156da202faf_1440_900.jpg\" _v-08de6e76=\"\">\n\t\t    </div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiosel xa-txt-blue xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>A、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>B、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>C、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>D、这个是答案描述是吧不要选A</div>\n\t\t</div>\n\t\t<div class=\"xa-center question-left\" _v-08de6e76=\"\">\n\t\t\t<div _v-08de6e76=\"\">\n\t\t\t\t<div class=\"xa-line-min\" _v-08de6e76=\"\">做题人数：50</div>\n\t\t\t\t<div class=\"xa-line-min border-bottom\" _v-08de6e76=\"\">正确率：80%</div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex xa-txt-green\" _v-08de6e76=\"\">A：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">B：20人</div></div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">C：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">D：20人</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"xa-box paper-question\" _v-08de6e76=\"\">\n\t\t<div class=\"xa-flex\" _v-08de6e76=\"\">\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">\n\t\t    \t<img @click=\"preview('http://image.xinmin.cn/2011/09/24/20110924102403077849.jpg')\" src=\"http://image.xinmin.cn/2011/09/24/20110924102403077849.jpg\" _v-08de6e76=\"\">\n\t\t    </div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiosel xa-txt-blue xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>A、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>B、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>C、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>D、这个是答案描述是吧不要选A</div>\n\t\t</div>\n\t\t<div class=\"xa-center question-left\" _v-08de6e76=\"\">\n\t\t\t<div _v-08de6e76=\"\">\n\t\t\t\t<div class=\"xa-line-min\" _v-08de6e76=\"\">做题人数：50</div>\n\t\t\t\t<div class=\"xa-line-min border-bottom\" _v-08de6e76=\"\">正确率：80%</div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">A：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">B：20人</div></div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">C：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">D：20人</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div><div class=\"xa-box paper-question\" _v-08de6e76=\"\">\n\t\t<div class=\"xa-flex\" _v-08de6e76=\"\">\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiosel xa-txt-blue xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>A、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>B、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>C、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>D、这个是答案描述是吧不要选A</div>\n\t\t</div>\n\t\t<div class=\"xa-center question-left\" _v-08de6e76=\"\">\n\t\t\t<div _v-08de6e76=\"\">\n\t\t\t\t<div class=\"xa-line-min\" _v-08de6e76=\"\">做题人数：50</div>\n\t\t\t\t<div class=\"xa-line-min border-bottom\" _v-08de6e76=\"\">正确率：80%</div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex xa-txt-green\" _v-08de6e76=\"\">A：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">B：20人</div></div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">C：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">D：20人</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div><div class=\"xa-box paper-question\" _v-08de6e76=\"\">\n\t\t<div class=\"xa-flex\" _v-08de6e76=\"\">\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiosel xa-txt-blue xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>A、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>B、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>C、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>D、这个是答案描述是吧不要选A</div>\n\t\t</div>\n\t\t<div class=\"xa-center question-left\" _v-08de6e76=\"\">\n\t\t\t<div _v-08de6e76=\"\">\n\t\t\t\t<div class=\"xa-line-min\" _v-08de6e76=\"\">做题人数：50</div>\n\t\t\t\t<div class=\"xa-line-min border-bottom\" _v-08de6e76=\"\">正确率：80%</div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex xa-txt-green\" _v-08de6e76=\"\">A：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">B：20人</div></div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">C：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">D：20人</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div><div class=\"xa-box paper-question\" _v-08de6e76=\"\">\n\t\t<div class=\"xa-flex\" _v-08de6e76=\"\">\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">1.这个是考试题目额，这个是考试题目，真的考试题目撒的发三大，阿斯达飞阿达撒是吗，如下图。</div>\n\t\t    <div class=\"xa-line\" _v-08de6e76=\"\">\n\t\t    \t<img @click=\"preview('http://hbimg.b0.upaiyun.com/d52a6865e802234ffe8de29af3df4e555286fdb9574af-MWOTId_fw658')\" src=\"http://hbimg.b0.upaiyun.com/d52a6865e802234ffe8de29af3df4e555286fdb9574af-MWOTId_fw658\" _v-08de6e76=\"\">\n\t\t    </div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiosel xa-txt-blue xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>A、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>B、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>C、这个是答案描述是吧不要选A</div>\n\t\t    <div class=\"xa-line-min\" _v-08de6e76=\"\"><i class=\"iconfont icon-radiodef xa-txt-gray xa-txt-18\" style=\"margin-right:5px;\" _v-08de6e76=\"\"></i>D、这个是答案描述是吧不要选A</div>\n\t\t</div>\n\t\t<div class=\"xa-center question-left\" _v-08de6e76=\"\">\n\t\t\t<div _v-08de6e76=\"\">\n\t\t\t\t<div class=\"xa-line-min\" _v-08de6e76=\"\">做题人数：50</div>\n\t\t\t\t<div class=\"xa-line-min border-bottom\" _v-08de6e76=\"\">正确率：80%</div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">A：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">B：20人</div></div>\n\t\t\t\t<div class=\"xa-line xa-box\" _v-08de6e76=\"\"><div class=\"xa-flex\" _v-08de6e76=\"\">C：10人</div><div class=\"xa-flex\" _v-08de6e76=\"\">D：20人</div></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<preview :url.sync=\"url\" _v-08de6e76=\"\"></preview>\n</div>\n";

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"xa-page exam-paper\">\r\n    <header class=\"xa-header\">\r\n        <div class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-htmal5icon30\"></i>\r\n        </div>\r\n    </header>\r\n    <div class=\"xa-page-container\">\r\n        <info></info>\r\n        <div>\r\n            <div class=\"xa-box xa-line xa-txt-blue xa-border-bottom\" style=\"padding:8px 20px;\">\r\n                <div class=\"xa-flex\">P20的基础知识（单选题）</div>\r\n                <div class=\"xa-flex xa-txt-right\">总分：20分 题数：10题</div>\r\n            </div>\r\n            <question></question>\r\n            <div class=\"xa-center xa-absolute-bottom\" style=\"background:rgba(0,153,255,0.9)\">\r\n                <div class=\"xa-btn-large xa-bg-white xa-txt-blue\">上一项目</div>\r\n                <div class=\"xa-btn-large xa-txt-white xa-border-white\" style=\"line-height:36px;\">下一项目</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }
/******/ ]);