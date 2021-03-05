
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
      this.item = `<h3 class="item">Item</h3> <input name="item">`,
      this.quantity = `<h3 class="quantity">Quantity</h3> <input name = "quantity">`
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

const checkMarks = document.querySelectorAll(".checkMark");
checkMarks.forEach(checkMark => {
   checkMark.addEventListener("click",function(){ 
      toggle(checkMark);
   })
})
function toggle(node){ 
  const checkedItem = node.parentNode;
  checkedItem.toggleAttribute("checked");  
  if(checkedItem.hasAttribute("checked")){
   checkedItem.style.textDecoration = "line-through"
} else{
   checkedItem.style.textDecoration = "none"
}
}

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
