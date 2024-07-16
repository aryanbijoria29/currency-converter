const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
      }else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";
      }
      select.append(newOption);
    }

    select.addEventListener("change", (event)=>{
        upadteFlag(event.target);
    })
}  


const upadteFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
}



const updateExhangeRate =  async ()=>{

    let amount = document.querySelector(".amount input");
    let amtValue =amount.value;
    if(amtValue === "" || amtValue < 1){
        amtValue =1;
        amtValue.value ="1";
    }
    const URL = `https://api.frankfurter.app/latest?amount=${amtValue}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data =  await response.json();
    let rate = data.rates[toCurr.value];
    //console.log(rate);
    msg.innerHTML = `${amtValue} ${fromCurr.value} = ${rate} ${toCurr.value}`;

}

window.addEventListener("load", () => {
    updateExhangeRate();
});

btn.addEventListener("click", async (event) =>{
    event.preventDefault();
    updateExhangeRate();
});