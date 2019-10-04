// JQuery Document

$(document).ready(function(){
	$("#vol_research").click(function(){if($("#container_vol_res").css("left") == "202px"){
    $("#container_vol_res").animate({
      left: "0"
    },1000 );}else{$("#container_vol_res").animate({
      left: "202px"
    },1000 );}
  });
});

$(document).ready(function(){
	$("#vol_report").click(function(){if($("#container_vol_report").css("left") == "402px"){
    $("#container_vol_report").animate({
      left: "606",
      zIndex: "200"
    },1000 );}else{$("#container_vol_report").animate({
      zIndex: "20",
    },10 );
    $("#container_vol_report").animate({
      left: "402px"
    },1000 );}
  });
});

$(document).ready(function(){
	$("#vol_media").click(function(){if($("#container_vol_media").css("left") == "202px"){
    $("#container_vol_media").animate({
      left: "0"
    },1000 );}else{$("#container_vol_media").animate({
      left: "202px"
    },1000 );}
  });
});

$(document).ready(function(){
	$("#vol_data").click(function(){if($("#container_vol_data").css("left") == "402px"){
    $("#container_vol_data").animate({
      left: "606",
      zIndex: "200"
    },1000 );}else{$("#container_vol_data").animate({
      zIndex: "20",
    },10 );$("#container_vol_data").animate({
      left: "402px"
    },1000 );}
  });
});
