//data

var butterfly=[
  {'x':0,y:0,r:5,id:'alpha','count':1},
  {'x':70,y:50,r:5,id:'alpha','count':20,'name':'juicy'},
  {'x':50,y:130,r:5,id:'alpha','count':12},
  {'x':15,y:180,r:5,id:'alpha','count':30},
  {'x':16,y:160,r:5,id:'alpha','count':60},
  {'x':17,y:150,r:5,id:'gamma','count':70},
  {'x':18,y:130,r:5,id:'beta','count':1},
  {'x':19,y:100,r:5,id:'gamma','count':3},
  {'x':100,y:120,r:5,id:'alpha','count':45},
  {'x':90,y:110,r:5,id:'alpha','count':8},
  {'x':130,y:70,r:5,id:'alpha','count':5},
  {'x':20,y:80,r:5,id:'alpha','count':10},
  {'x':100,y:100,r:5,id:'beta','count':4},
  {'x':150,y:150,r:5,id:'beta','count':18},
  {'x':160,y:190,r:5,id:'beta','count':20},
  {'x':120,y:70,r:5,id:'beta','count':12},
  {'x':110,y:60,r:5,id:'beta','count':18},
  {'x':170,y:80,r:5,id:'beta','count':14},
  {'x':70,y:105,r:5,id:'gamma','count':24},
  {'x':130,y:160,r:5,id:'gamma','count':30},
  {'x':90,y:20,r:5,id:'gamma','count':12},
  {'x':180,y:30,r:5,id:'gamma','count':17},
  {'x':200,y:200,r:5,id:'gamma','count':20},
  {'x':34,y:12,r:5,id:'omega','count':35},
  {'x':65,y:13,r:5,id:'omega','count':1000},
  {'x':65,y:13,r:5,id:'alpha','count':1000},
  {'x':90,y:80,r:5,id:'omega','count':2}
];

var clicked=0 //used for legendary's on-click function
//this is the color generator
color=d3.scaleOrdinal(d3.schemeCategory10)
//for generating the color dictionary
colorset=new Set(butterfly.map(function(x){return x["id"]}))
colorarray=Array.from(colorset)
//------------not sure whether it works-------------------
colordata=[]
for(i=0;i<colorarray.length;i++){
  colordata.push({})
  colordata[i]["color"]=color(i)
  colordata[i]["type"]=colorarray[i].toString()
}
colormap=new Map
for (k in colordata){
  colormap.set(colordata[k]["type"],colordata[k]["color"])
}
//-----------not sure whether we need it-------------------
//color generator finished

//Customize this to change the visual domain of the axis
x_limit=[0,500]
y_limit=[0,500]
var x_lim_data=d3.extent(butterfly.map(function(x){return x["x"]}))
x_range=x_lim_data[1]-x_lim_data[0]
x_lim_data[0]=x_lim_data[0]-x_range/5
x_lim_data[1]=x_lim_data[1]+x_range/5
var y_lim_data=d3.extent(butterfly.map(function(x){return x["x"]}))
y_range=y_lim_data[1]-y_lim_data[0]
y_lim_data[0]=y_lim_data[0]-y_range/5
y_lim_data[1]=y_lim_data[1]+y_range/5
//FORZOOM
var zoom = d3.zoom()
    .on("zoom", zoomFunction);
//FORZOOM END
//var contain = d3.select("body").append("p").attr("text",'see?');
mypad=d3.select("body").append("svg").attr("id","pad")
.attr("height",1000).style("width","1000")
.attr("transform","translate(0,0)")
//.call(zoom);



//Create the pad

//var aAxis = d3.svg.axis();

mygroup=d3.select("#pad").append("g");
mygroup.attr("transform","translate(300,300)");

legendary_group=d3.select("#pad").append("g");

x_hist_group=d3.select("#pad").append("g");
x_hist_group.attr("transform","translate(300,280)")

//Create the sCaler
var xScale=d3.scaleLinear()
    .domain([x_lim_data[0],x_lim_data[1]]) //数字上的域
    .range([x_limit[0],x_limit[1]])  //实际的域

var yScale=d3.scaleLinear()
  .domain([y_lim_data[0],y_lim_data[1]])
  .range([y_limit[1],y_limit[0]])
//Create the scaler


var xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(10)//.tickSizeOuter(0);
var yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(10); //used for define tick
//Create the axis
gX=mygroup.append("g").attr("transform","translate(0,"+(y_limit[1]-y_limit[0])+")")
.attr("id","xaxis").call(xAxis)
gY=mygroup.append("g").attr("transform","translate(0,0)").attr("id","yaxis")
.call(yAxis);

/**
mygroup.append("text").attr("x",0)
.attr("y",10).text("here?").style("text-anchor", "head")
.attr("transform","translate(15,0)rotate(90)")

mygroup.append("text").attr("x",500).
attr("y",490).text("here?").style("text-anchor", "end")
**/




///

d3.select("body").selectAll("g").selectAll("text").
each(function(){
  if (d3.select(this).text()=="0") d3.select(this).
  attr("display","none")
  })

d3.select("body").selectAll("g").selectAll("text").
each(function(){
  if (d3.select(this).text()=="0") d3.select(this).
  attr("display","none")
  })
  //if the text is zero then we remove it
var circles=mygroup.selectAll("circle")
  .data(butterfly).enter().append("circle");
circles.
  //attr("transform","translate(30,30)").
  attr("cx",function(d){return xScale(d["x"]) +0 }).
  attr("cy",function(d){return yScale(d["y"]) +0 }).
  attr("r",function(d){return Math.log(d["count"])+3}).
  attr("id",function(d){return d["id"]}).
  attr("type",function(x){return x["id"]}).
  style("fill",function(x){return colormap.get(x["id"])})
  ;

var tooltip=d3.select("body").append("div").
  attr("class","tooltip").style("opacity",0);

circles.on("mouseover" , function(d){
  tooltip.transition().duration(500).style("opacity",.9);
  tooltip.html("X:"+d.x+"</br>Y:"+d.y).
  style("left",(d3.event.pageX)+"px").
  style("top",(d3.event.pageY)+"px")
}).
on("mouseout",function(d){
  tooltip.transition().duration(500).style("opacity",0)
});

function zoomFunction(){
  /**
  d3.scaleLinear()
  .domain([x_lim_data[0],x_lim_data[1]]) //数字上的域
  .range([x_limit[0],x_limit[1]])  //实际的域
  **/
  // create new scale ojects based on event
  var new_xScale = d3.event.transform.rescaleX(xScale)
  var new_yScale = d3.event.transform.rescaleY(yScale)
  //console.log(d3.event.transform)

  // update axes
  gX.call(xAxis.scale(new_xScale));
  gY.call(yAxis.scale(new_yScale));

  // update circle
  //circles.attr("transform", d3.event.transform)//.attr("r",5/zoom.scale());
  circles
  .attr("cx",function(d){return new_xScale(d["x"])})
  .attr("cy",function(d){return new_yScale(d["y"])});
  circles
  .attr("display",function(d){
    if (new_xScale(d["x"])>x_limit[0] && new_xScale(d["x"])<x_limit[1]
    && new_yScale(d["y"])>y_limit[0] && new_yScale(d["y"])<y_limit[1]){
      return "juicy"
    }
    else{
      return "none"
    }
  })
};

//Part for creating histograme above the scatterplot(hist_x)
//customization of the bars
var num_bars=10
var thresholds=xScale.ticks(num_bars)
//var num_bars_real=10
var all_x=butterfly.map(function(x){return x["x"]});
var width_x= xScale((x_lim_data[1]-x_lim_data[0])/num_bars)

var hist_x=d3.histogram().domain(xScale.domain()).thresholds(xScale.ticks(num_bars))
//
hist_mk2 = function(hister,arr,mapper){
  arr_freq_0=hister(arr).map(mapper)
  arr_freq=arr_freq_0.slice(0,arr_freq_0.length-1)
  arr_freq[arr_freq.length-1]=arr_freq[arr_freq.length-1]+arr_freq_0[arr_freq_0.length-1]
  return arr_freq
}
/**
var freq_x_0=hist_x(all_x)
freq_x_0=freq_x_0.map(function(x){return x.length})
freq_x=freq_x_0.slice(0,freq_x_0.length-1)
freq_x[freq_x.length-1]=freq_x[freq_x.length-1]+freq_x_0[freq_x_0.length-1]
**/
freq_x=hist_mk2 (hist_x,all_x,function(x){return x.length})
freq_max_x=d3.max(freq_x)

xScale_bar=d3.scaleLinear()
  .domain([0,freq_max_x]) //数字上的域
  .range([0,100])

//For making multi-colored histogram
x_each_type=[]
for(i in colorarray){
  x_each_type.push(butterfly.filter(function(x){return x["id"]==colorarray[i]}).map(function(x){return x["x"]}))
}
x_freq_each_type=[]
for(i in colorarray){
  x_freq_each_type.push(  hist_mk2(hist_x,x_each_type[i],function(x){return x.length})  )
}
/**
x_hist_group.append("rect").attr("y",0).attr("x",0)
.attr("width",width_x).attr("height",xScale_bar(2))
.style("fill","skyblue").attr("transform","translate("+width_x+",0)rotate(180)")
x_hist_group.append("rect").attr("y",xScale_bar(2)).attr("x",0)
.attr("width",width_x).attr("height",xScale_bar(3))
.style("fill","purple").attr("transform","translate("+width_x+",0)rotate(180)")
**/
/**
for(i=0; i<freq_x.length;i++){
  x_hist_group.append("rect").attr("y",0)//.attr("x",width_x*(i+1))
  .attr("height",xScale_bar(freq_x[i])).attr("width",width_x)
  .style("fill","orange")
  .attr("transform","translate("+(width_x*(i+1))+",0)rotate(180)")
}
**/
/**-------------------  for the rect
for(i=0; i<freq_x.length; i++){
  y_temp=0
  for(j=0; j<colorarray.length; j++){
    x_hist_group.append("rect").attr("y",xScale_bar(y_temp))
    .attr("height",xScale_bar(x_freq_each_type[j][i]))
    //.attr("height",xScale_bar(3))
    .attr("width",width_x)
    .style("fill",colormap.get(colorarray[j]))
    .attr("transform","translate("+(width_x*(i+1))+",0)rotate(180)")
    y_temp=y_temp+x_freq_each_type[j][i]
    //y_temp=y_temp+xScale_bar(3)
  }
}
--------------------------for the rect**/

//on-click function for legendary rects

//start creating the legendary()

zoom_proper=function(name){
    juicy=d3.selectAll("circle[type="+name+"]").nodes()
    juicy_data=butterfly.filter(function(x){return x["id"]==name})
    juicy_lim_x=d3.extent(juicy_data.map(function(x){return x["x"]}))
    juicy_lim_y=d3.extent(juicy_data.map(function(x){return x["y"]}))
    juicy_x_range=juicy_lim_x[1]-juicy_lim_x[0];  juicy_y_range=juicy_lim_y[1]-juicy_lim_y[0];
    juicy_lim_x[0]-=juicy_x_range*0.1; juicy_lim_x[1]+=juicy_x_range*0.1;
    juicy_lim_y[0]-=juicy_y_range*0.1; juicy_lim_y[1]+=juicy_y_range*0.1;
    xScale=d3.scaleLinear().domain([juicy_lim_x[0],juicy_lim_x[1]]).range([x_limit[0],x_limit[1]])
    yScale=d3.scaleLinear().domain([juicy_lim_y[1],juicy_lim_y[0]]).range([y_limit[0],y_limit[1]])

    gX.call(xAxis.scale(xScale));
    gY.call(yAxis.scale(yScale));

  // update circle
  //circles.attr("transform", d3.event.transform)//.attr("r",5/zoom.scale());
    circles
    .attr("cx",function(d){return xScale(d["x"])})
    .attr("cy",function(d){return yScale(d["y"])});
    circles
    .attr("display",function(d){
        if (xScale(d["x"])>x_limit[0] && xScale(d["x"])<x_limit[1]
        && yScale(d["y"])>y_limit[0] && yScale(d["y"])<y_limit[1]){
            return "juicy"
        }
        else{
            return "none"
        }
    })
}
//1.把mypad的zoom注释掉2.添加函数定义3.添加图例事件～    





legendary_group.attr("transform","translate(900,300)")
legends=legendary_group.selectAll(".legend").data(colordata).enter()
legends.append("rect").attr("class","legend")
  .attr("height",18).attr("width",30)
  .attr("transform",function(d,i){
    return "translate(0,"+i*20+")"
  })
  .attr("fill",function(x){
    return colormap.get(x["type"]) })
  .attr("type",function(x){return x["type"]})
  .on("click",function(x){
    mygroup.selectAll("circle").style("opacity",.15)
    mygroup.selectAll("circle[type="+x["type"]+"]").style("opacity",1)
    zoom_proper(x["type"])
  })
//add the text
legends.append("text").attr("class","legend")
  .attr("transform",function(x,i){
    return "translate(35,"+(12+i*20)+")"
  })
  .text(function(x){
    return x["type"]
  })
  .style("text-anchor", "start")




/**
yScale_bar=d3.scaleLinear()
  .domain(0,freq_max_x) //数字上的域
  .range(0,200)  //实际的域
**/


/**
d3.select("#pad").append("rect").attr("width",20)
.attr("height",100).attr("x",0).attr("y",0)
.attr("transform","translate(320,280)rotate(180)")
.style("fill","steelblue")
**/


/**
var neo_xScale=d3.scaleLinear()
  .domain([0,100])
  .range([x_limit[0],x_limit[1]])

var yScale=d3.scaleLinear()
  .domain([0,100])
  .range([y_limit[1],y_limit[0]])

gX.call(xAxis.scale(xScale))
gY.call(yAxis.scale(yScale))
circles.attr("cx",function(d){return xScale(d["x"])})
  .attr("cy",function(d){return yScale(d["y"])})
**/
   












