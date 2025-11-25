<template>
    <div class="todo_input_box fade-up">
        <input type="text" v-model="newTodo" @keydown.enter="submitTodo" class="big n" :placeholder="t('inputPlaceholder')"   />
        <button class="big n" @click="submitTodo">{{ t("submit") }}</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useI18n } from "vue-i18n";

    // i18n
    const { t } = useI18n();

    const newTodo = ref('')
    const emit = defineEmits(['add-todo'])

    // 이벤트 부모 App.vue에 전달
    const submitTodo = () => {
        const trimmed = newTodo.value.trim()
        if (trimmed) {
            emit('add-todo', trimmed)
            newTodo.value = ''
        } else {
            alert('할 일을 입력해주세요!')
        }
    }
</script>

<style scoped lang="scss">
@import '../styles/todoInput.scss';
</style>