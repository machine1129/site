/**
    map:路由配置
    alias:别名配置
    redirect:重定向配置
*/
var registerComponent = name => {
    var url = "./views" + name + ".js";
    var v = window.VERSION && VERSION[url] ? '?v=' + VERSION[url] : '';
    return resolve=>{
        Vue.http.get(url+v).then(rs => {
            resolve(Function("return "+rs.data)());
            // resolve(eval(rs.data));
        });   
    }
}

var map = {
    /* 培训 */
    '/train':{
        'component':registerComponent("/train/index"),
        'subRoutes':{
            "/overview":{
                component:registerComponent("/train/overview/overview")
            },
            '/category':{
                component:registerComponent("/train/category/category")
            },
            '/question':{
                component:registerComponent("/train/question/question")
            },
            '/exam':{
                component:registerComponent("/train/exam/exam")
            },
            '/exam/detail':{
                component:registerComponent("/train/exam/detail"),
            },
            '/exam/paper':{
                component:registerComponent("/train/exam/paper"),
            },
            '/docs':{
                component:registerComponent("/train/docs/docs")
            },
            '/knowledge':{
                component:registerComponent("/train/knowledge/knowledge")
            },
            '/course':{
                component:registerComponent("/train/course/course")
            },
            '/lecturer':{
                component:registerComponent("/train/lecturer/lecturer")
            },
        },
    },
    '/login':{
        component:registerComponent("/user/login")
    },
    '*':{
        component:registerComponent('/error/404')
    },
};
var alias = {
    '/':'/login',
};
var redirect = {

};

export {map,alias,redirect}