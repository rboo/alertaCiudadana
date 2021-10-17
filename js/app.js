/* ********** DECLARACION DE VARIABLES *************** */
let sidebar = document.querySelector('.sidebar');
let sidebarBtn = document.querySelector('.bx-menu');

let alertHistory = document.querySelector('.alert-history');
let alerts = document.querySelector('.alerts');
let alertsDetails = document.querySelector('.alerts-details');
let mainContent = document.querySelector('.main-content');
let mapAlerts = document.querySelector('.map-alerts');
let btnCrudUsuarios = document.querySelector('#btnCrudUsuarios');
let btnCrudIncidencias = document.querySelector('#btnCrudIncidencias');
let tablaUsuarios = document.querySelector('.tabla-usuarios');
let tablaIncidencias = document.querySelector('.tabla-incidencias');
let btnLogin = document.querySelector('#btnLogin');
let btnGraficas = document.getElementById('btnGraficas');
let graficasContainer = document.querySelector('.graficasContainer'); //no se esta utilizando por ahora
let graficaIncidencias = document.querySelector('.graficaIncidencias');

/* ********** FIN DECLARACION DE VARIABLES ************* */

/* inicio probando codigo */
// alertHistory.addEventListener('click', () => {
//   let cant = $('.alerts__list li').length;
//   console.log(cant);
// });

/* let contarLista = () => {
  setTimeout(() => {
    let cant = $('.alerts__list li').length;
    console.log(cant);
  }, 10000);
}; */

/* probando este codigo */
// let cant = 0;
// const observer = new MutationObserver(mutationList => {
//   mutationList.forEach(mutation => {
//     // setTimeout(() => {
//     if (mutation.addedNodes.length) {
//       console.log('Añadido', mutation.addedNodes[0]);
//     }
//     // }, 10000);
//     //si hay algo eliminado
//     /* if (mutation.removedNodes.length) {
//       console.log('eliminado', mutation.removedNodes[0]);
//     } */
//   });
//   console.log(mutationList.length);
//   cant = mutationList.length;
//   if (mutationList.length++) {
//     console.log('se cambio la cantidad');
//   }
// });
// console.log(observer);

// // Indicar el target que deseamos escuchar u observar
// const observerOptions = {
//   // attributes: true,
//   childList: true,
//   // subtree: false,
// };
// let alertsList = document.querySelector('.alerts__list');
// observer.observe(alertsList, observerOptions);
/* fin probando codigo */

let localStorage = window.localStorage;

/** INICIO BOTON LOGIN **/
if (btnLogin !== null) {
  btnLogin.addEventListener('click', () => {
    let email = $.trim($('#dni').val());
    let password = $.trim($('#password').val());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('correcto');
        var user = userCredential.user;
        localStorage.setItem('usuario', JSON.stringify(user));
        window.location.href = 'index.html';
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Error ${errorCode} - ${errorMessage}`);
      });
  });
}
/** FIN BOTON LOGIN **/

// INICIO boton CRUD USUARIOS ************//

if (btnCrudUsuarios !== null) {
  btnCrudUsuarios.addEventListener('click', () => {
    tablaUsuarios.classList.remove('d-none');
    sidebar.classList.add('close');
    alerts.classList.add('d-none');
    alertsDetails.classList.add('d-none');
    mapAlerts.classList.add('d-none');
    tablaIncidencias.classList.add('d-none');
  });
}

/* ******* FIN BOTON CRUD USUARIOS ************ */

// INICIO boton CRUD INCIDENCIAS ************//

if (btnCrudIncidencias !== null) {
  btnCrudIncidencias.addEventListener('click', () => {
    tablaIncidencias.classList.remove('d-none');
    sidebar.classList.add('close');
    alerts.classList.add('d-none');
    alertsDetails.classList.add('d-none');
    mapAlerts.classList.add('d-none');
    tablaUsuarios.classList.add('d-none');
  });
}

/* ******* FIN BOTON CRUD INCIDENCIAS ************ */

/* ************** INICIO BOTON GRAFICAS ***************** */
if (btnGraficas !== null) {
  btnGraficas.addEventListener('click', () => {
    graficasContainer.classList.remove('d-none');
    sidebar.classList.add('close');
    alerts.classList.add('d-none');
    alertsDetails.classList.add('d-none');
    mapAlerts.classList.add('d-none');
    graficaIncidencias.classList.remove('d-none');
    console.log('hice click en graficas');
  });
}
Chart.defaults.font.size = 20;
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [10, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        // fontSize: 40,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/* ************** FIN BOTON GRAFICAS ***************** */

let arrow = document.querySelectorAll('.arrow');
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener('click', e => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle('showMenu');
  });
}

if (sidebar !== null || sidebarBtn !== null) {
  // console.log(sidebarBtn);
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    // mainContent.classList.toggle('max-w80');
  });
}

/************  incio BOTON HISTORIAL ALERTAS **********************/
if (alertHistory != null) {
  alertHistory.addEventListener('click', () => {
    alerts.classList.remove('d-none');
    // alerts.classList.toggle('left-none');
    alerts.classList.add('left-none');
    sidebar.classList.toggle('close');
    // mainContent.classList.toggle('max-w80');
    alertsDetails.classList.add('d-none');
    mapAlerts.classList.add('d-none');
    tablaUsuarios.classList.add('d-none');
    tablaIncidencias.classList.add('d-none');
  });
}

/**************** FIN BOTON HISTORIAL ALERTAS **********************/
// let botonRecargar = document.getElementById('boton-recargar');
// botonRecargar.addEventListener('click', () => {
//   location.reload();
// });

// let alertElements = document.querySelectorAll('.alerts__list-link');
// let alertDetails = document.querySelector('.alerts-details');
// let mapAlert = document.querySelector('.map-alerts');
// let id1 = document.getElementById('alert1');
// // console.log(alertDetails);
// for (let i = 0; i < alertElements.length; i++) {
//   alertElements[i].addEventListener('click', e => {
//     console.log('hice click en un elemento');
//     if (alertDetails.classList.contains('d-none')) {
//       alertDetails.classList.toggle('d-none');
//       //mapAlert.classList.toggle('d-none');
//     } else {
//       console.log('ya se esta mostrando');
//     }
//   });
// }

/* ******** CODIGO DE LOGIN ************************** */

/* let dni = document.querySelector('#dni');
let password = document.querySelector('#password');

if (dni != null) {
  dni.addEventListener('blur', () => {
    let labelDni = document.querySelector('.label-dni');
    if (dni.value.length === 0) {
      labelDni.classList.remove('label-selecionada');
    } else {
      labelDni.classList.add('label-selecionada');
    }
  });
}

if (password !== null) {
  password.addEventListener('blur', () => {
    let labelPassword = document.querySelector('.label-password');
    if (password.value.length === 0) {
      labelPassword.classList.remove('label-selecionada');
    } else {
      labelPassword.classList.add('label-selecionada');
    }
  });
} */

//CODIGO PARA SOLO ACEPTAR NÚMEROS EN INPUT DNI
/*if (dni !== null) {
  dni.addEventListener('keypress', e => {
    if (!soloNumeros(e)) {
      e.preventDefault();
    }
  });
  //Solo permite introducir numeros.
  function soloNumeros(e) {
    var key = e.charCode;
    return key >= 48 && key <= 57;
  }
}*/

/* ************** FIN CODIGO DE LOGIN ********************** */

/* ************ INICIO CODIGO TABLA CRUD USUARIOS **************** */
/*$(document).ready(function () {
  // // Your web app's Firebase configuration
  // const config = {
  //   // Your web app's Firebase configuration
  //   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  //   apiKey: 'AIzaSyAIrdUu3y_qrLh7oQQai6mEqX0HfXzaLbc',
  //   authDomain: 'alertaciudadana-50dd3.firebaseapp.com',
  //   databaseURL: 'https://alertaciudadana-50dd3-default-rtdb.firebaseio.com',
  //   projectId: 'alertaciudadana-50dd3',
  //   storageBucket: 'alertaciudadana-50dd3.appspot.com',
  //   messagingSenderId: '277260721203',
  //   appId: '1:277260721203:web:f0b1b96d708699e855d746',
  //   measurementId: 'G-PCWKNEMW0M',
  // };

  // Initialize Firebase
  // firebase.initializeApp(config);

  var filaEliminada; //para capturara la fila eliminada
  var filaEditada; //para capturara la fila editada o actualizada

  //creamos constantes para los iconos editar y borrar
  const iconoEditar =
    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
  const iconoBorrar =
    '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

  const db = firebase.database();
  coleccionUsuarios = db.ref().child('usuarios');

  var dataSet = []; //array para guardar los valores de los campos inputs del form

  var table = $('#tablaUsuarios').DataTable({
    pageLength: 5,
    lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, 'Todos'],
    ],
    data: dataSet,
    columnDefs: [
      {
        targets: [0],
        visible: false, //ocultamos la columna de ID que es la [0]
      },
      {
        targets: -1,
        defaultContent:
          "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" +
          iconoEditar +
          "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" +
          iconoBorrar +
          '</button></div></div>',
      },
    ],
  });

  //Eventos de FIREBASE

  //Luego de un ALTA motramos lo datos en datatables
  //CHILD_ADDED - evento para agregar hijo a la base
  coleccionUsuarios.on('child_added', datos => {
    // console.log(datos); //mostramos todos los datos de la coleccion desde firebase
    // console.log(datos.key); //mostramos las claves (los IDs autogenerados desde firebase)
    dataSet = [
      datos.key,
      datos.child('numerodocumento').val(),
      datos.child('apellidos').val(),
      datos.child('nombres').val(),
      datos.child('correo').val(),
      datos.child('clave').val(),
      datos.child('direccion').val(),
      datos.child('telefono').val(),
      datos.child('fechanac').val(),
    ];
    table.rows.add([dataSet]).draw();
  });

  //CHILD_CHANGED - evento para modificar o actualizar hijo a la base
  //luego de EDITAR mostramos los datos
  coleccionUsuarios.on('child_changed', datos => {
    dataSet = [
      datos.key,
      datos.child('numerodocumento').val(),
      datos.child('apellidos').val(),
      datos.child('nombres').val(),
      datos.child('correo').val(),
      datos.child('clave').val(),
      datos.child('direccion').val(),
      datos.child('telefono').val(),
      datos.child('fechanac').val(),
    ];
    table.row(filaEditada).data(dataSet).draw();
  });

  //CHILD_REMOVED - evento para eliminar hijo a la base
  //luego de BORRAR eliminamos del front-end la fila

  coleccionUsuarios.on('child_removed', function () {
    table.row(filaEliminada.parents('tr')).remove().draw();
  });

  //--- Formulario de ALTA Y EDICION ---//
  $('form').submit(function (e) {
    e.preventDefault(); //Evitamos el envio del submit
    let id = $.trim($('#id').val());
    let dni = $.trim($('#dni').val());
    let nombres = $.trim($('#nombres').val());
    let apellidos = $.trim($('#apellidos').val());
    let email = $.trim($('#email').val());
    let password = $.trim($('#password').val());
    let telefono = $.trim($('#telefono').val());
    let direccion = $.trim($('#direccion').val());
    let fecnac = $.trim($('#fecnac').val());
    let imagen = '';
    let sexo = $.trim($('#sexo').val());
    let tipoAcceso = '';

    let idFirebase = id;
    if (idFirebase == '') {
      idFirebase = coleccionUsuarios.push().key;
    }

    data = {
      numerodocumento: dni,
      nombres: nombres,
      apellidos: apellidos,
      correo: email,
      clave: password,
      telefono: telefono,
      direccion: direccion,
      fechanac: fecnac,
      imagen: imagen,
      sexo: sexo,
      tipoacceso: tipoAcceso,
    };

    actualizacionData = {};
    actualizacionData[`/${idFirebase}`] = data;
    coleccionUsuarios.update(actualizacionData);
    id = '';
    $('form').trigger('reset'); //limpiamos los campos del formulario
    $('#modalAltaEdicion').modal('hide');
  });

  //Botones
  $('#btnNuevo').click(function () {
    $('#id').val('');
    $('#dni').val('');
    $('#nombres').val('');
    $('#apellidos').val('');
    $('#email').val('');
    $('#password').val('');
    $('#telefono').val('');
    $('#direccion').val('');
    $('#fecnac').val('');
    $('form').trigger('reset');
    $('#modalAltaEdicion').modal('show');
  });

  $('#tablaUsuarios').on('click', '.btnEditar', function () {
    filaEditada = table.row($(this).parents('tr'));
    let fila = $('#tablaUsuarios').dataTable().fnGetData($(this).closest('tr'));
    let id = fila[0];
    console.log(id);
    let dni = $(this).closest('tr').find('td:eq(0)').text();
    let apellidos = $(this).closest('tr').find('td:eq(1)').text();
    let nombres = $(this).closest('tr').find('td:eq(2)').text();
    let email = $(this).closest('tr').find('td:eq(3)').text();
    let password = $(this).closest('tr').find('td:eq(4)').text();
    let direccion = $(this).closest('tr').find('td:eq(5)').text();
    let telefono = $(this).closest('tr').find('td:eq(6)').text();
    let fecnac = $(this).closest('tr').find('td:eq(7)').text();
    $('#id').val(id);
    $('#dni').val(dni);
    $('#nombres').val(nombres);
    $('#apellidos').val(apellidos);
    $('#email').val(email);
    $('#password').val(password);
    $('#telefono').val(telefono);
    $('#direccion').val(direccion);
    $('#fecnac').val(fecnac);
    $('#modalAltaEdicion').modal('show');
  });

  $('#tablaUsuarios').on('click', '.btnBorrar', function () {
    filaEliminada = $(this); //captura la fila eliminada para pasarla al event CHILD_REMOVED
    Swal.fire({
      title: '¿Está seguro de eliminar al usuario?',
      text: '¡Está operación no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then(result => {
      if (result.value) {
        let fila = $('#tablaUsuarios')
          .dataTable()
          .fnGetData($(this).closest('tr'));
        let id = fila[0]; //capturamos el atributo ID de la fila
        db.ref(`usuarios/${id}`).remove(); //eliminamos el producto de firebase
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  });
});*/
/* ************ FIN CODIGO CRUD USUARIOS ******************** */

/* probando codigo */
