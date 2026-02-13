/* --- CONFIGURACIÓN INICIAL --- */
var currentCode = "";
var correctCode = "14022026"; // FECHA DE LA CONTRASEÑA
var audio = document.getElementById("love-song");

$(document).ready(function() {
  
  // 1. Iniciar animación de corazones de fondo
  createHearts();

  /* --- PANTALLA 1: EL CANDADO --- */
  $('#heart-lock').click(function() {
    $('#safe-modal').fadeIn();
    $('.main-center-container').fadeOut();
  });

  /* --- CONTROLADOR GLOBAL DE TECLADO --- */
  $(document).keydown(function(e) {
    if ($('#safe-modal').is(':visible')) {
        var key = e.key;
        if (key >= '0' && key <= '9') pressKey(key);
        else if (key === 'Backspace' || key === 'Delete') pressKey('C');
        else if (key === 'Enter') checkPassword();
    }
  });

  /* --- LÓGICA DEL MENÚ DE REGALOS --- */

  // A. BOTÓN CARTA (Abre el Libro 3D)
  $('#btn-letter').click(function() {
      $('#gift-menu-container').fadeOut();
      setTimeout(function(){
          $('#letter-container').fadeIn();
      }, 500);
      // La música de fondo sigue sonando suave
  });

  // B. BOTÓN MÚSICA (Abre la Pantalla de Música)
  $('#btn-music').click(function() {
      // 1. Ocultamos el menú
      $('#gift-menu-container').fadeOut();
      
      // 2. PAUSAMOS la música de fondo para escuchar el video
      if (!audio.paused) {
          audio.pause();
      }

      // 3. Mostramos la pantalla de música (con retraso suave)
      setTimeout(function(){
          $('#music-container').fadeIn();
      }, 500);
  });

  /* --- C. BOTÓN VOLVER AL MENÚ (CORREGIDO PARA GOOGLE DRIVE) --- */
  $('#back-from-music').click(function() {
      // 1. Ocultamos pantalla de música
      $('#music-container').fadeOut();
      
      // 2. DETENEMOS el video de Drive (Truco: recargar el src)
      // Como es un iframe, no podemos usar .pause(), así que lo reiniciamos
      var iframe = $('#yt-player');
      var url = iframe.attr('src');
      iframe.attr('src', ''); // Lo vaciamos momentáneamente
      iframe.attr('src', url); // Lo volvemos a poner (esto corta el audio)
      
      // 3. Volvemos al menú y REACTIVAMOS la música de fondo
      setTimeout(function(){
          $('#gift-menu-container').fadeIn();
          audio.volume = 0.2; // Volumen bajo
          playMusic();
      }, 500);
  });

  // D. BOTÓN FOTOS (Galería - Por ahora alerta)
  $('#btn-photos').click(function() {
      alert("📸 ¡Aquí irán nuestras fotos favoritas! (Próximamente)");
  });

  /* --- LÓGICA DEL LIBRO REALISTA (3D) --- */
  
 $(document).on('click', '#main-envelope', function() {
    $(this).toggleClass('open');
});

// Resetear la carta al volver al menú
$('#back-to-menu').click(function() {
    $('#main-envelope').removeClass('open');
    $('#letter-container').fadeOut();
    setTimeout(function(){
        $('#gift-menu-container').fadeIn();
    }, 500);
});

  // Volver al Menú Principal desde la Carta
  $('#back-to-menu').click(function() {
      // Cerramos el libro si está abierto
      $('.hardcover-book').removeClass('book-open');
      $('#realistic-book-btn').text("Abrir el libro");

      // Transición
      $('#letter-container').fadeOut();
      setTimeout(function(){
          $('#gift-menu-container').fadeIn();
      }, 500);
  });

});
/* --- LÓGICA DE LA CARTA --- */
$(document).on('click', '#main-envelope', function() {
    $(this).toggleClass('open');
});

// Resetear la carta al volver al menú
$('#back-to-menu').click(function() {
    $('#main-envelope').removeClass('open');
    $('#letter-container').fadeOut();
    setTimeout(function(){
        $('#gift-menu-container').fadeIn();
    }, 500);
}); // Fin del document.ready

/* --- FUNCIONES AUXILIARES --- */

function pressKey(key) {
  var screen = $('#screen-text');
  if (key === 'C') {
    currentCode = "";
    screen.text("DD / MM / AAAA");
    return;
  }
  if (screen.text() === "DD / MM / AAAA" || screen.text() === "Ups! No 💔" || screen.text() === "¡Te Amo! ❤") {
    currentCode = "";
  }
  if (currentCode.length < 8) {
    currentCode += key;
    screen.text(currentCode);
  }
}

function checkPassword() {
  var screen = $('#screen-text');
  if (currentCode === correctCode) {
    screen.text("¡Te Amo! ❤");
    screen.css("color", "#ff4351");
    
    setTimeout(function() {
      $('#safe-modal').fadeOut(); 
      
      setTimeout(function(){
        $('#gift-menu-container').fadeIn(); 
        
        // AQUÍ INICIA LA MÚSICA DE FONDO AUTOMÁTICAMENTE
        audio.volume = 0.2; // Volumen bajo constante (20%)
        playMusic();        
      }, 500);
      
    }, 1000);

  } else {
    screen.text("Ups! No 💔");
    screen.css("color", "red");
    currentCode = "";
    $('.safe-inner-wrapper').addClass('animated shake');
    setTimeout(function(){
       $('.safe-inner-wrapper').removeClass('animated shake');
       $('#screen-text').text("DD / MM / AAAA").css("color", "#ff4351");
    }, 1200);
  }
}

function playMusic() {
    var promise = audio.play();
    if (promise !== undefined) {
        promise.then(_ => {
            // Reproducción exitosa
        }).catch(error => {
            console.log("Autoplay bloqueado. Se requiere interacción.");
        });
    }
}

function createHearts() {
    setInterval(function() {
        var heart = $('<div class="floating-heart"></div>');
        var size = Math.random() * 20 + 10; 
        var leftPosition = Math.random() * 100;
        var duration = Math.random() * 5 + 5; 
        var opacity = Math.random() * 0.6 + 0.4; 
        var colorVar = Math.random() > 0.5 ? '#ff4351' : '#ff9a9e'; 

        heart.css({
            'width': size + 'px',
            'height': size + 'px',
            'left': leftPosition + '%',
            'animation-duration': duration + 's',
            'background-color': colorVar,
            'opacity': opacity,
            'filter': 'blur(' + (Math.random() * 1) + 'px)' 
        });

        $('#hearts-container').append(heart);

        setTimeout(function() {
            heart.remove();
        }, duration * 1000);

    }, 300); 
}