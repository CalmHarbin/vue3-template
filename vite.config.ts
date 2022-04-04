import { defineConfig, loadEnv, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    // 等同 import.meta.env
    // eslint-disable-next-line no-unused-vars
    const env = loadEnv(mode, process.cwd())

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
            }),
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
                    }
                ]
            })
        ])
    }
    return {
        envDir: resolve(__dirname, 'env'),
        plugins,
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        css: {
            // css预处理器
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./src/styles/global.scss";'
                }
            },
            postcss: {
                plugins: [
                    // 解决打包时报warning: "@charset" must be the first rule in the file
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            }
                        }
                    }
                ]
            }
        },
        // 开发服务器配置
        server: {
            host: '0.0.0.0',
            // 请求代理
            proxy: {
                '/dev': {
                    target: 'https://suggest.taobao.com',
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
    }
})
