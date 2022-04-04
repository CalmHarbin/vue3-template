# Vue3 + Typescript + Vite

### 前言

因为每次在开发新项目时，都需要一个开箱即用的基础框架，避免重新开始搭建而浪费时间，遂记录下从零开始搭建一个开箱即用的框架。随着前端的发展，未来版本的更新需要重新搭建框架时也可以作个参考。

实现功能

-   <input type="checkbox" checked>使用 `Vue3` 进行开发</input>
-   <input type="checkbox" checked>构建工具 使用 `Vite`</input>
-   <input type="checkbox" checked>使用 `vue-router`</input>
-   <input type="checkbox" checked>使用 `Vuex`</input>
-   <input type="checkbox" checked>集成 `Typescript`</input>
-   <input type="checkbox" checked>集成 `Scss` 来编写 css</input>
-   <input type="checkbox" checked>集成 `Eslint` + `Stylelint` + `Prettier` 来规范和格式化代码</input>
-   <input type="checkbox" checked>环境区分</input>
-   <input type="checkbox" checked>生产环境使用 cdn、gzip</input>
-   <input type="checkbox" checked>封装 `axios` 请求</input>
-   <input type="checkbox" checked>集成 `Mock` 辅助开发</input>
-   <input type="checkbox" checked>集成 `element-plus`</input>

项目整体目录

```ts
├── dist/                   // 打包文件的目录
├── env/                    // 环境配置目录
|   ├── .env.development    // 开发环境
|   ├── .env.production     // 生产环境
├── mock/                   // mock
|   ├── index.ts
├── src/
|   ├── assets/             // 存放图片
|   ├── components/         // 自定义组件
|   ├── pages/              // 页面
|   ├── router/             // 路由
|   ├── store/
|   |   ├── index.ts        // store 配置文件
|   |   ├── index.d.ts      // 声明文件
|   |   └── modules
|   |       └── system.ts   // 自己的业务模块，这里写|个示例
|   ├── styles/             // 样式文件
|   ├── App.vue
|   ├── env.d.ts
|   ├── main.ts
|   └── shims-vue.d.ts
├── .eslintignore           // eslint忽略文件
├── .eslintrc.js            // eslint配置文件
├── .gitignore              // git忽略文件
├── .prettierrc             // prettier配置文件
├── .stylelintignore        // stylelint忽略文件
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── stylelint.config.js     // stylelint配置文件
├── tsconfig.json
└── vite.config.ts
```

### 生成基本框架

```sh
npm init @vitejs/app
# 或指定vue-ts模板
npm init @vitejs/app vue3-test --template vue-ts
```

<img src="http://file.calmharbin.icu//WEBRESOURCEa70c12e11150f022e3299502c1357972.png" width="400">

### 做一下简单的配置

修改 vite.config.ts 文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果这里飘红则安装下依赖。pnpm add @types/node -D
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        // 请求代理
        proxy: {
            '/dev': {
                target: 'https://xxx.com/api',
                changeOrigin: true,
                // 路径重写，去掉/dev
                rewrite: (path) => path.replace(/^\/dev/, '')
            }
        }
    },
    build: {
        // 禁用 gzip 压缩大小报告，以提升构建性能
        brotliSize: false,
        /** 配置打包问js,css,img分别在不同文件夹start */
        assetsDir: 'static/img/',
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
        /** 配置打包问js,css,img分别在不同文件夹end */
    }
})
```

同时 tsconfig.json 添加写别名使编辑器可以识别

```json
{
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
}
```

### 添加 Vue Router

安装

```sh
pnpm add vue-router@4
```

创建一个示例页面`src/views/demo/index.vue`

```html
<template>
    <div class="test-container page-container">
        <div class="page-title">Unit Test Page</div>
        <p>count is: {{ count }}</p>
        <button @click="increment">increment</button>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue'

    export default defineComponent({
        name: 'demo-page',
        setup() {
            const count = ref<number>(0)
            const increment = () => {
                count.value += 1
            }
            return { count, increment }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                console.log(this)
            }
        }
    })
</script>
```

创建路由配置文件 `src/router/index.ts`

```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/demo',
        name: '/demo',
        component: () => import('@/views/demo/index.vue')
    }
]
const router = createRouter({
    // history 模式的实现。hash模式:createWebHashHistory()
    history: createWebHistory(),
    routes
})

export default router
```

在 `main.ts` 文件中挂载路由配置

```js
import router from './router'
createApp(App).use(router).mount('#app')
```

在 `App.vue` 中放一个容器

```html
<router-view></router-view>
```

### 添加 Vuex

安装

```sh
pnpm add vuex@next
```

创建 vuex 配置文件

```
└── src/
    ├── store/
        ├── index.ts  // store 配置文件
        ├── modules
            ├── system.ts // 系统模块
```

`src/store/index.ts`内容如下

```ts
import { createStore } from 'vuex'

const files = import.meta.globEager('./modules/*.ts')
const keys = Object.keys(files)

const modules: any = {}

keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
    }
})

export default createStore({
    modules
})
```

`src/store/modules/system.ts`如下

```ts
export default {
    namespaced: true,
    state: () => ({
        title: 'vue3'
    })
}
```

在 `main.ts` 文件中挂载 vuex

```js
import store from './store'
createApp(App).use(store).mount('#app')
```

### 添加 scss

```
pnpm add sass
```

配置全局 scss 文件，修改 `vite.config.ts`

```js
css: {
    // css预处理器
    preprocessorOptions: {
        scss: {
            additionalData: '@import "./src/styles/global.scss";'
        }
    }
},
```

### 添加 eslint

```
pnpm add eslint -D
```

生成配置文件

```
npx eslint --init
```

-   How would you like to use ESLint? （你想如何使用 ESLint?）
    <img src="http://file.calmharbin.icu/c1424c45d06d4900807b3e0435911f4e_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）

-   What type of modules does your project use?（你的项目使用哪种类型的模块?）
    <img src="http://file.calmharbin.icu/26e9ec1fd2934265847b0dabe908e6be_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 JavaScript modules (import/export)

-   Which framework does your project use? （你的项目使用哪种框架?）
    <img src="http://file.calmharbin.icu/412df4bebb2c43b2858d5093652cc8ca_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Vue.js

-   Does your project use TypeScript?（你的项目是否使用 TypeScript？）
    <img src="http://file.calmharbin.icu/ee8aa15a0de84f2d9f16402f6870b3cd_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Yes

-   Where does your code run?（你的代码在哪里运行?）
    <img src="http://file.calmharbin.icu/c86eb167b09a414dabb7ec3edb70a377_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）

-   How would you like to define a style for your project?（你想怎样为你的项目定义风格？）
    <img src="http://file.calmharbin.icu/f8beb21b44a14dbba7e0b9153d1f6a03_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Use a popular style guide（使用一种流行的风格指南）

-   Which style guide do you want to follow?（你想遵循哪一种风格指南?）
    <img src="http://file.calmharbin.icu/596c3755247a45a990d8c847d76fdad1_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 Airbnb（github 上 star 最高）

-   What format do you want your config file to be in?（你希望你的配置文件是什么格式?）
    <img src="http://file.calmharbin.icu/6217a3458af34010bd8a3a55a0c03629_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 JavaScript

-   Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）
    <img src="http://file.calmharbin.icu/6b1be913778348d1a59c2d7ea4c27a0c_tplv-k3u1fbpfcp-watermark.png" width="400">
    我们这里选择 No，根据提示需要安装的依赖包，我们自己使用 pnpm 安装。

```sh
pnpm add -D eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
```

修改`.eslintrc.js`文件

```
// 因为我们使用的是 vue3，所以使用 vue3 的校验规则
plugin:vue/essential 修改成 plugin:vue/vue3-recommended

// 增加uni的声明
globals: {
    /** 避免uni报错 */
    uni: true,
    UniApp: true
},
```

增加 eslint 忽略文件 `src/.eslintignore`

```
index.html
*.d.ts
```

### 安装 stylelint

```
pnpm add -D stylelint stylelint-config-rational-order stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard-scss stylelint-order
```

根目录下新增配置文件 `stylelint.config.js`

```js
module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order'
    ],
    ignoreFiles: ['**/*.js', '**/*.ts', 'dist/*', 'node_modules/*', '.eslintrc.js']
}
```

### 安装 prettier

```sh
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier stylelint-config-prettier
```

添加 prettier 的配置文件 `.prettierrc`

```
{
    "trailingComma": "none",
    "printWidth": 100,
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "endOfLine": "auto"
}

```

修改 `.eslintrc.js` 来解决与 eslint 的冲突

```js
extends: [
    'plugin:prettier/recommended' // 一定要放在最后一项
],
rules: {
    'prettier/prettier': [
        'error',
        {
            trailingComma: 'none',
            printWidth: 100,
            tabWidth: 4,
            semi: false,
            singleQuote: true,
            endOfLine: 'auto'
        }
    ]
}
```

修改 `stylelint.config.js` 来解决与 stylelint 的冲突

```js
extends: [
    'stylelint-config-prettier' // 一定要放在最后一项
]
```

#### 你可能遇到的问题：

##### **eslint 报：使用别名报错 import/no-unresolved**

<img src="http://file.calmharbin.icu/WEBRESOURCE04d1585a4f7961d2c1cf34a531fb9b69.png" width="400">

解决办法：

安装依赖

```
pnpm add eslint-import-resolver-alias -D
```

修改 `.eslintrc.js`

```
settings: {
    'import/resolver': {
        alias: {
            map: [['@', './src']],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
    }
},
rules: {
    // 解决vite+airbnb导致eslint报错import/extensions
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never'
        }
    ]
}
```

##### **stylelint 报错：Unknown word**

<img src="http://file.calmharbin.icu/WEBRESOURCE31c62db7289cb34d48a11f6a84d8a17c.png" width="400">

解决办法：将报错的文件添加到忽略文件（`.stylelintignore`）即可

##### **vite.config.ts 文件报错**

<img src="http://file.calmharbin.icu/20220227225628.png" width="400">

解决办法：配置 eslint 规则

```ts
rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
}
```

**编译器宏，如 defineProps 和 defineEmits 生成 no-undef 警告**

<img src="http://file.calmharbin.icu/WEBRESOURCEbd009c10b10265b15d30b93b88477b6c.png" width="400">

修改 `.eslintrc.js`

```
env: {
    'vue/setup-compiler-macros': true
}
```

### 环境区分

实现功能：

-   可以直接区分开发环境和生产环境
-   自定义环境变量增加 typescript 提示

在根目录下新建 env 文件夹用来存放环境变量配置文件，同时修改 vite 配置（环境变量的根目录）。

> 因为 vite 默认是将项目根目录作为环境变量配置的目录，所以我们需要修改下 vite 的配置指向 env 文件夹

修改 `vite.config.js`

```ts
export default defineConfig({
    envDir: resolve(__dirname, 'env')
})
```

同时新增 env 文件夹

```ts
├── env/
    ├── .env                    // 公共配置
    ├── .env.development        // 开发环境
    ├── .env.production         // 生产环境
    ├── index.d.ts              // 声明文件
```

需要检查下 `tsconfig.json` 文件是否包含了 `env/index.d.ts`，如果没有需要我们添加一下。

```ts
"include": ["env/index.d.ts"]
```

编辑 `src/.env.d.ts` 文件增加自定义变量的声明

```ts
/** 扩展环境变量import.meta.env */
interface ImportMetaEnv {
    /** 标题 */
    VITE_APP_TITLE: string
    /** 接口地址 */
    VITE_REQUEST_BASE_URL: string
}
```

### 添加 gzip

安装

```sh
pnpm add vite-plugin-compression -D
```

修改 `vite.config.ts`

```js
import { PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ command }) => {
    let plugins: (PluginOption | PluginOption[])[] = [vue()]

    // 打包时的配置
    if (command === 'build') {
        plugins = plugins.concat([
            viteCompression({
                // 生成压缩包gz
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz'
            })
        ])
    }
    return {
        plugins
    }
})
```

### 使用 cdn

安装

```sh
pnpm add vite-plugin-cdn-import -D
```

修改 `vite.config.ts`

```js
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

export default defineConfig({
    plugins: [
        importToCDN({
            prodUrl: '//unpkg.com/{name}@{version}/{path}',
            modules: [
                autoComplete('vue'),
                {
                    name: 'vue-router',
                    var: 'VueRouter',
                    path: '//unpkg.com/vue-router@4.0.12/dist/vue-router.global.js'
                },
                {
                    name: 'vuex',
                    var: 'Vuex',
                    path: '//unpkg.com/vuex@4.0.2/dist/vuex.global.js'
                },
                {
                    name: 'element-plus',
                    var: 'ElementPlus',
                    path: '//unpkg.com/element-plus@1.3.0-beta.9/dist/index.full.min.js'
                    /**
                     * 这里没有写css是因为main.js中引入了css，配置rollup的external可以忽略打包，但是 import 'element-plus/dist/index.css' 语句还是会被打包进去，导致报错。暂未找到解决办法。
                     * 更改为：去掉main.js中引入样式，直接在html中引入。
                     */
                    // css: '//unpkg.com/element-plus@1.3.0-beta.9/dist/index.css'
                }
            ]
        })
    ]
})
```

### 封装 axios

实现功能：

-   统一配置接口地址
-   统一设置超时时间/报文格式/报文加密
-   统一身份认证
-   统一处理登录超时/接口异常提示
-   统一返回接口格式

新建 `src/utils/request/index.ts` 用来存放我们的代码。

```ts
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
        } else {
            url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
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
```

使用方式

```ts
import request from '@/utils/request'

request
    .get('/api/getList', {
        page: 1,
        size: 20
    })
    .then((res) => {
        console.log(res)
    })
```

### 集成 `Mock` 辅助开发

实现功能：

-   统一管理我们想要 mock 的接口
-   便捷切换是否 mock
-   自由控制哪些接口 mock，哪些接口真实请求（接口配置了 mock 则为 mock，否则为请求）
-   对于调用接口的地方是否 mock 是无感知的

比如：

```ts
import request from '@/utils/request'
/**
 * 这样写，既可以是mock数据，也可以是调用接口。
 */
request.get('/getUserInfo')
```

安装 `mock`

```sh
pnpm add mockjs
pnpm add -D @types/mockjs
```

前面我们在环境变量里添加了统一接口地址。我们先制定如下规则：

```
# 请求接口地址
VITE_REQUEST_BASE_URL = /dev # 这样可以直接使用代理请求
VITE_REQUEST_BASE_URL = /dev/mock # 这样就可以开启mock
VITE_REQUEST_BASE_URL = https://xxx.com/api # 这样就是直接请求接口
```

根目录下创建 `mock/index.ts` 文件来存放我们的 Mock 规则。

```ts
import Mock from 'mockjs'

// 基于我们制定的规则，这里必须做下判断，这个很重要。
if (/\/mock$/.test(import.meta.env.VITE_REQUEST_BASE_URL)) {
    // 这里添加 /getUserInfo 这个接口mock数据
    Mock.mock(`${import.meta.env.VITE_REQUEST_BASE_URL}/getUserInfo`, {
        code: 200,
        success: true,
        msg: '',
        result: {
            name: Mock.Random.cname()
        }
    })
}
```

在 main.js 中引入下。（为什么要引入？不引入代码怎么执行啊）

```ts
import '../mock'
```

接下来改造我们封装的请求。

修改 `src/utils/request/index.ts`

```ts
import Mock from 'mockjs'

if (/^(http|https):\/\/.*/.test(config.url)) {
    // 如果是以http/https开头的则不添加VITE_REQUEST_BASE_URL
    url = config.url
    // eslint-disable-next-line no-underscore-dangle
} else if (Mock._mocked[import.meta.env.VITE_REQUEST_BASE_URL + config.url]) {
    // 如果是mock数据,Mock._mocked上记录有所有已设置的mock规则。
    url = import.meta.env.VITE_REQUEST_BASE_URL + config.url
} else {
    /**
     * 开启mock时需要去掉mock路径,不能影响正常接口了。
     * 如果碰巧你接口是 /api/mock/xxx这种,那VITE_REQUEST_BASE_URL就配置/api/mock/mock吧
     */
    url = import.meta.env.VITE_REQUEST_BASE_URL.replace(/\/mock$/, '') + config.url
}
```

> 如果 `Mock._mocked` 报 `类型“typeof mockjs”上不存在属性“_mocked”`，需要我们扩展下声明

```ts
// src/shims-vue.d.ts

// 扩展mock
declare module 'mockjs' {
    /** 所有已注册的mock规则  */
    const _mocked: Record<string, any>
}
```

### 集成 `element-plus`

参考官网：https://element-plus.gitee.io/zh-CN/guide/installation.html

运行效果图
<img src="http://file.calmharbin.icu/20220404140106.png" width="400" />

### 写在最后

如果你想快速的体验 vue3 开发，你可以拉取我的源码直接开发。

> github: https://github.com/CalmHarbin/vue3-template

创作不易、欢迎 ⭐

我的其他文章：

-   [vite+typescript 创建 uni-app 基础框架，开箱即用](https://juejin.cn/post/7073135372888178702)
