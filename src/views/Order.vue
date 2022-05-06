<template>
    <el-card>
        <template #header>
            <div class="header">
                <el-button type="primary" icon="plus" @click="handleAdd">提交订单</el-button>
            </div>
        </template>
        <div>
            收货地址：
            <el-radio-group v-model="radio">
                <el-radio v-for="(value, index) in orderData.addresses" :key="index" :label="index">
                    {{ value.province }}{{ value.city }}{{ value.district }}{{ value.place }}({{ value.receiver }}收)
                </el-radio>
                <!-- <el-radio label="1">下架</el-radio> -->
            </el-radio-group>
        </div>
        <div>
            支付方式：
            <el-radio-group v-model="radioPayMethod">
                <el-radio label="0">
                    货到付款
                </el-radio>
                <el-radio label="1">
                    支付宝
                </el-radio>
                <!-- <el-radio label="1">下架</el-radio> -->
            </el-radio-group>
        </div>
        <div>
            商品总数：
        </div>
        <div>
            <el-card>
                <template #header>
                    <div class="header">
                        商品列表
                    </div>
                    <el-table ref="multipleTable" :data="orderData.skus" show-summary tooltip-effect="dark"
                        style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column prop="name" label="商品名称">
                        </el-table-column>
                        <el-table-column label="图片">
                            <template #default="scope">
                                <img :src="scope.row.default_image_url" alt="" style="height: 100px">
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="商品价格">
                        </el-table-column>
                        <el-table-column prop="count" label="数量">
                        </el-table-column>
                        <el-table-column prop="sum" label="小计">
                        </el-table-column>
                    </el-table>
                </template>
            </el-card>
        </div>
    </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import axios from '@/utils/axios'
import { values } from 'lodash';
export default {
    name: ' ',
    setup() {
        const state = reactive({
            orderData: {},
            radio: 0,
            radioPayMethod: 0,

        })
        const router = useRouter()
        //提交订单
        const handleAdd = () => {
            axios.post('/orders/commit/', {
                address_id: state.orderData.addresses[state.radio]['id'],
                pay_method: state.radioPayMethod*1 + 1
            }).then(res => {
                ElMessage({
                    message: '提交成功!',
                    type: 'success'
                })
                const order_id = res.data.order_id
                axios.get('/payment/'+ order_id +'/').then(res=>{
                    // console.log(res.data.alipay_url);
                    // router.push(res.data.alipay_url)
                    location.href = res.data.alipay_url
                })
                router.push('')
            })
        }
        //获取数据
        const getOrder = () => {
            axios.get('/orders/settlement/').then(res => {
                state.orderData = res.data.context
                console.log(state.orderData);
                console.log(state.orderData.skus);
                for (let i = 0; i < state.orderData.skus.length; i++) {
                    // console.log(value);
                    state.orderData.skus[i]['sum'] = state.orderData.skus[i]['price'] * state.orderData.skus[i]['count']
                    // console.log(state.orderData.skus[i]['price']);
                    // console.log(state.orderData.skus[i]['count']);
                }
                console.log(state.orderData.skus[0]['price']);

                console.log(state.orderData.skus[0]['sum']);
            })
        }
        onMounted(() => {
            getOrder()
        })
        // 选中之后的change方法，一旦选项有变化，就会触发该方法。
        const handleSelectionChange = (val) => {
            state.multipleSelection = val
        }
        //
        // const getSummary = (param) => {
        //     // columns 是所有列的一个数组
        //     // console.log(param);

        //     // const { columns, data } = param;
        //     // const sums = [];
        //     // console.log(data);
        //     // columns.forEach((column, index) => {
        //     //     // column 是每一列，index 表示列的索引，第一列的时候不计算合计，显示自定义的文字内容
        //     //     if (index === 0) {
        //     //         sums[index] = '总价';
        //     //         return;
        //     //     })
        // }
        return {
            ...toRefs(state),
            handleAdd,
            // getSummary,
            handleSelectionChange
        }
    }
}
</script>


<style scoped>
</style>