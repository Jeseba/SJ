function Editar_Perfil() {
    var Id_Registro = document.getElementById("Id_Registro").value;
    var Email = document.getElementById("T_Email").value;
    var Nombres = document.getElementById("T_Nombres").value;
    var Telefono = document.getElementById("T_Telefono").value;
    var Cargo = document.getElementById("T_Cargo").value;
    // Obtener el archivo desde el input de tipo file
    var ArchivoInput = document.getElementById("upload");
    var Archivo = ArchivoInput.files[0];

    // Verificar si se ha seleccionado un archivo
    var enviarFoto = false;
    if (Archivo !== undefined) {
        enviarFoto = true;
    }

    if (Email === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor ingrese usuario',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Nombres === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor ingrese Nombres del usuario',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // Crear un objeto FormData para enviar los datos
    var formData = new FormData();
    formData.append('Id_Registro',Id_Registro );
    formData.append('Email', Email);
    formData.append('Nombres', Nombres);
    formData.append('Telefono', Telefono);
    formData.append('Cargo', Cargo);

    // Agregar la foto al formData solo si se va a enviar
    if (enviarFoto) {
        formData.append('Archivo', Archivo);
    }

    $.ajax({
        type: "POST",
        url: "/models/usuarios/usuario_edit_model.php",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log('Rta recibo :' + response);
            var respuesta = JSON.parse(response);
            var icon = respuesta.tipo === 'exito' ? 'success' : 'error';
            Swal.fire({
                title: respuesta.tipo === 'exito' ? 'Éxito' : 'Error',
                text: respuesta.mensaje,
                icon: icon
            }).then((result) => {
                if (result.isConfirmed && respuesta.tipo === 'exito') {
                    location.reload();
                }
            });
        },
        error: function(error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el registro',
                icon: 'error'
            });
        }
    });
}


function previewImage(event, querySelector){

	//Recuperamos el input que desencadeno la acción
	const input = event.target;
	
	//Recuperamos la etiqueta img donde cargaremos la imagen
	$imgPreview = document.querySelector(querySelector);

	// Verificamos si existe una imagen seleccionada
	if(!input.files.length) return
	
	//Recuperamos el archivo subido
	file = input.files[0];

	// $rutafoto_tu = document.getElementById('foto_tutor');
	//Creamos la url
	objectURL = URL.createObjectURL(file);
	
	//Modificamos el atributo src de la etiqueta img
	$imgPreview.src = objectURL;
                
}


function Cambiar_Password() {
    var Id_Registro = document.getElementById("Id_Registro").value;
    var Password_Actual = document.getElementById("Password_Actual").value;
    var Nuevo_Password = document.getElementById("Nuevo_Password").value;
    var Confirmar_Password = document.getElementById("Confirmar_Password").value;


    // Verificar si se ha seleccionado un archivo

    if (Password_Actual === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor ingrese Password Actual',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Nuevo_Password === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor ingrese Nuevo Password',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    if (Confirmar_Password === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor confirme Password',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    if (Nuevo_Password !== Confirmar_Password) {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Nuevo Password no coincide',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }



    // Crear un objeto FormData para enviar los datos
    var formData = new FormData();
    formData.append('Id_Registro',Id_Registro );
    formData.append('Password_Actual', Password_Actual);
    formData.append('Nuevo_Password', Nuevo_Password);
    formData.append('Confirmar_Password', Confirmar_Password);

    $.ajax({
        type: "POST",
        url: "/models/usuarios/usuario_cambiar_password.php",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log('Rta recibo :' + response);
            var respuesta = JSON.parse(response);
            var icon = respuesta.tipo === 'exito' ? 'success' : 'error';
            Swal.fire({
                title: respuesta.tipo === 'exito' ? 'Éxito' : 'Error',
                text: respuesta.mensaje,
                icon: icon
            }).then((result) => {
                if (result.isConfirmed && respuesta.tipo === 'exito') {
                    location.reload();
                }
            });
        },
        error: function(error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar el registro',
                icon: 'error'
            });
        }
    });
}


function Nuevo_Usuario_Model() {

    // var Id_Registro = document.getElementById("Id_Registro").value;
    var Usuario = document.getElementById("T_Usuario_New").value;
    var Rol = document.getElementById("Combo_Rol_New").value;
    var Contrasena = document.getElementById("Nuevo_Password").value;
    var Nombres = document.getElementById("T_Nombres_New").value;
    var Celular = document.getElementById("T_Celular_New").value;
    var Confirmar_Password = document.getElementById("Confirmar_Password").value;

    if (Usuario === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Ingrese Usuario',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Rol === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Seleccione Rol',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Contrasena !== Confirmar_Password) {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Nuevo Password no coincide',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    if (Nombres === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, ingrese Nombres',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    $.ajax({
        type: "POST",
        url: "usuarios_new_model.php",
        data: {
            Usuario: Usuario,
            Rol: Rol,
            Contrasena: Contrasena,
            Nombres: Nombres,
            Celular: Celular
        },
        success: function(response) {
            console.log('Response : ' + response);
            var respuesta = JSON.parse(response);

            var icon = respuesta.tipo === 'exito' ? 'success' : 'error';

            Swal.fire({
                title: respuesta.tipo === 'exito' ? 'Éxito' : 'Error',
                text: respuesta.mensaje,
                icon: icon
            }).then((result) => {
                if (result.isConfirmed && respuesta.tipo === 'exito') {
                    // Redirige a la página deseada después de un éxito
                    window.location.href = 'usuarios_lista.php';
                }
            });

        },
        error: function(error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al insertar el registro',
                icon: 'error'
            });
        }
    });
}


function Editar_Baja(idRegistro,Valor) {
    if (Valor==1){
        Swal.fire({
            title: '¿Estás seguro de dar de Baja?',
            text: '¡Esto dejara inhabilitado al Registro!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, dar de Baja'
        }).then((result) => {
            if (result.isConfirmed) {
                // Realizar la solicitud al servidor para Bajar el estudiante
                Editar_Baja_Ejecuta(idRegistro,Valor);
            }
        });
    }else {
        Swal.fire({
            title: '¿Estás seguro de volver Habilitar Registro?',
            text: '¡Esto volvera Activo al Registro!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, volver Habilitar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Realizar la solicitud al servidor para Bajar el estudiante
                Editar_Baja_Ejecuta(idRegistro,Valor);
            }
        });
    }
    }
    
function Editar_Baja_Ejecuta(idRegistro,Valor) {
    // Realizar una solicitud AJAX para llamar al script PHP en el servidor
    console.log('id_registro : ' + idRegistro, 'Valor : ' + Valor);
    $.ajax({
        type: 'POST',
        url: '/models/usuarios/usuarios_baja_alta.php', // Ajusta la URL según tu configuración
        data: { idRegistro: idRegistro,Valor: Valor},
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                // Mostrar el cuadro de diálogo de SweetAlert
                console.log('respuesta : ' + response);
                Swal.fire('Proceso Exitoso', response.message, 'success')
                    .then((result) => {
                        // Redirigir a otra página después de hacer clic en "OK"
                        if (result.isConfirmed) {
                            location.reload();
                            // window.location.href = 'nueva_pagina.php'; // Reemplaza con la URL de tu nueva página
                        }
                    });
            } else {
                Swal.fire('Error', response.message, 'error');
            }
        },
        // error: function() {
        //     Swal.fire('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
        // }
    });
    }


// NUEVO ROL
$(document).ready(function() {
    $('#guardarDatos').click(function() {
        var datos = {};
        var Rol = $('#T_Nombre_Rol').val();

        if (Rol === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, Ingrese nombre del Rol',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        // Obtener el nombre del rol
        datos['nombreRol'] = Rol;

        // Array con los nombres de las columnas válidas en la tabla usuarios_roles
        var columnasValidas = [
            'selectAll',
            'venta_ver', 'venta_cre', 'venta_edi', 'venta_eli',
            'inve_ver','inve_cre', 'inve_edi', 'inve_eli',
            'compra_ver','compra_cre', 'compra_edi','compra_eli', 
            'guia_ver','guia_cre', 'guia_edi', 'guia_eli', 
            'producto_ver','producto_cre','producto_edi', 'producto_eli', 
            'cliente_ver','cliente_cre', 'cliente_edi','cliente_eli', 
            'proveedor_ver','proveedor_cre', 'proveedor_edi', 'proveedor_eli',
            'almacen_ver','almacen_cre', 'almacen_edi', 'almacen_eli',
            'usuarios', 'reportes'
        ];


        // Obtener los valores de los checkboxes seleccionados que corresponden a las columnas válidas
        $('.form-check-input').each(function() {
            var id = $(this).attr('id');
            if (columnasValidas.includes(id)) {
                datos[id] = $(this).is(':checked') ? 1 : 0;
            }
        });

        // Enviar datos al servidor mediante AJAX
        // console.log(datos);
        $.ajax({
            url: "/models/usuarios/usuarios_new_rol.php",
            type: 'POST',
            data: { datos: datos },
            success: function(response) {
                console.log('Respuesta : ' + response);
                // Mostrar alerta con SweetAlert2
                console.log('Respuesta del servidor : ' + response);
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = 'usuarios_roles.php';
            },
            error: function(xhr, status, error) {
                // Mostrar alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: 'Por favor, inténtelo de nuevo más tarde'
                });
            }
        });
    });
});

// EDITAR ROL
$(document).ready(function() {
    $('#guardarDatosUpdate').click(function() {
        var datos = {};
        var Id_Registro = $('#Id_Registro').val();
        var Rol = $('#T_Nombre_Rol_Edit').val();

        if (Rol === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, ingrese nombre del Rol',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        // Obtener el nombre del rol y el Id_Registro
        datos['Id_Registro'] = Id_Registro;
        datos['nombreRol'] = Rol;

        // Array con los nombres de las columnas válidas en la tabla usuarios_roles
        var columnasValidas = [
            'selectAll_Edit',
            'venta_ver_Edit','venta_cre_Edit', 'venta_edi_Edit', 'venta_eli_Edit',
            'inve_ver_Edit','inve_cre_Edit', 'inve_edi_Edit', 'inve_eli_Edit', 
            'compra_ver_Edit','compra_cre_Edit', 'compra_edi_Edit','compra_eli_Edit', 
            'guia_ver_Edit','guia_cre_Edit', 'guia_edi_Edit', 'guia_eli_Edit', 
            'producto_ver_Edit','producto_cre_Edit','producto_edi_Edit', 'producto_eli_Edit', 
            'cliente_ver_Edit','cliente_cre_Edit', 'cliente_edi_Edit','cliente_eli_Edit', 
            'proveedor_ver_Edit','proveedor_cre_Edit', 'proveedor_edi_Edit', 'proveedor_eli_Edit',
            'almacen_ver_Edit','almacen_cre_Edit', 'almacen_edi_Edit', 'almacen_eli_Edit', 
            'usuarios_Edit', 'reportes_Edit'
        ];

        // Obtener los valores de los checkboxes seleccionados que corresponden a las columnas válidas
        $('.form-check-input').each(function() {
            var id = $(this).attr('id');
            if (columnasValidas.includes(id)) {
                datos[id] = $(this).is(':checked') ? 1 : 0;
            }
        });

        // Enviar datos al servidor mediante AJAX
        $.ajax({
            url: "/models/usuarios/usuarios_edit_rol.php",
            type: 'POST',
            data: { datos: datos },
            success: function(response) {
                // Mostrar alerta con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Guardado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.href = 'usuarios_roles.php';
            },
            error: function(xhr, status, error) {
                // Mostrar alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: 'Por favor, inténtelo de nuevo más tarde'
                });
            }
        });
    });
});



function Editar_Usuario_Model() {

    var Id_Registro = document.getElementById("Id_Registro").value;
    var Usuario = document.getElementById("T_Usuario_Edit").value;
    var Rol = document.getElementById("Combo_Rol_Edit").value;
    var Contrasena = document.getElementById("Edit_Password").value;
    var Nombres = document.getElementById("T_Nombres_Edit").value;
    var Celular = document.getElementById("T_Celular_Edit").value;
    var Confirmar_Password = document.getElementById("Edit_Confirmar_Password").value;

    if (Usuario === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Ingrese Usuario',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Rol === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Seleccione Rol',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Contrasena !== Confirmar_Password) {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Nuevo Password no coincide',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    if (Nombres === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, ingrese Nombres',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }


    $.ajax({
        type: "POST",
        url: "usuarios_edit_model.php",
        data: {
            Id_Registro:Id_Registro,
            Usuario: Usuario,
            Rol: Rol,
            Contrasena: Contrasena,
            Nombres: Nombres,
            Celular: Celular
        },
        success: function(response) {
            console.log('Response : ' + response);
            var respuesta = JSON.parse(response);

            var icon = respuesta.tipo === 'exito' ? 'success' : 'error';

            Swal.fire({
                title: respuesta.tipo === 'exito' ? 'Éxito' : 'Error',
                text: respuesta.mensaje,
                icon: icon
            }).then((result) => {
                if (result.isConfirmed && respuesta.tipo === 'exito') {
                    // Redirige a la página deseada después de un éxito
                    window.location.href = 'usuarios_lista.php';
                }
            });

        },
        error: function(error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al insertar el registro',
                icon: 'error'
            });
        }
    });
}