$(function(){
    var ww=$(window).width();
    var wh=$(window).height();
    $(".menu").click(function(){
        $(".slide_nav").css({width:ww,height:wh}).slideToggle();
    });
    $(".sfooter>li>h3").click(function(){
        $(this).next().slideToggle();
    })

    /*轮播图*/
    var currentNum=0;
    var nextNum=0;
    var currentTime=0;
    var flag=true;

    function move(type){
        type=type||"right";
        if(type=="right"){
            nextNum++;
            if(nextNum==3){
                nextNum=0;
                flag=false;
            }

            $(".list:eq("+currentNum+")").animate({width:"80%",height:"80%"},1000).css("zIndex",0);

            $(".list:eq("+nextNum+")").animate({left:0},1000,function(){
                $(".list:eq("+currentNum+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                currentNum=nextNum;
                currentTime=0;
                flag=true;

            }).css("zIndex",1);
        }else if(type=="left"){
            nextNum--;
            if(nextNum==-1){
                nextNum=$(".list").length-1;
                flag=false;
            }
            $(".list:eq("+currentNum+")").animate({left:"100%"},1000).css("zIndex",1);
            $(".list:eq("+nextNum+")").css({width:"80%",height:"80%",left:0}).animate({width:"100%",height:"100%"},1000,function(){
                currentNum=nextNum;
                currentTime=0;
                flag=true;
            }).css("zIndex",0);
        }

    }
    function move1(){
        currentTime+=50;
        var bili=currentTime/3000;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(currentNum).css({width:bili*100+"%"});
        if(flag===false){
            $(".progress").css("width",0);
        }
    }
    function btnmove(){
        $(".btn-list").find(".progress").css("width", 0);
        $(".btn-list").eq(nextNum).find(".progress").css("width", "100%");
    }

    var t2=setInterval(move1,50);
    var t1=setInterval(move,4000);;

    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(move1,50);
    });
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    });

    $(".leftbtn").mouseover(function(){
        clearInterval(t1);
        clearInterval(t2);
    });
    $(".rightbtn").mouseover(function(){
        clearInterval(t1);
        clearInterval(t2);
    });

    $(".leftbtn").click(function(){
        move("left");
        btnmove();
    });
    $(".rightbtn").click(function(){
        move("right");
        btnmove();
    });


    $(".btn-list").click(function(){
        nextNum=$(this).index(".btn-list");
        stop();
    });
    //
    //$(".leftbtn").click(function(){
    //    nextNum--;
    //    if(nextNum==-1){
    //        nextNum=2;
    //    }
    //    stop();
    //});
    //$(".rightbtn").click(function(){
    //    nextNum++;
    //    if(nextNum==3){
    //        nextNum=0;
    //    }
    //    stop();
    //})
    //
    //
    function stop() {
        /*
         *  定时器停掉
         * */
        clearInterval(t1);
        clearInterval(t2);

        /*按钮的变化*/
        $(".btn-list").find(".progress").css("width", 0);
        $(".btn-list").eq(nextNum).find(".progress").css("width", "100%");

        /*轮播图发生变化*/
        if (nextNum > currentNum) {
            $(".list:eq(" + currentNum + ")").animate({width: "80%", height: "80%"},1000).css("zIndex", 0);

            $(".list:eq(" + nextNum + ")").animate({left: 0},1000,function () {
                $(".list:eq(" + currentNum + ")").css({
                    left: "100%", width: "100%", height: "100%"
                })
                currentNum = nextNum;

            }).css("zIndex", 1)
        } else {
            $(".list:eq(" + currentNum + ")").animate({left: "100%"},1000).css("zIndex", 1);
            $(".list").eq(nextNum).css({
                width: "80%", height: "80%", left: 0
            }).animate({width: "100%", height: "100%"},1000,function () {
                currentNum = nextNum;
            })


        }
    }

})