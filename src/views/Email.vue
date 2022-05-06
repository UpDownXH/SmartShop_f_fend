<template>
    <el-card>
        <template #header>
            <div class="header">
                个人基本信息
            </div>
        </template>
        <div>
            用户名：{{ info.username }}
        </div>
        <div>
            手机号：{{ info.mobile }}
        </div>
        <div v-if="info.email_active == true">
            邮箱：{{ info.email }}
        </div>
        <div v-else-if="info.email != '' && info.email_active == false">
            邮件验证中：{{info.email}}
            <button @click="emailAgain">再次发送验证信息</button>
        </div>
        <div v-else>
            <div>邮箱设置：未绑定</div>
            <el-input v-model="emailContent" placeholder="输入你要绑定的邮箱" class="inputCss">
                <template #append>
                    <el-button @click="setEmail">设置</el-button>
                </template>
            </el-input>
        </div>
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
            info: {},
            emailContent: ''
        })
        //渲染函数
        const getInfo = () => {
            axios.get('/info/', {
                //添加cookie
                withCredentials: true,
            }).then(res => {
                state.info = res.data.info_data
            })
        }
        onMounted(() => {
            getInfo()
        })
        //发送验证信息
        const setEmail = () => {
            // console.log(state.emailContent);
            axios.put('/emails/',{
                //添加cookie
                withCredentials: true,
                // data: {email: state.info.email},
                
            }).then(res => {

            })
        }
        //再次发送验证信息
        const emailAgain = ()=>{
            axios.put('/emails/', {
                email: state.info.email
            }).then(res => {
                console.log(res.data);
            })
        }

        return {
            ...toRefs(state),
            // search,
            setEmail,
            emailAgain
        }
    }
}
</script>


<style scoped>
.inputCss {
    width: 50%;
}
</style>