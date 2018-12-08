function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var liveCharacters = deadOrAlive(userDatas);
  gameOfThronesSort(liveCharacters);
  gameOfThronesCharactersPortrait(liveCharacters);
  getCharectersDescription(liveCharacters);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// karakterek abc sorrendbe tétele
function gameOfThronesSort(userDatas) {
  userDatas.sort(function customSort(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}

// élő karakterek kiszűrése
function deadOrAlive(userDatas) {
  var aliveArray = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (!userDatas[i].dead) {
      aliveArray.push(userDatas[i]);
    }
  }
  return aliveArray;
}

// portrék megjelenítése
function gameOfThronesCharactersPortrait(gotChar) {
  var map = document.querySelector('#map');
  var portraitDivs = '';
  for (var i = 0; i < gotChar.length; i++) {
    portraitDivs += `<div class='left__portraits'>
    </div>`;
  }
  map.innerHTML = portraitDivs;
  searchCharacterButton(gotChar, gotChar.length);
}

// keresőmező működtetése
function searchCharacterButton(gotChar, gotCharLength) {
  document.querySelector('#searchButton').addEventListener('click', function fc() {
    characterSearch(gotChar, gotCharLength);
  });
}

// infók megjelenítése a sidebarban
function characterSearch(gotChar, gotCharLength) {
  var characterInput = document.querySelector('#characterInput').value;
  var sidebarText = document.querySelector('#sidebarText');
  var characterDescription = '';
  var flag = '';
  for (var i = 0; i < gotCharLength; i++) {
    if (!gotChar[i].house) {
      flag = '';
    } else {
      flag = `<img class='div__flag' src='./assets/houses/${gotChar[i].house}.png'></img>`;
    }
    if (characterInput.toLowerCase() === gotChar[i].name.toLowerCase()) {
      characterDescription = `<div>
      <img class='div__img-charpictures' src='${gotChar[i].picture}' alt='${gotChar[i].name}'>
      <div class='div__char-name'>${gotChar[i].name}</div>
      <div>${flag}</div>
      <p class='div__p-bio'>${gotChar[i].bio}</p>
      </div>`;
      sidebarText.innerHTML = characterDescription;
      return;
    }
  }
  sidebarText.innerHTML = `<p class='div__p-notfound'>${'Charachter not found'}</p>`;
}

// kattintásra infók előhívása
function getPicturesDiv() {
  var picturesDiv = document.querySelector('.left__portraits');
  return picturesDiv;
}

function showDescription(gotChar, index) {
  var picturesDiv = getPicturesDiv();
  picturesDiv.children =
    //var characterDiv = picturesDiv.children;
    document.querySelector('#sidebarText').innerHTML = `<div>
      <img class='div__img-charpictures' src='${gotChar[index].picture}' alt='${gotChar[index].name}'>
      <div class='div__char-name'>${gotChar[index].name}</div>
      <p class='div__p-bio'>${gotChar[index].bio}</p>
      </div>`;
}

function addCustomListenerForDivs(gotChar, element, index) {
  element.addEventListener('click', function func() {
    showDescription(gotChar, index);
  });
}

function getCharectersDescription(gotChar) {
  var picturesDiv = getPicturesDiv();
  for (var i = 0; i < gotChar.length; i++) {
    var div = document.createElement('div');
    div.innerHTML = `<img class='div__img-portrait' src='${gotChar[i].portrait}'>
    <p class='div__p'>${gotChar[i].name}</p>`;
    addCustomListenerForDivs(gotChar, div, i);
    picturesDiv.appendChild(div);
    div.className = 'div__div';
  }

}