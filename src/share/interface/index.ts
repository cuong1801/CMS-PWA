import { Unknown } from './Unknown'

interface Base extends Unknown {
    id: string
}

export interface Order extends Base {
    orderId: string
    user: User
    products: Array<ProductOrder>
    status: string
    totalAmount: number
    totalDonate: number
    insertTime: number
    updateTime: number
}

export interface ProductOrder extends Product {
    productId: string
    companyId: string
    quantity: number
    totalAmount: number
    totalDonate: number
    isPayment: boolean
    isDelivery: boolean
    isCancel: boolean
}

export interface Product extends Base {
    price: number
    quantity: number
    donateRate: number
    promoteRate: number
    amount?: number
    donateAmount?: number
    actualPrice?: number
    name?: string
    companyId?: string
    sellable?: boolean
    isFirst?: boolean
    company?: Company
    limitNo?: number
    description?: string
    imageUrl: string
}

export interface Company extends Base {
    name: string
    logo: string
    business?: string
    description?: string
    website?: string
    slug: string
}

export interface User extends Unknown {
    username: string
    fullName: string
    birthday: string
    tel: string
    role: string
    email: string
}

export interface Address {
    name: string
    tel: string
    address: string
}
