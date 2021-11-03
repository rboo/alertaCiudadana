let app = new Util();
let dataUsuario = app.obtenerLS('usuario');

(function () {
  validarPagina();
  loadDataUser();
  closeSession();
})();

function validarPagina() {
  if (app.obtenerLS('usuario').length === 0) {
    window.location.href = 'login.html';
    alert(
      'Por favor verifique los datos ingresados antes de poder visualizar los incidentes',
    );
    return false;
  }
}

function loadDataUser() {
  console.log('uid', dataUsuario.uid);
  const dbref = firebase.database();
  var starCountRef = dbref.ref().child('usuarios').child(dataUsuario.uid);
  starCountRef.on('value', snapshot => {
    var childData = snapshot.val();
    // confirmamos que exista el UID en nodo usuarios
    if (childData !== null) {
      console.log('data', childData);
      $('#profile_name').html(childData.nombres);
      console.log(childData.nombres);
      if (childData.sexo === 'Masculino') {
        $('#img_profile').attr('src', './image/avatar_man.png');
      } else {
        $('#img_profile').attr('src', './image/avatar_women.png');
      }
    } else {
      // si no existe UID en nodo usuarios no se pinta la información
      return false;
    }
  });
}

function closeSession() {
  let btnLogout = document.querySelector('#log-out');
  if (btnLogout !== null) {
    btnLogout.addEventListener('click', () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          app.limpiarLS('usuario');
          window.location.href = 'login.html';
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}
