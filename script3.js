let users = [
  { id: 1, name: 'Nitin' },
  { id: 2, name: 'ajay' },
  { id: 3, name: 'pratik' }
];

let tasks = [
  { id: 1, description: 'Develop backend API', assignee: 1 },
  { id: 2, description: 'Design user interface', assignee: 2 },
  { id: 3, description: 'Write documentation', assignee: 3 }
];

const messages = [
  { id: 1, userId: 1, content: 'Hello, everyone!' },
  { id: 2, userId: 2, content: 'Hey there!' },
  { id: 3, userId: 3, content: 'Good to see you all.' }
];

function init() {
  populateUserList();
  populateTaskList();
  populateMessageList();

  document.getElementById('addTaskBtn').addEventListener('click', addTask);

  document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);

  document.getElementById('addUserBtn').addEventListener('click', addUser);
}

function populateUserList() {

  const userSelect = document.getElementById('userSelect');

users.forEach(user => {
const option = document.createElement('option');
option.value = user.id;
option.textContent = user.name;
userSelect.appendChild(option);
});
  const userList = document.getElementById('userList');

  userList.innerHTML = ''; 

  users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = user.name;
      userList.appendChild(listItem);
  });

  const assigneeSelect = document.getElementById('assigneeSelect');

  assigneeSelect.innerHTML = '<option value="">Select assignee</option>'; 

  users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      assigneeSelect.appendChild(option);
  });
}

function populateTaskList() {
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = ''; 

  tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.textContent = `${task.description} (Assignee: ${getUserById(task.assignee).name})`;
      listItem.setAttribute('data-task-id', task.id);

      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'taskActions';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'editTaskBtn';
      editBtn.addEventListener('click', editTask);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'deleteTaskBtn';
      deleteBtn.addEventListener('click', deleteTask);

      actionsContainer.appendChild(editBtn);
      actionsContainer.appendChild(deleteBtn);

      listItem.appendChild(actionsContainer);
      taskList.appendChild(listItem);
  });
}

function populateMessageList() {
  const messageList = document.getElementById('messageList');

  messageList.innerHTML = ''; 

  messages.forEach(message => {
      const user = getUserById(message.userId);
      const listItem = document.createElement('li');
      listItem.textContent = `${getUserById(message.userId).name}: ${message.content}`;
      messageList.appendChild(listItem);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const assigneeSelect = document.getElementById('assigneeSelect');
  const newTask = {
      id: tasks.length + 1,
      description: taskInput.value,
      assignee: parseInt(assigneeSelect.value)
  };

  tasks.push(newTask);
  populateTaskList();

  taskInput.value = '';
  assigneeSelect.value = '';

  showNotification('Task added successfully!');
}

function sendMessage() {
  const userSelect = document.getElementById('userSelect');
  const messageInput = document.getElementById('messageInput');

  const userId = parseInt(userSelect.value);
  const content = messageInput.value;

  if (userId && content) {
      const newMessage = {
          id: messages.length + 1,
          userId: userId,
          content: content
      };

      messages.push(newMessage);

      messageInput.value = '';

      populateMessageList();
  }
}


function editTask(event) {
  const taskItem = event.target.closest('li');
  const taskId = parseInt(taskItem.getAttribute('data-task-id'));
  const task = tasks.find(t => t.id === taskId);

  const newDescription = prompt('Enter the new task description:', task.description);
  if (newDescription) {
      task.description = newDescription;
      populateTaskList();
      showNotification('Task updated successfully!');
  }
}

function deleteTask(event) {
  const taskItem = event.target.closest('li');
  const taskId = parseInt(taskItem.getAttribute('data-task-id'));
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      populateTaskList();
      showNotification('Task deleted successfully!');
  }
}


  
function addUser() {
const userNameInput = document.getElementById('userNameInput');
const newUserId = users.length + 1;
const newUserName = userNameInput.value;

users.push({ id: newUserId, name: newUserName });
populateUserList();

userNameInput.value = '';

const userSelect = document.getElementById('userSelect');
const newUserOption = document.createElement('option');
newUserOption.value = newUserId;
newUserOption.textContent = newUserName;
userSelect.appendChild(newUserOption);

showNotification('User added successfully!');
}


function getUserById(userId) {
  return users.find(user => user.id === userId);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
      notification.remove();
  }, 3000);
}

init();