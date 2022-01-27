/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 声明环境变量
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string

    readonly VITE_QRQUIRE_URL: string
    // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
    readonly env: ImportMetaEnv
}
