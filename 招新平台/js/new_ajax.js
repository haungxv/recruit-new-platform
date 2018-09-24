
var group = new Array();
group["后台"] = "background";
group["前端"] = "front";
group["安卓"] = "android";
group["IOS"] = "ios";
group["运维"] = "operation";
group["设计"] = "design";
group["产品"] = "product";
/***********************************亲爱的同学，欢迎登录*********************************/
$(function () {
    var searchUrl = window.location.href;
    var searchData = searchUrl.split("=");//截取 url中的“=”,获得“=”后面的参数
    var name_1 = decodeURI(searchData[1]);   //decodeURI解码
    $(".little_welcome").text(name_1);            //将搜索的数据显示在搜索页面的搜索框中
});
/**********************************新人题目(element-ui弹窗)*******************************************/
$(function () {
    $.ajax({
        type: "POST",
        url: "/new",
        data: {
            "group": "background",
            "level": "easy"
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = '';
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"easy_question_\">\n" +
                        "                <span class=\"easy_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='easy_question_detail' data-i='qb_easy" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadeqb_easy" + i + "\"></div>\n" +
                        "            <div class=\"detail_box qb_easy" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_1\">\n" +
                        "                    <img data-y='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-y='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "'  class=\"box_down_word_1\" >点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_hand_background_easy\" data-fo='qba_easy_" + i + "' data-sub='qb_easy_" + i + "' data-o='qback_easy_" + i + "'>提交</div>\n" +
                        "                <div class=\"mark_mark\" data-lll='mark_mark_easy_" + i + "'>批改详情</div>\n" +
                        "               <div class=\"choice qba_easy_" + i + "\">\n" +
                        "                    <form class='qb_easy_" + i + "' enctype=\"multipart/form-data\">\n" +
                        "                        <div class=\"form_white\"></div>\n" +
                        "                        <input type=\"file\" class='qback_easy_" + i + "' name=\"file\" >\n" +
                        "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                        "                       <input type=\"submit\" class='goup' style=\"display: none\" id='qb_easy_" + i + "' />" +
                        "                    </form>\n" +
                        "                </div>" +
                        "            </div>";
                    /*********************************查看批改情况**********************************/
                    html += " <div class=\"mark_detail_box mark_mark_easy_" + i + "\">\n" +
                        "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                        "                        <div class=\"mark_detail_content_\">\n" +
                        "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                        "                            <div class=\"mark_detail_score\">得分</div>\n" +
                        "                            <div class=\"mark_detail_comment\">评价</div>\n";
                    for (var j = 0; j < r.data[i].infos.length; ++j) {
                        var score__ = r.data[i].infos[j].score;
                        if (score__ === null) score__ = " ";
                        var comment__ = r.data[i].infos[j].comment;
                        if (comment__ === null) comment__ = " ";
                        html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                            "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                            "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "easy_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                    }
                    html += "                        </div>\n" +
                        "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                        "                </div>";

                    /*********************************查看详细评语**********************************/
                    for (var h = 0; h < r.data[i].infos.length; ++h) {
                        var comment___ = r.data[i].infos[h].comment;
                        if (comment___ === null) comment___ = " ";
                        html += "<div class='mark_detail_comment_box " + i + "easy_mark_detail_comment_box_" + h + "'>\n" +
                            "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                            "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                            "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                            "                </div>";
                    }
                }
                $(".easy_question").html(html);
                $(".choice").hide();
                $(".easy_question_detail").click(function () {
                    var a = $(this).attr("data-i");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');

                });
                $(".box_back").click(function () {
                    $(this).parent(".detail_box").find(".choice").hide();
                    $(this).parent(".detail_box").find(".box_hand_background_easy").text("提交");
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /*********************************查看批改情况**********************************/
                $(".mark_detail_box").hide();
                $(".mark_mark").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    var oo = $(this).data("lll");
                    $("." + oo).show();
                });
                $(".mark_detail_back").click(function () {
                    $(".fade_").css({
                        "z-index": "99",
                        "background": 'rgba(0, 0, 0, 0.3)',
                    });
                    $(".mark_detail_box").hide();
                });
                /*********************************查看详细评语**********************************/
                $(".mark_detail_comment_box").hide();
                $(".mark_detail_comment_").click(function () {
                    $(".fade_").css({
                        "z-index": "103",
                        "background": 'rgba(0, 0, 0, 0.7)',
                    });
                    var oo = $(this).data("ppp");
                    $("." + oo).show();
                });
                $(".mark_detail_comment_back").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    $(".mark_detail_comment_box").hide();
                });
                // /********************************下载********************************/
                $(".box_down_1 img").click(function () {
                    var yn = $(this).data("yone");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！");
                        return false;
                    }
                    else {
                        var id = $(this).data("y");
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
                        var id = $(this).data("y");
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
                /****************************************上传******************************************/
                $(".goup").click(function () {
                    var n = $(this).attr("id");
                    $("." + n).ajaxForm(
                        {
                            success: function (r) {
                                if (r.msg === "成功") {
                                    alert("上传成功！");
                                    $(".box_back").click();
                                }
                                else {
                                    alert(r.msg)
                                }
                            },
                            url: '/new/sendfile',
                            type: 'POST'
                        })
                });
                $(".box_hand_background_easy").click(function () {
                    if ($(this).text() === "提交") {
                        var v = $(this).data("fo");
                        if ($("." + v).not(":visible")) {
                            $("." + v).show();
                        }
                        var h = $(this).data("o");
                        $("." + h).click();
                        $(this).text("确认提交");
                    }
                    else if ($(this).text() === "确认提交") {
                        var v_ = $(this).data("fo");
                        if ($("." + v_).is(":visible")) {
                            $("." + v_).hide();
                        }
                        var m = $(this).data("sub");
                        $("#" + m).click();
                        $(this).text("提交");
                    }
                });
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "/new",
        data: {
            "group": "background",
            "level": "common"
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = '';
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"middle_question_\">\n" +
                        "                <span class=\"middle_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='middle_question_detail' data-i='qb_middle" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadeqb_middle" + i + "\"></div>\n" +
                        "            <div class=\"detail_box qb_middle" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_2\">\n" +
                        "                    <img data-y='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-y='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' class=\"box_down_word_2\" >点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_hand_background_middle\" data-fo='qba_middle_" + i + "' data-sub='qb_middle_" + i + "' data-o='qback_middle_" + i + "'>提交</div>\n" +
                        "                <div class=\"mark_mark\" data-lll='mark_mark_middle_" + i + "'>批改详情</div>\n" +
                        "               <div class=\"choice qba_middle_" + i + "\">\n" +
                        "                    <form class='qb_middle_" + i + "' enctype=\"multipart/form-data\">\n" +
                        "                        <div class=\"form_white\"></div>\n" +
                        "                        <input type=\"file\" class='qback_middle_" + i + "' name=\"file\" >\n" +
                        "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                        "                       <input type=\"submit\" class='goup' style=\"display: none\" id='qb_middle_" + i + "' />" +
                        "                    </form>\n" +
                        "                </div>" +
                        "            </div>";
                    /*********************************查看批改情况**********************************/
                    html += " <div class=\"mark_detail_box mark_mark_middle_" + i + "\">\n" +
                        "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                        "                        <div class=\"mark_detail_content_\">\n" +
                        "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                        "                            <div class=\"mark_detail_score\">得分</div>\n" +
                        "                            <div class=\"mark_detail_comment\">评价</div>\n";
                    for (var j = 0; j < r.data[i].infos.length; ++j) {
                        var score__ = r.data[i].infos[j].score;
                        if (score__ === null) score__ = " ";
                        var comment__ = r.data[i].infos[j].comment;
                        if (comment__ === null) comment__ = " ";
                        html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                            "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                            "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "middle_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                    }
                    html += "                        </div>\n" +
                        "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                        "                </div>";

                    /*********************************查看详细评语**********************************/
                    for (var h = 0; h < r.data[i].infos.length; ++h) {
                        var comment___ = r.data[i].infos[h].comment;
                        if (comment___ === null) comment___ = " ";
                        html += "<div class='mark_detail_comment_box " + i + "middle_mark_detail_comment_box_" + h + "'>\n" +
                            "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                            "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                            "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                            "                </div>";
                    }
                }
                $(".middle_question").html(html);
                $(".choice").hide();
                $(".middle_question_detail").click(function () {
                    var a = $(this).attr("data-i");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');
                });
                $(".box_back").click(function () {
                    $(this).parent(".detail_box").find(".choice").hide();
                    $(this).parent(".detail_box").find(".box_hand_background_middle").text("提交");
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /*********************************查看批改情况**********************************/
                $(".mark_detail_box").hide();
                $(".mark_mark").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    var oo = $(this).data("lll");
                    $("." + oo).show();
                });
                $(".mark_detail_back").click(function () {
                    $(".fade_").css({
                        "z-index": "99",
                        "background": 'rgba(0, 0, 0, 0.3)',
                    });
                    $(".mark_detail_box").hide();
                });
                /*********************************查看详细评语**********************************/
                $(".mark_detail_comment_box").hide();
                $(".mark_detail_comment_").click(function () {
                    $(".fade_").css({
                        "z-index": "103",
                        "background": 'rgba(0, 0, 0, 0.7)',
                    });
                    var oo = $(this).data("ppp");
                    $("." + oo).show();
                });
                $(".mark_detail_comment_back").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    $(".mark_detail_comment_box").hide();
                });
                // /********************************下载********************************/

                $(".box_down_2 img").click(function () {
                    var yn = $(this).data("yonm");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！")
                    }
                    else {
                        var id = $(this).data("y");
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
                        alert("本题没有要下载的文件！")
                    }
                    else {
                        var id = $(this).data("y");
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
                /****************************************上传******************************************/
                $(".goup").click(function () {
                    var n = $(this).attr("id");
                    $("." + n).ajaxForm(
                        {
                            success: function (r) {
                                if (r.msg === "成功") {
                                    alert("上传成功！");
                                    $(".box_back").click();
                                }
                                else {
                                    alert(r.msg)
                                }
                            },
                            url: '/new/sendfile',
                            type: 'POST'
                        })
                });
                $(".box_hand_background_middle").click(function () {
                    if ($(this).text() === "提交") {
                        var v = $(this).data("fo");
                        if ($("." + v).not(":visible")) {
                            $("." + v).show();
                        }
                        var h = $(this).data("o");
                        $("." + h).click();
                        $(this).text("确认提交");
                    }
                    else if ($(this).text() === "确认提交") {
                        var v_ = $(this).data("fo");
                        if ($("." + v_).is(":visible")) {
                            $("." + v_).hide();
                        }
                        var m = $(this).data("sub");
                        $("#" + m).click();
                        $(this).text("提交");
                    }
                });
            }
        }
    });
    $.ajax({
        type: "POST",
        url: "/new",
        data: {
            "group": "background",
            "level": "hard"
        },
        success: function (r) {
            if (r.data.length > 0) {
                var html = '';
                for (var i = 0; i < r.data.length; ++i) {
                    html += "   <div class=\"difficult_question_\">\n" +
                        "                <span class=\"difficult_question_CH\">" + r.data[i].qname + "</span>\n" +
                        "                <div class='difficult_question_detail' data-i='qb_difficult" + i + "'>查看详情</div>\n" +
                        "            </div>\n" +
                        "            <div class=\"fade fadeqb_difficult" + i + "\"></div>\n" +
                        "            <div class=\"detail_box qb_difficult" + i + "\">\n" +
                        "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                        "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                        "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                        "                <div class=\"box_down_3\">\n" +
                        "                    <img data-y='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                        "                    <span data-y='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' class=\"box_down_word_3\" >点击下载</span>\n" +
                        "                </div>\n" +
                        "                <div class=\"box_hand_background_difficult\" data-fo='qba_difficult_" + i + "' data-sub='qb_difficult_" + i + "' data-o='qback_difficult_" + i + "'>提交</div>\n" +
                        "                <div class=\"mark_mark\" data-lll='mark_mark_diff_" + i + "'>批改详情</div>\n" +
                        "               <div class=\"choice qba_difficult_" + i + "\">\n" +
                        "                    <form class='qb_difficult_" + i + "' enctype=\"multipart/form-data\">\n" +
                        "                        <div class=\"form_white\"></div>\n" +
                        "                        <input type=\"file\" class='qback_difficult_" + i + "' name=\"file\" >\n" +
                        "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                        "                       <input type=\"submit\" class='goup'  style=\"display: none\" id='qb_difficult_" + i + "' />" +
                        "                    </form>\n" +
                        "                </div>" +
                        "            </div>";
                    /*********************************查看批改情况**********************************/
                    html += " <div class=\"mark_detail_box mark_mark_diff_" + i + "\">\n" +
                        "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                        "                        <div class=\"mark_detail_content_\">\n" +
                        "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                        "                            <div class=\"mark_detail_score\">得分</div>\n" +
                        "                            <div class=\"mark_detail_comment\">评价</div>\n";
                    for (var j = 0; j < r.data[i].infos.length; ++j) {
                        var score__ = r.data[i].infos[j].score;
                        if (score__ === null) score__ = " ";
                        var comment__ = r.data[i].infos[j].comment;
                        if (comment__ === null) comment__ = " ";
                        html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                            "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                            "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "diff_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                    }
                    html += "                        </div>\n" +
                        "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                        "                </div>";

                    /*********************************查看详细评语**********************************/
                    for (var h = 0; h < r.data[i].infos.length; ++h) {
                        var comment___ = r.data[i].infos[h].comment;
                        if (comment___ === null) comment___ = " ";
                        html += "<div class='mark_detail_comment_box " + i + "diff_mark_detail_comment_box_" + h + "'>\n" +
                            "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                            "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                            "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                            "                </div>";
                    }
                }
                $(".difficult_question").html(html);
                $(".choice").hide();
                $(".difficult_question_detail").click(function () {

                    var a = $(this).attr("data-i");
                    $(".fade" + a).addClass("fade_");
                    $("." + a).addClass('active');
                });
                $(".box_back").click(function () {
                    $(this).parent(".detail_box").find(".choice").hide();
                    $(this).parent(".detail_box").find(".box_hand_background_difficult").text("提交");
                    if ($(".detail_box").hasClass('active')) {
                        $(".detail_box").removeClass('active');
                    }
                    setTimeout(function () {
                        $(".fade_").removeClass("fade_")
                    }, 1000);
                });
                /*********************************查看批改情况**********************************/
                $(".mark_detail_box").hide();
                $(".mark_mark").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    var oo = $(this).data("lll");
                    $("." + oo).show();
                });
                $(".mark_detail_back").click(function () {
                    $(".fade_").css({
                        "z-index": "99",
                        "background": 'rgba(0, 0, 0, 0.3)',
                    });
                    $(".mark_detail_box").hide();
                });
                /*********************************查看详细评语**********************************/
                $(".mark_detail_comment_box").hide();
                $(".mark_detail_comment_").click(function () {
                    $(".fade_").css({
                        "z-index": "103",
                        "background": 'rgba(0, 0, 0, 0.7)',
                    });
                    var oo = $(this).data("ppp");
                    $("." + oo).show();
                });
                $(".mark_detail_comment_back").click(function () {
                    $(".fade_").css({
                        "z-index": "101",
                        "background": 'rgba(0, 0, 0, 0.5)',
                    });
                    $(".mark_detail_comment_box").hide();
                });
                // /********************************下载********************************/
                $(".box_down_3 img").click(function () {
                    var yn = $(this).data("yond");
                    if (yn === 0) {
                        alert("本题没有要下载的文件！")
                    }
                    else {
                        var id = $(this).data("y");
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
                        alert("本题没有要下载的文件！")
                    }
                    else {
                        var id = $(this).data("y");
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
                /****************************************上传******************************************/
                $(".goup").click(function () {
                    var n = $(this).attr("id");
                    $("." + n).ajaxForm(
                        {
                            success: function (r) {
                                if (r.msg === "成功") {
                                    alert("上传成功！");
                                    $(".box_back").click();
                                }
                                else {
                                    alert(r.msg)
                                }
                            },
                            url: '/new/sendfile',
                            type: 'POST'
                        })
                });
                $(".box_hand_background_difficult").click(function () {
                    if ($(this).text() === "提交") {
                        var v = $(this).data("fo");
                        if ($("." + v).not(":visible")) {
                            $("." + v).show();
                        }
                        var h = $(this).data("o");
                        $("." + h).click();
                        $(this).text("确认提交");
                    }
                    else if ($(this).text() === "确认提交") {
                        var v_ = $(this).data("fo");
                        if ($("." + v_).is(":visible")) {
                            $("." + v_).hide();
                        }
                        var m = $(this).data("sub");
                        $("#" + m).click();
                        $(this).text("提交");
                    }
                });
            }
        }
    });
    $(".little_right_,.left_radius").click(function () {
        if (($(".little_right_on").text() === "题目")) {
            $(".easy_question").empty();
            $(".middle_question").empty();
            $(".difficult_question").empty();
            var direction = $(".left_on").text();
            $.ajax({
                type: "POST",
                url: "/new",
                data: {
                    "group": group[direction],
                    "level": "easy"
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = '';
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"easy_question_\">\n" +
                                "                <span class=\"easy_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='easy_question_detail' data-i='qb_easy" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadeqb_easy" + i + "\"></div>\n" +
                                "            <div class=\"detail_box qb_easy" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_1\">\n" +
                                "                    <img data-y='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-y='" + r.data[i].qid + "' data-yone='" + r.data[i].status + "'  class=\"box_down_word_1\" >点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_hand_background_easy\" data-fo='qba_easy_" + i + "' data-sub='qb_easy_" + i + "' data-o='qback_easy_" + i + "'>提交</div>\n" +
                                "                <div class=\"mark_mark\" data-lll='mark_mark_easy_" + i + "'>批改详情</div>\n" +
                                "               <div class=\"choice qba_easy_" + i + "\">\n" +
                                "                    <form class='qb_easy_" + i + "' enctype=\"multipart/form-data\">\n" +
                                "                        <div class=\"form_white\"></div>\n" +
                                "                        <input type=\"file\" class='qback_easy_" + i + "' name=\"file\" >\n" +
                                "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                                "                       <input type=\"submit\" class='goup' style=\"display: none\" id='qb_easy_" + i + "' />" +
                                "                    </form>\n" +
                                "                </div>" +
                                "            </div>";
                            /*********************************查看批改情况**********************************/
                            html += " <div class=\"mark_detail_box mark_mark_easy_" + i + "\">\n" +
                                "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                                "                        <div class=\"mark_detail_content_\">\n" +
                                "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                                "                            <div class=\"mark_detail_score\">得分</div>\n" +
                                "                            <div class=\"mark_detail_comment\">评价</div>\n";
                            for (var j = 0; j < r.data[i].infos.length; ++j) {
                                var score__ = r.data[i].infos[j].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[i].infos[j].comment;
                                if (comment__ === null) comment__ = " ";
                                html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                                    "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                                    "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "easy_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                            }
                            html += "                        </div>\n" +
                                "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                                "                </div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[i].infos.length; ++h) {
                                var comment___ = r.data[i].infos[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html += "<div class='mark_detail_comment_box " + i + "easy_mark_detail_comment_box_" + h + "'>\n" +
                                    "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                                    "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                        }
                        $(".easy_question").html(html);
                        $(".choice").hide();
                        $(".easy_question_detail").click(function () {
                            var a = $(this).attr("data-i");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');

                        });
                        $(".box_back").click(function () {
                            $(this).parent(".detail_box").find(".choice").hide();
                            $(this).parent(".detail_box").find(".box_hand_background_easy").text("提交");
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /*********************************查看批改情况**********************************/
                        $(".mark_detail_box").hide();
                        $(".mark_mark").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            var oo = $(this).data("lll");
                            $("." + oo).show();
                        });
                        $(".mark_detail_back").click(function () {
                            $(".fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".mark_detail_box").hide();
                        });
                        /*********************************查看详细评语**********************************/
                        $(".mark_detail_comment_box").hide();
                        $(".mark_detail_comment_").click(function () {
                            $(".fade_").css({
                                "z-index": "103",
                                "background": 'rgba(0, 0, 0, 0.7)',
                            });
                            var oo = $(this).data("ppp");
                            $("." + oo).show();
                        });
                        $(".mark_detail_comment_back").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            $(".mark_detail_comment_box").hide();
                        });
                        // /********************************下载********************************/
                        $(".box_down_1 img").click(function () {
                            var yn = $(this).data("yone");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！");
                                return false;
                            }
                            else {
                                var id = $(this).data("y");
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
                                var id = $(this).data("y");
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
                        /****************************************上传******************************************/
                        $(".goup").click(function () {
                            var n = $(this).attr("id");
                            $("." + n).ajaxForm(
                                {
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            alert("上传成功！");
                                            $(".box_back").click();
                                        }
                                        else {
                                            alert(r.msg)
                                        }
                                    },
                                    url: '/new/sendfile',
                                    type: 'POST'
                                })
                        });
                        $(".box_hand_background_easy").click(function () {
                            if ($(this).text() === "提交") {
                                var v = $(this).data("fo");
                                if ($("." + v).not(":visible")) {
                                    $("." + v).show();
                                }
                                var h = $(this).data("o");
                                $("." + h).click();
                                $(this).text("确认提交");
                            }
                            else if ($(this).text() === "确认提交") {
                                var v_ = $(this).data("fo");
                                if ($("." + v_).is(":visible")) {
                                    $("." + v_).hide();
                                }
                                var m = $(this).data("sub");
                                $("#" + m).click();
                                $(this).text("提交");
                            }
                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/new",
                data: {
                    "group": group[direction],
                    "level": "common"
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = '';
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"middle_question_\">\n" +
                                "                <span class=\"middle_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='middle_question_detail' data-i='qb_middle" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadeqb_middle" + i + "\"></div>\n" +
                                "            <div class=\"detail_box qb_middle" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_2\">\n" +
                                "                    <img data-y='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-y='" + r.data[i].qid + "' data-yonm='" + r.data[i].status + "' class=\"box_down_word_2\" >点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_hand_background_middle\" data-fo='qba_middle_" + i + "' data-sub='qb_middle_" + i + "' data-o='qback_middle_" + i + "'>提交</div>\n" +
                                "                <div class=\"mark_mark\" data-lll='mark_mark_middle_" + i + "'>批改详情</div>\n" +
                                "               <div class=\"choice qba_middle_" + i + "\">\n" +
                                "                    <form class='qb_middle_" + i + "' enctype=\"multipart/form-data\">\n" +
                                "                        <div class=\"form_white\"></div>\n" +
                                "                        <input type=\"file\" class='qback_middle_" + i + "' name=\"file\" >\n" +
                                "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                                "                       <input type=\"submit\" class='goup' style=\"display: none\" id='qb_middle_" + i + "' />" +
                                "                    </form>\n" +
                                "                </div>" +
                                "            </div>";
                            /*********************************查看批改情况**********************************/
                            html += " <div class=\"mark_detail_box mark_mark_middle_" + i + "\">\n" +
                                "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                                "                        <div class=\"mark_detail_content_\">\n" +
                                "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                                "                            <div class=\"mark_detail_score\">得分</div>\n" +
                                "                            <div class=\"mark_detail_comment\">评价</div>\n";
                            for (var j = 0; j < r.data[i].infos.length; ++j) {
                                var score__ = r.data[i].infos[j].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[i].infos[j].comment;
                                if (comment__ === null) comment__ = " ";
                                html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                                    "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                                    "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "middle_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                            }
                            html += "                        </div>\n" +
                                "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                                "                </div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[i].infos.length; ++h) {
                                var comment___ = r.data[i].infos[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html += "<div class='mark_detail_comment_box " + i + "middle_mark_detail_comment_box_" + h + "'>\n" +
                                    "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                                    "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                        }
                        $(".middle_question").html(html);
                        $(".choice").hide();
                        $(".middle_question_detail").click(function () {
                            var a = $(this).attr("data-i");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            $(this).parent(".detail_box").find(".choice").hide();
                            $(this).parent(".detail_box").find(".box_hand_background_middle").text("提交");
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /*********************************查看批改情况**********************************/
                        $(".mark_detail_box").hide();
                        $(".mark_mark").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            var oo = $(this).data("lll");
                            $("." + oo).show();
                        });
                        $(".mark_detail_back").click(function () {
                            $(".fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".mark_detail_box").hide();
                        });
                        /*********************************查看详细评语**********************************/
                        $(".mark_detail_comment_box").hide();
                        $(".mark_detail_comment_").click(function () {
                            $(".fade_").css({
                                "z-index": "103",
                                "background": 'rgba(0, 0, 0, 0.7)',
                            });
                            var oo = $(this).data("ppp");
                            $("." + oo).show();
                        });
                        $(".mark_detail_comment_back").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            $(".mark_detail_comment_box").hide();
                        });
                        // /********************************下载********************************/

                        $(".box_down_2 img").click(function () {
                            var yn = $(this).data("yonm");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！")
                            }
                            else {
                                var id = $(this).data("y");
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
                                alert("本题没有要下载的文件！")
                            }
                            else {
                                var id = $(this).data("y");
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
                        /****************************************上传******************************************/
                        $(".goup").click(function () {
                            var n = $(this).attr("id");
                            $("." + n).ajaxForm(
                                {
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            alert("上传成功！");
                                            $(".box_back").click();
                                        }
                                        else {
                                            alert(r.msg)
                                        }
                                    },
                                    url: '/new/sendfile',
                                    type: 'POST'
                                })
                        });
                        $(".box_hand_background_middle").click(function () {
                            if ($(this).text() === "提交") {
                                var v = $(this).data("fo");
                                if ($("." + v).not(":visible")) {
                                    $("." + v).show();
                                }
                                var h = $(this).data("o");
                                $("." + h).click();
                                $(this).text("确认提交");
                            }
                            else if ($(this).text() === "确认提交") {
                                var v_ = $(this).data("fo");
                                if ($("." + v_).is(":visible")) {
                                    $("." + v_).hide();
                                }
                                var m = $(this).data("sub");
                                $("#" + m).click();
                                $(this).text("提交");
                            }
                        });
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/new",
                data: {
                    "group": group[direction],
                    "level": "hard"
                },
                success: function (r) {
                    if (r.data.length > 0) {
                        var html = '';
                        for (var i = 0; i < r.data.length; ++i) {
                            html += "   <div class=\"difficult_question_\">\n" +
                                "                <span class=\"difficult_question_CH\">" + r.data[i].qname + "</span>\n" +
                                "                <div class='difficult_question_detail' data-i='qb_difficult" + i + "'>查看详情</div>\n" +
                                "            </div>\n" +
                                "            <div class=\"fade fadeqb_difficult" + i + "\"></div>\n" +
                                "            <div class=\"detail_box qb_difficult" + i + "\">\n" +
                                "                <div class=\"box_title\">" + r.data[i].qname + "</div>\n" +
                                "               <img class=\"box_back\" src=\"../images/bback.png\" />" +
                                "                <div class=\"box_content\"><div>" + r.data[i].description + "</div></div>\n" +
                                "                <div class=\"box_down_3\">\n" +
                                "                    <img data-y='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' src=\"../images/down.png\">\n" +
                                "                    <span data-y='" + r.data[i].qid + "' data-yond='" + r.data[i].status + "' class=\"box_down_word_3\" >点击下载</span>\n" +
                                "                </div>\n" +
                                "                <div class=\"box_hand_background_difficult\" data-fo='qba_difficult_" + i + "' data-sub='qb_difficult_" + i + "' data-o='qback_difficult_" + i + "'>提交</div>\n" +
                                "                <div class=\"mark_mark\" data-lll='mark_mark_diff_" + i + "'>批改详情</div>\n" +
                                "               <div class=\"choice qba_difficult_" + i + "\">\n" +
                                "                    <form class='qb_difficult_" + i + "' enctype=\"multipart/form-data\">\n" +
                                "                        <div class=\"form_white\"></div>\n" +
                                "                        <input type=\"file\" class='qback_difficult_" + i + "' name=\"file\" >\n" +
                                "                        <input type=\"text\" name='qid' value='" + r.data[i].qid + "' style=\"display: none\">\n" +
                                "                       <input type=\"submit\" class='goup'  style=\"display: none\" id='qb_difficult_" + i + "' />" +
                                "                    </form>\n" +
                                "                </div>" +
                                "            </div>";
                            /*********************************查看批改情况**********************************/
                            html += " <div class=\"mark_detail_box mark_mark_diff_" + i + "\">\n" +
                                "                        <div class=\"mark_detail_title\">批改详情</div>\n" +
                                "                        <div class=\"mark_detail_content_\">\n" +
                                "                            <div class=\"mark_detail_many\">提交次数</div>\n" +
                                "                            <div class=\"mark_detail_score\">得分</div>\n" +
                                "                            <div class=\"mark_detail_comment\">评价</div>\n";
                            for (var j = 0; j < r.data[i].infos.length; ++j) {
                                var score__ = r.data[i].infos[j].score;
                                if (score__ === null) score__ = " ";
                                var comment__ = r.data[i].infos[j].comment;
                                if (comment__ === null) comment__ = " ";
                                html += "<div class=\"mark_detail_many_\">" + r.data[i].infos[j].times + "</div>\n" +
                                    "     <div class=\"mark_detail_score_\">" + score__ + "</div>\n" +
                                    "     <div class=\"mark_detail_comment_\" data-ppp=" + i + "diff_mark_detail_comment_box_" + j + ">" + comment__ + "</div>";
                            }
                            html += "                        </div>\n" +
                                "                        <div class=\"mark_detail_back\">BACK</div>\n" +
                                "                </div>";

                            /*********************************查看详细评语**********************************/
                            for (var h = 0; h < r.data[i].infos.length; ++h) {
                                var comment___ = r.data[i].infos[h].comment;
                                if (comment___ === null) comment___ = " ";
                                html += "<div class='mark_detail_comment_box " + i + "diff_mark_detail_comment_box_" + h + "'>\n" +
                                    "                <div class='mark_detail_comment_title'>评价详情</div> \n" +
                                    "                <div class='mark_detail_comment_content'><div>" + comment___ + "</div></div>\n" +
                                    "                <div class='mark_detail_comment_back'>BACK</div> \n" +
                                    "                </div>";
                            }
                        }
                        $(".difficult_question").html(html);
                        $(".choice").hide();
                        $(".difficult_question_detail").click(function () {

                            var a = $(this).attr("data-i");
                            $(".fade" + a).addClass("fade_");
                            $("." + a).addClass('active');
                        });
                        $(".box_back").click(function () {
                            $(this).parent(".detail_box").find(".choice").hide();
                            $(this).parent(".detail_box").find(".box_hand_background_difficult").text("提交");
                            if ($(".detail_box").hasClass('active')) {
                                $(".detail_box").removeClass('active');
                            }
                            setTimeout(function () {
                                $(".fade_").removeClass("fade_")
                            }, 1000);
                        });
                        /*********************************查看批改情况**********************************/
                        $(".mark_detail_box").hide();
                        $(".mark_mark").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            var oo = $(this).data("lll");
                            $("." + oo).show();
                        });
                        $(".mark_detail_back").click(function () {
                            $(".fade_").css({
                                "z-index": "99",
                                "background": 'rgba(0, 0, 0, 0.3)',
                            });
                            $(".mark_detail_box").hide();
                        });
                        /*********************************查看详细评语**********************************/
                        $(".mark_detail_comment_box").hide();
                        $(".mark_detail_comment_").click(function () {
                            $(".fade_").css({
                                "z-index": "103",
                                "background": 'rgba(0, 0, 0, 0.7)',
                            });
                            var oo = $(this).data("ppp");
                            $("." + oo).show();
                        });
                        $(".mark_detail_comment_back").click(function () {
                            $(".fade_").css({
                                "z-index": "101",
                                "background": 'rgba(0, 0, 0, 0.5)',
                            });
                            $(".mark_detail_comment_box").hide();
                        });
                        // /********************************下载********************************/
                        $(".box_down_3 img").click(function () {
                            var yn = $(this).data("yond");
                            if (yn === 0) {
                                alert("本题没有要下载的文件！")
                            }
                            else {
                                var id = $(this).data("y");
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
                                alert("本题没有要下载的文件！")
                            }
                            else {
                                var id = $(this).data("y");
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
                        /****************************************上传******************************************/
                        $(".goup").click(function () {
                            var n = $(this).attr("id");
                            $("." + n).ajaxForm(
                                {
                                    success: function (r) {
                                        if (r.msg === "成功") {
                                            alert("上传成功！");
                                            $(".box_back").click();
                                        }
                                        else {
                                            alert(r.msg)
                                        }
                                    },
                                    url: '/new/sendfile',
                                    type: 'POST'
                                })
                        });
                        $(".box_hand_background_difficult").click(function () {
                            if ($(this).text() === "提交") {
                                var v = $(this).data("fo");
                                if ($("." + v).not(":visible")) {
                                    $("." + v).show();
                                }
                                var h = $(this).data("o");
                                $("." + h).click();
                                $(this).text("确认提交");
                            }
                            else if ($(this).text() === "确认提交") {
                                var v_ = $(this).data("fo");
                                if ($("." + v_).is(":visible")) {
                                    $("." + v_).hide();
                                }
                                var m = $(this).data("sub");
                                $("#" + m).click();
                                $(this).text("提交");
                            }
                        });
                    }
                }
            });
        }
    })
});
/**************************************新人排行榜**************************************/
$(function () {
    $(".little_right_,.left_radius").click(function () {
        if (($(".little_right_on").text() === "排行榜")) {
            $(".grade_1_box").empty();
            $(".grade_2_box").empty();
            $(".new_rank_right_score span").text("0");
            var direction = $(".left_on").text();
            $.ajax({
                type: "POST",
                url: "/list",
                data: {
                    "group": group[direction],
                    "grade": "2018"
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

                        for (var j = 3; j < r.data.length && j < 10; j++) {
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
                url: "/list",
                data: {
                    "group": group[direction],
                    "grade": "2017"
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

                        for (var j = 3; j < r.data.length && j < 10; j++) {
                            var name = r.data[j].name;
                            var number = r.data[j].studentid;
                            var score = r.data[j].tolscore;
                            html3 += "<div class=\"rank_box \"><div class=\"rank_none\">" + (i + 1) + "</div><span class=\"rank_name\">姓名：" + name + "</span><span class=\"rank_number\">学号：" + number + "</span><span class=\"rank_score\">得分：" + score + "</span></div>"
                        }
                        $(".grade_2_box").html(html3);
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: "/new/score",
                data: {
                    "group": group[direction]
                },
                success: function (r) {
                    if (r.msg === "成功")
                        $(".new_rank_right_score span").text(r.data);
                    else {
                        $(".new_rank_right_score span").text("0");
                    }
                }
            })
        }
    });
});
/************************************退出***************************************/
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
    });
});