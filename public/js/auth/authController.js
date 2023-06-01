$(() => {    
    const objAuth = new Autenticacion()
    $("#authFB").click(() => objAuth.authCuentaFacebook());

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        // TODO : LLamar crear cuenta con email
        const auth = new Autenticacion()
        auth.crearCuentaEmailPass(email, password, nombres)
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        const auth = new Autenticacion()
        auth.authEmailPass(email, password)
    });

    $("#authGoogle").click(() => objAuth.authCuentaGoogle());

    //$("#authTwitter").click(() => //AUTH con Twitter);

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

    $("#passwordRecoveryButton").click(() => {
        const email = $('#passwordRecoveryInput').val();
        console.log(email)
        const auth = new Autenticacion()
        auth.authForgottenPassword(email)
    })
});
