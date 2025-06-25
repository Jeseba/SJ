function registrarEstudiante() {
    // Obtén los valores del formulario
    var curp = $("#T_Curp").val();
    var rfc = $("#T_Rfc").val();
    var fecha_ingreso = $("#DT_Ingreso").val();
    var sexo = document.querySelector('input[name="sexo"]:checked').value;
    var nombres = $("#T_Nombres").val();
    var apellidos = $("#T_Apellidos").val();
    var fecha_nacimiento = $("#DT_Nacimiento").val();
    var telefono = $("#T_Telefono").val();
    
    var Id_Grado = $("#Combo_Grado").val(); // Obtiene el valor seleccionado
    var Id_Auxiliar = $("#Combo_Auxiliar").val(); // Obtiene el valor seleccionado
    var Id_seccion = $("#Combo_Seccion").val(); // Obtiene el valor seleccionado
    var turno = $("#Combo_Turno").val();
    var Id_Movil = $("#Combo_Movil_Api").val();
    var direccion = $("#T_Direccion").val();
    var Email = $("#T_Email").val();

    var horario = $('#Horario').is(':checked') ? 1 : 0;
    var lunes = $('#Lunes').is(':checked') ? 1 : 0;
    var martes = $('#Martes').is(':checked') ? 1 : 0;
    var miercoles = $('#Miercoles').is(':checked') ? 1 : 0;
    var jueves = $('#Jueves').is(':checked') ? 1 : 0;
    var viernes = $('#Viernes').is(':checked') ? 1 : 0;
    var sabado = $('#Sabado').is(':checked') ? 1 : 0;
    var domingo = $('#Domingo').is(':checked') ? 1 : 0;

    var padre = $("#T_Padre").val();

    console.log('curp : ' + curp);
    console.log('rfc : ' + rfc);
    console.log('fecha_ingreso : ' + fecha_ingreso);
    console.log('sexo : ' + sexo);
    console.log('nombres : ' + nombres);
    console.log('apellidos : ' + apellidos);
    console.log('fecha_nacimiento : ' + fecha_nacimiento);
    console.log('Id_Grado : ' + Id_Grado);
    console.log('Id_Auxiliar : ' + Id_Auxiliar);
    console.log('Id_seccion : ' + Id_seccion);
    console.log('turno : ' + turno);
    console.log('direccion : ' + direccion);
    console.log('Email : ' + Email);



    // Validaciones básicas
    if (curp === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese Identificación'
        });
        return;
    }
    if (fecha_ingreso === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese fecha de ingreso'
        });
        return;
    }
    if (sexo === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, seleccione sexo'
        });
        return;
    }
    if (nombres === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese nombres'
        });
        return;
    }
    if (apellidos === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese apellidos'
        });
        return;
    }
    if (telefono === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese teléfono'
        });
        return;
    }

    

    if (Id_Auxiliar === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, seleccione Auxiliar'
        });
        return;
    }

    if (Id_seccion === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese sección'
        });
        return;
    }
    if (turno === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, seleccione turno'
        });
        return;
    }
    if (Id_Movil === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, Seleccione Movil de envio de mensajes'
        });
        return;
    }

    // Realiza la solicitud Ajax para insertar el registro
    $.ajax({
        url: 'procesar_estudiante.php',
        method: 'POST',
        data: {
            curp: curp,
            rfc: rfc,
            fecha_ingreso: fecha_ingreso,
            sexo: sexo,
            nombres: nombres,
            apellidos: apellidos,
            fecha_nacimiento: fecha_nacimiento,
            telefono: telefono,
            Id_Auxiliar:Id_Auxiliar,
            Id_Grado:Id_Grado,
            Id_seccion: Id_seccion,
            turno: turno,
            Id_Movil:Id_Movil,
            direccion: direccion,
            horario: horario,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes,
            sabado: sabado,
            domingo: domingo,
            padre: padre,
            Email: Email
        },
        success: function (response) {
            // Manejo de las respuestas del servidor
            var respuesta = response.trim().toLowerCase();

            if (respuesta === 'exito') {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro exitoso'
                }).then(function () {
                    window.location.href = 'alumnos_lista.php';
                });
            } else if (respuesta === 'duplicado_curp') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El estudiante ya existe. Verifique el CURP: ' + curp
                });
            } else if (respuesta === 'duplicado_email') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El correo electrónico ya está registrado. Verifique: ' + Email
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el estudiante. Detalles: ' + response
                });
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo procesar la solicitud. Inténtelo nuevamente más tarde.'
            });
        }
    });
}



         // Función para confirmar la dar de Baja
         function Eliminar_Estudiante_2(idEstudiante) {
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
                url: 'alumnos_delete.php', // Ajusta la URL según tu configuración
                data: { idEstudiante: idEstudiante },
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        // Mostrar el cuadro de diálogo de SweetAlert
                        Swal.fire('Baja', response.message, 'success')
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
