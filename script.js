let run = document.querySelector('.run');
run.addEventListener('click', sizeBlockf);

function sizeBlockf() {
  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll('.product-page__radio-box');

  for (var item of items) {
    let str = item.children[1].textContent;
    let regexp = /{(.*?)}/g;
    let result = str.match(regexp);

    if (result) {
      //set data attr for size and wood
      item.setAttribute('data-size', result[0].slice(1, -1));
      item.setAttribute('data-wood', result[1].slice(1, -1));
    }

    //remove label helper text only price
    if (item.children[1].innerHTML.split('=')[1]) {
      item.children[1].innerHTML = item.children[1].innerHTML.split('=')[1];
    } else {
      item.children[1].innerHTML = 'error';
    }
  }

  // add row of size title
  let arr = [];
  for (var item of items) {
    arr.push(item.dataset.size);
  }
  arrUnicSize = Array.from(new Set(arr));
  let arrUnicSizeCount = 0;
  for (var item of items) {
    if (item.dataset.size == arrUnicSize[arrUnicSizeCount]) {
    } else {
      let parentDiv = item.parentNode;
      parentDiv.insertBefore(createElem(arrUnicSize[arrUnicSizeCount]), item);
      arrUnicSizeCount++;
    }
  }
  let parentDiv = sizeBlock.querySelector('div[id|="input"]');
  parentDiv.insertBefore(createElem(arrUnicSize[arrUnicSize.length - 1]), null);

  let unicWoodPosSort = addWoodDataCount(items);

  insertMissingElems(items);

  sortWood();

  addRowTableTitle(unicWoodPosSort);

  resizeSizeBlockOpt();
}

// add table title of unic wood name
function addRowTableTitle(unicWoodPosSort) {
  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll('.product-page__radio-box');

  let titleItem = document.createElement('DIV');
  titleItem.classList.add(
    'product-page__radio-box',
    'product-page__table-title',
    'endrow'
  );
  titleItem.style.width = '100%';
  let parent = items[0].parentNode;
  parent.insertBefore(titleItem, items[0]);

  let arr = [];
  for (var item of items) {
    if (item.dataset.wood != undefined) {
      arr.push(item.dataset.wood);
    }
  }
  arr = Array.from(new Set(arr));

  // fix padding last right el
  for (var item of items) {
    if (item.dataset.pos == arr.length) {
      item.style.paddingRight = '0';
    }
  }

  for (var c = 0; c < unicWoodPosSort.length; c++) {
    let newItem = document.createElement('DIV');
    newItem.classList.add('product-page__radio-box');
    let textnode = document.createTextNode(unicWoodPosSort[c]);
    newItem.appendChild(textnode);
    titleItem.insertBefore(newItem, null);
  }
}

function insertMissingElems(items) {
  let newSizeBlock = document.querySelector('[option$="15"]');
  let newItems = newSizeBlock.querySelectorAll('.product-page__radio-box');

  let missingArr = checkMissingElems(items);
  let unicWood = countColRow(items, 'wood');

  for (var i = 0; i < missingArr.length; i++) {
    if (missingArr[i][1] != unicWood) {
      for (var item of newItems) {
        if (item.dataset.woodrow == missingArr[i][0]) {
          let missing = unicWood - missingArr[i][1];

          for (var t = 0; t < missing; t++) {
            let parentDiv = item.parentNode;
            parentDiv.insertBefore(
              createElem('placeholder', '100px', '999', missingArr[i][0]),
              item
            );
          }
        }
      }
    }
  }
  addWoodCountPlaceholder(missingArr, unicWood);
}

//add data-wood count placeholder items
function addWoodCountPlaceholder(missingArr, unicWood) {
  let newSizeBlock = document.querySelector('[option$="15"]');
  let newItems = newSizeBlock.querySelectorAll('.product-page__radio-box');

  arr = [];
  for (var i = 0; i < missingArr.length; i++) {
    for (var item of newItems) {
      if (item.dataset.woodrow === missingArr[i][0]) {
        arr = [];
      }
      if (item.dataset.size === missingArr[i][0]) {
        let missing = unicWood - missingArr[i][1];
        if (missing) {
          if (item.dataset.pos != 999) {
            arr.push(item.dataset.pos);
          } else {
            for (var g = 1; g <= unicWood; g++) {
              if (arr.indexOf(String(g)) == -1) {
                item.setAttribute('data-pos', g);
                arr.push(String(g));
                break;
              }
            }
          }
        }
      }
    }
  }
}

//count unic size and wood = quantity columns and rows
function countColRow(items, data) {
  let arr = [];
  for (var item of items) {
    if (!item.classList.contains('endrow')) {
      data === 'size'
        ? arr.push(item.dataset.size)
        : arr.push(item.dataset.wood);
    }
  }
  return Array.from(new Set(arr)).length;
}

//sort el of data-wood one size
function sortWood() {
  let sizeBlockSort = document.querySelector('[option$="15"]');
  let itemsSort = sizeBlockSort.querySelectorAll('.product-page__radio-box');

  let arr = [];
  for (var item of itemsSort) {
    if (!item.classList.contains('endrow')) {
      arr.push(item.dataset.size);
    }
  }
  arr = Array.from(new Set(arr));

  let elems;
  let selectorName;
  for (var b = 0; b < arr.length; b++) {
    selectorName =
      '.product-page__radio-box[data-size="' + String(arr[b]) + '"]';
    elems = document.querySelectorAll(selectorName);

    sortWoodHelper(elems);
  }
  fixSizeNameRow();
}

// fix row of size title after sort data-wood items
function fixSizeNameRow() {
  let parent = document.querySelector('[option$="15"] > div[id|="input"]');
  let delNodes = parent.querySelectorAll('.endrow');

  for (node of delNodes) {
    parent.removeChild(node);
  }

  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll('.product-page__radio-box');

  let arr = [];
  for (var item of items) {
    if (!item.classList.contains('endrow')) {
      arr.push(item.dataset.size);
    }
  }
  arrUnicSize = Array.from(new Set(arr));

  let arrUnicSizeCount = 0;
  for (var item of items) {
    if (item.dataset.size == arrUnicSize[arrUnicSizeCount]) {
    } else {
      let parentDiv = item.parentNode;
      parentDiv.insertBefore(createElem(arrUnicSize[arrUnicSizeCount]), item);
      arrUnicSizeCount++;
    }
  }
  let parentDiv = sizeBlock.querySelector('div[id|="input"]');
  parentDiv.insertBefore(createElem(arrUnicSize[arrUnicSize.length - 1]), null);
}

// func of sort single data-wood block
function sortWoodHelper(items) {
  let sizeBlockSort = document.querySelector(
    '[option$="15"] > div[id|="input"]'
  );

  var itemsArray = [];
  for (var i = 0; i < items.length; i++) {
    itemsArray.push(items[i]);
  }

  itemsArray
    .sort(function (nodeA, nodeB) {
      var textA = nodeA.dataset.pos;
      var textB = nodeB.dataset.pos;
      var numberA = parseInt(textA);
      var numberB = parseInt(textB);
      if (numberA < numberB) return -1;
      if (numberA > numberB) return 1;
      return 0;
    })
    .forEach(function (node) {
      sizeBlockSort.appendChild(node);
    });
}

// add iterate data-pos attr wood
function addWoodDataCount(items) {
  let arrUnicWood = countColRow(items, 'wood');

  let arr = [];
  for (var item of items) {
    arr.push(item.dataset.size);
  }
  arrUnicSize = Array.from(new Set(arr));

  let arrUnicSizePos = [];
  for (var i = 0; i < arrUnicWood; i++) {
    for (var item of items) {
      if (arrUnicSize[i] === item.dataset.size) {
        arrUnicSizePos.push(item.dataset.wood);

        if (arrUnicSizePos.length === arrUnicWood) {
          break;
        }
      } else {
        arrUnicSizePos = [];
      }
    }
    if (arrUnicSizePos.length === arrUnicWood) {
      break;
    }
  }

  // set attr data-pos
  for (var i = 0; i < arrUnicSizePos.length; i++) {
    for (var item of items) {
      if (item.dataset.wood === arrUnicSizePos[i]) {
        item.setAttribute('data-pos', i + 1);
      }
    }
  }
  return arrUnicSizePos;
}

// return quantity of missing items
function checkMissingElems(items) {
  let arr = [];
  let count = 0;
  for (var i = 0; i < arrUnicSize.length; i++) {
    for (var item of items) {
      if (item.dataset.size === arrUnicSize[i]) {
        ++count;
      }
    }
    arr.push([arrUnicSize[i], count]);
    count = 0;
  }
  return arr;
}

function createElem(
  name = 'test',
  width = '100%',
  dataPos = false,
  size = false
) {
  let newItem = document.createElement('DIV');
  newItem.classList.add('product-page__radio-box');
  let textnode;
  if (name === 'placeholder') {
    textnode = document.createTextNode('');
  } else {
    textnode = document.createTextNode(name);
  }
  newItem.appendChild(textnode);
  newItem.setAttribute('data-woodrow', name);
  newItem.style.width = width;
  if (dataPos && size) {
    newItem.setAttribute('data-pos', dataPos);
    newItem.setAttribute('data-size', size);
  } else {
    newItem.classList.add('endrow');
  }

  return newItem;
}

//window event resize
function resizeSizeBlockOpt() {
  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll(
    '.product-page__radio-box:not(.endrow)'
  );

  let arr = [];
  for (var item of items) {
    if (item.dataset.wood != undefined) {
      arr.push(item.dataset.wood);
    }
  }
  arr = Array.from(new Set(arr));

  let width = sizeBlock.offsetWidth - 1;
  let elemWidth = Math.floor(width / arr.length);
  for (var item of items) {
    item.style.width = elemWidth + 'px';
  }
}

//document.addEventListener("DOMContentLoaded", sizeBlockf);
window.addEventListener('resize', resizeSizeBlockOpt);
