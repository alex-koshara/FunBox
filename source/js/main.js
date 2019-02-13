'use strict';

const cardList = document.querySelector('.card-list');

cardList.addEventListener('click', function(evt) {
  evt.preventDefault();

  let target = evt.target;
  const cardClass = 'card';
  let currentCard = findParentNode(target, cardClass);
  const isFooterCard = findFooterParent(target);

  if (isLegalCardArea(target, currentCard, isFooterCard)) {
    currentCard.classList.toggle('active');
  }
})

function findParentNode(target, parentClass) {
  let findElem = false;
  let parentElem = null;
  
  while(!findElem){
    if(target.classList.contains(parentClass) || target.tagName.toLowerCase() == 'body') {
      findElem = true;
      parentElem = target;
    }

    target = target.parentNode;
  };

  return parentElem;
}

function findFooterParent(elem) {
  const cardFooterClass = 'card__footer';
  let parent = findParentNode(elem, cardFooterClass);

  if(parent.classList.contains(cardFooterClass)) {
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