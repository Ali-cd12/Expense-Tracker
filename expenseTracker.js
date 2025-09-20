//First Getting elemenst from HTML
//From the input fileds in the form
let Expense = document.querySelector("#expense");
let Price = document.querySelector("#cost");

//Now submit button
const submit = document.querySelector("#submit");

//Getting Total
let total = document.querySelector("#total");

//Getting List Section
let list = document.querySelector("#listSection");

//Getting Lists
let items = document.querySelectorAll(".cards");

//Now getting delete buttons
const del = document.querySelectorAll(".delete");

//some variables
let sum = 0;
let allExpenses = [ ];

//adding dark mode code
const toggle = document.querySelector("#dark");

//Function Time!!!
function getsum(){
    sum = 0;
    for(exp of allExpenses){
        sum += exp.value;
    }
}

function displayTotal(){
    total.textContent = `Total: $${sum}`;
}

function getExpenses(){
    for(let i = 1; i < items.length; i++){
        let temp1= items[i].firstElementChild;
        let temp2 = temp1.nextElementSibling;
        let edit = temp2.textContent;
        let cut = edit.indexOf(" ");
        edit = edit.slice(0, cut);
        edit = Number(edit);
        allExpenses.unshift({name: temp1.textContent, value: edit});
    }
}

function addExpense(e){
    e.preventDefault();
    let word = Expense.value;
    let price = Price.value;
    price = Number(price);

    if(isNaN(price)){
        window.alert("Please Enter a number!");
        document.getElementById("frm").reset();
    }
    else{
        allExpenses.unshift({name: word, value: price});
        createCard(word, price);
    }
}

function createCard(parama, paramb){
    let pri = document.createElement("p");
    pri.textContent = parama;
    pri.setAttribute('class', 'item');

    let dollars = document.createElement("p");
    dollars.textContent = `${paramb} $`;
    dollars.setAttribute('class', 'price');

    let but =  document.createElement("button");
    but.textContent = "DELETE";
    but.setAttribute('class', 'delete');

    let card = document.createElement("div");
    card.setAttribute('class' , 'cards');
    card.append(pri);
    card.append(dollars);
    card.append(but);
    list.insertBefore(card, items[1]);
    
    but.addEventListener("click",()=>{
        let parent = but.parentElement;
        editarray(parent);
        parent.remove();
        items = document.querySelectorAll(".cards");
    })

    document.getElementById("frm").reset();
    items = document.querySelectorAll(".cards");
    update();
}

function editarray(element){
    let del = element.firstElementChild;
    let del1 = del.textContent;
    for(exp of allExpenses){
        if(exp.name == del1){
            allExpenses.splice(allExpenses.indexOf(exp), 1);
        }
    }
    update();
}
function update(){
        getsum();
        displayTotal();
}
function start(){
    submit.addEventListener("click",addExpense);
    toggle.addEventListener("click",()=>{
        if(toggle.textContent == "☀"){
            document.body.classList.toggle("dark");
            toggle.textContent = "🌑";
        }
        else{
            document.body.classList.toggle("dark");
            toggle.textContent = "☀";
        }
    })
    getExpenses();
    update();
}

start();