import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Index from "../views/Index";
import User from "../views/sys/User";
import Role from "../views/sys/Role";
import Menu from "../views/sys/Menu";
import UserCenter from "../views/UserCenter";
import axios from "../axios";
import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页"
                },
                component: Index
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: "个人中心"
                },
                component: () => import('../views/UserCenter.vue')
            },
            // {
            //     path: '/sys/users',
            //     name: 'SysUser',
            //     component: User
            // },
            // {
            //     path: '/sys/roles',
            //     name: 'SysRole',
            //     component: Role
            // },
            // {
            //     path: '/sys/menus',
            //     name: 'SysMenu',
            //     component: Menu
            // },
        ]
    },

    {
        path: '/login',
        name: 'Login',
        //这种写法表示，不用在头部导入vue组件了，懒加载
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//动态绑定路由
router.beforeEach((to, from, next) => {

    //判断时候还有路由
    let hasRoute = store.state.menus.hasRoute

    let token = localStorage.getItem("token")

    // if (to.path == '/login') {
    //     next()
    //
    // } else if (!token) {
    //     next({path: '/login'})
    //
    //
    // } else
        if(token && !hasRoute) {
        axios.get("/sys/menu/nav", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            //拿到menuList
            store.commit("setMenuList", res.data.data.nav)
            //拿到用户权限
            store.commit("setPermList", res.data.data.authorities)
            //动态绑定路由
            let newRouter = router.options.routes

            res.data.data.nav.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {

                        //专程路由
                        let route = menuToRoute(e)

                        //把路由添加到路由管理中
                        if (route) {
                            newRouter[0].children.push(route)
                        }

                    })
                }
            })

            console.log("newRouters")
            console.log(newRouter)

            router.addRoutes(newRouter)

            hasRoute = true
            store.commit("changeRouteStatus",hasRoute)
        })
    }


    next()
})

//导航转为路由
const menuToRoute = (menu) => {
    if (!menu.component) {
        return null
    }
    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }

    route.component = () => import('../views/' + menu.component + '.vue')
    return route
}

export default router
