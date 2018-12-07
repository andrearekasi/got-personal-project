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
  characterSearch(liveCharacters);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function gameOfThronesSort(userDatas) {
  userDatas.sort(function customSort(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}


function deadOrAlive(userDatas) {
  var aliveArray = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (!userDatas[i].dead) {
      aliveArray.push(userDatas[i]);
    }
  }
  return aliveArray;
}


function gameOfThronesCharactersPortrait(livingCharactersArray) {
  var map = document.querySelector('#map');
  var portraitDivs = '';
  for (var i = 0; i < livingCharactersArray.length; i++) {
    portraitDivs += `<div class='left__portaits'><img src='${livingCharactersArray[i].portrait}'>
    <p class='div__p'>${livingCharactersArray[i].name}</p>
    </div>`;
  }
  map.innerHTML = portraitDivs;
}

function characterSearch(livingCharactersArray) {
  var characterInput = document.querySelector('#characterInput');
  var sidebarText = document.querySelector('#sidebarText');
  var characterDescription = '';

  for (var i = 0; i < livingCharactersArray.length; i++) {
    if (characterInput === livingCharactersArray[i].name) {
      characterDescription = `<div>
      <img src='${livingCharactersArray[i].picture}' alt='${livingCharactersArray[i].name}'>
      <div>
      ${livingCharactersArray[i].name}
      <img src='${livingCharactersArray[i].house}.png'>
      </div>
      <p>${livingCharactersArray[i].bio}</p>
      </div>`;
      sidebarText.innerHTML = characterDescription;
      return;
    }
  }
  sidebarText.innerHTML =
}