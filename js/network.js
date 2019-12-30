  var OnAddEdgeEdgeData,OnAddEdgeCallback;
  //Colors
  var defaultColor = "#0e0ef3";
  color1 = "#f40000";
  color2 = "#00fe00";
  //weighted edges
var weightedEdges = [];
  
  var nodes = new vis.DataSet([/* ex : {label : ,id : ,title : ,value : ,group : } 
    
    {label : "node 0",id : 0,title : [0],value : 0,group : 1},
    {label : "node 1",id : 1,title : [1],value : 0,group : 1},
    {label : "node 2",id : 2,title : [2],value : 0,group : 1},
    {label : "node 3",id : 3,title : [3],value : 0,group : 1}*/
    ]);
    
    // create an array with edges
    var edges = new vis.DataSet([ /* ex : {from : ,to : , label : ,color :{color : '#848484'},id : "e"} 
    
    {from : 0,to : 1, title : "10",label: "10",color :{color : '#848484'},id : "e0"},
    {from : 0,to : 2, title : "9",label: "9",color :{color : '#848484'},id : "e1"},
    {from : 0,to : 3, title : "12",label: "12",color :{color : '#848484'},id : "e2"},
    {from : 1,to : 2, title : "13",label: "13",color :{color : '#848484'},id : "e3"},
    {from : 1,to : 3, title : "2",label: "2",color :{color : '#848484'},id : "e4"},
    {from : 2,to : 3, title : "8",label: "8",color :{color : '#848484'},id : "e5"}*/
    
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
    		nodes: nodes,
        edges: edges
    	};
        
    

    var options = {
                interaction:{
                    dragNodes: true,
                    dragView: false,
                    hideEdgesOnDrag: false,
                    hideNodesOnDrag: false,
                    hover: false,
                    hoverConnectedEdges: true,
                    keyboard: {
                      enabled: false,
                      speed: {x: 10, y: 10, zoom: 0.02},
                      bindToWindow: true
                    },
                    multiselect: false,
                    navigationButtons: true,
                    selectable: true,
                    selectConnectedEdges: true,
                    tooltipDelay: 300,
                    zoomView: true
                },
                physics: {
                  enabled: false
                },
                manipulation: {
                    addNode: function(nodeData,callback) {
                      nodeData.title = [nodes.length];                      
                      nodeData.label = 'node '+nodes.length;
                      nodeData.id = nodes.length;
                      nodeData.value = 0;
                      nodeData.group = 1;
                      callback(nodeData);
                    },
                    addEdge: function(edgeData,callback) {
                      OnAddEdgeEdgeData = edgeData;
                      OnAddEdgeCallback = callback;
                      document.getElementById("recipient-name").value=0;
                      document.getElementById("popUp").click();
                    }
                }
    };

    document.getElementById("confirm").addEventListener("click",function(){
      OnAddEdgeEdgeData.id = "e" + weightedEdges.length;
      OnAddEdgeEdgeData.color = {color: defaultColor};
      
      var from = OnAddEdgeEdgeData.from;
      var to = OnAddEdgeEdgeData.to;
      OnAddEdgeEdgeData.label = document.getElementById("recipient-name").value;
      insertEdge(OnAddEdgeEdgeData.id,parseInt(document.getElementById("recipient-name").value));
      OnAddEdgeEdgeData.title = document.getElementById("recipient-name").value;//CHANGED
      if (from !== to){
        OnAddEdgeCallback(OnAddEdgeEdgeData);
      }
    });

    // initialize your network!
    var network = new vis.Network(container, data, options);

    function addNodeLine(methode,cost,time,color){
      var tr = document.createElement("tr"); tr.id = methode; 
      var tdMethode = document.createElement("td"); tdMethode.innerHTML = methode; tdMethode.style.color = color;
      var tdCost = document.createElement("td"); tdCost.innerHTML = cost;
      var tdTime = document.createElement("td"); tdTime.innerHTML = time + " ms";

      tr.addEventListener("click",function(e){
        /*nothing*/
      },false);

      tr.appendChild(tdMethode);
      tr.appendChild(tdCost);
      tr.appendChild(tdTime);
      document.getElementById('nodesTable').appendChild(tr);
    }

