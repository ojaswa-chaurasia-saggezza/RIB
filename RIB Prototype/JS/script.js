$('.btn').click(function () {
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

if($(window).width()< 992)
{
  $('.btn').toggleClass("click");
  $('.sidebar').toggleClass("show");
}

