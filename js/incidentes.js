const dbref = firebase.database(); //.ref().child('incidentes');
const user = 'test@gmail.com';
const key = '123456';

let contActual = 0;
let cont = 0;
let cont2 = 0;
let primercont = [];
let modalNuevoIncidente = document.getElementById('staticBackdrop');
let btnNuevoIncidente = document.getElementById('btnNuevoIncidente');
let btnActivarModal = document.querySelector('.btn-activar-modal');
let mainBody = document.getElementById('main-body');
let btnCloseModal = document.querySelectorAll('.btn-close-modal');
let containerModal2 = document.querySelector('.container-modal2');
console.log(btnCloseModal);

function loadIncidents() {
  console.log(alerts);
  let index = 0;
  let ind = 0;
  firebase
    .auth()
    .signInWithEmailAndPassword(user, key)
    .then(() => {
      var starCountRef = dbref.ref().child('incidentes');
      starCountRef.on('value', snapshot => {
        snapshot.forEach(function (childSnapshot) {
          cont2++; //contador de incidencias
        });
        console.log('segundo contador: ' + cont2);
      });
    })
    .then(userCredential => {
      // Signed in
      // var user = userCredential.user;
      // ...

      var starCountRef = dbref.ref().child('incidentes');
      starCountRef.on('value', snapshot => {
        document.getElementById('alerts__list').innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
          index++;
          var childData = childSnapshot.val();
          console.log('data', childData);
          // console.log(arreglo.sort);
          showList(childData, index);
          cont++; //contador de incidencias
          // primercont[index] = cont;
        });
        console.log(`El contador actual es de: ${cont}`);
        contActual = cont;

        /* probando codigo */
        // x = {
        //   aInternal: contActual,
        //   aListener: function (val) {},
        //   set a(val) {
        //     this.aInternal = val;
        //     this.aListener(val);
        //   },
        //   get a() {
        //     return this.aInternal;
        //   },
        //   registerListener: function (listener) {
        //     this.aListener = listener;
        //   },
        // };

        // x.registerListener(function (val) {
        //   alert('Someone changed the value of x.a to ' + val);
        // });

        // x.a = contActual;
        // console.log(object);

        /* fin probando codigo */

        // console.log(childData.get.count());
        // primercont.forEach(el => {
        //   console.log(el);
        // });

        if (cont2 !== cont) {
          mainBody.classList.add('modal-open');
          modalNuevoIncidente.classList.add('show');
          modalNuevoIncidente.style.display = 'block';
        }

        // if (cont2 - cont > cont) {
        //   console.log('se elimino un elemento de incidencias');
        //   // break;
        // }

        // console.log(`El contador actual es de: ${contActual}`);
        // console.log(`este es el array contador ${primercont[0]}`);
        // if (cont2 !== cont) {

        cont = 0; //volver el contador de incidencias a 0 para volver a contar con la actuailzacion
      });
    })

    // .then(() => {
    //   if (change.after.exists()) {
    //     console.log(cont2);
    //     console.log(cont);
    //     mainBody.classList.add('modal-open');
    //     modalNuevoIncidente.classList.add('show');
    //     modalNuevoIncidente.style.display = 'block';
    //   }
    // })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error ' + errorCode + ' ' + errorMessage);
    });
}

//Configuracion de boton CERRAR de modal aviso nuevo incidente
btnCloseModal.forEach(el => {
  el.addEventListener('click', () => {
    // modalNuevoIncidente.classList.remove('show');
    // mainBody.classList.remove('modal-open');
    // containerModal2.style.display = 'hide';
    document.location.reload();
  });
});
//FIN Configuracion de boton CERRAR de modal aviso nuevo incidente

// Funcion para convertir el tiempo de 24 a 12 horas
let tConvert = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};
// FIN Funcion para convertir el tiempo de 24 a 12 horas

function showList(data, index) {
  let hour = tConvert(data.hora);
  document.getElementById(
    'alerts__list',
  ).innerHTML += `<li class="alerts__list-items">
        <a class="alerts__list-link" href="#" id="alert${index}" data-id="${data.uid}">
            <span class="alerts__list-date">${data.fecha}</span>
            <span class="alerts__list-hour">${hour}</span>
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

        //showDetailIncident(dataIncidente);
        getDataUser(dataIncidente.usuario, dataIncidente);

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

function showDetailIncident(dataIncidente, dataUsuario) {
  //let dataUser = getDataUser(data.usuario);
  //console.log("dataUser", JSON.stringify(dataUser));
  document.getElementById('alerts-details-incident').innerHTML = '';
  document.getElementById('alerts-details-incident').innerHTML = `
<ul class="alerts-details__list">
  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__title-key"
      >TITULO INCIDENTE:</span
    >
    <span class="alerts-details__valor alerts-details__title-valor"
      >${dataIncidente.titulo}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__description-key"
      >DESCRIPCIÓN:</span
    >
    <span
      class="alerts-details__valor alerts-details__description-valor"
      >${dataIncidente.descripcion}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__date-key"
      >FECHA:</span
    >
    <span class="alerts-details__valor alerts-details__date-valor"
      >${dataIncidente.fecha}
    </span>
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__hour-key"
      >HORA:</span
    >
    <span class="alerts-details__valor alerts-details__hour-valor"
      >${dataIncidente.hora}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__name-key"
      >NOMBRE:</span
    >
    <span class="alerts-details__valor alerts-details__name-valor"
      >${dataUsuario.nombres}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__lastname-key"
      >APELLIDO:</span
    >
    <span class="alerts-details__valor alerts-details__lastname-valor"
      >${dataUsuario.apellidos}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__dni-key"
      >DNI:</span
    >
    <span class="alerts-details__valor alerts-details__dni-valor"
      >${dataUsuario.numerodocumento}</span
    >
  </li>

  <li class="alerts-details__item">
    <span class="alerts-details__key alerts-details__phone-key"
      >TELEFONO:</span
    >
    <span class="alerts-details__valor alerts-details__phone-valor"
      >${dataUsuario.telefono}</span
    >
  </li>
</ul>`;
}

function getDataUser(uid, data) {
  //console.log("data uid", uid);
  let user;

  var starCountRef = firebase.database().ref('usuarios').child(uid);
  starCountRef.on('value', snapshot => {
    user = snapshot.val();
    showDetailIncident(data, user);
    //console.log("getDataUser", user);
  });
  //return user;
}
