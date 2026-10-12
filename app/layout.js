export const withVat= (amount) => {
    return amount * 0.15;
};

export const format = (amount) => {
    return `${amount.toFixed(2)} ETB`;
};



import {withVat, format} from "./pricing.js";

const order = {
    customer: "Sara",
    items: [
        {name:"shiro", price:120, qty:2},
        {name:"pasta", price:200, qty:1},
    ]
};
const total= order.items.reduce(
    (sum,{price,qty}) => {
        return sum + (price*qty);
    }, 0
);
console.log(format(withVat(total)));

itemInput.addEventListner("click", () =>{
    console.log("Hello!")
});

list.addEventListner( "click", (e) => {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    if(e.target.matches(".del")) {
        items= items.filter(i => i.id !== id);
    } else {
        const it = items.find(i => i.id === id);
        it.done = !it.done;
    }
    render();
})

format.addEventListner("submit", (e) => {
    e.preventDefault();

    const name= input.value();

    if (name === " "){
        return;
    }
})

list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);

    if ( e.target.matches=(".del")) {
        const it = items.find (i => i.id !== id);
    }else {
    const it = items.find (i => i.id === id);
    it.done= !it.done;
    }
    render();
});



async function load(){
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("request failed");
        }
        const data = await response.json();

        console.log(data);
    
    } catch(error){
        console.log("somthing is wrong");
    }
}




async function load(){
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("request failed");
        }
        const data= await response.json();

        console.log(data);

    } catch(error){
        console.log("spmething is wrong")

    render();
}
}