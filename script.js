// Helper function to format amount as Naira
function formatNaira(amount) {
  return `₦${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// Helper function to format amount as USD
function formatUSD(amount) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// Get DOM elements
const expenseForm = document.getElementById('expense-form');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountEl = document.getElementById('total-amount');

// Load existing expenses from localStorage or use empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Initial render
renderExpenses();

// Handle form submission
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = dateInput.value;
  const category = categoryInput.value;
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value).toFixed(2);

  if (!date || !category || !description || isNaN(amount)) {
    alert('Please fill in all fields with correct values.');
    return;
  }

  const expense = {
    date,
    category,
    description,
    amount: parseFloat(amount)
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses)); // save

  renderExpenses();
  expenseForm.reset();
});

// Render expenses in table
function renderExpenses() {
  // Clear the table body so we don't duplicate rows
  expenseTableBody.innerHTML = '';
  // start total amount at zero
  let total = 0;

  // Loop through each expense object in the array
  expenses.forEach( (exp) => {
    // Create a new table row for each expense
    const row = document.createElement('tr');
    // Fill in the row data with expense details
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.category}</td>
      <td>${exp.description}</td>
      <td>${formatUSD(exp.amount)}</td>
    `;
    // Append this row to the table body
    expenseTableBody.appendChild(row);
    // Add this expense's amount to the total
    total += exp.amount;
  });

  // Update the total amount display
  totalAmountEl.textContent = formatUSD(total);
}
