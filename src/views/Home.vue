<template>
    <div id="home">
        <div id="imageMap-1">
            <img src="../assets/home-1.jpg" alt="">
            <router-link to="/coupon-list" class="itme-1" />
        </div>
        <div id="imageMap-2">
            <img src="../assets/home-2.jpeg" alt="">
            <router-link to="/search?keys=冲锋衣裤" class="itme-1" />
            <router-link to="/search?keys=软壳衣裤" class="itme-2" />
            <router-link to="/search?keys=抓绒衣裤" class="itme-3" />
            <router-link to="/search?keys=健身服" class="itme-4" />
        </div>
        <div id="imageMap-3">
            <img src="../assets/home-3.jpeg" alt="">
            <router-link to="/search?keys=运动包" class="itme-1" />
        </div>
        <p v-if="caseNumber" class="record"><a href="https://beian.miit.gov.cn/">{{ caseNumber }}</a></p>
        <PrivacyAgreement />
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
            case 'www.jingkuangweb.xyz':
                text = '沪ICP备2020027770号-1'
                break
            }
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
    .record {
        position: relative;
        z-index: 0;
        // top: -150px;
        text-align: center;
        font-size: 28px;
        color: #666;
        margin-bottom: 20px;
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
