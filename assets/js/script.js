'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// handle contact form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullnameInput = form.querySelector('[name="fullname"]');
  const emailInput = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');

  const submission = {
    fullname: fullnameInput.value,
    email: emailInput.value,
    message: messageInput.value,
    timestamp: new Date().toISOString()
  };

  // 1. Save to JSON array in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
    existing.push(submission);
    localStorage.setItem("contact_submissions", JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to save submission to localStorage:", err);
  }

  // 2. Disable inputs & button and show loading status
  const originalBtnContent = formBtn.innerHTML;
  formBtn.disabled = true;
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

  fullnameInput.disabled = true;
  emailInput.disabled = true;
  messageInput.disabled = true;

  // 3. Post to FormSubmit AJAX API
  fetch("https://formsubmit.co/ajax/sv.shreya110@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: submission.fullname,
      email: submission.email,
      message: submission.message
    })
  })
    .then(response => {
      if (response.ok) {
        formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Sent Successfully!</span>';

        // Clear input fields
        fullnameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        setTimeout(() => {
          formBtn.innerHTML = originalBtnContent;
          formBtn.disabled = true; // Stay disabled until filled again
          fullnameInput.disabled = false;
          emailInput.disabled = false;
          messageInput.disabled = false;
        }, 3000);
      } else {
        throw new Error("Failed to send message via FormSubmit");
      }
    })
    .catch(error => {
      console.error("Error submitting contact form:", error);
      formBtn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon><span>Failed to Send</span>';

      setTimeout(() => {
        formBtn.innerHTML = originalBtnContent;
        formBtn.disabled = false;
        fullnameInput.disabled = false;
        emailInput.disabled = false;
        messageInput.disabled = false;
      }, 3000);
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}