/**
 * Do/While Loop to check username
 */
const promptHello = () => {
    let myName = null;

    do {
        myName = prompt("Enter your name");
    } while (!isNaN(myName) || myName.length < 2);

    alert("Welcome " + myName)
}

/**
 * Function to calculate total price
 */
const totalPrice = (bill, tax = 12, tip = 15) => {
    let total = bill + (bill * tax / 100) + (bill * tip / 100);
    return total;
}

/**
 * Higher Order function to prompt the total price
 */
const promptTotalPrice = (func, bill, tax, tips) => {
    alert(func(bill, tax, tips));
}


/**
 * Data structure for Students
 */
let students = [{
    name: "Cristian",
    age: 30,
    location: "Vancouver"
}, {
    name: "James",
    age: 40,
    location: "Toronto"
}, {
    name: "Garry",
    age: 20,
    location: "Vancouver"
}
];

/**
 * Find Student by Location, return array of names
 */
let findStudentLocation = (students, location) => {
    return students.filter(x => x.location === location).map(x => x.name);
}

/**
 * Find Student by Age, return array of names
 */
let findStudentOverAge = (students, age) => {
    return students.filter(x => x.age >= age).map(x => x.name);
}

// Function to test individual functions
promptHello();
promptTotalPrice(totalPrice, 100);
promptTotalPrice(totalPrice, 100, 20, 25);
alert(findStudentOverAge(students, 30));
alert(findStudentLocation(students, "Vancouver"));