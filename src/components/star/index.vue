<template>
    <div>
        <van-icon v-show="!isCollect" name="star-o" class="star" @click="addCollection" />
        <van-icon v-show="isCollect" name="star" class="star" color="linear-gradient(to right,#ff6034,#ee0a24)" @click="deleteCollection" />
    </div>
</template>

<script>
import { addCollection, deleteCollection, ifCollection } from '../../services/index'
import AV from 'leancloud-storage'

export default {
    name: 'chat-list',
    props: {
        details: {
            type: Object,
            default () {
                return {}
            }
        },
        id: {
            type: String,
            default: ''
        }

    },
    data () {
        return {
            isCollect: false
        }
    },
    computed: {
    },
    created () {
        this.getCollect()
    },
    methods: {
        getCollect () {
            console.log(this.details)
            if (AV.User.current() && ifCollection(this.id)) this.isCollect = true
            else this.isCollect = false
        },
        addCollection () {
            // console.log(this.details)
            if (AV.User.current()) {
                addCollection({ ...this.details })
                this.getCollect()
            } else {
                this.$router.push('/login')
            }
        },
        deleteCollection () {
            deleteCollection({ ...this.details })
            this.getCollect()
        }
    }
}
</script>

<style scoped lang="scss">
.star {
    position: relative;
    top: 5px;
    line-height: 1;
}
</style>
