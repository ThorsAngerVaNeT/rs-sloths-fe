<template>
    <div :class="`home-category home-category_${classPart}`">
        <div class="home-category__wrapper">
            <div class="home-category_up"></div>
            <div class="home-category_down"></div>
        </div>
        <div class="home-category__name"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HomeCategory',

    props: {
        classPart: {
            type: String,
            default: () => ''
        }
    }
})
</script>