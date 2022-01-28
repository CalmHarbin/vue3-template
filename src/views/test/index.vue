<template>
    <div class="test-container page-container">
        <div class="page-title" v-for="item in list" :key="item.name">
            {{ item.name }}
        </div>
    </div>

    <el-button @click="setCount">增加{{ count }}{{ username }}</el-button>
    <teleport to="#dialog">
        <Add ref="add"></Add>
    </teleport>
</template>

<script lang="ts">
import {
    ComponentInternalInstance,
    ComponentPublicInstance,
    defineComponent,
    getCurrentInstance,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onMounted,
    onUnmounted,
    onUpdated,
    reactive,
    ref,
    watch
} from 'vue'
import Add from './mods/Add.vue'

export default defineComponent({
    name: 'demo-page',
    components: { Add },
    data() {
        return {}
    },
    setup() {
        const { proxy } = getCurrentInstance() as ComponentInternalInstance

        const list = reactive([
            {
                name: '张三'
            },
            {
                name: '李四'
            }
        ])
        const count = ref(0)
        const setCount = () => {
            count.value += 1
        }
        console.log('setup')
        onBeforeMount(() => {
            console.log('onBeforeMount')
        })
        onMounted(() => {
            proxy.getList()
            console.log('onMounted')
        })
        onBeforeUpdate(() => {
            console.log('onBeforeUpdate')
        })
        onUpdated(() => {
            console.log('onUpdated', count.value)
        })
        onBeforeUnmount(() => {
            console.log('onBeforeUnmount')
        })
        onUnmounted(() => {
            console.log('onUnmounted')
        })
        return { list, count, setCount }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            console.log(this.$refs.add.a, this.username, this.$store.state.system.title)
        },
        setItemRef(el: HTMLElement) {
            console.log(el, el.innerHTML, this.list)
        }
    }
})
</script>
