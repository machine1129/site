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

	module.exports = __webpack_require__(53);


/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(54)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\train\\exam\\exam.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(61)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./exam.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _add = __webpack_require__(55);

	var _add2 = _interopRequireDefault(_add);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            step: 1,
	            isShowDialog: false,
	            typeData: [],
	            query: {
	                start_date: ''
	            },
	            queryData: {
	                data: []
	            },
	            addQuery: {
	                number: '',
	                title: '',
	                is_train: 1,
	                type: '1',
	                train: '',
	                ratio: '',
	                start_date: '',
	                timeout: '',
	                cat_id: [],
	                remark: '',
	                item: [{
	                    name: '',
	                    score: '',
	                    remark: '',
	                    range: [{
	                        type: '',
	                        cat_id: '',
	                        sum: 1
	                    }]
	                }]
	            }
	        };
	    },

	    props: ['service'],
	    components: {
	        add: _add2.default
	    },
	    events: {
	        confirmlSubmitEvent: function confirmlSubmitEvent() {
	            var _this = this;

	            this.$log('addQuery');
	            this.$root.isLoading = true;
	            this.service.addExam(this.addQuery).then(function (data) {
	                _this.queryData.push(data);
	                _this.isShowDialog = false;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this.$root.isLoading = false;
	            });
	        }
	    },
	    methods: {
	        getQueryData: function getQueryData() {
	            var _this2 = this;

	            this.$root.isLoading = true;
	            this.service.getExamList(this.query).then(function (data) {
	                _this2.queryData = data;
	            }, function (err) {
	                err && alert(err);
	            }).finally(function () {
	                _this2.$root.isLoading = false;
	            });
	        },
	        getTypeData: function getTypeData() {
	            var _this3 = this;

	            this.service.getCategoryList({ type: 2 }).then(function (data) {
	                _this3.typeData = data;
	            }, function (err) {
	                err && alert(err);
	            });
	        },
	        submitSearch: function submitSearch() {
	            console.log(this.query);
	        },
	        showAddExamDialog: function showAddExamDialog() {
	            this.isShowDialog = true;
	        }
	    },
	    route: {
	        data: function data(_ref) {
	            var next = _ref.next;

	            this.$root.title = '考试管理';
	        }
	    },
	    ready: function ready() {
	        this.getQueryData();
	        this.getTypeData();
	    }
	};

	// </script>
	// <template>
	// <div class="xa-page exam">
	//     <header class="xa-header">
	//         <div class="xa-header-icon">
	//             <i class="iconfont icon-htmal5icon30"></i>
	//         </div>
	//         <div @click="showAddExamDialog" title="创建考试" class="xa-header-icon">
	//             <i class="iconfont icon-tianjia"></i>
	//         </div>
	//         <div class="xa-date-box">
	//             <span>创建时间</span>
	//             <xa-date :value.sync="query.start_date"></xa-date>
	//             <div class="dropdown"><i class="iconfont icon-jiantouxia"></i></div>
	//         </div>
	//         <div @click="submitSearch" class="xa-btn xa-bg-blue-click">筛选</div>
	//
	//     </header>
	//     <div class="xa-page-container">
	//         <table class="xa-table xa-txt-center">
	//             <thead>
	//                 <tr>
	//                     <th><div>考试编号</div></th>
	//                     <th><div>考试标题</div></th>
	//                     <th><div>分类</div></th>
	//                     <th><div>创建时间</div></th>
	//                     <th><div>考试时间</div></th>
	//                     <th><div>创建人</div></th>
	//                     <th><div>操作</div></th>
	//                 </tr>
	//             </thead>
	//             <tbody>
	//                 <tr v-for="item in queryData.data"  class="xa-border-bottom">
	//                     <td>{{ item.number }}</td>
	//                     <td><a v-link="{path:'/train/exam/paper?id='+item.id}" class="text xa-txt-blue">{{ item.title }}</a></td>
	//                     <td><span class="text">{{ item.cat_id }}</span></td>
	//                     <td>{{ item.create_at }}</td>
	//                     <td>{{ item.start_date }}</td>
	//                     <td>{{ item.create_by }}</td>
	//                     <td style="width:200px;max-width:200px;padding:0 10px;"><span class="xa-btns"><span class="xa-btn-min xa-bg-blue-click">修改</span><span class="xa-btn-min xa-bg-red-click">删除</span></span></td>
	//                 </tr>
	//             </ul>
	//         </table>
	//     </div>
	//     <add :step.sync="step" :show.sync="isShowDialog" :query.sync="addQuery" :type-data="typeData"></add>
	//
	// </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(56)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\exam\\add.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(60)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./add.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _module2 = __webpack_require__(57);

	var _module3 = _interopRequireDefault(_module2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            dialog: {
	                title: '创建考试-基本信息',
	                buttons: [{
	                    text: '取消',
	                    className: '',
	                    clickEvent: 'cancelEvent'
	                }, {
	                    text: '下一步',
	                    className: 'xa-bg-blue-click',
	                    clickEvent: 'toNextStepEvent'
	                }]
	            }
	        };
	    },

	    props: {
	        step: {
	            type: Number,
	            default: 1,
	            twoWay: true
	        },
	        query: {
	            type: Object,
	            twoWay: true
	        },
	        show: {
	            type: Boolean,
	            default: false,
	            twoWay: true
	        },
	        typeData: {
	            type: Array,
	            default: []
	        }
	    },
	    events: {
	        cancelEvent: function cancelEvent() {
	            this.show = false;
	        },
	        toNextStepEvent: function toNextStepEvent() {
	            this.step = 2;
	        },
	        toPreStepEvent: function toPreStepEvent() {
	            this.step = 1;
	        },
	        addModuleEvent: function addModuleEvent() {
	            this.query.item.push({
	                name: '',
	                score: '',
	                remark: '',
	                range: [{
	                    type: '',
	                    cat_id: '',
	                    sum: 1
	                }]
	            });
	        },
	        deleteModuleEvent: function deleteModuleEvent(ix) {
	            if (this.query.item.length == 1) {
	                console.log('最后一个也删？');
	            }
	            this.query.item.splice(ix, 1);
	        },
	        confirmlEvent: function confirmlEvent() {
	            this.$dispatch('confirmlSubmitEvent');
	        }
	    },
	    components: {
	        module: _module3.default
	    },
	    watch: {
	        step: function step(val) {
	            if (val == 1) {
	                this.dialog.title = '创建考试-基本信息';
	                this.dialog.buttons = [{
	                    text: '取消',
	                    className: '',
	                    clickEvent: 'cancelEvent'
	                }, {
	                    text: '下一步',
	                    className: 'xa-bg-blue-click',
	                    clickEvent: 'toNextStepEvent'
	                }];
	            } else if (val == 2) {
	                this.dialog.title = '创建考试-模块信息';
	                this.dialog.buttons = [{
	                    text: '添加模块',
	                    className: '',
	                    clickEvent: 'addModuleEvent'
	                }, {
	                    text: '上一步',
	                    className: '',
	                    clickEvent: 'toPreStepEvent'
	                }, {
	                    text: '提交',
	                    className: '',
	                    clickEvent: 'confirmlEvent'
	                }, {
	                    text: '取消',
	                    className: '',
	                    clickEvent: 'cancelEvent'
	                }];
	            }
	        }
	    }
	};
	// </script>
	// <template>
	//     <xa-prompt :title="dialog.title" :buttons="dialog.buttons" :show.sync="show">
	//         <div style="width:800px;padding:10px 20px;">
	//             <table v-show="step == 1" class="xa-table xa-txt-right">
	//                 <tbody>
	//                     <tr>
	//                         <td class="xa-width-100"><label>考试编号</label></td>
	//                         <td><input v-model="query.number" placeholder="输入考试编号" type="text" class="form-control"></td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>考试标题</label></td>
	//                         <td>
	//                             <input v-model="query.title" placeholder="输入考试标题" type="text" class="form-control">
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>课程考核</label></td>
	//                         <td class="xa-txt-left">
	//                             <label><input type="radio" value="1" v-model="query.is_train" name="istrain">是</label>
	//                             <label style="margin-left:20px;"><input type="radio" value="2" v-model="query.is_train" name="istrain">否</label>
	//                         </td>
	//                     </tr>
	//                     <tr v-show="query.is_train == 1">
	//                         <td><label>课程编号</label></td>
	//                         <td>
	//                             <select v-model="query.train" class="form-control">
	//
	//                             </select>
	//                         </td>
	//                     </tr>
	//                     <tr v-show="query.is_train == 1">
	//                         <td><label>综合成绩占比</label></td>
	//                         <td>
	//                             <input v-model="query.ratio" placeholder="输入综合成绩占比" type="text" class="form-control">
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>考试形式</label></td>
	//                         <td>
	//                             <select v-model="query.type" class="form-control">
	//                                 <option value="1">考卷形式</option>}
	//                                 <option value="2">口试或实操形式</option>}
	//                             </select>
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>考试日期</label></td>
	//                         <td>
	//                             <input v-model="query.start_date" type="datetime-local" class="form-control">
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>考试时长</label></td>
	//                         <td>
	//                             <input v-model="query.timeout" placeholder="输入考试时长（单位：分钟）" min="1" type="number" class="form-control">
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>包含分类</label></td>
	//                         <td>
	//                             <select v-model="query.cat_id" multiple class="form-control">
	//                                 <option v-for="item in typeData" :value="item.id">{{{ item.name }}}</option>
	//                             </select>
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td><label>分类描述</label></td>
	//                         <td>
	//                             <textarea v-model="query.remark" class="form-control" rows="4" style="resize:vertical;"></textarea>
	//                         </td>
	//                     </tr>
	//                 </tbody>
	//             </table>
	//             <table v-show="step == 2" class="xa-table xa-txt-right">
	//                 <tbody is="module" :type-data="typeData" v-for="item in query.item" :index="$index" :module="item"></tbody>
	//             </table>
	//         </div>
	//     </xa-prompt>
	// </template>
	//
	// <script>

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(58)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] component\\exam\\module.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./module.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 58:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <tbody style="border:1px solid #eee;border-top:2px solid white;">
	//         <tr @click="show=!show">
	//             <td colspan="2" style="padding:0;padding-left:10px;background:#eee;">
	//                 <div class="xa-box">
	//                     <div class="xa-flex" style="line-height:40px;text-align:left;">{{ module.name }}</div>
	//                     <div class="xa-icon-boxs">
	//                         <div @click.stop="deleteModule" class="xa-icon-box">
	//                             <i class="iconfont icon-shanchu xa-txt-20"></i>
	//                         </div>
	//                         <div class="xa-icon-box" :class="{'xa-toggle':!show,'xa-toggle-up':show}">
	//                             <i class="iconfont icon-jiantouxia xa-txt-20"></i>
	//                         </div>
	//                     </div>
	//                 </div>
	//             </td>
	//         </tr>
	//         <tr v-show="show">
	//             <td class="xa-width-100"><label>模块名称</label></td>
	//             <td>
	//                 <input v-model="module.name" placeholder="请输入模块名称" type="text" class="form-control">
	//             </td>
	//         </tr>
	//         <tr v-show="show">
	//             <td><label>满分</label></td>
	//             <td>
	//                 <input v-model="module.score" placeholder="请输入该模块分值" type="number" class="form-control">
	//             </td>
	//         </tr>
	//         <tr v-show="show">
	//             <td><label>试题范围</label></td>
	//             <td class="exam-range">
	//                 <div v-for="item in module.range" class="xa-box">
	//                     <div class="xa-flex">
	//                         <label>题型：<select v-model="item.type" class="form-control" style="display:inline-block;width:140px;margin-right:12px;">
	//                             <option value="1">单选题</option>
	//                             <option value="2">多选题</option>
	//                             <option value="3">判断题</option>
	//                         </select></label>
	//                         <label>分类：<select v-model="item.cat_id" class="form-control" style="display:inline-block;width:200px;margin-right:12px;">
	//                             <option v-for="item in typeData" :value="item.id">{{{ item.name }}}</option>
	//                         </select></label>
	//                         <label>题数：<input v-model="item.sum" type="number" min="1" class="form-control" style="display:inline-block;width:100px;"></label>   
	//                     </div>
	//                     <div @click="addRange" v-show="module.range.length-1 == $index" class="xa-icon-box add-range" title="添加试题范围"><i class="iconfont icon-2 xa-txt-20"></i></div>
	//                 </div>
	//             </td>
	//         </tr>
	//     </tbody>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            show: true
	        };
	    },

	    methods: {
	        addRange: function addRange() {
	            this.module.range.push({ type: '', cat_id: '', sum: 1 });
	        },
	        deleteModule: function deleteModule() {
	            this.$dispatch('deleteModuleEvent', this.index);
	        }
	    },
	    props: {
	        module: Object,
	        typeData: Array,
	        index: Number
	    }
	};
	// </script>

/***/ },

/***/ 59:
/***/ function(module, exports) {

	module.exports = "\n<tbody style=\"border:1px solid #eee;border-top:2px solid white;\">\n    <tr @click=\"show=!show\">\n        <td colspan=\"2\" style=\"padding:0;padding-left:10px;background:#eee;\">\n            <div class=\"xa-box\">\n                <div class=\"xa-flex\" style=\"line-height:40px;text-align:left;\">{{ module.name }}</div>\n                <div class=\"xa-icon-boxs\">\n                    <div @click.stop=\"deleteModule\" class=\"xa-icon-box\">\n                        <i class=\"iconfont icon-shanchu xa-txt-20\"></i>\n                    </div>\n                    <div class=\"xa-icon-box\" :class=\"{'xa-toggle':!show,'xa-toggle-up':show}\">\n                        <i class=\"iconfont icon-jiantouxia xa-txt-20\"></i>\n                    </div>\n                </div>\n            </div>\n        </td>\n    </tr>\n    <tr v-show=\"show\">\n        <td class=\"xa-width-100\"><label>模块名称</label></td>\n        <td>\n            <input v-model=\"module.name\" placeholder=\"请输入模块名称\" type=\"text\" class=\"form-control\">\n        </td>\n    </tr>\n    <tr v-show=\"show\">\n        <td><label>满分</label></td>\n        <td>\n            <input v-model=\"module.score\" placeholder=\"请输入该模块分值\" type=\"number\" class=\"form-control\">\n        </td>\n    </tr>\n    <tr v-show=\"show\">\n        <td><label>试题范围</label></td>\n        <td class=\"exam-range\">\n            <div v-for=\"item in module.range\" class=\"xa-box\">\n                <div class=\"xa-flex\">\n                    <label>题型：<select v-model=\"item.type\" class=\"form-control\" style=\"display:inline-block;width:140px;margin-right:12px;\">\n                        <option value=\"1\">单选题</option>\n                        <option value=\"2\">多选题</option>\n                        <option value=\"3\">判断题</option>\n                    </select></label>\n                    <label>分类：<select v-model=\"item.cat_id\" class=\"form-control\" style=\"display:inline-block;width:200px;margin-right:12px;\">\n                        <option v-for=\"item in typeData\" :value=\"item.id\">{{{ item.name }}}</option>\n                    </select></label>\n                    <label>题数：<input v-model=\"item.sum\" type=\"number\" min=\"1\" class=\"form-control\" style=\"display:inline-block;width:100px;\"></label>    \n                </div>\n                <div @click=\"addRange\" v-show=\"module.range.length-1 == $index\" class=\"xa-icon-box add-range\" title=\"添加试题范围\"><i class=\"iconfont icon-2 xa-txt-20\"></i></div>\n            </div>\n        </td>\n    </tr>\n</tbody>\n";

/***/ },

/***/ 60:
/***/ function(module, exports) {

	module.exports = "\n<xa-prompt :title=\"dialog.title\" :buttons=\"dialog.buttons\" :show.sync=\"show\">\n    <div style=\"width:800px;padding:10px 20px;\">\n        <table v-show=\"step == 1\" class=\"xa-table xa-txt-right\">\n            <tbody>\n                <tr>\n                    <td class=\"xa-width-100\"><label>考试编号</label></td>\n                    <td><input v-model=\"query.number\" placeholder=\"输入考试编号\" type=\"text\" class=\"form-control\"></td>\n                </tr>\n                <tr>\n                    <td><label>考试标题</label></td>\n                    <td>\n                        <input v-model=\"query.title\" placeholder=\"输入考试标题\" type=\"text\" class=\"form-control\">\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>课程考核</label></td>\n                    <td class=\"xa-txt-left\">\n                        <label><input type=\"radio\" value=\"1\" v-model=\"query.is_train\" name=\"istrain\">是</label>\n                        <label style=\"margin-left:20px;\"><input type=\"radio\" value=\"2\" v-model=\"query.is_train\" name=\"istrain\">否</label>\n                    </td>\n                </tr>\n                <tr v-show=\"query.is_train == 1\">\n                    <td><label>课程编号</label></td>\n                    <td>\n                        <select v-model=\"query.train\" class=\"form-control\">\n                            \n                        </select>\n                    </td>\n                </tr>\n                <tr v-show=\"query.is_train == 1\">\n                    <td><label>综合成绩占比</label></td>\n                    <td>\n                        <input v-model=\"query.ratio\" placeholder=\"输入综合成绩占比\" type=\"text\" class=\"form-control\">\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>考试形式</label></td>\n                    <td>\n                        <select v-model=\"query.type\" class=\"form-control\">\n                            <option value=\"1\">考卷形式</option>}\n                            <option value=\"2\">口试或实操形式</option>}\n                        </select>\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>考试日期</label></td>\n                    <td>\n                        <input v-model=\"query.start_date\" type=\"datetime-local\" class=\"form-control\">\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>考试时长</label></td>\n                    <td>\n                        <input v-model=\"query.timeout\" placeholder=\"输入考试时长（单位：分钟）\" min=\"1\" type=\"number\" class=\"form-control\">\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>包含分类</label></td>\n                    <td>\n                        <select v-model=\"query.cat_id\" multiple class=\"form-control\">\n                            <option v-for=\"item in typeData\" :value=\"item.id\">{{{ item.name }}}</option>\n                        </select>\n                    </td>\n                </tr>\n                <tr>\n                    <td><label>分类描述</label></td>\n                    <td>\n                        <textarea v-model=\"query.remark\" class=\"form-control\" rows=\"4\" style=\"resize:vertical;\"></textarea>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        <table v-show=\"step == 2\" class=\"xa-table xa-txt-right\">\n            <tbody is=\"module\" :type-data=\"typeData\" v-for=\"item in query.item\" :index=\"$index\" :module=\"item\"></tbody>\n        </table>\n    </div>\n</xa-prompt>\n";

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"xa-page exam\">\r\n    <header class=\"xa-header\">\r\n        <div class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-htmal5icon30\"></i>\r\n        </div>\r\n        <div @click=\"showAddExamDialog\" title=\"创建考试\" class=\"xa-header-icon\">\r\n            <i class=\"iconfont icon-tianjia\"></i>\r\n        </div>\r\n        <div class=\"xa-date-box\">\r\n            <span>创建时间</span>\r\n            <xa-date :value.sync=\"query.start_date\"></xa-date>\r\n            <div class=\"dropdown\"><i class=\"iconfont icon-jiantouxia\"></i></div>\r\n        </div>\r\n        <div @click=\"submitSearch\" class=\"xa-btn xa-bg-blue-click\">筛选</div>\r\n\r\n    </header>\r\n    <div class=\"xa-page-container\">\r\n        <table class=\"xa-table xa-txt-center\">\r\n            <thead>\r\n                <tr>\r\n                    <th><div>考试编号</div></th>\r\n                    <th><div>考试标题</div></th>\r\n                    <th><div>分类</div></th>\r\n                    <th><div>创建时间</div></th>\r\n                    <th><div>考试时间</div></th>\r\n                    <th><div>创建人</div></th>\r\n                    <th><div>操作</div></th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr v-for=\"item in queryData.data\"  class=\"xa-border-bottom\">\r\n                    <td>{{ item.number }}</td>\r\n                    <td><a v-link=\"{path:'/train/exam/paper?id='+item.id}\" class=\"text xa-txt-blue\">{{ item.title }}</a></td>\r\n                    <td><span class=\"text\">{{ item.cat_id }}</span></td>\r\n                    <td>{{ item.create_at }}</td>\r\n                    <td>{{ item.start_date }}</td>\r\n                    <td>{{ item.create_by }}</td>\r\n                    <td style=\"width:200px;max-width:200px;padding:0 10px;\"><span class=\"xa-btns\"><span class=\"xa-btn-min xa-bg-blue-click\">修改</span><span class=\"xa-btn-min xa-bg-red-click\">删除</span></span></td>\r\n                </tr>\r\n            </ul>\r\n        </table>\r\n    </div>\r\n    <add :step.sync=\"step\" :show.sync=\"isShowDialog\" :query.sync=\"addQuery\" :type-data=\"typeData\"></add>\r\n\r\n</div>\r\n";

/***/ }

/******/ });