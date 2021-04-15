<template>
    <div v-if="isShow" id="privacy">
        <van-dialog v-model="isShow" title="个人信息保护指引" confirmButtonText="同意" cancelButtonText="不同意" show-cancel-button @confirm="confirm">
            <div class="text">
                感谢您信任并使用正京体育！我们非常重视您的个人信息和隐私保护。<br/>
                1、在浏览使用时，我们会收集、使用设备标识信息用于推荐。<br/>
                2、我们可能会申请位置权限，用于帮助您确定收获地址。<br/>
                3、我们可能会申请存储权限，用于发布下载图文及缓存相关内容。<br/>
                4、您可查看完整版<router-link to="/privacy">《隐私政策》</router-link>与<router-link to="/agreement">《用户协议》</router-link>以便了解我们收集、使用、共享、存储信息情况及对信息的保护措施<br/>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { Dialog } from 'vant'

export default {
    name: 'privacy-alter',
    props: {
    },
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    data () {
        return {
            isShow: !localStorage.getItem('isShosPrivacy')
        }
    },
    created () {
    },
    methods: {
        confirm () {
            this.isShow = false
            localStorage.setItem('isShosPrivacy', true)
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 28px;
    padding: 40px;
    color: #333;
    a {
        color: #1989fa;
    }
}
</style>
