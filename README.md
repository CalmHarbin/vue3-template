# Vue 3 + Typescript + Vite

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

```
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

```
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
    <img src="http://file.calmharbin.icu/c1424c45d06d4900807b3e0435911f4e_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）

-   What type of modules does your project use?（你的项目使用哪种类型的模块?）
    <img src="http://file.calmharbin.icu/26e9ec1fd2934265847b0dabe908e6be_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 JavaScript modules (import/export)

-   Which framework does your project use? （你的项目使用哪种框架?）
    <img src="http://file.calmharbin.icu/412df4bebb2c43b2858d5093652cc8ca_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 Vue.js

-   Does your project use TypeScript?（你的项目是否使用 TypeScript？）
    <img src="http://file.calmharbin.icu/ee8aa15a0de84f2d9f16402f6870b3cd_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 Yes

-   Where does your code run?（你的代码在哪里运行?）
    <img src="http://file.calmharbin.icu/c86eb167b09a414dabb7ec3edb70a377_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）

-   How would you like to define a style for your project?（你想怎样为你的项目定义风格？）
    <img src="http://file.calmharbin.icu/f8beb21b44a14dbba7e0b9153d1f6a03_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 Use a popular style guide（使用一种流行的风格指南）

-   Which style guide do you want to follow?（你想遵循哪一种风格指南?）
    <img src="http://file.calmharbin.icu/tos-cn-i-k3u1fbpfcp/596c3755247a45a990d8c847d76fdad1~tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 Airbnb（github 上 star 最高）

-   What format do you want your config file to be in?（你希望你的配置文件是什么格式?）
    <img src="http://file.calmharbin.icu/6217a3458af34010bd8a3a55a0c03629_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 JavaScript

-   Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）
    <img src="http://file.calmharbin.icu/6b1be913778348d1a59c2d7ea4c27a0c_tplv-k3u1fbpfcp-watermark.awebp" width="400">
    我们这里选择 No，根据提示需要安装的依赖包，我们自己使用 pnpm 安装。

```sh
pnpm add -D eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
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

### 常见报错解决办法

**使用别名报错 import/no-unresolved**

<img src="http://file.calmharbin.icu/WEBRESOURCE04d1585a4f7961d2c1cf34a531fb9b69.png" width="400">

安装

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

**`vite.config.ts`文件报错**

<img src="http://file.calmharbin.icu/WEBRESOURCE04d1585a4f7961d2c1cf34a531fb9b69.png" width="400">

修改 `.eslintrc.js`

```
rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['vite.config.ts'] }]
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

**stylelint 报错**

<img src="http://file.calmharbin.icu/WEBRESOURCE31c62db7289cb34d48a11f6a84d8a17c.png" width="400">

编辑 `.stylelintignore` 将其添加到忽略文件即可
