<template>
    <div>
        <van-icon v-show="!isCollect" name="star-o" class="star" @click="addCollection" />
        <van-icon v-show="isCollect" name="star" color="#faa641" class="star" @click="deleteCollection" />
    </div>
</template>

<script>
import { collectList, couponAddorDelete, getUserData } from '../../services/index'

export default {
    name: 'chat-list',
    props: {
        details: {
            type: Object,
            default () {
                return {}
            }
        }

    },
    data () {
        return {
            isCollect: false
        }
    },
    computed: {
        username () {
            return getUserData()
        }
    },
    watch: {
        'details.id' () {
            this.getCollect()
        }
    },
    methods: {
        async getCollect () {
            console.log(this.details)
            if (this.username && await collectList(this.details.id)) this.isCollect = true
            else this.isCollect = false
        },
        async addCollection () {
            if (this.username) {
                await couponAddorDelete(this.details.id)
                this.getCollect()
            } else {
                this.$router.push('/login')
            }
        },
        async deleteCollection () {
            await couponAddorDelete(this.details.id)
            this.getCollect()
        }
    }
}
</script>

<style scoped lang="scss">
.star {
  width: 45px;
}
</style>
