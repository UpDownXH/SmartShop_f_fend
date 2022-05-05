<!--Header.vue-->
<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <!-- <i class="icon el-icon-s-custom" /> -->
            <el-icon>
              <avatar />
            </el-icon>
            {{ userInfo && userInfo.loginUserName || '' }}
            <!-- <i class="el-icon-caret-bottom" /> -->
            <el-icon>
              <caret-bottom />
            </el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ userInfo && userInfo.loginUserName || '' }}</p>
          <p>管理员ID：{{ userInfo && userInfo.nickName || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router"
import { localGet, localRemove, pathMap } from '@/utils'
export default {
  name: 'Header',
  setup() {
    const router = useRouter()

    const state = reactive({
      name: 'dashboard',
      userInfo: {
        loginUserName: null,
        nickName: null
      }
    })
    // 初始化执行方法
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || ''
      if (!['login'].includes(pathname)) {
        state.userInfo.loginUserName = localGet('username')
        state.userInfo.nickName = localGet('user_id')
      }
    })
    //退出登录
    const logout = () => {
      //退出之后，将本地保存的token清理掉
      // localRemove('token')
      //回到登录页
      router.push({ path: '/login' })
      // axios.delete('/logout').then(() => {
      //   //退出之后，将本地保存的token清理掉
      //   localRemove('token')
      //   //回到登录页
      //   router.push({ path: '/login' })
      // })
    }



    router.afterEach((to) => {
      // console.log('to',to);
      const { id } = to.query
      state.name = pathMap[to.name]
    })

    return {
      ...toRefs(state),
      logout
    }
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.right>div>.icon {
  font-size: 18px;
  margin-right: 6px;
}

.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>

<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}

.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}

.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>