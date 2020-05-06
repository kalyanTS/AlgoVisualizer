
var bcolor="#33313b";
var blockColor="#3c4f65";
var highlighted="#834c69"
var n=200;
var gap=2;
var blockHeight=[];
var positions=[];
var blockWidth;
var width;
var height;
var started=0;
var ifCompleted=0; 
var rate=40;

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
start.addEventListener("click",function(){started=1;});

var h1=document.querySelector("#hi");




var arr=[];



function pair(p1,p2)
{
	this.p1=p1;
	this.p2=p2;
}



function setup() 
{
	var w=windowWidth;
	var h=windowHeight;

	var c=createCanvas(w*(3/4),h*(3/4));
	c.position(w/8,h/4.5);



	width=w*(3/4);
	height=h*(3/4);


	background(bcolor);



	generate();

	





}

function arrayGenerate()
{

	arr=[];

	var temp=[];
	temp.push(new pair(0,n));
	arr.push(temp);

	var o=true;

		while(o)
		{
			temp=[];
			var count=0;

			var temp1=arr.pop();

			for(var i=0;i<temp1.length;i++)
			{
				if(temp1[i].p2-temp1[i].p1>2)
				{
					var mid=Math.floor((temp1[i].p1+temp1[i].p2)/2)
					temp.push(new pair(temp1[i].p1,mid));
					temp.push(new pair(mid,temp1[i].p2));
					count++;
				}
			}

			if(count==0)
				o=false;

			arr.push(temp1);
			arr.push(temp);
		}




arr.pop();

}

function generate()
{

	started=0;
	ifCompleted=0;
	index=null;
	x=0;
	clear();
	background(bcolor);

	

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


	arrayGenerate();



	
}

var indic=1,i=0;
var present=[];

function draw()
{

	frameRate(rate-0);
	background(bcolor);

	var g=0;


	if(arr.length==0)
	{
		over();
		ifCompleted=1;
	}
	else if(started==1 && ifCompleted==0 && arr.length!=0)
	{

		
		if(indic==1)
		{
			present=[];
			present=arr.pop();
			indic=0;
		}
		smallSort(present[i].p1,present[i].p2);
		update(present[i].p1,present[i].p2);
		i++;
		if(i>=present.length)
		{
			indic=1;
			i=0;
		}

	}
	else
		update();



	
}


function smallSort(ind1,ind2)
{
	var i1=ind1;
	var mid=Math.floor((ind1+ind2)/2);
	var i2=mid;
	var no=ind2-ind1;

	
	var tem=[];
	while(no!=0)
	{
		update();
		
		if(i1==mid)
		{
			while(i2!=ind2)
			{
				tem.push(blockHeight[i2]);
				i2++;
			}
		}
		else if(i2==ind2)
		{
			while(i1!=mid)
			{
				tem.push(blockHeight[i1]);
				i1++;
			}
		}
		else if(blockHeight[i1]<=blockHeight[i2])
		{
			tem.push(blockHeight[i1]);
			i1++;
		}
		else if(blockHeight[i2]<blockHeight[i1])
		{
			tem.push(blockHeight[i2]);
			i2++;
		}

		no--;
	}	

	var ind=0;

	for(var t=ind1;t<ind2;t++)
	{
		blockHeight[t]=tem[ind];
		ind++;
	
	}






}




function update(k,l)
{
	

	
	
	for(var i=0;i<n;i++)
	{
		if(i>=k&&i<l)
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