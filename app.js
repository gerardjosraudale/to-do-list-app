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

// Add Task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  const description = taskDesc.value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  try {
    await db.collection("tasks").add({
      title,
      description,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    taskTitle.value = "";
    taskDesc.value = "";
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

// Real-Time Task Updates
function loadTasks() {
  db.collection("tasks")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      taskList.innerHTML = "";
      snapshot.forEach((doc) => {
        const task = doc.data();
        displayTask(doc.id, task.title, task.description, task.status);
      });
    });
}

// Display Task
function displayTask(id, title, description, status) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  if (status === "completed") {
    taskItem.classList.add("completed");
  }
  taskItem.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <p>Status: ${status}</p>
    <button onclick="deleteTask('${id}')">Delete</button>
    ${
      status === "pending"
        ? `<button onclick="markAsCompleted('${id}')">Mark as Completed</button>`
        : ""
    }
  `;
  taskList.appendChild(taskItem);
}

// Mark Task as Completed
async function markAsCompleted(id) {
  try {
    await db.collection("tasks").doc(id).update({ status: "completed" });
  } catch (error) {
    console.error("Error marking task as completed:", error);
  }
}

// Delete Task
async function deleteTask(id) {
  try {
    await db.collection("tasks").doc(id).delete();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Initial load
loadTasks();