const form = document.querySelector('.form');
const submit = form.elements.submit;
const reset = form.elements.reset;
const resultSection = document.querySelector('.counter__result');
const resultNorm = resultSection.querySelector('#calories-norm');
const resultMinimal = resultSection.querySelector('#calories-minimal');
const resultMaximal = resultSection.querySelector('#calories-maximal');

const ActivityIndex = {
  min: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.725,
  max: 1.9
}

const countCalories = (gender, age, height, weight, activity) => {
  let norm;
  if (gender === 'male') {
    norm = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) + 5;
  }

  if (gender === 'female') {
    norm = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) - 161;
  }

  return Math.round(norm  * ActivityIndex[activity]);
}

form.onchange = () => {
  let gender = form.elements.gender.value;
  let age = form.elements.age.value;
  let height = form.elements.height.value;
  let weight = form.elements.weight.value;
  let activity = form.elements.activity.value;

  if (age || height || weight) {
    reset.removeAttribute('disabled');
  } else {
    reset.setAttribute('disabled', true);
  }

  if (age && height && weight) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', true);
  }

  form.onsubmit = (evt) => {
    evt.preventDefault();
    resultSection.classList.remove('counter__result--hidden');
    const norm = countCalories(gender, age, height, weight, activity);
    const min = Math.round(norm * 0.9);
    const max = Math.round(norm * 1.1);
    resultNorm.textContent = norm;
    resultMinimal.textContent = min;
    resultMaximal.textContent = max;
  }

  form.onreset = () => {
    resultSection.classList.add('counter__result--hidden');
    resultNorm.textContent = '';
    resultMinimal.textContent = '';
    resultMaximal.textContent = '';
  }

}


