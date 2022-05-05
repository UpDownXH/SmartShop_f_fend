<template>
    <el-card class="introduce">
        <template #header>
            <div class="header">
                <el-button type="primary" icon="plus" @click="handleAdd">查看所有分类</el-button>
            </div>
        </template>
    </el-card>
</template>

<script>
import axios from 'axios'
import { onMounted, onUnmounted } from 'vue'
export default {
    name: 'Category',
    setup() {

        s
        //初始化渲染数据
        onMounted(() => {
            getCategory()
        })

        const getCategory = () => {
            axios.get('/index/').then(res => {
                console.log(res.data);
            })
        }

        const handleAdd = () => {
            
        }
        return {
            handleAdd,




        }
    }
}
</script>


<style scoped>
</style>