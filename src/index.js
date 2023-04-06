import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { renderCountries, renderCountry, clearCoutries } from './countries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onInputTypeIn, DEBOUNCE_DELAY));

function onInputTypeIn(event) {
  if (event.target.value.trim()) {
    fetchCountries(event.target.value.trim())
      .then(response => {
        if (response.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (response.length >= 2 && response.length <= 10) {
          renderCountries(response);
        } else {
          renderCountry(response);
        }
      })
      .catch(error => {
        clearCoutries();
        Notify.failure('Oops, there is no country with that name');
      });
  }
  clearCoutries();
}