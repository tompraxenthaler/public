var htmlForm = document.getElementById("htmlForm");
var formButton = document.getElementById("formButton");
var parameters = {
    anrede: "",
    titel: "",
    vorname: "",
    nachname: "",
    email: "",
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
};
var geschlecht = "";
var optin = "";
var sportartCheckboxes = "";
var sportartenSelected = "";

/////////////////////////////////////////////////
// Bei Input Validität prüfen & Button aktivieren
/////////////////////////////////////////////////
htmlForm.addEventListener("input", () => {
    if (htmlForm.checkValidity()) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
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
            break;
    }
});

/////////////////////
// SendMail Funktion
/////////////////////
function sendMail () {
    event.preventDefault();

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
        geburtsdatum: document.getElementById("geburtstag").value,
        tag: "",
        monat: "",
        jahr: "",
        sportarten: sportartenSelected,
    };
    var geburtsdatumSplit = parameters.geburtsdatum.split("-");
    parameters.jahr = geburtsdatumSplit[0];
    parameters.monat = geburtsdatumSplit[1];
    parameters.tag = geburtsdatumSplit[2];

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

    console.log(parameters);
    console.log(parameters.vorname);
    optin = document.getElementById("optin");
    console.log("Opt-In:" + optin.checked);

    ////////////////////////////////////////////
    // EmailJS trigger
    ////////////////////////////////////////////

    // Bestätigung an Kunden
    const serviceId1 = "service_vawz19v";
    const templateId1 = "template_cjv4nfe";
    const publicKey1 = "shonANTuR2xK5mQ0Q";

    emailjs.send(serviceId1, templateId1, parameters)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            // document.getElementById("vorname").value = "";
            // document.getElementById("nachname").value = "";
            // document.getElementById("email").value = "";
            // console.log(res);
            // alert("message sent successfully");
        },
        function (error) {
            console.log("Failed", error);
        }
        );
    
    // Anmeldung an Büro
    const serviceId2 = "service_vawz19v";
    const templateId2 = "template_5ea91pp";
    const publicKey2 = "shonANTuR2xK5mQ0Q";

    emailjs.send(serviceId2, templateId2, parameters)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            // document.getElementById("vorname").value = "";
            // document.getElementById("nachname").value = "";
            // document.getElementById("email").value = "";
            // console.log(res);
            // alert("message sent successfully");
        },
        function (error) {
            console.log("Failed", error);
        }
        );

    ////////////////////////////////////////////
    // Bei Opt-in CleverReach Funktion ausführen 
    ////////////////////////////////////////////
    if (optin.checked) {
        console.log("Post CleverReach");
        sendCleverReachData();
    };

    ////////////////////////////////////
    // Parameter an Success URL anhängen
    ////////////////////////////////////
    var sucessUrl = "success.html" + "?email=" + parameters.email + "&vorname=" + parameters.vorname + "&nachname=" + parameters.nachname + "&anrede=" + parameters.anrede + "&geschlecht=" + geschlecht 
    + "&titel=" + parameters.titel + "&plz=" + parameters.plz + "&ort=" + parameters.ort + "&land=" + parameters.land + "&tag=" + parameters.tag + "&monat=" + parameters.monat + "&jahr=" + parameters.jahr
    + "&sportarten=" + sportartenSelected + "&optin=" + optin.checked;

    ///////////////////////////
    // Leeren der Input-Felder 
    ///////////////////////////
    document.getElementById("anrede").value = "";
    document.getElementById("titel").value = "";
    document.getElementById("vorname").value = "";
    document.getElementById("nachname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("optin").checked = false;
    document.getElementById("strasse").value = "";
    document.getElementById("hausnummer").value = "";
    document.getElementById("adresszusatz").value = "";
    document.getElementById("plz").value = "";
    document.getElementById("ort").value = "";
    document.getElementById("land").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("geburtstag").value = "";
    for (var i = 0; i < sportartCheckboxes.length; i++) {
        sportartCheckboxes[i].checked = false;
    }
    sportartenSelected = "";
    document.getElementById("consent").checked = false;

    ///////////////////////////////////////////////////////////////////////
    // Öffnen der Success Page nach Absenden (inkl URl Parameter für Email)
    ///////////////////////////////////////////////////////////////////////
    var newWindow = window.open("", "_blank");

    newWindow.location.href = sucessUrl;
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
// Success Page Script
/////////////////////////////////////////////

function getEmail () {
    const userEmail = localStorage.getItem("email");
    console.log(userEmail);
}

function getParameters () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const vorname = urlParams.get('vorname');
    const titel = urlParams.get('titel');
    const sportarten = urlParams.get('sportarten');
    console.log(email + vorname + titel + sportarten);
}
  