// let alertsDetails = document.querySelector('.alerts-details');
$(document).ready(function () {
  // Your web app's Firebase configuration
  /*const config = {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: 'AIzaSyAIrdUu3y_qrLh7oQQai6mEqX0HfXzaLbc',
    authDomain: 'alertaciudadana-50dd3.firebaseapp.com',
    databaseURL: 'https://alertaciudadana-50dd3-default-rtdb.firebaseio.com',
    projectId: 'alertaciudadana-50dd3',
    storageBucket: 'alertaciudadana-50dd3.appspot.com',
    messagingSenderId: '277260721203',
    appId: '1:277260721203:web:f0b1b96d708699e855d746',
    measurementId: 'G-PCWKNEMW0M',
  };

  // Initialize Firebase
  firebase.initializeApp(config);*/

  let filaEliminada; //para capturara la fila eliminada
  let filaEditada; //para capturara la fila editada o actualizada
  let filaSeleccionada; //para capturara la fila para ver detalle

  //creamos constantes para los iconos detalle, editar y borrar
  const iconoDetalle =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path></svg>';

  const iconoEditar =
    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar =
    '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

  const db = firebase.database();
  coleccionIncidencias = db.ref().child('incidentes');

  var dataSet = []; //array para guardar los valores de los campos inputs del form

  var table = $('#tablaIncidencias').DataTable({
    /* colocando elementos de la tabla en español */
    language: {
      decimal: '',
      emptyTable: 'No hay información',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
      infoEmpty: 'Mostrando 0 to 0 of 0 Entradas',
      infoFiltered: '(Filtrado de _MAX_ total entradas)',
      infoPostFix: '',
      thousands: ',',
      lengthMenu: 'Mostrar _MENU_ Entradas',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar:',
      zeroRecords: 'Sin resultados encontrados',
      paginate: {
        first: 'Primero',
        last: 'Ultimo',
        next: 'Siguiente',
        previous: 'Anterior',
      },
    },

    /* columna que oculto y botones que irán por defecto en la ultima columna */
    data: dataSet,
    columnDefs: [
      {
        targets: [0],
        visible: false, //ocultamos la columna de ID que es la [0]
      },
      {
        targets: -1,
        defaultContent:
          "<div class='wrapper text-center'><div class='btn-group'><button class='btnDetalle btn btn-warning' data-toggle='tooltip' title='Ver Detalle'>" +
          iconoDetalle,
        // +
        // "</button><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" +
        // iconoEditar +
        // "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" +
        // iconoBorrar +
        // '</button></div></div>',
      },
    ],

    dom: 'Blfrtip',
    /* paginación de la tabla */
    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, 'Todos'],
    ],

    /* ***************************** INICIO CONFIGURACION BOTON EXCEL****************************************** */
    buttons: {
      dom: {
        button: {
          className: 'btn',
        },
      },
      buttons: [
        {
          //definimos estilos del boton de excel
          extend: 'excelHtml5',
          text: 'Reporte Excel',
          className: 'btn btn-outline-success',

          //defino que columnas quiero que se vean
          exportOptions: {
            columns: [1, 2, 3],
          },

          //definimos los parametros al exportar a excel

          // excelStyles: {
          //   template: ['blue_medium3', 'header_green', 'title_medium'],
          // },

          // ejemplo para IMPRIMIR

          pageStyle: {
            sheetPr: {
              pageSetUpPr: {
                fitToPage: 1, // Fit the printing to the page
              },
            },
            printOptions: {
              horizontalCentered: true,
              verticalCentered: true,
            },
            pageSetup: {
              orientation: 'landscape', // Orientacion
              paperSize: '9', // Tamaño del papel (1 = Legal, 9 = A4)
              fitToWidth: '1', // Ajustar al ancho de la página
              fitToHeight: '0', // Ajustar al alto de la página
            },
            pageMargins: {
              left: '0.2',
              right: '0.2',
              top: '0.4',
              bottom: '0.4',
              header: '0',
              footer: '0',
            },
            repeatHeading: true, // Repeat the heading row at the top of each page
            repeatCol: 'A:A', // Repeat column A (for pages wider than a single printed page)
          },
        },
      ],
    },
    /* ***************************** FIN CONFIGURACION BOTON EXCEL *********************************** */
  });

  //Eventos de FIREBASE

  //Luego de un ALTA motramos lo datos en datatables
  //CHILD_ADDED - evento para agregar hijo a la base
  coleccionIncidencias.on('child_added', datos => {
    // console.log(datos); //mostramos todos los datos de la coleccion desde firebase
    // console.log(datos.key); //mostramos las claves (los IDs autogenerados desde firebase)
    dataSet = [
      datos.key,
      datos.child('titulo').val(),
      datos.child('fecha').val(),
      datos.child('hora').val(),
      // datos.child('correo').val(),
      // datos.child('clave').val(),
      // datos.child('direccion').val(),
      // datos.child('telefono').val(),
      // datos.child('fechanac').val(),
    ];
    table.rows.add([dataSet]).draw();
  });

  //CHILD_CHANGED - evento para modificar o actualizar hijo a la base-NO SE IMPLEMENTA EN ESTA TABLA
  //luego de EDITAR mostramos los datos
  coleccionIncidencias.on('child_changed', datos => {
    dataSet = [
      datos.key,
      datos.child('titulo').val(),
      datos.child('fecha').val(),
      datos.child('hora').val(),
      // datos.child('correo').val(),
      // datos.child('clave').val(),
      // datos.child('direccion').val(),
      // datos.child('telefono').val(),
      // datos.child('fechanac').val(),
    ];
    table.row(filaEditada).data(dataSet).draw();
  });

  //CHILD_REMOVED - evento para eliminar hijo a la base
  //luego de BORRAR eliminamos del front-end la fila

  coleccionIncidencias.on('child_removed', function () {
    table.row(filaEliminada.parents('tr')).remove().draw();
  });

  //--- Formulario de ALTA Y EDICION ---//
  $('form').submit(function (e) {
    e.preventDefault(); //Evitamos el envio del submit
    let id = $.trim($('#id').val());
    let titulo = $.trim($('#titulo').val());
    let fecha = $.trim($('#fecha').val());
    let hora = $.trim($('#hora').val());
    // let email = $.trim($('#email').val());
    // let password = $.trim($('#password').val());
    // let telefono = $.trim($('#telefono').val());
    // let direccion = $.trim($('#direccion').val());
    // let fecnac = $.trim($('#fecnac').val());
    // let imagen = '';
    // let sexo = $.trim($('#sexo').val());
    // let tipoAcceso = '';
    // let host = '1'; //1 -> web

    let idFirebase = id;
    if (idFirebase == '') {
      idFirebase = coleccionIncidencias.push().key;
    }

    data = {
      titulo: titulo,
      fecha: fecha,
      hora: hora,
      // correo: email,
      // clave: password,
      // telefono: telefono,
      // direccion: direccion,
      // fechanac: fecnac,
      // imagen: imagen,
      // sexo: sexo,
      // tipoacceso: tipoAcceso,
      // host: host,
    };

    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    createUser(email, password);
    coleccionIncidencias.update(actualizacionData);
    id = '';
    $('form').trigger('reset'); //limpiamos los campos del formulario
    $('#modalAltaEdicion').modal('hide');
  });

  //Botones

  // En este caso NO SE AGREGARÁ NUEVAS INCIDENCIAS DESDE DASHBOARD
  $('#btnNuevo').click(function () {
    // $('#id').val('');
    // $('#titulo').val('');
    // $('#nombres').val('');
    // $('#apellidos').val('');
    // $('#email').val('');
    // $('#password').val('');
    // $('#telefono').val('');
    // $('#direccion').val('');
    // $('#fecnac').val('');
    // $('form').trigger('reset');
    // $('#modalAltaEdicion').modal('show');
  });

  // En este caso NO SE EDITARÁ EN ESTE DASHBOARD
  $('#tablaIncidencias').on('click', '.btnEditar', function () {
    // filaEditada = table.row($(this).parents('tr'));
    // let fila = $('#tablaIncidencias')
    //   .dataTable()
    //   .fnGetData($(this).closest('tr'));
    // let id = fila[0];
    // console.log(id);
    // let titulo = $(this).closest('tr').find('td:eq(0)').text();
    // let apellidos = $(this).closest('tr').find('td:eq(1)').text();
    // let nombres = $(this).closest('tr').find('td:eq(2)').text();
    // let email = $(this).closest('tr').find('td:eq(3)').text();
    // let password = $(this).closest('tr').find('td:eq(4)').text();
    // let direccion = $(this).closest('tr').find('td:eq(5)').text();
    // let telefono = $(this).closest('tr').find('td:eq(6)').text();
    // let fecnac = $(this).closest('tr').find('td:eq(7)').text();
    // $('#id').val(id);
    // $('#titulo').val(titulo);
    // $('#nombres').val(nombres);
    // $('#apellidos').val(apellidos);
    // $('#email').val(email);
    // $('#password').val(password);
    // $('#telefono').val(telefono);
    // $('#direccion').val(direccion);
    // $('#fecnac').val(fecnac);
    // $('#modalAltaEdicion').modal('show');
  });

  /* INICO PROBANDO CODIGO ********************************************** */
  const dbref = firebase.database(); //.ref().child('incidentes');
  const user = 'test@gmail.com';
  const key = '123456';

  // function loadIncidents() {
  //   console.log(alerts);
  //   let index = 0;
  //   let ind = 0;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(user, key)
  //     .then(() => {
  //       // var starCountRef = dbref.ref().child('incidentes');
  //       // console.log(starCountRef);
  //       // starCountRef.on('value', snapshot => {
  //       //   snapshot.forEach(function (childSnapshot) {
  //       //     cont2++; //contador de incidencias
  //       //   });
  //       //   console.log('segundo contador: ' + cont2);
  //       // });
  //     })
  //     .then(userCredential => {
  //       // Signed in
  //       // var user = userCredential.user;
  //       // ...
  //       // var starCountRef = dbref.ref().child('incidentes');
  //       // starCountRef.on('value', snapshot => {
  //       //   document.getElementById('alerts__list').innerHTML = '';
  //       //   snapshot.forEach(function (childSnapshot) {
  //       //     index++;
  //       //     var childData = childSnapshot.val();
  //       //     console.log('data', childData);
  //       //     // console.log(arreglo.sort);
  //       //     showList(childData, index);
  //       //     cont++; //contador de incidencias
  //       //     // primercont[index] = cont;
  //       //   });
  //       //   console.log(`El contador actual es de: ${cont}`);
  //       //   contActual = cont;
  //       //   /* probando codigo */
  //       //   // x = {
  //       //   //   aInternal: contActual,
  //       //   //   aListener: function (val) {},
  //       //   //   set a(val) {
  //       //   //     this.aInternal = val;
  //       //   //     this.aListener(val);
  //       //   //   },
  //       //   //   get a() {
  //       //   //     return this.aInternal;
  //       //   //   },
  //       //   //   registerListener: function (listener) {
  //       //   //     this.aListener = listener;
  //       //   //   },
  //       //   // };
  //       //   // x.registerListener(function (val) {
  //       //   //   alert('Someone changed the value of x.a to ' + val);
  //       //   // });
  //       //   // x.a = contActual;
  //       //   // console.log(object);
  //       //   /* fin probando codigo */
  //       //   // console.log(childData.get.count());
  //       //   // primercont.forEach(el => {
  //       //   //   console.log(el);
  //       //   // });
  //       //   if (cont2 !== cont) {
  //       //     mainBody.classList.add('modal-open');
  //       //     modalNuevoIncidente.classList.add('show');
  //       //     modalNuevoIncidente.style.display = 'block';
  //       //   }
  //       //   // if (cont2 - cont > cont) {
  //       //   //   console.log('se elimino un elemento de incidencias');
  //       //   //   // break;
  //       //   // }
  //       //   // console.log(`El contador actual es de: ${contActual}`);
  //       //   // console.log(`este es el array contador ${primercont[0]}`);
  //       //   // if (cont2 !== cont) {
  //       //   cont = 0; //volver el contador de incidencias a 0 para volver a contar con la actuailzacion
  //       // });
  //     })

  //     // .then(() => {
  //     //   if (change.after.exists()) {
  //     //     console.log(cont2);
  //     //     console.log(cont);
  //     //     mainBody.classList.add('modal-open');
  //     //     modalNuevoIncidente.classList.add('show');
  //     //     modalNuevoIncidente.style.display = 'block';
  //     //   }
  //     // })
  //     .catch(error => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.error('error ' + errorCode + ' ' + errorMessage);
  //     });
  // }

  /*  function loadIncidentDetail(uid) {
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
 */
  /*  function generateMarker({ position, title }) {
    return new google.maps.Marker({
      position,
      title,
      map,
      animation: google.maps.Animation.DROP,
    });
  } */

  /* function showDetailIncident(dataIncidente, dataUsuario) {
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
 */
  /*  function getDataUser(uid, data) {
    //console.log("data uid", uid);
    let user;

    var starCountRef = firebase.database().ref('usuarios').child(uid);
    starCountRef.on('value', snapshot => {
      user = snapshot.val();
      showDetailIncident(data, user);
      //console.log("getDataUser", user);
    });
    //return user;
  } */

  // function getDataUser(uid, data) {
  //   //console.log("data uid", uid);
  //   // let user;

  //   var starCountRef = firebase.database().ref('usuarios').child(uid);
  //   starCountRef.on('value', snapshot => {
  //     user = snapshot.val();
  //     showDetailIncident(data, user);
  //     //console.log("getDataUser", user);
  //   });
  //   //return user;
  // }

  /* FIN PROBANDO CODIGO **************************************** */

  //botom mostrar detalle
  $('#tablaIncidencias').on('click', '.btnDetalle', function () {
    filaSeleccionada = $(this); //captura la fila eliminada para pasarla al event CHILD_REMOVED
    // loadIncidents();
    tablaIncidencias.classList.add('d-none');
    alertsDetails.classList.remove('d-none');
    mapAlerts.classList.remove('d-none');
    // initMap();
    // showDetailIncident();
    // Swal.fire({
    //   title: '¿Está seguro de eliminar la incidencia?',
    //   text: '¡Está operación no se puede revertir!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Eliminar',
    // }).then(result => {
    //   if (result.value) {
    let fila = $('#tablaIncidencias')
      .dataTable()
      .fnGetData($(this).closest('tr'));
    let id = fila[0]; //capturamos el atributo ID de la fila
    loadIncidentDetail(id);

    // db.ref(`incidentes/${id}`).remove(); //eliminamos el producto de firebase
    // Swal.fire('¡Eliminado!', 'La incidencia ha sido eliminada.', 'success');
    //   }
    // });
  });
});

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      console.info(`Usuario creado correctamente ${user}`);
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`Error ${errorCode} - ${errorMessage}`);
    });
}
