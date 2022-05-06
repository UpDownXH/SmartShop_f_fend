<template>
    <el-card>
        <template #header>
            <div class="header">
                <el-button type="primary" icon="plus" @click="handleAdd">完全支付</el-button>
            </div>
        </template>
        <el-table ref="multipleTable" :data="cartDate" tooltip-effect="dark" style="width: 100%">
            @selection-change="handleSelectionChange">
            <!-- <el-table-column prop="selected" label="勾选" type="selection">
            </el-table-column> -->
            <el-table-column prop="id" label="id" width="100">
            </el-table-column>
            <el-table-column prop="name" label="商品名">
            </el-table-column>
            <el-table-column label="图">
                <template #default="scope">
                    <el-image :src="scope.row.default_image_url" class="image"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价钱">
            </el-table-column>
            <el-table-column prop="count" label="数量">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <!-- <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.id)">支付</a> -->
                    <el-popconfirm title="确定从购物车中删除吗" confirmButtonText='确定' cancelButtonText='取消'
                        @confirm="handleDeleteOne(scope.row.id)">
                        <template #reference>
                            <a style="cursor: pointer">删除</a>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import axios from '@/utils/axios'
export default {
    name: ' ',
    setup() {
        const state = reactive({
            cartDate: []
        })
        //初始化函数
        const getCart = () => {
            axios.get('/carts/', {
                // 添加cookie认证
                withCredentials: true,
            }).then(res => {
                state.cartDate = res.data.cart_skus
            })
        }
        //挂载
        onMounted(() => {
            getCart()
        })
        // 选中之后的change方法，一旦选项有变化，就会触发该方法。
        const handleSelectionChange = (val) => {
            state.multipleSelection = val
            console.log(state.multipleSelection);
        }
        //支付按钮
        const handleAdd = (id) => {
            console.log(1);
        }
        //删除按钮
        const handleDeleteOne = (id) => {
            axios.delete('/carts/', {
                //添加cookie
                withCredentials: true,
                data: {sku_id: id},
                
            }).then(res => {
                if (res.status == 200) {
                    ElMessage({
                        message: '移除成功!',
                        type: 'success'
                    })
                    getCart()
                }
            }).catch(err => {
                ElMessage({
                    message: 'oops,出错了',
                    type: 'info'
                })
            });
        }
        return {
            ...toRefs(state),
            handleSelectionChange,
            handleAdd,
            handleDeleteOne
        }
    }
}
</script>


<style scoped>
.image {
    height: 100px;
}
</style>