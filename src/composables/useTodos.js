import { ref, watch, onMounted } from 'vue'

export function useTodos() {
  const todos = ref([])

  // --- CRUD ----------------------------------------------------------
  const addTodo = (text) => {
    todos.value.push({
      id: Date.now(),
      text,
      status: 'active',
    })
  }

  const toggleStatus = (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.status = todo.status === 'active' ? 'done' : 'active'
    }
  }

  const deleteTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  const deleteAll = () => {
    todos.value = []
  }

  const deleteSelected = (ids) => {
    todos.value = todos.value.filter(todo => !ids.includes(todo.id))
  }

  const deleteDone = (ids) => {
    todos.value = todos.value.filter(todo => !ids.includes(todo.id))
  }

  // --- localStorage ---------------------------------------------------
  onMounted(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        todos.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to load todos', e)
      }
    }
  })

  watch(
    todos,
    (val) => {
      try {
        localStorage.setItem('todos', JSON.stringify(val))
      } catch (e) {
        console.error('Failed to save todos', e)
      }
    },
    { deep: true }
  )

  return {
    todos,
    addTodo,
    toggleStatus,
    deleteTodo,
    deleteAll,
    deleteSelected,
    deleteDone
  }
}
