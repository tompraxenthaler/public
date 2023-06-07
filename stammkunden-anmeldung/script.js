var htmlForm = document.getElementById("htmlForm");
var formButton = document.getElementById("formButton");
var parameters = {
    anrede: "",
    titel: "",
    vorname: "",
    nachname: "",
    anzeigename: "",
    email: "",
    optin: "",
    strasse: "",
    hausnummer: "",
    adresszusatz: "",
    plz: "",
    ort: "",
    land: "",
    telefon: "",
    geburtsdatum: "",
    tag: "",
    monat: "",
    jahr: "",
    sportarten: "",
    kundenkarte: "",
};
var geschlecht = "";
var sportartCheckboxes = "";
var sportartenSelected = "";

/////////////////////////////////////////////////
// Bei Input Validität prüfen & Button aktivieren
/////////////////////////////////////////////////
htmlForm.addEventListener("input", () => {
    if (htmlForm.checkValidity()) {
        document.getElementById("formButton").className = "formButtonActive";
    } else {
        document.getElementById("formButton").className = "";
    }
  });

// Alt: Button Aktivierung wenn Form komplett ausgefüllt
// htmlForm.addEventListener("input", () => {
//     if (htmlForm.checkValidity()) {
//       formButton.disabled = false;
//     } else {
//       formButton.disabled = false;  // HIER "TRUE" EINFÜGEN!!!!!!!
//     }
//   });

/////////////////////////////////////////////////
// Bei Klick auf inaktiven Button PopUp anzeigen
/////////////////////////////////////////////////
document.getElementById("formButton").addEventListener("click", () => {
    if (htmlForm.checkValidity()) {

    } else {
        console.log("buttonPopUp verändern!");
        document.getElementById("buttonPopUp").style.display = "block";
        setTimeout(hidePopUp, 3000);

        function hidePopUp () {
            console.log("hidePopUp");
            document.getElementById("buttonPopUp").style.display = "none";
        }
    }
});

/////////////////////////////////////////////////
// Bei Familie/Firma/Verein Vorname vordefinieren
/////////////////////////////////////////////////
document.getElementById("anrede").addEventListener("input", () => {
    const anrede = document.getElementById("anrede").value;

    switch (anrede) {
        case "Familie": 
            document.getElementById("vorname").value = "Familie";
            document.getElementById("vorname").setAttribute("type", "hidden");
            document.getElementById("nachname").setAttribute("placeholder", "Nachname*");
            break;
        case "Firma":
            document.getElementById("vorname").value = "Firma";
            document.getElementById("vorname").setAttribute("type", "hidden");
            document.getElementById("nachname").setAttribute("placeholder", "Firmenname*");
            break;
        case "Verein":
            document.getElementById("vorname").value = "Verein";
            document.getElementById("vorname").setAttribute("type", "hidden");
            document.getElementById("nachname").setAttribute("placeholder", "Name des Vereins*");
            break;
        case "Herr":
        case "Frau":
        case "divers":
            document.getElementById("vorname").value = "";
            document.getElementById("vorname").setAttribute("type", "text");
            document.getElementById("nachname").setAttribute("placeholder", "Nachname*");
            break;
    }
});

///////////////////////////////////////////////////
// Geburtsdatum überprüfen bei Verlassen des Inputs
///////////////////////////////////////////////////
const tag = document.getElementById("tag");
const monat = document.getElementById("monat");
const jahr = document.getElementById("jahr");

tag.addEventListener("blur", () => {
    if (tag.value > 31 || tag.value < 1) {
        tag.value = "";
        tag.className = "invalid";
    } else {
        tag.className = "valid";
        if (tag.value.length < 2) {
            tag.value = "0" + tag.value;
        }}
});

tag.addEventListener("input", () => {
    if (tag.value.length == "2") {
        monat.focus();
    }
});

monat.addEventListener("blur", () => {
        if (monat.value > 12 || monat.value < 1) {
            monat.value = "";
            monat.className = "invalid";
        } else {
            monat.className = "valid";
            if (monat.value.length < 2) {
                monat.value = "0" + monat.value;
            }}
});

monat.addEventListener("input", () => {
    if (monat.value.length == "2") {
        jahr.focus();
    }
});

jahr.addEventListener("blur", () => {
        if (jahr.value > 2023 || jahr.value < 1900) {
            jahr.value = "";
            jahr.className = "invalid";
        } else {
            jahr.className = "valid";
        }
});

jahr.addEventListener("input", () => {
    if (jahr.value.length == "4") {
        jahr.blur();
        // document.getElementById("alpinski").focus();
    }
});

//////////////////////////////////////////
// Non-required Felder als valid markieren
//////////////////////////////////////////
const titel = document.getElementById("titel");
const adresszusatz = document.getElementById("adresszusatz");
const telefon = document.getElementById("telefon");

titel.addEventListener("input", () => {
    if (titel.value !== "") {
        titel.className = "valid";
    } else if (titel.value === "") {
        titel.className = "";
    }
});

adresszusatz.addEventListener("input", () => {
    if (adresszusatz.value !== "") {
        adresszusatz.className = "valid";
    } else if (adresszusatz.value == "") {
        adresszusatz.className = "";
    }
});

telefon.addEventListener("input", () => {
    if (telefon.value !== "") {
        telefon.className = "valid";
    } else if (telefon.value == "") {
        telefon.className = "";
    }
});

/////////////////////
// SendMail Funktion
/////////////////////
function sendMail () {
    event.preventDefault();

    ////////////////////////////////////////////
    // Loading Layer über Formular
    ////////////////////////////////////////////
    const loadingLayer = document.getElementById("loaderScreen");
    loadingLayer.removeAttribute("hidden");

    ////////////////////////////////////////////
    // Parameter und Variablen definieren
    ////////////////////////////////////////////
    sportartCheckboxes = document.getElementsByClassName("sportart-checkbox");
    for (var i = 0; i < sportartCheckboxes.length; i++) {
        if (sportartCheckboxes[i].checked == true){
            sportartenSelected += sportartCheckboxes[i].id + " ";
        }
    }

    parameters = {
        anrede: document.getElementById("anrede").value,
        titel: document.getElementById("titel").value,
        vorname: document.getElementById("vorname").value,
        nachname: document.getElementById("nachname").value,
        email: document.getElementById("email").value,
        strasse: document.getElementById("strasse").value,
        hausnummer: document.getElementById("hausnummer").value,
        adresszusatz: document.getElementById("adresszusatz").value,
        plz: document.getElementById("plz").value,
        ort: document.getElementById("ort").value,
        land: document.getElementById("land").value,
        telefon: document.getElementById("telefon").value,
        tag: document.getElementById("tag").value,
        monat: document.getElementById("monat").value,
        jahr: document.getElementById("jahr").value,
        geburtsdatum: "",
        sportarten: sportartenSelected,
        kundenkarte: document.getElementById("kundenkarte").value,
    };

    parameters.geburtsdatum = parameters.jahr + "-" + parameters.monat + "-" + parameters.tag;
    // Nicht mehr notwendig, wenn Geburtstag 3-geteilt:
    // var geburtsdatumSplit = parameters.geburtsdatum.split("-");
    // parameters.jahr = geburtsdatumSplit[0];
    // parameters.monat = geburtsdatumSplit[1];
    // parameters.tag = geburtsdatumSplit[2];

    switch (parameters.anrede) {
        case "Herr": geschlecht = "männlich";
            break;
        case "Frau": geschlecht = "weiblich";
            break;
        case "divers": geschlecht = "divers";
            break;
        case "Familie": geschlecht = "Familie";
            break;
        case "Firma": geschlecht = "Firma";
            break;
        case "Verein": geschlecht = "Verein";
            break;
        default: geschlecht = "";
    }

    switch (parameters.anrede) {
        case "Familie": 
        case "Firma":
        case "Verein":
            parameters.anzeigename = parameters.vorname + " " + parameters.nachname;
            break;
        default:
            parameters.anzeigename = parameters.vorname;
    }

    parameters.optin = document.getElementById("optin").checked;
    console.log(parameters);
    console.log("Opt-In:" + parameters.optin);

    ////////////////////////////////////////////
    // EmailJS trigger
    ////////////////////////////////////////////
    var responseStatusAnmeldung = "";
    var responseStatusConfirmation = "";
    var responseStatusCleverReach = "";

    var serviceId = "service_vawz19v";

    // Anmeldung an Büro
    const templateId2 = "template_5ea91pp";
    emailjs.send(serviceId, templateId2, parameters)
    .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        if (response.status === 200) {
            responseStatusAnmeldung = response.status;
            console.log("Response-Status Anmeldung: " + responseStatusAnmeldung);
            openSuccess();
            }
         },
        function (error) {
            console.log("Failed", error);
        }
    );
    
    // Bestätigung an Kunden
    const templateId1 = "template_cjv4nfe";
    emailjs.send(serviceId, templateId1, parameters)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            if (response.status === 200) {
                responseStatusConfirmation = response.status;
                console.log("Response-Status Confirmation: " + responseStatusConfirmation);
                openSuccess();
            }},
            function (error) {
                console.log("Failed", error);
            }
        );

    ////////////////////////////////////////////
    // Bei Opt-in CleverReach Funktion ausführen 
    ////////////////////////////////////////////
    if (parameters.optin) {
        console.log("Send to CleverReach");
        sendCleverReachData();
    };

    ////////////////////////////////////
    // Parameter an Success URL anhängen
    ////////////////////////////////////
    var sucessUrl = "success.html" + "?email=" + parameters.email + "&vorname=" + parameters.vorname + "&nachname=" + parameters.nachname + "&anrede=" + parameters.anrede + "&geschlecht=" + geschlecht 
    + "&titel=" + parameters.titel + "&plz=" + parameters.plz + "&ort=" + parameters.ort + "&land=" + parameters.land + "&tag=" + parameters.tag + "&monat=" + parameters.monat + "&jahr=" + parameters.jahr
    + "&sportarten=" + sportartenSelected + "&optin=" + parameters.optin;

    ///////////////////////////
    // Leeren der Input-Felder 
    ///////////////////////////
    document.getElementById("anrede").value = "";
    document.getElementById("titel").value = "";
    document.getElementById("titel").className = "";
    document.getElementById("vorname").value = "";
    document.getElementById("nachname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("optin").checked = false;
    document.getElementById("optout").checked = false;
    document.getElementById("strasse").value = "";
    document.getElementById("hausnummer").value = "";
    document.getElementById("adresszusatz").value = "";
    document.getElementById("adresszusatz").className = "";
    document.getElementById("plz").value = "";
    document.getElementById("ort").value = "";
    document.getElementById("land").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("telefon").className = "";
    document.getElementById("tag").value = "";
    document.getElementById("tag").className = "";
    document.getElementById("monat").value = "";
    document.getElementById("monat").className = "";
    document.getElementById("jahr").value = "";
    document.getElementById("jahr").className = "";
    document.getElementById("kundenkarte").value = "";
    for (var i = 0; i < sportartCheckboxes.length; i++) {
        sportartCheckboxes[i].checked = false;
    }
    sportartenSelected = "";
    document.getElementById("consent").checked = false;
    document.getElementById("formButton").className = "";

    ///////////////////////////////////////////////////////////////////////
    // Öffnen der Success Page nach Absenden (inkl URl Parameter für Email)
    ///////////////////////////////////////////////////////////////////////
    
    function openSuccess () {
        if (responseStatusAnmeldung === 200 && responseStatusConfirmation === 200) {
            console.log("Beide Statusmeldungen positiv");
            var newWindow = window.open("", "_self");
            newWindow.location.href = sucessUrl;
        }}
};

/////////////////////////////////////////////
// Funktion: Daten an CleverReach übermitteln
/////////////////////////////////////////////
function sendCleverReachData() {  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Antwort des Servers erfolgreich empfangen
        console.log(this.responseText);
        responseStatusCleverReach = 200;
    }
    };
    xhttp.open("POST", "https://eu.cleverreach.com/f/34217-168874/wcs/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var email = document.getElementById("email").value;
    var data = "email=" + email + "&250470=" + parameters.vorname + "&250471=" + parameters.nachname + "&264138=" + parameters.anrede + "&250768=" + geschlecht + "&264139=" + parameters.titel + "&258000=" + parameters.plz
        + "&258001=" + parameters.ort + "&258002=" + parameters.land + "&250767[day]=" + parameters.tag + "&250767[month]=" + parameters.monat + "&250767[year]=" + parameters.jahr + "&258005=" + sportartenSelected + "&258004=" + "Online-Anmeldung";
    xhttp.send(data);
    console.log(data);
}


/////////////////////////////////////////////
// Collapse Funktion
/////////////////////////////////////////////
function collapseElement (elementId) {
    document.getElementById(elementId).className = "collapse";
}

function uncollapseElement (elementId) {
    document.getElementById(elementId).className = "uncollapse";
}
  