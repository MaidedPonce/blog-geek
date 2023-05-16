$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  firebase.initializeApp(varConfig)

<<<<<<< HEAD
  // Se registra el service worker
  navigator.serviceWorker
    .register('notificaciones-sw.js')
    .then(registro => {
      console.log('service worker registrado')
      firebase.messaging().useServiceWorker(registro)
    })
    .catch(error => {
      console.error(`Error al registrar el service worker => ${error}`)
    })
=======
  // Init Firebase nuevamente
  firebase.initializeApp(firebaseConfig);
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31

  const messaging = firebase.messaging()

  // Registrar credenciales web
  messaging.usePublicVapidKey(
    'BNXFobbKFCs-uAVxoPSqtgtm9GrVypZwx9n2PdS6GCqynO48xgPL0vUhX5hd9xgawFTRFzvfyYe0tt8f_IcL_-w'
  )

  // Solicitar permisos para las notificaciones
  messaging
    .requestPermission()
    .then(() => {
      console.log('permiso otorgado')
      return messaging.getToken()
    })
    .then(token => {
      console.log('token')
      console.log(token)
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })
      db
        .collection('tokens')
        .doc(token)
        .set({
          token: token
        })
        .catch(error => {
          console.error(`Error al insertar el token en la BD => ${error}`)
        })
    })
    .catch(error => {
      console.error(`Permiso no otorgado => ${error}`)
    })

  // Obtener el token cuando se refresca
  messaging.onTokenRefresh(() => {
    messaging.getToken().then(token => {
      console.log('token se ha renovado')
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })
      db
        .collection('tokens')
        .doc(token)
        .set({
          token: token
        })
        .catch(error => {
          console.error(`Error al insertar el token en la BD => ${error}`)
        })
    })
  })

  // Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payload => {
    console.log('mensaje en foreground')
    Materialize.toast(
      `Ya tenemos un nuevo post. Revísalo, se llama ${payload.data.titulo}`,
      6000
    )
  })

<<<<<<< HEAD
  const post = new Post()
  post.consultarTodosPost()

  // Firebase observador del cambio de estado de auth
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
=======
  // TODO: Listening real time
  const post = new Post()
  post.consultarTodosPost()
  // TODO: Firebase observador del cambio de estado
  // Funcion para manejar el estado
  $('#passwordForgotten').click(() => {
    $('.registro-formulario').css('display', 'none');
    var elementoConID = $('#signInForm');
    $('#registro-formulario2').append(elementoConID);
  })

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
      $('#btnInicioSesion').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })
<<<<<<< HEAD

  // Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`SignOut Correcto`, 4000)
        })
        .catch(error => {
          Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
        })
=======
  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion, abre un modal
  $('#btnInicioSesion').click(() => {
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
    const user = firebase.auth().currentUser

    if (user) {
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase.auth().signOut.then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast('Sign Out correcto', 4000)
      }).catch((error) => {
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
      })
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
<<<<<<< HEAD
    firebase
      .auth()
      .signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`SignOut correcto`, 4000)
      })
      .catch(error => {
        Materialize.toast(`Error al realizar SignOut ${error}`, 4000)
      })
=======
    firebase.auth().signOut()
    .then(() => {
      $('#avatar').attr('src', 'imagenes/usuario.png')
      Materialize.toast(`SignOut correcto`, 4000)
      const post = new Post()
      post.consultarTodosPost()
    })
    .catch(error => {
      Materialize.toast(`Error al realizar signout`, 4000)
    })
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
<<<<<<< HEAD
    const user = firebase.auth().currentUser
    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
=======
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) 
    const user = firebase.auth().currentUser

    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) 
>>>>>>> 2a7a67cbac12f147b53769b27130a5f041c32b31
    }
  })
})
