function registrarEstudiante() {
    // Obtén los valores del formulario
    var id_estudiante = $("#IdEstudiante").val();
    // var foto = $("#foto").val();
    var curp = $("#T_Curp").val();
    var rfc = $("#T_Rfc").val();
    var fecha_ingreso = $("#DT_Ingreso").val();
    var sexo = $("input[name='Sexo']:checked").val(); // Obtiene el valor del radio button seleccionado
    // console.log('Sexo:', sexo);
    var Id_Auxiliar = $("#Combo_Auxiliar").val(); // Obtiene el valor seleccionado

    // var sexo = document.querySelector('input[name="sexo"]:checked').value;

    var nombres = $("#T_Nombres").val();
    var apellidos = $("#T_Apellidos").val();
    var fecha_nacimiento = $("#DT_Nacimiento").val();
    var telefono = $("#T_Telefono").val();
    var Id_Grado = $("#Combo_Grado").val(); // Obtiene el valor seleccionado
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

        // // Validación básica
        // if (curp === '') {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'Por favor, ingrese Curp'
        //     });
        //     return;
        // }

               // Validación básica
            //    if (rfc === '') {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: 'Por favor, ingrese Rfc'
            //     });
            //     return;
            // }

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
                    text: 'Por favor, ingrese sexo'
                });
                return;
            }

            // Validación básica
            if (nombres === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, ingrese Nombres'
                });
                return;
            }

             // Validación básica
             if (apellidos === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, ingrese Apellidos'
                });
                return;
            }

             // Validación básica
            //  if (fecha_nacimiento === '') {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: 'Por favor, ingrese fecha de nacimiento'
            //     });
            //     return;
            // }

            // Validación básica
            if (telefono === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, ingrese telefono'
                });
                return;
            }
              // Validación básica
              if (Id_seccion === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, ingrese seccion'
                });
                return;
            }

             

               // Validación básica
               if (Id_Auxiliar === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, seleccione Auxiliar'
                });
                return;
            }
               // Validación básica
            //    if (Email === '') {
            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: 'Por favor, ingrese Email'
            //     });
            //     return;
            // }

    // Realiza la solicitud Ajax para insertar el registro
    // console.log('Enviando el form a procesar foto :' + foto);
    $.ajax({
        url: 'procesar_estudiante_edit.php',
        method: 'POST',
        data: {
            id_estudiante: id_estudiante,
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
            horario:horario,
            lunes: lunes,
            martes: martes,
            miercoles: miercoles,
            jueves: jueves,
            viernes: viernes,
            sabado: sabado,
            domingo: domingo,
            padre:padre,
            Email:Email
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
                    window.location.href = 'alumnos_lista.php';
                });
                // Puedes redirigir al usuario a otra página o realizar otras acciones después del registro exitoso
            } else if (response.trim().toLowerCase() === 'duplicado') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El estudiante ya existe verifique el DNI : ' + curp
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el Estudiante' + curp
                });
            }
        }
        
    });
    
}
