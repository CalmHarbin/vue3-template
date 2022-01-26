<template>
    <div class="test-container page-container">
        <div class="page-title">Unit Test Page</div>
        <p>count is: {{ count }}</p>
        <button @click="increment">increment</button>

        <el-button>按钮</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: '',
    setup() {
        const count = ref<number>(0)
        const store = useStore()
        console.log(store.state)
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
