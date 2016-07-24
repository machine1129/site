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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Xa.defineModule("/error/identity/index", function () {
	    return {
	        template: __webpack_require__(28),
	        data: function data() {
	            return {
	                errorMsg: this.$route.query.msg || '错误页面'
	            };
	        },
	        route: {
	            data: function data(transition) {
	                this.$root.$set('seoPageInfo', {
	                    title: "错误页面",
	                    description: "错误页面"
	                });
	            }
	        },
	        methods: {},
	        events: {},
	        ready: function ready() {}
	    };
	});

/***/ },

/***/ 28:
/***/ function(module, exports) {

	module.exports = "<div class=\"container js_container\">\r\n\r\n    <div class=\"page slideIn msg\">\r\n        <div class=\"weui_msg\">\r\n            <div class=\"weui_icon_area\"><i class=\"weui_icon_msg weui_icon_warn\"></i></div>\r\n            <div class=\"weui_text_area\">\r\n                <!-- <h2 class=\"weui_msg_title\">操作失败</h2> -->\r\n                <p class=\"weui_msg_desc\">{{ errorMsg }}</p>\r\n            </div>\r\n            <div class=\"weui_opr_area\">\r\n                <p class=\"weui_btn_area\">\r\n                    <!-- <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\">后退</a> -->\r\n                    <!-- <a onclick=\"window.close()\" href=\"javascript:;\" class=\"weui_btn weui_btn_default\">关闭</a> -->\r\n                </p>\r\n            </div>\r\n            <!-- <div class=\"weui_extra_area\">\r\n                <a href=\"\">查看详情</a>\r\n            </div> -->\r\n        </div>\r\n</div>\r\n</div>";

/***/ }

/******/ });