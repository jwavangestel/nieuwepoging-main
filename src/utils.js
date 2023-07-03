export function uuid () {
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin (todoList) {
  todoList.subscribe(
    (mutation, state) => localStorage.setItem('boards', JSON.stringify(state.boards))
  )
}
