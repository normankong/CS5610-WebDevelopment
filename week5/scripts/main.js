// Write external JS code to get a number from the user as radius of a circle and calculate the area of
// the circle. Update the HTML elements appropriately with the numbers.
const promptInput = () => {
  let input = null;
  do {
    input = prompt("Enter the radius of the circle");
  } while (isNaN(input));

  document.querySelector(
    "#result"
  ).innerHTML = `The area of the circle is ${calculate(circleArea, input)}`;
};

const circleArea = (radius) => {
  return radius * Math.sqrt(3.14, 2);
};

const calculate = (func, input) => {
  return func(input);
};
// promptInput();

// Write a function that gets an array of strings and populate the unordered list with class="shopping"
// with the array elements.
let node = document.querySelector(".shopping");
let shoppingList = ["Milk", "Bread", "Eggs", "Cheese", "Butter", "green apple"];
for (x in shoppingList) {
  let liNode = document.createElement("li");
  liNode.appendChild(document.createTextNode(shoppingList[x]));
  node.append(liNode);
}

// Write a JS function to change the list marker type of all list items in the document to square by using
// a CSS rules with class selector.
//   Try both setAttribute() and classList.add()
const changeListMarker = () => {
    let node = document.querySelector(".shopping");
    node.classList.add("square")
}
changeListMarker();

// Write a JS function to locate all <li> elements and change their color to green if their text contains
// word "green".
const changeGreenColor = () => {
    let nodeList = document.querySelectorAll("li");
    for (let node of nodeList) {
        if (node.innerHTML.includes("green")) {
            node.style.color = "green";
        }
    }
}
changeGreenColor();

// Add an event listener that change the text of the button with id="updateImage" to say “clicked!” when
// it's clicked and change the text on the button back to “Click Me!” when the button is pressed again.
const addClickButtonHandler = () => {
    let node = document.querySelector("#updateImage");
    node.addEventListener("click", () => {
        if (node.innerHTML === "Click Me!") {
            node.innerHTML = "clicked!";
        } else {
            node.innerHTML = "Click Me!";
        }

        saveLocalStorageHandler();
    })
}
addClickButtonHandler();


// Add another event listener to the button to locate the img element with id="shoppingCart" and
// update its src (with the image saved in images folder), alt, width, and height attribute.
// How can you make this event handler run only once?
const addImageHandler = () => {
    let node = document.querySelector("#updateImage");
    node.addEventListener("click", () => {
        let node = document.querySelector("#shoppingCart");
        node.setAttribute("src", "images/shoppingCart.png");
        node.setAttribute("alt", "shopping cart");
        node.setAttribute("title", "shopping cart");
        node.setAttribute("width", "100");
        node.setAttribute("height", "100");
    }, {once: true});
}
addImageHandler();

// Use one event handler function to change background color of the red, blue, and green buttons based
// on the color's text when the cursor is moved over it.
// const addChangeColorEventHandler = () => {
//     let buttons = document.querySelectorAll(".colorButton");
//     buttons.forEach(button => {
//         button.addEventListener("mouseover", (item) => {
//             let target = item.target;
//             target.style.backgroundColor = target.innerHTML;
//         }, {once: true});
//     });
// }
// addChangeColorEventHandler();

// Update the previous example to have the 3 color buttons inside a <div>. Now make the <div> listen
// for the same mouse over event from before to turn the background of the target button to green.
const addDivEventHandler = () => {
    let node = document.querySelector("div");
    node.addEventListener("mouseover", () => {
    let buttons = document.querySelectorAll(".colorButton");
    buttons.forEach(button => {
        button.style.backgroundColor = "green";
    });
    }, {once: true});

}
addDivEventHandler();

// Add an event listener on the <ul> element to listen for "click" events on the <li>s and update the list
// item with a strikethrough, or a line through it.
const addStrikeThroughHandler = () => {
    let node = document.querySelector("ul");
    node.addEventListener("click", (item) => {
        let target = item.target;
        if (target.tagName === "LI"){
            target.style.textDecoration = "line-through";
        }
    });
}
addStrikeThroughHandler();

// Update the code in Activity 4 to save the text of the button with id = updateImage in localstorage. Test
// that when you close and open the browser, the text of the button persists.
const saveLocalStorageHandler = () => {
    let node = document.querySelector("#updateImage");
    window.localStorage.setItem("updateImage", node.innerHTML);
}

const addOnLoadHandler = () => {
    let text = window.localStorage.getItem("updateImage") || "Click Click Me!";
    let node = document.querySelector("#updateImage");
    node.innerHTML = text;
}
addOnLoadHandler();