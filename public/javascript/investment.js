// Get form, investment list, and total amount elements
const investmentForm = document.getElementById("investment-form");
const investmentList = document.getElementById("investment-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize investment array from localStorage
let investments = JSON.parse(localStorage.getItem("investment")) || [];

// Function to render investment in tabular form
function renderInvestments() {
  // Clear investment list
  investmentList.innerHTML = "";

  // Initialize total amount
  let totalAmount = 0;

  // Loop through investment array and create table rows
  for (let i = 0; i < investments.length; i++) {
    const investment = investments[i];
    const investmentRow = document.createElement("tr");
    investmentRow.innerHTML = `
    <td>${investment.date}</td>
	<td>${investment.name}</td>
    <td>${investment.source}</td>
	<td>$${investment.amount}</td> 
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`;
    investmentList.appendChild(investmentRow);

    // Update total amount
    totalAmount += investment.amount;
  }

  // Update total amount display
  totalAmountElement.textContent = totalAmount.toFixed(2);

  // Save investment to localStorage
  localStorage.setItem("investments", JSON.stringify(investments));
}

// Function to add investment
function addInvestment(event) {
  event.preventDefault();

  // Get investment name and amount from form
  const investmentDateInput = document.getElementById("date");
  const investmentNameInput = document.getElementById("investment-name");
  const investmentSourceInput = document.getElementById("income-source");
  const investmentAmountInput = document.getElementById("investment-amount");

  const investmentDate = investmentDateInput.value;
  const investmentName = investmentNameInput.value;
  const investmentSource = investmentSourceInput.value;
  const investmentAmount = parseFloat(investmentAmountInput.value);

  // Clear form inputs
  investmentNameInput.value = "";
  investmentAmountInput.value = "";
  investmentDateInput.value = "";
  investmentSourceInput.value = "";

  // Validate inputs
  if (investmentName === "" || isNaN(investmentAmount)) {
    alert("Please enter valid investment details.");
    return;
  }

  // Create new investment object
  const investment = {
    date: investmentDate,
    source: investmentSource,
    name: investmentName,
    amount: investmentAmount,
  };

  // Add investment to investments array
  investments.push(investment);

  // Render investment
  renderInvestments();
}

// Function to delete investment
function deleteInvestment(event) {
  if (event.target.classList.contains("delete-btn")) {
    // Get investment index from data-id attribute
    const investmentIndex = parseInt(event.target.getAttribute("data-id"));

    // Remove investment from expenses array
    investments.splice(investmentIndex, 1);

    // Render investment
    renderInvestments();
  }
}

// Add event listeners
investmentForm.addEventListener("submit", addInvestment);
investmentList.addEventListener("click", deleteInvestment);

// Render initial investment on page load
renderInvestments();
