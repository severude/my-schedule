//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed tasks

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");  //Create List Item
  var checkBox = document.createElement("input");  //input (checkbox)
  var label = document.createElement("label");  //label
  var editInput = document.createElement("input");  //input (text)
  var editButton = document.createElement("button");  //input (text)
  var deleteButton = document.createElement("button");  //button.delete
  //Each elememt needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task...");
  //Was anything inputted?
  if (taskInput.value) {
    //Create a new list item with the text from #new-task
    var listItem = createNewTaskElement(taskInput.value);  
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = ""; //Clear textbox
  } else {
    alert("Nothing was entered, please type in your task.");
  }
}

//Edit an existing task
var editTask = function() {
  console.log("Edit task...");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = listItem.querySelector("button.edit");
  var containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editmode
    //label text become the input's value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    //Switch to editmode
    //input value becomes the label's text
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  //Toggle .editmode on the listItem
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select it's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
  var containsClass = taskListItem.classList.contains("editMode");
  if (containsClass) {
    editButton.innerText = "Save";
  } else {
    editButton.innerText = "Edit";
  }
}

var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
