$(function () {
    $(".location").click(function () {
        $(".search").show(500);
    });
    $(".search-text>span").click(function () {
        $(".search").hide(300);
        // console.log($(".search-text>span"));
    });
    //获取城市信息
    let city;
    $.ajax({
        type: "get",
        url: "https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType: "jsonp",
        success: function (obj) {
            city = obj.data;
            console.log(city);
            updataCity(city);
        }
    });

    function updataCity(city) {
        for (let i in city) {
            let str=`<h5>${i}</h5>`;
            $(".viewlist>ul").append(str);
            for(let j in city[i]){
                let str=`<li>${j}</li>`;
                $(".viewlist>ul").append(str);
            }
        }
    }
    //点击每个城市，获取当前城市的天气信息
    window.onload=function(){
        $(".search li").click(function () {
            console.log(this);
            let con=$(this).html();
            ajax1(con);
            let str=`<li>${con}</li>`;
            $(".historylist>ul").append(str);
            $(".search").hide(300);
        })
    

    //获取某个城市的天气信息
    function ajax1(con){
        let url1="https://www.toutiao.com/stream/widget/local_weather/data/?city="+con;
        $.ajax({
            type: "get",
            url:url1,
            dataType: "jsonp",
            success: function (obj) {
                tianqi = obj.data;
                // console.log(tianqi);
                $(".main-center li").remove();
                $(".main-home li").remove();
                updata(tianqi);
            }
        })
    }
    }
    //在搜索框内搜索城市
    $("input").focus(function () {
        $(".search-text>span").html("搜索");
    });
    //点击搜索
    $(".search-text>i").click(function () {
        let text=$("input").val();
        // console.log(text);
        let flag;
        for (let i in city) {
            for(let j in city[i]){
                    if(text==j){
                        flag=true;
                    }
            }
         }
         if(flag==true){
             ajax1(text);
             let str=`<li>${text}</li>`;
             $(".historylist>ul").append(str);
             $(".search").hide(300);
             $("input").val('');

         }
         else {
             alert("请输入正确的城市");
             return
         }

    });
    $("input").blur(function () {
        $(".search-text>span").html("取消");
        // $("input").val('');
    });
    //点击垃圾箱删除历史记录
    let deletes=$(".history>.title>i");
    deletes.click(function () {
        $(".historylist>ul>li").remove();
    })


    //1、获取当前城市的天气信息
    let tianqi;
    $.ajax({
        type: "get",
        url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType: "jsonp",
        success: function (obj) {
            tianqi = obj.data;
            console.log(tianqi);
            updata(tianqi);
        }
    });

    function updata(tianqi) {
        //获取当前的城市
        $(".location>span").html(tianqi.city);
        //获取当前空气状况
        $(".box>p").html(tianqi.weather.quality_level);
        //获取当前的温度
        $("header>h1").html(tianqi.weather.current_temperature + "°");
        //获取当前的天气状况
        $("header>.wheather").html(tianqi.weather.current_condition);
        //获取当前风向
        $("header>.water").html(tianqi.weather.wind_direction);


        //今天的天气
        $(".first>span:eq(1)").html(tianqi.weather.high_temperature + '/' + tianqi.weather.low_temperature);
        $(".second>span:eq(0)").html(tianqi.weather.forecast_list[1].condition);
        $(".second>span:eq(1)>img").attr("src", "./img/" + tianqi.weather.forecast_list[1].weather_icon_id + ".png");

        //明天的天气
        $(".first:eq(1)>span:eq(1)").html(tianqi.weather.forecast_list[2].high_temperature + '/' + tianqi.weather.forecast_list[2].low_temperature);
        $(".second:eq(1)>span:eq(0)").html(tianqi.weather.forecast_list[2].condition);
        $(".second:eq(1)>span:eq(1)>img").attr("src", "./img/" + tianqi.weather.forecast_list[2].weather_icon_id + ".png");

        //未来24小时天气
        let hweather = tianqi.weather.hourly_forecast;
        // console.log(hweather);
        hweather.forEach(function (v) {
            let str = `
                    <li>
                        <span class="time">${v.hour}:00</span>
                        <span class="dot"><img src="./img/${v.weather_icon_id}.png" alt=""></span>
                         <span>${v.temperature}°</span>
                    </li>
              `
            $(".main-center>ul").append(str);
        })

        //未来半个月天气
        let dweather = tianqi.weather.forecast_list;
        // console.log(dweather);
        dweather.forEach(function (v) {
            let str = `<li>
                         <div class="h-t">
                             <!--<p>昨天</p>-->
                            <p>${v.date}</p>
                            <h4>${v.condition}</h4>
                            <span><img src="./img/${v.weather_icon_id}.png" alt=""></span>
                        </div>
                        <div class="h-b">
                             <span><img src="./img/${v.weather_icon_id}.png" alt=""></span>
                             <h4>${v.condition}</h4>
                             <p>${v.wind_direction}</p>
                             <p>${v.wind_level}级</p>
                        </div>
                    </li>`
            $(".main-home>ul").append(str);
        })
    }
})

//获取默认城市的天气信息
//获取所有城市的天气信息
//点击每个城市可以获取当前城市的天气信息
//在搜索框内输入要搜索的城市，点击搜索按钮搜索