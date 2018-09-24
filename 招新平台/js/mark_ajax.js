/*************************************************************/
var group = new Array();
group["后台批改人"] = "background";
group["前端批改人"] = "front";
group["安卓批改人"] = "android";
group["IOS批改人"] = "ios";
group["运维批改人"] = "operation";
group["设计批改人"] = "design";
group["产品批改人"] = "product";
$(function () {
    /***********************************欢迎登陆******************************************/
    var html = "";
    var searchUrl = window.location.href;
    var searchData = searchUrl.split("&");
    var right_0 = searchData[0].split("=");
    var right_0_0;
    if (decodeURI(right_0[1]) === "background") {
        right_0_0 = "后台批改人"
    }
    else if (decodeURI(right_0[1]) === "front") {
        right_0_0 = "前端批改人"
    }
    else if (decodeURI(right_0[1]) === "android") {
        right_0_0 = "安卓批改人"
    }
    else if (decodeURI(right_0[1]) === "ios") {
        right_0_0 = "IOS批改人"
    }
    else if (decodeURI(right_0[1]) === "operation") {
        right_0_0 = "运维批改人"
    }
    else if (decodeURI(right_0[1]) === "design") {
        right_0_0 = "设计批改人"
    }
    else if (decodeURI(right_0[1]) === "product") {
        right_0_0 = "产品批改人"
    }
    html += " <li class=\"mark_people__ mark_people__one\"><div class=\"mark_people_one\">" + right_0_0 + "</div></li>";
    for (var i = 1; i < searchData.length; i++) {
        var right = searchData[i].split("=");
        var right_;
        if (decodeURI(right[1]) === "background") {
            right_ = "后台批改人"
        }
        else if (decodeURI(right[1]) === "front") {
            right_ = "前端批改人"
        }
        else if (decodeURI(right[1]) === "android") {
            right_ = "安卓批改人"
        }
        else if (decodeURI(right[1]) === "ios") {
            right_ = "IOS批改人"
        }
        else if (decodeURI(right[1]) === "operation") {
            right_ = "运维批改人"
        }
        else if (decodeURI(right[1]) === "design") {
            right_ = "设计批改人"
        }
        else if (decodeURI(right[1]) === "product") {
            right_ = "产品批改人"
        }
        html += "  <li class=\"mark_people__ mark_people___\"><div class=\"mark_people\">" + right_ + "</div></li>";
    }
    $(".mark_people_change").html(html);            //将搜索的数据显示在搜索页面的搜索框中
});
/***********************************批改人--题目(element-ui)*************************************/
$(function () {
    var question_name = $('.mark_people_one').text();
    $.ajax({
        type: "POST",
        url: "/corrector/getque",
        data: {
            level: "easy",
            group: group[question_name]
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = "";
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"easy_question_\">\n" +
                        "                <span class=\"easy_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='easy_question_detail' data-r='question_easy_" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadequestion_easy_" + i + "\"></div>\n" +
                        "            <div class=\"detail_box question_easy_" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_1\">\n" +
                        "                    <img data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' class=\"box_down_word_1\">点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_back\">取消</div>\n" +
                        "            </div>";
                }

                $(".easy_question").html(html);
                $(".easy_question_detail").click(function () {
                    var a = $(this).attr("data-r");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');
                });
                $(".box_back").click(function () {
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /************************************下载************************************/
                $(".box_down_1 img").click(function () {
                    var yn = $(this).data("yone");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
                $(".box_down_word_1").click(function () {
                    var yn = $(this).data("yone");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "/corrector/getque",
        data: {
            level: "common",
            group: group[question_name]
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = "";
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"middle_question_\">\n" +
                        "                <span class=\"middle_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='middle_question_detail' data-r='question_middle_" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadequestion_middle_" + i + "\"></div>\n" +
                        "            <div class=\"detail_box question_middle_" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_2\">\n" +
                        "                    <img data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' class=\"box_down_word_2\">点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_back\">取消</div>\n" +
                        "            </div>";
                }

                $(".middle_question").html(html);
                $(".middle_question_detail").click(function () {
                    var a = $(this).attr("data-r");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');
                });
                $(".box_back").click(function () {
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /************************************下载************************************/
                $(".box_down_2 img").click(function () {
                    var yn = $(this).data("yonm");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
                $(".box_down_word_2").click(function () {
                    var yn = $(this).data("yonm");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "/corrector/getque",
        data: {
            level: "hard",
            group: group[question_name]
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = "";
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"difficult_question_\">\n" +
                        "                <span class=\"difficult_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='difficult_question_detail' data-r='question_difficult_" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadequestion_difficult_" + i + "\"></div>\n" +
                        "            <div class=\"detail_box question_difficult_" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_3\">\n" +
                        "                    <img data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' class=\"box_down_word_3\">点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_back\">取消</div>\n" +
                        "            </div>";
                }

                $(".difficult_question").html(html);
                $(".difficult_question_detail").click(function () {
                    var a = $(this).attr("data-r");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');
                });
                $(".box_back").click(function () {
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /************************************下载************************************/
                $(".box_down_3 img").click(function () {
                    var yn = $(this).data("yond");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
                $(".box_down_word_3").click(function () {
                    var yn = $(this).data("yond");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("e");
                        var form = $("<form></form>");//定义一个form表单
                        form.attr("method", "POST");
                        form.attr("style", "display:none");
                        form.attr("action", "/downloadque");//URL
                        var input = $("<input type='text' name='qid' />");
                        input.attr("value", id);//问题的id号
                        form.append(input);
                        $("body").append(form);//将表单放置在web中
                        form.submit();//表单提交
                    }

                });
            }
        }
    });
    $(".left_").click(function () {
        if ($(".left_on").text() === "题目") {
            question_name = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "easy",
                    group: group[question_name]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"easy_question_\">\n" +
                                "                <span class=\"easy_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='easy_question_detail' id='question_easy_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_easy_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_easy_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_1\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' class=\"box_down_word_1\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".easy_question").html(html);
                        $(".easy_question_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/
                        $(".box_down_1 img").click(function () {
                            var yn = $(this).data("yone");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_1").click(function () {
                            var yn = $(this).data("yone");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "common",
                    group: group[question_name]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"middle_question_\">\n" +
                                "                <span class=\"middle_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='middle_question_detail' id='question_middle_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_middle_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_middle_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_2\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' class=\"box_down_word_2\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".middle_question").html(html);
                        $(".middle_question_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/
                        $(".box_down_2 img").click(function () {
                            var yn = $(this).data("yonm");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_2").click(function () {
                            var yn = $(this).data("yonm");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "hard",
                    group: group[question_name]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"difficult_question_\">\n" +
                                "                <span class=\"difficult_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='difficult_question_detail' id='question_difficult_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_difficult_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_difficult_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_3\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' class=\"box_down_word_3\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".difficult_question").html(html);
                        $(".difficult_question_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/

                        $(".box_down_3 img").click(function () {
                            var yn = $(this).data("yond");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_3").click(function () {
                            var yn = $(this).data("yond");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
        }
    })
});
/***********************************批改人--排行榜*************************************/
$(function () {
    $(".left_").click(function () {
        if ($(".left_on").text() === "排行榜") {
            var name_rank = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/list",
                data: {
                    "grade": "2018",
                    "group": group[name_rank]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else if (r.data.length <= 3) {
                        var name1 = r.data[0].name;
                        var number1 = r.data[0].studentid;
                        var score1 = r.data[0].tolscore;
                        var html1 = "<div class=\"rank_box\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name1 + "</span><span class=\"rank_number\">学号：" + number1 + "</span><span class=\"rank_score\">得分：" + score1 + "</span></div>\n";

                        for (var i = 1; i < r.data.length; i++) {
                            var name2 = r.data[i].name;
                            var number2 = r.data[i].studentid;
                            var score2 = r.data[i].tolscore;
                            html1 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name2 + "</span><span class=\"rank_number\">学号：" + number2 + "</span><span class=\"rank_score\">得分：" + score2 + "</span></div>"
                        }
                        $(".grade_1_box").html(html1);
                    }
                    else if (r.data.length > 3) {
                        var name3 = r.data[0].name;
                        var number3 = r.data[0].studentid;
                        var score3 = r.data[0].tolscore;
                        var html3 = " <div class=\"rank_box special\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name3 + "</span><span class=\"rank_number\">学号：" + number3 + "</span><span class=\"rank_score\">得分：" + score3 + "</span></div>";

                        for (var i = 1; i < 3; i++) {
                            var name4 = r.data[i].name;
                            var number4 = r.data[i].studentid;
                            var score4 = r.data[i].tolscore;
                            html3 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name4 + "</span><span class=\"rank_number\">学号：" + number4 + "</span><span class=\"rank_score\">得分：" + score4 + "</span></div>"
                        }

                        for (var j = 3; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var number = r.data[j].studentid;
                            var score = r.data[j].tolscore;
                            html3 += "<div class=\"rank_box \"><div class=\"rank_none\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name + "</span><span class=\"rank_number\">学号：" + number + "</span><span class=\"rank_score\">得分：" + score + "</span></div>"
                        }
                        $(".grade_1_box").html(html3);
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/list",
                data: {
                    "grade": "2017",
                    "group": group[name_rank]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else if (r.data.length <= 3) {
                        var name1 = r.data[0].name;
                        var number1 = r.data[0].studentid;
                        var score1 = r.data[0].tolscore;
                        var html1 = "<div class=\"rank_box\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name1 + "</span><span class=\"rank_number\">学号：" + number1 + "</span><span class=\"rank_score\">得分：" + score1 + "</span></div>\n";

                        for (var i = 1; i < r.data.length; i++) {
                            var name2 = r.data[i].name;
                            var number2 = r.data[i].studentid;
                            var score2 = r.data[i].tolscore;
                            html1 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name2 + "</span><span class=\"rank_number\">学号：" + number2 + "</span><span class=\"rank_score\">得分：" + score2 + "</span></div>"
                        }
                        $(".grade_2_box").html(html1);
                    }
                    else if (r.data.length > 3) {
                        var name3 = r.data[0].name;
                        var number3 = r.data[0].studentid;
                        var score3 = r.data[0].tolscore;
                        var html3 = " <div class=\"rank_box special\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name3 + "</span><span class=\"rank_number\">学号：" + number3 + "</span><span class=\"rank_score\">得分：" + score3 + "</span></div>";

                        for (var i = 1; i < 3; i++) {
                            var name4 = r.data[i].name;
                            var number4 = r.data[i].studentid;
                            var score4 = r.data[i].tolscore;
                            html3 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name4 + "</span><span class=\"rank_number\">学号：" + number4 + "</span><span class=\"rank_score\">得分：" + score4 + "</span></div>"
                        }

                        for (var j = 3; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var number = r.data[j].studentid;
                            var score = r.data[j].tolscore;
                            html3 += "<div class=\"rank_box \"><div class=\"rank_none\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name + "</span><span class=\"rank_number\">学号：" + number + "</span><span class=\"rank_score\">得分：" + score + "</span></div>"
                        }
                        $(".grade_2_box").html(html3);
                    }
                }
            })
        }
    })
});
/***********************************批改人--已批改(element-ui)*************************************/
$(function () {
    $(".left_").click(function () {
        if ($(".left_on").text() === "已批改") {
            var name_have = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "1",
                    "grade": "2018",
                    "group": group[name_have]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            html3 += "<div class=\"have_box\"><div class=\"have_none\">" + (j + 1) + "</div><span class=\"have_name\">姓名：" + name + "</span><span class=\"mark_have_question\">题目：" + question + "</span><span class=\"mark_have_detail\" id='mark_have_1" + j + "'>查看详情</span></div>" +
                                "  <div class=\"have_fade have_fademark_have_1" + j + "\"></div>\n" +
                                "            <div class=\"have_detail_box mark_have_1" + j + "\">\n" +
                                "                <div class=\"have_box_title\">批改详情</div>\n" +
                                "                <div class=\"have_detail_content_1\">\n" +
                                "                <div class=\"have_box_name\">姓名</div>\n" +
                                "                <div class=\"have_box_level\">等级</div>\n" +
                                "                <div class=\"have_box_many\">提交次数</div>\n" +
                                "                <div class=\"have_box_score\">得分</div>\n" +
                                "                <div class=\"have_box_comment\">评语</div>\n" +
                                "                <div class=\"have_box_change\">操作</div>";
                            for (var w = 0; w < r.data[j].detail.length; w++) {
                                var score__ = r.data[j].detail[w].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[j].detail[w].comment;
                                if (comment__ === null) comment__ = " ";
                                html3 += " <div class=\"have_box_name_\">" + name + "</div>\n" +
                                    "                    <div class=\"have_box_level_\">" + r.data[j].detail[w].level + "</div>\n" +
                                    "                    <div class=\"have_box_many_\">" + r.data[j].detail[w].times + "</div>\n" +
                                    "                    <div class=\"have_box_score_ score_" + r.data[j].detail[w].id + "\">" + score__ + "</div>\n" +
                                    "                    <div class=\"have_box_comment_ comment_" + r.data[j].detail[w].id + "\"  id='" + j + "_have_box_co_box_" + w + "'>" + comment__ + "</div>\n" +
                                    "                    <div class=\"have_box_do_\" data-fff='" + r.data[j].detail[w].id + "'>下载</div>\n" +
                                    "                    <div class='have_box_change_' id='" + r.data[j].detail[w].id + "'>修改</div>";
                            }
                            html3 += "                </div>\n" +
                                "                <div class=\"have_box_back\">BACK</div>" +
                                "</div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[j].detail.length; ++h) {
                                var comment___ = r.data[j].detail[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html3 += "<div class='have_box_comment_box " + j + "_have_box_co_box_" + h + "'>\n" +
                                    "                <div class='have_box_comment_title'>评价详情</div> \n" +
                                    "                <div class='have_box_comment_content comment_" + r.data[j].detail[h].id + "' ><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='have_box_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                            /*********************************修改分数或评语*************************************/
                            for (var p = 0; p < r.data[j].detail.length; ++p) {
                                var score__2 = r.data[j].detail[p].score;
                                if (score__2 === null) score__2 = " ";
                                var comment__2 = r.data[j].detail[p].comment;
                                if (comment__2 === null) comment__2 = " ";
                                html3 += "<div class='have_box_change_box  " + r.data[j].detail[p].id + "'>\n" +
                                    "                <div class='have_box_change_title'>修改分数或评价</div>\n" +
                                    "                                <div class='have_change_m'>修改分数：</div>\n" +
                                    "                                <input type='text' placeholder='" + score__2 + "' id='have_change_m" + r.data[j].detail[p].id + "'/>\n" +
                                    "                      <div class='have_change_c'>修改评语：   </div>\n" +
                                    "                      <textarea name='comment' placeholder='" + comment__2 + "' rows='2' id='have_change_c" + r.data[j].detail[p].id + "'></textarea>\n" +
                                    "                <div class='have_change_1_hand' data-ddd='" + r.data[j].detail[p].id + "'>HAND IN</div>\n" +
                                    "                <div class='have_change_back'>BACK</div>\n" +
                                    "                </div>";
                            }
                        }
                        /*********************************批改详情***********************************/
                        $(".have_grade_1_box").html(html3);
                        $(".mark_have_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".have_fade"+a).addClass("have_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".have_box_back").click(function () {
                            if ($(".have_detail_box").hasClass('active')) {
                                $(".have_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".have_fade_").removeClass("have_fade_")
                            }, 1000);
                        });
                        /*********************************查看详细评语*********************************/
                        $(".have_box_comment_box").hide();
                        $(".have_box_comment_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var a = $(this).attr("id");
                            $("." + a).show();
                        });
                        $(".have_box_comment_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_comment_box").hide();
                        });

                        /*****************************修改分数或评语********************************/
                        $(".have_box_change_box").hide();
                        $(".have_box_change_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var b = $(this).attr("id");
                            $("." + b).show();
                        });
                        $(".have_change_1_hand").click(function () {
                            var ii = $(this).data("ddd");
                            var score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).val();
                            if (score === "") {
                                score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).attr("placeholder")
                            }
                            var comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).val();
                            if (comment === '') {
                                comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).attr("placeholder")
                            }
                            $.ajax({
                                type: "POST",
                                url: "/corrector/fix",
                                data: {
                                    "id": ii,
                                    "score": score,
                                    "comment": comment
                                },
                                success: function (r) {
                                    if (r.msg === "成功") {
                                        alert("修改成功！");
                                        $(".have_change_back").click();
                                        $(".score_" + ii).text(score);
                                        $(".comment_" + ii).text(comment);
                                        $("#have_change_m" + ii).attr("placeholder", score);
                                        $("#have_change_c" + ii).attr("placeholder", comment);

                                    } else {
                                        alert(r.msg)
                                    }
                                }
                            })
                        });
                        $(".have_change_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_change_box").hide();
                            $("input[id*=have_change_m]").val("");
                            $("textarea[id*=have_change_c]").val("");
                        });
                        /************************************下载*************************************/
                        $(".have_box_do_").click(function () {
                            var id = $(this).attr("data-fff");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "1",
                    "grade": "2017",
                    "group": group[name_have]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            html3 += "<div class=\"have_box\"><div class=\"have_none\">" + (j + 1) + "</div><span class=\"have_name\">姓名：" + name + "</span><span class=\"mark_have_question\">题目：" + question + "</span><span class=\"mark_have_detail\" id='mark_have_2" + j + "'>查看详情</span></div>" +
                                "  <div class=\"have_fade have_fademark_have_2" + j + "\"></div>\n" +
                                "            <div class=\"have_detail_box mark_have_2" + j + "\">\n" +
                                "                <div class=\"have_box_title\">批改详情</div>\n" +
                                "                <div class=\"have_detail_content_1\">\n" +
                                "                <div class=\"have_box_name\">姓名</div>\n" +
                                "                <div class=\"have_box_level\">等级</div>\n" +
                                "                <div class=\"have_box_many\">提交次数</div>\n" +
                                "                <div class=\"have_box_score\">得分</div>\n" +
                                "                <div class=\"have_box_comment\">评语</div>\n" +
                                "                <div class=\"have_box_change\">操作</div>";
                            for (var w = 0; w < r.data[j].detail.length; w++) {
                                var score__ = r.data[j].detail[w].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[j].detail[w].comment;
                                if (comment__ === null) comment__ = " ";
                                html3 += " <div class=\"have_box_name_\">" + name + "</div>\n" +
                                    "                    <div class=\"have_box_level_\">" + r.data[j].detail[w].level + "</div>\n" +
                                    "                    <div class=\"have_box_many_\">" + r.data[j].detail[w].times + "</div>\n" +
                                    "                    <div class=\"have_box_score_ score_" + r.data[j].detail[w].id + "\">" + score__ + "</div>\n" +
                                    "                    <div class=\"have_box_comment_ comment_" + r.data[j].detail[w].id + "\"  id='" + j + "_have_box_co_box_" + w + "'>" + comment__ + "</div>\n" +
                                    "                    <div class=\"have_box_do_\" data-fff='" + r.data[j].detail[w].id + "'>下载</div>\n" +
                                    "                    <div class='have_box_change_' id='" + r.data[j].detail[w].id + "'>修改</div>";
                            }
                            html3 += "                </div>\n" +
                                "                <div class=\"have_box_back\">BACK</div>" +
                                "</div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[j].detail.length; ++h) {
                                var comment___ = r.data[j].detail[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html3 += "<div class='have_box_comment_box " + j + "_have_box_co_box_" + h + "'>\n" +
                                    "                <div class='have_box_comment_title'>评价详情</div> \n" +
                                    "                <div class='have_box_comment_content comment_" + r.data[j].detail[h].id + "' ><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='have_box_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                            /*********************************修改分数或评语*************************************/
                            for (var p = 0; p < r.data[j].detail.length; ++p) {
                                var score__2 = r.data[j].detail[p].score;
                                if (score__2 === null) score__2 = " ";
                                var comment__2 = r.data[j].detail[p].comment;
                                if (comment__2 === null) comment__2 = " ";
                                html3 += "<div class='have_box_change_box  " + r.data[j].detail[p].id + "'>\n" +
                                    "                <div class='have_box_change_title'>修改分数或评价</div>\n" +
                                    "                                <div class='have_change_m'>修改分数：</div>\n" +
                                    "                                <input type='text' placeholder='" + score__2 + "' id='have_change_m" + r.data[j].detail[p].id + "'/>\n" +
                                    "                      <div class='have_change_c'>修改评语：   </div>\n" +
                                    "                      <textarea name='comment' placeholder='" + comment__2 + "'  rows='2' id='have_change_c" + r.data[j].detail[p].id + "'></textarea>\n" +
                                    "                <div class='have_change_2_hand' data-ddd='" + r.data[j].detail[p].id + "'>HAND IN</div>\n" +
                                    "                <div class='have_change_back'>BACK</div>\n" +
                                    "                </div>";
                            }
                        }
                        /*********************************批改详情***********************************/
                        $(".have_grade_2_box").html(html3);
                        $(".mark_have_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".have_fade"+a).addClass("have_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".have_box_back").click(function () {
                            if ($(".have_detail_box").hasClass('active')) {
                                $(".have_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".have_fade_").removeClass("have_fade_")
                            }, 1000);
                        });
                        /*********************************查看详细评语*********************************/
                        $(".have_box_comment_box").hide();
                        $(".have_box_comment_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var a = $(this).attr("id");
                            $("." + a).show();
                        });
                        $(".have_box_comment_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_comment_box").hide();
                        });

                        /*****************************修改分数或评语********************************/
                        $(".have_box_change_box").hide();
                        $(".have_box_change_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var b = $(this).attr("id");
                            $("." + b).show();
                        });
                        $(".have_change_2_hand").click(function () {
                            var ii = $(this).data("ddd");
                            var score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).val();
                            if (score === "") {
                                score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).attr("placeholder")
                            }
                            var comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).val();
                            if (comment === '') {
                                comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).attr("placeholder")
                            }
                            $.ajax({
                                type: "POST",
                                url: "/corrector/fix",
                                data: {
                                    "id": ii,
                                    "score": score,
                                    "comment": comment
                                },
                                success: function (r) {
                                    if (r.msg === "成功") {
                                        alert("修改成功！");
                                        $(".have_change_back").click();
                                        $(".score_" + ii).text(score);
                                        $(".comment_" + ii).text(comment);
                                        $("#have_change_m" + ii).attr("placeholder", score);
                                        $("#have_change_c" + ii).attr("placeholder", comment);
                                    } else {
                                        alert(r.msg)
                                    }
                                }
                            })
                        });
                        $(".have_change_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_change_box").hide();
                            $("input[id*=have_change_m]").val("");
                            $("textarea[id*=have_change_c]").val("");
                        });
                        /************************************下载*************************************/
                        $(".have_box_do_").click(function () {
                            var id = $(this).attr("data-fff");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                    }
                }
            });
        }
    });
});
/***********************************批改人--未批改(element-ui)*************************************/
$(function () {
    $(".left_").click(function () {
        if ($(".left_on").text() === "未批改") {
            var name_not = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "0",
                    "grade": "2018",
                    "group": group[name_not]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            var description = r.data[j].description;
                            html3 += " <div class=\"not_box\" id='" + r.data[j].detail[0].id + "'><div class=\"not_none\">" + (j + 1) + "</div><span class=\"not_name\">姓名：" + name + "</span><span class=\"mark_not_question\">题目：" + question + "</span><span class=\"mark_not_mark\" data-q='not_2018_" + j + "'>批改</span></div>\n" +
                                "            <div class=\"not_fade not_fadenot_2018_"+j+"\"></div>\n" +
                                "            <div class=\"not_detail_box not_2018_" + j + "\">\n" +
                                "                <div class=\"not_detail_title\">" + question + "</div>\n" +
                                "                <div class=\"not_detail_content\"><div>" + description + "</div></div>\n" +
                                "                <div class=\"not_detail_score_box\">\n" +
                                "                <div class=\"not_detail_score\">填写分数：</div>\n" +
                                "                <input type=\"text\"  id=\"not_detail_score" + r.data[j].detail[0].id + "\"/>\n" +
                                "                <div class=\"not_score_alert\">分数区间为 0--100</div>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_down\">\n" +
                                "                    <img data-w='" + r.data[j].detail[0].id + "' src=\"../images/down.png\">\n" +
                                "                    <span data-w='" + r.data[j].detail[0].id + "' class=\"not_detail_down_word\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_comment_box\">\n" +
                                "                <div class=\"not_detail_comment\">填写评语：   </div>\n" +
                                "                <textarea name=\"comments\"  rows=\"2\" id=\"not_detail_comment" + r.data[j].detail[0].id + "\"></textarea>\n" +
                                "                </div>\n" +
                                "                <div data-z='" + r.data[j].detail[0].id + "' class=\"not_detail_1_hand\">提交</div>\n" +
                                "                <div  class=\"not_detail_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".not_grade_1_box").html(html3);
                        $(".mark_not_mark").click(function () {
                            var a = $(this).attr("data-q");
                            $(".not_fade"+a).addClass("not_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".not_detail_back").click(function () {
                            if ( $(".not_detail_box").hasClass('active')) {
                                $(".not_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".not_fade_").removeClass("not_fade_")
                            }, 1000);
                            $("input[id*=not_detail_score]").val("");
                            $("textarea[id*=not_detail_comment]").val("");
                        });
                        /********************************下载********************************/
                        $(".not_detail_down img").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        $(".not_detail_down_word").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        /**********************************批改人提交***************************************/
                        $(".not_detail_1_hand").click(function () {
                            var f = $(this).data("z");
                            var comment = $("#not_detail_comment" + f).val();
                            var score = $("#not_detail_score" + f).val();
                            if (score > 100 || score < 0) {
                                alert("分数区间为0--100!")
                            } else if (score === "") {
                                alert("分数不能为空！")
                            }
                            else {

                                $.ajax({
                                    type: "POST",
                                    url: "/corrector/fix",
                                    data: {
                                        "id": f,
                                        "score": score,
                                        "comment": comment
                                    },
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            $("#" + f).remove();
                                            alert("提交成功！")
                                        } else {
                                            alert(r.msg)
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "0",
                    "grade": "2017",
                    "group": group[name_not]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            var description = r.data[j].description;
                            html3 += " <div class=\"not_box\" id='" + r.data[j].detail[0].id + "'><div class=\"not_none\">" + (j + 1) + "</div><span class=\"not_name\">姓名：" + name + "</span><span class=\"mark_not_question\">题目：" + question + "</span><span class=\"mark_not_mark\" data-q='not_2017_" + j + "'>批改</span></div>\n" +
                                "            <div class=\"not_fade not_fadenot_2017_"+j+"\"></div>\n" +
                                "            <div class=\"not_detail_box not_2017_" + j + "\">\n" +
                                "                <div class=\"not_detail_title\">" + question + "</div>\n" +
                                "                <div class=\"not_detail_content\"><div>" + description + "</div></div>\n" +
                                "                <div class=\"not_detail_score_box\">\n" +
                                "                <div class=\"not_detail_score\">填写分数：</div>\n" +
                                "                <input type=\"text\"  id=\"not_detail_score" + r.data[j].detail[0].id + "\"/>\n" +
                                "                <div class=\"not_score_alert\">分数区间为 0--100</div>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_down\">\n" +
                                "                    <img data-w='" + r.data[j].detail[0].id + "' src=\"../images/down.png\">\n" +
                                "                    <span data-w='" + r.data[j].detail[0].id + "' class=\"not_detail_down_word\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_comment_box\">\n" +
                                "                <div class=\"not_detail_comment\">填写评语：   </div>\n" +
                                "                <textarea name=\"comments\"  rows=\"2\" id=\"not_detail_comment" + r.data[j].detail[0].id + "\"></textarea>\n" +
                                "                </div>\n" +
                                "                <div data-z='" + r.data[j].detail[0].id + "' class=\"not_detail_2_hand\">提交</div>\n" +
                                "                <div  class=\"not_detail_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".not_grade_2_box").html(html3);
                        $(".mark_not_mark").click(function () {
                            var a = $(this).attr("data-q");
                            $(".not_fade"+a).addClass("not_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".not_detail_back").click(function () {
                            if ( $(".not_detail_box").hasClass('active')) {
                                $(".not_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".not_fade_").removeClass("not_fade_")
                            }, 1000);
                            $("input[id*=not_detail_score]").val("");
                            $("textarea[id*=not_detail_comment]").val("");
                        });
                        /********************************下载********************************/
                        $(".not_detail_down img").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        $(".not_detail_down_word").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        /**********************************批改人提交***************************************/
                        $(".not_detail_2_hand").click(function () {
                            var f = $(this).data("z");
                            var comment = $("#not_detail_comment" + f).val();
                            var score = $("#not_detail_score" + f).val();
                            if (score > 100 || score < 0) {
                                alert("分数区间为0--100!")
                            } else if (score === "") {
                                alert("分数不能为空！")
                            }
                            else {

                                $.ajax({
                                    type: "POST",
                                    url: "/corrector/fix",
                                    data: {
                                        "id": f,
                                        "score": score,
                                        "comment": comment
                                    },
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            $("#" + f).remove();
                                            alert("提交成功！")

                                        } else {
                                            alert(r.msg)

                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
        }
    })
});
/***********************************切换批改方向(element-ui)**************************************/
$(function () {
    $(".mark_people").click(function () {
        var direction = $(this).text();
        $(this).text($(".mark_people_one").text());
        $(".mark_people_one").text(direction);
        $(".mark_people___").slideUp();
        if ($(".left_on").text() === "题目") {
            $(".easy_question").empty();
            $(".middle_question").empty();
            $(".difficult_question").empty();
            var change_question = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "easy",
                    group: group[change_question]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"easy_question_\">\n" +
                                "                <span class=\"easy_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='easy_question_detail' data-r='question_easy_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_easy_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_easy_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_1\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' class=\"box_down_word_1\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".easy_question").html(html);
                        $(".easy_question_detail").click(function () {
                            var a = $(this).attr("data-r");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/
                        $(".box_down_1 img").click(function () {
                            var yn = $(this).data("yone");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_1").click(function () {
                            var yn = $(this).data("yone");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "common",
                    group: group[change_question]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"middle_question_\">\n" +
                                "                <span class=\"middle_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='middle_question_detail' data-r='question_middle_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_middle_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_middle_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_2\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' class=\"box_down_word_2\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".middle_question").html(html);
                        $(".middle_question_detail").click(function () {
                            var a = $(this).attr("data-r");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/
                        $(".box_down_2 img").click(function () {
                            var yn = $(this).data("yonm");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_2").click(function () {
                            var yn = $(this).data("yonm");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/getque",
                data: {
                    level: "hard",
                    group: group[change_question]
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = "";
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"difficult_question_\">\n" +
                                "                <span class=\"difficult_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='difficult_question_detail' data-r='question_difficult_" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadequestion_difficult_" + i + "\"></div>\n" +
                                "            <div class=\"detail_box question_difficult_" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_3\">\n" +
                                "                    <img data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-e='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' class=\"box_down_word_3\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".difficult_question").html(html);
                        $(".difficult_question_detail").click(function () {
                            var a = $(this).attr("data-r");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /************************************下载************************************/
                        $(".box_down_3 img").click(function () {
                            var yn = $(this).data("yond");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                        $(".box_down_word_3").click(function () {
                            var yn = $(this).data("yond");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("e");
                                var form = $("<form></form>");//定义一个form表单
                                form.attr("method", "POST");
                                form.attr("style", "display:none");
                                form.attr("action", "/downloadque");//URL
                                var input = $("<input type='text' name='qid' />");
                                input.attr("value", id);//问题的id号
                                form.append(input);
                                $("body").append(form);//将表单放置在web中
                                form.submit();//表单提交
                            }

                        });
                    }
                }
            });
        }
        else if ($(".left_on").text() === "排行榜") {
            $(".grade_1_box").empty();
            $(".grade_2_box").empty();
            var change_rank = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/list",
                data: {
                    "grade": "2018",
                    "group": group[change_rank]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else if (r.data.length <= 3) {
                        var name1 = r.data[0].name;
                        var number1 = r.data[0].studentid;
                        var score1 = r.data[0].tolscore;
                        var html1 = "<div class=\"rank_box\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name1 + "</span><span class=\"rank_number\">学号：" + number1 + "</span><span class=\"rank_score\">得分：" + score1 + "</span></div>\n";

                        for (var i = 1; i < r.data.length; i++) {
                            var name2 = r.data[i].name;
                            var number2 = r.data[i].studentid;
                            var score2 = r.data[i].tolscore;
                            html1 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name2 + "</span><span class=\"rank_number\">学号：" + number2 + "</span><span class=\"rank_score\">得分：" + score2 + "</span></div>"
                        }
                        $(".grade_1_box").html(html1);
                    }
                    else if (r.data.length > 3) {
                        var name3 = r.data[0].name;
                        var number3 = r.data[0].studentid;
                        var score3 = r.data[0].tolscore;
                        var html3 = " <div class=\"rank_box special\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name3 + "</span><span class=\"rank_number\">学号：" + number3 + "</span><span class=\"rank_score\">得分：" + score3 + "</span></div>";

                        for (var i = 1; i < 3; i++) {
                            var name4 = r.data[i].name;
                            var number4 = r.data[i].studentid;
                            var score4 = r.data[i].tolscore;
                            html3 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name4 + "</span><span class=\"rank_number\">学号：" + number4 + "</span><span class=\"rank_score\">得分：" + score4 + "</span></div>"
                        }

                        for (var j = 3; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var number = r.data[j].studentid;
                            var score = r.data[j].tolscore;
                            html3 += "<div class=\"rank_box \"><div class=\"rank_none\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name + "</span><span class=\"rank_number\">学号：" + number + "</span><span class=\"rank_score\">得分：" + score + "</span></div>"
                        }
                        $(".grade_1_box").html(html3);
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/list",
                data: {
                    "grade": "2017",
                    "group": group[change_rank]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else if (r.data.length <= 3) {
                        var name1 = r.data[0].name;
                        var number1 = r.data[0].studentid;
                        var score1 = r.data[0].tolscore;
                        var html1 = "<div class=\"rank_box\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name1 + "</span><span class=\"rank_number\">学号：" + number1 + "</span><span class=\"rank_score\">得分：" + score1 + "</span></div>\n";

                        for (var i = 1; i < r.data.length; i++) {
                            var name2 = r.data[i].name;
                            var number2 = r.data[i].studentid;
                            var score2 = r.data[i].tolscore;
                            html1 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name2 + "</span><span class=\"rank_number\">学号：" + number2 + "</span><span class=\"rank_score\">得分：" + score2 + "</span></div>"
                        }
                        $(".grade_2_box").html(html1);
                    }
                    else if (r.data.length > 3) {
                        var name3 = r.data[0].name;
                        var number3 = r.data[0].studentid;
                        var score3 = r.data[0].tolscore;
                        var html3 = " <div class=\"rank_box special\"><div class=\"rank_circle\">1</div><span class=\"rank_name\">姓名：" + name3 + "</span><span class=\"rank_number\">学号：" + number3 + "</span><span class=\"rank_score\">得分：" + score3 + "</span></div>";

                        for (var i = 1; i < 3; i++) {
                            var name4 = r.data[i].name;
                            var number4 = r.data[i].studentid;
                            var score4 = r.data[i].tolscore;
                            html3 += " <div class=\"rank_box \"><div class=\"rank_circle\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name4 + "</span><span class=\"rank_number\">学号：" + number4 + "</span><span class=\"rank_score\">得分：" + score4 + "</span></div>"
                        }

                        for (var j = 3; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var number = r.data[j].studentid;
                            var score = r.data[j].tolscore;
                            html3 += "<div class=\"rank_box \"><div class=\"rank_none\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name + "</span><span class=\"rank_number\">学号：" + number + "</span><span class=\"rank_score\">得分：" + score + "</span></div>"
                        }
                        $(".grade_2_box").html(html3);
                    }
                }
            })
        }
        else if ($(".left_on").text() === "已批改") {
            $(".have_grade_1_box").empty();
            $(".have_grade_2_box").empty();
            var change_have = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "1",
                    "grade": "2018",
                    "group": group[change_have]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            html3 += "<div class=\"have_box\"><div class=\"have_none\">" + (j + 1) + "</div><span class=\"have_name\">姓名：" + name + "</span><span class=\"mark_have_question\">题目：" + question + "</span><span class=\"mark_have_detail\" id='mark_have_1" + j + "'>查看详情</span></div>" +
                                "  <div class=\"have_fade have_fademark_have_1" + j + "\"></div>\n" +
                                "            <div class=\"have_detail_box mark_have_1" + j + "\">\n" +
                                "                <div class=\"have_box_title\">批改详情</div>\n" +
                                "                <div class=\"have_detail_content_1\">\n" +
                                "                <div class=\"have_box_name\">姓名</div>\n" +
                                "                <div class=\"have_box_level\">等级</div>\n" +
                                "                <div class=\"have_box_many\">提交次数</div>\n" +
                                "                <div class=\"have_box_score\">得分</div>\n" +
                                "                <div class=\"have_box_comment\">评语</div>\n" +
                                "                <div class=\"have_box_change\">操作</div>";
                            for (var w = 0; w < r.data[j].detail.length; w++) {
                                var score__ = r.data[j].detail[w].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[j].detail[w].comment;
                                if (comment__ === null) comment__ = " ";
                                html3 += " <div class=\"have_box_name_\">" + name + "</div>\n" +
                                    "                    <div class=\"have_box_level_\">" + r.data[j].detail[w].level + "</div>\n" +
                                    "                    <div class=\"have_box_many_\">" + r.data[j].detail[w].times + "</div>\n" +
                                    "                    <div class=\"have_box_score_ score_" + r.data[j].detail[w].id + "\">" + score__ + "</div>\n" +
                                    "                    <div class=\"have_box_comment_ comment_" + r.data[j].detail[w].id + "\"  id='" + j + "_have_box_co_box_" + w + "'>" + comment__ + "</div>\n" +
                                    "                    <div class=\"have_box_do_\" data-fff='" + r.data[j].detail[w].id + "'>下载</div>\n" +
                                    "                    <div class='have_box_change_' id='" + r.data[j].detail[w].id + "'>修改</div>";
                            }
                            html3 += "                </div>\n" +
                                "                <div class=\"have_box_back\">BACK</div>" +
                                "</div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[j].detail.length; ++h) {
                                var comment___ = r.data[j].detail[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html3 += "<div class='have_box_comment_box " + j + "_have_box_co_box_" + h + "'>\n" +
                                    "                <div class='have_box_comment_title'>评价详情</div> \n" +
                                    "                <div class='have_box_comment_content comment_" + r.data[j].detail[h].id + "' ><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='have_box_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                            /*********************************修改分数或评语*************************************/
                            for (var p = 0; p < r.data[j].detail.length; ++p) {
                                var score__2 = r.data[j].detail[p].score;
                                if (score__2 === null) score__2 = " ";
                                var comment__2 = r.data[j].detail[p].comment;
                                if (comment__2 === null) comment__2 = " ";
                                html3 += "<div class='have_box_change_box  " + r.data[j].detail[p].id + "'>\n" +
                                    "                <div class='have_box_change_title'>修改分数或评价</div>\n" +
                                    "                                <div class='have_change_m'>修改分数：</div>\n" +
                                    "                                <input type='text' placeholder='" + score__2 + "' id='have_change_m" + r.data[j].detail[p].id + "'/>\n" +
                                    "                      <div class='have_change_c'>修改评语：   </div>\n" +
                                    "                      <textarea name='comment' placeholder='" + comment__2 + "' rows='2' id='have_change_c" + r.data[j].detail[p].id + "'></textarea>\n" +
                                    "                <div class='have_change_1_hand' data-ddd='" + r.data[j].detail[p].id + "'>HAND IN</div>\n" +
                                    "                <div class='have_change_back'>BACK</div>\n" +
                                    "                </div>";
                            }
                        }
                        /*********************************批改详情***********************************/
                        $(".have_grade_1_box").html(html3);
                        $(".mark_have_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".have_fade"+a).addClass("have_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".have_box_back").click(function () {
                            if ($(".have_detail_box").hasClass('active')) {
                                $(".have_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".have_fade_").removeClass("have_fade_")
                            }, 1000);
                        });
                        /*********************************查看详细评语*********************************/
                        $(".have_box_comment_box").hide();
                        $(".have_box_comment_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var a = $(this).attr("id");
                            $("." + a).show();
                        });
                        $(".have_box_comment_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_comment_box").hide();
                        });

                        /*****************************修改分数或评语********************************/
                        $(".have_box_change_box").hide();
                        $(".have_box_change_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var b = $(this).attr("id");
                            $("." + b).show();
                        });
                        $(".have_change_1_hand").click(function () {
                            var ii = $(this).data("ddd");
                            var score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).val();
                            if (score === "") {
                                score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).attr("placeholder")
                            }
                            var comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).val();
                            if (comment === '') {
                                comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).attr("placeholder")
                            }
                            $.ajax({
                                type: "POST",
                                url: "/corrector/fix",
                                data: {
                                    "id": ii,
                                    "score": score,
                                    "comment": comment
                                },
                                success: function (r) {
                                    if (r.msg === "成功") {
                                        alert("修改成功！");
                                        $(".have_change_back").click();
                                        $(".score_" + ii).text(score);
                                        $(".comment_" + ii).text(comment);
                                        $("#have_change_m" + ii).attr("placeholder", score);
                                        $("#have_change_c" + ii).attr("placeholder", comment);
                                    } else {
                                        alert(r.msg)

                                    }
                                }
                            })
                        });
                        $(".have_change_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_change_box").hide();
                            $("input[id*=have_change_m]").val("");
                            $("textarea[id*=have_change_c]").val("");
                        });
                        /************************************下载*************************************/
                        $(".have_box_do_").click(function () {
                            var id = $(this).attr("data-fff");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "1",
                    "grade": "2017",
                    "group": group[change_have]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            html3 += "<div class=\"have_box\"><div class=\"have_none\">" + (j + 1) + "</div><span class=\"have_name\">姓名：" + name + "</span><span class=\"mark_have_question\">题目：" + question + "</span><span class=\"mark_have_detail\" id='mark_have_2" + j + "'>查看详情</span></div>" +
                                "  <div class=\"have_fade have_fademark_have_2" + j + "\"></div>\n" +
                                "            <div class=\"have_detail_box mark_have_2" + j + "\">\n" +
                                "                <div class=\"have_box_title\">批改详情</div>\n" +
                                "                <div class=\"have_detail_content_1\">\n" +
                                "                <div class=\"have_box_name\">姓名</div>\n" +
                                "                <div class=\"have_box_level\">等级</div>\n" +
                                "                <div class=\"have_box_many\">提交次数</div>\n" +
                                "                <div class=\"have_box_score\">得分</div>\n" +
                                "                <div class=\"have_box_comment\">评语</div>\n" +
                                "                <div class=\"have_box_change\">操作</div>";
                            for (var w = 0; w < r.data[j].detail.length; w++) {
                                var score__ = r.data[j].detail[w].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[j].detail[w].comment;
                                if (comment__ === null) comment__ = " ";
                                html3 += " <div class=\"have_box_name_\">" + name + "</div>\n" +
                                    "                    <div class=\"have_box_level_\">" + r.data[j].detail[w].level + "</div>\n" +
                                    "                    <div class=\"have_box_many_\">" + r.data[j].detail[w].times + "</div>\n" +
                                    "                    <div class=\"have_box_score_ score_" + r.data[j].detail[w].id + "\">" + score__ + "</div>\n" +
                                    "                    <div class=\"have_box_comment_ comment_" + r.data[j].detail[w].id + "\"  id='" + j + "_have_box_co_box_" + w + "'>" + comment__ + "</div>\n" +
                                    "                    <div class=\"have_box_do_\" data-fff='" + r.data[j].detail[w].id + "'>下载</div>\n" +
                                    "                    <div class='have_box_change_' id='" + r.data[j].detail[w].id + "'>修改</div>";
                            }
                            html3 += "                </div>\n" +
                                "                <div class=\"have_box_back\">BACK</div>" +
                                "</div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[j].detail.length; ++h) {
                                var comment___ = r.data[j].detail[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html3 += "<div class='have_box_comment_box " + j + "_have_box_co_box_" + h + "'>\n" +
                                    "                <div class='have_box_comment_title'>评价详情</div> \n" +
                                    "                <div class='have_box_comment_content comment_" + r.data[j].detail[h].id + "' ><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='have_box_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                            /*********************************修改分数或评语*************************************/
                            for (var p = 0; p < r.data[j].detail.length; ++p) {
                                var score__2 = r.data[j].detail[p].score;
                                if (score__2 === null) score__2 = " ";
                                var comment__2 = r.data[j].detail[p].comment;
                                if (comment__2 === null) comment__2 = " ";
                                html3 += "<div class='have_box_change_box  " + r.data[j].detail[p].id + "'>\n" +
                                    "                <div class='have_box_change_title'>修改分数或评价</div>\n" +
                                    "                                <div class='have_change_m'>修改分数：</div>\n" +
                                    "                                <input type='text' placeholder='" + score__2 + "' id='have_change_m" + r.data[j].detail[p].id + "'/>\n" +
                                    "                      <div class='have_change_c'>修改评语：   </div>\n" +
                                    "                      <textarea name='comment' placeholder='" + comment__2 + "' rows='2' id='have_change_c" + r.data[j].detail[p].id + "'></textarea>\n" +
                                    "                <div class='have_change_2_hand' data-ddd='" + r.data[j].detail[p].id + "'>HAND IN</div>\n" +
                                    "                <div class='have_change_back'>BACK</div>\n" +
                                    "                </div>";
                            }
                        }
                        /*********************************批改详情***********************************/
                        $(".have_grade_2_box").html(html3);
                        $(".mark_have_detail").click(function () {
                            var a = $(this).attr("id");
                            $(".have_fade"+a).addClass("have_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".have_box_back").click(function () {
                            if ($(".have_detail_box").hasClass('active')) {
                                $(".have_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".have_fade_").removeClass("have_fade_")
                            }, 1000);
                        });
                        /*********************************查看详细评语*********************************/
                        $(".have_box_comment_box").hide();
                        $(".have_box_comment_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var a = $(this).attr("id");
                            $("." + a).show();
                        });
                        $(".have_box_comment_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_comment_box").hide();
                        });

                        /*****************************修改分数或评语********************************/
                        $(".have_box_change_box").hide();
                        $(".have_box_change_").click(function () {
                            $(".have_fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.6)',
                            });
                            var b = $(this).attr("id");
                            $("." + b).show();
                        });
                        $(".have_change_2_hand").click(function () {
                            var ii = $(this).attr("data-ddd");
                            var score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).val();
                            if (score === "") {
                                score = $(this).parent(".have_box_change_box").find("#have_change_m" + ii).attr("placeholder")
                            }
                            var comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).val();
                            if (comment === '') {
                                comment = $(this).parent(".have_box_change_box").find("#have_change_c" + ii).attr("placeholder")
                            }
                            $.ajax({
                                type: "POST",
                                url: "/corrector/fix",
                                data: {
                                    "id": ii,
                                    "score": score,
                                    "comment": comment
                                },
                                success: function (r) {
                                    if (r.msg === "成功") {
                                        alert("修改成功！");
                                        $(".have_change_back").click();
                                        $(".score_" + ii).text(score);
                                        $(".comment_" + ii).text(comment);
                                        $("#have_change_m" + ii).attr("placeholder", score);
                                        $("#have_change_c" + ii).attr("placeholder", comment);
                                    } else {
                                        alert(r.msg)
                                    }
                                }
                            })
                        });
                        $(".have_change_back").click(function () {
                            $(".have_fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".have_box_change_box").hide();
                            $("input[id*=have_change_m]").val("");
                            $("textarea[id*=have_change_c]").val("");
                        });
                        /************************************下载*************************************/
                        $(".have_box_do_").click(function () {
                            var id = $(this).attr("data-fff");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                    }
                }
            });
        }
        else if ($(".left_on").text() === "未批改") {
            $(".not_grade_1_box").empty();
            $(".not_grade_2_box").empty();
            var change_not = $('.mark_people_one').text();
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "0",
                    "grade": "2018",
                    "group": group[change_not]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            var description = r.data[j].description;
                            html3 += " <div class=\"not_box\" id='" + r.data[j].detail[0].id + "'><div class=\"not_none\">" + (j + 1) + "</div><span class=\"not_name\">姓名：" + name + "</span><span class=\"mark_not_question\">题目：" + question + "</span><span class=\"mark_not_mark\" data-q='not_2018_" + j + "'>批改</span></div>\n" +
                                "            <div class=\"not_fade not_fadenot_2018_"+j+"\"></div>\n" +
                                "            <div class=\"not_detail_box not_2018_" + j + "\">\n" +
                                "                <div class=\"not_detail_title\">" + question + "</div>\n" +
                                "                <div class=\"not_detail_content\"><div>" + description + "</div></div>\n" +
                                "                <div class=\"not_detail_score_box\">\n" +
                                "                <div class=\"not_detail_score\">填写分数：</div>\n" +
                                "                <input type=\"text\"  id=\"not_detail_score" + r.data[j].detail[0].id + "\"/>\n" +
                                "                <div class=\"not_score_alert\">分数区间为 0--100</div>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_down\">\n" +
                                "                    <img data-w='" + r.data[j].detail[0].id + "' src=\"../images/down.png\">\n" +
                                "                    <span data-w='" + r.data[j].detail[0].id + "' class=\"not_detail_down_word\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_comment_box\">\n" +
                                "                <div class=\"not_detail_comment\">填写评语：   </div>\n" +
                                "                <textarea name=\"comments\"  rows=\"2\" id=\"not_detail_comment" + r.data[j].detail[0].id + "\"></textarea>\n" +
                                "                </div>\n" +
                                "                <div data-z='" + r.data[j].detail[0].id + "' class=\"not_detail_1_hand\">提交</div>\n" +
                                "                <div  class=\"not_detail_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".not_grade_1_box").html(html3);
                        $(".mark_not_mark").click(function () {
                            var a = $(this).attr("data-q");
                            $(".not_fade"+a).addClass("not_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".not_detail_back").click(function () {
                            if ( $(".not_detail_box").hasClass('active')) {
                                $(".not_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".not_fade_").removeClass("not_fade_")
                            }, 1000);
                            $("input[id*=not_detail_score]").val("");
                            $("textarea[id*=not_detail_comment]").val("");
                        });
                        /********************************下载********************************/
                        $(".not_detail_down img").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        $(".not_detail_down_word").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        /**********************************批改人提交***************************************/
                        $(".not_detail_1_hand").click(function () {
                            var f = $(this).data("z");
                            var comment = $("#not_detail_comment" + f).val();
                            var score = $("#not_detail_score" + f).val();
                            if (score > 100 || score < 0) {
                                alert("分数区间为0--100!")
                            } else if (score === "") {
                                alert("分数不能为空！")
                            }
                            else {
                                $.ajax({
                                    type: "POST",
                                    url: "/corrector/fix",
                                    data: {
                                        "id": f,
                                        "score": score,
                                        "comment": comment
                                    },
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            $("#" + f).remove();
                                            alert("提交成功！")

                                        } else {
                                            alert(r.msg)

                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/corrector/co",
                data: {
                    "status": "0",
                    "grade": "2017",
                    "group": group[change_not]
                },
                success: function (r) {
                    if (r.data.length < 1) return false;
                    else {
                        var html3 = "";
                        for (var j = 0; j < r.data.length; j++) {
                            var name = r.data[j].name;
                            var question = r.data[j].qname;
                            var description = r.data[j].description;
                            html3 += " <div class=\"not_box\" id='" + r.data[j].detail[0].id + "'><div class=\"not_none\">" + (j + 1) + "</div><span class=\"not_name\">姓名：" + name + "</span><span class=\"mark_not_question\">题目：" + question + "</span><span class=\"mark_not_mark\" data-q='not_2017_" + j + "'>批改</span></div>\n" +
                                "            <div class=\"not_fade not_fadenot_2017_"+j+"\"></div>\n" +
                                "            <div class=\"not_detail_box not_2017_" + j + "\">\n" +
                                "                <div class=\"not_detail_title\">" + question + "</div>\n" +
                                "                <div class=\"not_detail_content\"><div>" + description + "</div></div>\n" +
                                "                <div class=\"not_detail_score_box\">\n" +
                                "                <div class=\"not_detail_score\">填写分数：</div>\n" +
                                "                <input type=\"text\"  id=\"not_detail_score" + r.data[j].detail[0].id + "\"/>\n" +
                                "                <div class=\"not_score_alert\">分数区间为 0--100</div>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_down\">\n" +
                                "                    <img data-w='" + r.data[j].detail[0].id + "' src=\"../images/down.png\">\n" +
                                "                    <span data-w='" + r.data[j].detail[0].id + "' class=\"not_detail_down_word\">点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"not_detail_comment_box\">\n" +
                                "                <div class=\"not_detail_comment\">填写评语：   </div>\n" +
                                "                <textarea name=\"comments\"  rows=\"2\" id=\"not_detail_comment" + r.data[j].detail[0].id + "\"></textarea>\n" +
                                "                </div>\n" +
                                "                <div data-z='" + r.data[j].detail[0].id + "' class=\"not_detail_2_hand\">提交</div>\n" +
                                "                <div  class=\"not_detail_back\">取消</div>\n" +
                                "            </div>";
                        }

                        $(".not_grade_2_box").html(html3);
                        $(".mark_not_mark").click(function () {
                            var a = $(this).attr("data-q");
                            $(".not_fade"+a).addClass("not_fade_");
                            $("." + a).addClass('active');
                        });
                        $(".not_detail_back").click(function () {
                            if ( $(".not_detail_box").hasClass('active')) {
                                $(".not_detail_box").removeClass('active');
                            }
                            setTimeout(function(){
                                $(".not_fade_").removeClass("not_fade_")
                            }, 1000);
                            $("input[id*=not_detail_score]").val("");
                            $("textarea[id*=not_detail_comment]").val("");
                        });
                        /********************************下载********************************/
                        $(".not_detail_down img").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        $(".not_detail_down_word").click(function () {
                            var id = $(this).attr("data-w");
                            var form = $("<form></form>");//定义一个form表单
                            form.attr("method", "POST");
                            form.attr("style", "display:none");
                            form.attr("action", "/download");//URL
                            var input = $("<input type='text' name='id' />");
                            input.attr("value", id);//问题的id号
                            form.append(input);
                            $("body").append(form);//将表单放置在web中
                            form.submit();//表单提交
                        });
                        /**********************************批改人提交***************************************/
                        $(".not_detail_2_hand").click(function () {
                            var f = $(this).data("z");
                            var comment = $("#not_detail_comment" + f).val();
                            var score = $("#not_detail_score" + f).val();
                            if (score > 100 || score < 0) {
                                alert("分数区间为0--100!")
                            } else if (score === "") {
                                alert("分数不能为空！")
                            }
                            else {

                                $.ajax({
                                    type: "POST",
                                    url: "/corrector/fix",
                                    data: {
                                        "id": f,
                                        "score": score,
                                        "comment": comment
                                    },
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            $("#" + f).remove();
                                            alert("提交成功！")
                                        } else {
                                            alert(r.msg)
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
        }
    })
});
/**********************************退出****************************************/
$(function () {
    $(".back img").click(function () {

        $.ajax({
            type: "GET",
            url: "/logout",
            success: function (r) {
                window.location.href = "/login";
            },
            error: function (r) {
                window.location.href = "/login";
            }
        })

    });
    $(".back_").click(function () {
        $.ajax({
            type: "GET",
            url: "/logout",
            success: function (r) {
                window.location.href = "/login";
            },
            error: function (r) {
                window.location.href = "/login";
            }
        })
    })
});