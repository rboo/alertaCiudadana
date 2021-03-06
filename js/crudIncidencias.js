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

  //creamos constantes para los iconos detalle, editar y borrar
  const iconoDetalle =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path></svg>';
  const iconoBorrar =
    '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

  const db = firebase.database();
  coleccionIncidencias = db.ref().child('incidentes');

  var dataSet = []; //array para guardar los valores de los campos inputs del form

  var table = $('#tablaIncidencias').DataTable({
    /* colocando elementos de la tabla en espa??ol */
    language: {
      decimal: '',
      emptyTable: 'No hay informaci??n',
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

    /* columna que oculto y botones que ir??n por defecto en la ultima columna */
    data: dataSet,
    columnDefs: [
      {
        targets: [0, 4],
        visible: false, //ocultamos la columna de ID que es la [0]
      },
      {
        targets: -1,
        defaultContent:
          "<div class='wrapper text-center'><div class='btn-group'><button class='btnDetalle btn btn-warning' data-toggle='tooltip' title='Ver Detalle'>" +
          iconoDetalle +
          "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" +
          iconoBorrar +
          '</button></div></div>',
      },
    ],
    dom: 'Blfrtip',
    /* paginaci??n de la tabla */
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
          title: 'Reporte de Alertas - Municipalidad de Chicama',
          // text: 'Reporte Excel',
          // className: 'btn btn-outline-success',
          text: '<i class="fas fa-file-excel icono-excel"></i>',
          titleAttr: 'Exportar a Excel',
          className: 'btn btn-success excelButton',
          messageBottom: 'Alcalde Julio P??rez Cabrera.',

          //defino que columnas quiero que se vean
          exportOptions: {
            columns: [1, 2, 3],
          },

          //definimos los parametros al exportar a excel
          //definimos los parametros al exportar a excel
          excelStyles: [
            {
              template: ['blue_medium', 'header_blue', 'title_medium'],
            },
            {
              cells: '1',
              style: {
                font: {
                  size: '14',
                  b: true,
                },
              },
            },
            {
              cells: '2',
              style: {
                font: {
                  size: '12',
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
            },

            pageSetup: {
              paperSize: '9', // Tama??o del papel (1 = Legal, 9 = A4)
              fitToWidth: '1', // Ajustar al ancho de la p??gina
              fitToHeight: '0', // Ajustar al alto de la p??gina
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
        //propiedades del boton PDF
        {
          extend: 'pdfHtml5',

          //Esta funcion hace que el documento pdf vaya centrado, el valor del array puede cambiar de acuerdo a la posicion de la tabla
          customize: function (doc) {
            doc.content[1].margin = [120, 0, 100, 0]; //left, top, right, bottom
            doc.content[2].margin = [120, 30, 100, 0]; //left, top, right, bottom
          },

          text: '<i class="fas fa-file-pdf icono-pdf"></i>',
          titleAttr: 'Exportar a PDF',
          title:
            'Reporte de Alertas de Aplicaci??n de Alertas - Municipalidad de Chicama',
          className: 'btn btn-danger',
          // orientation: 'landscape',
          footer: true,
          pageSize: 'A4',
          lengthChange: false,
          messageBottom: {
            text: 'Alcalde Julio P??rez Cabrera.',
            alignment: {
              vertical: 'center',
              horizontal: 'right',
            },
          },

          //defino que columnas quiero que se vean en PDF
          exportOptions: {
            columns: [1, 2, 3],
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

  //Luego de un nuevo incidente motramos lo datos en datatables
  //CHILD_ADDED - evento para agregar hijo a la base
  coleccionIncidencias.on('child_added', datos => {
    dataSet = [
      datos.key,
      datos.child('titulo').val(),
      datos.child('fecha').val(),
      datos.child('hora').val(),
      datos.child('imagen').val(),
    ];
    table.rows.add([dataSet]).draw();
  });

  //CHILD_REMOVED - evento para eliminar hijo a la base
  //luego de BORRAR eliminamos del front-end la fila

  coleccionIncidencias.on('child_removed', function () {
    table.row(filaEliminada.parents('tr')).remove().draw();
  });

  //Botones

  /* boton BORRAR */
  $('#tablaIncidencias').on('click', '.btnBorrar', function () {
    filaEliminada = $(this); //captura la fila eliminada para pasarla al event CHILD_REMOVED
    Swal.fire({
      title: '??Est?? seguro de eliminar esta alerta?',
      text: '??Est?? operaci??n no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then(result => {
      if (result.value) {
        let fila = $('#tablaIncidencias')
          .dataTable()
          .fnGetData($(this).closest('tr'));
        banderaEliminado = true;
        cont2 += 10;
        let imagen = fila[4]; //capturamos el atributo IMAGEN de la fila de la tabla

        if (imagen !== 'imagen') {
          // Creando referencia a la imagen de storage que se va a eliminar
          var storage = firebase.storage();
          var desertRef = storage.ref(imagen);
          // Eliminando la imagen de storage
          desertRef
            .delete()
            .then(function () {})
            .catch(function (error) {
              console.log(error);
            });
        }
        let id = fila[0]; //capturamos el atributo ID de la fila
        db.ref(`incidentes/${id}`).remove(); //eliminamos el incidente de firebase

        Swal.fire('??Eliminado!', 'La alerta ha sido eliminada.', 'success');
      }
    });
  });

  /* FIN boton borrar */

  const dbref = firebase.database(); //.ref().child('incidentes');
  const user = 'test@gmail.com';
  const key = '123456';

  //botom mostrar detalle
  $('#tablaIncidencias').on('click', '.btnDetalle', function () {
    filaSeleccionada = $(this);
    tablaIncidencias.classList.add('d-none');
    alertsDetails.classList.remove('d-none');
    mapAlerts.classList.remove('d-none');
    let fila = $('#tablaIncidencias')
      .dataTable()
      .fnGetData($(this).closest('tr'));
    let id = fila[0]; //capturamos el atributo ID de la fila
    loadIncidentDetail(id);
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
