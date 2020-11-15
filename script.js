let run = document.querySelector('.run');
run.addEventListener('click', sizeBlockf);

function sizeBlockf() {
  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll('.product-page__radio-box');

  for (var item of items) {
    let str = item.children[1].textContent;
    let regexp = /{(.*?)}/g;
    let result = str.match(regexp);
    // console.log(result);

    if (result) {
      //set data for size and wood
      item.setAttribute('data-size', result[0].slice(1, -1));
      item.setAttribute('data-wood', result[1].slice(1, -1));
    }

    //label text only price
    if (item.children[1].innerHTML.split('=')[1]) {
      item.children[1].innerHTML = item.children[1].innerHTML.split('=')[1];
    } else {
      item.children[1].innerHTML = 'error';
    }
  }
  //end for

  //width one elems
  let width = sizeBlock.offsetWidth;
  console.log('Ширина = ' + width);
  let elemWidth = Math.floor(width / countColRow(items, 'wood')) - 1;

  //set width all elems
  for (var item of items) {
    item.style.width = elemWidth + 'px';
  }
  // sort(items);

  // add row size
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

  addWoodDataCount(items);

  insertMissingElems(items);
}

function insertMissingElems(items) {
  let newSizeBlock = document.querySelector('[option$="15"]');
  let newItems = newSizeBlock.querySelectorAll('.product-page__radio-box');
  let missingArr = checkMissingElems(items);
  console.log(missingArr);
  let unicWood = countColRow(items, 'wood');
  for (var i = 0; i < missingArr.length; i++) {
    if (missingArr[i][1] != unicWood) {
      for (var item of newItems) {
        // console.log(item);
        if (item.dataset.woodrow == missingArr[i][0]) {
          let missing = unicWood - missingArr[i][1];
          console.log('в размере ' + missingArr[i][0] + ' ' + missing + 'эл');
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
  // return arr all size ["1200х800х750", 6]
  console.log(missingArr);
  console.log(unicWood);
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
            console.log('arr1 = ' + arr);
          } else {
            for (var g = 1; g <= unicWood; g++) {
              if (arr.indexOf(String(g)) == -1) {
                item.setAttribute('data-pos', g);
                arr.push(String(g));
                console.log('arr2 = ' + arr);
                debugger;
                break;
              }
              // console.log('arr2 = ' + arr);
            }
          }
          console.log('miss = ' + missing + ' ' + item.dataset.size);
        }
      }
    }
  }
}

//count unic size and wood = quantity columns and rows
function countColRow(items, data) {
  let arr = [];
  for (var item of items) {
    data === 'size' ? arr.push(item.dataset.size) : arr.push(item.dataset.wood);
  }
  return Array.from(new Set(arr)).length;
}

//sort
// function sort(nodeList) {
//   let sizeBlock = document.querySelector('[option$="15"]');
//   var itemsArray = [];
//   for (var i = 0; i < nodeList.length; i++) {
//     itemsArray.push(nodeList[i]);
//   }
//   console.dir('NodeList' + itemsArray);
//   itemsArray
//     .sort(function (nodeA, nodeB) {
//       var textA = nodeA.dataset.size;
//       var textB = nodeB.dataset.size;
//       var numberA = parseInt(textA);
//       var numberB = parseInt(textB);
//       if (numberA < numberB) return -1;
//       if (numberA > numberB) return 1;
//       return 0;
//     })
//     .forEach(function (node) {
//       sizeBlock.appendChild(node);
//     });
// }

// add iterate data attr wood
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
  console.log('unic: ' + arrUnicSizePos);

  // set attr data-pos
  for (var i = 0; i < arrUnicSizePos.length; i++) {
    for (var item of items) {
      if (item.dataset.wood === arrUnicSizePos[i]) {
        item.setAttribute('data-pos', i + 1);
      }
    }
  }
}

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
  let textnode = document.createTextNode(name);
  newItem.appendChild(textnode);
  newItem.setAttribute('data-woodrow', name);
  newItem.style.width = width;
  if (dataPos && size) {
    newItem.setAttribute('data-pos', dataPos);
    newItem.setAttribute('data-size', size);
  }

  return newItem;
}

//window resize
function resizeSizeBlockOpt() {
  let sizeBlock = document.querySelector('[option$="15"]');
  let items = sizeBlock.querySelectorAll('.product-page__radio-box');

  let width = sizeBlock.offsetWidth;
  let elemWidth = Math.floor(width / 6) - 1;

  for (var item of items) {
    item.style.width = elemWidth + 'px';
  }
}

//document.addEventListener("DOMContentLoaded", sizeBlockf);
//window.addEventListener("resize", resizeSizeBlockOpt);
