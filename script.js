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
  sort(items);
  missingItems(items);
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
function sort(nodeList) {
  let sizeBlock = document.querySelector('[option$="15"]');
  var itemsArray = [];
  for (var i = 0; i < nodeList.length; i++) {
    itemsArray.push(nodeList[i]);
  }
  // console.dir('NodeList' + itemsArray);
  itemsArray
    .sort(function (nodeA, nodeB) {
      var textA = nodeA.dataset.size;
      var textB = nodeB.dataset.size;
      var numberA = parseInt(textA);
      var numberB = parseInt(textB);
      if (numberA < numberB) return -1;
      if (numberA > numberB) return 1;
      return 0;
    })
    .forEach(function (node) {
      sizeBlock.appendChild(node);
    });
}

//missing items
function missingItems(items) {
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

  // arrUnicWood = Array.from(new Set(arrUnicWood));
  // arrUnicSize = Array.from(new Set(arrUnicSize));
  // console.log(arrUnicWood);
  // console.log(arrUnicSize);

  // for (var i = 0; i < 6; i++) {
  //   if (items[i].dataset.wood === arrUnicWood[i]) {
  //     console.log('done');
  //     console.log('done' + items[i].dataset.wood);
  //     console.log('done' + arrUnicWood[i]);
  //   } else {
  //     let newItem = document.createElement('DIV');
  //     newItem.classList.add('product-page__radio-box');
  //     let textnode = document.createTextNode('Test');
  //     newItem.appendChild(textnode);
  //     let parentDiv = items[i].parentNode;
  //     parentDiv.insertBefore(newItem, items[i]);
  //     console.log('fuck');
  //   }
  // }
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
