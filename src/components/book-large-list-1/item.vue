<template>
    <li
        v-if="isRemove"
        class="book-large-list-item"
    >
        <van-row v-if="$parent.canHandle" type="flex" justify="space-between" align="center" class="operators">
            <div
                :class="['checkbox', { 'is-checked': data.checked }]"
                @click="handleItemClick"
            />
            <van-icon name="delete" size="20px" @click="handleRemove" />
        </van-row>
        <van-row type="flex" justify="space-between" align="center" class="book-detail">
            <van-image lazy-load fit="cover" :src="data.thumbnail" class="img" />
            <div class="right">
                <h5 class="van-multi-ellipsis--l2">{{ data.title }}</h5>
                <van-row type="flex" justify="space-between" align="center">
                    <!-- <span v-if="$parent.canHandle" class="label">下单后抽奖</span> -->
                    <van-row type="flex" justify="space-between" align="center" class="price-nub"><span class="price">¥{{ data.price.toFixed(2) }}</span><span v-if="!$parent.canHandle" class="nub">x{{ data.buyCount }}</span></van-row>
                    <span>
                        <number-input
                            v-if="$parent.canHandle"
                            v-model="data.buyCount"
                            class="nub"
                            :min="1"
                            inline
                            controls
                            size="small"
                            center
                            @change="handleNumberChange"
                        />
                    </span>
                </van-row>
            </div>
        </van-row>
    </li>
</template>

<script>
import NumberInput from '../../components/number-input'
// import { NaclButton } from 'nacl-ui'
import { cartChecked, cartUpdate, cartDelete } from '../../services'

export default {
    name: 'large-list-item',
    components: { NumberInput },
    props: {
        data: {
            type: Object,
            default: () => { }
        },
        orderId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            count: 1,
            isChecked: false,
            isRemove: true
        }
    },
    computed: {
        statusColor () {
            return this.data.status === 0 ? '#999999' : '#ea6932'
        }
    },
    watch: {
        'data.buyCount' () {
            cartUpdate({
                goodsId: this.data.goodsId,
                number: this.data.buyCount,
                cartId: this.data.id
            })
        }
    },
    methods: {
        async handleItemClick () {
            await cartChecked({
                cartIds: this.data.id,
                isChecked: this.data.checked ? 0 : 1
            })
            this.data.checked = !this.data.checked
        },
        handleNumberChange () {
            this.$parent.handleNumberChange(this.data.cartId, this.data.id, this.count, this.data.price)
        },
        async handleRemove () {
            await cartDelete({ cartIds: this.data.id })
            this.isRemove = false
            this.$parent.handleRemove(this.data.cartId, this.data.id)
        },
        removeOrder () {
            // console.log(this.data)
            this.$parent.orderRemove(this.orderId, this.data.id)
        }
    }
}
</script>

<style scoped lang="scss">
.price-nub {
    flex: 1;
}
.remove-order {
  width: 170px;
  height: 45px;
  line-height: 45px;
  border-radius: 20px;
  background: #fff;
  border: 1.5px solid #999;
  color: #999;
}
.book-large-list-item {
  padding: 20px 30px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 30px;
  .order-status {
    font-size: 14px * 2;
    color: #ea6932;
    text-align: right;
    margin-bottom: 20px;
  }
  .operators {
    .checkbox {
      width: 16px * 2;
      height: 16px * 2;
      border: solid 2px #d3d3d3;
      border-radius: 50%;
      box-sizing: border-box;
      &.is-checked {
        background: #313635;
        border: none;
        text-align: center;
        &:after {
          content: "";
          display: inline-block;
          width: 5px;
          height: 16px;
          border-color: #fff;
          border-style: solid;
          border-width: 0 3px 3px 0;
          transform: rotate(45deg);
        }
      }
    }
    // .remove {
    //   width: 32px;
    //   height: 34px;
    //   background-image: url("../../assets/trash.png");
    //   background-size: 100%;
    // }
    margin-bottom: 20px;
  }
  .book-detail {
    .img {
      width: 220px;
      height: 220px;
      // height: auto;
      margin-right: 32px;
      border-radius: 22px;
      overflow: hidden;
    }
    h5 {
        flex: 0;
        font-size: 28px;
        line-height: 1.33;
        color: #2A2A2A;
        // overflow: hidden;
        // height: 90px;
        margin-bottom: 50px;
        font-weight: 500;
    }
    .right {
        flex: 1;
    }
    .label {
      font-size: 24px;
      color: #121314;
    }
    .price{
      font-size: 28px;
      color: #121314;
    }
    .nub {
      // display: block;
      float: right;
      text-align: right;
    }
    .author {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      word-break: break-all;
      height: 75px;
      margin-bottom: 15px;
      line-height: 1.86;
      overflow: hidden;
      margin-top: 24px;
      color: #666666;
      span {
        display: inline-block;
        margin-right: 5px;
        padding: 2px 15px;
        border: 1.5px solid #ffd300;
        border-radius: 20px;
        font-size: 24px;
        color: #ffd300;
        line-height: 1.5;
      }
    }
  }
}
.amount {
  font-size: 20px * 2;
  font-weight: 500;
  color: #d0021b;
}
</style>
