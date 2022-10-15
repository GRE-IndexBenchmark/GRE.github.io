// Apply JSON to remember the indexList
let indexList = [];

function showList(){
    for(let i in new Array(indexList.length).fill(1)){
        appen(i);
    }
    var hidden = document.getElementById("showOptions");
    hidden.setAttribute("onclick","hideOption()");
    hidden.innerText="Hide Option";
}

function hideOption(){
    for(let i in new Array(indexList.length).fill(1)){
        document.getElementById(i+"").remove();
    }
    var hidden = document.getElementById("showOptions");
    hidden.setAttribute("onclick","showList()");
    hidden.innerText="Show Option";
}

function selectAll(){
    for(let i in new Array(indexList.length).fill(1)){
        indexList[i].present="true";
    }
    if(document.getElementById("showOptions").innerText=='Hide Option'){
        for(let i in new Array(indexList.length).fill(1)){
            document.getElementById(i+"").remove();
            appen(i);
        }
    } 
}

function selectUPAB(){
    for(let i in new Array(indexList.length).fill(1)){
        if(indexList[i].type=="UPAB")
            indexList[i].present="true";
        else
            indexList[i].present="false";
    }
    if(document.getElementById("showOptions").innerText=='Hide Option'){
        for(let i in new Array(indexList.length).fill(1)){
            document.getElementById(i+"").remove();
            appen(i);
        }
    }
}

function selectRDON(){
    for(let i in new Array(indexList.length).fill(1)){
        if(indexList[i].type=="RDON")
            indexList[i].present="true";
        else
            indexList[i].present="false";
    }
    if(document.getElementById("showOptions").innerText=='Hide Option'){
        for(let i in new Array(indexList.length).fill(1)){
            document.getElementById(i+"").remove();
            appen(i);
        }
    }
}

function check(i){
    if(indexList[i].present=="true"){
        indexList[i].present="false";
    }
    else{
        indexList[i].present="true";
    }
}

function appen(i){
    var old = document.getElementById("indexList");
    let newitem = document.createElement("tr");
    let element = ' <div style="color: black; display: block;"><input type="checkbox" style="height:15px;width:15px" onclick="check('+i+')"><label></label></div>';
    newitem.id=i+'';
    newitem.innerHTML = element;
    newitem.querySelectorAll("input")[0].id = indexList[i].name; 
    if(indexList[i].present=='true'){
        newitem.querySelectorAll("input")[0].setAttribute('checked','true');
    }
    newitem.querySelectorAll("label")[0].setAttribute('for',indexList[i].name); 
    newitem.querySelector("label").innerText = indexList[i].name;
    old.appendChild(newitem);
    document.querySelector("form").reset();
}

function save(){
    fetch('./data/indexList.txt', {
        method: 'PUT',
        body: JSON.stringify(indexList)
        });
}

// function load(){
//     fetch('./data/indexList.txt')
//     .then(res => res.text())
//     .then(txt => {
//         if(indexList.length==0)
//             indexList=indexList.concat(JSON.parse(txt));
//         for(let i in new Array(indexList.length).fill(1)){
//             appen(i);
//         }
//     }); 
// }

function newRow1(i,t,k){
    let res = '<td>Plot<button'
    if(indexList[i].plot=='true'){
        res = res + ' onClick="removePlot()">Remove</button></td><br>';
    }
    else{
        res = res + ' onClick="addPlot()">Add</button></td>';
    }
    res = res+'<td><a href='+indexList[i].site+'>'+indexList[i].name+'</a></td>';
    return res;
}

function generate(){
    let t = document.getElementById("generateStandard").value;
    let k = document.getElementById("dataset").value;
    let g = document.getElementById("latencyBody");
    if(g!=null)
        g.remove();
    let tbody = document.createElement("tbody");
    tbody.id="latencyBody";
    for(let i in new Array(indexList.length).fill(1)){
        if(indexList[i].present=='true'){
            let newrow = document.createElement('tr');
            newrow.innerHTML=newRow1(i,t,k);
            tbody.appendChild(newrow);
        }
    }
    document.getElementById("latencyTable").appendChild(tbody);
}


window.onload=function(){
    fetch('./data/indexList.txt')
    .then(res => res.text())
    .then(txt => {
        indexList=indexList.concat(JSON.parse(txt));
        generate();
    }
    );
}