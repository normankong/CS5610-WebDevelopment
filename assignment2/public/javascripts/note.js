// Note : This assignment assume no sign on is required, so email will be hardcoded to constant.
const email = "kong.ko@northeastern.edu";

// Add Button Handler
var button = document.getElementById("floatingButton");
button.addEventListener("click", function () {
  // Clear the note before popup
  document.getElementById("noteForm").reset();
  // The modal will be popup by bootstrap init script

  // Remove Custom Validator
  document.getElementById("noteForm").classList.remove("was-validated");

  // Set Reference ID to Null
  document.getElementById("refIdField").value = null;
});

// Edit Button Handler
document
  .querySelectorAll(".bi.icon.bi-pencil-square")
  .forEach(function (element) {
    if (element.hasAttribute("data-ref-id") != null) {
      element.addEventListener("click", function (event) {
        var refId = element.getAttribute("data-ref-id");

        var refIdField = document.querySelector("#refIdField");
        var subject = document.querySelector("#subject");
        var desc = document.querySelector("#description");
        var location = document.querySelector("#location");
        var expiryTime = document.querySelector("#expiryTime");

        // Get the note from global variable
        const note = window.notes.filter((x) => x._id === refId)[0];

        refIdField.value = note._id;
        subject.value = note.subject;
        desc.value = note.desc;
        location.value = note.location;
        expiryTime.value = note.expiryTime;

        document.getElementById("noteModal").modal.show();
      });
    }
  });

// Delete Button Handler
document.querySelectorAll(".bi.icon.bi-trash").forEach(function (element) {
  if (element.hasAttribute("data-ref-id") != null) {
    element.addEventListener("click", function (event) {
      if (confirm("Are you sure you want to delete this note?", "Yes")) {
        var refId = element.getAttribute("data-ref-id");

        submitData(`/notes/${refId}`, "DELETE", { email })
          .then((response) => {
            alert("Deletion have been completed");
            console.log(response);
            document.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert("Something went wrong : " + error);
          });
      }
    });
  }
});

// Custom Validation Script using bootstrap
var button = document.getElementById("submitButton");
var noteForm = document.getElementById("noteForm");
button.addEventListener(
  "click",
  function (event) {
    let expiryTime = document.getElementById("expiryTime");
    expiryTime.setCustomValidity("");

    if (noteForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      var date = new Date(expiryTime.value);
      if (date.toString() === "Invalid Date") {
        expiryTime.setCustomValidity("Invalid field.");
        event.preventDefault();
        event.stopPropagation();
      } else {
        document.getElementById("noteModal").modal.hide();
        let refId = document.getElementById("refIdField").value;
        var subject = document.getElementById("subject").value;
        var desc = document.getElementById("description").value;
        var location = document.getElementById("location").value;
        // var expiryTime = document.getElementById("expiryTime").value;

        let method = refId == "" ? "POST" : "PUT";

        submitData(`/notes/${refId}`, method, {
          email,
          subject,
          desc,
          location,
          expiryTime: date,
        })
          .then((response) => {
            console.log(response);
            alert(`Record have been updated ${method}`);
            document.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert("Something went wrong : " + error);
          });
      }
    }
    noteForm.classList.add("was-validated");
  },
  false
);

/**
 * Submit Data to server.
 */
const submitData = (url, method, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          response.text().then((data) => {
            reject(data);
          });
        }
      })
      .catch((error) => reject(error));
  });
};

// Register the Modal Dialog to bootstrap
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  let noteModal = document.getElementById("noteModal");
  noteModal.modal = new bootstrap.Modal(noteModal);
});
