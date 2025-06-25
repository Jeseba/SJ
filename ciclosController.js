function Editar_Ciclo_Model() {
    var Id_Registro = document.getElementById("Id_Registro").value;
    var Ciclo = document.getElementById("T_Ciclo_Edit").value;
    var Inicia = document.getElementById("T_Inicia_Edit").value;
    var Termina = document.getElementById("T_Termina_Edit").value;
    // var Activo = $('#Activo').is(':checked') ? 1 : 0;


    if (Ciclo === '') {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, Ingrese Ciclo',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }




    $.ajax({
        type: "POST",
        url: "ciclos_edit_model.php",
        data: {
            Id_Registro:Id_Registro,
            Ciclo: Ciclo,
            Inicia: Inicia,
            Termina:Termina
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
                    window.location.href = 'ciclos_lista.php';
                }
            });

        },
        error: function(error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al Actualizar el registro',
                icon: 'error'
            });
        }
    });
}