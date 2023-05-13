////////////////////////////////
// Parameter aus URL extrahieren
////////////////////////////////
var parameters = {
    email: "",
    anrede: "",
    geschlecht: "",
    titel: "",
    vorname: "",
    nachname: "",
    plz: "",
    ort: "",
    land: "",
    tag: "",
    monat: "",
    jahr: "",
    sportarten: "",
    optin: "",
};

////////////////////////////////
// Parameter aus URL extrahieren
////////////////////////////////
(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    parameters.email = urlParams.get("email");
    parameters.anrede = urlParams.get("anrede");
    parameters.geschlecht = urlParams.get("geschlecht");
    parameters.titel = urlParams.get("titel");
    parameters.vorname = urlParams.get("vorname");
    parameters.nachname = urlParams.get("nachname");
    parameters.plz = urlParams.get("plz");
    parameters.ort = urlParams.get("ort");
    parameters.land = urlParams.get("land");
    parameters.tag = urlParams.get("tag");
    parameters.monat = urlParams.get("monat");
    parameters.jahr = urlParams.get("jahr");
    parameters.sportarten = urlParams.get("sportarten");
    parameters.optin = urlParams.get("optin");
    console.log(parameters);

    if (parameters.optin == "false") {
        console.log("kein Optin");
        insertInfomail();
    }
})();

//////////////////////////////////////////////////
// Infomail Template integrieren (wenn kein Optin)
//////////////////////////////////////////////////
function insertInfomail () {
    var infomailContent = document.getElementById("infomail-content").innerHTML;
    document.getElementById("infomail-container").innerHTML = infomailContent;
}

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
    var data = "email=" + parameters.email + "&250470=" + parameters.vorname + "&250471=" + parameters.nachname + "&264138=" + parameters.anrede + "&250768=" + parameters.geschlecht + "&264139=" + parameters.titel + "&258000=" + parameters.plz
        + "&258001=" + parameters.ort + "&258002=" + parameters.land + "&250767[day]=" + parameters.tag + "&250767[month]=" + parameters.monat + "&250767[year]=" + parameters.jahr + "&258005=" + parameters.sportarten + "&258004=" + "Online-Anmeldung-2";
    xhttp.send(data);
    console.log(data);
    (function () {
        const infomailSuccess = document.getElementById("infomail-success").innerHTML;
        document.getElementById("button-container").innerHTML = infomailSuccess;
    })();
  }
  