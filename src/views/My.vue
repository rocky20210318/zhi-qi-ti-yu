<template>
    <div id="my">
        <div class="user-data">
            <p class="title">我的</p>
            <van-row type="flex" align="center">
                <div><img class="user-img" src="../assets/user-category-avatar.png" alt=""></div>
                <router-link v-if="!userData.username" class="user-name" to="/login">登陆/注册</router-link>
                <template v-else>
                    <div>
                        <p class="user-name">{{ userData.username }}</p>
                        <div class="vip">
                            <!-- VIP
                            <van-icon color="#eee" size="16px" name="fire" class="icon" /> -->
                            <!-- <Button size="mini" color="linear-gradient(180deg,#fcd755 0%,#d81e06 100%)" class="button" to="member">点击编辑</Button> -->
                        </div>
                    </div>
                    <!-- <router-link to="/edit-user"><van-icon class="edit" size="24px" name="edit" /></router-link> -->
                </template>
            </van-row>
        </div>
        <div class="order">
            <van-row class="top" type="flex" justify="space-between" align="bottom">
                <p class="title">我的订单</p>
                <router-link to="/order-list?showType=0" class="all-order">全部订单<van-icon class="icon" name="arrow" /></router-link>
            </van-row>
            <van-row type="flex" justify="space-around" align="center">
                <router-link to="/order-list?showType=1">
                    <div class="img"><img src="../assets/daifukuan.png" alt=""></div>
                    <p class="text">待付款</p>
                </router-link>
                <router-link to="/order-list?showType=2">
                    <div class="img"><img src="../assets/daifahuo-2.png" alt=""></div>
                    <p class="text">待发货</p>
                </router-link>
                <router-link to="/order-list?showType=3">
                    <div class="img"><img src="../assets/daifahuo.png" alt=""></div>
                    <p class="text">待收货</p>
                </router-link>
                <router-link to="/order-list?showType=4">
                    <div class="img"><img src="../assets/daipingjia-2.png" alt=""></div>
                    <p class="text">待评价</p>
                </router-link>
            </van-row>
        </div>
        <div class="banner"><router-link to="/member"><img src="../assets/my-banner.jpeg" alt=""></router-link></div>
        <div class="features">
            <p class="title">其他服务</p>
            <grid class="grid" :border="false">
                <grid-item class="item" to="/message-list">
                    <div><img src="../assets/ic_notification@2x.png" alt=""></div>
                    <p class="text">通知</p>
                </grid-item>
                <grid-item class="item" to="/address-list?switchable=false">
                    <div><img src="../assets/ic_location.png" alt=""></div>
                    <p class="text">地址管理</p>
                </grid-item>
                <!-- <grid-item class="item" to="/pay-list">
                    <div><img src="../assets/ic_wallet.png" alt=""></div>
                    <p class="text">支付</p>
                </grid-item> -->
                <grid-item class="item" to="/collect">
                    <div><img src="../assets/ic_heart@2x.png" alt=""></div>
                    <p class="text">收藏</p>
                </grid-item>
                <grid-item to="feedback" class="item">
                    <div><img src="../assets/Shape.png" alt=""></div>
                    <p class="text">反馈</p>
                </grid-item>
                <grid-item class="item" to="/set">
                    <div><img src="../assets/set.png" alt=""></div>
                    <p class="text">设置</p>
                </grid-item>
            </grid>
        </div>
        <!-- <p class="privacy-agreement">点击查看用<router-link to="/agreement">《用户协议》</router-link>及<router-link to="/privacy">《隐私协议》</router-link></p> -->
        <basic-footer />
    </div>
</template>

<script>
import { Grid, GridItem } from 'vant'
import { logOut } from '../services'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        Grid,
        GridItem
    },
    data () {
        return {
            userId: AV.User.current().id,
            userData: {
                username: '',
                remarks: ''
            }
        }
    },
    computed: {
    },
    async created () {
        await this.getUserData()
    },
    mounted () {
    },
    methods: {
        async getUserData () {
            console.log(this.userId)
            const User = AV.Object.createWithoutData('_User', this.userId)
            await User.fetch().then(data => {
                this.userData = {
                    username: data.get('username') || data.get('mobilePhoneNumber'),
                    remarks: data.get('remarks'),
                    userImage: data.get('userImage')
                }
                console.log(this.userData)
            })
        },
        logOut () {
            this.$toast('已退出登陆')
            logOut()
            setTimeout(() => {
                this.$router.push('/home')
            }, 1.5 * 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
#my {
    padding: 0 24px;
    .setting {
        margin-top: 10px;
        float: right;
    }
    .privacy-agreement {
        margin-top: 50px;
        font-size: 24px;
        color: #888;
        text-align: center;
        a {
            color: #121212;
        }
    }
    .user-data {
        height: 450px;
        margin: 0 -24px;
        padding: 0 36px;
        box-sizing: border-box;
        background: url('../assets/my-top-bg.png') no-repeat;
        background-size: 100%;
        .title {
            padding: 30px 0 30px;
            font-size: 48px;
            color: #fff;
        }
        .user-img {
            width: 120px;
            height: 120px;
            // padding: 20px;
            margin-right: 32px;
            box-sizing: border-box  ;
            background: #fff;
            border-radius: 50%;
            vertical-align: top;
        }
        .user-name {
            margin-right: 10px;
            font-size: 36px;
            line-height: 1;
            color: #fff;
        }
        .vip {
            position: relative;
            margin-top: 6px;
            color: #eee;
            line-height: 1;
            font-size: 28px;
            text-decoration: line-through;
            .icon {
                position: relative;
                top: 4px;
            }
        }
        .button {
            // margin-left: 30px;
        }
        // .edit {
        // }
    }
    .order {
        margin: -110px 0 20px;
        padding-bottom: 25px;
        background-color: #ffffff;
        border-radius: 8px;
        .top {
            padding: 32px 0 15px 26px;
        }
        .title {
            font-size: 36px;
            color: #121314;
        }
        .all-order {
            font-size: 28px;
            color: #888;
        }
        .icon {
            position: relative;
            top: 3px;
        }
        .img {
            margin-top: 20px;
            // height: 48px;
            // line-height: 48px;
            text-align: center;
            // margin-bottom: 20px;
        }
        img {
            max-width: 75px;
            // min-height: 48px;
            vertical-align: middle;
        }
        .text {
            text-align: center;
        }
    }
    .banner {
        width: 100%;
        // height: 134px;
        border-radius: 8px;
        // background: #000;
        img {
            width: 100%;
            vertical-align: top;
        }
    }
    .features {
        margin: 20px 0 30px;
        background-color: #ffffff;
        border-radius: 8px;
        .grid {
            // padding: 0 40px;
        }
        .title {
            padding: 32px 0 40px 26px;
            font-size: 36px;
            color: #121314;
        }
        .item {
            img {
                max-width: 50px;
                // max-height: 36px;
                margin-bottom: 10px;
            }
            .text {
                font-size: 24px;
                color: #4a4a4a;
            }
        }
    }
}
</style>
