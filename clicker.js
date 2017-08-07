
function Project_Display_Settings(identifier){
	var div = document.getElementById(identifier);
	if(div.innerHTML == "")
	{	
		writer = "";
		if(identifier == "CrossFire")
		{
			writer += "<p class='text-section'>";
			writer+="This was a game developed for my Software Engineering class where me and a partner developed in C.<span class='Indent-Here'>the game is based on a rpg table top sort of way.";
			writer+= " The main goal of the game is to be the last surviving player out of max 6 players.</p-->";
		}
		else if(identifier == "jamastry")
		{
			//alert("YEP");
			writer +="<p class='text-section'>This is an application I created during";
			writer +=" the summer of 2017. It is a JavaScript based chemistry calculator. [EXPLAIN]<br>";
			writer += "<a href='jamastry_site/index.html'>Check The App Out</p>";
		}
		document.getElementById(identifier).innerHTML = writer;
		document.getElementById(identifier).style.opacity = "1";
	}else{
		document.getElementById(identifier).style.opacity = "0";
		while(div.firstChild){
    		div.removeChild(div.firstChild);
    	}
	}
	
}


function GotToPage(site){
	if(site == "facebook")
	{	
		window.location.href="https://www.facebook.com";
	}
	else if(site =="linkedin")
	{
		window.location.href="https://www.linkedin.com/in/mohamed-jama/";
	}
	else if(site == "github")
	{
		window.location.href="https://github.com/Moeh-Jama/";
	}
}
