<template>
    <ul class="book-large-list">
        <slot />
    </ul>
</template>

<script>

export default {
    name: 'index',
    props: {
        canHandle: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            chooseData: []
        }
    },
    methods: {
        handleItemClick (cartId, bookId, count, price, commodity) {
            const findIndex = this.chooseData.findIndex((item) => item.bookId === bookId)
            if (findIndex === -1) {
                this.chooseData.push({ cartId, bookId, count, price, commodity })
            } else {
                this.chooseData.splice(findIndex, 1)
            }
            console.log(this.chooseData)
            this.emit()
        },
        handleNumberChange (cartId, bookId, count, price) {
            const findIndex = this.chooseData.findIndex((item) => item.bookId === bookId)
            if (findIndex !== -1) {
                this.chooseData[findIndex] = { cartId, bookId, count, price }
                this.emit()
            }
        },
        handleRemove (cartId, bookId) {
            const findIndex = this.chooseData.findIndex((item) => item.bookId === bookId)
            if (findIndex !== -1) {
                this.chooseData.splice(findIndex, 1)
                this.emit()
            }
            this.$emit('delete', cartId)
        },
        orderRemove (orderId, id) {
            // console.log(orderId, id)
            this.$emit('Remove', orderId, id)
        },
        emit () {
            let total = 0
            this.chooseData.forEach((item) => {
                total += item.price * item.count
            })
            this.$emit('change', this.chooseData, total.toFixed(2))
        }
    }
}
</script>

<style scoped lang="scss">
.book-large-list {
  padding: 20px 32px 40px;
}
</style>
