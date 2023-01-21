import throttle from "lodash.throttle";

const formRef = document.querySelector(".feedback-form");
const emailRef = document.querySelector('input[name="email"]');
const messageRef = document.querySelector('textarea[name="message"]');
let formData = JSON.parse(localStorage.getItem("feedback-form-state")) || {};
function onInputChange(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}
const parcedData = JSON.parse(localStorage.getItem("feedback-form-state"));
function getStorageData() {
  if (parcedData) {
    emailRef.value = parcedData.email || "";
    messageRef.value = parcedData.message || "";
  }
}

formRef.addEventListener("input", throttle(onInputChange, 500));
formRef.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const formValues = {
    email: emailRef.value,
    message: messageRef.value,
  };

  if (emailRef.value === "" || messageRef.value === "") {
    window.alert("Будь ласка, заповність усі поля.");
  } else {
    console.log(formValues);
    e.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
    formData = {};
  }
}

getStorageData();
