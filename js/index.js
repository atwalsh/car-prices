// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

d3.csv("/data/car_prices-updated.csv").then(function (data) {
    // Render initial chart
    renderMpgChart(data);
    // Add event listener for list group
    const divs = document.querySelectorAll('.list-group-item');
    divs.forEach(el => el.addEventListener('click', event => {
        // Clear chart container
        // document.getElementById("pane").innerHTML = "";
        // Render chart depending on list group choice
        switch (event.target.getAttribute("id")) {
            case 'mpg':
                document.getElementById("chart-mpg").innerHTML = "";
                renderMpgChart(data);
                break;
            case 'dimensions':
                document.getElementById("chart-dim1").innerHTML = "";
                document.getElementById("chart-dim2").innerHTML = "";
                document.getElementById("chart-dim3").innerHTML = "";
                document.getElementById("chart-dim4").innerHTML = "";
                document.getElementById("chart-dim5").innerHTML = "";
                renderDimensionChart(data);
                break;
            case 'engine':
                console.log('ENG');
                document.getElementById("chart-eng1").innerHTML = "";
                document.getElementById("chart-eng2").innerHTML = "";
                document.getElementById("chart-eng3").innerHTML = "";
                document.getElementById("chart-eng4").innerHTML = "";
                document.getElementById("chart-eng5").innerHTML = "";
                renderEngineChart(data);
                break;
            default:
                break;
        }
    }));
})

function renderMpgChart(data) {
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    svg = d3.select("#chart-mpg")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    x = d3.scaleLinear()
        .domain([0, 50])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    y = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.citympg); })
        .attr("cy", function (d) { return y(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")
}



function renderDimensionChart(data) {
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 300 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
    svg1 = d3.select("#chart-dim1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x1 = d3.scaleLinear()
        .domain([80, 125])
        .range([0, width]);
    svg1.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x1))
    y1 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg1.append("g")
        .call(d3.axisLeft(y1));
    svg1.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x1(d.wheelbase); })
        .attr("cy", function (d) { return y1(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg2 = d3.select("#chart-dim2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x2 = d3.scaleLinear()
        .domain([130, 220])
        .range([0, width]);
    svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x2))
    y2 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y2));
    svg2.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x2(d.carlength); })
        .attr("cy", function (d) { return y2(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg3 = d3.select("#chart-dim3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x3 = d3.scaleLinear()
        .domain([58, 76])
        .range([0, width]);
    svg3.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x3))
    y3 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg3.append("g")
        .call(d3.axisLeft(y3));
    svg3.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x3(d.carwidth); })
        .attr("cy", function (d) { return y3(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg4 = d3.select("#chart-dim4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x4 = d3.scaleLinear()
        .domain([45, 62])
        .range([0, width]);
    svg4.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x4))
    y4 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg4.append("g")
        .call(d3.axisLeft(y4));
    svg4.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x4(d.carheight); })
        .attr("cy", function (d) { return y4(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg5 = d3.select("#chart-dim5")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x5 = d3.scaleLinear()
        .domain([1000, 4700])
        .range([0, width]);
    svg5.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x5))
    y5 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg5.append("g")
        .call(d3.axisLeft(y5));
    svg5.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x5(d.curbweight); })
        .attr("cy", function (d) { return y5(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")
}


function renderEngineChart(data) {
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 300 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
    svg1 = d3.select("#chart-eng1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x1 = d3.scaleLinear()
        .domain([0, 350])
        .range([0, width]);
    svg1.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x1))
    y1 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg1.append("g")
        .call(d3.axisLeft(y1));
    svg1.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x1(d.horsepower); })
        .attr("cy", function (d) { return y1(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg2 = d3.select("#chart-eng2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x2 = d3.scaleLinear()
        .domain([4000, 7000])
        .range([0, width]);
    svg2.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x2))
    y2 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y2));
    svg2.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x2(d.peakrpm); })
        .attr("cy", function (d) { return y2(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg3 = d3.select("#chart-eng3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x3 = d3.scaleLinear()
        .domain([58, 76])
        .range([0, width]);
    svg3.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x3))
    y3 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg3.append("g")
        .call(d3.axisLeft(y3));
    svg3.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x3(d.carwidth); })
        .attr("cy", function (d) { return y3(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg4 = d3.select("#chart-eng4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x4 = d3.scaleLinear()
        .domain([45, 62])
        .range([0, width]);
    svg4.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x4))
    y4 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg4.append("g")
        .call(d3.axisLeft(y4));
    svg4.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x4(d.carheight); })
        .attr("cy", function (d) { return y4(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")

    svg5 = d3.select("#chart-eng5")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x5 = d3.scaleLinear()
        .domain([1000, 4700])
        .range([0, width]);
    svg5.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x5))
    y5 = d3.scaleLinear()
        .domain([0, 50000])
        .range([height, 0]);
    svg5.append("g")
        .call(d3.axisLeft(y5));
    svg5.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x5(d.curbweight); })
        .attr("cy", function (d) { return y5(d.price); })
        .attr("r", 4)
        .style("fill", "#69b3a2")
}

// tooltip = d3.select("#chart-mpg")
// .append("div")
// .style("opacity", 0)
// .attr("class", "tooltip")
// .style("background-color", "white")
// .style("border", "solid")
// .style("border-width", "1px")
// .style("border-radius", "5px")
// .style("padding", "10px")

// mouseover = function (event, d) { tooltip.style("opacity", 1) }
// mousemove = function (event, d) {
//     tooltip
//         .html(`The exact value of<br>the Ground Living area is: ${d.price}`)
//         .style("left", (event.pageX + 10) + "px")
//         .style("top", (event.pageY - 50) + "px")
// }
// mouseleave = function (event, d) {
//     tooltip
//         .transition()
//         .duration(500)
//         .style("opacity", 0)
// }

// svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .join("circle")
//     .attr("cx", function (d) { return x(d.citympg); })
//     .attr("cy", function (d) { return y(d.price); })
//     .attr("r", 4)
//     .style("fill", "#69b3a2")
//     .on("mouseover", mouseover)
//     .on("mousemove", mousemove)
//     .on("mouseleave", mouseleave)