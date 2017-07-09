var btn = document.getElementById("btn");
var cls_btn = document.getElementById("close-btn");
var chemical_data = document.getElementById("chemical-info");
var first_computation = document.getElementById("display-computation");
var calc_submit = document.getElementById("submit");
btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
	};
	ourRequest.send();
});
function renderHTML(data){
	var htmlString = "this is a test";
	var myTable = "<table id='myTable'><tr><td>Group</td>";
	myTable+= "<td>Element</td>";
    myTable+="<td>Symbol</td>";
    myTable+="<td>Atomic Number</td>";
    myTable+="<td>Atomic Weight</td>";
    //myTable+="<td>Electronic Configuration</td>";
   // myTable+="<td>Ce</td></tr>"
	for (var i = 0; i <data.length; i++) {
		if(i%2 == 0)
		{
			myTable +="<tr class='even'><td>"+data[i].Groups+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Element+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Symbol+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Atomic_Number+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Atomic_Weight+"</td>";
		//	myTable+="<td style='text-align: center;'>"+data[i].Elect_Confg+"</td>";
			//myTable+="<td style='text-align: center;'>"+data[i].Ce+"</td></tr>"
		}
		else{
			myTable +="<tr class='odd'><td>"+data[i].Groups+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Element+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Symbol+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Atomic_Number+"</td>";
			myTable+="<td style='text-align: center;'>"+data[i].Atomic_Weight+"</td>";
		//	myTable+="<td style='text-align: center;'>"+data[i].Elect_Confg+"</td>";
		//	myTable+="<td style='text-align: center;'>"+data[i].Ce+"</td></tr>"
		}
	}
	myTable+="</table>"
	chemical_data.insertAdjacentHTML('beforeend', myTable);
};

calc_submit.addEventListener("click", function(){
	var first_element = document.getElementById("f_element");
	var last_element = document.getElementById("l_element");
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		calculate_Elements(first_element, last_element, ourData);
	};
	ourRequest.send();
});
function calculate_Elements(f_element, l_element, data)
{
	var total_atomic_weight =0;
	var fi_el="";
	var la_el = "";
	var first="<table><tr><th>Element</th><th>Atomic Weight</th></tr>";

	
	for(var i=0; i<data.length; i++)
	{
		if(f_element.value == data[i].Symbol)
		{
			total_atomic_weight += data[i].Atomic_Weight;
			console.log(data[i].Symbol);
			first+="<tr><td>"+data[i].Element+"</td><td>"+data[i].Atomic_Weight+"</td></tr>";
			fi_el=data[i].Symbol;
		}
		if(l_element.value == data[i].Symbol)
		{
			total_atomic_weight += data[i].Atomic_Weight;
			console.log(data[i].Symbol);
			first+="<tr><td>"+data[i].Element+"</td><td>"+data[i].Atomic_Weight+"</td></tr>";
			la_el = data[i].Symbol;
		}
	}
	first+="<tr><td>"+fi_el+la_el+"</td>"+"<td>"+total_atomic_weight+"</td></tr>";
	first+="</table>";
	first_computation.insertAdjacentHTML('beforeend', first);
}
function closeTable(){
	//document.getElementById('myTable').style.display = 'none';
	window.location.reload();
}





