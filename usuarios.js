function registrarNuevo() {
    // Obtén los valores del formulario
    var rol = $('#Combo_Usuario').val();
    var usuario = $('#T_Usuario').val();
    var password = $('#T_Password').val();
    var telefono = $('#T_Telefono').val();
    var nombres = $('#T_Nombres').val();
    // var fileName = $('#foto').val();



    if (rol === '') {
        Swal.fire({
            title: 'Datos incompletos',
            text: 'Seleccione Tipo de Usuario',
            icon: 'warning'
        });
        return;
    }

    if (usuario === '') {
        Swal.fire({
            title: 'Datos incompletos',
            text: 'Ingrese Nombre de usuario',
            icon: 'warning'
        });
        return;
    }

    if (password === '') {
        Swal.fire({
            title: 'Datos incompletos',
            text: 'Ingrese Password',
            icon: 'warning'
        });
        return;
    }

    if (telefono === '') {
        Swal.fire({
            title: 'Datos incompletos',
            text: 'Ingrese Numero de Celular',
            icon: 'warning'
        });
        return;
    }

    if (nombres === '') {
        Swal.fire({
            title: 'Datos incompletos',
            text: 'Ingrese Nombres del Usuario',
            icon: 'warning'
        });
        return;
    }



    $.ajax({
        url: 'usuarios_procesar.php',
        method: 'POST',
        data: {
            rol: rol,
            usuario: usuario,
            password: password,
            telefono: telefono,
            nombres: nombres,
        },
        success: function (response) {
            // console.log('Respuesta del servidor:', response + foto);
            if (response.trim().toLowerCase() === 'exito') {
                console.log('form recibió los datos');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro exitoso'
                }).then(function() {
                    // Redirige a tu página principal
                    window.location.href = 'usuarios_lista.php';
                });
                // Puedes redirigir al usuario a otra página o realizar otras acciones después del registro exitoso
            } else if (response.trim().toLowerCase() === 'duplicado') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El Usuario ya existe verifique : ' + usuario
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el Usuario' + foto
                });
            }
        }
        
    });
    
}



         // Función para confirmar la dar de Baja
         function Eliminar_Usuario_2(idEstudiante) {
            Swal.fire({
                title: '¿Estás seguro de Eliminar Registro?',
                text: '¡No podrás revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Realizar la solicitud al servidor para Bajar el estudiante
                    Eliminar_Registro(idEstudiante);
                }
            });
        }

        function Eliminar_Registro(idEstudiante) {
            // Realizar una solicitud AJAX para llamar al script PHP en el servidor
            $.ajax({
                type: 'POST',
                url: 'usuarios_del.php', // Ajusta la URL según tu configuración
                data: { idEstudiante: idEstudiante },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // Mostrar el cuadro de diálogo de SweetAlert
                        Swal.fire('Eliminado', response.message, 'success')
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
                error: function() {
                    Swal.fire('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
                }
            });
        }
