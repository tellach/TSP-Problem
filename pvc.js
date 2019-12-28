const V = 4
function pvc(graph, s) {
    //store all vertex apart from source vertex 
    vertex = []

    for (var i = 0; i < V; i++) {
        if (i != s) vertex.push(i)
    }



    min_path = Number.MAX_VALUE;

    while (true) {
        current_pathweight = 0;
        k = s;

        for (var i = 0; i < vertex.length; i++) {
            current_pathweight += graph[k][vertex[i]]
            k = vertex[i]
        }

        current_pathweight += graph[k][s]
        min_path = Math.min(min_path, current_pathweight)

        if (!next_permutation(vertex)) break;
    }

    return min_path;


}


function next_permutation(L) {

    n = L.length; 

    i = n - 2;

    while ((i >= 0) && (L[i] >= L[i + 1])) {
        i -= 1
    }


    if (i == -1) return false

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

function test() {
    graph = [[0, 10, 15, 20], [10, 0, 35, 25],
    [15, 35, 0, 30], [20, 25, 30, 0]]
    s = 0    
    console.log(pvc(graph, s))
}

