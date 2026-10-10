// Storing HTML elements into JS variables

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date")
const expenseList = document.getElementById("expense-list");
const totalExpense = document.getElementById("total-expense");

//to store Expenses 

let expenses = [];

// Date limit till today

const today = new Date(); //Get Today's Date

    //to Formate the date:
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2,"0");
const day  = String(today.getDate()).padStart(2,"0");

const todayDate = `${year}-${month}-${day}`;
    
    // prevent future dates
expenseDate.max = todayDate;

// Form Submit event

expenseForm.addEventListener("submit",function(event){
    
    //prevent from default reloading

    event.preventDefault();

    // Get input values

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const date = expenseDate.value;
    const selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    );

    // check category Selection

    if(!selectedCategory){
        alert("Please Select a Category!!!");
        return;
    }

    //Check valid Date
    
    if(expenseDate.value > todayDate) {
        alert("Enter a valid Date");
        return;
    }

    //Create expense object

    const expense = {
        name: name,
        amount: amount,
        category: selectedCategory.value,
        date: date
    };

    // add expense to array

    expenses.push(expense);

    //Update table and total

    displayExpenses();
    updateTotal();

    // Clear form

    expenseForm.reset();

});

// Display expense in table

function displayExpenses(){

    //clear existing rows

    expenseList.innerHTML = "";

    // loop through expenses

    expenses.forEach(function(expense){
        
        //create new row

        const row = document.createElement("tr");

        //create table cells

        const dateCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const typeCell =document.createElement("td");
        const amountCell  =document.createElement("td");

        // Add values to the Cells

        dateCell.textContent = expense.date;
        nameCell.textContent = expense.name;
        typeCell.textContent = expense.category;
        amountCell.textContent  = "₹" + expense.amount.toFixed(2);

        //Add cells to row

        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);

        //Add row to table

        expenseList.appendChild(row);
        
    });
}

// Calculate total

function updateTotal(){

    let total = 0;

    expenses.forEach(function(expense){

        const amount = Number(expense.amount);

        if(Number.isFinite(amount)){

            total = total + amount;

        }
        
    });

    totalExpense.textContent = "₹" + total.toFixed(2);

}