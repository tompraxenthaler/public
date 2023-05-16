
function startSearch () {
    event.preventDefault();
    const ean = document.getElementById("ean").value;
    console.log("EAN: " + ean);
    getData();
}

function getData () {
  
    const requestURL = 'https://epim.zandy.de/api/v1/product/4053866556149?token=a32s4d5flllasf12fx!';

    // https://jsonplaceholder.typicode.com/users
    // fetch(requestURL, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'X-CSRF-TOKEN': ''
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Hier kannst du mit den erhaltenen Daten arbeiten
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.error('Fehler beim Abrufen der Daten:', error);
    //   });


  const xhrequest = new XMLHttpRequest();
  xhrequest.open("GET", requestURL);
  xhrequest.send();
  xhrequest.onload = () => {
    console.log(xhrequest);
    // console.log(xhrequest.responseText);
  }
}