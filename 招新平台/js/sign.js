//登陆页面和注册页面的切换
$(function () {
    var register_button1 = $(".register_button1");
    var register_box = $(".register_box");
    var sign_box = $(".sign_box");
    var back_button = $(".back_button");
    var change_link = document.getElementById("change_link");
    register_button1.click(function () {
        if (sign_box.hasClass('active')) {
            register_box.addClass('active');
            sign_box.removeClass('active');
        }
    });
    back_button.click(function () {
        if (register_box.hasClass('active')) {
            register_box.removeClass('active');
            sign_box.addClass('active');
        }
    });
});
//忘记密码
$(function () {
    $(".forget_box").hide();
    $(".remember").click(function () {
        $(".forget_box").show();
        $(".forget_fade").attr("class", "forget_fade_");
    });
    $(".back_button_1").click(function () {
        $(".forget_box").hide();
        $(".forget_fade_").attr("class", "forget_fade");
    })
});
$(function(){
    $("#bback_white").hide();
    $(".logo_box_box").hide();
    $(".people_title").hide();
   $("#logo").click(function(){
     $(".logo_fade").attr("class","logo_fade_");
       $("#bback_white").show();
       $(".logo_box_box").show();
       $(".people_title").show();
   });
    $("#bback_white").click(function(){
        $("#bback_white").hide();
        $(".logo_box_box").hide();
        $(".logo_fade_").attr("class","logo_fade");
        $(".people_title").hide();
    })
});

