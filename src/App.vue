<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <el-aside class="aside">
        <!-- 系统名称，logo -->
        <div class="head">
          <div>
            <img src="@/assets/logo.png" alt="logo">
            <span>智购商城</span>
          </div>
        </div>
        <!-- 分割线 -->
        <div class="line"></div>
        <!-- menu主菜单 -->
        <el-menu :router="true" background-color="#222832" text-color="#fff">
          <!-- menu子菜单 -->
          <el-sub-menu index="1">
            <!-- 子菜单标题 -->
            <template #title>
              <span>
                商城
              </span>
            </template>
            <!-- menu子子菜单 -->
            <el-menu-item-group>
              <!-- menu子子子菜单 -->
              <el-menu-item index="/intruduce">
                <el-icon>
                  <home-filled />
                </el-icon>商城介绍
              </el-menu-item>
              <el-menu-item index="/">
                <el-icon>
                  <home-filled />
                </el-icon>商城主页
              </el-menu-item>
              <el-menu-item index="/search">
                <el-icon>
                  <home-filled />
                </el-icon>搜索列表
              </el-menu-item>
              <el-menu-item index="/detail">
                <el-icon>
                  <home-filled />
                </el-icon>商品详细信息
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>
                我的购物车
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cart">
                <el-icon>
                  <home-filled />
                </el-icon>购物车商品
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>
                我的订单
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-icon>
                  <home-filled />
                </el-icon>订单
              </el-menu-item>
              <el-menu-item>
                <el-icon>
                  <home-filled />
                </el-icon>支付
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>
                个人中心
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item>
                <el-icon>
                  <home-filled />
                </el-icon>邮件验证
              </el-menu-item>
              <el-menu-item>
                <el-icon>
                  <home-filled />
                </el-icon>所获地址
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <!--路径匹配到的组件，将会展示在这里-->
          <router-view></router-view>
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { localGet, pathMap } from '@/utils'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const router = useRouter()//使用路由
    const noMenu = ['/login']//不需要菜单的路径数组
    const state = reactive({
      showMenu: true,//是否需要显示菜单
    })

    //监听路由的变化
    router.beforeEach((to, from, next) => {
      if (to.path == '/login') {
        // 如果路径是 /login 则正常执行
        next()
      } else {
        // 如果不是 /login，判断是否有 token
        if (!localGet('username')) {
          // 如果没有，则跳至登录页面
          next({ path: '/login' })
        } else {
          // 否则继续执行
          next()
        }
      }
      state.showMenu = !noMenu.includes(to.path)
      document.title = pathMap[to.name]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.layout {
  min-width: 100vh;
  background-color: #61b498;
}

.container {
  height: 100vh;
}

.aside {
  width: 200px !important;
  background-color: #3d4955;
}

.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.head>div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.head span {
  font-size: 20px;
  color: #ffffff;
}

.line {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}

.main {
  /* 添加 Header 和 Footer 之后，main 的高度应该是 100vh - 100px */
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>