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

  var filaEditada; //para capturara la fila editada o actualizada
  let bandCorreDuplicado = false; //esta variable se utiliza en

  //creamos constantes para los iconos svg editar
  const iconoEditar =
    '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';

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
          iconoEditar,
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
          title:
            'Reporte de Usuarios de Aplicación de Alertas - Municipalidad de Chicama',
          // text: 'Reporte Excel',
          // className: 'btn btn-outline-success',
          text: '<i class="fas fa-file-excel icono-excel"></i>',
          titleAttr: 'Exportar a Excel',
          className: 'btn btn-success excelButton',
          messageBottom: 'Alcalde Julio Pérez Cabrera.',

          //defino que columnas quiero que se vean en el excel
          exportOptions: {
            columns: [1, 2, 3, 4, 6, 7, 8, 9, 10],
          },

          //definimos los parametros al exportar a excel
          excelStyles: [
            {
              template: ['blue_medium', 'header_blue', 'title_medium'],
            },
            {
              cells: '1',
              style: {
                font: {
                  size: '18',
                  b: true,
                },
              },
            },
            {
              cells: '2',
              style: {
                font: {
                  size: '13',
                  b: true,
                },
                alignment: {
                  vertical: 'center',
                  horizontal: 'center',
                },
              },
            },
            {
              cells: '3:',
              style: {
                font: {
                  size: '11',
                  b: false,
                },
                alignment: {
                  vertical: 'center',
                  horizontal: 'center',
                },
              },
            },
            {
              cells: '-0',
              style: {
                font: {
                  size: '10',
                  b: true,
                  lineHeight: 2,
                },
                alignment: {
                  vertical: 'center',
                  horizontal: 'right',
                },
              },
            },
          ],

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
              orientation: 'landscape',
            },

            pageSetup: {
              orientation: 'landscape', // Orientation
              paperSize: '9', // Paper size (9 = A4)
              fitToWidth: '1', // Fit to page width
              fitToHeight: '0', // Fit to page height
            },
            pageMargins: {
              left: '0.2',
              right: '0.2',
              top: '0.4',
              bottom: '0.4',
              header: '0',
              footer: '0',
            },

            repeatHeading: true,
            repeatCol: 'A:A',
          },
        },
        //propiedades del boton PDF
        {
          extend: 'pdfHtml5',

          //Esta funcion hace que el documento pdf vaya centrado, el valor del array puede cambiar de acuerdo a la posicion de la tabla
          customize: function (doc) {
            doc.content[1].margin = [100, 20, 0, 20]; //left, top, right, bottom
            doc.content[2].margin = [100, 0, 100, 0]; //left, top, right, bottom
          },

          text: '<i class="fas fa-file-pdf icono-pdf"></i>',
          titleAttr: 'Exportar a PDF',
          title:
            'Reporte de Usuarios de Aplicación de Alertas - Municipalidad de Chicama',
          className: 'btn btn-danger',
          orientation: 'landscape',
          footer: true,
          pageSize: 'A4',
          messageTop: 'Alcalde Julio Pérez Cabrera.',
          lengthChange: false,
          // messageBottom:
          //   'Reporte de usuarios registrados en la aplicación de alertas.',

          //defino que columnas quiero que se vean en PDF
          exportOptions: {
            columns: [1, 2, 3, 4, 6, 7, 8, 9, 10],
            modifier: {
              page: 'current',
            },
          },
        },
      ],
    },
    /* ***************************** FIN CONFIGURACION DE BOTONES *********************************** */
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

    //validando que el DNI no tengo menos de 8 caracteres
    if (dni.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'ATENCIÓN...',
        text: 'Usted esta ingresando menos de 8 dígitos en campo DNI.',
      });
      return false;
    }

    //validando que el Email no exista en la base de datos, los email's los tenemos guardados en la variable arregloConEmailUsurios la cual esta creada en incidentes.js

    arregloConEmailUsurios.forEach(element => {
      if (email === element) {
        console.log(`Antes de la comprobacion: ${bandCorreDuplicado}`);
        // console.log('Si hay un email repetido');
        bandCorreDuplicado = true;
        return console.log(
          `enviando desde el metodo que verifica: ${bandCorreDuplicado}`,
        );
      }
    });
    /* *** fin validacion DNI ****** */

    let idFirebase = id;

    if (bandCorreDuplicado === true && idFirebase == '') {
      Swal.fire({
        icon: 'error',
        title: 'ATENCIÓN...',
        text: 'Usted esta intentando registrar un usuario con un correo ya existente por favor intente el registro con un nuevo correo, Gracias.',
      });
      console.log(
        `esto es despues de mensaje correo repetido: ${bandCorreDuplicado}`,
      );
      bandCorreDuplicado = false;
      return console.log(
        `esto es despues de mensaje correo repetido de cambiar el valor: ${bandCorreDuplicado}`,
      );
    }

    //esto se ejecuta para las ACTUALIZACIONES de informacion de USUARIOS
    if (bandCorreDuplicado === true && idFirebase !== '') {
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
      // createUser(email, password);
      coleccionUsuarios.update(actualizacionData);
      idFirebase = coleccionUsuarios.push().key;
      id = '';
      $('form').trigger('reset'); //limpiamos los campos del formulario
      $('#modalAltaEdicion').modal('hide');

      /* modal de aviso de que se actualizó usuario correctamente */
      Swal.fire({
        icon: 'success',
        title: 'Datos de usuario actualizados correctamente',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });

      console.log(`Esto es despues de actualizar: ${bandCorreDuplicado}`);
      bandCorreDuplicado = false;
      return console.log(
        `Esto es despues de actualizar y hacer el cambio: ${bandCorreDuplicado}`,
      );
    }

    // si NO existe email de usuario anteorior pasa a CREAR USUARIO
    if (bandCorreDuplicado === false && idFirebase === '') {
      createUser(email, password);
      function createUser(email, password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredential => {
            // Signed in
            var user = userCredential.user;
            let uuid = user.uid;
            console.log('uuid', uuid);

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
              token: uuid,
            };

            // createUser(email, password);
            //idFirebase = coleccionUsuarios.push().key;
            actualizacionData = {};
            actualizacionData[`/${uuid}`] = data;
            coleccionUsuarios.update(actualizacionData);
            id = '';
            $('form').trigger('reset'); //limpiamos los campos del formulario
            $('#modalAltaEdicion').modal('hide');

            console.info(`Usuario creado correctamente`, user);

            /* modal de aviso de que se actualizó usuario correctamente */
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado correctamente',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`Error ${errorCode} - ${errorMessage}`);
            /* aqui va el modal de email repetido */
            Swal.fire({
              icon: 'error',
              title: 'ATENCIÓN...',
              text: 'Usted esta intentando registrar un usuario con un correo ya existente por favor intente el registro con un nuevo correo, Gracias.',
            });
          });
      }

      console.log(
        `Esto es despues de crear un nuevo usuario y hacer el cambio de valor desde el cuerpo de crear: ${bandCorreDuplicado}`,
      );
    }
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
      return alert(`Error ${errorCode} - ${errorMessage}`);
    });
}
