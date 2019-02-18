'use strict';

const URL = 'js/data.json';
const CARD_CLASS = 'card';
const CARD_LIST = document.querySelector('.card-list');
let currentCard = null;

let data = fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    renderContainer(data);
  })
  .catch(alert);
  
window.renderCardTemplate = (function() {
  const CARD_TEMPALTE = document.querySelector('#card-template');
  let cardElement = CARD_TEMPALTE.content.querySelector('.card-list__wrap');
  
  return function(card, data) {
    let newCard = cardElement.cloneNode(true);
    let cardArticle = newCard.querySelector('article');
    let cardDesc = newCard.querySelector('.card__desc');
    let cardTitle = newCard.querySelector('.card__title');
    let cardFill = newCard.querySelector('.card__fill');
    let cardPortions = newCard.querySelector('.card__portions');
    let cardPrize = newCard.querySelector('.card__prize');
    let cardWeightNum = newCard.querySelector('.card__weight-num');
    let cardToWeight = newCard.querySelector('.card__to-weight');
    let cardBuy = newCard.querySelector('.card__buy');

    setCardState(card);
    
    function setCardState(card) {
      cardArticle.dataset.isClicked = card.state.isClicked;
      cardArticle.dataset.isMouseOut = card.state.isMouseOut;
      cardArticle.dataset.isFirstClickCard = card.state.isFirstClickCard;
    }

    cardDesc.textContent = card.desc;
    cardTitle.textContent = card.title;
    cardFill.textContent = card.fill;
    cardPortions.textContent = card.portions;
    cardPrize.innerHTML = card.prize;
    cardWeightNum.textContent = card.weightNum;
    cardToWeight.textContent = card.toWeight;
    cardBuy.innerHTML = card.buy;

    return newCard;
  };
})();

function renderContainer(data) {
  CARD_LIST.innerHTML = '';
  let cards = data;
  
  if (!Array.isArray(data)) {
    cards = data.cards;
  }

  cards.forEach(function (card) {
    CARD_LIST.appendChild(window.renderCardTemplate(card, data));
  });
}

CARD_LIST.addEventListener('click', function(evt) {
  evt.preventDefault();

  let target = evt.target;
  const IS_FOOTER_CARD = findFooterParent(target);
  currentCard = findParentNode(target, CARD_CLASS);

  if (isLegalCardArea(target, currentCard, IS_FOOTER_CARD)) {
    if(currentCard.dataset.isMouseOut == 'true') {
      currentCard.classList.toggle('active');
    }

    if(currentCard.dataset.isClicked === 'false') {
      currentCard.dataset.isClicked = true;
    } else {
      currentCard.dataset.isClicked = false;
    }

    currentCard.dataset.isFirstClickCard = true;
  }
});

CARD_LIST.addEventListener('mouseover', function(evt) {
  if(currentCard) {
    return;
  }

  let target = evt.target;
  while(target != this) {
    if (target.tagName == 'ARTICLE') break;
    target = target.parentNode;
  }

  if(target == this) return;

  currentCard = target;
});


CARD_LIST.addEventListener('mouseout', function(evt) {
  if(!currentCard) return;

  let relatedTarget = evt.relatedTarget;
  
  if(relatedTarget) {
    while(relatedTarget) {
      if(relatedTarget == currentCard) return;
      relatedTarget = relatedTarget.parentNode;
    }
  }

  if(currentCard.dataset.isFirstClickCard == 'true' && currentCard.dataset.isMouseOut == 'false') {
    currentCard.dataset.isMouseOut = true;
    currentCard.classList.toggle('active');
  }

  currentCard = null;

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