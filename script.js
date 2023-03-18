havsCalculator: {
    havsArray: [],
    createList: function() {
        document.querySelector("#havs-list tbody").innerHTML = "";
        var e = 0;
        this.havsArray.length > 0 ? this.havsArray.map(function(t, n) {
            e += t.points,
            document.querySelector("#havs-list tbody").insertAdjacentHTML("beforeend", "<tr><td>" + t.tool + '<button class="float-right hover:text-red-500 focus:text-red-500 focus:outline-none" data-tool="' + t.tool + '">&#10005;</button></td><td>' + t.output + "</td><td>" + t.minutes + "</td><td>" + t.points + "</td>")
        }
        .bind(this)) : document.querySelector("#havs-list tbody").insertAdjacentHTML("beforeend", "<td>Waiting for your first exposure...</td><td></td><td></td><td></td>"),
        document.getElementById("havs-total-points").textContent = e,
        e >= 400 ? (document.getElementById("calc-havs-alert").className = "alert alert-error",
        document.getElementById("calc-havs-alert").innerHTML = "<strong>Stop work!</strong> You've reached the exposure limit value - no more vibrations for you today.") : e >= 100 ? (document.getElementById("calc-havs-alert").className = "alert alert-warning",
        document.getElementById("calc-havs-alert").innerHTML = "<strong>Be aware!</strong> You're above the exposure action value - look for ways to control vibration to reduce your risk.") : (document.getElementById("calc-havs-alert").className = "alert alert-success",
        document.getElementById("calc-havs-alert").innerHTML = "<strong>Looking good!</strong> So far, you're under the exposure action value - keep working safely.")
    },
    remove: function(e) {
        "BUTTON" === e.target.tagName && (this.havsArray = this.havsArray.filter(function(t) {
            return t.tool !== e.target.getAttribute("data-tool")
        }),
        this.createList())
    },
    calculate: function(e) {
        e.preventDefault();
        var t = document.getElementById("input-tool").value || !1
          , n = parseFloat(document.getElementById("input-output").value, 10) || !1
          , o = parseInt(document.getElementById("input-minutes").value, 10) || !1
          , a = this.havsArray.filter(function(e) {
            return e.tool === t
        })
          , r = !t || t.match(/^[a-z0-9 ()&.,]+$/gi);
        if (!t || a.length > 0 || !r)
            document.getElementById("input-tool").parentNode.className = document.getElementById("input-tool").parentNode.className.replace(/ invalid/gi, "") + " invalid",
            document.getElementById("input-tool").parentNode.querySelector("p").textContent = a.length > 0 ? "Already added this tool!" : r ? "What tool are you using?" : "Only use letters and numbers";
        else if (!n || isNaN(n))
            document.getElementById("input-output").parentNode.className = document.getElementById("input-output").parentNode.className.replace(/ invalid/gi, "") + " invalid";
        else if (!o || isNaN(o))
            document.getElementById("input-minutes").parentNode.className = document.getElementById("input-minutes").parentNode.className.replace(/ invalid/gi, "") + " invalid";
        else {
            for (a = document.getElementById("havs-calculator").getElementsByClassName("invalid"); a.length > 0; )
                a.item(0).className = a.item(0).className.replace(/ invalid/gi, "");
            document.getElementById("input-tool").parentNode.querySelector("p").textContent = "What tool are you using?";
            var c = n * n * 2
              , s = parseInt(c * (o / 60), 10);
            this.havsArray.push({
                tool: t,
                output: n,
                minutes: o,
                points: s
            }),
            this.createList();
            var l = 100 / c * 60
              , d = 400 / c * 60
              , i = 100 * s / 400;
            document.getElementById("result-title").textContent = i.toFixed(2) + "%",
            document.getElementById("result-title").className = i >= 80 ? "text-red-500" : i >= 40 ? "text-orange-500" : "text-green-500",
            document.getElementById("progress-bar").className = "progress-bar " + (i >= 80 ? "bg-red-500" : i >= 40 ? "bg-orange-500" : "bg-green-500"),
            document.getElementById("progress-bar").style.width = i > 100 ? "100%" : i + "%",
            document.getElementById("result-tool").textContent = t,
            document.getElementById("result-output").textContent = n,
            document.getElementById("result-eav").textContent = parseInt(l / 60, 10) + "hrs:" + parseInt(l % 60, 10) + "mins",
            document.getElementById("result-elv").textContent = parseInt(d / 60, 10) + "hrs:" + parseInt(d % 60, 10) + "mins",
            document.getElementById("result-text").textContent = "You have used " + s + " points on this tool, which is " + parseInt(i, 10) + "% of the maximum daily allowance.",
            document.getElementById("result-section").scrollIntoView({
                block: "center"
            })
        }
    }
}