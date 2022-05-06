<template>
  <el-card class="introduce">
    <template #header>
      <div class="header">
        <el-button type="primary" icon="plus" @click="drawer = true">查看所有分类</el-button>
      </div>
    </template>

    <h1>火热手机</h1>
    <el-space wrap class="space">
      <el-card v-for="(value, index) in contents.index_1f_ssxp" :key="index" class="box-card">
        <template #header>
          {{ value.title }}
        </template>
        <img :src="value.image" alt="" style="height: 100px">
        <br>
        价格：{{ value.text }}
      </el-card>
    </el-space>
    <br>
    <h1>最受欢迎的电子产品</h1>
    <el-space wrap class="space">
      <el-card v-for="(value, index) in contents.index_2f_cxdj" :key="index" class="box-card">
        <template #header>
          {{ value.title }}
        </template>
        <img :src="value.image" alt="" style="height: 100px">
        <br>
        价格：{{ value.text }}
      </el-card>
    </el-space>
    <br>
    <h1>生活用品</h1>
    <el-space wrap class="space">
      <el-card v-for="(value, index) in contents.index_3f_cfyp" :key="index" class="box-card">
        <template #header>
          {{ value.title }}
        </template>
        <img :src="value.image" alt="" style="height: 100px">
        <br>
        价格：{{ value.text }}
      </el-card>
    </el-space>
    <br>
  </el-card>
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <!-- <el-tree :data="content" :props="defaultProps" @node-click="handleNodeClick" /> -->
    <el-card v-for="(key, val, i) in categories" :key="i" class="box-card-side">

      <template #header>
        <button v-for="(value, index) in key['channels']" :key="index">{{ value.name }}</button>
      </template>
      <el-card v-for="(value, index) in key['sub_cats']" :key="index" class="lastParentCards">
        <template #header>
          <button>{{ value.name }}</button>
        </template>
        <button v-for="(key1, val1, i1) in value['sub_cats']" :key="i1">{{ key1.name }}</button>
      </el-card>


      <br>
    </el-card>
  </el-drawer>
</template>

<script>
import axios from '@/utils/axios'
import { reactive, toRefs, ref, onMounted, onUnmounted } from 'vue'
export default {
  name: 'Category',
  setup() {
    const drawer = ref(false)
    const state = reactive({
      contents: {},
      categories: {},

    })

    //初始化渲染数据
    onMounted(() => {
      getCategory()
    })

    const getCategory = () => {
      axios.get('/index/').then(res => {
        console.log(res.data);
        state.contents = res.data.contents
        state.categories = res.data.categories
      })
    }

    const handleAdd = () => {

    }
    return {
      drawer,
      ...toRefs(state),
      handleAdd,




    }
  }
}
</script>


<style scoped>
.space {
  display: flex;
  justify-content: space-between;
}


.box-card {
  margin-bottom: 40px;
  width: 250px
}

.box-card-side {
  margin-bottom: 40px;
  width: 450px;
  background-color: #305a4c;
}
.lastParentCards {
  margin-bottom: 30px;
}
</style>