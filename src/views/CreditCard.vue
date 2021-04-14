<template>
    <div class="credit-card">
        <van-nav-bar fixed left-arrow @click-left="$router.go(-1)" placeholder title="绑定信用卡" />
        <Form @submit="onSubmit">
            <field
                v-model="payData.nub"
                required
                :rules="[{ pattern: creditCard, message: '信用卡格式不正确' }]"
                placeholder="请输入信卡号"
                label="卡号"
                type="text"
            />
            <field
                v-model="payData.name"
                required
                :rules="[{ required: true }]"
                placeholder="请输入持卡人姓名"
                label="姓名"
                type="text"
            />
            <field
                v-model="payData.address"
                required
                :rules="[{ required: true }]"
                placeholder="请输入持卡人地址"
                label="地址"
                type="text"
            />
            <field
                v-model="payData.time"
                required
                :rules="[{ required: true }]"
                placeholder="请选择信用卡到期时间"
                label="到期时间"
                readonly
                type="text"
                @click="show = true"
            />
            <field
                v-model="payData.code"
                required
                :rules="[{ required: true }]"
                placeholder="请输入安全码"
                label="安全码"
                type="number"
            />
            <Button size="large" color="linear-gradient(180deg,#fcd755 0%,#d81e06 100%)" class="button">绑定信用卡</Button>
        </Form>
        <Popup v-model="show" position="bottom" class="">
            <datetime-picker
                v-model="currentDate"
                :max-date="maxDate"
                type="year-month"
                title="选择年月"
                @cancel="show = false"
                @confirm="onConfirm" />
        </Popup>
    </div>
</template>

<script>
import { Form, Field, Button, Popup, DatetimePicker } from 'vant'
// import vueDatepickerLocal from 'vue-datepicker-local'
// const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/
const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/

export default {
    name: 'credit-card',
    components: {
        Form,
        Field,
        Button,
        Popup,
        DatetimePicker
    },
    data () {
        return {
            show: false,
            payData: {
                name: '',
                time: '',
                nub: '',
                code: '',
                address: ''
            },
            currentDate: new Date(),
            maxDate: new Date(2050, 11, 1),
            creditCard
        }
    },
    created () {
    },
    methods: {
        onConfirm (date) {
            this.payData.time = date.getFullYear() + '-' + date.getMonth()
        },
        onSubmit () {
            this.$toast('您的付款遇到问题，请您核对信用卡信息')
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
    form {
        // width: 341px * 2;
        margin: 30px;
        // padding: 10px 32px;
        // box-sizing: border-box;
        // border-radius: 10px;
        // box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
        // background-color: #ffffff;
    }
    .button {
        margin-top: 50px;
    }
    .btn-wrapper {
        margin-top: 50px;
        padding: 0 32px;
        .button {
            border-radius: 10px;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            color: #fff;
            text-align: center;
            background: linear-gradient(75deg,#8628fa,#512ffd)
        }
    }
</style>
