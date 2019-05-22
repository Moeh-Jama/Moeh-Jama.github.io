/*
	Creates the Periodic table
*/

function begin_script(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://moeh-jama.github.io/periodic_table.json');

	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		total_data = ourData;
		SetElement(ourData);
	};
	ourRequest.send();
}

function SetElement(data){
	var periodic_table = document.getElementById("periodic_table");
	setBox = "<div id='periodic_elements'>";
	var getter = data;


	setBox += "</div>";
	//periodic_table.insertAdjacentHTML('beforeend', setBox);

	setTable = "<table id='Table' cellspacing='1' cellpadding='0'><tr>";
	for(var g=1; g<19; g++)
	{
		setTable +="<th>"+g+"</th>";
	}
	setTable+="</tr>";
	var index = 1;
	for(var i=0; i<data.length; i++)
	{

		if(index == 1)
		{
			setTable +="<tr>";
		}

		if(i >= 56 && i <= 70)
		{
			
		}
		else if(i >= 88 && i <= 102)
		{
			
		}
		else if(index == data[i].Groups)
		{ 
				if(data[i].Ce != 0){
					setTable+="<td class='Box' style='background-color: rgb(0, "+(Math.round(data[i].Ce))*100+", 0);' onclick='GetFormula("+i+")' id="+data[i].Atomic_Number+"><p>"+data[i].Atomic_Number+"</p>";				
				}
				else{
					setTable+="<td class='Box' style='background-color: grey;' onclick='GetFormula("+i+")' id="+data[i].Atomic_Number+"><p>"+data[i].Atomic_Number+"</p>";
				}
				
				setTable +="<h4>"+data[i].Symbol+"</h4>";
				setTable+="<p>"+data[i].Atomic_Weight+"</p></td>";//+"<br>g/mol-1</p></td>";
				index++;
		}
		else{
			while(index != data[i].Groups)
			{	
				setTable +="<td>"+" "+"</td>";
				index++;
				if(index ==19 && !(i >= 56 && i <= 70 || i >= 88 && i <= 103))
				{
					index = 1;
				}
			}
			if(index == data[i].Groups)
			{
				if(data[i].Ce != 0){
					
				
					setTable+="<td class='Box' style='background-color: rgb(0, "+(Math.round(data[i].Ce))*100+", 0);' onclick='GetFormula("+i+")' id="+data[i].Atomic_Number+"><p>"+data[i].Atomic_Number+"</p>";				
				}
				else{
					setTable+="<td class='Box' style='background-color: grey;' onclick='GetFormula("+i+")' id="+data[i].Atomic_Number+"><p>"+data[i].Atomic_Number+"</p>";
				}
				setTable +="<h4>"+data[i].Symbol+"</h4>";
				setTable+="<p>"+data[i].Atomic_Weight+"</p></td>";//+"<br>g/mol-1</p></td>";
				index++;
			}
		}
		
		if(index ==19 && !(i >= 56 && i <= 70 || i >= 88 && i <= 103))
		{
			index = 1;
			setTable +="</tr>";
		}
	}
	index=1;
	setTable +="<tr>";



	for(var k=56; k<103; k++)
	{
		if(index == 1)
		{
			setTable +="<tr>";
		}
		if(index == data[k].Groups)
		{
			if(k>70 && k<87)
			{
				
				//setTable +="<td>"+"  "+"</td>";
				k=87;
				index = 1;
			}
			else{
				if(index==data[k].Groups)
				{
					if(data[k].Ce != 0){
					
				
					setTable+="<td class='Box' style='background-color: rgb(0, "+(Math.round(data[k].Ce))*100+", 0);' onclick='GetFormula("+k+")' id="+data[k].Atomic_Number+"><p>"+data[k].Atomic_Number+"</p>";				
					}
					else{
						setTable+="<td class='Box' style='background-color: grey;' onclick='GetFormula("+k+")' id="+data[k].Atomic_Number+"><p>"+data[k].Atomic_Number+"</p>";
					}
					setTable +="<h4>"+data[k].Symbol+"</h4>";
					setTable+="<p>"+data[k].Atomic_Weight+"</p></td>";//+"<br>g/mol-1</p></td>";
					index++;	
				}
				
			}
		}
		else{
			while(index != data[k].Groups && !(k>=70 && k<=87))
			{	
				setTable +="<td>"+" "+"</td>";
				index++;
				if(index ==19)
				{
					index = 4;
				}
			}
			if(index == data[k].Groups)
			{
				if(data[k].Ce != 0){
					
				
					setTable+="<td class='Box' style='background-color: rgb(0, "+(Math.round(data[k].Ce))*100+", 0);' onclick='GetFormula("+k+")' id="+data[k].Atomic_Number+"><p>"+data[k].Atomic_Number+"</p>";				
				}
				else{
					setTable+="<td class='Box' style='background-color: grey;' onclick='GetFormula("+k+")' id="+data[k].Atomic_Number+"><p>"+data[k].Atomic_Number+"</p>";
				}
				//setTable+="<td class='Box' onclick='GetFormula("+k+")' id="+data[k].Atomic_Number+"><p>"+data[k].Atomic_Number+"</p>";
				setTable +="<h4>"+data[k].Symbol+"</h4>";
				setTable+="<p>"+data[k].Atomic_Weight+"</p></td>";//+"<br>g/mol-1</p></td>";
				index++;
			}
		}
		if(index ==19)
		{
			index = 1;
			setTable +="</tr>";
		}
	}
	setTable+="</table>";

	
	periodic_table.insertAdjacentHTML('beforeend', setTable);
}




function GetFormula(index)
{
	var background = document.getElementById("return-periodic-query");
	//console.log("Test");
	//alert(total_data[index].Element+"    "+total_data[index].Elect_Confg);
	writer ="<div class='batter'><div class='title_sect' style={'height: 0; transition:15s;}'>";
	writer += "<h4>"+total_data[index].Element+"</h4><br><h2>"+total_data[index].Symbol+"</h2>";
	writer+="<p>"+total_data[index].Elect_Confg+"</p></div>";

	writer += "<div class='description'><p>";

	writer+="The element "+total_data[index].Element+" is in group "+total_data[index].Groups+"<br>";
	writer+="It is a [Enter State of Matter]<br>The melting point of "+total_data[index].Element;
	writer+=" is "+total_data[index].mp+" degrees Celsius<br>";
	writer+="The Atomic Weight is "+total_data[index].Atomic_Weight+"g mol -1";
	writer+="<br>There are "+total_data[index].Atomic_Number+" proton(s) present in the element.";
	writer+="</p></div>";
	writer +="</div>";
	//console.log(writer);
	document.getElementById("return-periodic-query").innerHTML= writer;
	//background.insertAdjacentHTML('beforeend', writer);
}
function Cancel_All(){
	window.location.reload();
}