var bcolor="#33313b";
var blockColor="#3c4f65";
var highlighted="#834c69"
var n=100;
var gap=2;
var blockHeight=[];
var positions=[];
var blockWidth;
var started=0;
var ifCompleted=0;
var rate=25;

var repositioned=0;

var w;
var	h;
var width;
var height;


//event listeners
var size0=document.querySelector("#size");
var rate0=document.querySelector("#rate");


var slider=document.querySelector("#slider0");
slider.addEventListener("input",speedChange);

var slider1=document.querySelector("#slider1");
slider1.addEventListener("input",arrayChanged);


var gen=document.querySelector("#generate");
gen.addEventListener("click",generate);

var start=document.querySelector("#start");
start.addEventListener("click",function(){started=1;});



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
	ifCompleted=0;
	index=null;
	x=0;
	clear();
	background(bcolor);

	var w=windowWidth;
	var h=windowHeight;
	width=w*(3/4);
	height=h*(3/4);

	blockWidth=(width-((n+1)*gap))/n;

	for(var i=0;i<n;i++)
	{
		blockHeight[i]=height*(Math.random());
		if(blockHeight[i]<5)
			blockHeight[i]+=5;
	}

	for(var i=0;i<n;i++)
	{
		noStroke();
		fill(blockColor);
		rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);
		positions[i]=( ((i+1)*gap)+(i*blockWidth) );
	}

	print(blockHeight);


	
}

var x=0,y=10000;
var index=null;


function draw()
{
	print(rate);
	
	frameRate(rate);
	background(bcolor);

	if(ifCompleted==1)
		over();
	
	

	if(started==1&&ifCompleted==0)
	{
		y=10000;

		if(x==n-1)
		{
			over();
			ifCompleted=1;
		}

		for(var i=x;i<n;i++)
		{

			if(blockHeight[i]<y)
			{
				y=blockHeight[i];
				index=i;
			}
		}

		showShortest(index);

		print(x);

		var temp=blockHeight[index];
		blockHeight[index]=blockHeight[x];
		blockHeight[x]=temp;
		update(x);

		x++;



	}
	else if(ifCompleted==0)
		update();


	
}

function showShortest(index)
{
	fill("#c0c0c0");

	rect(positions[index],0,5,30);
}

function update(index)
{
	
	for(var i=0;i<n;i++)
	{
		noStroke();
		fill(blockColor);
		rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);

		if(i==index)
		{
			fill(highlighted);
			rect(( ((i+1)*gap)+(i*blockWidth) ),height-blockHeight[i],(blockWidth),blockHeight[i]);

		}

		
	}


}


function over()
{
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
	generate();
	update();
	print(n);
}