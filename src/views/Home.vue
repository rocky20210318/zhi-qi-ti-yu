<template>
    <div id="home">
        <div class=""><img src="../assets/home-1.jpg" alt=""></div>
        <div class=""><img src="../assets/home-2.jpeg" alt=""></div>
        <div class=""><img src="../assets/home-3.jpeg" alt=""></div>
        <p v-if="caseNumber" class="record"><a href="https://beian.miit.gov.cn/">{{ caseNumber }}</a></p>
        <basic-footer />
    </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
    name: 'home',
    components: {
    },
    data () {
        return {
        }
    },
    computed: {
        caseNumber () {
            // console.log(this.$router.query.)
            const domain = document.domain
            let text = null
            switch (domain) {
            case 'www.huixinyigouh.com':
                text = '粤ICP备2020102189号-1'
                break
            case 'www.jiangduoduohw.com':
                text = '粤ICP备2020108328号-1'
                break
            // case 'localhost':
            //     text = '粤ICP备2020102189号-1'
            //     break
            }
            return text
        }
    },
    async created () {
        const articleList = new AV.Query('ProductList')
        articleList.skip(1)
        articleList.limit(10)
        // console.log(index, size)
        // articleList.descending('likeNumber')
        // articleList.addDescending('readNumber')
        let list = await articleList.find()
        list = list.map(item => {
            return { ...item.attributes }
        })
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
}
</style>
