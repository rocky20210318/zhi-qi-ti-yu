<template>
    <div>
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="订单确认" />
        <div>
            <div class="content">
                <div class="address-wrap">
                    <van-row type="flex" justify="space-between" align="center" @click.native="addressClick">
                        <!-- <img
                            src="../assets/address.png"
                            class="location-img"
                        > -->
                        <van-icon name="map-marked" size="38" class="location-img" color="#faa641" />
                        <div v-if="addressInfo" class="information" >
                            <div>
                                <span class="name">{{ addressInfo.name }}</span>
                                <span class="phone">{{ addressInfo.tel }}</span>
                            </div>
                            <div class="address">{{ `${addressInfo.province} ${addressInfo.city} ${addressInfo.county} ${addressInfo.addressDetail}` }}</div>
                        </div>
                        <div class="text" v-else>点击填写收货地址</div>
                    </van-row>
                </div>
                <!-- <div class="address-wrap">
                    <div class="information coupon" @click="isShowCouponList = true">
                        <div v-if="!activeCoupon">使用优惠卷</div>
                        <div v-else class="red">
                            <span v-if="activeCoupon.min === '0.00'">{{ activeCoupon.discount }}元无门槛优惠卷</span>
                            <span v-else>满{{ activeCoupon.min }}减{{ activeCoupon.discount }}元优惠卷</span>
                        </div>
                    </div>
                </div> -->
                <coupon-cell
                    :coupons="couponList"
                    :chosen-coupon="chosenCoupon"
                    @click="isShowCouponList = true"
                    class="address-wrap"
                />
                <ul class="book-list">
                    <li
                        v-for="(item, index) in data"
                        :key="index"
                    >
                        <van-row type="flex" justify="space-between" align="center" class="book-detail">
                            <img :src="item.thumbnail">
                            <div>
                                <h5>{{ item.title }}</h5>
                                <!-- <p
                                    class="desc"
                                    v-html="item.mediaSale.mediaList[0].descs"
                                /> -->
                                <van-row type="flex" justify="space-between" align="center">
                                    <p class="amount">¥{{ item.price }}</p>
                                    <span v-if="!$parent.canHandle">x{{ item.buyCount }}</span>
                                </van-row>
                            </div>
                        </van-row>
                        <van-row type="flex" justify="space-between" align="center" class="distribution">
                            <span>配送方式:</span><span>活动包邮</span>
                        </van-row>
                    </li>
                </ul>
            </div>
        </div>
        <footer>
            <van-row type="flex" justify="space-between" align="center" class="footer-wrap">
                <span class="totals">¥{{ total }}</span>
                <a
                    class="buy-btn"
                    @click="isShowAlter = true"
                >立即购买</a>
            </van-row>
        </footer>
        <div
            v-if="isModal"
            class="modal"
        >
            <div class="modal-content">
                <h1>下单成功</h1>
                <p>
                    订单账号: {{ $route.params.id }}
                </p>
            </div>
        </div>
        <van-dialog
            v-model="isShowAlter"
            title="订单确认"
            message="请确认下单信息无误"
            show-cancel-button
            @confirm="orderConfirmation"
        />
        <div v-html="htmlContent" />
        <div v-show="isShowPayMethod" class="payMethod" @click="isShowPayMethod = false">
            <ul class="payList">
                <!-- <li><p class="">支付宝、微信支付正在接入中</p></li> -->
                <li v-if="isTestAccount" @click="handleBuy"><img src="../assets/zhifubao.png">支付宝</li>
                <li><router-link to="/credit-card"><img src="../assets/xinyongka.png">信用卡</router-link></li>
            </ul>
        </div>
        <!-- 优惠券列表 -->
        <popup
            v-model="isShowCouponList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;"
        >
            <coupon-list
                :coupons="couponList"
                :chosen-coupon="chosenCoupon"
                class="coupon-list"
                @change="clickCoupon"
                @exchange="$toast('优惠码无效')"
            />
        </popup>
    </div>
</template>

<script>
import { Dialog, CouponCell, CouponList, popup } from 'vant'
import { getAddressDefault, getCart, orderSubmit, orderAlipay, getUserData, couponSelectlist, orderPay201 } from '../services'
// import alter from '../components/alter'

export default {
    name: 'index',
    components: {
        [Dialog.Component.name]: Dialog.Component,
        CouponCell,
        CouponList,
        popup
    },
    data () {
        return {
            addressInfo: undefined,
            isModal: false,
            isShowAlter: false,
            data: [],
            cartId: this.$route.query.cartId || null,
            htmlContent: '',
            couponList: [],
            isShowCouponList: false,
            isShowPayMethod: false,
            chosenCoupon: 0 // 当前选中优惠券的索引
        }
    },
    computed: {
        // 选中的优惠卷
        activeCoupon () {
            return this.couponList[this.chosenCoupon] || {}
        },
        total () {
            let total = 0
            this.data.forEach((item) => {
                total += item.price * item.buyCount
                // console.log(item)
            })
            if (this.activeCoupon.value) {
                total -= this.activeCoupon.value / 100
            }
            total = total < 0 ? 0 : total
            return total.toFixed(2)
        },
        isTestAccount () {
            return getUserData().nickName === '19965412404'
        }
    },
    async created () {
        this.data = await this.getData()
        if (this.data.length === 0) this.$router.push('/order?showType=1')
        this.getCoupon()
    },
    async mounted () {
        this.addressInfo = await getAddressDefault()
    },
    methods: {
        // 选择优惠卷
        clickCoupon (index) {
            this.isShowCouponList = false
            this.chosenCoupon = index
        },
        async getCoupon () {
            this.couponList = await couponSelectlist(this.cartId || 0)
            // console.log(this.couponList)
        },
        async handleBuy () {
            if (this.addressInfo) {
                // this.$toast('支付宝接入中，请使用信用卡支付')
                const couponId = this.activeCoupon.id || 0
                const orderId = await orderSubmit({
                    cartId: this.cartId || 0,
                    addressId: this.addressInfo.id,
                    couponId: couponId
                })
                this.htmlContent = await orderAlipay(orderId)
                await orderPay201(orderId)
                this.isModal = true
                setTimeout(() => {
                    this.$router.replace('/order-list?showType=1')
                }, 2000)
            } else {
                this.$toast('请填写收货地址')
            }
        },
        addressClick () {
            this.$router.push('/address-list')
        },
        orderConfirmation (nub) {
            this.isShowAlter = false
            // if (nub === 0) {
            setTimeout(() => {
                this.isShowPayMethod = true
            }, 500)
            // }
        },
        async getData () {
            const cartId = this.cartId
            const data = await getCart(cartId)
            console.log(data)
            return data.filter((item) => item.checked)
        }
    }
}
</script>

<style lang="scss">
.coupon-list {
    .van-coupon-list__bottom .van-button--danger,
    .van-tabs__line {
        border: 0;
        background: linear-gradient(180deg,#fcd755 0%,#faa641 100%);
    }
}
</style>
<style scoped lang="scss">
$footer-height: 58px * 2;
.content {
  padding: 0 34px;
}
.title {
  font-size: 18px * 2;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
}
.address-wrap {
  background: #fff;
  position: relative;
  padding: 36px 40px 36px 40px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  font-size: 14px * 2;
  margin-top: 34px;
  .text {
      flex: 1;
  }
  .edit-btn {
    display: inline-block;
    position: absolute;
    right: 22px;
    top: 18px;
    width: 16px * 2;
    height: 16px * 2;
    background-image: url("../assets/editor.png");
    background-size: 100%;
  }
  .location-img {
    width: 60px;
    margin-right: 34px;
  }
  .information {
    flex: 1;
    line-height: 1.5;
    .name {
      margin-right: 60px;
    }
  }
}
.distribution {
    margin-top: 20px;
    font-size: 28px;
    color: #888;
}
.book-list {
  margin-top: 24px;
  li {
    padding: 30px 30px;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 30px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
  }
  .book-detail {
    img {
      width: 110px * 2;
      height: 110px * 2;
      margin-right: 32px;
      border-radius: 22px;
    }
    h5 {
      font-size: 24px;
      line-height: 1.33;
      color: #2A2A2A;
      overflow: hidden;
      height: 90px;
      margin-bottom: 25px;
      font-weight: 400;
    }
    .author {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      word-break: break-all;
      height: 84px * 2;
      line-height: 1.86;
      overflow: hidden;
      margin-top: 24px;
      color: #666666;
    }
    .amount {
      font-size: 28px;
      font-weight: 500;
      color: #FF4600;
    }
  }
  .delivery {
    margin-top: 30px;
    color: #666666;
  }
}
.footer-wrap {
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  height: $footer-height;
  padding: 0 40px;
  box-sizing: border-box;
  .totals {
    font-size: 24px * 2;
    font-weight: 500;
    color: #d0021b;
  }
  .buy-btn {
    width: 124px * 2;
    height: 41px * 2;
    line-height: 41px * 2;
    background: linear-gradient(180deg,#fcd755 0%,#faa641 100%);
    color: #fff;
    font-size: 18px * 2;
    text-align: center;
    border-radius: 41px;
  }
}
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  .modal-content {
    position: relative;
    width: 268px * 2;
    height: 212px * 2;
    background-color: #ffffff;
    margin: 400px auto 0 auto;
    border-radius: 10px;
    text-align: center;
    img {
      width: 71.9px * 2;
      height: 71.9px * 2;
      margin-top: 64px;
    }
    h1 {
      font-size: 18px * 2;
      margin-top: 28px;
    }
    p {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      line-height: 90px;
      border-top: 1px solid #efeded;
      color: #666;
      font-size: 28px;
    }
  }
}
.payMethod {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    .payList {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        font-size: 34px;
        text-align: center;
        li {
            height: 150px;
            border-bottom:  1px solid #eee;
            line-height: 150px;
        }
        img {
            max-width: 80px;
            max-height: 80px;
            vertical-align: middle;
            margin-right: 20px;
            margin-top: -10px;
        }
        a {
            display: block;
        }
    }
}
</style>
