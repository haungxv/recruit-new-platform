//新人登录
$(function () {
    $("#PASSWORD").keyup(function(event){
        if(event.keyCode ===13){
            $(".log_button").click();
        }
    });
    $(".log_button").click(function () {
        $.ajax({
            type: "POST",
            url: "/login",
            dataType: "json",
            data: {
                username: $("#NAME").val(),
                password: $("#PASSWORD").val()
            },
            success: function (r) {
                if (r.msg === "成功") {
                    if(r.data.right[0]==="new"){
                            var searchText= r.data.name;
                            var searchUrl =encodeURI("/new?searchText="+searchText);   //使用encodeURI编码
                            window.location.href =searchUrl;
                    }else if(r.data.right[0]==="admin"){
                        var searchText=r.data.name;
                        var searchUrl =encodeURI("/gly/welcome?searchText="+searchText);   //使用encodeURI编码
                        window.location.href =searchUrl;
                    }else{
                        var len=r.data.right.length;
                        if(len===1){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]);
                            window.location.href = searchUrl;
                        }
                        else if(len===2){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]);
                            window.location.href = searchUrl;
                        }
                        else if(len===3){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]+"&name_3="+r.data.right[2]);
                            window.location.href = searchUrl;
                        }
                        else if(len===4){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]+"&name_3="+r.data.right[2]+"&name_4="+r.data.right[3]);
                            window.location.href = searchUrl;
                        }
                        else if(len===5){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]+"&name_3="+r.data.right[2]+"&name_4="+r.data.right[3]+"&name_5="+r.data.right[4]);
                            window.location.href = searchUrl;
                        }
                        else if(len===6){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]+"&name_3="+r.data.right[2]+"&name_4="+r.data.right[3]+"&name_5="+r.data.right[4]+"&name_6="+r.data.right[5]);
                            window.location.href = searchUrl;
                        }
                        else if(len===7){
                            var searchUrl = encodeURI("/corrector/qs?name_1=" + r.data.right[0]+"&name_2="+r.data.right[1]+"&name_3="+r.data.right[2]+"&name_4="+r.data.right[3]+"&name_5="+r.data.right[4]+"&name_6="+r.data.right[5] +"&name_7="+r.data.right[6]);
                            window.location.href = searchUrl;
                        }
                    }
                }else if(r.msg!=="成功"){
                    alert(r.msg);

                }

            }
        })
    })
});
//新人注册
$(function () {
    var wait=60;
    function time(o) {
        if (wait === 0) {
            o.removeAttr("disabled");
            o.text("OBTAIN");
            wait = 60;
        } else {
            o.attr("disabled", true);
            o.text(wait);
            wait--;
            setTimeout(function() {
                    time(o)
                },
                1000)
        }
    }
    $(".phone_text").click(function () {
        if ($("#TEL").val() !== "") {
            if(wait===60){
                $.ajax({
                    type: "POST",
                    url: "/register/sendMsg",
                    dataType: "json",
                    data: {
                        phone: $("#TEL").val()
                    },
                    success: function (r) {
                        if (r.msg === "成功") {
                            time($(".phone_text"));
                            alert("验证码发送成功！如需再次发送，请60秒后再次点击！")

                        }else{
                            alert(r.msg);
                        }
                    }
                });

            }

        }else{
            alert("手机号码不能为空！");
        }

    });
    $(".outside3").click(function () {
        $.ajax({
            type: "POST",
            url: "/register",
            dataType: "json",
            data: {
                username: $("#register_NAME").val(),
                password: $("#register_PASSWORD").val(),
                repassword: $("#register_CONFIRM").val(),
                name: $("#register_REAL").val(),
                studentid: $("#register_NUMBER").val(),
                phone: $("#TEL").val(),
                vcode: $("#register_CODE").val()
            },
            success: function (r) {
                if (r.msg === "成功") {
                    alert("注册成功！");
                    $(".back_button").click();
                }else{
                    alert(r.msg);
                }
            }
        })
    })
});
//忘记密码发请求
$(function(){
    var wait1=60;
    function time_change(o) {
        if (wait1 === 0) {
            o.removeAttr("disabled");
            o.text("OBTAIN");
            wait1 = 60;
        } else {
            o.attr("disabled", true);
            o.text(wait1);
            wait1--;
            setTimeout(function() {
                    time_change(o)
                },
                1000)
        }
    }
    $(".forget_phone_text").click(function () {
        if ($("#forget_TEL").val() !== "") {
            if(wait1===60){
                $.ajax({
                    type: "POST",
                    url: "/cp/sendMsg",
                    dataType: "json",
                    data: {
                        phone: $("#forget_TEL").val()
                    },
                    success: function (r) {
                        if (r.msg === "成功") {
                            time_change($(".forget_phone_text"));
                            alert("验证码发送成功！")
                        }else{
                            alert(r.msg);
                        }
                    }
                });

            }
        }
        else{
            alert("手机号码不能为空！")
        }
    });
    $(".outside4_").click(function () {
        $.ajax({
            type: "POST",
            url: "/cp/changepwd",
            dataType: "json",
            data: {
                newpassword: $("#forget_PASSWORD").val(),
                renewpassword: $("#forget_CONFIRM").val(),
                phone: $("#forget_TEL").val(),
                vcode: $("#forget_CODE").val()
            },
            success: function (r) {
                if (r.msg === "成功") {
                    alert("修改密码成功！")
                }else{
                    alert(r.msg)
                }
            }
        })
    })
});
