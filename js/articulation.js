var cycle = {"nodes" : 0, "cost" : 0, "edges" : []};

function pvc () {
    var nbNodes = nodes.length;
    var edge = 0;
    while(cycle.nodes < nbNodes && edge < weightedEdges.length){
        var edgeId = weightedEdges[edge][0]; 
        var from = edges._data[edgeId].from;
        var to = edges._data[edgeId].to;
        
        if(nodes._data[from].value < 2 && nodes._data[to].value < 2){
            if(!connected(from, to) || cycle.nodes === nbNodes - 1){
                cycle.nodes++;
                cycle.cost = cycle.cost + weightedEdges[edge][1];
                cycle.edges.push(edgeId);
                if(edges._data[edgeId].color.color === color1){
                    var newEdge = $.extend({}, edges._data[edgeId]);
                    newEdge.id = "e" + edges.length;
                    edges.length++;
                    newEdge.color = {color: color2};

                    edges._data[newEdge.id] = newEdge;
                }else{
                    edges._data[edgeId].color = {color: color2};
                }
                nodes._data[from].value++;
                nodes._data[to].value++;
                connect(from,to);
            }
        }
        edge++;
    }
    console.log("cost : " + cycle.cost + "  edges : " + JSON.stringify(cycle.edges));
    network = new vis.Network(container, data, options); 
}


function insertEdge (id , weight) {
    var interv = 0;
    var end = weightedEdges.length - 1;
    var middle = 0;

    var findIt = false;
        
    while (!findIt && end >= interv)
    {
        middle = Math.floor((interv + end) / 2);
        if(weightedEdges[middle][1] === weight) findIt = true;
        else weightedEdges[middle][1] < weight ? interv = middle + 1 : end = middle - 1;
    }

    if(findIt) weightedEdges.splice(middle, 0, [id, weight]);
    else    weightedEdges.splice(interv, 0, [id, weight]);
}

function connected (n, m) {
    return nodes._data[n].title.includes(m);
}

function connect(n, m){
    for(var adjacent in nodes._data[n].title) nodes._data[nodes._data[n].title[adjacent]].title = union_arrays(nodes._data[nodes._data[n].title[adjacent]].title, nodes._data[m].title);
    for(var adjacent in nodes._data[m].title) nodes._data[nodes._data[m].title[adjacent]].title = union_arrays(nodes._data[nodes._data[m].title[adjacent]].title, nodes._data[n].title);

    function union_arrays (x, y) {
        var obj = {};
        for (var i = x.length-1; i >= 0; -- i)
           obj[x[i]] = x[i];
        for (var i = y.length-1; i >= 0; -- i)
           obj[y[i]] = y[i];
        var res = []
        for (var k in obj) {
          if (obj.hasOwnProperty(k))  // <-- optional
            res.push(obj[k]);
        }
        return res;
      }
}

