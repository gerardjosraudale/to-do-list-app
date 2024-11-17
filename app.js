// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7WX910CgZbh4XoLklUjMxGfu6vEUS6NU",
  authDomain: "to-do-list-app-724dc.firebaseapp.com",
  projectId: "to-do-list-app-724dc",
  storageBucket: "to-do-list-app-724dc.firebasestorage.app",
  messagingSenderId: "471591139974",
  appId: "1:471591139974:web:e9d1f85a249366aa136f07",
  measurementId: "G-4SDD0TV1L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// DOM Elements
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-desc");
const taskList = document.getElementById("task-list");

// Default Form Submit Behavior
async function taskFormDefaultSubmit(e) {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const description = taskDesc.value.trim();

  if (!title) {
    alert("Task title cannot be empty.");
    return;
  }

  try {
    await db.collection("tasks").add({ title, description, status: "pending" });
    taskTitle.value = "";
    taskDesc.value = "";
    loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Attach default submit handler
taskForm.onsubmit = taskFormDefaultSubmit;

// Load Tasks
async function loadTasks() {
  taskList.innerHTML = "";
  const snapshot = await db.collection("tasks").get();
  snapshot.forEach((doc) => {
    const task = doc.data();
    displayTask(doc.id, task.title, task.description, task.status);
  });
}

// Display Task
function displayTask(id, title, description, status) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p>Status: ${status}</p>
    <button onclick="editTask('${id}', '${title}', '${description}')">Edit</button>
    <button onclick="deleteTask('${id}')">Delete</button>
    <button onclick="markAsCompleted('${id}')">Mark as Completed</button>
  `;
  taskList.appendChild(taskItem);
}

// Edit Task
async function editTask(id, title, description) {
  taskTitle.value = title;
  taskDesc.value = description;

  taskForm.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection("tasks").doc(id).update({
        title: taskTitle.value.trim(),
        description: taskDesc.value.trim(),
      });
      taskForm.onsubmit = taskFormDefaultSubmit; // Reset to default submit handler
      taskTitle.value = "";
      taskDesc.value = "";
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
}

// Delete Task
async function deleteTask(id) {
  try {
    await db.collection("tasks").doc(id).delete();
    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Mark Task as Completed
async function markAsCompleted(id) {
  try {
    await db.collection("tasks").doc(id).update({
      status: "completed",
    });
    loadTasks();
  } catch (error) {
    console.error("Error marking task as completed:", error);
  }
}

async function markAsCompleted(id) {
  try {
    await db.collection("tasks").doc(id).update({ status: "completed" });
    loadTasks();
  } catch (error) {
    console.error("Error marking task as completed:", error);
  }
}

taskItem.innerHTML = `
  <h3>${title}</h3>
  <p>${description}</p>
  <button onclick="deleteTask('${id}')">Delete</button>
  <button onclick="markAsCompleted('${id}')">Mark as Completed</button>
`;



// Initial load
loadTasks();
