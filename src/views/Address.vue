<template>
    <el-card>
        <template #header>
            <div class="header">
                <el-button type="primary" icon="plus" @click="handleAdd">添加所获地址</el-button>
            </div>
        </template>
        <el-table ref="multipleTable" :data="userAddresses" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column prop="title" label="名称" width="100">
            </el-table-column>
            <el-table-column prop="receiver" label="收获人">
            </el-table-column>
            <el-table-column label="所在地区">
                <template #default="scope">
                    {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.district }}
                </template>
            </el-table-column>
            <el-table-column prop="place" label="详细地址">
            </el-table-column>
            <el-table-column prop="mobile" label="手机">
            </el-table-column>
            <el-table-column prop="tel" label="固定电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
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
    <DialogAddAddress ref='addUsers' :reload="fnGetData" :type="type" />
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import axios from '@/utils/axios'
import DialogAddAddress from '@/components/DialogAddAddress.vue'
import { ElMessage } from 'element-plus'
export default {
    name: 'User',
    components: {
        DialogAddAddress
    },
    setup() {
        const addUsers = ref(null)
        const state = reactive({
            userAddresses: [],
            type: 'add',
            multipleSelection: []
        })

        //添加收获地址按钮
        const handleAdd = () => {
            state.type = 'add'
            addUsers.value.open()
        }

        //挂载
        onMounted(() => {
            fnGetData()
        })
        //获取用户地址数据
        const fnGetData = () => {
            // console.log('haha');
            axios.get('/addresses/').then(res => {
                state.userAddresses = res.data.addresses
            })
        }
        // 选中之后的change方法，一旦选项有变化，就会触发该方法。
        const handleSelectionChange = (val) => {
            state.multipleSelection = val
        }
        //删除地址按钮
        const handleDeleteOne = (id) => {
            axios.delete('/addresses/'+id + '/').then(res => {
                if (res.data.code == '0' ) {
                    ElMessage({
                        message: '删除地址成功!',
                        type: 'success'
                    })
                    fnGetData()
                }
            })
        }
        return {
            addUsers,
            ...toRefs(state),
            fnGetData,
            handleSelectionChange,
            handleAdd,
            handleDeleteOne
        }
    }

}
</script>