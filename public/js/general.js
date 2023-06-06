$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  firebase.initializeApp(firebaseConfig)

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

  const messaging = firebase.messaging()

  // Registrar credenciales web
  messaging.usePublicVapidKey(
    'BMHOwTB0WQeNHOq1vaKDmsf8m4pfIuedGqkBYJrFKLsd3ES_Wt0qx82c1N9HlWtANA8pba3PuZcge5rz-z8iVlM'
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

  const post = new Post()
  post.consultarTodosPost()

  // Firebase observador del cambio de estado de auth
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#btnInicioEmail').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    } else {
      $('#btnInicioEmail').text('Iniciar Sesión')
      // $('#avatar').attr('src', 'imagenes/usuario.png')
      $('#avatar').css({ display: 'none'})
    }
  })

  // Evento boton inicio sesion
  $('#btnInicioEmail').click(() => {
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
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
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
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
    }
  })
})
