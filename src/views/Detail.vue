<template>
    <el-card>
        <template #header>
            <div class="header">
                {{ good.name }}
                <!-- <button>{{name}}</button> -->
            </div>
        </template>

        <el-image :src="good.default_image" class="image"></el-image>
        <div>
            价钱：{{ good.price }}
        </div>
        <div>
            市场价格：{{ good.market_price }}
        </div>
        <div>
            库存：{{ good.stock }}
        </div>


        <div class="bottom">
            <button @click="addCart">添加到购物车</button>
        </div>
    </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import axios from '@/utils/axios'
export default {
    name: 'Detail',
    // props: ['id'],
    setup() {
        const state = reactive({
            good: []
        })
        const router = useRouter()
        onMounted(() => {
            // console.log(router.currentRoute.value.params.id);
            getDetail()
        })
        //axios请求
        const getDetail = () => {
            axios.get('/detail/' + router.currentRoute.value.params.id + '/').then(res => {
                state.good = res.data.data
                console.log(state.good);
            })
        }
        //添加购物车请求
        const addCart = () => {
            axios.post('/carts/', {
                count: 1,
                sku_id: router.currentRoute.value.params.id
            }, {
                // 添加cookie认证
                withCredentials: true,
            }).then(res => {
                if (res.status == 200) {
                    ElMessage({
                        message: '添加购物车成功',
                        type: 'success'
                    })

                } else {
                    ElMessage({
                        message: '添加购物车失败',
                        type: 'info'
                    })
                }
            })
        }
        return {
            ...toRefs(state),
            addCart
        }
    }
}
</script>


<style scoped>
.image {
    /* margin: 0 auto; */
    height: 100px;
    margin-left: 50%;
    transform: translate(-50%);
}

.bottom {
    width: 100%;
}
</style>