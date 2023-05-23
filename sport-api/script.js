var tk = "";
var produktdaten = {
  Marke: "",
  Name: "",
  ArtNr: "",
  UVP: "",
  Size: "",
  Hauptfarbe: "",
  Herstellerfarbe: "",
  Farbnr: "",
  EAN: "",
  Geschlecht: "",
  GewichtGramm: "",
  GewichtKG: "",
  Langtext: "",
  Bullets: {
    Bul1: "",
    Bul2: "",
    Bul3: "",
    Bul4: "",
    Bul5: "",
    Bul6: "",
    Bul7: "",
    Bul8: "",
    Bul9: "",
    Bul10: "",
  },
  Bilder: {
    Nr1: "",
    Nr2: "",
    Nr3: "",
    Nr4: "",
    Nr5: "",
    Nr6: "",
    Nr7: "",
    Nr8: "",
    Nr9: "",
    Nr10: "",
  }
}

function startSearch () {
    event.preventDefault();
    emptyParameters();
    emptyHTML();
    const ean = document.getElementById("ean-input").value;
    getData(ean);
}

function getData (ean) {
  const requestURL = "https://epim.zandy.de/api/v1/product/" + ean + "?token=" + tk;

  let xhr = new XMLHttpRequest ();
  xhr.open("GET", requestURL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
      matchData(data);
    } else if (xhr.status === 400) {
      console.error("EAN nicht gefunden");
      document.getElementById("no-result").hidden = false;
      document.getElementById("ean-input").className = "invalid";
      setTimeout(function () {
        document.getElementById("no-result").hidden = true;
        document.getElementById("ean-input").className = "";
      }, 3000);
      emptySearch();
    }
  }
  xhr.send();
  }

function matchData (data) {
  dataLength = Object.keys(data).length;
  
  produktdaten = {
    Marke: capitalizeFirstLetter(data["Marke"]),
    Name: capitalizeFirstLetter(data["At-Name"]),
    ArtNr: data["Model-nr"],
    UVP: data["UVP"],
    Size: data["Groesse"],
    Hauptfarbe: capitalizeFirstLetter(data["Hauptfarbe"]),
    Herstellerfarbe: capitalizeFirstLetter(data["Hersteller-Farbe"]),
    Farbnr: data["Farbnummer"],
    EAN: data["EAN"],
    Geschlecht: capitalizeFirstLetter(data["Geschlecht"]),
    GewichtGramm: data["Gewicht_in_gr"],
    GewichtKG: data["Gewicht_in_kg"],
    Langtext: data["Langtext"],
    Bullets: {
      Bul1: data["Bullet1"],
      Bul2: data["Bullet2"],
      Bul3: data["Bullet3"],
      Bul4: data["Bullet4"],
      Bul5: data["Bullet5"],
      Bul6: data["Bullet6"],
      Bul7: data["Bullet7"],
      Bul8: data["Bullet8"],
      Bul9: data["Bullet9"],
      Bul10: data["Bullet10"],
    },
    Bilder: {
      Nr1: data["Bild_1"],
      Nr2: data["Bild_2"],
      Nr3: data["Bild_3"],
      Nr4: data["Bild_4"],
      Nr5: data["Bild_5"],
      Nr6: data["Bild_6"],
      Nr7: data["Bild_7"],
      Nr8: data["Bild_8"],
      Nr9: data["Bild_9"],
      Nr10: data["Bild_10"],
    }
  }

  if (data["Gewicht_in_gr"] === 0 && data["Gewicht_in_kg"] === 0) {
    produktdaten.GewichtGramm = null;
    produktdaten.GewichtKG = null;
  } else if (data["Gewicht_in_gr"] === 0) {
    produktdaten.GewichtGramm = data["Gewicht_in_kg"] * 1000;
  } else {
    produktdaten.GewichtKG = data["Gewicht_in_gr"] / 1000;
  }

  console.log(produktdaten);
  includeData(produktdaten);
}

function includeData (produktdaten) {
  document.getElementById("marke").innerHTML = produktdaten.Marke;
  document.getElementById("name").innerHTML = produktdaten.Name;
  document.getElementById("size").innerHTML = produktdaten.Size;
  document.getElementById("geschlecht").innerHTML = produktdaten.Geschlecht;
  document.getElementById("farbe").innerHTML = 
  "<strong>Hauptfarbe:&nbsp;</strong>" + produktdaten.Hauptfarbe + " &nbsp;|&nbsp; " +
  "<strong>Herstellerfarbe:&nbsp;</strong>" + produktdaten.Herstellerfarbe + " &nbsp;|&nbsp; " +
  "<strong>Farbnr.:&nbsp;</strong>" + produktdaten.Farbnr;
  document.getElementById("artnr").innerHTML = produktdaten.ArtNr;
  document.getElementById("ean").innerHTML = produktdaten.EAN;
  document.getElementById("uvp").innerHTML = produktdaten.UVP;
  document.getElementById("gewichtGramm").innerHTML = produktdaten.GewichtGramm + "&nbsp;g";
  document.getElementById("gewichtKG").innerHTML = produktdaten.GewichtKG + "&nbsp;kg";
  document.getElementById("langtext").innerHTML = produktdaten.Langtext;

  let bulletsHTML = document.getElementById("bullets");
  let bulletsArray = Object.values(produktdaten.Bullets);
  for (var i = 0; i < bulletsArray.length; i++) {
    if (bulletsArray[i] != null && bulletsArray[i] != "") {
      let bulletLi = "<li>" + bulletsArray[i] + "</li>";
      bulletsHTML.innerHTML = bulletsHTML.innerHTML + bulletLi;
    }
  }

  let bilderArray = Object.values(produktdaten.Bilder);
  for (var i = 0; i < 10; i++) {
    if (bilderArray[i] != null) {
      let divID = "bild" + i;
      document.getElementById(divID).innerHTML = 
        '<div><img src="' + bilderArray[i] + '" style="max-width: 200px"></div>' + 
        '<div><a href="' + bilderArray[i] + '" target="_blank">Download</div>';
    };
  }

  emptySearch();
} 

// Funktion um die produktdaten zu leeren
function emptyParameters () {
  clearObject(produktdaten);

}

// Funktion um die Ausgabe-Felder zu leeren
function emptyHTML () {
  document.getElementById("marke").innerHTML = "";
  document.getElementById("name").innerHTML = "";
  document.getElementById("size").innerHTML = "";
  document.getElementById("geschlecht").innerHTML = "";
  document.getElementById("farbe").innerHTML = "";
  document.getElementById("artnr").innerHTML = "";
  document.getElementById("ean").innerHTML = "";
  document.getElementById("uvp").innerHTML = "";
  document.getElementById("gewichtGramm").innerHTML = "";
  document.getElementById("gewichtKG").innerHTML = "";
  document.getElementById("langtext").innerHTML = "";
  document.getElementById("bullets").innerHTML = "";
  for (var i = 0; i < 10; i++) {
      let divID = "bild" + i;
      document.getElementById(divID).innerHTML = "";
    };
  document.getElementById("variants-container").innerHTML = "";
} 

// Funktion um den EAN Input zu leeren
function emptySearch () {
  document.getElementById("ean-input").value = "";
}

// Funktion um den ersten Buchstaben eines Wort groß zu schreiben
function capitalizeFirstLetter(str) {
  if (str != null) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function(char) {
    return char.toUpperCase();
  });
}}

// Funktion um ein Objekt zu leeren
function clearObject(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }
}

function searchVariants () {
  let variants = [];
  let checkedEANs = [];
  let ean = produktdaten.EAN;
  let modelnr = produktdaten.ArtNr;
  let variantsContainer = document.getElementById("variants-container");
  let continueSearch = true;

  // Letzte Ziffer der EAN abschneiden
  let eanShort = ean.slice(0, -1);
  let eanShortInt = parseInt(eanShort);

  // Mögliche EANs oberhalb & unterhalb der eingegebenen EAN (+10 & -10)
  for (let i = 1; i < 11; i++) {
    let newEAN = eanShortInt + i;
    for (let i = 0; i < 10; i++) {
      if (continueSearch === true) {
        let newEANlong = newEAN * 10 + i;
        checkedEANs.push(newEANlong);
        checkEAN(newEANlong, modelnr);
      }
    }
    continueSearch = true;
  }

  for (let i = 1; i < 11; i++) {
    let newEAN = eanShortInt - i;
    for (let i = 0; i < 10; i++) {
      if (continueSearch == true) {
        let newEANlong = newEAN * 10 + i;
        checkedEANs.push(newEANlong);
        checkEAN(newEANlong, modelnr);
      }
    }
    continueSearch = true;
  }

  setTimeout( function () {
    console.log(variants);
    console.log(checkedEANs);

    for (let i = 0; i < variants.length; i++) {
      variantsContainer += "<li>" + variants[i].EAN + "</li>";
    }
  }, 5000);

  function checkEAN (ean, modelnr) {
    let requestURL = "https://epim.zandy.de/api/v1/product/" + ean + "?token=" + tk;
    let xhr = new XMLHttpRequest ();
    xhr.open("GET", requestURL, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        continueSearch = false;
        let data = JSON.parse(xhr.responseText);
        if (data["Model-nr"] == modelnr) {
          variants.push(data);
          variantsContainer.innerHTML += 
          "<li>" + data["EAN"] + "<strong> | </strong>" + data["At-Name"] + "<strong> | </strong>Größe: " + data["Groesse"] + "<strong> | </strong>Farbe: " + data["HauptFarbe"] + " // " + data["Hersteller-Farbe"] + " // " + data["Farbnummer"] + "</li>";
        }
      } 
    }
    xhr.send();
  }
}

// Funktion um URL Parameter zu extrahieren
(function () {
  let urlString = window.location.search;
  let urlParams = new URLSearchParams(urlString);
  tk = urlParams.get("tk");
})();

// Funktion um Seite neu zu laden
function reloadHome () {
  let homeURL = "produktdaten.html";
  window.location.href = homeURL + "?tk=" + tk;
}
