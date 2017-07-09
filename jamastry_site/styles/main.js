var first_computation = document.getElementById("submition-report");
var calc_submit = document.getElementById("submit");

/*calc_submit.addEventListener("click", function(){
	var first_element = document.getElementById("f_element");
	var last_element = document.getElementById("l_element");
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		calculate_Elements(first_element, last_element, ourData);
	};
	ourRequest.send();
});*/
function begin_calculation(){
	var first_element = document.getElementById("f_element");
	var last_element = document.getElementById("l_element");
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		calculate_Elements(first_element, last_element, ourData);
	};
	ourRequest.send();
}
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
			first+="<tr><td>"+data[i].Element+"</td><td>"+data[i].Atomic_Weight+"g mol -1</td></tr>";
			fi_el=data[i].Symbol;
		}
		if(l_element.value == data[i].Symbol)
		{
			total_atomic_weight += data[i].Atomic_Weight;
			console.log(data[i].Symbol);
			first+="<tr><td>"+data[i].Element+"</td><td>"+data[i].Atomic_Weight+"g mol -1</td></tr>";
			la_el = data[i].Symbol;
		}
	}
	first+="<tr><td>"+fi_el+la_el+"</td>"+"<td>"+total_atomic_weight+"g mol -1</td></tr>";
	first+="</table>";
	document.getElementById("submition-report").innerHTML = first;
	//first_computation.insertAdjacentHTML('beforeend', first);
}
function closeTable(){
	//document.getElementById('myTable').style.display = 'none';
	window.location.reload();
}





