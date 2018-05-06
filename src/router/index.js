import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewStu from '@/components/NewStu'
import QrScanner from '@/components/QrScanner'
import ViewStu from '@/components/ViewStu'
import EditStu from '@/components/EditStu'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-stu',
      component: NewStu,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/qrscanner',
      name: 'qrscanner',
      component: QrScanner,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:stu_id',
      name: 'view-stu',
      component: ViewStu,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:stu_id',
      name: 'edit-stu',
      component: EditStu,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Vue導航守衛
router.beforeEach((to, from, next)=>{
  // 檢查是否有身份驗證守衛(requiresAuth)
  if(to.matched.some(record => record.meta.requiresAuth)){
    // Check if Not Logged in
    if(!firebase.auth().currentUser){
      // Go to Login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      // 繼續路由
      next()
    }
  // 檢查是否為訪客
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    // Check if Logged in
    if(firebase.auth().currentUser){
      // Go to Login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      // 繼續路由
      next()
    }
  }else{
    // 繼續路由
    next()
  }
})

export default router

