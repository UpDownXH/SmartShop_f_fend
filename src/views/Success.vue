<template>
    <el-card>
        <template #header>
            <div class="header">
                订单支付状态
            </div>
        </template>
        <h1>成功支付</h1>
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

        })


        return {
            ...toRefs(state),
        }
    }
}
</script>


<style scoped>
</style>