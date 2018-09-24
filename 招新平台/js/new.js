$(function(){
  $("#question").attr("class","little_right_ little_right_on");
  $(".rank_right").hide();
  $("#h").addClass("left_on");
    // $("#h").click();
  $(".new_rank_right_score").hide();
/**************************方向变化**********************************************/
    $("#h").click(function(){
        if($("#h").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#h").addClass("left_on");
        }
    });
    $("#q").click(function(){
        if($("#q").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#q").addClass("left_on");
        }
    });
    $("#i").click(function(){
        if($("#i").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#i").addClass("left_on");
        }
    });
    $("#a").click(function(){
        if($("#a").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#a").addClass("left_on");
        }
    });
    $("#y").click(function(){
        if($("#y").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#y").addClass("left_on");
        }
    });

  $("#s").click(function(){
      if($("#s").hasClass("left_on")){
          return false;
      }
      else{
          $(".left_on").removeClass("left_on");
          $("#s").addClass("left_on");
      }
  });
    $("#c").click(function(){
        if($("#c").hasClass("left_on")){
            return false;
        }
        else{
            $(".left_on").removeClass("left_on");
            $("#c").addClass("left_on");
        }
    });
    /*******************************题目、排行榜变化**********************************************/
    $("#question").click(function(){
    if($("#question").hasClass("little_right_on")){
        return false;
    }
    else{
        $(".little_right_on").removeClass("little_right_on");
        $("#question").attr("class","little_right_ little_right_on");
        $(".rank_right").hide();
        $(".question_right").show();
        $(".new_rank_right_score").hide();
    }
});
    $("#rank").click(function(){
        if($("#rank").hasClass("little_right_on")){
            return false;
        }
        else{
            $(".little_right_on").removeClass("little_right_on");
            $("#rank").attr("class","little_right_ little_right_on");
            $(".rank_right").show();
            $(".question_right").hide();
            $(".new_rank_right_score").show();
        }
    });
    /**********************************************************************************/
    var hh_question=(window.innerHeight-97-97);
    $(".question_right").css("min-height",hh_question);
    var hh_rank=(window.innerHeight-97-97);
    $(".rank_right").css("min-height",hh_rank);
});