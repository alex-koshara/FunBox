'use strict';

const URL = 'js/data.json';

let data = fetch(URL)
  .then(function (response) {
    alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
    alert(response.status); // 200

    return response.json();
  })
  .then(function (data) {
    alert(data); // iliakan
  })
  .catch(alert);;

const CARD_CLASS = 'card';
const CARD_LIST = document.querySelector('.card-list');
let currentCard = null;

CARD_LIST.addEventListener('click', function(evt) {
  evt.preventDefault();

  let target = evt.target;
  const IS_FOOTER_CARD = findFooterParent(target);
  currentCard = findParentNode(target, CARD_CLASS);

  if (isLegalCardArea(target, currentCard, IS_FOOTER_CARD)) {
    if(stateCard.isMouseOut) {
      currentCard.classList.toggle('active');
    }
    stateCard.isClicked = !stateCard.isClicked;
    stateCard.isFirstClickCard = true;
    console.log(stateCard);
  }
});

CARD_LIST.addEventListener('mouseout', function(evt) {
  let target = evt.target;
  let currentCard = findParentNode(target, CARD_CLASS);
  // console.log(currentCard, stateCard.isMouseOut);
  if (currentCard.classList.contains('card') && stateCard.isClicked) {
    stateCard.isMouseOut = true;
    currentCard.classList.toggle('active');
  }
});

function findParentNode(target, parentClass) {
  let findElem = false;
  let parentElem = null;

  while(!findElem) {
    if(target.classList.contains(parentClass) || target.tagName.toLowerCase() == 'body') {
      findElem = true;
      parentElem = target;
    }

    target = target.parentNode;
  };

  return parentElem;
}

function findFooterParent(elem) {
  const CARD_FOOTER_CLASS = 'card__footer';
  let parent = findParentNode(elem, CARD_FOOTER_CLASS);

  if(parent.classList.contains(CARD_FOOTER_CLASS)) {
    return parent;
  }

  return false;
}

function isLegalCardArea(target, currentCard, notFooter) {
  if (currentCard.tagName.toLowerCase() === 'article' && !notFooter || target.classList.contains('card__buy-link')) {
    return true;
  }

  return false;
}