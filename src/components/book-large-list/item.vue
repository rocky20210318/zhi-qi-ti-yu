<template>
    <li v-if="isRemove && data.commodity" class="book-large-list-item">
        <van-row
            v-if="$parent.canHandle"
            type="flex"
            justify="space-between"
            align="center"
            class="operators"
        >
            <div
                :class="['checkbox', { 'is-checked': isChecked }]"
                @click="handleItemClick"
            />
            <van-icon name="delete" size="20px" color="#e8e8e8" @click="handleRemove" />
        </van-row>
        <!-- <div
            v-if="!$parent.canHandle"
            class="order-status"
            :style="{ color: statusColor }"
        >
            {{ status === 0 ? '待付款' : '待发货' }}
        </div> -->
        <van-row
            type="flex"
            justify="space-between"
            align="center"
            class="book-detail"
        >
            <!-- <img :src="data.commodity.thumbnail"> -->
            <van-image
                lazy-load
                fit="cover"
                :src="data.commodity.thumbnail"
                class="img"
            />
            <!-- <div>
                <h5>{{ data.commodity.title }}</h5>
                <span v-if="!$parent.canHandle">x{{ data.buyCount }}</span>
            </div> -->
            <div class="right">
                <h5 class="van-multi-ellipsis--l2">
                    {{ data.commodity.title }}
                </h5>
                <van-row type="flex" justify="space-between" align="center">
                    <!-- <span v-if="$parent.canHandle" class="label">下单后抽奖</span> -->
                    <van-row
                        type="flex"
                        justify="space-between"
                        align="center"
                        class="price-nub"
                        ><span class="price"
                            >¥{{ data.commodity.price.toFixed(2) }}</span
                        ><span v-if="!$parent.canHandle" class="nub"
                            >x{{ data.buyCount }}</span
                        ></van-row
                    >
                    <span>
                        <number-input
                            v-if="$parent.canHandle"
                            v-model="count"
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
        <van-row align="center" justify="between"> </van-row>
    </li>
</template>

<script>
import NumberInput from '../../components/number-input'

export default {
    name: 'item',
    components: { NumberInput },
    props: {
        data: {
            type: Object,
            default: () => { }
        },
        orderId: {
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0
        }
    },
    data () {
        // console.log(this.data, this.orderId, this.status)
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
    methods: {
        handleItemClick () {
            this.isChecked = !this.isChecked
            this.$parent.handleItemClick(this.data.cartId, this.data.commodity.id, this.count, this.data.commodity.price, this.data.commodity)
        },
        handleNumberChange () {
            this.$parent.handleNumberChange(this.data.cartId, this.data.commodity.id, this.count, this.data.commodity.price)
        },
        handleRemove () {
            this.isRemove = false
            this.$parent.handleRemove(this.data.cartId, this.data.commodity.id)
        },
        removeOrder () {
            // console.log(this.data)
            this.$parent.orderRemove(this.orderId, this.data.commodity.id)
        }
    }
}
</script>

<style scoped lang="scss">
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
                background: #d0021b;
                border: none;
                text-align: center;
                &:after {
                    content: '';
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
        .remove {
            width: 32px;
            height: 34px;
            background-size: 100%;
        }
        margin-bottom: 20px;
    }
    .book-detail {
        // flex-wrap: nowrap;
        .img {
            width: 220px;
            height: 220px;
            margin-right: 32px;
            border-radius: 22px;
            overflow: hidden;
        }
        h5 {
            flex: 0;
            font-size: 28px;
            line-height: 1.33;
            color: #2a2a2a;
            // overflow: hidden;
            // height: 90px;
            margin-bottom: 50px;
            font-weight: 500;
        }
        .right {
            flex: 1;
        }
        span {
            display: block;
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
