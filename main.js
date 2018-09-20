import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

import VueBus from './vuebus/vue-bus';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);



const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./router/views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./router/views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./router/views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];

const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
})





//vuex启动
const store = new Vuex.Store({
    state: {
        count: 0,
        list: [1,20,4,0,5,10,850]
    },
    mutations: {
        increment (state, n=1){
            state.count += n;
        },
        decrease (state){
            state.count --;
        }
    },
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10);
        }
    },
    actions: {
        //异步
        asyncIncrement(context){
            return new Promise(resolve => {
                setTimeout(()=>{
                    context.commit('increment',5);
                },1000)
            })
        }
    }
})



new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
})