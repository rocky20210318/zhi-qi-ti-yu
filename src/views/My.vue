<template>
    <div id="my">
        <div class="user-data">
            <!-- <van-row type="flex" align="center" justify="space-between" class="">
                <p class="title">我的</p>
                <router-link to="/message-list"><van-icon name="comment-o" size=".65rem" color="#fff" class="comment-o" /></router-link>
            </van-row> -->
            <van-row type="flex" align="center" class="img-name">
                <div>
                    <img v-if="!userData.userImage" class="user-img" src="../assets/user-category-avatar.png" alt="">
                    <img v-else class="user-img" :src="userData.userImage" alt="">
                </div>
                <router-link v-if="!userData.username" class="user-name" to="/login">登陆/注册</router-link>
                <template v-else>
                    <router-link to="/edit-user">
                        <p class="user-name">{{ userData.username }}</p>
                        <div class="vip">
                            <span>{{ userData.remarks || '点击编辑' }}</span>
                            <van-icon color="#eee" size="16px" name="edit" class="icon" />
                        </div>
                    </router-link>
                    <!-- <router-link to="/edit-user"><van-icon class="edit" size="24px" name="edit" /></router-link> -->
                </template>
            </van-row>
            <!-- <van-row type="flex" align="center" justify="space-between" class="coupon">
                <div>
                    <van-row type="flex" align="center" justify="space-between" class="title">
                        <van-icon size="0.5rem" name="refund-o" class="icon" />
                        <p class="">我的优惠卷</p>
                    </van-row>
                    <p class="quantity"><span class="nub">{{ collectionNub }}</span>张</p>
                </div>
                <router-link to="/my-receive" class="button">查看</router-link>
            </van-row> -->
            <NoticeBar left-icon="volume-o" color="#4E3926" background="rgba(250, 250, 250, 0)" text="即刻开通超级会员，每日享受折上折，更有特权礼品免费拿   "></NoticeBar>
            <router-link to="/" class="member-link"><img src="../assets/member-link.png" alt=""></router-link>
        </div>
        <van-row type="flex" justify="center" align="center" class="coupon-integral">
            <router-link to="" class="item">
                <p class="nub">0</p>
                <p class="title">积分</p>
            </router-link>
            <router-link to="/my-receive" class="item">
                <p class="nub">0</p>
                <p class="title">优惠卷</p>
            </router-link>
            <router-link to="/message-list" class="item">
                <p class="nub">0</p>
                <p class="title">消息</p>
            </router-link>
        </van-row>
        <div class="order">
            <van-row class="top" type="flex" justify="space-between" align="bottom">
                <p class="title">我的订单</p>
                <router-link to="/order-list?showType=0" class="all-order">全部订单<van-icon class="icon" name="arrow" /></router-link>
            </van-row>
            <van-row type="flex" justify="space-around" align="center">
                <router-link to="/order-list?showType=1">
                    <div class="img"><img src="../assets/my-order-icon-1.png" alt=""></div>
                    <p class="text">待付款</p>
                </router-link>
                <router-link to="/order-list?showType=2">
                    <div class="img"><img src="../assets/my-order-icon-2.png" alt=""></div>
                    <p class="text">待发货</p>
                </router-link>
                <router-link to="/order-list?showType=3">
                    <div class="img"><img src="../assets/my-order-icon-3.png" alt=""></div>
                    <p class="text">待收货</p>
                </router-link>
                <router-link to="/order-list?showType=4">
                    <div class="img"><img src="../assets/my-order-icon-4.png" alt=""></div>
                    <p class="text">待评价</p>
                </router-link>
                <router-link to="/order-list?showType=4">
                    <div class="img"><img src="../assets/my-order-icon-5.png" alt=""></div>
                    <p class="text">售后</p>
                </router-link>
            </van-row>
        </div>
        <!-- <div class="banner"><router-link to="/search?keys=软壳衣裤"><img src="../assets/my-banner.jpeg" alt=""></router-link></div> -->
        <!-- <div class="features">
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
                <grid-item class="item" to="/pay-list">
                    <div><img src="../assets/ic_wallet.png" alt=""></div>
                    <p class="text">支付</p>
                </grid-item>
                <grid-item class="item" to="/collect">
                    <div><img src="../assets/ic_heart@2x.png" alt=""></div>
                    <p class="text">收藏</p>
                </grid-item>
                <grid-item @click="customer" class="item">
                    <div><img src="../assets/Shape.png" alt=""></div>
                    <p class="text">联系客服</p>
                </grid-item>
                <grid-item class="item" to="/set">
                    <div><img src="../assets/set.png" alt=""></div>
                    <p class="text">设置</p>
                </grid-item>
            </grid>
        </div> -->
        <CellGroup class="features">
            <Cell title="地址管理" is-link to="/address-list?switchable=false" />
            <Cell title="收藏" is-link to="/collect" />
            <Cell title="联系客服" is-link @click="customer" />
            <Cell title="设置" is-link to="/set" />
        </CellGroup>
        <p class="privacy-agreement">查看用<router-link to="/agreement">《用户协议》</router-link>及<router-link to="/privacy">《隐私协议》</router-link></p>
        <basic-footer />
    </div>
</template>

<script>
import { Cell, CellGroup, Dialog, NoticeBar } from 'vant'
import { logOut, getCouponsList } from '../services'
import AV from 'leancloud-storage'

export default {
    name: 'my',
    components: {
        Cell,
        CellGroup,
        NoticeBar,
        [Dialog.Component.name]: Dialog.Component
    },
    data () {
        return {
            userId: AV.User.current().id,
            userData: {
                username: '',
                remarks: ''
            },
            collectionNub: 0
        }
    },
    computed: {
    },
    async created () {
        await this.getUserData()
        this.collectionNub = getCouponsList().length
    },
    mounted () {
    },
    methods: {
        async getUserData () {
            console.log(this.userId)
            const User = AV.Object.createWithoutData('_User', this.userId)
            await User.fetch().then(data => {
                this.userData = {
                    username: data.get('username'),
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
        },
        customer () {
            Dialog({ message: '全国热线：02169281133' })
        }
    }
}
</script>
<style lang="scss" scoped>
#my {
    // padding: 0 24px;
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
        position: relative;
        z-index: 2;
        height: 416px;
        // margin: 0 -24px;
        padding: 72px 36px 0;
        box-sizing: border-box;
        background: url('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8eebcec8fcc05480c361fa1d5274349bc25fb2c4cb8c8d6d271e9b659d5dd73c') no-repeat;
        // background: linear-gradient(45deg, #90B8FF 0%, #1864FF 100%);
        background-size: 100% auto;
        overflow: hidden;
        .title {
            padding: 30px 0 30px;
            font-size: 36px;
            color: #fff;
        }
        .img-name {
            margin-bottom: 56px;
        }
        .user-img {
            width: 120px;
            height: 120px;
            // padding: 20px;
            margin-right: 32px;
            box-sizing: border-box  ;
            // background: #fff;
            border-radius: 50%;
            vertical-align: top;
        }
        .user-name {
            margin-right: 10px;
            font-size: 36px;
            font-size: 500;
            line-height: 1;
            color: #fff;
            .icon {
                position: relative;
                top: 6px;
                left: 15px;
            }
        }
        .vip {
            position: relative;
            margin-top: 6px;
            color: #eee;
            line-height: 1;
            font-size: 28px;
            // text-decoration: line-through;
            .icon {
                position: relative;
                top: 6px;
                left: 15px;
            }
        }
        .coupon {
            margin-top: 66px;
            padding: 30px;
            color: #fff;
            line-height: 1;
            .icon {
                margin-right: 10px;
            }
            .title {
                margin: 0;
                // margin-left: 10px;
                padding: 0;
                font-size: 28px;
                font-weight: 500;
            }
            .quantity {
                margin-top: 10px;
                font-size: 24px;
                span {
                    margin-right: 16px;
                    font-size: 40px;
                    font-weight: 700;
                }
            }
            .button {
                padding: 14px 34px;
                background-image: linear-gradient(135deg,#ffb990 0%, #ff3241 100%);
                border-radius: 32px;
                font-size: 28px;
                font-weight: 700;
            }
        }
        .member-link {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;
            width: 690px;
            margin: auto;
            img {
                width: 100%;
            }
        }
    }
    .coupon-integral {
        position: relative;
        z-index: 1;
        top: -30px;
        margin: 0 -24px;
        padding: 69px 0 36px;
        background: #fff;
        text-align: center;
        font-size: 24px;
        color: #888;
        > .item {
            position: relative;
            padding: 0 90px;
            .nub {
                font-size: 40px;
                color: #272A33;
            }
            &:nth-child(n+2)::after {
                content: " ";
                position: absolute;
                left: 0;
                bottom: 20px;
                display: block;
                width: 2px;
                height: 42px;
                background: #e1e1ee;
                margin: auto;
            }
        }

    }
    .order {
        margin: 0px 0 30px;
        // padding-bottom: 25px;
        // box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
        // border-radius: 20px;
        background-color: #ffffff;
        // border-radius: 8px;
        .top {
            padding: 30px 30px 0px 30px;
        }
        .title {
            font-size: 36px;
            color: #121314;
        }
        .all-order {
            font-size: 28px;
            color: #3578FF;
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
            max-width: 110px;
            // min-height: 48px;
            vertical-align: middle;
        }
        .text {
            position: relative;
            top: -16px;
            text-align: center;
            color: #888;
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
        // box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.1);
        // border-radius: 20px;
        overflow: hidden;
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
