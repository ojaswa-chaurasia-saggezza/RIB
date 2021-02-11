// This file contains the JS code for all the files in the dashboard

//The functions below helps in the functioning of the side menu

$('nav .btn').click(function () {
  $(this).toggleClass("click");
  $('.sidebar').toggleClass("show");
});
$('.drop-btn').click(function () {
  $(this).siblings('ul').toggleClass("show");
  $(this).children('span').toggleClass("rotate");
});
$('nav ul li').click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  $(this).addClass("active").siblings().children().children().removeClass("active");
});

if ($(window).width() < 992) {
  $('nav .btn').toggleClass("click");
  $('.sidebar').toggleClass("show");
}

// This function would return the strength of the 
var passwordValidation = (pass) => {
  var strength = 1;
  var arr = [/.{8,16}/, /[a-z]+/, /[0-9]+/, /[A-Z]+/,/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/];
  jQuery.map(arr, function (regexp) {
    if (pass.match(regexp))
      strength++;
  });
  console.log(strength);
  return strength
}

