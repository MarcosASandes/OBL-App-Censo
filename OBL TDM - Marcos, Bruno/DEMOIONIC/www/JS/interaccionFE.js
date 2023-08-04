function usConect() {
    if (localStorage.getItem("token") != null) {
        return true;
    } else { return false; }
}

if (usConect === false) {
    dqs("").style.display = "none";
}


function OcultarBotones(){
    let tok = localStorage.getItem("token");
    let idu = localStorage.getItem("idus");

    if(tok === null || tok === undefined){
        dqs("#nav-login").style.display = "block";
        dqs("#nav-registro").style.display = "block";
        dqs("#nav-addCensado").style.display = "none";
        dqs("#nav-getCensados").style.display = "none";
        dqs("#nav-mapa").style.display = "none";
        dqs("#nav-totalCensados").style.display = "none";
        dqs("#nav-logout").style.display = "none";
    }
    else{
        dqs("#nav-login").style.display = "none";
        dqs("#nav-registro").style.display = "none";
        dqs("#nav-addCensado").style.display = "block";
        dqs("#nav-getCensados").style.display = "block";
        dqs("#nav-mapa").style.display = "block";
        dqs("#nav-totalCensados").style.display = "block";
        dqs("#nav-logout").style.display = "inline-block";
    }
}

OcultarBotones();



function CerrarMenu() {
    document.querySelector("#menu").close();
}




document.querySelector("#ruteo").addEventListener("ionRouteWillChange", mostrarPagina);
document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);
document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);

function mostrarPagina(evento) {
    if (evento.detail.to == "/") {
        document.querySelector("#sec-inicio").style.display = "block";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-two") {
        document.querySelector("#sec-registro").style.display = "block";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-three") {
        document.querySelector("#sec-login").style.display = "block";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-four") {
        GetOcups(4);
        document.querySelector("#sec-agregarCensado").style.display = "block";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-five") {
        GetOcups(5);
        PrecargarArry(); 
        document.querySelector("#sec-listadoCensados").style.display = "block";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-six") {
        MostrarMapa();
        document.querySelector("#sec-mapa").style.display = "block";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "none";
    }
    else if (evento.detail.to == "/page-seven") {
        document.querySelector("#sec-mapa").style.display = "none";
        document.querySelector("#sec-listadoCensados").style.display = "none";
        document.querySelector("#sec-agregarCensado").style.display = "none";
        document.querySelector("#sec-login").style.display = "none";
        document.querySelector("#sec-registro").style.display = "none";
        document.querySelector("#sec-inicio").style.display = "none";
        document.querySelector("#sec-totcens").style.display = "block";
    }
}


function RedireccionARegistro(){
    ruteo.push("/page-two");
}

function RedireccionALogin(){
    ruteo.push("/page-three");
}

MostrarBienvenida();

function MostrarBienvenida(){
    if(usConect()){
        dqs("#msg-bienvenida").innerHTML = "Bienvenido/a";
    }
    else{
        dqs("#msg-bienvenida").innerHTML = "Debe loguearse o registrarse.";
    }
}

