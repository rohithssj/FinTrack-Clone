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


let transactions = []
let transactionType = "income"

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


const renderCards = () => {
    transactionList.innerHTML = ""

    transactions.forEach((transaction) => {
        const card = document.createElement("div")
        card.classList.add("transaction-card")

        card.innerHTML = `
    <div class="transaction-top">

        <div class="transaction-details">

            <div class="bottom-section">

                <h3>${transaction.description}</h3>

                <h2 class="${transaction.type === "income" ? "income-text" : "expense-text"}">

                ${transaction.type === "income" ? "+" : "-"}

                ₹${transaction.amount}

                </h2>

            </div>

            <p>${transaction.category}</p>

        </div>

    </div>

    <div class="transaction-bottom">

        <span>${transaction.date}</span>

        <div class="delete">

            <button class="delete-btn">

                <i class="ri-delete-bin-line"></i>

            </button>

        </div>

    </div>
`
        transactionList.appendChild(card)
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

    balanceAmount.textContent = `₹${balance}`
    incomeAmount.textContent = `₹${income}`
    expenseAmount.textContent = `₹${expense}`
    transactionAmount.textContent = transactions.length
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
    update()
    closeInfo()

    console.log(transactions)
})