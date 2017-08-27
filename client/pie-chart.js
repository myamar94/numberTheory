function showPie() {
    //Import Data
    d3.json("data/data.json", function (err, data) {

        if (err) {
            throw err;
        }
        data.forEach(function (d) {
            d.age = d.age;
            d.value = d.value;

        });

        

        var zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        //g element arc
        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc")
            .call(zoom)
            .on("mouseover", function () {

                tooltip.style("display", null);
            })
            .on("mouseout", function () {

                tooltip.style("display", "none");
            })

            .on("mousemove", function (d) {

                var xPos = d3.mouse(this)[0] - 15;
                var yPos = d3.mouse(this)[1] - 15;
                tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
                tooltip.select("text").text("value" + " :- " + d.value)

            });

        var tooltip = svg.append("g")
            .attr("class", ".tooltip")
            .style("display", "none");

        tooltip.append("text")
            .attr("x", "15")
            .attr("dy", "0.5em")
            .style("font-size", "1.0em");




        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {

                return color(d.data.value);
            })
            .transition()
            .ease(d3.easeLinear)
            .duration(1000)
            .attrTween("d", pieTween);


        g.append("text")
            .transition()
            .ease(d3.easeLinear)
            .duration(2500)
            .attr("transform", function (d) {

                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {

                return d.data.age;
            });


        function clicked(d) {
            if (active.node() === this) return reset();
            active.classed("active", false);
            active = d3.select(this).classed("active", true);

            var bounds = path.bounds(d),
                dx = bounds[1][0] - bounds[0][0],
                dy = bounds[1][1] - bounds[0][1],
                x = (bounds[0][0] + bounds[1][0]) / 2,
                y = (bounds[0][1] + bounds[1][1]) / 2,
                scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
                translate = [width / 2 - scale * x, height / 2 - scale * y];

            svg.transition()
                .duration(1000)
                .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)); 
        }

        function reset() {
            active.classed("active", false);
            active = d3.select(null);

            g.transition()
                .duration(750)
                // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
                .call(zoom.transform, d3.zoomIdentity); // updated for d3 v4
        }


        function zoomed() {
            g.style("stroke-width", 1.5 / d3.event.transform.k + "px");

            g.attr("transform", d3.event.transform); 
        }


        function stopped() {
            if (d3.event.defaultPrevented) d3.event.stopPropagation();
        }



    });



    // Radius and Margin

    var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        width = 700 - margin.right - margin.left,
        height = 700 - margin.top - margin.bottom,
        radius = width / 3;


    var color = d3.scaleOrdinal(["#BBDEFB", "#98CAF9", "#64B5F6", "#42A5F5"]);
    // arc generator

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 80);


    //pie generator
    var pie = d3.pie()
        .sort(null)
        .value(function (d) {

            return d.value;
        });

    // define svg
    var svg = d3.select(".importPie")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



    function pieTween(b) {

        b.innerRadius = 0;
        var i = d3.interpolate({
            startAngle: 0,
            endAngle: 0
        }, b);
        return function (t) {
            return arc(i(t));
        };
    }





    /******end***/
}