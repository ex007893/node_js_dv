var hist=d3.histogram().domain(xScale.domain()).thresholds(xScale.ticks(10))
//一律选10
var kk=hist([10,20,30,40,50,60,70])
/**
kk[0][0]
10
kk[0]["x0"]
0
kk[0]["x1"]
20
kk.slice(0,kk.length-1) JS的切片方法
**/
