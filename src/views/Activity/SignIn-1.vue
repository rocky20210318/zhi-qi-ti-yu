<template>
    <div id="SignIn-1">
        <!-- <van-nav-bar class="nav" :border="false" fixed left-arrow @click-left="$router.go(-1)"/> -->
        <div class="img-bg">
            <div><img src="../../assets/SignIn-1-content-1.png" alt=""></div>
            <div v-if="isShow"><img src="../../assets/SignIn-1-content-2.png" alt=""></div>
            <div v-else><img src="../../assets/SignIn-1-content-2-active.png" alt=""></div>
            <div class="rule">
                <h3>活动时间</h3>
                <p class="text">2021年7月10日10:00—2021年7月20日00:00</p>
                <h3>活动规则</h3>
                <p class="text">1、用户进入签到页面签到，只能签到当天日期或补签之前的缺签日期。</p>
                <p class="text">2、如用户出现作弊等违法违规行为我们有权撤销用户参与活动及奖励使用资格，并有权收回用户已经获得的权益。</p>
                <p class="text">3、活动最终解释权归我司所有</p>
            </div>
            <div class="click" @click="showDialog" />
            <basic-footer />
        </div>
    </div>
</template>

<script>
// import { Dialog } from 'vant''
import { getUserData } from '../../services'

export default {
    name: 'SignIn-1',
    components: {
    },
    data () {
        let isShow = true
        if (getUserData() && localStorage.getItem('signIn' + getUserData().userId)) isShow = false
        return {
            isShow
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        showDialog () {
            // console.log(getUserData())
            if (!getUserData()) this.$router.push('/login')
            else if (this.isShow || !localStorage.getItem('signIn' + getUserData().userId)) {
                this.$toast.loading({
                    message: '签到中',
                    forbidClick: true,
                    duration: 2000,
                    onClose: () => {
                        localStorage.setItem('signIn' + getUserData().userId, true)
                        this.isShow = false
                        this.$toast('签到成功')
                    }
                })
            } else this.$toast('今日已签到')
        }
    }
}
</script>
<style lang="scss">
#SignIn-1 {
    .van-nav-bar .van-icon {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#SignIn-1 {
    min-height: 100%    ;
    background: url('../../assets/SignIn-1-bg.png')no-repeat;
    background-size: auto 100%;
    .nav {
        background: transparent;
    }
    .img-bg {
        position: relative;
        padding: 100px 40px 20px;
        img {
            width: 100%;
        }
    }
    .rule {
        h3 {
            padding-top: 20px;
            margin-bottom: 10px;
            font-size: 28px;
            font-weight: 500;
        }
        // position: absolute;
        // bottom: 20px;
        // left: 60px;
        padding: 20px;
        font-size: 24px;
        color: #666;
        line-height: 1.5;
    }
    .click {
        position: absolute;
        top: 430px;
        left: 0;
        right: 0;
        width: 668px;
        height: 484px;
        margin: auto;
        // background: rgba(0,0,0,0.5);
    }
}
</style>
