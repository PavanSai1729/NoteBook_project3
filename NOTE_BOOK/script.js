// GET CALL
window.addEventListener("DOMContentLoaded",function(){
    axios.get("https://crudcrud.com/api/52a0f14354064744bba3fd8366f63a84/NOTES")
     .then(function(result){
       console.log(result);
       
       for(var i=0; i<result.data.length;i++){
         displayOnScreen(result.data[i]);
       }
     })
     .catch(function(err){
       console.log(err);
     })
     
 })



// POST CALL
function abc(event) {
    event.preventDefault();

    const notes = {
        n1: event.target.n1.value,
        d1: event.target.d1.value
    };

    axios.post("https://crudcrud.com/api/52a0f14354064744bba3fd8366f63a84/NOTES", notes)
    .then(function(response){
        displayOnScreen(response.data); 
    })
    .catch(function(err){
        console.error(err);
    });

    document.getElementById("n1").value = "";
    document.getElementById("d1").value = "";
}




function displayOnScreen(notes) {
    const child = document.createElement("div");
    child.innerHTML = `<h1>${notes.n1}</h1> <p>${notes.d1}</p>`;


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'delete'; 
    child.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function (event) {
        // Remove the item from the screen
        const listItem = event.target.parentElement;
        listItem.remove();
    
        // Extract the item ID from the notes object
        const itemId = notes._id; // Assuming the ID field in the notes object is named "_id"
        
        // Send a DELETE request to the backend API
        axios.delete(`https://crudcrud.com/api/52a0f14354064744bba3fd8366f63a84/NOTES/${itemId}`)
        .then(function(result){
            console.log(result);
        })
        .catch(function(err){
            console.log(err);
        });
    });

    const parent = document.getElementById("display_items");
    parent.appendChild(child);
}



//filter


const filter = document.getElementById("s1");
filter.addEventListener("keyup", function(event){
    const items = document.querySelectorAll("#display_items div"); // Target the divs inside the display_items div
    const textEntered = event.target.value.toLowerCase(); // Use event.target.value to get the value entered in the input field

    for (let i = 0; i < items.length; i++) {
        const currItemText = items[i].textContent.toLowerCase(); // Access textContent of the list item directly
        if (currItemText.indexOf(textEntered) === -1) {
            items[i].style.display = "none";
        } else {
            items[i].style.display = "flex";
        }
    }
});



//count

function updateItemCount() {
    // Count the number of displayed items
    const displayedItems = document.querySelectorAll("#display_items div").length;

    // Fetch the total count of items from the backend API
    axios.get("https://crudcrud.com/api/52a0f14354064744bba3fd8366f63a84/NOTES")
        .then(function(response) {
            const totalItems = response.data.length;
            
            // Count the number of deleted items
            const deletedItems = Array.from(response.data).filter(item => item.deleted).length;

            // Update the display with the correct counts
            const para1 = document.getElementById("para1");
            const para2 = document.getElementById("para2");
            para1.textContent = `Showing: ${displayedItems - deletedItems} items`;
            para2.textContent = `Total Notes: ${totalItems}`;
        })
        .catch(function(error) {
            console.error("Error fetching total item count:", error);
        });
}

updateItemCount();

// Create a MutationObserver to monitor changes in the display items
const displayItems = document.getElementById("display_items");
const observer = new MutationObserver(updateItemCount);

// Configure the observer to watch for changes in the child nodes of displayItems
const config = { childList: true };

// Start observing the display items for changes
observer.observe(displayItems, config);



// function updateItemCount() {
//     const itemCount = document.querySelectorAll("#display_items div").length; // Count the number of div elements
//     const para2 = document.getElementById("para2");
//     para2.textContent = `Showing: ${itemCount} items`; // Update the text content of the paragraph tag
// }

// updateItemCount();

// // Create a MutationObserver to monitor changes in the display items
// const displayItems = document.getElementById("display_items");
// const observer = new MutationObserver(updateItemCount);

// // Configure the observer to watch for changes in the child nodes of displayItems
// const config = { childList: true };

// // Start observing the display items for changes
// observer.observe(displayItems, config);
