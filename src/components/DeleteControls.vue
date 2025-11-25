<template>
  <div class="delete_btn_box fade-up">
    <p class="medium n">{{ t("delete_label") }} :</p>
    <button id="all_del" class="medium n" @click="$emit('delete-all')">{{ t("delete_all") }}</button>
    <!-- <button id="selected_del" class="medium n" @click="$emit('delete-selected', selectedIds)">SELECTED</button> -->
    <button id="done_del" class="medium n" @click="$emit('delete-done', doneIds)">{{ t("delete_done") }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from "vue-i18n";

// i18n
const { t } = useI18n();

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})

// const selectedIds = computed(() =>
//   props.todos.filter(todo => todo.status === 'active').map(todo => todo.id)
// )

const doneIds = computed(() =>
  props.todos.filter(todo => todo.status === 'done').map(todo => todo.id)
)
</script>

<style scoped lang="scss">
@import '../styles/deleteControls.scss';
</style>
