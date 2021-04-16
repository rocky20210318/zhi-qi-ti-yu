<template>
    <div>
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="订单确认" />
        <div class="content">
            <div class="address-wrap">
                    <van-row type="flex" justify="space-between" align="center" @click.native="addressClick">
                        <van-icon name="map-marked" size="38" class="location-img" color="#313635" />
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
            <ul class="book-list">
                <li
                    v-for="(item, index) in data"
                    :key="index"
                    >
                        <van-row type="flex" justify="space-between" align="center" class="book-detail">
                            <img :src="item.commodity.thumbnail">
                            <div>
                                <h5 class="van-multi-ellipsis--l2">{{ item.commodity.title }}</h5>
                                <van-row type="flex" justify="space-between" align="center">
                                    <p class="amount">¥{{ item.commodity.price }}</p>
                                    <span v-if="!$parent.canHandle">x{{ item.buyCount }}</span>
                                </van-row>
                            </div>
                        </van-row>
                        <van-row type="flex" justify="space-between" align="center" class="distribution">
                            <span>配送方式:</span><span>活动包邮</span>
                        </van-row>
                    </li>
            </ul>
            <div class="address-wrap">
                <div class="information coupon">
                    <div >暂无可使用优惠券</div>
                </div>
            </div>
        </div>
        <footer>
            <van-row type="flex" justify="space-between" align="center" class="footer-wrap">
                <p class="totals">¥{{ total }}</p>
                <div class="buy-btn" @click="isShowAlter = true">立即购买</div>
            </van-row>
        </footer>
        <van-dialog
            v-model="isShowAlter"
            title="订单确认"
            message="请确认下单信息无误"
            show-cancel-button
            @confirm="handleBuy"
        />
        <div
            v-if="isModal"
            class="modal"
        >
            <div class="modal-content">
                <img src="../assets/order-success.png">
                <h1>下单成功</h1>
                <p>
                    订单号: {{ $route.params.id }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { getOrder, getAddress, ConfirmOrder, updateAddressBooks } from '../services'
import { Dialog } from 'vant'
import AV from 'leancloud-storage'

export default {
    name: 'Order-Detail',
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    data () {
        return {
            addressInfo: undefined,
            isModal: false,
            isShowAlter: false
        }
    },
    computed: {
        data () {
            const orderId = this.$route.params.id
            // console.log(getOrder(orderId).books)
            return getOrder(orderId).books
        },
        total () {
            let total = 0
            this.data.forEach((item) => {
                total += item.commodity.price * item.buyCount
            })
            return total.toFixed(2)
        }
    },
    async created () {
        const addressInfo = await getAddress()
        this.addressInfo = addressInfo[0]
    },
    async mounted () {
    },
    methods: {
        handleBuy () {
            if (this.addressInfo) {
                console.log(AV.User.current().attributes.mobilePhoneNumber)
                if (AV.User.current().attributes.mobilePhoneNumber === '18999999999') {
                    ConfirmOrder(this.$route.params.id)
                    const bookNames = this.data.map((item) => item.commodity.title).join(',')
                    updateAddressBooks(this.addressInfo.objectId, bookNames)
                    this.$toast.loading({
                        message: '提交订单',
                        forbidClick: true,
                        duration: 1500,
                        onClose: () => {
                            this.isModal = true
                            setTimeout(() => {
                                this.$router.replace('/order-list?status=2')
                            }, 2000)
                        }
                    })
                } else {
                    this.$router.push('/credit-card')
                }
            } else {
                this.$toast('请填写收货地址')
            }
        },
        addressClick () {
            this.$router.push('/address-list')
        }
    }
}
</script>

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
    //   height: 90px;
      margin-bottom: 90px;
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
    background: linear-gradient(45deg,#fcd755 0%,#d81e06 100%);
    color: #fff;
    font-size: 18px * 2;
    text-align: center;
    border-radius: 4px;
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
        padding-top: 30px;
        font-size: 18px * 2;
        //   margin-top: 28px;
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
