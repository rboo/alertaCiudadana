var map;

function initMap() {
  loadIncidents();
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -9.08528, lng: -78.57833 },
    zoom: 12,
  });
}

// function addMarker() {
// console.log('hice clcik');
// let element = document.querySelectorAll('.alerts__list-link');
// console.log(element);
// for (let i = 0; i < element.length; i++) {
//   // let element = document.getElementById('alert[i]');
//   console.log(element);
// }
// let element = document.querySelectorAll('.alerts__list-link');
// let elements = document.querySelectorAll('.alerts__list-link');
// console.log(element);
// for (let i = 0; i < elements.length; i++) {
//   let element = document.getElementById('alert[i]');
//   console.log(element);
// }
// let dataAttribute = undefined;
// for (let i = 0; i < element.length; i++) {
//   element[i].addEventListener('click', e => {
//     // console.log(`Hice un click en el elemento ` + i);
//     var dataAttribute = element[i].getAttribute('data-id');
//     console.log('data', dataAttribute);
//     loadIncidentDetail(dataAttribute);
//   });
// }
// }

let temporizadorMap = setTimeout(() => {
  addMarquer();
}, 10000);

let addMarquer = () => {
  let elements = document.querySelectorAll('.alerts__list-link');
  let alertDetails = document.querySelector('.alerts-details');
  let alerts = document.querySelector('.alerts');

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', e => {
      console.log('hice click en un boton');
      var dataAttribute = elements[i].getAttribute('data-id');
      console.log('data', dataAttribute);
      loadIncidentDetail(dataAttribute);

      alertDetails.classList.remove('d-none');
      // alerts.classList.remove('left-none');
      alerts.classList.add('d-none');
    });
  }
};
