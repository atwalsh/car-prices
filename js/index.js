colorOne = "#ffc107";
colorTwo = "#a56eff";
colorThree = "#fa4d56";
colorFour = "#3ddbd9";
colorFive = "#012749";


const fuelTypeColor = d3.scaleOrdinal()
    .domain(["gas", "diesel"])
    .range([colorOne, colorTwo])
const aspirationColor = d3.scaleOrdinal()
    .domain(["std", "turbo"])
    .range([colorOne, colorTwo])
const doorNumberColor = d3.scaleOrdinal()
    .domain(["two", "four"])
    .range([colorOne, colorTwo])
const carBodyColor = d3.scaleOrdinal()
    .domain(["convertible", "hatchback", "sedan", "wagon", "hardtop"])
    .range([colorOne, colorTwo, colorThree, colorFour, colorFive])
const engineLocationColor = d3.scaleOrdinal()
    .domain(["front", "rear"])
    .range([colorOne, colorTwo])

// Value is an array of: [color scale function, column in the dataset]
colorMap = {
    'fuelType': [fuelTypeColor, 'fueltype'],
    'aspiration': [aspirationColor, 'aspiration'],
    'doorNumber': [doorNumberColor, 'doornumber'],
    'bodyStyle': [carBodyColor, 'carbody'],
    'engineLocation': [engineLocationColor, 'enginelocation'],
}

function writeMpgCharts(data) {
    document.getElementById("chart-mpg1").innerHTML = "";
    document.getElementById("chart-mpg2").innerHTML = "";
    renderMpgChart(data);
}
function writeDimensionCharts(data) {
    document.getElementById("chart-dim1").innerHTML = "";
    document.getElementById("chart-dim2").innerHTML = "";
    document.getElementById("chart-dim3").innerHTML = "";
    document.getElementById("chart-dim4").innerHTML = "";
    document.getElementById("chart-dim5").innerHTML = "";
    renderDimensionChart(data);
}
function writeEngineCharts(data) {
    document.getElementById("chart-eng1").innerHTML = "";
    document.getElementById("chart-eng2").innerHTML = "";
    document.getElementById("chart-eng3").innerHTML = "";
    document.getElementById("chart-eng4").innerHTML = "";
    renderEngineChart(data);
}

d3.csv("data/car_prices.csv").then(function (data) {
    // Render initial chart
    renderMpgChart(data);

    // Event listener for trait selector
    document.querySelectorAll('.list-group-item').forEach(el => el.addEventListener('click', event => {
        switch (event.target.getAttribute("id")) {
            case 'mpg':
                writeMpgCharts(data);
                break;
            case 'dimensions':
                writeDimensionCharts(data);
                break;
            case 'engine':
                writeEngineCharts(data);
                break;
            default:
                break;
        }
    }));

    // Event listener for color
    document.getElementById('colorSelect').addEventListener('change', function () {
        switch (this.value) {
            case 'fuelType':
                document.getElementById('selectPills').innerHTML = `
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorOne};">Gas</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorTwo};">Diesel</span></div>
                `;
                break;
            case 'aspiration':
                document.getElementById('selectPills').innerHTML = `
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorOne};">Natural</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorTwo};">Turbo</span></div>
                `;
                break;
            case 'doorNumber':
                document.getElementById('selectPills').innerHTML = `
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorOne};">Two</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorTwo};">Four</span></div>
                `;
                break;
            case 'bodyStyle':
                document.getElementById('selectPills').innerHTML = `
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorOne};">Convertible</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorTwo};">Hatchback</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorThree};">Sedan</span></div>
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorFour};">Wagon</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorFive};">Hardtop</span></div>
                `;
                break;
            case 'engineLocation':
                document.getElementById('selectPills').innerHTML = `
                <div><span class="badge rounded-pill text-dark" style="background-color: ${colorOne};">Front</span></div>
                <div><span class="badge rounded-pill" style="background-color: ${colorTwo};">Rear</span></div>
                `;
                break;
            default:
                break;
        }

        writeMpgCharts(data);
        writeDimensionCharts(data);
        writeEngineCharts(data);
    });
})

function renderMpgChart(data) {
    colorPair = colorMap[document.getElementById("colorSelect").value]
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    svg = d3.select("#chart-mpg1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x = d3.scaleLinear()
        .domain([10, 55])
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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

    svg = d3.select("#chart-mpg2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x = d3.scaleLinear()
        .domain([10, 55])
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
        .attr("cx", function (d) { return x(d.highwaympg); })
        .attr("cy", function (d) { return y(d.price); })
        .attr("r", 4)
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })
}



function renderDimensionChart(data) {
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 350 - margin.left - margin.right,
        height = 225 - margin.top - margin.bottom;

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })
}


function renderEngineChart(data) {
    margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

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
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

    svg2 = d3.select("#chart-eng2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x2 = d3.scaleLinear()
        .domain([0, 30])
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
        .attr("cx", function (d) { return x2(d.compressionratio); })
        .attr("cy", function (d) { return y2(d.price); })
        .attr("r", 4)
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

    svg3 = d3.select("#chart-eng3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x3 = d3.scaleLinear()
        .domain([1.5, 4.5])
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
        .attr("cx", function (d) { return x3(d.stroke); })
        .attr("cy", function (d) { return y3(d.price); })
        .attr("r", 4)
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

    svg4 = d3.select("#chart-eng4")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    x4 = d3.scaleLinear()
        .domain([0, 400])
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
        .attr("cx", function (d) { return x4(d.enginesize); })
        .attr("cy", function (d) { return y4(d.price); })
        .attr("r", 4)
        .style("fill", function name(d) { return colorPair[0](d[colorPair[1]]) })

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