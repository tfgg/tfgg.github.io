function make_timeline_line(element, datas, xlabel, ylabel) {
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 20, bottom: 50, left: 70}
    var width = $(element).width() - margin.left - margin.right
    var height = $(element).height() - margin.top - margin.bottom

    // Parse the date / time
    var parseDate = d3.time.format.iso.parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    var xmin, xmax, ymax;

    datas.forEach(function(data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
        });

        data.sort(function(a,b) { return d3.ascending(a.date,b.date); });

        xmin = d3.min([xmin, d3.min(data, function(d) { return d.date; })]);
        xmax = d3.max([xmax, d3.max(data, function(d) { return d.date; })]);
        ymax = d3.max([ymax, d3.max(data, function(d) { return d.value; })]);
    });

    // Scale the range of the data
    x.domain([xmin, xmax]);
    y.domain([0, ymax]);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });
        
    // Adds the svg canvas
    var svg = d3.select(element)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    datas.forEach(function(data, i) {
        // Add the valueline path.
        svg.append("path")
            .attr("class", "line line-" + (i+1))
            .attr("d", valueline(data));
    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // X axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(xlabel);

    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left)
        .attr("x", - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(ylabel);
}

function make_timeline_bar(element, data, xlabel, ylabel) {
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 20, bottom: 50, left: 70}
    var width = $(element).width() - margin.left - margin.right
    var height = $(element).height() - margin.top - margin.bottom

    // Parse the date / time
    var parseDate = d3.time.format("%Y-%m-%d").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis()
                 .scale(x)
                 .orient("bottom")
                 .tickFormat(d3.time.format("%Y-%m-%d"))
                 .ticks(d3.time.months,1);

    var yAxis = d3.svg.axis()
                 .scale(y)
                 .orient("left")
                 .ticks(5);

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });

    //data.sort(function(a,b) { return d3.ascending(a.date,b.date); });

    // Adds the svg canvas
    var svg = d3.select(element)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    var xdomain = x.domain();

    var bar_width = width / ((xdomain[1] - xdomain[0]) / 86400 / 1000 - 1);

    console.log(bar_width);

    // Add the bars
    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", bar_width)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("class", "bar");

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // X axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(xlabel);

    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left)
        .attr("x", - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(ylabel);
}

