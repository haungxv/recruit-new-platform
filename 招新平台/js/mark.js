$(function(){
    $(".rank_right").hide();
    $(".mark_not").hide();
    $(".mark_have").hide();
    $("#question").addClass("left_on");
    /**************************已批改、未批改、题目、排行榜变化**********************************************/
    $("#question").click(function(){
        if($("#question").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#question").addClass("left_on");
            $(".rank_right").hide();
            $(".mark_not").hide();
            $(".mark_have").hide();
            $(".question_right").show();
        }
    });
    $("#rank").click(function(){
        if($("#rank").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#rank").addClass("left_on");
            $(".mark_not").hide();
            $(".mark_have").hide();
            $(".question_right").hide();
            $(".rank_right").show();
        }
    });
    $("#not").click(function(){
        if($("#not").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#not").addClass("left_on");
            $(".rank_right").hide();
            $(".mark_have").hide();
            $(".question_right").hide();
            $(".mark_not").show();
        }
    });
    $("#have").click(function(){
        if($("#have").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#have").addClass("left_on");
            $(".rank_right").hide();
            $(".mark_not").hide();
            $(".question_right").hide();
            $(".mark_have").show();
        }
    });
/*************************************************************************************/
    var h_question=(window.innerHeight-97);
    $(".question_right").css("min-height",h_question);
    var h_rank=(window.innerHeight-97);
    $(".rank_right").css("min-height",h_rank);
    var h_not=(window.innerHeight-97);
    $(".mark_not").css("height",h_not);
    var h_have=(window.innerHeight-97);
    $(".mark_have").css("height",h_have);
/************************************更改批改方向***********************************************/
    $(".mark_people__one").click(function(){
         $(".mark_people___").slideToggle();

    });
    $(".mark_people").mouseover(function(){
        $(".welcome_on").removeClass("welcome_on");
        $(this).attr("class","mark_people welcome_on")
    });
    $(document).mouseup(function(e){
        var _con = $(".welcome");   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0&&$(".mark_people___").is(':visible')){
            $(".mark_people___").slideToggle();
        }
    });
});