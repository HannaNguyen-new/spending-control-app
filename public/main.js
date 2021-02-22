
const form = document.querySelector("form");
function elementFactory(type,properties){
   let element = document.createElement(type);
   for(let prop in properties){
      element.setAttribute(prop,properties[prop])
   }
   return element;
}

class ShoppingItem {
   constructor(){
      this.item = `<h2>Item</h2> <input name="item">`,
      this.quantity = `<h2>Quantity</h2> <input name = "quantity">`
   };
}
var count = 1;
function createItem(){
   count++;
   const shoppingItem = new ShoppingItem();
   const container = elementFactory("div",{class:"container", id: count});
   container.innerHTML = shoppingItem.item + shoppingItem.quantity;
   const remove = elementFactory("h3",{class:"remove", number: count});
   remove.innerHTML = "Remove";
   container.appendChild(remove);
   form.appendChild(container);
   
   remove.addEventListener("click", function(event){
      let x = event.currentTarget.getAttribute("number");
      let response = window.confirm("Are you sure you want to remove this item?");
      if(response){
         document.getElementById(x).remove();
      }
   });
}

const add = document.querySelector(".add");
add.addEventListener("click",function(){
   createItem();
})

const collections = document.querySelectorAll(".collections");
function makeRequest(modelName){
   const xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        console.log(xhttp.response)
        
      }
   };
   xhttp.open("GET","http://localhost:3000/getDocs?modelName="+modelName,true);
   xhttp.send();
}
collections.forEach(collection => {
   collection.addEventListener("click",function(){
      const clickedModelName = collection.innerHTML;
      makeRequest(clickedModelName)
   })
})
