const dbref = firebase.database(); //.ref().child('incidentes');
const user = 'test@gmail.com';
const key = '123456';

let contActual = 0;
let cont = 0;
let myaudio;

let primercont = [];
let modalNuevoIncidente = document.getElementById('staticBackdrop');
let btnNuevoIncidente = document.getElementById('btnNuevoIncidente');
let btnActivarModal = document.querySelector('.btn-activar-modal');
let mainBody = document.getElementById('main-body');
let btnCloseModal = document.querySelectorAll('.btn-close-modal');
let containerModal2 = document.querySelector('.container-modal2');
let arregloConEmailUsurios = [];
//icono flecha
let iconFlecha = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-arrow-left-circle-fill"
    viewBox="0 0 16 16"
  >
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
  </svg>`;

let iconFoto = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
</svg>`;

function loadIncidents() {
  console.log(alerts);
  let index = 0;

  firebase
    .auth()
    .signInWithEmailAndPassword(user, key)
    .then(userCredential => {
      // Signed in
      // var user = userCredential.user;
      // ...
      var starCountRef = dbref.ref().child('incidentes');
      starCountRef.on('value', snapshot => {
        document.getElementById('alerts__list').innerHTML = '';
        var list = [];
        snapshot.forEach(function (childSnapshot) {
          list.push(childSnapshot.val());
        });
        // debugger;
        list.sort(function (a, b) {
          var dat1 = new Date(formatDate(a.fecha, a.hora));
          var dat2 = new Date(formatDate(b.fecha, b.hora));
          return dat2.getTime() - dat1.getTime();
        });
        list.forEach(a => {
          cont2++;
          index++;
          //var childData = childSnapshot.val();
          console.log('data', a);
          showList(a, index);
          cont++; //contador de incidencias
          banderaEliminado = null;
        });
        console.log(`El contador actual es de: ${cont}`);
        console.log(`Este es el contador 2: ${cont2}`);
        // console.log(banderaEliminado);

        index = 0; //vuelvo el indice  a 0

        //condicion para que muestre el modal de alerta de nuevo incidente
        if (cont2 === cont + 1) {
          modalNuevoIncidente.classList.add('show');
          modalNuevoIncidente.style.display = 'block';
          myaudio = new Audio('./audio/alert.mp3');
          myaudio.volume = 1;
          myaudio.setAttribute('loop', 'loop');
          myaudio.play();
        }

        cont2 = 1;
        cont = 0; //volver el contador de incidencias a 0 para volver a contar con la actuailzacion
        addMarquer();

        /******* creamos una variable donde vamos a guardar todos los dni's de los usuarios la cual esta en la columna 4 de la tabla usuarios *********************************/
        oTable = $('#tablaUsuarios').dataTable();

        $.each(oTable.fnGetData(), function (i, row) {
          arregloConEmailUsurios.push(row[4]);
        });
        /*fin probando codigo *********************************/
      });
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error ' + errorCode + ' ' + errorMessage);
    });
}
function formatDate(date, hour) {
  var day = date.split('/')[0];
  var month = date.split('/')[1];
  var year = date.split('/')[2];
  let newDate = year + '-' + month + '-' + day + ' ' + hour;
  return newDate;
}

//Configuracion de boton CERRAR de modal aviso nuevo incidente
btnCloseModal.forEach(el => {
  el.addEventListener('click', () => {
    // mainBody.classList.remove('modal-open');
    modalNuevoIncidente.style.display = '';
    modalNuevoIncidente.classList.remove('show');
    myaudio.removeAttribute('loop');
    imagenPrincipal.classList.add('d-none');
    tablaUsuarios.classList.add('d-none');
    sidebar.classList.add('close');
    alertsDetails.classList.add('d-none');
    mapAlerts.classList.add('d-none');
    tablaIncidencias.classList.add('d-none');
    alerts.classList.add('left-none');
    alerts.classList.remove('d-none');
    leyendaAlertas.classList.remove('d-none');
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
  let hour = tConvert(data.hora); //esto convierte la hora a formato
  document.getElementById(
    'alerts__list',
  ).innerHTML += `<li class="alerts__list-items alert-type-${data.titulo}">
    <a class="alerts__list-link" href="#" id="alert${index}" data-id="${data.uid}">
    <span class="alerts__list-date">${data.fecha}</span>
    <span class="alerts__list-hour">${hour}</span>
    </a>
    </li>`;
  data = null;
  index = 0;
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
  // console.log('nameFile', dataUsuario.imagen);
  document.getElementById('alerts-details-incident').innerHTML = '';
  document.getElementById('alerts-details-incident').innerHTML = `
  
  <button class="btn-ver-lista" id="btn-ver-lista">
    <span class="icon-flecha">${iconFlecha}</span>
  </button>

  <ul class="alerts-details__list">
    <li class="alerts-details__item">
      <span class="alerts-details__key alerts-details__title-key"
      >TITULO INCIDENTE:</span
    >
    <span class="alerts-details__valor alerts-details__title-valor"
      >${dataIncidente.titulo}</span>
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

  <li class="alerts-details__item alerts-details__item-photo">
    <span class="alerts-details__key alerts-details__photo-key"
      >FOTO:</span
    >
    <a
            href="./image/imagen-no-disponible.jpg"
            class="alerts-details__valor alerts-details__photo-valor"
            data-lightbox="myGallery"
            data-title="Foto enviada por poblador."
            id="myGallery">Ver Foto</a
          >
    </a>
    <div class="iconFoto">${iconFoto}</div>
  </li>
</ul>`;
  if (
    dataIncidente.titulo !== 'Asalto o Robo' &&
    dataIncidente.titulo !== 'Sospechoso' &&
    dataIncidente.titulo !== 'Nuevo Caso de Violencia'
  ) {
    getImage(dataIncidente.imagen);
  }
}

function getDataUser(uid, data) {
  //console.log("data uid", uid);
  let user;

  var starCountRef = firebase.database().ref('usuarios').child(uid);
  starCountRef.on('value', snapshot => {
    user = snapshot.val();
    showDetailIncident(data, user);
    document.getElementById('alerts-details-incident').appendChild = `
      <button class="btn-ver-lista" id="btn-ver-lista">
        <i class="far fa-arrow-alt-circle-left icon-flecha"></i>
      </button>
    `;
    let btnVerLista = document.getElementById('btn-ver-lista');

    /************  INICIO BOTON VER LISTA DE ALERTAS **********************/
    if (btnVerLista != null) {
      btnVerLista.addEventListener('click', () => {
        // alerts.classList.toggle('left-none');
        alerts.classList.add('left-none');
        sidebar.classList.add('close');
        // mainContent.classList.toggle('max-w80');
        alertsDetails.classList.add('d-none');
        alertsDetails.style.opacity = 1;
        mapAlerts.classList.add('d-none');
        tablaUsuarios.classList.add('d-none');
        tablaIncidencias.classList.add('d-none');
        imagenPrincipal.classList.add('d-none');
        leyendaAlertas.classList.remove('d-none');
        alerts.classList.remove('d-none');
      });
    }
    /**************** FIN BOTON VER LISTA DE ALERTAS **********************/
  });
  //return user;
}

function getImage(nameFile) {
  // Create a reference with an initial file path and name
  var storage = firebase.storage();
  var storageRef = storage.ref(nameFile);
  storageRef
    .getDownloadURL()
    .then(function (url) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      var img = document.getElementById('myGallery');
      img.setAttribute('href', url);
    })
    .catch(function (error) {
      console.error('Error', error);
    });
}
