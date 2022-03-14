//VARIABLES
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
const expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//variables campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//EVENTLISTENER
eventListener();

function eventListener(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);

    //Reiniciar formulario
    btnReset.addEventListener('click', resetearFormulario);
}

//FUNCIONES
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", 'opacity-50');

}

// Validar FORMULARIO
function validarFormulario(e){


    if (e.target.value.length > 0){

        //Elimina los errores
        const error = document.querySelector('p.error');
        if (error){
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500');
         e.target.classList.add('border', 'border-green-500');
        // console.log("Si hay algo");
    }else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Los campos son obligatorios');
    }
    
    if (e.target.type === 'email'){
        
        if (expRegular.test( e.target.value )){
            const error = document.querySelector('p.error');
            if (error){
            error.remove();
        }

         e.target.classList.remove('border', 'border-red-500');
         e.target.classList.add('border', 'border-green-500');

        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email NO valido');
        }
    }

    if (expRegular.test(email.value) && asunto.value !== '' && asunto.value !== '' ){
         btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", 'opacity-50');
    }

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center','error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
    
}

function enviarEmail (e){
    e.preventDefault();
    e.stopPropagation();
    // console.log('enviando');
    //mostrar spiner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = 'flex';
    spinner.classList.add('spinner-cool')

    //Ocultar spinner despues de 3 seg
    //setInterval se ejecuta CADA 3 seg y timeout solo una vez despues de 3 seg
    setTimeout( () => {
        spinner.style.display = 'none';

        //Mensaje
        const parrafo = document.createElement('p');
        if (e.target.classList.contains('spinner-cool')){

        parrafo.textContent = 'El mensaje se envio correctamente';
        formulario.insertBefore(parrafo, spinner);
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'font-bold', 'uppercase', 'text-white');
        
    }
    
        
        setTimeout (() => {
            parrafo.remove(); // Eliminar mensaje de exito
            resetearFormulario();

        }, 4500);

    }, 3500);
}
//resetear formulario
function resetearFormulario(){
    //e.preventDefault();
    formulario.reset();
    iniciarApp();
    email.classList.remove('border', 'border-green-500', 'border-red-500');
    mensaje.classList.remove('border', 'border-green-500', 'border-red-500');
    asunto.classList.remove('border', 'border-green-500', 'border-red-500');

    const error_2 = document.querySelector('p.error');

    if (error_2){
        error_2.remove();
    }

}