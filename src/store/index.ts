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
