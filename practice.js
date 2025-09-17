// --- Login Logic ---
const loginForm = document.getElementById("loginForm");
const trackerContent = document.getElementById("trackerContent");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    document.getElementById("login").style.display = "none";
    trackerContent.style.display = "block";
  } else {
    loginMessage.textContent = "❌ Invalid username or password!";
  }
});

// --- Exercise Logging ---
const exerciseForm = document.getElementById("exerciseForm");
const exerciseList = document.getElementById("exerciseList");
let totalExerciseMinutes = 0;

exerciseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let type = document.getElementById("exerciseType").value;
  let name = document.getElementById("exerciseName").value;
  let minutes = parseInt(document.getElementById("exerciseMinutes").value);

  totalExerciseMinutes += minutes;
  let li = document.createElement("li");
  li.textContent = `${type}: ${name} - ${minutes} mins`;
  exerciseList.appendChild(li);

  updateExerciseChart();
  exerciseForm.reset();
});

// --- Meal Tracking ---
const mealForm = document.getElementById("mealForm");
const mealList = document.getElementById("mealList");
let totalCalories = 0;

mealForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let meal = document.getElementById("mealName").value;
  let cal = parseInt(document.getElementById("mealCalories").value);
  let protein = document.getElementById("mealProtein").value;
  let carbs = document.getElementById("mealCarbs").value;
  let fat = document.getElementById("mealFat").value;

  totalCalories += cal;
  let li = document.createElement("li");
  li.textContent = `${meal} - ${cal} cal | P:${protein}g C:${carbs}g F:${fat}g`;
  mealList.appendChild(li);

  updateCalorieChart();
  mealForm.reset();
});

// --- Goals ---
const goalForm = document.getElementById("goalForm");
const goalDisplay = document.getElementById("goalDisplay");
let calorieGoal = 2000;
let exerciseGoal = 30;

goalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  calorieGoal = parseInt(document.getElementById("goalCalories").value);
  exerciseGoal = parseInt(document.getElementById("goalExercise").value);

  goalDisplay.innerHTML = `🔥 Daily Goals: ${calorieGoal} cal & ${exerciseGoal} mins exercise`;
  updateCalorieChart();
  updateExerciseChart();
});

// --- Charts ---
const calCtx = document.getElementById("calorieChart").getContext("2d");
const exCtx = document.getElementById("exerciseChart").getContext("2d");

let calorieChart = new Chart(calCtx, {
  type: "doughnut",
  data: {
    labels: ["Calories Consumed", "Remaining"],
    datasets: [{ data: [0, 2000], backgroundColor: ["#ff6384", "#36a2eb"] }]
  }
});

let exerciseChart = new Chart(exCtx, {
  type: "bar",
  data: {
    labels: ["Minutes Exercised"],
    datasets: [{ label: "Total", data: [0], backgroundColor: "#4caf50" }]
  }
});

function updateCalorieChart() {
  let remaining = calorieGoal - totalCalories;
  if (remaining < 0) remaining = 0;
  calorieChart.data.datasets[0].data = [totalCalories, remaining];
  calorieChart.update();
}

function updateExerciseChart() {
  exerciseChart.data.datasets[0].data = [totalExerciseMinutes];
  exerciseChart.update();
}
