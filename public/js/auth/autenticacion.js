class Autenticacion {
  autEmailPass (email, password) {
<<<<<<< HEAD
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      if (result.user.emailVerified) {
=======
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      if(result.user.emailVerified){
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
      } else {
        firebase.auth().signOut()
<<<<<<< HEAD
        Materialize.toast(
          `Por favor realiza la verificación de la cuenta`,
          5000
        )
      }
    })

=======
        Materialize.toast(`Por favor realiza la verificación de la cuenta ${result.user.displayName}`, 5000)
      }
    })
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, nombres) {
<<<<<<< HEAD
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
=======
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
        result.user.updateProfile({
          displayName: nombres
        })

        const configuracion = {
<<<<<<< HEAD
          url: 'https://blogeekplatzi-4836b.firebaseapp.com/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
=======
          url: 'http://localhost:3000/'
        }
        result.user.sendEmailVerification(configuracion).catch(() => {
          console.log(error)
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
          Materialize.toast(error.message, 4000)
        })

        firebase.auth().signOut()
<<<<<<< HEAD
=======
        Materialize.toast(`Bienvenido ${nombres}, debes realizar el proceso de verificación`, 4000)
        $('.modal').modal('close')
    })
    .catch((error) => {
      console.log(error)
      Materialize.toast(error.message, 4000)
    })
    
    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31

        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )

        $('.modal').modal('close')
      })
      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
<<<<<<< HEAD

    firebase.auth().signInWithPopup(provider).then(result => {
=======
    firebase.auth().signInWithPopup(provider).then((result) => {
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
<<<<<<< HEAD
    .catch(error =>{
      console.error(error)
      Materialize.toast(`Error al autenticarse con google: ${error} `, 4000)
=======
    .catch((error) => {
      console.log(error)
      Materialize.toast(`Error al autenticarse con google: ${error}`, 4000)
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
    })
  }

  authCuentaFacebook () {
<<<<<<< HEAD
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
=======
    const provider = new firebase.auth.FacebookAuthProvider()

    firebase.auth().signInWithPopup(provider).then((result) => {
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
    })
<<<<<<< HEAD
    .catch(error =>{
      console.error(error)
      Materialize.toast(`Error al autenticarse con facebook: ${error} `, 4000)
    })
=======
    .catch((error) => {
      console.log(error)
      Materialize.toast(`Error al autenticarse con Facebook: ${error}`, 4000)
    })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }

  authForgottenPassword(email) {
    const actionCodeSettings = {
      url: 'http://localhost:5500/public/'
    }
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
      .then(function() {
        Materialize.toast(`Hemos enviado un correo electrónico para restablecer la contraseña`, 4000);
      })
      .catch(function(error) {
        Materialize.toast(`${error}: Error al reestablecer contraseña`, 4000);
      });
  }
}
