<template>
    <el-card>
        <template #header>
            <div class="header">
                恭喜你，邮箱已绑定成功
            </div>
        </template>
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
        const router = useRouter()
        onMounted(() => {
            // console.log(router.currentRoute.value);
            // console.log(router.currentRoute.value.query.token);
            sendEmail()
        })
        //发送邮箱已激活
        const sendEmail = () => {
            axios.put('/emails/verification/?token=' + router.currentRoute.value.query.token)
                .then(res => {
                    if (res.data.code == '0') {
                        ElMessage({
                            message: '激活成功',
                            type: 'success'
                        })
                    }
                })
        }


        return {
            ...toRefs(state),
        }
    }
}
</script>


<style scoped>
</style>