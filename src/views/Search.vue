<template>
    <el-card>
        <template #header>
            <div class="header">
                <!-- <el-button type="primary" icon="plus" @click="handleAdd">增加商品</el-button> -->
                <!-- 查找功能后续添加 -->
                <el-input v-model="searchContent" placeholder="Please input" class="input-with-select">
                    <template #prepend>
                        <el-button icon="Search" @click="search">点击查找</el-button>
                    </template>
                </el-input>
                <!-- <el-button type="primary" @click="enterDetail">查找</el-button> -->
            </div>
        </template>
        <el-card v-for="(value, index) in dataList" :key="index" class="box-card" @click="enterDetail(value.id)">
            <template #header>
                {{ value.name }}
            </template>

            <!-- <template #default="scope"> -->
            <img :src="value.default_image_url"  alt="" style="height: 100px">
            <br>
            价格：{{ value.price }}
            <!-- </template> -->

        </el-card>
    </el-card>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios'
export default {
    name: 'Search',
    setup() {
        const state = reactive({
            searchContent: '',
            dataList: []
        })
        const router = useRouter()
        const search = () => {
            axios.get('/search/?q=' + state.searchContent).then(res => {
                console.log(res.data);
                state.dataList = res.data.data_list
                // state.contents = res.data.contents
                // state.categories = res.data.categories
            })
        }
        const enterDetail = (id) => {
            //跳转到路由详情页
            // console.log('haha');
            // router.push('/detail/2')
            // console.log(`/detail/${id}`);
            router.push(`/detail/${id}`)
        }


        return {
            ...toRefs(state),
            search,
            enterDetail
        }
    }
}
</script>


<style scoped>

</style>