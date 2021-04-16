<template>
    <div id="credit-card">
        <van-nav-bar
            fixed
            left-arrow
            @click-left="$router.go(-1)"
            placeholder
            title="绑定银行卡"
        />
        <Form @submit="onSubmit">
            <Field
                v-model="bankCardNumber"
                :formatter="formatter"
                :maxlength="23"
                type="digit"
                placeholder="请输入银行卡号"
                class="bank-card-number"
            />
            <RadioGroup v-model="radio" class="radio">
                <van-row type="flex" align="center" class="">
                    <Radio name="1" checked-color="#fcd755" class="item" icon-size="16px">储蓄卡</Radio>
                    <Radio name="2" checked-color="#fcd755" class="item" icon-size="16px">信用卡</Radio>
                </van-row>
            </RadioGroup>
            <Popover v-model="showPopover" placement="bottom" :actions="actions" @select="select">
                <template #reference>
                    <Field v-model="bankText" label="所属银行" class="bank" @input="search" @blur="showPopover = false" />
                </template>
            </Popover>
            <Field v-model="phone" label="预留手机号" type="digit" :maxlength="11" class="phone" />
            <Button block color="#1989fa" class="Button">验证银行卡</Button>
        </Form>
    </div>
</template>

<script>
import { Form, Field, RadioGroup, Radio, Button, Popover } from 'vant'
import bankList from '../json/BankList'
export default {
    name: 'credit-card',
    components: {
        Form,
        Field,
        RadioGroup,
        Radio,
        Button,
        Popover
    },
    data () {
        return {
            radio: '1',
            bankCardNumber: '',
            bankText: '',
            bankVal: '',
            phone: '',
            showPopover: false,
            actions: []
        }
    },
    created () {
    },
    methods: {
        onSubmit () {
            const { bankCardNumber, bankText, phone } = this
            if (bankCardNumber.length < 15) {
                this.$toast('请输入正确银行卡号')
                return false
            }
            if (bankText.length === 0) {
                this.$toast('请输入所属银行')
                return false
            }
            if (!this.backTest()) {
                this.$toast('请选择正确的银行')
                return false
            }
            if (!this.phoneTest(phone)) {
                this.$toast('手机号格式不正确')
                return false
            }
            this.$toast.loading({
                message: '验证中',
                forbidClick: true,
                duration: 2000,
                onClose: () => {
                    this.$toast('验证失败，请检查所填写信息')
                }
            })
        },
        formatter (val) {
            return val.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        },
        search () {
            this.showPopover = true
            if (this.bankText) {
                this.actions = bankList.filter(i => {
                    const reg = new RegExp(this.bankText)
                    return reg.test(i.text)
                })
            }
        },
        select (val) {
            this.bankText = val.text
            this.bankVal = val.value
        },
        phoneTest (phoneNumber) {
            const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/
            return PHONE_EXP.test(phoneNumber)
        },
        backTest () {
            const backData = bankList.filter(i => {
                return i.text === this.bankText && i.value === this.bankVal
            })
            return backData.length !== 0
        }
    }
}
</script>
<style lang="scss">
.van-popover__action {
    width: auto;
    margin: auto;
}
</style>
<style scoped lang="scss">
#credit-card {
    padding: 30px;
    .bank-card-number {
        margin-bottom: 30px;
        border-radius: 40px;
    }
    .radio {
        .item {
            margin-right: 30px;
            font-size: 30px;
            font-weight: 300;
        }
    }
    .van-popover__wrapper {
        display: block;
    }
    .bank {
        margin: 30px 0;
        border-radius: 40px;
    }
    .phone {
        margin-bottom: 100px;
        border-radius: 40px;
    }
}
</style>
