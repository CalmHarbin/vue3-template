<template>
    <div>测试</div>
    <div @click="setA">{{ a }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const a = ref(1)

const setA = () => {
    a.value = 2
}

defineExpose({ a })
</script>
