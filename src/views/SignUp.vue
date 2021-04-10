<template>
    <div id="sign-up">
        <van-nav-bar
            class="nav"
            :border="false"
            @click-left="$router.history.go(-1)"
            fixed
            left-arrow
        />
        <div class="top-bg">
            <p class="h1">注册</p>
            <!-- <p class="text">欢迎您的到来</p> -->
            <!-- <div class="bg"><img src="../assets/login-bg.png" alt=""></div> -->
        </div>
        <div class="from">
            <div>
                <field
                    placeholder="请输入账号"
                    type="tel"
                    v-model="phoneNumber"
                    clearable
                    class="input"
                />
            </div>
            <div>
                <field
                    placeholder="请输入密码"
                    type="password"
                    v-model="valuePwd"
                    clearable
                    class="input"
                />
            </div>
            <div>
                <field
                    placeholder="请确认密码"
                    type="password"
                    v-model="cValuePwd"
                    clearable
                    class="input"
                />
            </div>
            <div class="sign-up"><router-link to="/login">已有账号去登陆</router-link></div>
            <Button color="#faa641"
                @click="submitButton"
                :loading="loginLoading"
                loading-text="注册中"
                block
                type="primary"
                class="button">注册</Button>
            <van-row type="flex" align="center" justify="center" class="tipsBox">
                <checkbox v-model="checked" checked-color="#faa641" icon-size="0.38rem" class="checkbox" />
                <p>我已阅读并同意<router-link class="privacy" to="/privacy">《隐私政策》</router-link>与<router-link class="privacy" to="/agreement">《用户协议》</router-link></p>
            </van-row>
        </div>
    </div>
</template>

<script>
import { Button, Field, Checkbox } from 'vant'
import { signUp } from '../services'

export default {
    name: 'sign-up',
    components: {
        Button,
        Field,
        Checkbox
    },
    data () {
        return {
            phoneNumber: '',
            valuePwd: '',
            cValuePwd: '',
            loginLoading: false,
            checked: false
        }
    },
    computed: {
    },
    async created () {
    },
    mounted () {
    },
    methods: {
        // submitButton () {},
        async submitButton () {
            if (!this.checked) {
                this.$toast('请阅读并同意《用户协议》与《隐私政策》')
                return false
            }
            try {
                this.loginLoading = true
                await signUp({
                    username: this.phoneNumber,
                    password: this.valuePwd,
                    cPassword: this.cValuePwd
                })
                this.$toast('注册成功')
                this.$router.replace('/my')
                // this.$router.history.go(-1)
            } catch (e) {
                this.$toast(e.message)
            } finally {
                this.loginLoading = false
            }
        }
    }
}
</script>
<style lang="scss">
#sign-up {
    .van-nav-bar .van-icon {
        color: #fff;
    }
}
</style>
<style lang="scss" scoped>
#sign-up {
    min-height: 100%;
    background: url('../assets/login-bg.png')no-repeat;
    background-size: 100% 100%;
    background-color: linear-gradient(45deg, #fbd454 0%, #fcc24e 33%, #fbcc50 68%, #faa942 100%);
    padding: 0 40px;
    .nav {
        background: rgb(0, 0, 0, 0);
    }
    .top-bg {
        position: relative;
        z-index: 2;
        height: 300px;
        margin-right: -40px;
        padding-bottom: 80px;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            z-index: -1;
            img {
                height: 545px;
            }
        }
        .h1 {
            padding: 185px 0 37px;
            font-size: 64px;
            font-size: 800;
            letter-spacing: 1px;
            color: #fff;
        }
        .text {
            font-size: 60px;
            font-weight: 500;
            color: #001f42;
        }
    }
    .from {
        background: #fff;
        box-shadow: 0px 40px 40px 0px rgba(0, 0, 0, 0.08);
        border-radius: 26px;
        overflow: hidden;
        padding: 80px 66px 150px;
        .input {
            border-bottom: solid 2px #d5d5d5;
        }
    }
    .button {
        margin: 150px 0px 30px;
        // box-sizing: border-box;
    }
    .tipsBox {
        p {
            margin-left: 10px;
            font-size: 24px;
            color: #808080;
        }
        a {
            color: #001f42;
        }
    }
    .sign-up {
        margin-top: 15px;
        text-align: right;
        font-size: 28px;
        color: #001f42;
    }
}
</style>
