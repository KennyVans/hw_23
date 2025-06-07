const API_URL = '/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Получила задачу
async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  renderTodos(todos);
}

// добаили задачу
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  input.value = '';
  fetchTodos();
});

// показать задачи
function renderTodos(todos) {
  list.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.onclick = () => toggleComplete(todo._id, !todo.completed);

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => deleteTodo(todo._id);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

// изменить
async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  fetchTodos();
}

// удалить
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  fetchTodos();
}

fetchTodos();
