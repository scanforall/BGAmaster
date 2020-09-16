$(function() {
// Inline popups

	$(".logoCitySelectLink").click(function(){
		$(".logoCitySelectContent").toggle("fast");
		return false;
	})
	$("body").on("click",function(){
		$(".logoCitySelectContent").hide("fast");
	})

});


$(window).scroll(function() {

	if ($(this).scrollTop() > 1){
		$('header').addClass("sticky");
	}

	else{
		$('header').removeClass("sticky");
	}

});