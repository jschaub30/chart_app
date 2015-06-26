var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 1400 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var legend = svg.append('g');

legend.append('rect')
  .attr('rx', 10)
  .attr('rx', 10)
  .attr('x', -80)
  .attr('y', 0)
  .attr('height', 50)
  .attr('width', 170)
  .style('fill', '#A2B5D7');
legend.append('text')
  .text('Left click to toggle 1 level')
  .attr('x', -75)
  .attr('y', 20)
  .style('font-size','12px');
legend.append('text')
  .text('Right click to toggle 2 levels')
  .attr('x', -75)
  .attr('y', 40)
  .style('font-size','12px');

var tooltip = d3.select("#chart")
  .append("div")
    .style("position", "absolute")
    .style("font-family", "Helvetica")
    .style("z-index", "10")
    .style("background-color", "#FFFFFF")
    .style("visibility", "hidden")
    .text("a simple tooltip");

d3.json(json_file, function(error, flare) {
  root = flare;
  root.x0 = height / 2;
  root.y0 = 0;


  if ( lookup_email ){
    console.log(lookup_email);  // Don't collapse root
    lookup_email <- false
  } else {
    root.children.forEach(collapse);
  //root.children.forEach(expand);
  }
  update(root);
});

d3.select(self.frameElement).style("height", "800px");

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

var depth = 0;

function expand(d) {
  // console.log(d.name);
  // console.log(depth);
  if (depth < 2){
  if (d._children) {
    depth = depth + 1;
    d.children  = d._children;
    d.children.forEach(expand);
    depth = depth - 1;
    d._children = null;
  }
}
    
}

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });


      
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click)
      .on("contextmenu", function(d, index) {
           //handle right click

           //stop showing browser menu
           d3.event.preventDefault();
           // console.log(d);
           if (d._children) {
             // console.log("Depth is " + d.depth);
             expand(d);
           } else {
             collapse(d);
           }

           update(root);
      });

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  nodeEnter.on("mouseover", function(d) {
    tooltip.style("visibility", "visible");
    tooltip.style("top", (d3.event.pageY-20)+"px").style("left",(d3.event.layerX + 20)+"px");
    tooltip.style("padding", "12px")
    tooltip.style("background", "#e3e3e3")
    html_str = d["name"] + '<br />';
    html_str += d["job_responsibility"] + '<br />';
    html_str += d["email"] + '<br />';

    if (d["is_manager"]){
      html_str = html_str + d["full_count"] + '(full-time) and ' + d["supp_count"] + ' (supplemental) reports<br />';

    }
    html_str = html_str + d["location"];
    tooltip.html(html_str);
  })
  .on("mouseout", function(d) {
    tooltip.style("visibility", "hidden");
  });
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", function(d){
        // Apply special formatting to person being looked up
        if ( lookup_email ){
          if (d['email'].toLowerCase()==lookup_email.toLowerCase()){
            return 15;
          }
        }
        if(d["is_manager"]){
          return 2*Math.log(1 + Number(d["full_count"]+d["supp_count"])) + 4.5;
        } else{
          return 4.5;
        }
      })
      //.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
      .style("fill", function(d){
        // Apply special formatting to person being looked up
        if ( lookup_email ){
          if (d['email'].toLowerCase()==lookup_email.toLowerCase()){
            return "#FEE529"
          }
        }
        if(d["is_manager"]){
          return "#216C2A";  // Money green
        }
        if (d["is_full_time"]){
          return "#466BB0" // IBM Blue
        }
        if (d["is_supplemental"]){
          return "#A2B5D7" // IBM Blue lighter
        }
        return "#FFFFFF"
      });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);


  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d3.event.shiftKey) {
      console.log("Mouse+Shift pressed");
  }
    if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
