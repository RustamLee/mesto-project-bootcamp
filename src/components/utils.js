
import {hasInvalidInput} from './validate.js';

export function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

