$(document).ready(function(){
    var wrapper = document.getElementById("particles"),
        ela  = wrapper.querySelector(".particles-layer--1"),
        elb  = wrapper.querySelector(".particles-layer--2"),
        elc  = wrapper.querySelector(".particles-layer--3"),
        particlesList = [
            {
                el: ela,
                opacity: 0.07,
                speed: 0.06
            },
            {
                el: elb,
                opacity: 0.07,
                speed: 0.04
            },
            {
                el: elc,
                opacity: 0.07,
                speed: 0.05
            },
        ];

    for (var i = 0; i < particlesList.length; i++) {
        var l = particlesList[i];
        TweenMax.to(l.el , .6, {
            delay: Math.random(),
            opacity: l.opacity
        });
    }

    document.addEventListener("mousemove", particlesMousemove);

    function particlesMousemove(t) {
        var e = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
            , n = {
            x: t.clientX || t.pageX,
            y: t.clientY || t.pageY
        }
            , r = {
            x: e.x - n.x,
            y: e.y - n.y
        }
            , o = !0
            , s = !1
            , a = void 0;

        for (var i = 0; i < particlesList.length; i++) {
            var l = particlesList[i];
            TweenMax.to(l.el, 1, {
                x: r.x * l.speed,
                y: r.y * l.speed
            });
        }
    }
});