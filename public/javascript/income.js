// Get form, income list, and total amount elements
const incomeForm = document.getElementById("income-form");
const incomeList = document.getElementById("income-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize income array from localStorage
let incomes = JSON.parse(localStorage.getItem("income")) || [];

// Function to render income in tabular form
function renderIncomes() {
  // Clear income list
  incomeList.innerHTML = "";

  // Initialize total amount
  let totalAmount = 0;

  // Loop through income array and create table rows
  for (let i = 0; i < incomes.length; i++) {
    const income = incomes[i];
    const incomeRow = document.createElement("tr");
    incomeRow.innerHTML = `
    <td>${income.date}</td>
	  <td>${income.name}</td>
  	<td>$${income.amount}</td> 
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`;
    incomeList.appendChild(incomeRow);

    // Update total amount
    totalAmount += income.amount;
  }

  // Update total amount display
  totalAmountElement.textContent = totalAmount.toFixed(2);

  // Save income to localStorage
  localStorage.setItem("income", JSON.stringify(incomes));
  
}

// Function to add income
function addIncome(event) {
  event.preventDefault();

  // Get income name and amount from form
  const incomeDateInput = document.getElementById("date");
  const incomeNameInput = document.getElementById("income-name");
  const incomeAmountInput = document.getElementById("income-amount");

  const incomeDate = incomeDateInput.value;
  const incomeName = incomeNameInput.value;
  const incomeAmount = parseFloat(incomeAmountInput.value);

  // Clear form inputs
  incomeNameInput.value = "";
  incomeAmountInput.value = "";
  incomeDateInput.value = "";

  // Validate inputs
  if (incomeName === "" || isNaN(incomeAmount)) {
    alert("Please enter valid income details.");
    return;
  }

  // Create new income object
  const income = {
    date: incomeDate,
    name: incomeName,
    amount: incomeAmount,
  };

  // Add income to income array
  incomes.push(income);

  // Render income
  renderIncomes();
}

// Function to delete income
function deleteIncome(event) {
  if (event.target.classList.contains("delete-btn")) {
    // Get income index from data-id attribute
    const incomeIndex = parseInt(event.target.getAttribute("data-id"));

    // Remove income from income array
    incomes.splice(incomeIndex, 1);

    // Render income
    renderIncomes();
  }
}

// Add event listeners
incomeForm.addEventListener("submit", addIncome);
incomeList.addEventListener("click", deleteIncome);

// Render initial income on page load
renderIncomes();
