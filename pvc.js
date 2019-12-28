function pvc(graph, s,V) {
    //store all vertex apart from source vertex 
    vertex = []

    for (var i = 0; i < V; i++) {
        if (i != s) vertex.push(i)
    }

    min_path = Number.MAX_VALUE;
    var save1= [];
    var oldMinPath=min_path;
    while (true) {
        
        current_pathweight = 0;
        k = s;
        for (var i = 0; i < vertex.length; i++) {
            current_pathweight += graph[k][vertex[i]]
            k = vertex[i]
        }

        current_pathweight += graph[k][s]

        oldMinPath=min_path;
        min_path = Math.min(min_path,current_pathweight)

        console.log(oldMinPath,"||||",min_path)
        

        if(min_path<oldMinPath) {
            save1 = [...vertex];
        }
        

        if (!next_permutation(vertex)) break; 
    }
    var result = {
                    "min_path":min_path,
                    "nodes":save1

                 }

    return result;


}


function next_permutation(L) {

    n = L.length; 

    i = n - 2;

    while ((i >= 0) && (L[i] >= L[i + 1])) {
        i -= 1
    }


    if (i == -1){
        return false
    } 

    j = i + 1
    while ((j < n) && (L[j] > L[i])) {
        j += 1
    }
    j -= 1

    save = L[i]
    L[i] = L[j]
    L[j] = save

    left = i + 1
    right = n - 1

    while (left < right) {
        save = L[left]
        L[left] = L[right]
        L[right] = save
        left += 1
        right -= 1
    }
    return true;


}

function test(V,graph) {
    s = 0    
    return pvc(graph, s,V)
}

