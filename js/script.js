$(document).ready(function () {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/find?q=Madrid,3117735&APPID=2f1579ba86ada567ff6723294a966b8e&units=metric",
    datatype: "json",
    type: "GET",
    success: function (respuesta) {
      console.log(respuesta);

      $(".ow-city-name").html(respuesta.list[0].name);
      $(".ow-temp-current").html((respuesta.list[0].main.temp).toFixed(0) + " ºC");
      $(".ow-pressure").html((respuesta.list[0].main.pressure).toFixed(0) + " hPa");
      $(".ow-humidity").html((respuesta.list[0].main.humidity).toFixed(0) + " %");
      $(".ow-wind").html((respuesta.list[0].wind.speed).toFixed(1) + " kms/h");
      $(".ow-temp-min").html("MIN:  " + (respuesta.list[0].main.temp_min).toFixed(0) + " ºC");
      $(".ow-temp-max").html("MAX:  " +(respuesta.list[0].main.temp_max).toFixed(0) + " ºC");
      $(".ow-clouds").html((respuesta.list[0].clouds.all).toFixed(1) + " %");

      $(".ow-rain").html(respuesta.list[0].sys.rain);
      if (respuesta.list[0].sys.rain == undefined) {
        var a = "no hubo lluvia la ultima hora"
      } else {
        var a = respuesta.list[0].sys.rain["1h"]
      }

      $(".ow-snow").html(respuesta.list[0].sys.snow);
      if (respuesta.list[0].sys.snow == undefined) {
        var b = "no hubo nieve la ultima hora"
      } else {
        var b = respuesta.list[0].sys.snow
      }

      $(".ow-snow").html(b);
      $(".ow-rain").html(a);
      $(".ow-ico-current").html("<img src='img/" + (respuesta.list[0].weather[0].icon) + ".png'>");

    },
  });
});

$.ajax({
  url: "http://api.openweathermap.org/data/2.5/forecast?q=Madrid&APPID=a0d94552b6071d21875bf64e1cf2c3f2&units=metric",
  type: "GET",
  datatype: 'json',
  success: function (response) {
    console.log(response);
    today = new Date();
    today.setHours(0, 0, 0, 0);
    $.each(response.list, function (index, value) {

      var fechaString = new Date(value.dt_txt);
      fechaString.setHours(0, 0, 0, 0);
      var diff = fechaString - today;
      diff = diff / (1000 * 3600 * 24);
      console.log(diff);

      $(".ow-day" + diff).html((value.main.temp).toFixed(0) + " ºC");
      $(".max" + diff).html("MAX:  " + (value.main.temp_max).toFixed(0) + " ºC");
      $(".min" + diff).html("MIN:  " + (value.main.temp_min).toFixed(0) + " ºC");
      $(".ow-ico-forecast" + diff).html("<img src='img/" + (value.weather[0].icon) + ".png'>")

    });
    
    today = new Date();
    console.log(today);
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    console.log(days)
    weekday = days[today.getDay()];
    console.log(weekday);
    console.log(today.getDay());

    $(".day1").html(days[(today.getDay()+1) % 7]);
    $(".day2").html(days[(today.getDay()+2) % 7]);
    $(".day3").html(days[(today.getDay()+3) % 7]);
    $(".day4").html(days[(today.getDay()+4) % 7]);
    $(".day5").html(days[(today.getDay()+5) % 7]);
    $(".day6").html(days[(today.getDay()+6) % 7]);
    $(".day7").html(days[(today.getDay()+7) % 7]);
   
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log("ERROR: " + textStatus + " - " + errorThrown);
  }
});
