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

        //g element arc
        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
     



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
            .duration(3000)
            .attr("transform", function (d) {

                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {

                return d.data.age;
            });
        

            
    });
    


    // Radius and Margin

    var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        },
        width = 590 - margin.right - margin.left,
        height = 590 - margin.top - margin.bottom,
        radius = width / 2;


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
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
       .on("mouseover", function () {

                tooltip.style("display", null);
            })
            .on("mouseout", function () {

                tooltip.style("display", "none");
            })

            .on("mousemove", function (d) {

                var xPos = d3.mouse(this)[0] - 15;
                var yPos = d3.mouse(this)[1] - 55;
                tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
                tooltip.select("text").text(d.age + " : " + d.value);
            });
        
    

            

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
    
     var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "0.5em")
            .style("font-size", "0.5em");
    
    
    
    
    /******end***/
}