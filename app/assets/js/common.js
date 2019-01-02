$(function() {


//------------------------------acardeon---------------------------
  $(".block__content").slideUp("slow");
  $(".active .block__content").slideDown("slow");

  $(".block__header").on("click", function(){
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
      $(".block__content").slideUp("slow");
    }
    else {
      $(".active .block__content").slideUp("slow");
      $(".active").removeClass('active');
      $(this).parent().addClass('active');
      $(".active .block__content").slideDown("slow");
    }
  });

//------------------------------slider-----------------------------
  var swiper = new Swiper('.certificates__slider', {
    slidesPerView: 7,
    spaceBetween: 15,
    speed: 800,
    navigation: {
      nextEl: '.certificates-next',
      prevEl: '.certificates-prev',
    },
     breakpoints: {
      992: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      776: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });

  var swiper = new Swiper('.video__slider', {
    slidesPerView: 8,
    spaceBetween: 15,
    speed: 800,
    navigation: {
      nextEl: '.video-next',
      prevEl: '.video-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
        spaceBetween: 10
      },
      776: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      }
    }
  });

  var swiper = new Swiper('.calculation__slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      nextEl: '.calculation-next',
      prevEl: '.calculation-prev',
    },
  });


//------------------------------clokc-----------------------------
  var clock;
  $(document).ready(function() {
    var clock;
    clock = $('.clock').FlipClock({
          // clockFace: 'DailyCounter',
          // autoStart: false,
          // callbacks: {
          //   stop: function() {
          //     $('.message').html('The clock has stopped!')
          //   }
          // }
          language: 'ru'
      });
          
      clock.setTime(220880);
      clock.setCountdown(true);
      clock.start();
  });


//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('hamburger--active');
    $('.nav__responsive').toggleClass('nav__responsive--active');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+{7}[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        email: "Введите Ваш email",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          email: jQuery('.form-' + index).find("input[name=email]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>100){
          $('.nav').addClass('nav--active');
          $('.up').addClass('up--active');
          $('.free').addClass('free--active');
      }
      else if ($(this).scrollTop()<100){
          $('.nav').removeClass('nav--active');
          $('.up').removeClass('up--active');
          $('.free').removeClass('free--active');
      }
  });

//-------------------------скорость якоря---------------------------------------
  $(".click").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  });
  
});

//----------------------------------------preloader----------------------------------

  // $(window).on('load', function(){
  //   $('.preloader').delay(1000).fadeOut('slow');
  // });

