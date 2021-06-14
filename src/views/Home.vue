<template>
    <div id="home">
        <div id="imageMap-1">
            <div v-if="caseNumber" type="flex" justify="space-between" align="center" class="logo">
                    <div><img src="../assets/logo.png" alt=""></div>
                    <p>啵鱼体育</p>
            </div>
            <img src="../assets/home-1.jpeg" alt="">
            <!-- <router-link to="/coupon-list" class="itme-1" /> -->
        </div>
        <div id="imageMap-3">
            <img src="../assets/home-3.jpeg" alt="">
            <router-link to="/coupon-list" class="itme-1" />
        </div>
        <div id="imageMap-2">
            <img src="../assets/home-2.jpeg" alt="">
            <van-row type="flex" justify="space-between" align="center" class="router-link-1" >
                <router-link to="/search?keys=短袖" class="itme" />
                <router-link to="/search?keys=皮肤" class="itme" />
                <router-link to="/search?keys=外套" class="itme" />
            </van-row>
            <van-row type="flex" justify="space-between" align="center" class="router-link-2" >
                <router-link to="/search?keys=速干裤" class="itme" />
                <router-link to="/search?keys=鞋" class="itme" />
                <router-link to="/search?keys=冲锋衣" class="itme" />
                <router-link to="/search?keys=羽绒服" class="itme" />
            </van-row>
        </div>
        <div id="imageMap-4">
            <img src="../assets/home-4.jpeg" alt="">
            <router-link to="/search?keys=T恤" class="itme-1" />
        </div>
        <GoodsList ref="goodsList" :max-page-index="1" class="goods-list"/>
        <p v-if="caseNumber" class="record"><a href="https://beian.miit.gov.cn/">{{ caseNumber }}</a></p>
        <PrivacyAgreement v-if="!caseNumber" />
        <basic-footer />
    </div>
</template>

<script>
// import AV from 'leancloud-storage'
import PrivacyAgreement from '../components/privacy-agreement'
import GoodsList from '../components/goods-list'

export default {
    name: 'home',
    components: {
        PrivacyAgreement,
        GoodsList
    },
    data () {
        return {
        }
    },
    computed: {
        caseNumber () {
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.xupeiweb.xyz':
            // case 'localhost':
                text = '赣ICP备2021003464号-1'
                break
            }
            console.log(text)
            return text
        }
    },
    async created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
#home {
    // padding-bottom: 100px;
    img {
        width: 100%;
        vertical-align: top;
    }
    .logo {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 14px;
        border-radius: 8px;
        // background: rgba(0,0,0,0.7);
        font-size: 28px;
        font-weight: 500;
        color: #fff;
        img {
            width: 80px;
            margin-right: 10px;
        }
    }
    .record {
        position: relative;
        z-index: 0;
        // top: -150px;
        margin: 30px 0;
        text-align: center;
        font-size: 28px;
        color: #666;
    }
    .goods-list {
        padding: 30px 24px;
    }
    #imageMap-1 {
        position: relative;
        .itme-1 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    #imageMap-2 {
        position: relative;
        .router-link-1 {
            position: absolute;
            left: 0;
            top: 96px;
            width: 100%;
            height: 34%;
            // background: #000;
            a {
                display: block;
                width: 33%;
                height: 100%;
            }
        }
        .router-link-2 {
            position: absolute;
            left: 0;
            bottom: 0px;
            width: 100%;
            height: 52%;
            // background: #000;
            a {
                display: block;
                width: 25%;
                height: 100%;
            }
        }
    }
    #imageMap-3 {
        position: relative;
        background: #fff;
        padding-bottom: 20px;
        .itme-1 {
            position: absolute;
            top: 0px;
            left: 0;
            right: 0;
            display: block;
            width: 100%;
            height: 100%;
            margin: auto;
        }
    }
    #imageMap-4 {
        position: relative;
        padding-top: 10px;
        background: #fff;
        .itme-1 {
            position: absolute;
            top: 0px;
            left: 0;
            right: 0;
            display: block;
            width: 100%;
            height: 100%;
            margin: auto;
        }
    }
}
</style>x
