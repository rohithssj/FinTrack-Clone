const addBtn = document.querySelector(".addbtn")
const modal = document.querySelector(".modal")
const cross = document.querySelector(".cross")
const cancelBtn = document.querySelector(".cancel")
const settingBtn = document.querySelector(".setting")
const settingModal = document.querySelector(".settings-modal")
const settingClose = document.querySelector(".settings-close")
const settingCancel = document.querySelector(".cancel-settings")

const incomeBtn = document.querySelector(".income-type")
const expenseBtn = document.querySelector(".expense-type")
const descInput = document.querySelector("#desc")
const amountInput = document.querySelector("#amount")
const categoryInput = document.querySelector("#category")
const dateInput = document.querySelector("#date")
const saveBtn = document.querySelector(".save")
const transactionList = document.querySelector(".transaction-list")


const balanceAmount = document.querySelector(".balance-amount")
const incomeAmount = document.querySelector(".income-amount")
const expenseAmount = document.querySelector(".expense-amount")
const transactionAmount = document.querySelector(".transaction-amount")

const allBtn = document.querySelector(".allbtn")
const incomeInput = document.querySelector(".incomebtn")
const expenseInput = document.querySelector(".expensebtn")

const searchInput = document.querySelector(".search input")

const ctx = document.getElementById("cashFlow-chart").getContext("2d");

const usernameInput = document.querySelector("#username")
const currencySelect = document.querySelector("#currency")
const saveSettingsBtn = document.querySelector(".save-settings")


let transactions = JSON.parse(localStorage.getItem("transactions")) || []
let profile = JSON.parse(localStorage.getItem("profile")) || { name: "", currency: "INR" }
let transactionType = "income"
let current = "all"
let searchText = ""
let cashflowChart

const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
};

incomeBtn.addEventListener("click", () => {
    transactionType = "income"
    incomeBtn.classList.add("active")
    expenseBtn.classList.remove("active")
})

expenseBtn.addEventListener("click", () => {
    transactionType = "expense"
    incomeBtn.classList.remove("active")
    expenseBtn.classList.add("active")
})


addBtn.addEventListener("click", () => {
    modal.classList.add("show")
})

cross.addEventListener("click", () => {
    modal.classList.remove("show")
})

cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show")
})

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show")

    }
})

settingBtn.addEventListener("click", () => {
    settingModal.classList.add("show2")
})

settingClose.addEventListener("click", () => {
    settingModal.classList.remove("show2")
})

settingCancel.addEventListener("click", () => {
    settingModal.classList.remove("show2")
})

settingModal.addEventListener("click", (e) => {
    if (e.target === settingModal) {
        settingModal.classList.remove("show2")

    }
})

allBtn.addEventListener("click", () => {
    current = "all";
    renderCards();
});

incomeInput.addEventListener("click", () => {
    current = "income";
    renderCards();
});

expenseInput.addEventListener("click", () => {
    current = "expense";
    renderCards();

});

searchInput.addEventListener("input", () => {

    searchText = searchInput.value.toLowerCase()

    renderCards()

});


saveSettingsBtn.addEventListener("click", () => {
    profile.name = usernameInput.value.trim();
    profile.currency = currencySelect.value;
    localStorage.setItem("profile", JSON.stringify(profile));
    loadProfile();
    renderCards();
    update();

});


const renderCards = () => {
    transactionList.innerHTML = ""
    let filteredTransactions = transactions

    if (current === "income") {

        filteredTransactions = transactions.filter(transaction => {

            return transaction.type === "income"

        })
    }

    if (current === "expense") {

        filteredTransactions = transactions.filter(transaction => {

            return transaction.type === "expense"

        });

    }

    filteredTransactions = filteredTransactions.filter(transaction => {

        return transaction.description.toLowerCase().includes(searchText);

    });



    filteredTransactions.forEach((transaction) => {
        const card = document.createElement("div")
        card.classList.add("transaction-card")

        card.innerHTML = `
    <div class="transaction-top">

        <div class="transaction-details">

            <div class="bottom-section">

                <h3>${transaction.description}</h3>

                <h2 class="${transaction.type === "income" ? "income-text" : "expense-text"}">

                ${transaction.type === "income" ? "+" : "-"}

                ${getCurrencySymbol()}${transaction.amount.toLocaleString("en-IN")}

                </h2>

            </div>

            <p>${transaction.category}</p>

        </div>

    </div>

    <div class="transaction-bottom">

        <span>${transaction.date}</span>

        <div class="delete">

            <button class="delete-btn"  data-id="${transaction.id}">

                <i class="ri-delete-bin-line"></i>

            </button>

        </div>

    </div>
`


        transactionList.appendChild(card)
        const deleteBtn = card.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", () => {
            const id = Number(deleteBtn.dataset.id)

            transactions = transactions.filter(transaction => {
                return transaction.id !== id;
            })
            saveToLocalStorage()
            renderCards()
            updateChart()
            update()
        })

    })
}

const closeInfo = () => {
    descInput.value = ""
    amountInput.value = ""
    categoryInput.selectedIndex = 0
    dateInput.value = ""
    transactionType = "income"
    modal.classList.remove("show")
}

const update = () => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }
    })

    const balance = income - expense

    const symbol = getCurrencySymbol();

    balanceAmount.textContent =
        `${symbol}${balance.toLocaleString("en-IN")}`;

    incomeAmount.textContent =
        `${symbol}${income.toLocaleString("en-IN")}`;

    expenseAmount.textContent =
        `${symbol}${expense.toLocaleString("en-IN")}`;
}




saveBtn.addEventListener("click", () => {
    const description = descInput.value.trim()
    const amount = Number(amountInput.value)
    const category = categoryInput.value
    const date = dateInput.value

    if (!description || !amount || !category || !date) {
        alert("Please fill all fields.")
        return
    }
    if (amount <= 0) {
        alert("Amount should be greater than zero.")
        return
    }

    const transaction = {
        id: Date.now(),
        type: transactionType,
        description,
        amount,
        category,
        date
    }
    transactions.push(transaction)

    renderCards()
    saveToLocalStorage()
    update()
    updateChart()
    closeInfo()

    console.log(transactions)
})

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function updateChart() {

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    if (cashflowChart) {
        cashflowChart.destroy();
    }

    cashflowChart = new Chart(ctx, {

        type: "bar",

        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: [
                    "#22C55E",
                    "#EF4444"
                ],
                borderRadius: 10
            }]
        },

        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }

    });

}

function loadProfile() {

    usernameInput.value = profile.name;

    currencySelect.value = profile.currency;

}

function getCurrencySymbol() {
    return currencySymbols[profile.currency];
}

renderCards()
update()
updateChart()
loadProfile()