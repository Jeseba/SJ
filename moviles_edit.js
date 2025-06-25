function registrarTurno() {
    // Obtén los valores del formulario
    var id_registro = $("#IdTurno").val();
    var movil = $("#t_movil").val();
    var instancia = $("#t_instancia").val();
    var token = $("#t_token").val();
  



               // Validación básica
               if (movil === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, ingrese # movil'
                });
                return;
            }

    $.ajax({
        url: 'moviles_save_edit.php',
        method: 'POST',
        data: {
            id_registro: id_registro,
            movil: movil,
            instancia:instancia,
            token:token
        },
        
        success: function (response) {
            if (response.trim().toLowerCase() === 'exito') {
                console.log('form recibió los datos');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Registro exitoso'
                }).then(function() {
                    // Redirige a tu página principal
                    window.location.href = 'moviles_lista.php';
                });
                // Puedes redirigir al usuario a otra página o realizar otras acciones después del registro exitoso
            } else if (response.trim().toLowerCase() === 'duplicado') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Seccion ya existe verifique nombre'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el Movil'
                });
            }
        }
        
    });
    
}
