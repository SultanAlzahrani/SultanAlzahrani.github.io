import { activateAddTask, makeNewTask } from "./task.js";
import {
  addNewProject,
  addListenerToAddProject,
  activatingDefaultProject,
} from "./project.js";
import { project, task } from "./factory.js";

// Activaiting stuff
activateAddTask();
addListenerToAddProject();
activatingDefaultProject();

const todoList = (() => {
  /*
    -- 1D Array, each element has a project Element, each "project" element has an:
    1. Title 2. Array Of Tasks

    -- allTasks: has all of the tasks
    -- TodayTasks: has only 24-hrs of tasks
    -- next7Days: has the tasks for the next 7-days
    -- importantTasks: only important marked tasks

    -- projectsArray: each element is a new project; this is the most important array
  */

  let _importantTasks = [];
  let _projectsArray = [];

  let _currentPostion = 0;

  // Selectors for title, and containers
  const $title = document.querySelector(".project-title");
  const $tasksContainer = document.querySelector(".tasks-container");
  //

  // Setters and/or updaters
  const updateCurrentPostion = (index) => {
    _currentPostion = index;
  };
  const removeTask = (index) => {
    _projectsArray[_currentPostion].remove(index);
  };

  const updateTaskArray = (name, details, date, index) => {
    _projectsArray[_currentPostion].updateTask(name, details, date, index);
  };

  const makeTaskChecked = (index) => {
    _projectsArray[_currentPostion].taskChecked(index);
  };

  const setTaskImportant = (index) => {
    _projectsArray[_currentPostion].important(index);
  };

  const addNewTask = (taskName, details, date) => {
    _projectsArray[_currentPostion].addTask(taskName, details, date);
    show();
  };
  // Appenders
  const appendToProjects = (title) => {
    _projectsArray.push(project(title));
  };

  // Printing and showing to HTML
  const show = () => {
    const project = _projectsArray[_currentPostion];

    // showing current project's title
    $title.textContent = project.getTitle();

    // showing current project's tasks
    $tasksContainer.innerHTML = "";
    project.showTasks($tasksContainer);
  };

  const showAllTasks = (title) => {
    $tasksContainer.innerHTML = "";
    $title.textContent = title;

    _projectsArray.forEach((project) => {
      project.showTasks($tasksContainer);
    });
  };

  const showImportantTasks = (title) => {
    $tasksContainer.innerHTML = "";
    $title.textContent = title;

    _projectsArray.forEach((project) => {
      project.showImportant($tasksContainer);
    });
  };

  const showTodayTasks = (title) => {
    $tasksContainer.innerHTML = "";
    $title.textContent = title;

    _projectsArray.forEach((project) => {
      project.showTodayTasks($tasksContainer);
    });
  };

  const showNextSevenDaysTasks = (title) => {
    $tasksContainer.innerHTML = "";
    $title.textContent = title;

    _projectsArray.forEach((project) => {
      project.showNextSevenDays($tasksContainer);
    });
  };

  const removeProject = (index) => {
    // Check if the index is within the valid range of array indices
    if (index >= 0 && index < _projectsArray.length) {
      // Using splice to remove the element at the specified index
      _projectsArray.splice(index, 1);
      console.log(`Project at index ${index} removed successfully.`);
    } else {
      console.error(`Invalid index: ${index}. Please provide a valid index.`);
    }
  };

  return {
    appendToProjects,
    updateCurrentPostion,
    addNewTask,
    show,
    updateTaskArray,
    removeTask,
    showAllTasks,
    showImportantTasks,
    makeTaskChecked,
    setTaskImportant,
    showTodayTasks,
    showNextSevenDaysTasks,
    removeProject,
  };
})();

//
// -- Supporting functions
//

export function receiveCount(number) {
  todoList.updateCurrentPostion(number);
}

export function addToProjectsArray(title) {
  todoList.appendToProjects(title);
}
export function addTaskToProjectsArray(taskName, details, date) {
  todoList.addNewTask(taskName, details, date);
}

export function showContent() {
  todoList.show();
}

export function updateTaskInArray(name, details, date, index) {
  todoList.updateTaskArray(name, details, date, index);
}
export function removeTaskFromArray(taskIndex) {
  todoList.removeTask(taskIndex);
}

export function removeProjectFromArray(index) {
  todoList.removeProject(index);
}
export function showAllTasksArray(title) {
  todoList.showAllTasks(title);
}

export function taskAsChecked(index) {
  todoList.makeTaskChecked(index);
}

export function setTaskAsImportant(index) {
  todoList.setTaskImportant(index);
}

export function showImportantTasksInArray(title) {
  todoList.showImportantTasks(title);
}

export function showTodayTasksInArray(title) {
  todoList.showTodayTasks(title);
}

export function show_Next_Seven_Days_Tasks(title) {
  todoList.showNextSevenDaysTasks(title);
}
