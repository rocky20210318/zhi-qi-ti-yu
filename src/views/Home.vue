<template>
    <div id="home">
        <div id="imageMap-1">
            <div v-if="caseNumber" type="flex" justify="space-between" align="center" class="logo">
                    <div><img src="../assets/logo.png" alt=""></div>
                    <p>飞狐体育</p>
            </div>
            <img src="../assets/home-1.jpeg" alt="">
            <!-- <router-link to="/coupon-list" class="itme-1" /> -->
        </div>
        <div id="imageMap-2">
            <img src="../assets/home-2.jpeg" alt="">
            <van-row type="flex" justify="space-between" align="center" class="router-link" >
                <router-link to="/search?keys=户外" class="itme" />
                <router-link to="/search?keys=健身" class="itme" />
                <router-link to="/search?keys=旅行" class="itme" />
            </van-row>
        </div>
        <div id="imageMap-3">
            <img src="../assets/home-3.jpeg" alt="">
            <router-link to="/coupon-list" class="itme-1" />
        </div>
        <div id="imageMap-4">
            <img src="../assets/home-4.jpeg" alt="">
            <router-link to="/search?keys=运动包" class="itme-1" />
        </div>
        <p v-if="caseNumber" class="record"><a href="https://beian.miit.gov.cn/">{{ caseNumber }}</a></p>
        <PrivacyAgreement v-if="!caseNumber" />
        <basic-footer />
    </div>
</template>

<script>
// import AV from 'leancloud-storage'
import PrivacyAgreement from '../components/privacy-agreement'

export default {
    name: 'home',
    components: {
        PrivacyAgreement
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
            case 'www.jinshen.xyz':
            // case 'localhost':
                text = '鲁ICP备20018859号-1'
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
        left: 20px;
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
        .router-link {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        a {
            display: block;
            width: 33%;
            height: 100%;
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
    #imageMap-4 {
        position: relative;
        .itme-1 {
            position: absolute;
            top: 0px;
            left: 0;
            right: 0;
            display: block;
            width: 100%;
            height: 100px;
            margin: auto;
        }
    }
}
</style>x
