
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
      this.item = `<h2 class="item">Item</h2> <input name="item">`,
      this.quantity = `<h2 class="quantity">Quantity</h2> <input name = "quantity">`
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

//HTTP request
function httpRequest(method,url){
   const xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
         console.log(xhttp.response)
      }
   };
   xhttp.open(method,url,true);
   xhttp.send();
}

/* HTTP request to display items of different lists*/
const collections = document.querySelectorAll(".collections");
function displayRequest(modelName){
   let method = "GET";
   let url = "http://localhost:3000/getDocs?modelName="+modelName;
   httpRequest(method,url)
}
collections.forEach(collection => {
   collection.addEventListener("click",function(){
      const clickedModelName = collection.innerHTML;
     displayRequest(clickedModelName)
   })
})

/* HTTP request to delete items */
const trashBin = document.querySelectorAll(".trashBin");
function deleteRequest(itemName){
   let method = "DELETE";
   let url = "./delete?itemName=" + itemName;
   httpRequest(method,url);
   window.location.href = "/"
}

trashBin.forEach(bin => {
   bin.addEventListener("click",function(){
      bin.parentNode.setAttribute("class","delete");
      const deleteItem = document.querySelector(".delete").children[0];
      deleteRequest(deleteItem.innerHTML)
   })
})
