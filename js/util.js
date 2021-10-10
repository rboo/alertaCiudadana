class Util {
  constructor() {}

  obtenerLS(key) {
    return localStorage.getItem(key) !== null
      ? JSON.parse(localStorage.getItem(key))
      : [];
  }

  insertarLS(key, dataStorage) {
    var dataLS = this.obtenerLS(key);
    dataLS.push(dataStorage);
    localStorage.setItem(key, JSON.stringify(dataLS));
    return true;
  }

  actualizarLS(key, dataStorage) {
    localStorage.setItem(key, JSON.stringify(dataStorage));
    return true;
  }

  eliminardatoLS(key, id) {
    var dataLS = this.obtenerLS(key);

    dataLS.forEach(function (data, index) {
      if (data.id === id) dataLS.splice(index, 1);
    });

    localStorage.setItem(key, JSON.stringify(dataLS));
  }

  limpiarLS(key) {
    localStorage.removeItem(key);
  }

  baseUrl() {
    //return "http://localhost:9090/tareosDestajo/"; // ? conexion local
    //return "https://api.osf.pe/tareosDestajo/";   // ? conexion produccion
  }

  clearSelect(element) {
    let $select = document.getElementById(element);
    for (let i = $select.options.length; i >= 1; i--) {
      $select.remove(i);
    }
  }

  formatearFecha(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");  
  }

  nombreMes(numeroMes) {
    let mes = ""
    switch (numeroMes) {
      case "01":
        mes = "Enero";
        break;
      case "02":
        mes = "Febrero";
        break;
      case "03":
        mes = "Marzo";
        break;
      case "04":
        mes = "Abril";
        break;
      case "05":
        mes = "Mayo";
        break;
      case "06":
        mes = "Junio";
        break;
      case "07":
        mes = "Julio";
        break;
      case "08":
        mes = "Agosto";
        break;
      case "09":
        mes = "Setiembre";
        break;
      case "10":
        mes = "Octubre";
        break;
      case "11":
        mes = "Noviembre";
        break;
      case "12":
        mes = "Diciembre";
        break;
    }
    return mes
  }

}
