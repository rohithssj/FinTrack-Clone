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

let transactions = []
let transactionType = "income"

incomeBtn.addEventListener("click", () => {
    transactionType = "income"
})

expenseBtn.addEventListener("click", () => {
    transactionType = "expense"
})


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
    descInput.value =""
    amountInput.value =""
    categoryInput.selectedIndex = 0
    dateInput.value = ""

    modal.classList.remove("show")
    console.log(transactions)
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