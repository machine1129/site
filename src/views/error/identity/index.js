Xa.defineModule("/error/identity/index", function(){
    return {
        template: require("./index.html"),
        data:function(){
        	return {
        	   errorMsg:this.$route.query.msg || '错误页面'
        	}
        },
        route:{
            data:function(transition){
                this.$root.$set('seoPageInfo',{
                    title:"错误页面",
                    description:"错误页面"
                });
            }
        },
        methods:{
            
        },
        events:{

        },
        ready:function(){}
    };
})


