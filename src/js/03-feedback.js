import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name=email]');
const textarea = document.querySelector('textarea[name=message]');

const STORAGE_KEY = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function onFormInput() {
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  formData.email = email.value;
  formData.message = textarea.value;

  const stringFormData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringFormData);
}

function onFormSubmit(event) {
  event.preventDefault();
  // console.log(event.currentTarget); это форма
  event.currentTarget.reset(); //сброс полей при submit
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();

function populateTextarea() {
  const textForInput = localStorage.getItem(STORAGE_KEY);
  const objField = JSON.parse(textForInput);

  if (objField) {
    textarea.value = objField.message ? objField.message : '';
    email.value = objField.email ? objField.email : '';
  }
}
