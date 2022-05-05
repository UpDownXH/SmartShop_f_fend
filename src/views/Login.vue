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
                    <el-input type="password" v-model.trim="ruleFormRegister.password2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input type="text" v-model.trim="ruleFormRegister.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图形验证码" prop="image_code">
                    <el-input type="text" v-model.trim="ruleFormRegister.image_code" autocomplete="off"></el-input>
                    <img :src="ruleFormRegister.image_code_url" alt="" @click="changeImageCode" class="more">
                </el-form-item>
                <el-form-item label="短信验证码" prop="sms_code">
                    <el-input type="text" v-model.trim="ruleFormRegister.sms_code" autocomplete="off">
                        <template #append>
                            <el-button type="info" @click="sendSmsCode" :disabled="ruleFormRegister.sendingFlag">
                                {{ ruleFormRegister.smsInfo }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checkedRegister" @change="!checkedRegister">同意《智购商城使用协议》</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-login" type="success" @click="sendRegister">立即注册</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-login" type="info" @click="returnLogin">返回登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import axios from '@/utils/axios'
import { localSet, localGet } from '@/utils'
import { onMounted } from '@vue/runtime-core'
export default {
    name: 'Login',
    setup() {
        const loginForm = ref(null)
        const state = reactive({
            which: true,
            checked: true,
            checkedRegister: true,
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
                allow: false,
                error_image_code_message: '',
                // 图形验证码:
                image_code_id: '',
                image_code_url: '',
                smsInfo: '获取短信验证码',
                sendingFlag: false,
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
                },
            },
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
                        pattern: /^\w{5,20}$/,
                        message: '用户名是5到20位数字、字母或下划线',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            var response = {}
                            axios.get('/usernames/' + value + '/count/').then(res => {
                                console.log(res);
                                response = res.data
                                if (response.count == 1) {
                                    console.log(111);
                                    state.ruleFormRegister.error.error_name = false
                                    callback(new Error('用户名重复'));
                                } else {
                                    state.ruleFormRegister.error.error_name = true
                                    callback();
                                }
                            })
                        }, trigger: 'blur'
                    }
                ],
                password: [
                    { required: 'true', message: '密码不能为空', trigger: 'blur' },
                    {
                        pattern: /^\w{8,20}$/,
                        message: '密码是8到20位数字、字母或下划线',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            console.log(value);
                            if (value == '') {
                                state.ruleFormRegister.error.error_password = false
                                callback();
                            } else {
                                state.ruleFormRegister.error.error_password = true
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                password2: [
                    {
                        validator: (rule, value, callback) => {
                            console.log(value);
                            if (value === '') {
                                state.ruleFormRegister.error.error_check_password = false
                                callback(new Error('请再次输入密码'));
                            } else if (value !== state.ruleFormRegister.password) {
                                state.ruleFormRegister.error.error_check_password = false
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                state.ruleFormRegister.error.error_check_password = true
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                mobile: [
                    { required: 'true', message: '手机号不能为空', trigger: 'blur' },
                    {
                        pattern: /^1[34578]\d{9}$/,
                        message: '手机格式不正确',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            var response = {}
                            axios.get('/mobiles/' + value + '/count/').then(res => {
                                // console.log(res);
                                response = res.data
                                if (response.count == 1) {
                                    // console.log(111);
                                    state.ruleFormRegister.error.error_phone = false
                                    callback(new Error('手机号已注册'));
                                } else {
                                    state.ruleFormRegister.error.error_phone = true
                                    callback();
                                }
                            })
                        }, trigger: 'blur'
                    }
                ],
                image_code: [
                    { required: 'true', message: '验证码不能为空', trigger: 'blur' },
                ],
                sms_code: [
                    { required: 'true', message: '短信验证码不能为空', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            console.log(value);
                            if (value == '') {
                                state.ruleFormRegister.error.error_sms_code = false
                                callback();
                            } else {
                                state.ruleFormRegister.error.error_sms_code = true
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
            },
        })
        const register = () => {
            state.which = false
        }

        const submitForm = async () => {
            loginForm.value.validate((valid) => {
                if (valid) {
                    axios.post('/login/', {
                        username: state.ruleForm.username || '',
                        password: state.ruleForm.password,
                        remembered: state.checkedRegister
                    }, {
                        responseType: 'json',
                        // 发送请求的时候, 携带上cookie
                        withCredentials: true,
                        // crossDomain: true
                    }).then(res => {
                        ElMessage({
                            message: '恭喜，成功登录',
                            type: 'success'
                        })
                        // localSet('user_id', res.data.id)
                        // localSet('username', res.data.username)
                        // localSet('token', res.data.token)
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

        // 生成一个图片验证码的编号，并设置页面中图片验证码img标签的src属性
        const generate_image_code = () => {
            // 生成uuid
            var generateUUID = () => {
                var d = new Date().getTime();
                if (window.performance && typeof window.performance.now === "function") {
                    d += performance.now(); //use high-precision timer if available
                }
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }
            state.ruleFormRegister.image_code_id = generateUUID();
            var response = {}
            axios.get('/image_codes/' + state.ruleFormRegister.image_code_id + '/').then(res => {
                state.ruleFormRegister.image_code_url = 'http://192.168.178.137:8000/image_codes/' + state.ruleFormRegister.image_code_id + '/'
            })
        }
        //onMounted
        onMounted(() => {
            generate_image_code()
        })
        //改变图片验证码
        const changeImageCode = () => {
            generate_image_code()
        }

        //获取短信验证码
        const sendSmsCode = () => {
            axios.get('/sms_codes/' + state.ruleFormRegister.mobile + '/' + '?image_code=' + state.ruleFormRegister.image_code
                + '&image_code_id=' + state.ruleFormRegister.image_code_id).then(res => {
                    state.ruleFormRegister.image_code_url = 'http://192.168.178.137:8000/image_codes/' + state.ruleFormRegister.image_code_id + '/'
                    if (res.data.code == 0) {
                        // 表示后端发送短信成功
                        // 倒计时60秒，60秒后允许用户再次点击发送短信验证码的按钮
                        console.log('发送短信成功');
                        var num = 60;
                        // 设置一个计时器
                        var t = setInterval(() => {
                            console.log('定时器');
                            if (num == 1) {
                                // 如果计时器到最后, 清除计时器对象
                                clearInterval(t);
                                // 将点击获取验证码的按钮展示的文本回复成原始文本
                                state.ruleFormRegister.smsInfo = '获取短信验证码';
                                // 将点击按钮的onclick事件函数恢复回去
                                state.ruleFormRegister.sendingFlag = false;
                            } else {
                                num -= 1;
                                // 展示倒计时信息
                                state.ruleFormRegister.smsInfo = num + '秒';
                            }
                        }, 1000, 60)
                    } else {
                        ElMessage({
                            message: res.data.errmsg,
                            type: 'info'
                        })
                    }
                })
        }
        //发送注册信息
        const sendRegister = () => {
            if (state.ruleFormRegister.error.error_name == true
                && state.ruleFormRegister.error.error_password == true
                && state.ruleFormRegister.error.error_check_password == true
                && state.ruleFormRegister.error.error_phone == true
                && state.ruleFormRegister.error.error_sms_code == true
                && state.checkedRegister == true) {
                console.log(11);
                axios.post('/register/', {
                    username: state.ruleFormRegister.username,
                    password: state.ruleFormRegister.password,
                    password2: state.ruleFormRegister.password2,
                    mobile: state.ruleFormRegister.mobile,
                    sms_code: state.ruleFormRegister.sms_code,
                    allow: state.checkedRegister
                }).then(res => {
                    // console.log("lol");
                    // console.log(res);
                    // console.log(res.data);
                    // console.log(res.data.code);
                    // router.push({ path: '/index' })
                    // console.log("为什么啊");
                    if (res.data.code == "0") {
                        console.log("内部");
                        // router.push({ path: '/login' })
                        ElMessage({
                            message: '注册成功',
                            type: 'info'
                        })
                        state.which = true

                    } else if (res.data.code == 400) {
                        ElMessage({
                            message: res.data.errmsg,
                            type: 'info'
                        })
                    }
                }).catch(error => {
                    ElMessage({
                        message: "oops,出错了",
                        type: 'info'
                    })
                })
            } else {
                ElMessage({
                    message: '请完整填写表单',
                    type: 'info'
                })
            }

        }
        //返回登录
        const returnLogin = () => {
            state.which = true
        }
        return {
            ...toRefs(state),
            loginForm,
            submitForm,
            resetForm,
            register,
            changeImageCode,
            sendSmsCode,
            sendRegister,
            returnLogin
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

.more {
    width: 120px;
}
</style>