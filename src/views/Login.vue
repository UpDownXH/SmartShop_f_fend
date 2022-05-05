<!--/src/views/Login.vue-->
<template>
    <div class="login-body">
        <!--登录框div-->
        <div class="login-container">
            <!--登录框头部logo部分-->
            <div class="head">
                <img src="@/assets/logo.png" class="logo">
                <div class="name">
                    <div class="title">智购商城</div>
                    <div class="tips">智慧的购物就来智购商城</div>
                </div>
            </div>
            <!-- 登录表单部分 -->
            <el-form v-if="which" label-position="top" :rules="rules" :model="ruleForm" ref="loginForm"
                class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="service-term">登录表示您已同意<a>《服务条款》</a></div>
                    <el-button class="button-login" type="success" @click="submitForm">登录</el-button>
                    <br>
                    <br>
                    <el-button class="button-login" type="info" @click="register">立即注册</el-button>
                    <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
                </el-form-item>
            </el-form>
            <el-form v-else label-position="top" :rules="rulesRegister" :model="ruleFormRegister"
                ref="loginFormRegister" class="login-form">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model.trim="ruleFormRegister.username" autocomplete="off"></el-input>
                    <!-- <span v-show="ruleFormRegister.error.error_name" class="error_tip">{{ ruleFormRegister.error.error_name_message }}</span> -->
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="ruleFormRegister.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="text" v-model.trim="ruleFormRegister.password2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input type="text" v-model.trim="ruleFormRegister.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图形验证码" prop="image_code">
                    <el-input type="text" v-model.trim="ruleFormRegister.image_code" autocomplete="off"></el-input>
                    <img src="" alt="">
                </el-form-item>
                <el-form-item label="短信验证码" prop="sms_code">
                    <el-input type="text" v-model.trim="ruleFormRegister.sms_code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checkedRegister" @change="!checkedRegister">同意《智购商城使用协议》</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import axios from '@/utils/axios'
import { localSet, localGet } from '@/utils'
export default {
    name: 'Login',
    setup() {
        const loginForm = ref(null)
        const state = reactive({
            which: false,
            ruleForm: {
                username: '',
                password: ''
            },
            ruleFormRegister: {
                username: '',
                password: '',
                password2: '',
                mobile: '',
                image_code: '',
                sms_code: '',
                allow: '',
                error: {
                    error_name: false,
                    error_password: false,
                    error_check_password: false,
                    error_phone: false,
                    error_allow: false,
                    error_sms_code: false,
                    error_name_message: '',
                    error_phone_message: '',
                    error_sms_code_message: '',
                    error_image_code: '',
                }
            },
            checked: true,
            rules: {
                username: [
                    { required: 'true', message: '账户不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: 'true', message: '密码不能为空', trigger: 'blur' }
                ]
            },
            rulesRegister: {
                username: [
                    { required: 'true', message: '账户不能为空', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            var response = {}
                            axios.get('/usernames/' + value + '/count/').then(res => {
                                console.log(res);
                                response = res.data
                                if (response.count == 1) {
                                    console.log(111);
                                    callback(new Error('用户名重复'));
                                } else {
                                    callback();
                                }
                            })
                        }, trigger: 'blur'
                    }
                ],
                password: [
                    { required: 'true', message: '密码不能为空', trigger: 'blur' }
                ]
            },
        })
        const register = () => {
            state.which = false
        }

        const submitForm = async () => {
            loginForm.value.validate((valid) => {
                if (valid) {
                    axios.post('/authorizations/', {
                        username: state.ruleForm.username || '',
                        password: state.ruleForm.password
                    }).then(res => {
                        ElMessage({
                            message: '恭喜，成功登录',
                            type: 'success'
                        })
                        localSet('user_id', res.data.id)
                        localSet('username', res.data.username)
                        localSet('token', res.data.token)
                        window.location.href = '/'
                        console.log(res);
                    }).catch(error => {
                        ElMessage({
                            message: '用户名或密码错误',
                            type: 'error'
                        })
                    });
                } else {
                    ElMessage({
                        message: '请输入账号和密码',
                        type: 'error'
                    })
                    console.log('error submit!!');
                    return false;
                }
            })
        }
        const resetForm = () => {
            loginForm.value.resetFields();
        }

        //注册各方法
        // 弃用，使用规则进行判断
        // const checkUserName = (username) => {
        //     // console.log(username);
        //     // axios.get('/usernames/' + username + '/count/').then(res => {
        //     //     console.log(res);
        //     // })
        //     var re = /^[a-zA-Z0-9_-]{5,20}$/;
        //     var re2 = /^[0-9]+$/;
        //     if (re.test(username) && !re2.test(username)) {
        //         state.ruleFormRegister.error.error_name = false;
        //     } else {
        //         state.ruleFormRegister.error.error_name_message = '请输入5-20个字符的用户名且不能为纯数字';
        //         state.ruleFormRegister.error.error_name = true;
        //     }
        //     // 检查重名
        //     if (state.ruleFormRegister.error.error_name == false) {
        //         axios.get('/usernames/' + username + '/count/').then(response => {
        //             console.log(response)
        //             console.log(response.data)
        //             if (response.data.count > 0) {
        //                 state.ruleFormRegister.error.error_name_message = '用户名已存在';
        //                 state.ruleFormRegister.error.error_name = true;
        //             } else {
        //                 state.ruleFormRegister.error.error_name = false;
        //             }
        //         }).catch(error => {
        //             console.log(error.response);
        //         })
        //     }
        // }
        return {
            ...toRefs(state),
            loginForm,
            submitForm,
            resetForm,
            register,
            // checkUserName
        }
    }
}
</script>

<style scoped>
/* 取消光标选中 */
* {
    user-select: none;
}

.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #61b498;
}

.login-container {
    width: 420px;
    /* height: 400px; */
    background-color: #fff;
    border-radius: 40px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 60px;
    height: 60px;
    margin-top: 10px;
    margin-right: 20px;
}

.head .title {
    font-size: 28px;
    color: #2c313c;
    font-weight: bold;
}

.head .tips {
    font-size: 12px;
    color: #2c313c;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

.button-login {
    width: 100%;
    height: 40px;
    border-radius: 15px;
}

.service-term {
    width: 100%
}

/* 
.login-form>>>.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form>>>.el-form-item {
    margin-bottom: 0;
} */
.error_tip {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-left: 87px;
    color: #e62e2e;
}
</style>