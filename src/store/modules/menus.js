import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default {
    // 状态统一管理
    state: {
        menuList: [],
        permList: [],

        //判断是否还有路由
        hasRoute: false,

        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index'
        }]
    },
    //修改状态
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },

        setPermList(state, perms) {
            state.permList = perms
        },

        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
        },

        addTab(state, tab) {

            //避免重复加入
            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            //切换
            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }


            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            state.menuList = []
            state.permList = []
            state.hasRoute = false
            state.editableTabs = [{
                title: '首页',
                name: "Index",
            }]
            state.editableTabsValue = 'Index'
        }


    },
    actions: {},

}
