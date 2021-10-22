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
        targets: [0, 5],
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
            columns: [1, 2, 3, 4, 6, 7, 8, 9, 10],
          },

          //definimos los parametros al exportar a excel

          excelStyles: {
            template: ['blue_medium', 'header_green', 'title_medium'],
          },

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
  coleccionUsuarios.on('child_added', datos => {
    // console.log(datos); //mostramos todos los datos de la coleccion desde firebase
    // console.log(datos.key); //mostramos las claves (los IDs autogenerados desde firebase)
    let tipoUsuario;
    if (datos.child('tipoacceso').val() === '1') {
      tipoUsuario = 'Serenazgo';
    } else {
      tipoUsuario = 'Ciudadano';
    }

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
      datos.child('sexo').val(),
      tipoUsuario,
      // datos.child('tipoacceso').val(),
    ];
    table.rows.add([dataSet]).draw();
  });

  //CHILD_CHANGED - evento para modificar o actualizar hijo a la base
  //luego de EDITAR mostramos los datos
  coleccionUsuarios.on('child_changed', datos => {
    // if (datos.child('tipoacceso').val() == '1') {
    //   tipoUsuario = 'Serenazgo';
    // } else {
    //   tipoUsuario = 'Ciudadano';
    // }
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
      datos.child('sexo').val(),
      datos.child('tipoacceso').val(),
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
    let tipoAcceso = $.trim($('#tipo-usuario').val());
    let sexo = $.trim($('#sexo').val());
    let host = '1'; //1 -> web

    let idFirebase = id;
    if (idFirebase == '') {
      createUser(email, password);
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
      host: host,
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
    // console.log(id);
    let dni = $(this).closest('tr').find('td:eq(0)').text();
    let apellidos = $(this).closest('tr').find('td:eq(1)').text();
    let nombres = $(this).closest('tr').find('td:eq(2)').text();
    let email = $(this).closest('tr').find('td:eq(3)').text();
    // let password = $(this).closest('tr').find('td:eq(4)').text();
    let password = fila[5];
    let direccion = $(this).closest('tr').find('td:eq(4)').text();
    let telefono = $(this).closest('tr').find('td:eq(5)').text();
    let fecnac = $(this).closest('tr').find('td:eq(6)').text();
    let sexo = $(this).closest('tr').find('td:eq(7)').text();
    let tipoUsuario = $(this).closest('tr').find('td:eq(8)').text();
    $('#id').val(id);
    $('#dni').val(dni);
    $('#nombres').val(nombres);
    $('#apellidos').val(apellidos);
    $('#email').val(email);
    $('#password').val(password);
    $('#telefono').val(telefono);
    $('#direccion').val(direccion);
    $('#fecnac').val(fecnac);
    $('#sexo').val(sexo);
    if (tipoUsuario == 'Ciudadano') {
      $('#tipo-usuario').val('2');
    } else {
      $('#tipo-usuario').val('1');
    }

    // $('#tipo-usuario').val(tipoUsuario);
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
