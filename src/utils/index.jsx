export const masks = {
  cep(value) {
    return value
      .replace(/\D+/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  },
}

/**
 * show / hide loading animation
 *
 * @param event true or false
 * @param parentLoadingElement .class or #id of the loading element parent
 * @param elementList true or false - search for more than one element 
 */
 export function showLoadingAnimation(event = true, parentLoadingElement = '.submit', elementList = false) {
  const loadingElement = elementList ? document.querySelectorAll(parentLoadingElement) : document.querySelector(parentLoadingElement);

  if(elementList) {
    loadingElement.forEach((input => {
      event ? input.parentElement.classList.add('loading') : input.parentElement.classList.remove('loading');
    }));
  } else {
    loadingElement.parentElement.classList.contains('loading') ? loadingElement.parentElement.classList.remove('loading') : loadingElement.parentElement.classList.add('loading');
  }
}