// Ez egy példa arra, hogyan tudok egy loop segítségével eventListenert 
// hozzáadni több elemhez
// Ebben a példávan a nodokhoz kapcsolódó függvényeket használtam

// Csak egy function a container element lekérésére
function getContainerElement() {
  var container = document.querySelector('.paragraph-container');
  return container;
}

// Ez a függvény megjeleníti annak a p tagnek a tartalmát alerten, amire kattintottunk. 
function showElementContent(index) {
  var container = getContainerElement();
  var paragraph = container.children;
  alert(paragraph[index].textContent);
}

// Ez a függvény végzi el az eventListener hozzáadását a paraméterként megadott elemhez
// Megkapja az indexet is, ami jelen esetben reprezentálja, hogy a container hányadik gyermeke
// EZ persze nem minden esetben lesz jó, attól függ vannak e egyéb gyermekelemek, de
// akartam egy node-os, childrenes példát is mutatni
// Persze meg lehet oldani event.taget-el is, meg IIFE-vel, meg let-el meg egyéb módokon is
function addCustomListenerForParagraph(element, index) {
  element.addEventListener('click', function () {
    showElementContent(index)
  });
}

function generateElements() {
  var container = getContainerElement();
  for (var i = 0; i < 10; i += 1) {
    var paragraph = document.createElement('p');
    paragraph.textContent = `Lorem Ipsum ${i}`;
    // Ítt az i értéke, bármelyik p tagre kattintok is, mindig 10 lesz, 
    // ami, ha ezt indexként akarom felhasználni undefined-ot ad vissza az adott elemre
    // Azért lesz az i mindig 10, mert amikor az addEventListenernek megadott callback meghívódik
    // akkor a loop már végzett, és ilyenkor ugye már 10 az i értéke, és ezt kapja meg a
    // callbacken belül függvény minden esetben, nem pedig az aktuális loop-on belüli értéket
    // Igen, ez utánajárós, de ha egyszer megértitek akkor utána már tiszta sor.
    // Tehát ez nem fog működni: 
    // paragraph.addEventListener('click', function() { showElementContent(elementIndex) });

    // Ellenben így már rögtön működik, azért mert az addCustomListenerForParagraph
    // függvény rögtön lefut, és az éppen aktuális i értékét kapja meg
    addCustomListenerForParagraph(paragraph, i);
    container.appendChild(paragraph);
  }
}

generateElements();