const onLoad = () => {

  handleButtonText();

  addEventHandler();

};

const handleButtonText = () => {

  // Handle the Button Application State
  let applicationState = JSON.parse(
    window.localStorage.getItem("applicationState") || "{}"
  );
  let isDarkMode = applicationState.isDarkMode || false;
  if (isDarkMode) {
    let introduction = document.querySelector("#introduction");
    introduction.classList.add("dark");
  }

  let button = document.querySelector(".toggleButton");
  button.innerHTML = isDarkMode ? "Light" : "Dark";
}

const addEventHandler = () => {
  // Add Button Event Handler
  let button = document.querySelector(".toggleButton");
  button.addEventListener("click", toggleHandler);

  // Add Data Time button
  let datetimeButton = document.querySelector("#datetimeButton");
  datetimeButton.addEventListener("click", dateTimeHandler);
}

const toggleHandler = (item) => {
  // Toggle the Introduction
  let introduction = document.querySelector("#introduction");
  introduction.classList.toggle("dark");

  // Update the Button name
  let isDarkMode = introduction.classList.contains("dark");
  let button = document.querySelector(".toggleButton");
  button.innerHTML = isDarkMode ? "Light" : "Dark";

  // Update the Application State
  let status = {
    isDarkMode: isDarkMode,
  };
  window.localStorage.setItem("applicationState", JSON.stringify(status));
};

const dateTimeHandler = () => {
  let isDateCheck = document.querySelector("#dateradio").checked;
  let dateTimePanel = document.querySelector("#dateTimePanel");
  let now = new Date();
  let node = document.createElement("p");
  node.innerHTML = (isDateCheck) ? now.toDateString() : now.toLocaleTimeString('en-US');
  dateTimePanel.append(node);
}
onLoad();
