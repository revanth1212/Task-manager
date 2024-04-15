const table=[
    {
        task:"meeting",
        description:"client-meeting",
        duration:"00:50:43"
    },
    {
        task:"project",
        description:"developing",
        duration:"01:42:02"
    },
    {
        task:"personal break",
        description:"",
        duration:"00:22:15"
    },
    {
        task:"meeting",
        description:"daily scrum",
        duration:"00:32:28"
    }
]

const tableBody = document.getElementById("tableBody");
const taskFilter = document.getElementById("taskFilter");
const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("descriptionInput");
const durationInput = document.getElementById("durationInput");
const addButton = document.getElementById("addButton");




function insert(task){
    const tableBody=document.getElementById("tableBody");
    tableBody.innerHTML="";
    
    table.filter(item => task === "all" ? true : item.task === task).forEach((item,i) => {  
      const row=document.createElement("tr");
        console.log(i);
        row.innerHTML=`<td>${item.task}</td>
                       <td>${item.description}</td>
                       <td>${item.duration}</td>
                       <td><button onclick="deleteRow(${i})">Delete<b/button></td>  
                       <td><button onclick="updateRow(${i})">Update<b/button></td>
                       `
        tableBody.appendChild(row);
    });
}

insert("all");

taskFilter.addEventListener("change", function () {
    insert(taskFilter.value);
});

function deleteRow(index) {
  table.splice(index,1);
  insert("all");

}

function updateRow(index) {
  const taskInput = document.getElementById("taskInput");
  const descriptionInput = document.getElementById("descriptionInput");
  console.log(table[index].task)
  taskInput.value=table[index].task;
  descriptionInput.value=table[index].description;
  updateButton.addEventListener("click", function () {
     table[index].task = taskInput.value;
     table[index].description = descriptionInput.value;
    console.log(table[index].task)
    console.log(table[index].description)
    table[index].duration = updateDisplay();
    insert("all")
});
}


/* function populateTable(task) {
    tableBody.innerHTML = "";
    table.filter(item => task === "all" ? true : item.task === task).forEach((item) => {
        const row = document.createElement("tr");

        const taskCell = document.createElement("td");
        taskCell.textContent = item.task;
        row.appendChild(taskCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = item.description;
        row.appendChild(descriptionCell);

        const durationCell = document.createElement("td");
        durationCell.textContent = item.duration;
        row.appendChild(durationCell);



        tableBody.appendChild(row);
    });
}

populateTable("all");

taskFilter.addEventListener("change", function () {
    populateTable(taskFilter.value);
});
 */

let displayString="00:00:00";

addButton.addEventListener("click", function () {
    const task = taskInput.value;
    const description = descriptionInput.value;
    
    const duration = updateDisplay();

    if (task && description && duration) {
        table.push({ task, description, duration });
        insert(taskFilter.value);

        taskInput.value = "";
        descriptionInput.value = "";
        durationInput.value = "";
    } else {
        alert("Please enter all fields");
    }
});



let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStopBtn").innerText = "Start";
  } else {
    timer = setInterval(updateDisplay, 1000);
    document.getElementById("startStopBtn").innerText = "Stop";
  }
  isRunning = !isRunning;
}

function updateDisplay() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  let displayString = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  document.getElementById("display").innerText = displayString;
  return displayString;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("startStopBtn").innerText = "Start";
}

function pad(num) {
  return (num < 10) ? "0" + num : num;
}

