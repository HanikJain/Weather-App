let d = new Date();

let hour = d.getHours();

let moon = "../images/moon.png";
let sun = "../images/rising-sun.png";
let logo = document.getElementById("logo");
var body = document.querySelector(".change");


let gradient = {
    moring: {
        first_color : "#F2994A",
        second_color : "#F2C94C",
    },
    afternoon: {
        first_color : "#2980B9",
        second_color : "#6DD5FA",
        third_color : "#2C5364"
    },
    evening: {
        first_color : "#b92b27",
        second_color : "#1565C0"
    },
    night: {
        first_color : "#0F2027",
        second_color : "#203A43",
        third_color : "#2C5364"
    }

}


if(hour >= 19 || hour <= 6){
    //night
    document.getElementById("logo").src  = moon;
    body.style.background = "linear-gradient(to bottom, " 
    + gradient.night.first_color 
    + ", "
    + gradient.night.second_color
    + ", "
    + gradient.night.third_color
    + ")";
   
    css.textContent = body.style.background + ";";
    

} else if(hour > 6 && hour <= 11){
    //moring
    document.getElementById("logo").src = sun;
    body.style.background = "linear-gradient(to bottom, "+ gradient.moring.first_color + ", "+ gradient.moring.second_color + ")";
    css.textContent = body.style.background + ";";

} else if(hour > 11 && hour < 17) {
    // afternoon
    document.getElementById("logo").src = sun;
    body.style.background = "linear-gradient(to bottom, "+ gradient.afternoon.first_color + ", "+ gradient.afternoon.second_color + ", "+ gradient.afternoon.third_color + ")";
    css.textContent = body.style.background + ";";

} else{
    //evening
    document.getElementById("logo").src = sun;
    body.style.background = "linear-gradient(to bottom, "+ gradient.evening.first_color + ", "+ gradient.evening.second_color + ")";
    css.textContent = body.style.background + ";";
}

setTimeout(function () {
        let viewheight = $(window).height();
        let viewwidth = $(window).width();
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 300);
