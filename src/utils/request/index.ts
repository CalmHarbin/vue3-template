/**
 * uni-request请求封装
 * 1. 统一配置接口地址
 * 2. 统一设置超时时间/报文格式/报文加密
 * 3. 统一身份认证
 * 4. 统一处理登录超时/接口异常提示
 * 5. 统一返回接口格式
 */

import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import Mock from 'mockjs'

// 接口返回统一格式
type responseType = {
    code: number
    success: boolean
    msg: string
    result: any
}

const axios = Axios.create({
    timeout: 60000, // 请求超时 60s
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (config) => {
        let url: string
        if (/^(http|https):\/\/.*/.test(config.url as string)) {
            // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
            url = config.url as string
            // eslint-disable-next-line no-underscore-dangle
        } else if (Mock._mocked[import.meta.env.VITE_REQUEST_BASE_URL + config.url]) {
            // 如果是mock数据也不添加VITE_REQUEST_BASE_URL,Mock._mocked上记录有所有已设置的mock规则
            url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
        } else {
            /**
             * 开启mock时需要去掉mock路径,不能影响正常接口了。
             * 如果碰巧你接口是 /api/mock/xxx这种,那VITE_REQUEST_BASE_URL就配置/api/mock/mock吧
             */
            url = import.meta.env.VITE_REQUEST_BASE_URL.replace(/\/mock$/, '') + config.url
        }

        // 这里还可以添加token等等
        // config.headers['Authorization'] = getToken()

        /**
         * 根据你的项目实际情况来对 config 做处理
         * 这里对 config 不做任何处理，直接返回
         */
        return {
            ...config,
            url
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
    (response: AxiosResponse<responseType, any>) => {
        /**
         * 根据你的项目实际情况来对 response 和 error 做处理
         * 这里对 response 和 error 不做任何处理，直接返回
         */
        if (response.data.success) {
            return response.data
        }

        // 弹出提示
        ElNotification.error({
            title: '提示',
            message: response.data.msg
        })

        return Promise.reject(response.data)
    },
    (error) => {
        if (error.response && error.response.data) {
            const msg = error.response.data.message
            ElNotification.error({
                title: '提示',
                message: msg
            })
            // eslint-disable-next-line no-console
            console.error(`[Axios Error]`, error.response)
        } else {
            ElNotification.error({
                title: '提示',
                message: error
            })
        }
        return Promise.reject(error)
    }
)

export default {
    /** get请求 */
    get: (url: string, params?: any, config?: AxiosRequestConfig<any>) =>
        axios.get<any, responseType, any>(url, { params, ...config }),

    /** post请求 */
    post: (url: string, data?: any, config?: AxiosRequestConfig<any>) =>
        axios.post<any, responseType, any>(url, { data, ...config })
}
