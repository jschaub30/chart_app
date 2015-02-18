var diameter = 900,
    width = diameter,
    height = diameter;
    
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 160])
    //.separation(function(a, b) { return (a.parent == b.parent ? 1 : 10) / a.depth; });
    .separation(function(a, b) { return Math.min(5, (a.parent == b.parent ? 1 : 2) / a.depth); });

/* Radial layout */
var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", width )
    .attr("height", height )
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json(json_file, function(error, flare) {
  root = flare; 
  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(collapse);  // start with all children collapsed
  update(root);
});


d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 95; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .on("click", click);

   nodeEnter.append("circle")
       .attr("r", 1e-6)
       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
          .attr("dy", ".31em")
          .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .text(function(d) { return d.first_name + ' ' + d.last_name; })
          .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  nodeUpdate.select("circle")
      .attr("r", function(d){
        if(d["is_manager"]){
          return 2*Math.log(1 + Number(d["full_count"]+d["supp_count"])) + 4.5;
        } else{
          return 4.5;
        }
      })
      .style("fill", function(d){
        if (d["is_full_time"]){
          return "#466BB0" // IBM Blue
        }
        if (d["is_supplemental"]){
          return "#A2B5D7" // IBM Blue lighter
        }
        return "#FFFFFF"
      });

  nodeUpdate.select("text")
      .style("fill-opacity", 1)
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; });


  // TODO: appropriate transform
  var nodeExit = node.exit().transition()
      .duration(duration)
      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter()
      .insert("path", "g")
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

    // nodeUpdate.select("text")
 //      .style("fill-opacity", 1)
 //      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + String(d.first_name.length + d.last_name.length + 0) + ")"; });
 //      .attr("transform", function(d) {
 //        console.log(d);
 //        return d.x < 180 ? "translate(0)" : "rotate(180)translate(0)"; });

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;

  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  
  update(d);
  rotate(d)
}

function rotate(source) {

  // var node = svg.selectAll("g.node")
 //  var nodeUpdate = node.transition()
 //  .duration(duration);
 //      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
 //
 //    nodeUpdate.select("text")
 //      .style("fill-opacity", 1)
 //      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + String(d.first_name.length + d.last_name.length + 0) + ")"; });
 //      .attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(0)"; });
}

// Collapse nodes
function collapse(d) {
  if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
}
