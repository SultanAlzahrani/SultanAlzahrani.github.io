import {
  makeElement,
  makeImg,
  makeOptionsBox,
  makeRenameDeleteBtns,
} from "./elementMaker.js";
import {
  receiveCount,
  addToProjectsArray,
  showContent,
  showAllTasksArray,
  showImportantTasksInArray,
  showTodayTasksInArray,
  show_Next_Seven_Days_Tasks,
} from "./index.js";
import { hideAddbox } from "./task.js";
import { removeProjectFromArray } from "./index.js";
// Used for indexing projects by numbers
let projCount = 0;
const addTaskBTN = document.querySelector(".add-new-task-button");
/*
-
-- Used for activating or make the adding Project box Functional
-- Adding Listeners 
-
*/

export function activatingDefaultProject() {
  const allTasks = document.querySelector("#all-tasks");
  allTasks.addEventListener("click", () => {
    showAllTasksArray("All Tasks");
    isHidden(addTaskBTN);
  });

  const importantTasks = document.querySelector("#important-tasks");
  importantTasks.addEventListener("click", () => {
    showImportantTasksInArray("Important");
    isHidden(addTaskBTN);
  });

  const todayTasks = document.querySelector("#today-tasks");
  todayTasks.addEventListener("click", () => {
    showTodayTasksInArray("Today's Tasks");
    isHidden(addTaskBTN);
  });

  const sevenDaysTasks = document.querySelector("#next-seven-tasks");
  sevenDaysTasks.addEventListener("click", () => {
    show_Next_Seven_Days_Tasks("Next 7-Days");
    isHidden(addTaskBTN);
  });
}

export function addListenerToAddProject() {
  const addProjForm = document.querySelector(".project-form");

  const addBTN = document.getElementById("add");
  const cancelBtn = document.querySelector("#cancel-project-btn");
  const submitBtn = document.querySelector("#sumbit-project-btn");
  const inputProj = document.querySelector("#project-name-input");
  // Add, opens up the form box
  addBTN.addEventListener("click", (e) => {
    toggleAdd(addBTN);
    toggleForm(addProjForm);
  });

  // Cancel, closes the form
  cancelBtn.addEventListener("click", (e) => {
    toggleAdd(addBTN);
    toggleForm(addProjForm);
  });

  // Sumbit, submits the form
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const projectName = inputProj.value;

    if (projectName != "") {
      addNewProject(projectName, projCount++);
      addToProjectsArray(projectName);

      // Close the form
      toggleForm(addProjForm);
      toggleAdd(addBTN);

      // resets the form
      inputProj.value = "";
    }
  });
}

export function addNewProject(projectName, projIndex) {
  const projectsContainer = document.getElementById("projects-container");
  const newProjDiv = makeElement("div", "project-element");

  const img1 = makeImg("", "assets/Hamburger_menu.png");
  const img2 = makeImg("project-options", "assets/close.png");
  const span = makeElement("span", "", projectName);

  addListenerToProjOptions(img2, "visible-flex");

  newProjDiv.appendChild(img1);
  newProjDiv.appendChild(span);
  newProjDiv.appendChild(img2);

  newProjDiv.setAttribute("index", `${projIndex}`);
  newProjDiv.addEventListener("click", () => {
    receiveCount(newProjDiv.getAttribute("index"));
    showContent();
    // isHidden(addTaskBTN);
    // to close/hide the add-box in tasks-container if its opened
    hideAddbox();
    showAddTaskBTN(addTaskBTN);
  });

  projectsContainer.appendChild(newProjDiv);
}

/*
-
-- Support Functions. 
-
 */

export function addListenerToProjOptions(subElement) {
  // subElement.addEventListener("click", () => {
  //   if (targetElement != "") {
  //     targetElement.classList.toggle("visible-flex");
  //   }
  // });

  subElement.addEventListener("click", () => {
    let index = subElement.parentElement.getAttribute("index");
    removeProjectFromArray(index);
    subElement.parentElement.remove();
  });
}

function toggleAdd(button) {
  button.classList.toggle("add-visible");
  button.classList.toggle("add-hidden");
}
function toggleForm(form) {
  form.classList.toggle("hidden-form");
}

export function isHidden(div) {
  if (!div.classList.contains("hidden")) {
    // Add the "hidden" class if it doesn't have it
    div.classList.add("hidden");
  }
}

function showAddTaskBTN(btn) {
  if (btn.classList.contains("hidden")) {
    btn.classList.toggle("hidden");
  }
}

//
// ============= Calls =================
//
