$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  firebase.initializeApp(firebaseConfig);

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

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
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
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
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')   
  })

  $('#btnMisPost').click(() => {
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) 
    const user = firebase.auth().currentUser

    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) 
    }
  })
})
