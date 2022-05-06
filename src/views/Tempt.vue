<template>
    <el-card>
        <template #header>
            <div class="header">
                占位
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


        return {
            ...toRefs(state),
        }
    }
}
</script>


<style scoped>
</style>