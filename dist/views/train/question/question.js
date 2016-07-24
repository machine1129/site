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

	module.exports = __webpack_require__(176);


/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(177)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\train\\question\\question.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(178)
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

/***/ 177:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	// <div class="xa-page question">
	//     <header class="xa-header">
	//         <div class="xa-header-icon">
	//             <i class="iconfont icon-htmal5icon30"></i>
	//         </div>
	//         <div @click="" class="xa-btn xa-bg-blue-click">筛选</div>
	//     </header>
	//     <div class="xa-page-container">
	//         <table class="xa-table xa-txt-center">
	//             <thead>
	//                 <tr>
	//                     <th><div>题目</div></th>
	//                     <th><div>分类</div></th>
	//                     <th><div>题型</div></th>
	//                     <th><div>添加时间</div></th>
	//                     <th><div>添加人</div></th>
	//                     <th><div>操作</div></th>
	//                 </tr>
	//             </thead>
	//             <tbody>
	//                 <tr v-for="item in queryData.data" class="xa-border-bottom">
	//                     <td><span class="text">{{ item.remark }}</span></td>
	//                     <td><span class="text">{{ item.cat_id }}</span></td>
	//                     <td>{{ item.type | type }}</td>
	//                     <td>{{ item.create_at }}</td>
	//                     <td>{{ item.create_by }}</td>
	//                     <td style="padding:0 10px;height:40px;width:80px;">
	//                         <div class="xa-icon-boxs">
	//                             <div class="xa-icon-box">
	//                                 <i class="iconfont icon-bianji xa-txt-20"></i>
	//                             </div>
	//                             <div class="xa-icon-box">
	//                                 <i class="iconfont icon-jinyong xa-txt-20"></i>
	//                             </div>
	//                         </div>
	//                     </td>
	//                 </tr>
	//             </ul>
	//         </table>
	//     </div>
	//     <xa-paging :page.sync="query.p" :record-count="queryData.recordCount" :psize="query.psize"></xa-paging>
	// </div>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            query: {
	                p: 1,
	                psize: 20
	            },
	            queryData: {
	                recordCount: 0,
	                pageCount: 0,
	                data: []

	            }
	        };
	    },

	    props: ['service'],
	    events: {
	        onPageChange: function onPageChange(p) {
	            this.getQueryData();
	        }
	    },
	    methods: {
	        getQueryData: function getQueryData() {
	            var _this = this;

	            this.$root.isLoading = true;
	            this.service.getQuestionList(this.query).then(function (data) {
	                if (!data) return;
	                _this.queryData = data;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this.$root.isLoading = false;
	            });
	        }
	    },
	    route: {
	        data: function data(_ref) {
	            var next = _ref.next;

	            this.$root.title = '题库管理';
	        }
	    },
	    ready: function ready() {
	        this.getQueryData();
	    }
	};

	// </script>

/***/ },

/***/ 178:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"xa-page question\">\r\n    <header class=\"xa-header\">\r\n        <div class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-htmal5icon30\"></i>\r\n        </div>\r\n        <div @click=\"\" class=\"xa-btn xa-bg-blue-click\">筛选</div>\r\n    </header>\r\n    <div class=\"xa-page-container\">\r\n        <table class=\"xa-table xa-txt-center\">\r\n            <thead>\r\n                <tr>\r\n                    <th><div>题目</div></th>\r\n                    <th><div>分类</div></th>\r\n                    <th><div>题型</div></th>\r\n                    <th><div>添加时间</div></th>\r\n                    <th><div>添加人</div></th>\r\n                    <th><div>操作</div></th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr v-for=\"item in queryData.data\" class=\"xa-border-bottom\">\r\n                    <td><span class=\"text\">{{ item.remark }}</span></td>\r\n                    <td><span class=\"text\">{{ item.cat_id }}</span></td>\r\n                    <td>{{ item.type | type }}</td>\r\n                    <td>{{ item.create_at }}</td>\r\n                    <td>{{ item.create_by }}</td>\r\n                    <td style=\"padding:0 10px;height:40px;width:80px;\">\r\n                        <div class=\"xa-icon-boxs\">\r\n                            <div class=\"xa-icon-box\">\r\n                                <i class=\"iconfont icon-bianji xa-txt-20\"></i>\r\n                            </div>\r\n                            <div class=\"xa-icon-box\">\r\n                                <i class=\"iconfont icon-jinyong xa-txt-20\"></i>\r\n                            </div>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </ul>\r\n        </table>\r\n    </div>\r\n    <xa-paging :page.sync=\"query.p\" :record-count=\"queryData.recordCount\" :psize=\"query.psize\"></xa-paging>\r\n</div>\r\n";

/***/ }

/******/ });