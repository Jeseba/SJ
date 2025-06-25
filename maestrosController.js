

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




function Nuevo_Maestro_Model() {

    var Identificacion = document.getElementById("T_Identificacion_New").value;
    var Especialidad = document.getElementById("Combo_Especialidad_New").value;
    var Cargo = document.getElementById("Combo_Cargo_New").value;
    var Turno = document.getElementById("Combo_Turno_New").value;
    var sexo = document.querySelector('input[name="sexo"]:checked').value;
    var Nacimiento = document.getElementById("DT_Nacimiento_New").value;
    var Nombres = document.getElementById("T_Nombres_New").value;
    var Apellidos = document.getElementById("T_Apellidos_New").value;
    var Direccion = document.getElementById("T_Direccion_New").value;
    var Email = document.getElementById("T_Email_New").value;
    var Contrasena = document.getElementById("T_Contrasena_New").value;
    var Celular = document.getElementById("T_Celular_New").value;
    var Aulas = document.getElementById("T_Aulas_New").value;

    var horario = $('#Horario').is(':checked') ? 1 : 0;
    var lunes = $('#Lunes').is(':checked') ? 1 : 0;
    var martes = $('#Martes').is(':checked') ? 1 : 0;
    var miercoles = $('#Miercoles').is(':checked') ? 1 : 0;
    var jueves = $('#Jueves').is(':checked') ? 1 : 0;
    var viernes = $('#Viernes').is(':checked') ? 1 : 0;
    var sabado = $('#Sabado').is(':checked') ? 1 : 0;
    var domingo = $('#Domingo').is(':checked') ? 1 : 0;
    
    // console.log('Horario : ' + horario);
    // console.log('lunes : ' + lunes);
    // console.log('martes : ' + martes);
    // console.log('miercoles : ' + miercoles);
    // console.log('jueves : ' + jueves);
    // console.log('viernes : ' + viernes);
    // console.log('sabado : ' + sabado);
    // console.log('domingo : ' + domingo);

    if (Identificacion === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Ingrese Identificacion',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Especialidad === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Seleccione Especialidad',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    if (Cargo === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Seleccione Cargo',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

  

    
    if (Turno === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Seleccione Turno',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // if (Contrasena === '') {
    //     Swal.fire({
    //         title: '¡Advertencia!',
    //         text: 'Por favor, Ingrese Contraseña',
    //         icon: 'warning',
    //         confirmButtonText: 'OK'
    //     });
    //     return false;
    // }




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
        url: "maestros_new_model.php",
        data: {
            Identificacion: Identificacion,
            Especialidad: Especialidad,
            Turno:Turno,
            sexo:sexo,
            Nombres: Nombres,
            Apellidos:Apellidos,
            Direccion:Direccion,
            Email:Email,
            Contrasena:Contrasena,
            Celular: Celular,
            horario:horario,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes,
            sabado: sabado,
            domingo: domingo,
            Cargo:Cargo,
            Nacimiento:Nacimiento,
            Aulas:Aulas
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
                    window.location.href = 'maestros_lista.php';
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



    function Editar_Maestro_Model() {
        var Id_Registro = document.getElementById("Id_Registro").value;
        var Identificacion = document.getElementById("T_Identificacion_Edit").value;
        var Especialidad = document.getElementById("Combo_Especialidad_Edit").value;
        var Turno = document.getElementById("Combo_Turno_Edit").value;
        var sexo = document.querySelector('input[name="sexo_edit"]:checked').value;
        var Nombres = document.getElementById("T_Nombres_Edit").value;
        var Apellidos = document.getElementById("T_Apellidos_Edit").value;
        var Direccion = document.getElementById("T_Direccion_Edit").value;
        var Email = document.getElementById("T_Email_Edit").value;
        var Celular = document.getElementById("T_Celular_Edit").value;

        var horario = $('#HorarioEdicion').is(':checked') ? 1 : 0;
        var lunes = $('#Lunes_E').is(':checked') ? 1 : 0;
        var martes = $('#Martes_E').is(':checked') ? 1 : 0;
        var miercoles = $('#Miercoles_E').is(':checked') ? 1 : 0;
        var jueves = $('#Jueves_E').is(':checked') ? 1 : 0;
        var viernes = $('#Viernes_E').is(':checked') ? 1 : 0;
        var sabado = $('#Sabado_E').is(':checked') ? 1 : 0;
        var domingo = $('#Domingo_E').is(':checked') ? 1 : 0;

        var Cargo = document.getElementById("Combo_Cargo_Edit").value;
        var Nacimiento = document.getElementById("DT_Nacimiento_Edit").value;
        var Aulas = document.getElementById("T_Aulas_Edit").value;

        if (Identificacion === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, Ingrese Identificacion',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }
    
        if (Especialidad === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, Seleccione Especialidad',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }

        if (Cargo === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, Seleccione Cargo',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }
    
        if (Turno === '') {
            Swal.fire({
                title: '¡Advertencia!',
                text: 'Por favor, Seleccione Turno',
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
            url: "maestros_edit_model.php",
            data: {
                Id_Registro:Id_Registro,
                Identificacion: Identificacion,
                Especialidad: Especialidad,
                Turno:Turno,
                sexo:sexo,
                Nombres: Nombres,
                Apellidos:Apellidos,
                Direccion:Direccion,
                Email:Email,
                Celular: Celular,
                horario:horario,
                lunes: lunes,
                martes: martes,
                miercoles: miercoles,
                jueves: jueves,
                viernes: viernes,
                sabado: sabado,
                domingo: domingo,
                Cargo:Cargo,
                Nacimiento:Nacimiento,
                Aulas:Aulas
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
                        window.location.href = 'maestros_lista.php';
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
            url: 'maestros_del.php', // Ajusta la URL según tu configuración
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


let tablaEstudiantes = null;

$(document).on('click', '.maestros-modal-btn', function () {
    const idMaestro = $(this).data('id-maestro');
    const nombres = $(this).data('nombres');
    const apellidos = $(this).data('apellidos');

    // Mostrar nombre del maestro
    $('#T_Nombres_Profesor').val(nombres + ' ' + apellidos);

    // Destruye y reemplaza tabla por completo
    if (tablaEstudiantes !== null) {
        tablaEstudiantes.destroy();
        tablaEstudiantes = null;
        $('#contenedorTablaEstudiantes').html(`
            <table id="tablaEstudiantes" class="table table-striped" style="width:100%">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>DNI</th>
                        <th>ESTUDIANTE</th>
                        <th>GRADO</th>
                        <th>SECCIÓN</th>
                        <th>TURNO</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `);
    }

    // Vuelve a crear el DataTable
    tablaEstudiantes = $('#tablaEstudiantes').DataTable({
        ajax: {
            url: 'maestros_estudiantes_no_asignados_model.php',
            type: 'POST',
            data: { id_maestro: idMaestro }
        },
        responsive: true,
        autoWidth: false,
        scrollX: false,
        columns: [
    {
        data: 'id_students',
        render: function (data) {
            return `
                <div class="text-center">
                    <input type="checkbox" class="form-check-input check-estudiante" value="${data}" 
                           style="transform: scale(1.5); cursor: pointer;">
                </div>`;
        },
        orderable: false,
        className: "text-center",
        width: "6%"
    },
    { data: 'curp', title: 'DNI', className: "text-center", width: "10%" },
    { data: 'alumno', title: 'ESTUDIANTE', className: "text-start", width: "38%" },
    { data: 'grado', title: 'GRADO', className: "text-center", width: "12%" },
    { data: 'seccion', title: 'SECCIÓN', className: "text-center", width: "12%" },
    { data: 'turno', title: 'TURNO', className: "text-center", width: "12%" }
]

    });

    $('#guardarAsignacion').data('id-maestro', idMaestro);
});



$('#guardarAsignacion').on('click', function () {
    const idMaestro = $(this).data('id-maestro');
    const seleccionados = [];

    $('.check-estudiante:checked').each(function () {
        seleccionados.push($(this).val());
    });

    if (seleccionados.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Aviso',
            text: 'Debe seleccionar al menos un estudiante.'
        });
        return;
    }

    $.ajax({
        url: 'maestros_lista_save_model.php',
        method: 'POST',
        data: {
            id_maestro: idMaestro,
            estudiantes: seleccionados
        },
        success: function (response) {
            Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: 'Estudiantes asignados correctamente.',
    confirmButtonText: 'Aceptar'
}).then(() => {
    $('#maestrosModal').modal('hide');
    
    // 🔧 Solución al problema de fondo opaco
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    tablaEstudiantes.ajax.reload();
});

        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar la asignación.'
            });
        }
    });
});

