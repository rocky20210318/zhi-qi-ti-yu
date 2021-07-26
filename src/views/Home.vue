<template>
    <div id="home">
        <div id="imageMap-1">
            <van-row v-if="caseNumber" type="flex" justify="space-between" align="center" class="logo">
                    <img src="../assets/logo.png" alt="">
                    <span>籽棋体育</span>
            </van-row>
            <img src="../assets/home-1.jpeg" alt="">
            <router-link to="/coupon-list" class="itme-1" />
            <router-link to="/search?keys=T恤" class="itme-2" />
        </div>
        <div id="imageMap-2">
            <img src="../assets/home-2.jpeg" alt="">
            <router-link to="/search?keys=冲锋衣裤" class="itme-1" />
            <router-link to="/search?keys=软壳衣裤" class="itme-2" />
            <router-link to="/search?keys=抓绒衣裤" class="itme-3" />
            <router-link to="/search?keys=健身服" class="itme-4" />
            <router-link to="/sign-in-1" class="itme-5" />
        </div>
        <Divider class="recommend">热卖推荐</Divider>
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
import { Divider } from 'vant'

export default {
    name: 'home',
    components: {
        PrivacyAgreement,
        GoodsList,
        Divider
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
            case 'www.reziqiweb.top':
            // case 'localhost':
                text = '赣ICP备2021003290号'
                break
            }
            // console.log(text)
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
    img {
        width: 100%;
        vertical-align: top;
    }
    .logo {
        position: absolute;
        top: 20px;
        left: 20px;
        padding: 14px;
        border-radius: 8px;
        background: rgba(0,0,0,0.7);
        font-size: 28px;
        font-weight: 500;
        color: #fff;
        img {
            width: 50px;
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
        padding: 0px 24px;
    }
    .recommend {
        margin-top: 0;
        background: #fff;
        padding-bottom: 20px;
        font-size: 28px;
        color: #333;
        text-align: center;
    }
    #imageMap-1 {
        position: relative;
        .itme-1 {
            position: absolute;
            bottom: 14%;
            left: 0;
            width: 100%;
            height: 16%;
        }
        .itme-2 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 14%;
        }
    }
    #imageMap-2 {
        position: relative;
        .itme-1 {
            position: absolute;
            top: 150px;
            left: 30px;
            display: block;
            width: 290px;
            height: 330px;
        }
        .itme-2 {
            position: absolute;
            top: 150px;
            right: 30px;
            display: block;
            width: 380px;
            height: 160px;
        }
        .itme-3 {
            position: absolute;
            top: 330px;
            right: 30px;
            display: block;
            width: 380px;
            height: 160px;
        }
        .itme-4 {
            position: absolute;
            bottom: 66px;
            right: 0;
            left: 0;
            display: block;
            width: 90%;
            height: 190px;
            margin: auto;
        }
        .itme-5 {
            position: absolute;
            top: 0px;
            right: 0;
            left: 0;
            display: block;
            width: 90%;
            height: 120px;
            margin: auto;
        }
    }
    #imageMap-3 {
        position: relative;
        .itme-1 {
            position: absolute;
            top: 0px;
            left: 0;
            right: 0;
            display: block;
            width: 90%;
            height: 190px;
            margin: auto;
        }
    }
}
</style>
