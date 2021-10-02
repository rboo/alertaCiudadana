let arrow = document.querySelectorAll('.arrow');
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener('click', e => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle('showMenu');
  });
}

let sidebar = document.querySelector('.sidebar');
let sidebarBtn = document.querySelector('.bx-menu');

if (sidebar != null || sidebarBtn != null) {
  // console.log(sidebarBtn);
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    mainContent.classList.toggle('max-w80');
  });
}

let alertHistory = document.querySelector('.alert-history');
let alerts = document.querySelector('.alerts');
let alertsDetails = document.querySelector('.alerts-details');
let mainContent = document.querySelector('.main-content');
let mapAlerts = document.querySelector('.map-alerts');

if (alertHistory != null) {
  alertHistory.addEventListener('click', () => {
    // for (let i = 0; i < elements.length; i++) {
    //   elements[i].addEventListener('click', e => {
    //     console.log('hice click en un boton');
    //     // let dataAttribute = element[i].getAttribute('data-id');
    //     // console.log('data', dataAttribute);
    //     // loadIncidentDetail(dataAttribute);
    //   });
    // }
    // alerts.classList.toggle('d-none');
    // alerts.classList.toggle('v-hidden');

    //micodigo
    alerts.classList.remove('d-none');
    // alerts.classList.toggle('left-none');
    alerts.classList.add('left-none');
    sidebar.classList.toggle('close');
    mainContent.classList.toggle('max-w80');
    alertsDetails.classList.add('d-none');
  });
}

let floatAlertHistory = document.querySelector('.float-alert-history');

if (floatAlertHistory != null) {
  floatAlertHistory.addEventListener('click', () => {
    // alerts.classList.toggle('left-none');
    alertsDetails.classList.add('d-none');
    alerts.classList.remove('d-none');
    alerts.classList.add('left-none');
    //micodigo
    // addmarker();

    // if (alerts.classList.contains('d-none')) {
    //   alertDetails.classList.add('d-none');
    //   //mapAlert.classList.add('d-none');
    // }
  });
}

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

let dni = document.querySelector('#dni');
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

if (password != null) {
  password.addEventListener('blur', () => {
    let labelPassword = document.querySelector('.label-password');
    if (password.value.length === 0) {
      labelPassword.classList.remove('label-selecionada');
    } else {
      labelPassword.classList.add('label-selecionada');
    }
  });
}

/* ************** FIN CODIGO DE LOGIN ********************** */
