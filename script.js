/* --- CONFIGURACIÓN INICIAL --- */
var currentCode = "";
var correctCode = "14022026"; // TU FECHA ESPECIAL
var audio = document.getElementById("love-song");

$(document).ready(function() {
  
  // Iniciar lluvia de corazones
  createHearts();

  /* --- PANTALLA 1: EL CANDADO --- */
  $('#heart-lock').click(function() {
    $('#safe-modal').css('display', 'flex').hide().fadeIn();
    $('.main-center-container').fadeOut();
  });

  /* --- CONTROLADOR DE TECLADO (PC) --- */
  $(document).keydown(function(e) {
    if ($('#safe-modal').is(':visible')) {
        var key = e.key;
        if (key >= '0' && key <= '9') pressKey(key);
        else if (key === 'Backspace' || key === 'Delete') pressKey('C');
        else if (key === 'Enter') checkPassword();
    }
  });

  /* --- LÓGICA DEL MENÚ DE REGALOS --- */

  // A. BOTÓN CARTA (Abre la pantalla del sobre)
  $('#btn-letter').click(function() {
      $('#gift-menu-container').fadeOut();
      setTimeout(function(){
          $('#letter-container').css('display', 'flex').hide().fadeIn();
          // Aseguramos que la carta empiece cerrada
          $('#main-envelope').removeClass('open');
          $('.paper-sheet').removeClass('centered-mode');
      }, 500);
  });

  // B. BOTÓN MÚSICA (Abre la pantalla del video)
  $('#btn-music').click(function() {
      $('#gift-menu-container').fadeOut();
      
      // Pausamos la música de fondo para escuchar el video
      if (!audio.paused) {
          audio.pause(); 
      }

      setTimeout(function(){
          $('#music-container').css('display', 'flex').hide().fadeIn();
      }, 500);
  });

  // C. BOTÓN FOTOS (Abre la Galería Polaroid) -- ¡NUEVO!
  $('#btn-photos').click(function() {
      $('#gift-menu-container').fadeOut();
      setTimeout(function(){
          $('#photos-container').css('display', 'flex').hide().fadeIn();
      }, 500);
  });

  /* --- BOTONES DE "VOLVER" --- */

  // 1. VOLVER DESDE MÚSICA
  $('#back-from-music').click(function() {
      $('#music-container').fadeOut();
      
      // Detener video (reset src)
      var iframe = $('#yt-player');
      var url = iframe.attr('src');
      iframe.attr('src', ''); 
      iframe.attr('src', url); 
      
      setTimeout(function(){
          $('#gift-menu-container').fadeIn();
          audio.volume = 0.2; 
          playMusic();
      }, 500);
  });

  // 2. VOLVER DESDE FOTOS -- ¡NUEVO!
  $('#back-from-photos').click(function() {
      $('#photos-container').fadeOut();
      setTimeout(function(){
          $('#gift-menu-container').fadeIn();
      }, 500);
  });

  /* --- LÓGICA DE LA CARTA (ANIMACIÓN) --- */
  
  // ABRIR
  $(document).on('click', '#main-envelope', function() {
      var envelope = $(this);
      if (!envelope.hasClass('open')) {
          envelope.addClass('open'); 
          setTimeout(function(){
               $('.paper-sheet').addClass('centered-mode');
          }, 600); 
      }
  });

  // CERRAR
  $('#back-to-menu').click(function(e) {
      e.stopPropagation(); 
      $('.paper-sheet').removeClass('centered-mode');
      
      setTimeout(function(){
          $('#main-envelope').removeClass('open');
          setTimeout(function(){
             $('#letter-container').fadeOut();
             $('#gift-menu-container').fadeIn();
          }, 600);
      }, 800);
  });

});

/* --- FUNCIONES AUXILIARES --- */

function pressKey(key) {
  var screen = $('#screen-text');
  if (key === 'C') {
    currentCode = "";
    screen.text("DD / MM / AAAA");
    return;
  }
  if (screen.text().length > 10 || screen.text() === "Ups! No 💔") {
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
        audio.volume = 0.2; 
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
        promise.then(_ => {}).catch(error => {
            console.log("Autoplay bloqueado.");
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
        setTimeout(function() { heart.remove(); }, duration * 1000);
    }, 300); 
}