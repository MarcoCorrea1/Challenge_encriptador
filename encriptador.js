//Declaracion de variables -> interacción elementos dom
const txtUsuario=document.getElementById("textareaid"); //textarea
const copiar=document.getElementById('boton-copiar'); //Boton copiar
const mensajeContenedor=document.getElementById("mensajeContenedorId"); //Contenedor entrada
const textareaMensaje=document.getElementById("mensajeTextareaId"); //textarea Mensaje
const mensajeSalida=document.getElementById("mensajeId"); //Mensaje

//Matriz de codificacion
const matrizCodificacion=[
    ["a","ai"],
    ["e","enter"],
    ["i","imes"],
    ["o","ober"],
    ["u","ufat"],
]

 //Traer el texto
 function traerTexto() {
    let textoIngresado=txtUsuario.value;
    return textoIngresado;
}

//Validar entrada de texto
function validarEntrada(entrada) {
    resultado=true;
    // Verifica si el texto del botón es solo en minúsculas
    if (entrada != entrada.toLowerCase()) {
      alert('El texto debe estar en minúsculas.');
      resultado = false;
    }
 // Verifica si el texto del botón contiene acentos
    var tieneAcento = /[áéíóú]/.test(entrada);
    if (tieneAcento) {
      alert('El texto no debe contener acentos.');
      resultado= false;
    }

    return resultado
}

//Funciones de encriptado
function encriptado(texto) {
    for (let i=0; i<matrizCodificacion.length; i++){
        if (texto.includes(matrizCodificacion[i][0])){
            texto=texto.replaceAll(matrizCodificacion[i][0],matrizCodificacion[i][1]);
        }
    } 
    cambiarContenidoTextarea(textareaMensaje,texto); 
}
function botonEncriptar(){
    let texto=traerTexto()

    if (validarEntrada(texto) == true){
        encriptado(texto);
        mostrarElemento(copiar);
        mostrarElemento(textareaMensaje);
        limpiarTextArea(txtUsuario);
        quitarImagen();
        ocultarElemento(mensajeSalida);
    }
    else{
        limpiarTextArea(txtUsuario);
        restablecerMensajeContenedor();
    }
}

// funcinones de desencriptado
function botonDesencriptar(){
    desencriptado(traerTexto());
    mostrarElemento(copiar);
    mostrarElemento(textareaMensaje);
    limpiarTextArea(txtUsuario);
    quitarImagen();
    ocultarElemento(mensajeSalida);
}

function desencriptado(texto) {
    for (let i=matrizCodificacion.length-1; i>=0; i--){
        if (texto.includes(matrizCodificacion[i][1])){
            texto=texto.replaceAll(matrizCodificacion[i][1],matrizCodificacion[i][0]);
        }
    }
    cambiarContenidoTextarea(textareaMensaje,texto); 
}

//funciones generales
function limpiarTextArea(textarea) {
    textarea.value="";
}

function cambiarContenidoTextarea(textarea,textoNuevo){
    textarea.value=textoNuevo;
}

function mostrarElemento(elemento){
    elemento.hidden=false;
}

function quitarImagen(){
    mensajeContenedor.style.backgroundImage="none";
}

function MostrarFondoMensaje(){
    mensajeContenedor.style.backgroundImage="url(imagenes/Muñeco.png)";
}

function ocultarElemento(elemento){
    elemento.hidden=true;
}

function restablecerMensajeContenedor(){
    limpiarTextArea(textareaMensaje);
    mostrarElemento(mensajeSalida);
    ocultarElemento(textareaMensaje);
    ocultarElemento(copiar);
    MostrarFondoMensaje();
}

//Copiar el texto

function alertaCopiar(){
  alert("El mensaje ha sido copiado"); 
}

 async function copiarTexto(){
    let textoEncriptado=textareaMensaje.value;
    try{
        await navigator.clipboard.writeText(textoEncriptado);
        alertaCopiar();
    }
    catch(e){
        console.error("Error al copiar: "+e);
    }
    restablecerMensajeContenedor();
}
