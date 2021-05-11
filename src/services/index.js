import request from './request'
import queryString from 'query-string'
import AV from 'leancloud-storage'

const apiPrefix = 'http://47.106.209.243:18081'
const PHONE_EXP = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))+\d{8})$/
const PASSWORD_EXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
let UserData = JSON.parse(localStorage.getItem('UserData')) || null

/**
 * 执行service函数
 * @param api {Promise} - api函数
 * @returns {Promise<T | void>}
 */
export default function callApi (api, ...parameters) {
    return api(...parameters).then((response) => {
        if (response instanceof Array) {
            if (!response) {
                return []
            }
            return response.map((object) => object.toJSON())
        } else {
            if (!response) {
                return {}
            }
            if (!(response instanceof AV.Object)) {
                return response
            }
            return response.toJSON()
        }
    }).catch((error) => {
        throw error.message.replace(/\[.*\]/g, '')
    })
}

/**
 * 注册
 * @param phoneNumber required
 * @param smsCode required
 * @returns {Promise<User>}
 */
export async function signUp (query = {}) {
    if (!query.username) {
        const error = { code: -1, message: '手机号码不能为空' }
        throw error
    }
    if (!PHONE_EXP.test(query.username)) {
        const error = { code: -1, message: '手机号码格式不正确(6到18位字母和数字)' }
        throw error
    }
    if (!query.password) {
        const error = { code: -1, message: '密码不能为空' }
        throw error
    }
    if (query.cPassword !== query.password) {
        const error = { code: -1, message: '两次输入密码不一致' }
        throw error
    }
    if (!PASSWORD_EXP.test(query.password)) {
        const error = { code: -1, message: '密码格式不正确(8-16位字符至少一个字母及数字)' }
        throw error
    }
    const response = await request(`${apiPrefix}/wx/auth/register?username=${query.username}&password=${query.password}&mobile=${query.username}`, {
        method: 'POST'
    })
    console.log(response)

    if (response.errno === 0) {
        UserData = {
            token: response.data.token,
            ...response.data.userInfo
        }
        localStorage.setItem('UserData', JSON.stringify(UserData))
        return response.data
    } else {
        console.log(response)
        const error = { code: -1, message: response.errmsg }
        throw error
    }
    // let response = await AV.User.signUpOrlogInWithMobilePhone(phoneNumber, smsCode)
    // return response
}
/**
 * 登陆
 * @param phoneNumber required
 * @param smsCode required
 * @returns {Promise<User>}
 */
export async function login (query = {}) {
    if (!query.username) {
        const error = { code: -1, message: '手机号码不能为空' }
        throw error
    }
    if (!PHONE_EXP.test(query.username)) {
        const error = { code: -1, message: '手机号码格式不正确(6到18位字母和数字)' }
        throw error
    }
    if (!query.password) {
        const error = { code: -1, message: '密码不能为空' }
        throw error
    }
    if (!PASSWORD_EXP.test(query.password)) {
        const error = { code: -1, message: '密码格式不正确(8-16位字符至少一个字母及数字)' }
        throw error
    }
    const response = await request(`${apiPrefix}/wx/auth/login_v1?username=${query.username}&password=${query.password}&mobile=${query.mobile}`, {
        method: 'POST'
    })
    if (response.errno === 0) {
        UserData = {
            token: response.data.token,
            ...response.data.userInfo
        }
        localStorage.setItem('UserData', JSON.stringify(UserData))
        return response.data
    } else {
        console.log(response)
        const error = { code: -1, message: response.errmsg }
        throw error
    }
    // let response = await AV.User.signUpOrlogInWithMobilePhone(phoneNumber, smsCode)
    // return response
}

/**
 * 获取用户信息
 * @returns {Promise<User>}
 */
export function getUserData () {
    return JSON.parse(localStorage.getItem('UserData')) || null
}

/**
 * 退出登录
 */
export async function logOut () {
    const response = await AV.User.logOut()
    // localStorage.clear()
    return response
}

/**
 * 删除账号

 * @returns {Promise<User>}
 */
export async function deleteAccount () {
    const userId = getUserData().userId
    const response = await request(`${apiPrefix}/wx/auth/clear?userId=${userId}`, {
        method: 'POST'
    })
    return response.data
}
/**
 * 购物车商品货品勾选状态
 * @returns {Promise<User>}
 */
export async function cartChecked (query) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/cart/checked?userId=${userId}&${queryString.stringify(query)}`, { method: 'POST' })
    return response.data
}

/**
 * 修改购物车
 * @returns {Promise<User>}
 */
export async function cartUpdate (query) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/cart/update?userId=${userId}&${queryString.stringify(query)}`, { method: 'POST' })
    return response.data
}
/**
 * 删除购物车
 * @returns {Promise<User>}
 */
export async function cartDelete (query) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/cart/delete?userId=${userId}&${queryString.stringify(query)}`, { method: 'POST' })
    return response.data
}
/**
 * 获取收获地址列表
 * @returns {Promise<User>}
 */
export async function getAddressList () {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/address/list?userId=${userId}`)
    const listData = response.data.list
    return listData
}

/**
 * 获取收获地址详情
 * @returns {Promise<User>}
 */
// export async function getAddressDetails (id) {
//     const userData = getUserData()
//     const userId = userData.userId
//     const response = await request(`${apiPrefix}/wx/address/detail?userId=${userId}&id=${id}`)
//     const data = response.data
//     return data
// }
export async function getAddressDetails (id) {
    const address = new AV.Query('AddressList')
    address.equalTo('objectId', id)
    const response = await address.first()
    return {
        ...response.attributes
    }
}

/**
 * 获取默认地址
 * @returns {Promise<User>}
 */
export async function getAddressDefault () {
    const data = await getAddressList()
    return data.length === 0 ? null : data[0]
}

/**
 * 获取添加/更新地址
 * @returns {Promise<User>}
 */
// export async function saveAddress (query) {
//     const userData = getUserData()
//     const userId = userData.userId
//     const response = await request(`${apiPrefix}/wx/address/save?userId=${userId}`, {
//         method: 'POST',
//         body: { ...query }
//     })
//     return response.data
// }
export async function saveAddress (query) {
    console.log(query)
    const Address = AV.Object.extend('AddressList')
    const address = new Address()
    const currentUser = AV.User.current()
    query.user = currentUser
    for (const key in query) {
        // console.log(key, query[key])
        address.set(key, query[key])
    }
    await address.save()
}

/**
 * 更新地址
 * @returns {Promise<User>}
 */
export async function updateAddress (objectId, query) {
    // console.log(query)
    const Address = AV.Object.createWithoutData('AddressList', objectId)
    for (const key in query) {
        // console.log(key, query[key])
        Address.set(key, query[key])
    }
    await Address.save()
}

/**
 * 删除地址
 * @returns {Promise<User>}
 */
export async function deleteDddress (objectId) {
    const Address = AV.Object.createWithoutData('AddressList', objectId)
    await Address.destroy()
    // const userData = getUserData()
    // const userId = userData.userId
    // const response = await request(`${apiPrefix}/wx/address/delete?userId=${userId}&id=${id}`, {
    //     method: 'POST'
    // })
    // return response.data
}

/**
 * 获取当前用户收货地址
 * @returns {Promise<*>}
 */
export async function getAddress () {
    const address = new AV.Query('AddressList')
    const currentUser = AV.User.current()
    address.equalTo('user', currentUser)
    const response = await address.find()
    return response.map(i => {
        return {
            ...i.attributes,
            id: i.id
        }
    })
}

/**
 * 商品列表
 */
export async function getGoodsByKeys (query) {
    const response = await request(`${apiPrefix}/wx/goods/list?${queryString.stringify(query)}`)
    // console.log(response)
    const listData = response.data.list
    for (let i = 0; i < listData.length; i++) {
        // console.log(i)
        const item = listData[i]
        const data = {
            title: item.name,
            link: '',
            price: item.retailPrice,
            comment: '',
            imgSrcArray: item.picUrl,
            thumbnail: item.picUrl,
            id: item.id,
            details: ''
        }
        listData[i] = data
    }
    // console.log(listData)
    return listData
}

/**
 * 商品详情
 */
export async function getGoodsDetail (id) {
    const response = await request(`${apiPrefix}/wx/goods/detail?id=${id}`)
    const item = response.data.info
    const data = {
        title: item.name,
        link: '',
        price: item.retailPrice,
        comment: '',
        imgSrcArray: item.brief.split(','),
        thumbnail: item.picUrl,
        id: item.id,
        details: item.detail
    }
    return data
}

/**
 * 获取收藏列表/传id即判断是否收藏
 * @returns {Promise<User>}
 */
export async function collectList (id) {
    const userData = getUserData()
    const userId = userData.userId
    const params = {
        userId,
        page: 1,
        limit: 30
    }
    const response = await request(`${apiPrefix}/wx/collect/list?${queryString.stringify(params)}`)
    const listData = response.data.list
    for (let i = 0; i < listData.length; i++) {
        // console.log(i)
        const item = listData[i]
        const data = {
            title: item.name,
            link: '',
            price: item.retailPrice,
            comment: '',
            imgSrcArray: item.picUrl,
            thumbnail: item.picUrl,
            id: item.id,
            details: '',
            valueId: item.valueId
        }
        listData[i] = data
    }
    if (id) {
        const data = listData.filter((item) => item.valueId === id)
        return data.length !== 0 ? data[0] : null
    } else return listData
}

/**
 * 添加/删除收藏
 * @returns {Promise<User>}
 */
export async function couponAddorDelete (valueId) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/collect/addordelete?userId=${userId}&valueId=${valueId}`, {
        method: 'POST'
    })
    return response.data
}

/**
 * 添加购物车
 * @return Array<cart>
 */
// export async function addCart (query) {
//     const response = await request(`${apiPrefix}/wx/cart/add?${queryString.stringify(query)}`, { method: 'POST' })
//     if (response.errno === 0) {
//         return response.data
//     } else {
//         const error = { code: -1, message: response.errmsg }
//         throw error
//     }
// }

/**
 *立刻购买购物车
 * @return Array<cart>
 */
export async function fastadd (query) {
    const response = await request(`${apiPrefix}/wx/cart/fastadd?${queryString.stringify(query)}`, { method: 'POST' })
    if (response.errno === 0) {
        return response.data
    } else {
        const error = { code: -1, message: response.errmsg }
        throw error
    }
}
/**
 * 获取购物车列表/单个
 * @returns {Promise<User>}
 */
// export async function getCart (id) {
//     const userData = getUserData()
//     const userId = userData.userId
//     const response = await request(`${apiPrefix}/wx/cart/index?userId=${userId}`)
//     const listData = response.data.cartList
//     for (let i = 0; i < listData.length; i++) {
//         // console.log(i)
//         const item = listData[i]
//         const data = {
//             title: item.goodsName,
//             link: '',
//             price: item.price,
//             comment: '',
//             imgSrcArray: [item.picUrl],
//             thumbnail: item.picUrl,
//             id: item.id,
//             details: '',
//             buyCount: item.number,
//             checked: item.checked,
//             goodsId: item.goodsId
//         }
//         listData[i] = data
//     }
//     if (id) return listData.filter((item) => String(item.id) === id)
//     else return listData
// }

/**
 * 提交订单
 * @returns {Promise<User>}
 */
export async function orderAlipay (orderId) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/order/alipay?userId=${userId}&orderId=${orderId}`, {
        method: 'POST'
    })
    return response.data
}

/**
 * 提交订单
 * @returns {Promise<User>}
 */
export async function orderSubmit (query) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/order/submit?userId=${userId}&${queryString.stringify(query)}`, {
        method: 'POST'
    })
    return response.data.orderId
}

/**
 * 修改订单
 * @returns {Promise<User>}
 */
export async function orderPay201 (orderId) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/order/pay201?userId=${userId}&orderId=${orderId}`, {
        method: 'POST'
    })
    return response.data
}

/**
 * 获取订单柯诺使用优惠卷
 * @returns {Promise<User>}
 */
export async function couponSelectlist (cartId) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/coupon/selectlist?userId=${userId}&cartId=${cartId}`)
    const listData = response.data.list
    listData.forEach((item, index) => {
        item.startTime[1] -= 1
        item.endTime[1] -= 1
        const data = {
            id: item.id,
            name: item.name,
            condition: `满${Math.floor(item.min)}可用`,
            startAt: new Date(...item.startTime).getTime() / 1000,
            endAt: new Date(...item.endTime).getTime() / 1000,
            description: '全场商品通用',
            value: item.discount * 100,
            valueDesc: Math.floor(item.discount),
            unitDesc: '元'
        }
        listData[index] = data
    })
    // console.log(listData)
    return listData
}
/**
 * 取消订单
 * @returns {Promise<User>}
 */
// export async function orderDelete (orderId) {
//     const userData = getUserData()
//     const userId = userData.userId
//     const response = await request(`${apiPrefix}/wx/order/cancel?userId=${userId}&orderId=${orderId}`, {
//         method: 'POST'
//     })
//     return response.data
// }
export async function orderDelete (orderId) {
    let listData = getOrderList(0)
    listData = listData.filter(i => i.orderId !== orderId)
    const currentUser = AV.User.current().id
    localStorage.setItem('order-record' + currentUser, JSON.stringify(listData))
}
/**
 * 申请退款
 * @returns {Promise<User>}
 */
export async function orderRefund (query) {
    const userData = getUserData()
    const userId = userData.userId
    const response = await request(`${apiPrefix}/wx/order/refund?userId=${userId}&${queryString.stringify(query)}`, {
        method: 'POST'
    })
    return response.data
}

/**
 * 获取订单
 * @returns {Promise<User>}
 */
// export async function getOrderList (showType) {
//     const userData = getUserData()
//     const userId = userData.userId
//     const params = {
//         page: 1,
//         limit: 30
//     }
//     const response = await request(`${apiPrefix}/wx/order/list?userId=${userId}&showType=${showType}&${queryString.stringify(params)}`, {
//         method: 'GET'
//     })
//     const listData = response.data.list
//     for (const i in listData) {
//         const item = listData[i]
//         for (const j in item.goodsList) {
//             const data = item.goodsList[j]
//             item.goodsList[j] = {
//                 title: data.goodsName,
//                 price: data.price,
//                 imgSrcArray: [data.picUrl],
//                 thumbnail: data.picUrl,
//                 id: data.id + item.orderSn,
//                 buyCount: data.number,
//                 checked: data.checked,
//                 goodsId: data.id,
//                 orderSn: item.orderSn,
//                 orderStatusText: item.orderStatusText,
//                 orderstatus: item.orderstatus
//             }
//         }
//     }
//     // console.log(listData)
//     return listData
// }

/**
 * 登陆IP记录
 * @returns {Promise<User>}
 */
export async function addLogindata (data) {
    // console.log(data)
    const response = await request(`http://47.56.217.76/:80/logindata/add?${queryString.stringify(data)}`)
    return response.data
}

/**
 * 添加收藏
 * @returns {Promise<this>}
 */
export function addCollection (data) {
    const currentUser = AV.User.current().id
    const collection = JSON.parse(localStorage.getItem(`collection-${currentUser}`)) || []
    collection.push(data)
    localStorage.setItem(`collection-${currentUser}`, JSON.stringify(collection))
}

/**
 * 删除收藏
 * @returns {Promise<this>}
 */
export function deleteCollection (data) {
    const currentUser = AV.User.current().id
    const collection = JSON.parse(localStorage.getItem(`collection-${currentUser}`)) || []
    const index = collection.findIndex((item) => item.id === data.id)
    collection.splice(index, 1)
    localStorage.setItem(`collection-${currentUser}`, JSON.stringify(collection))
}

/**
 * 获取收藏
 * @returns {Promise<this>}
 */
export function getCollectionList () {
    const currentUser = AV.User.current().id
    return JSON.parse(localStorage.getItem(`collection-${currentUser}`)) || []
}

/**
 * 判断是否收藏收藏
 * @returns {Promise<this>}
 */
export function ifCollection (id) {
    console.log(id)
    const currentUser = AV.User.current().id
    const collection = JSON.parse(localStorage.getItem(`collection-${currentUser}`)) || []
    const index = collection.findIndex((item) => item.id === id)
    // console.log(index !== -1)
    return index !== -1
}
/**
 * 添加购物车
 * @return Array<cart>
 */
export function addCart (details) {
    console.log(details.id)
    const cart = JSON.parse(window.localStorage.getItem('cart-record')) || []
    // let commodity = getCommodityDetails(category, type, id)
    const isExistIndex = cart.findIndex((item) => item.commodity.id === details.id)
    if (isExistIndex === -1) {
        cart.push({
            cartId: cart.length + 1,
            commodity: details
        })
    }
    window.localStorage.setItem('cart-record', JSON.stringify(cart))
}
/**
 * 添加订单
 * @param array[{buyCount, bookId}] 图书Id以及购买量的列表
 * @return orderId
 */
export function addOrder (array) {
    const currentUser = AV.User.current().id
    const order = JSON.parse(window.localStorage.getItem('order-record' + currentUser)) || []
    const orderId = getOrderId()
    const books = []
    array.forEach((item) => {
        // let currentBook = item.commodity
        const buyCount = item.buyCount
        books.push({
            buyCount,
            commodity: item.commodity
        })
    })
    order.unshift({
        orderId,
        status: 0, // 付款标识
        books
    })
    window.localStorage.setItem('order-record' + currentUser, JSON.stringify(order))
    return orderId
}

export function getOrderId () {
    let orderId = ''
    for (let i = 0; i < 10; i++) {
        orderId += Math.floor(Math.random() * 10)
    }
    orderId = new Date().getTime() + orderId
    return orderId
}

/**
 * 获取购物车
 * @return Array<cart>
 */
export function getCart () {
    return JSON.parse(window.localStorage.getItem('cart-record')) || []
}

/**
 * 删除购物车项
 * @param bookId
 */
export function removeCartItem (cartId) {
    const cart = JSON.parse(window.localStorage.getItem('cart-record')) || []
    const index = cart.findIndex((item) => item.cartId === cartId)
    if (index !== -1) {
        cart.splice(index, 1)
    }
    window.localStorage.setItem('cart-record', JSON.stringify(cart))
}

/**
 * 获取订单
 * @return Array<Order>
 */
export function getOrder (id) {
    const currentUser = AV.User.current().id
    if (id) {
        const orders = JSON.parse(window.localStorage.getItem('order-record' + currentUser)) || []
        return orders.find((item) => String(item.orderId) === String(id))
    } else {
        return JSON.parse(window.localStorage.getItem('order-record' + currentUser)) || []
    }
}

export async function updateAddressBooks (id, bookNames) {
    const address = AV.Object.createWithoutData('address', id)
    address.set('booknames', bookNames)
    return address.save()
}

export function ConfirmOrder (id) {
    const currentUser = AV.User.current().id
    const orders = JSON.parse(window.localStorage.getItem('order-record' + currentUser)) || []
    const index = orders.findIndex((item) => String(item.orderId) === String(id))
    orders.splice(index, 1, {
        ...orders[index],
        status: 1
    })
    window.localStorage.setItem('order-record' + currentUser, JSON.stringify(orders))
}

export function getOrderList (status) {
    status--
    let data = getOrder()
    // console.log(status)
    // console.log(getOrder())
    if (status !== -1) data = data.filter(i => i.status === status)
    // getOrder().forEach((i) => {
    //     // console.log(i)
    //     if (status === undefined) data.push(i)
    //     else if (i.status === status) data.push(i)
    //     // i.books.forEach((b) => {
    //     //     if (status === undefined) data.push({ orderId: i.orderId, status: i.status, book: b })
    //     //     else if (i.status === status) data.push({ orderId: i.orderId, status: i.status, book: b })
    //     // })
    // })
    return data
}

// 已领取优惠卷列表
export function getCouponsList (data) {
    const userId = AV.User.current().id
    let couponsList = localStorage.getItem('couponsList-' + userId)
    couponsList = couponsList ? JSON.parse(couponsList) : []
    return couponsList
}

// 领取优惠卷
export function getCoupons (data) {
    const userId = AV.User.current().id
    const couponsList = getCouponsList()
    couponsList.push(data)
    localStorage.setItem('couponsList-' + userId, JSON.stringify(couponsList))
}

// 执行组合排列的函数
export function doExchange (array) {
    var len = array.length
    // 当数组大于等于2个的时候
    if (len >= 2) {
        // 第一个数组的长度
        var len1 = array[0].length
        // 第二个数组的长度
        var len2 = array[1].length
        // 2个数组产生的组合数
        var lenBoth = len1 * len2
        //  申明一个新数组,做数据暂存
        var items = new Array(lenBoth)
        // 申明新数组的索引
        var index = 0
        // 2层嵌套循环,将组合放到新数组中
        for (let i = 0; i < len1; i++) {
            for (var j = 0; j < len2; j++) {
                items[index] = [array[0][i], array[1][j]]
                index++
            }
        }
        // 将新组合的数组并到原数组中
        var newArr = new Array(len - 1)
        for (let i = 2; i < array.length; i++) {
            newArr[i - 1] = array[i]
        }
        newArr[0] = items
        // 执行回调
        return doExchange(newArr)
    } else {
        return array[0]
    }
}
