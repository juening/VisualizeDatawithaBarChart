d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(error, data){
    if(error){
        console.log(error);
    } else {
        console.log(data);
        var w = 1000;
        var h = 600;
        var marginBottom = 30;
        var marginTop = 10;
        var marginLeft = 60;
        var marginRight = 10;
        var dataset =data.data;
        var minDate = new Date(data.from_date);
        var maxDate = new Date(data.to_date);
        
        var width = w- marginLeft- marginRight;
        var height = h - marginBottom - marginTop;
        
        var xScale = d3.scale.ordinal()
                             .domain(d3.range(dataset.length))
                             .rangeRoundBands([0, width],0.1);
        
        var yScale = d3.scale.linear()
                             .domain([0, d3.max(dataset, function(d){return d[1];})])
                             .range([height, 0]);

        
        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom')
                          .ticks(d3.time.years, 5);
        
        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient("left")
                          .ticks(10, "");
                
        var svg = d3.select('body')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);
        

        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(0,"  + ")")
            .call(yAxis);
        
        svg.selectAll('rect')
           .data(dataset)
           .enter()
           .append('rect')
           .attr('x', function(d, i){ return i * w / dataset.length;})
           .attr('y', function(d){return yScale(d[1]);})
           .attr('width', function(d){return w/dataset.length;})
           .attr('height', function(d){var barHeight = d[1]; return height -yScale( barHeight);})
           .attr('fill', 'teal');
    }
})