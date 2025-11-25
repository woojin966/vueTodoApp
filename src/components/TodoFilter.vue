<template>
  <div class="filter_box fade-up">
    <button class="medium n" @click="toggleMenu">
      <span>{{ displayText }}</span>
      <font-awesome-icon icon="chevron-down" />
    </button>

    <ul v-show="open" class="filter_menu">
      <li><button @click="updateFilter('all')">ALL</button></li>
      <li><button @click="updateFilter('todo')">TODO</button></li>
      <li><button @click="updateFilter('done')">DONE</button></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)

const toggleMenu = () => (open.value = !open.value)

const updateFilter = (type) => {
  emit('update:modelValue', type)
  open.value = false
}

const displayText = computed(() => props.modelValue.toUpperCase())
</script>

<style scoped lang="scss">
@import '../styles/todoFilter.scss';
</style>
