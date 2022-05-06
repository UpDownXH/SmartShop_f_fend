<template>
    <el-dialog :title="type == 'add' ? '新增收货地址' : '修改商品'" v-model="visible" width="800px">
        <el-form :model="addressForm" :rules="rules" ref="formRef" label-width="100px" class="good-form">
            <el-form-item label="收货人:">
                <el-input type="text" v-model="addressForm.receiver" autocomplete="off" size="small"
                    class="input_width">
                </el-input>
            </el-form-item>
            <el-form-item label="所在地区:">
                <el-cascader :props="category" @change="handleChangeCate" />
            </el-form-item>
            <el-form-item label="详细地址:">
                <el-input type="text" v-model="addressForm.place" autocomplete="off" size="small"
                    class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input type="text" v-model="addressForm.mobile" autocomplete="off" size="small" class="input_width">
                </el-input>
            </el-form-item>
            <el-form-item label="固定电话:">
                <el-input type="text" v-model="addressForm.tel" autocomplete="off" size="small" class="input_width">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-input type="text" v-model="addressForm.email" autocomplete="off" size="small" class="input_width">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('addressForm')">提交</el-button>
                <el-button @click="cancel()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import axios from '@/utils/axios'
export default {
    name: 'DialogAddAddress',
    props: {
        type: String,//add 为新增，edit为编辑
        reload: Function //table刷新的方法
    },
    setup(props) {
        //formRef用于表单校验控制
        const formRef = ref(null)
        const state = reactive({
            visible: false,//控制弹窗的显示隐藏
            edit_id: '',
            addressForm: {
                city_id: '',
                district_id: '',
                email: '',
                mobile: '',
                place: '',
                province_list: '',
                receiver: '',
                tel: '',
                title: '',
            },
            rules: {
                mobile: [
                    { required: 'true', message: '手机号不能为空', trigger: 'blur' },
                    {
                        pattern: /^1[34578]\d{9}$/,
                        message: '手机格式不正确',
                        trigger: 'blur'
                    },
                ]
            },
            //所有地区
            areas: [],
            //级联框动态加载
            category: {
                lazy: true,
                lazyLoad(node, resolve) {
                    const { level = 0, value = 110000 } = node
                    // console.log('haha');
                    // console.log(state.areas);
                    if (state.areas.length == 0) {
                        // console.log('haha1');
                        axios.get('/areas/').then(res => {
                            // console.log('haha2');
                            // console.log(res);
                            state.areas = res.data.province_list
                            // console.log(state.areas);

                            const list = res.data.province_list
                            const nodes = list.map(item => ({
                                value: item.id,
                                label: item.name,
                                leaf: level > 1
                            }))
                            resolve(nodes)
                        })
                    } else {
                        axios.get('/areas/' + value + '/').then(res => {
                            const list = res.data.sub_data.subs
                            const nodes = list.map(item => ({
                                value: item.id,
                                label: item.name,
                                leaf: level > 1
                            }))
                            resolve(nodes)
                        })
                    }
                }
            }
        })
        // 联动函数
        const handleChangeCate = (val) => {
            console.log(val);
            state.addressForm.province_id = val[0]
            state.addressForm.district_id = val[1]
            state.addressForm.city_id = val[2]
            // console.log(val);
            // state.categoryId = val[2] || 0
        }
        //提交表单
        const submitForm = () => {
            formRef.value.validate((valid) => {
                if (valid) {
                    axios.post('/addresses/create/', {
                        "province_id": state.addressForm.province_id,
                        "city_id": state.addressForm.city_id,
                        "district_id": state.addressForm.district_id,
                        "email": state.addressForm.email,
                        "mobile": state.addressForm.mobile,
                        "place": state.addressForm.place,
                        "receiver": state.addressForm.receiver,
                        "tel": state.addressForm.tel,
                        "title": state.addressForm.receiver,
                    }).then(res => {
                        ElMessage({
                            message: '添加地址成功!',
                            type: 'success'
                        })
                        state.visible = false
                        if (props.reload) props.reload()
                    })
                    // axios.post('/users/', {
                    //     "username": state.addressForm.username,
                    //     "mobile": state.addressForm.mobile,
                    //     "password": state.addressForm.password,
                    //     "email": state.addressForm.email
                    // }).then(res => {
                    //     if (res.status == 201) {
                    // ElMessage({
                    //     message: '添加用户成功!',
                    //     type: 'success'
                    // })
                    //         state.visible = false;
                    //     }
                    //     if (props.reload) props.reload()
                    // }).catch(err => {
                    //     if (err.response.status == 400) {
                    //         ElMessage({
                    //             message: err.response.data.name[0],
                    //             type: 'info'
                    //         })
                    //     }
                    // })
                } else {
                    console.log('error submit!!')
                    return false;
                }
            })
        }
        //开启弹窗，此方法将在父组件，通过ref直接调用
        const open = () => {
            state.visible = true
            // state.addressForm = {
            //     username: '',
            //     password: '',
            //     passcheck: '',
            //     mobile: '',
            //     email: ''
            // }
            state.addressForm = {
                city_id: '',
                district_id: '',
                email: '',
                mobile: '',
                place: '',
                province_list: '',
                receiver: '',
                tel: '',
                title: '',
            }

        }
        //关闭弹窗
        const close = () => {
            state.visible = false
            state.addressForm = {
                city_id: '',
                district_id: '',
                email: '',
                mobile: '',
                place: '',
                province_list: '',
                receiver: '',
                tel: '',
                title: '',
            }
        }
        //取消时重置表格
        const cancel = () => {
            state.visible = false
            formRef.value.resetFields();
        }
        //预挂载函数
        // const getAllAreas = () => {
        //     axios.get('/areas/').then(res => {
        //         state.areas = res.data.province_list
        //         console.log(state.areas);
        //     })
        // }
        //挂载
        // onMounted(() => {
        //     getAllAreas()
        // })

        return {
            formRef,
            ...toRefs(state),
            submitForm,
            open,
            cancel,
            handleChangeCate
        }
    }
}
</script>