function usConect() {
    if (localStorage.getItem("token") != null) {
        return true;
    } else { return false; }
}

if (usConect === false) {
    dqs("").style.display = "none";
}


/*REGION MAPA*/
//Codigo comentado para ver a futuro, el problema radica en que el mapa aparece en cualquier parte de la pantalla
//y en cualquier seccion.

//ToDo
/*
let latitudeOrigen;
let longitudeOrigen;
navigator.geolocation.getCurrentPosition(SetearPosicionDispositivo, MostrarError);

MostrarMapa();

function SetearPosicionDispositivo(position){
    console.log(position);
    latitudeOrigen=position.coords.latitude;
    longitudeOrigen=position.coords.longitude;
  
}
function MostrarError(error){
    console.log(error);
}

function MostrarMapa(){
    if(navigator.geolocation){
        var map = L.map('sec-mapa').setView([-34.903609710179076, -56.190603059985875], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
L.marker([-34.903609710179076, -56.190603059985875]).bindPopup("Usted").addTo(map);
L.marker([latitudeOrigen, longitudeOrigen]).addTo(map);
    }
    
}*/

/*FIN MAPA*/ 



























// //#region Reutilizable




// //#endregion



function CerrarMenu(){
    document.querySelector("#menu").close();
}


/*
function mostrarNav(){
    if(hayUsuarioLogueado){
        //botones del nav.
        document.querySelector("#navLogin").style.display = "none";
        document.querySelector("#navRegistro").style.display = "none";

        document.querySelector("#navInicio").style.display = "block";
        document.querySelector("#navCerrarSesion").style.display = "block";
        document.querySelector("#navAgregarPersona").style.display = "block";
        document.querySelector("#navObtenerPersonas").style.display = "block";
        document.querySelector("#navMostrarMapa").style.display = "block";

        //secciones que se ven.
        document.querySelector("#sec-inicio").style.display = "block";
        document.querySelector("#sec-agregarCensado").style.display = "block";
        document.querySelector("#sec-listadoCensados").style.display = "block";
        document.querySelector("#sec-mapa").style.display = "block";

        //secciones que no se ven.
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";

    }
    else{
        //botones del nav si no hay log.
        document.querySelector("#navInicio").style.display = "none";
        document.querySelector("#navCerrarSesion").style.display = "none";
        document.querySelector("#navAgregarPersona").style.display = "none";
        document.querySelector("#navObtenerPersonas").style.display = "none";
        document.querySelector("#navMostrarMapa").style.display = "none";

        //secciones
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
    }
}*/



document.querySelector("#ruteo").addEventListener("ionRouteWillChange",mostrarPagina);
document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);
document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);

function mostrarPagina(evento){
    console.log(evento);
    if(evento.detail.to=="/"){
        document.querySelector("#sec-inicio").style.display="block";
        document.querySelector("#sec-registro").style.display="none";
        document.querySelector("#sec-login").style.display="none";
        document.querySelector("#sec-agregarCensado").style.display="none";
        document.querySelector("#sec-listadoCensados").style.display="none";
        document.querySelector("#sec-mapa").style.display="none";
    }
    else if(evento.detail.to =="/page-two"){
        document.querySelector("#sec-registro").style.display="block";
        document.querySelector("#sec-inicio").style.display="none";
        document.querySelector("#sec-login").style.display="none";
        document.querySelector("#sec-agregarCensado").style.display="none";
        document.querySelector("#sec-listadoCensados").style.display="none";
        document.querySelector("#sec-mapa").style.display="none";
    }
    else if(evento.detail.to =="/page-three"){
        document.querySelector("#sec-login").style.display="block";
        document.querySelector("#sec-registro").style.display="none";
        document.querySelector("#sec-inicio").style.display="none";
        document.querySelector("#sec-agregarCensado").style.display="none";
        document.querySelector("#sec-listadoCensados").style.display="none";
        document.querySelector("#sec-mapa").style.display="none";
    }
    else if(evento.detail.to =="/page-four"){
        document.querySelector("#sec-agregarCensado").style.display="block";
        document.querySelector("#sec-login").style.display="none";
        document.querySelector("#sec-registro").style.display="none";
        document.querySelector("#sec-inicio").style.display="none";
        document.querySelector("#sec-listadoCensados").style.display="none";
        document.querySelector("#sec-mapa").style.display="none";
    }
    else if(evento.detail.to =="/page-five"){
        document.querySelector("#sec-listadoCensados").style.display="block";
        document.querySelector("#sec-agregarCensado").style.display="none";
        document.querySelector("#sec-login").style.display="none";
        document.querySelector("#sec-registro").style.display="none";
        document.querySelector("#sec-inicio").style.display="none";
        document.querySelector("#sec-mapa").style.display="none";
    }
    else if(evento.detail.to =="/page-six"){
        document.querySelector("#sec-mapa").style.display="block";
        document.querySelector("#sec-listadoCensados").style.display="none";
        document.querySelector("#sec-agregarCensado").style.display="none";
        document.querySelector("#sec-login").style.display="none";
        document.querySelector("#sec-registro").style.display="none";
        document.querySelector("#sec-inicio").style.display="none";
    }
}