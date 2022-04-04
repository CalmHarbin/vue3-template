<template>
    <div class="test-container page-container">
        <div class="page-title" v-for="item in list" :key="item.name">
            {{ item.name }}
        </div>
    </div>

    <el-button @click="setCount">增加{{ count }}</el-button>
    <teleport to="#dialog">
        <Add ref="add"></Add>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Add from './mods/Add.vue'

export default defineComponent({
    name: 'demo-page',
    components: { Add },
    data() {
        return {}
    },
    setup() {
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
        return { list, count, setCount }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            console.log(this.$store.state.system.title)
        },
        setItemRef(el: HTMLElement) {
            console.log(el, el.innerHTML, this.list)
        }
    }
})
</script>
