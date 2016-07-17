<template>
<div>
    <router-view class="vue-view" transition="vue" transition-mode="out-in"></router-view>
    <!-- 加载中 -->
    <div class="xa-loading xa-txt-blue" :class="{'show':isLoading}">
        <i class="iconfont icon-jiazai xa-txt-24 xa-txt-bold"></i>
    </div>
</div>
</template>
<script>
export default {
	data(){
        return{
            title:"培训平台",
            isLoading:false,
        }
    },
    watch:{
        'title'(val){
            document.title = val;
        }
    }
}
</script>