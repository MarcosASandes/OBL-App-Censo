const censoAPI = "https://censo.develotion.com/";
let hayUsuarioLogueado = false;
let personas = [];
let usuarios = [];
Inicializar();

//Implementacion de API apuntes:
//Deberiamos llamar a la API y retornar los usuarios, alli comprobar a la hora de registrarse que no haya
//un usuario igual, y luego para hacer login debemos buscar en la API la existencia de un usuario con esos datos.



document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);
document.querySelector("#btnIngresar").addEventListener("click", iniciarSesion);


function Inicializar(){
    mostrarNav();
    PrecargarDatos();
}

function PrecargarDatos(){
    let nuevoUsuario = new Usuario("Pepe", "12345");
    usuarios.push(nuevoUsuario);
}


function registrarUsuario(){
    let user = document.querySelector("#txtUser").value;
    let pass = document.querySelector("#txtPass").value;

    try{
        if (user.trim().length == 0) {
            throw new Error("El user es requerido");
        }

        if (pass.trim().length == 0) {
            throw new Error("La pass no cumple el formato");
        }

        if(!BuscarUsuario(user, pass)){
            let nuevoUsuario = new Usuario(user, pass);
            usuarios.push(nuevoUsuario);
            document.querySelector("#registro-msg").innerHTML = "Usuario creado correctamente.";

            //Implementacion de la API - Prueba
            //Resultado obtenido: 409 Ya existe un usuario con ese nombre.
            fetch(censoAPI + "/usuarios.php",
                {
                    method:"POST",
                    Headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({"email": user,
                    "password": pass})
                })
                .then(function(response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data);
                })
                .catch(function (Error){
                    console.log(Error);
                })
        }
        else{
            document.querySelector("#registro-msg").innerHTML = "No creado.";
        }
    }
    catch (Error){
        document.querySelector("#registro-msg").innerHTML = Error.message;
    }
}



function iniciarSesion(){
    let nombreUsuario = document.querySelector("#txtUserLogin").value;
    let password = document.querySelector("#txtPassLogin").value;
    fetch(censoAPI + "/login.php",{
        method:"POST",
        Headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "usuario": nombreUsuario,
            "password": password
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        
        document.querySelector("#login-msg").innerHTML = "Encontrado";
    })
    .catch(function(error){
        document.querySelector("#login-msg").innerHTML = error;
    })

}







function BuscarUsuario(nombreUsuario, password) {
    let existUser = false;   
    usuarios.forEach(usu => {
        if (usu.user.trim() == nombreUsuario.trim() && usu.password.trim() == password.trim()) {
            existUser = true;
        }
    });
    return existUser;
}











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
}





