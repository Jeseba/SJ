function registrar_Auxiliar() {
    // Obtén los valores del formulario
    var id_registro = $("#IdTurno").val();
    var turno = $("#t_turno").val();
    var dni = $("#t_dni").val();

    


               // Validación básica
               if (turno === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor, Ingrese Cargo'
                });
                return;
            }

            
           
    $.ajax({
        url: 'auxiliares_save_edit.php',
        method: 'POST',
        data: {
            id_registro: id_registro,
            turno: turno,
            dni:dni
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
                    window.location.href = 'auxiliares_lista.php';
                });
                // Puedes redirigir al usuario a otra página o realizar otras acciones después del registro exitoso
            } else if (response.trim().toLowerCase() === 'duplicado') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'especialidad ya existe verifique nombre'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar el cargos'
                });
            }
        }
        
    });
    
}
