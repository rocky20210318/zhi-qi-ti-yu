<template>
    <div class="credit-card">
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
            <RadioGroup v-model="radio">
                <van-row type="flex" align="center" class="">
                    <Radio name="1" checked-color="#fcd755" class="item"
                        >储蓄卡</Radio
                    >
                    <Radio name="2" checked-color="#fcd755" class="item"
                        >信用卡</Radio
                    >
                </van-row>
            </RadioGroup>
            <Popover v-model="showPopover" :actions="actions">
                <Field v-model="bankText" label="所属银行" />
            </Popover>
            <Field v-model="bankText" label="手机号" />
            <Button block>验证应行卡</Button>
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
            showPopover: false,
            actions: bankList
        }
    },
    created () {
    },
    methods: {
        onSubmit () { },
        formatter (val) {
            return val.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
        }
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
</style>
