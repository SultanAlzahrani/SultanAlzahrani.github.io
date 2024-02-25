import { updateTaskInArray } from "./index.js";
// bouns functions
export function toggleHidden(element) {
  element.classList.toggle("hidden");
}
export function reset(inputElements) {
  inputElements.forEach((inputElement) => {
    inputElement.value = "";
  });
}

export function makeElement(elementType, className = "", textContent = "") {
  const ele = document.createElement(elementType);
  ele.className = className;
  ele.textContent = textContent;
  return ele;
}

export function makeImg(className, URL) {
  const img = makeElement("img", className);
  img.src = URL;
  return img;
}

export function makeInput(className, type = "text", placeholder = undefined) {
  const input = makeElement("input", className);
  input.type = type;
  input.placeholder = placeholder;
  return input;
}

export function makeTaskForm(task) {
  const form = makeElement("form", "add-task-box add-task-box-visible");

  function createInputLabel(type, labelText, placeholder) {
    const label = makeElement("label", "new-task-name-label");
    const spanLabel = makeElement("span", "", labelText);
    const input = makeInput(`new-task-${type}`, type, placeholder);
    label.appendChild(spanLabel);
    label.appendChild(input);
    return label;
  }

  function createTextAreaLabel(className, labelText, placeholder) {
    const label = makeElement("label", "new-task-name-label");
    const spanLabel = makeElement("span", "", labelText);
    const input = makeElement("textarea", className, placeholder);
    label.appendChild(spanLabel);
    label.appendChild(input);
    return label;
  }

  const label1 = createInputLabel("text", "Title", "funny title");
  const label2 = createTextAreaLabel(
    "new-task-details",
    "Details",
    "funny details"
  );
  const label3 = createInputLabel("date", "Date");

  const div = makeElement("div", "Add-new-task-buttons-container");
  const b1 = makeElement("button", "submit-new-task", "Add");
  const b2 = makeElement("button", "cancel-new-task", "Cancel");
  b1.type = "submit";
  b2.type = "reset";

  const taskName = task.querySelector(".task-name");
  const taskDetails = task.querySelector(".task-details");
  const taskDate = task.querySelector(".task-date");

  const inputName = label1.querySelector("input");
  const inputDetails = label2.querySelector("textarea");
  const inputDate = label3.querySelector("input");

  inputName.value = taskName.textContent;
  inputDetails.value = taskDetails.textContent;
  inputDate.value = taskDate.textContent;

  b1.addEventListener("click", (e) => {
    e.preventDefault();

    taskName.textContent = inputName.value;
    taskDetails.textContent = inputDetails.value;
    taskDate.textContent = inputDate.value;

    taskDate.textContent =
      inputDate.value != "" ? inputDate.value : "No Due Date";

    updateTaskInArray(
      inputName.value,
      inputDetails.value,
      inputDate.value, //
      task.getAttribute("index")
    );

    toggleHidden(task);
    form.remove();
  });

  b2.addEventListener("click", () => {
    reset([inputName, inputDetails, inputDate]);
    toggleAddTask(addTaskBtn, addTaskBox);
  });

  div.appendChild(b1);
  div.appendChild(b2);

  form.appendChild(label1);
  form.appendChild(label2);
  form.appendChild(label3);
  form.appendChild(div);

  return form;
}

export function appendChildren(parent, childrenArray) {
  childrenArray.forEach((child) => {
    parent.appendChild(child);
  });
}

export function makeOptionsBox(parent) {
  const optionsDiv = makeElement("div", "rename-edit-project hidden");

  let renameBTN, delBTN;
  ({ renameBTN, delBTN } = makeRenameDeleteBtns(parent));
  optionsDiv.appendChild(renameBTN);
  optionsDiv.appendChild(delBTN);

  return optionsDiv;
}
export function makeRenameDeleteBtns(parent) {
  const renameBTN = makeElement("button", "rename-project-btn", "Rename");
  const delBTN = makeElement("button", "edit-project-btn", "Delete");

  renameBTN.addEventListener("click", () => {});

  delBTN.addEventListener("click", () => {
    parent.remove();
  });

  return { renameBTN, delBTN };
}
