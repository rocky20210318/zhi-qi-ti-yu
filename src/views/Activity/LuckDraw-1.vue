<template>
    <div id="LuckDraw-1">
        <van-nav-bar class="nav" :border="false" fixed left-arrow @click-left="$router.go(-1)"/>
        <div class="img-bg">
            <div><img src="../../assets/LuckDraw-1-content-1.png" alt=""></div>
            <div class="bg">
                <img id="wheel-bg" :style="`transform: rotate(${rotate}deg)`" src="../../assets/LuckDraw-1-content-2.png" alt="">
                <img class="pointer" src="../../assets/LuckDraw-1-content-3.png" alt="">
            </div>
            <div class="rule">
                <h3>活动时间</h3>
                <p class="text">2021年1月15日10:00—2021年2月1日00:00</p>
                <h3>活动规则</h3>
                <p class="text">1、活动期间注册的新用户登录商城，每日可免费3次抽奖。</p>
                <p class="text">2、如用户出现作弊等违法违规行为我们有权撤销用户参与活动及奖励使用资格，并有权收回用户已经获得的权益。</p>
                <p class="text">3、活动最终解释权归我司所有</p>
            </div>
            <div class="click" @click="showDialog" />
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
import { getUserData } from '../../services'

export default {
    name: 'LuckDraw-1',
    components: {
    },
    data () {
        let lotteryNub = 0
        if (getUserData() && localStorage.getItem('lottery' + getUserData().userId)) lotteryNub = Number(localStorage.getItem('lottery' + getUserData().userId))
        return {
            rotate: 0,
            Prohibit: false,
            lotteryNub
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
            if (this.Prohibit) return false
            if (!getUserData()) this.$router.push('/login')
            else if (this.lotteryNub < 3) {
                this.rotate === 3665 ? this.rotate = 60 : this.rotate = 3665
                localStorage.setItem(('lottery' + getUserData().userId), this.lotteryNub++)
                this.Prohibit = true
                setTimeout(() => {
                    this.Prohibit = false
                    Dialog({ message: '还差一点就中奖咯～' })
                }, 4000)
            } else this.$toast('今日抽奖机会已用尽')
        }
    }
}
</script>
<style lang="scss">
#LuckDraw-1 {
    .van-nav-bar .van-icon {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#LuckDraw-1 {
    min-height: 100%    ;
    background: url('../../assets/LuckDraw-1-bg.png')no-repeat;
    background-size: auto 100%;
    .nav {
        background: transparent;
    }
    .img-bg {
        padding: 100px 40px 0;
        position: relative;
        img {
            width: 100%;
        }
    }
    .rule {
        h3 {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 28px;
            font-weight: 500;
        }
        // position: absolute;
        // bottom: 20px;
        // left: 60px;
        padding: 20px;
        font-size: 24px;
        color: #fff;
        line-height: 1.5;
    }
    .click {
        position: absolute;
        top: 350px;
        left: 0;
        right: 0;
        width: 668px;
        height: 660px;
        margin: auto;
        // background: rgba(0,0,0,0.5);
    }
    .pointer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100px!important;
        margin: auto;
        padding-bottom: 40px;
    }
    #wheel-bg {
        transition: transform 4s ease-in-out;
        // transform: rotate(3665deg)
    }
}
</style>
