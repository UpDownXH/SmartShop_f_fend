<template>
    <el-card>
    </el-card>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
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