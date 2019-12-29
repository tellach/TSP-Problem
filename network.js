var OnAddEdgeEdgeData, OnAddEdgeCallback;
var successiveID;
var network = null;
var nodes = new vis.DataSet([{
    id: 0,
    label: 'Node 0'
},
{
    id: 1,
    label: 'Node 1'
},
{
    id: 2,
    label: 'Node 2'
},
{
    id: 3,
    label: 'Node 3'
}
]);

var edges = new vis.DataSet([
]);

// create a network
var data = {
    nodes: nodes,
    edges: edges
};

document.getElementById("confirm").addEventListener("click",function(){
    var from = OnAddEdgeEdgeData.from;
    var to = OnAddEdgeEdgeData.to;
    OnAddEdgeEdgeData.label = document.getElementById("poids").value;
    OnAddEdgeEdgeData.weight = parseInt(document.getElementById("poids").value);
    OnAddEdgeEdgeData.title = document.getElementById("poids").value;//CHANGED
    $('#modal').modal('hide')
    if (from !== to){
      OnAddEdgeCallback(OnAddEdgeEdgeData);
    }
});

function getNextId(){
    return parseInt(data.nodes._data[data.nodes.length-1].id) + 1;
}


function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}

function draw() {
    destroy();
    nodes = [];
    edges = [];

    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
        manipulation: {
            addNode: function (data, callback) {
                // filling in the popup DOM elements
                data.id = getNextId();
                data.label = 'Node ' + data.id;
                document.getElementById('operation').innerHTML = "Add Node";
                document.getElementById('node-id').value = data.id;
                document.getElementById('node-label').value = data.label;
                document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
                document.getElementById('cancelButton').onclick = clearPopUp.bind();
                document.getElementById('network-popUp').style.display = 'block';
            },
            editNode: function (data, callback) {
                // filling in the popup DOM elements
                document.getElementById('operation').innerHTML = "Edit Node";
                document.getElementById('node-id').value = data.id;
                document.getElementById('node-label').value = data.label;
                document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
                document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
                document.getElementById('network-popUp').style.display = 'block';
            },
            addEdge: function (edgeData, callback) {
                OnAddEdgeEdgeData = edgeData;
                OnAddEdgeCallback = callback;
                document.getElementById("poids").value = 0;
                $('#modal').modal('show');
            },
            deleteNode: function(nodeData,callback){
                // console.log(data.nodes._data);
                // data.nodes._data[data.nodes.length-1].id = nodeData.nodes[0];
                callback(nodeData);
            }

        },
        configure: {
            filter: function (option, path) {
                if (path.indexOf('physics') !== -1) {
                    return true;
                }
                if (path.indexOf('smooth') !== -1 || option === 'smooth') {
                    return true;
                }
                return false;
            },
            container: document.getElementById('config')
        },
        interaction: {

        },

    };
    network = new vis.Network(container, data, options);
}

function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

function saveData(data, callback) {
    data.id = document.getElementById('node-id').value;
    data.label = document.getElementById('node-label').value;
    clearPopUp();
    callback(data);
}

// document.getElementById("articulation").addEventListener("click", tarjan);

class Graph {
    constructor(vertices) {
        this.time = 0;
        this.v = vertices;
        this.adj = new Array(this.v).fill(null).map(() => []);
    }
    addEdge(v, w) {
        this.adj[v].push(w)
        this.adj[w].push(v)
    }
    APUtil(u, visited, disc, low, parent, ap) {
        var children = 0;
        visited[u] = true;

        disc[u] = this.time;
        low[u] = this.time;
        this.time += 1;
        // disc[u] = low[u] = ++this.time; 

        var tab = this.adj[u]
        for (var i = 0; i < tab.length; i++) {
            var v = tab[i];
            if (!visited[v]) {
                children++;
                parent[v] = u;
                this.APUtil(v, visited, disc, low, parent, ap);


                low[u] = Math.min(low[u], low[v]);


                if ((parent[u] == -1) && (children > 1)) {
                    ap[u] = true;
                }



                if ((parent[u] != -1) && (low[v] >= disc[u])) {
                    ap[u] = true;
                }



            }
            else if (v != parent[u]) {
                low[u] = Math.min(low[u], disc[v]);

            }
        }
    }
    AP() {

        let visited = Array(this.v).fill(null).map(() => false)
        let disc = Array(this.v).fill(null).map(() => 0)
        let low = Array(this.v).fill(null).map(() => 0)
        let parent = Array(this.v).fill(null).map(() => -1)
        let ap = Array(this.v).fill(null).map(() => false)

        for (var i = 0; i < this.v; i++) {
            if (visited[i] == false)
                this.APUtil(i, visited, disc, low, parent, ap);
        }

        for (var j = 0; j < this.v; j++) {
            data.nodes.update({ id: j, color: { background: '#349feb' } })

            if (ap[j] == true) {
                data.nodes.update({ id: j, color: { background: '#eb4034' } })
            }

        }


    }
}

function tsp() {
    var edges = data.edges;
    var nodes = data.nodes;
    let l= nodes.length;
    graph = new Array(l).fill(null).map(() => Array(l).fill(999));
    graph2 = [
        [0, 1, 10, 20],
        [10, 0, 35, 1],
        [1, 10, 0, 30],
        [10, 25, 1, 0]]

    for(var i=0;i<l;i++){
        graph[i][i] = 0;
        edges.forEach(element => {
            graph[element.from][element.to] = element.weight;
            graph[element.to][element.from] = element.weight;
        });
        
    }
    s = 0
    var t0 = performance.now();
    var o = pvc(graph, s,l)
    var t1 = performance.now();
    var o2 = test(graph,l)
    var t2 = performance.now();


    console.log("bruteFroce",o.min_path,"time",t1-t0)
    
    console.log("backtracking",o2,"time",t2-t1)



    var tab = [];
    var el = {};
    for(var i = 0 ;i<o.nodes.length;i++){
        el.from = o.nodes[i];
        if (i != o.nodes.length - 1){
            el.to = o.nodes[i+1];
            tab.push(el);
        }else{
            el.to=0;
            tab.push(el);
        }
        el={}
    }
    el={}
    el.from = 0
    el.to = o.nodes[0];
    tab.push(el);


    edges.forEach(element => {

        el={}
        el.from = element.from
        el.to = element.to
        el2={}
        el2.from = element.to
        el2.to = element.from
        if(containsObject(el,tab) || containsObject(el2,tab)){
            edges.update({id:element.id,color :{color:'#ff383f'}})
        } 
    });
    

    
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].from == obj.from && list[i].to == obj.to) {
            return true;
        }
    }

    return false;
}
