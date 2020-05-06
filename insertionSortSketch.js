
var bcolor="#33313b";
var blockColor="#3c4f65";
var highlighted="#834c69"
var n=40;
var gap=2;
var blockHeight=[];
var positions=[];
var blockWidth;
var width;
var height;
var started=0;
var ifCompleted=0;
var rate=60;

var w;
var	h;
var width;
var height;

//event listeners and selectors

var size0=document.querySelector("#size");
var rate0=document.querySelector("#rate");


var slider=document.querySelector("#slider0");
slider.addEventListener("input",speedChange);

var slider1=document.querySelector("#slider1");
slider1.addEventListener("input",arrayChanged);


var gen=document.querySelector("#generate");
gen.addEventListener("click",generate);

var start=document.querySelector("#start");
start.addEventListener("click",function(){j=0;i=1;started=1;});


function setup() 
{
	w=windowWidth;
	h=windowHeight;

	var c=createCanvas(w*(3/4),h*(3/4));
	c.position(w/8,h/4.5);

	width=w*(3/4);
	height=h*(3/4);

	background(bcolor);

	generate();

}

function generate()
{
	started=0;
	clear();
	background(bcolor);
	ifCompleted=0;
	i=1;
	j=0;

	

	blockWidth=(width-((n+1)*gap))/n;

	for(var i=0;i<n;i++)
		blockHeight[i]=height*(Math.random());

	for(var i=0;i<n;i++)
	{
		noStroke();
		fill(blockColor);
		rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);
		positions[i]=( ((i+1)*gap)+(i*blockWidth) );
	}

	print(positions);
	
	
}

var i=1;
var j=0;

function draw()
{
	frameRate(rate-0);
	background(bcolor);

	if(started==1&&ifCompleted==0)
	{
		if(check(j,i)==true)
		{
			update2(j);
			j=0;
		}

		update(j,i);

		j++;

		if(j>i)
		{
			i++;
			j=0;
		}

		if(i>=n)
			ifCompleted=1;

	}
	else if(ifCompleted==0)
		update();
	else
		over();
	
}

function check(j,i)
{
	if(blockHeight[i]<blockHeight[j])
	{
		var temp = blockHeight[i];
		blockHeight.splice(i,1);
		blockHeight.splice(j,0,temp);

		return true;
	}

	return false;

}

function update2(j)
{
	for(var i=0;i<n;i++)
	{
		if(i==j)
		{
			noStroke();
			fill("green");
			rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);
		
		}
		else
		{
			noStroke();
			fill(blockColor);
			rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);

		}
		
	}
}

function update(a,b)
{
	
	
	for(var i=0;i<n;i++)
	{
		if(i==a || i==b)
		{
			noStroke();
			fill(highlighted);
			rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);
		
		}
		else
		{
			noStroke();
			fill(blockColor);
			rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);

		}
		
	}


}




function over()
{
	started=0;

	textSize(20);
	fill("white");
	text("Sorted..!",20,30);
	
	for(var i=0;i<n;i++)
	{
		noStroke();
		fill(highlighted);
		rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);

	}
}



function speedChange()
{
	rate=slider.value;
	rate0.innerHTML=slider.value;
}

function arrayChanged()
{
	n=slider1.value-0;
	size0.innerHTML=slider1.value;
	ifCompleted=0;
	j=0;
	i=1;
	generate();
	update();
	print(n);
}