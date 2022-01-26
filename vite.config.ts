import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
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
        }
    },
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        // 请求代理
        proxy: {
            '/dev': {
                target: 'https://nhgw-test.czdtd.com/edi/nhfd/in',
                changeOrigin: true,
                // 路径重写，去掉/dev
                rewrite: (path) => path.replace(/^\/dev/, '')
            }
        }
    },
    build: {
        // 禁用 gzip 压缩大小报告，以提升构建性能
        reportCompressedSize: false
    }
})
