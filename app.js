d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(error, data){
    if(error){
        console.log(error);
    } else {
        console.log(data);
        var w = 1000;
        var h = 600;
        var marginBottom = 30;
        var marginTop = 10;
        var marginLeft = 90;
        var marginRight = 10;
        var dataset =data.data;
        var minDate = new Date(data.from_date);
        var maxDate = new Date(data.to_date);
        
        var width = w - marginLeft- marginRight;
        var height = h - marginBottom - marginTop;
        var barWidth = Math.floor(width / dataset.length);
        
        var xScale = d3.time.scale()
                             .domain([minDate,maxDate])
                             .range([0, width]);
        
        var yScale = d3.scale.linear()
                             .domain([0, d3.max(dataset, function(d){return d[1];})])
                             .range([height, 0]);

        
        var xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient('bottom')
                          .ticks(d3.time.years, 5);
        
        var yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient('left')
                          .ticks(20, '');
                
        var svg = d3.select('body')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h);
        

        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(0" + ', ' + height +")")
            .call(xAxis);
        
        svg.append('g')
            .attr('class', 'axis')
            .call(yAxis)  
            .selectAll('text')            
            .style('transform','rotate(-90deg');
        
        svg.append('g')

            .selectAll('rect')
           .data(dataset)
           .enter()
           .append('rect')
           .attr('x', function(d, i){ return xScale(new Date(d[0]));})
           .attr('y', function(d){return yScale(d[1]);})
           .attr('width', barWidth)
           .attr('height', function(d){return height  - yScale(d[1]);})
           .attr('fill', 'teal');
    }
})