$(document).ready(function(){
    $("#contactSpan").on("click",function(){
        $("#contactform").css("display","block");
    });
    $("#closeBtn").on("click",function(){
        $("#contactform").css("display","none");
    });
});