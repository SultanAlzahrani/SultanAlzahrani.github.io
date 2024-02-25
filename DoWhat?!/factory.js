import { makeNewTask } from "./task.js";
import { getTodayDate, isDateInNext7Days, isToday } from "./dateFunctions.js";

export function project(title) {
  let _title = title;
  const _tasksArray = [];
  let _tasksCount = 0;

  const setTitle = (name) => {
    _title = name;
  };

  const getTitle = () => {
    return _title;
  };

  const taskCountpp = () => {
    _tasksCount++;
  };
  const resetTaskCount = () => {
    _tasksCount = 0;
  };
  const getTaskCount = () => {
    return _tasksCount;
  };

  const addTask = (taskName, details, date, isImportant = false) => {
    _tasksArray.push(task(taskName, details, date, isImportant, _tasksCount));
    taskCountpp();
  };

  const updateTask = (name, details, date, index) => {
    _tasksArray[index].edit(name, details, date);
  };

  const taskChecked = (index) => {
    _tasksArray[index].toggleCheck();
  };
  const important = (index) => {
    if (_tasksArray[index]) {
      _tasksArray[index].toggleImportant();
    }
  };

  const remove = (index) => {
    _tasksArray.splice(index, 1);
  };

  const showTasks = (container) => {
    // so that newely created tasks, get numbered again
    // if we haven't done that, then all newly made tasks will have the same index or count
    resetTaskCount();

    _tasksArray.forEach((task) => {
      let x = makeNewTask(
        task.getTaskName(),
        task.getDetails(),
        task.getDate(),
        task.isImportant(),
        task.isChecked(),
        _tasksCount
      );
      taskCountpp();
      container.appendChild(x);
    });
  };

  const showImportant = (container) => {
    resetTaskCount();

    _tasksArray.forEach((task) => {
      if (task.isImportant()) {
        let x = makeNewTask(
          task.getTaskName(),
          task.getDetails(),
          task.getDate(),
          task.isImportant(),
          task.isChecked(),
          _tasksCount
        );
        taskCountpp();
        container.appendChild(x);
      }
    });
  };

  const showTodayTasks = (container) => {
    resetTaskCount();

    _tasksArray.forEach((task) => {
      if (isToday(task.getDate())) {
        let x = makeNewTask(
          task.getTaskName(),
          task.getDetails(),
          task.getDate(),
          task.isImportant(),
          task.isChecked(),
          _tasksCount
        );
        taskCountpp();
        container.appendChild(x);
      }
    });
  };

  const showNextSevenDays = (container) => {
    resetTaskCount();

    _tasksArray.forEach((task) => {
      if (isDateInNext7Days(task.getDate())) {
        let x = makeNewTask(
          task.getTaskName(),
          task.getDetails(),
          task.getDate(),
          task.isImportant(),
          task.isChecked(),
          _tasksCount
        );
        taskCountpp();
        container.appendChild(x);
      }
    });
  };

  return {
    updateTask,
    setTitle,
    getTitle,
    taskCountpp,
    getTaskCount,
    addTask,

    remove,

    showTasks,
    showImportant,
    taskChecked,
    important,
    showTodayTasks,
    showNextSevenDays,
  };
}

export function task(
  taskName,
  details,
  date,
  important = false,
  index,
  checked = false
) {
  let _taskName = taskName;
  let _details = details;
  let _date = date;
  let _important = important;
  let _index = index;
  let _checked = checked;

  const edit = (name, details, date) => {
    setTaskName(name);
    setDetails(details);
    setDate(date);
  };
  const getIndex = () => {
    return _index;
  };
  const setTaskName = (name) => {
    _taskName = name;
  };

  const getTaskName = () => {
    return _taskName;
  };

  const setDetails = (details) => {
    _details = details;
  };

  const getDetails = () => {
    return _details;
  };

  const setDate = (date) => {
    _date = date;
  };

  const getDate = () => {
    return _date == "" ? "No due date" : _date;
  };

  const toggleImportant = () => {
    _important = !_important;
  };

  const isImportant = () => {
    return _important;
  };

  const toggleCheck = () => {
    _checked = !_checked;
  };
  const isChecked = () => {
    return _checked;
  };

  const checkTheTask = () => {};

  return {
    edit,
    setTaskName,
    getTaskName,
    setDetails,
    getDetails,
    setDate,
    getDate,
    toggleImportant,
    isImportant,
    isChecked,
    toggleCheck,

    _taskName, // temp
    _details, //temp
  };
}
