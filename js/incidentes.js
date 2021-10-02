const dbref = firebase.database(); //.ref().child('incidentes');
const user = 'rbalbis2001@gmail.com';
const key = '123456';

function loadIncidents() {
  let index = 0;
  firebase
    .auth()
    .signInWithEmailAndPassword(user, key)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      // ...
      var starCountRef = dbref.ref().child('incidentes');
      starCountRef.on('value', snapshot => {
        document.getElementById('alerts__list').innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
          index++;
          var childData = childSnapshot.val();
          console.log('data', childData);
          showList(childData, index);
        });
      });
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error ' + errorCode + ' ' + errorMessage);
    });
}

function showList(data, index) {
  document.getElementById(
    'alerts__list',
  ).innerHTML += `<li class="alerts__list-items">
        <a class="alerts__list-link" href="#" id="alert${index}" data-id="${data.uid}">
            <span class="alerts__list-date">${data.fecha}</span>
            <span class="alerts__list-hour">${data.hora}</span>
        </a>
    </li>`;
}

function loadIncidentDetail(uid) {
  firebase
    .auth()
    .signInWithEmailAndPassword(user, key)
    .then(userCredential => {
      var starCountRef = dbref.ref().child('incidentes').child(uid);
      starCountRef.on('value', snapshot => {
        let dataIncidente = snapshot.val();
        console.log(
          'data',
          dataIncidente.latitud + '-' + dataIncidente.longitud,
        );
        showDetailIncident(dataIncidente);
        /*document.getElementById("alerts__list").innerHTML = "";
                snapshot.forEach(function (childSnapshot) {
                    index++;
                    var childData = childSnapshot.val();
                    console.log("data", childData);
                    showList(childData, index);
                });*/

        destinationLocation = new google.maps.LatLng(
          dataIncidente.latitud,
          dataIncidente.longitud,
        );
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: destinationLocation,
        });

        const infowindow = new google.maps.InfoWindow({
          content: dataIncidente.titulo,
        });

        //generateMarker({ position: destinationLocation, title: 'Destination' })
        const marker = new google.maps.Marker({
          position: destinationLocation,
          map,
          title: 'Uluru (Ayers Rock)',
        });

        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      });
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error ' + errorCode + ' ' + errorMessage);
    });
}

function generateMarker({ position, title }) {
  return new google.maps.Marker({
    position,
    title,
    map,
    animation: google.maps.Animation.DROP,
  });
}

function showDetailIncident(data){
  let dataUser = getDataUser(data.usuario);
  console.log("dataUser",dataUser);
  document.getElementById('alerts-details-incident').innerHTML = '';
  document.getElementById(
    'alerts-details-incident',
  ).innerHTML =  
`
<ul class="alerts-details__list">
  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__title-key"
      >TITULO INCIDENTE:</span
    >
    <span class="alerts-details__valor alerts-details__title-valor"
      >${data.titulo}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__description-key"
      >DESCRIPCIÓN:</span
    >
    <span
      class="alerts-details__valor alerts-details__description-valor"
      >${data.descripcion}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__date-key"
      >FECHA:</span
    >
    <span class="alerts-details__valor alerts-details__date-valor"
      >${data.fecha}
    </span>
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__hour-key"
      >HORA:</span
    >
    <span class="alerts-details__valor alerts-details__hour-valor"
      >${data.hora}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__name-key"
      >NOMBRE:</span
    >
    <span class="alerts-details__valor alerts-details__name-valor"
      >Jose Miguel</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__lastname-key"
      >APELLIDO:</span
    >
    <span class="alerts-details__valor alerts-details__lastname-valor"
      >Carranza López</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__dni-key"
      >DNI:</span
    >
    <span class="alerts-details__valor alerts-details__dni-valor"
      >45563021</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__phone-key"
      >TELEFONO:</span
    >
    <span class="alerts-details__valor alerts-details__phone-valor"
      >942356412</span
    >
  </li>
</ul>`;
}

function getDataUser(uid){
  console.log("data uid",uid);
  let user;
  firebase
    .auth()
    .signInWithEmailAndPassword(user, key)
    .then(userCredential => {
      var starCountRef = dbref.ref().child('usuarios').child(uid);
      starCountRef.on('value', snapshot => {
        user = snapshot.val();
        console.log("data user",user);
      });
    });
    return user;
}
