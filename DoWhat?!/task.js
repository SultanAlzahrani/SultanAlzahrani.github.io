import {
  makeElement,
  makeImg,
  makeInput,
  makeTaskForm,
  toggleHidden,
  reset,
  appendChildren,
} from "./elementMaker.js";
import {
  addTaskToProjectsArray,
  removeTaskFromArray,
  taskAsChecked,
  setTaskAsImportant,
} from "./index.js";

/*
-
-- Global Varibles
-
*/
const addTaskBox = document.querySelector(".add-task-box");
const addTaskBtn = document.querySelector(".add-new-task-button");

/*
-
-- Used for making elements that doesn't depened on other things functional.
-- Adding Listeners to the main element or Features on the page.
-
*/
export function activateAddTask() {
  const tasksContainer = document.querySelector(".tasks-container");

  const sumbitNewTaskBtn = document.querySelector(".submit-new-task");
  const cancelNewTaskBtn = document.querySelector(".cancel-new-task");

  const newTaskNameInput = document.querySelector(".new-task-name");
  const newTaskDetailsInput = document.querySelector(".new-task-details");
  const newTaskDateInput = document.querySelector(".new-task-date");

  addTaskBtn.addEventListener("click", (e) => {
    toggleAddTask(addTaskBtn, addTaskBox);
  });

  sumbitNewTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const taskName = newTaskNameInput.value;
    const taskDetails = newTaskDetailsInput.value;
    const Date =
      newTaskDateInput.value != "" ? newTaskDateInput.value : "No Due Date";

    addTaskToProjectsArray(taskName, taskDetails, Date);
    //addTask(tasksContainer, taskName, taskDetails, Date);

    reset([newTaskNameInput, newTaskDetailsInput, newTaskDateInput]);
    toggleAddTask(addTaskBtn, addTaskBox);
  });

  cancelNewTaskBtn.addEventListener("click", () => {
    reset([newTaskNameInput, newTaskDetailsInput, newTaskDateInput]);
    toggleAddTask(addTaskBtn, addTaskBox);
  });
}

/*
-
-- Used for making a new task, and adds Listeners to task sub-elements
-
*/

export function makeNewTask(
  name,
  details,
  date,
  isImportant,
  isChecked,
  index
) {
  const taskClassList = isChecked ? "task task-finished" : "task";
  const task = makeElement("div", taskClassList);

  const checkBoxContainer = makeElement("div", "task-checkbox-container");
  const checkbox = makeElement("div", "task-checkbox");
  checkbox.style.backgroundImage = isChecked
    ? 'url("assets/checkmark.png")'
    : "";
  addEventCheckBox(task, checkBoxContainer, checkbox);
  checkBoxContainer.appendChild(checkbox);
  task.appendChild(checkBoxContainer);

  const taskInfo = makeElement("div", "task-info");
  const taskName = makeElement("span", "task-name", name);
  const taskDetails = makeElement("span", "task-details", details);
  const taskDate = makeElement("span", "task-date", date);
  appendChildren(taskInfo, [taskName, taskDetails]);
  appendChildren(task, [taskInfo, taskDate]);

  const taskOptionsContainer = makeElement("div", "task-options-container");
  const img = isImportant ? "assets/filled_star.png" : "assets/empty_star.png";
  const importantIMG = makeImg("task-isimportant", img);
  addListerToImportant(task, importantIMG);

  const editIMG = makeImg("task-isimportant", "assets/edit.png");
  const deleteIMG = makeImg("task-isimportant", "assets/close.png");

  addListenerToTaskOptions(task, editIMG, deleteIMG);
  appendChildren(taskOptionsContainer, [importantIMG, editIMG, deleteIMG]);
  task.appendChild(taskOptionsContainer);
  task.setAttribute("index", `${index}`);

  return task;
}

/*
-
-- Used for toggling Classes
-
*/

export function toggleAddTask(button, box) {
  button.classList.toggle("hidden");
  box.classList.toggle("hidden");
}

export function hideAddbox() {
  if (!addTaskBox.classList.contains("hidden")) {
    toggleAddTask(addTaskBox, addTaskBtn);
  }
}

/*
-
-- Used for Adding listeners to task-sub-elements
-
*/
function addEventCheckBox(task, parent, checkBox) {
  parent.addEventListener("click", (e) => {
    task.classList.toggle("task-finished");
    taskAsChecked(task.getAttribute("index"));

    if (checkBox.style.backgroundImage) {
      // If it has a background image, remove it
      checkBox.style.backgroundImage = "";
    } else {
      // If it doesn't have a background image, set a new one
      checkBox.style.backgroundImage = 'url("assets/checkmark.png")';
    }
  });
}

function addListerToImportant(task, button) {
  button.addEventListener("click", () => {
    setTaskAsImportant(task.getAttribute("index"));

    if (button.style.backgroundImage) {
      button.style.backgroundImage = "";
    } else {
      button.style.backgroundImage = 'url("/src/assets/filled_star.png")';
    }
  });
}

function addListenerToTaskOptions(task, edit, deleteBtn) {
  edit.addEventListener("click", () => {
    const editForm = makeTaskForm(task);
    // Insert within the .task-container
    edit.closest(".tasks-container").insertBefore(editForm, task.nextSibling);

    // now hide the magic
    toggleHidden(task);
  });

  deleteBtn.addEventListener("click", () => {
    removeTaskFromArray(task.getAttribute("index"));
    task.remove();
  });
}
