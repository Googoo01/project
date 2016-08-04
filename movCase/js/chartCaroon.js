;(function(){
    function chartsGloabalMap(id)
    {
        this.myChart= echarts.init(document.getElementById(id));
     
    }
    chartsGloabalMap.prototype.createLine=function(opt){
       var  option= {
                title: {
                    show:true,
                    text:'收益 '+opt.incomeValue,
                    left:'2%',
                    top:'2%',
                    textStyle:{
                        color:'#fff',
                        fontWeight:'normal',
                        fontSize:16
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: "{a} <br/>{b}: {c}%"
                },/*
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },*/
                /*toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },*/
                grid: {
                    show:true,
                    left: '0',
                    bottom: '0',
                    width:'100%',
                    height:'100%',
                    containLabel: false,
                    borderWidth:0,
                    backgroundColor:opt.completeColor
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data :opt.rollerX,
                        axisLine:{
                          show:false
                        },
                        axisTick:{
                          show:false
                        },
                        axisLabel:{
                          show:true
                        }                       
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        data : opt.rollerY,
                        axisLine:{
                          show:false
                        },                    
                        axisTick:{
                          show:true
                        },
                        axisLabel:{
                          show:true,
                          formatter: '{value} %'
                        },
                        splitLine:{
                            show:false
                        }
                    }
                ],
                series : [
                    {
                        name:opt.topic,
                        type:'line',
                        smooth:true,
                        stack:null,
                        lineStyle:{
                            normal:{
                                color:'#fff',
                                width:1
                            }
                        },
                        areaStyle: {normal: {
                            color:opt.localColor
                        }},
                        data:[
                            {value:opt.arrData[0],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            {value:opt.arrData[1],
                                symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10

                                    }
                                }
                            },
                            {value:opt.arrData[2],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            {value:opt.arrData[3],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10

                                    }
                                }
                            },
                            {value:opt.arrData[4],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                       shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            {value:opt.arrData[5],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10

                                    }
                                }
                            },{value:opt.arrData[6],
                                 symbolSize:5,
                                itemStyle:{
                                      normal:{
                                        color:'#fff',
                                        shadowColor: 'rgba(255, 255, 255,1)',
                                        shadowBlur: 10
                                    }
                                }
                            }
                        ]
                    }
                ]
        };
         /************调用*********/
       this.myChart.setOption(option);
        /************调用*********/
    }
    chartsGloabalMap.prototype.createPie=function(opt){
        var  option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                position: ['50%', '50%']
            },
            series: [
                {
                    name:opt.topic,
                    type:'pie',
                    radius: ['50%', '90%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'normal'
                            }
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'#fff',
                            borderWidth:3
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:opt.dataNum[0], name:opt.dataName[0],itemStyle:{
                          normal:{color:'#9cbafd'}
                      }},
                      {value:opt.dataNum[1], name:opt.dataName[1],itemStyle:{
                          normal:{color:'#ef444c'}
                      }},
                      {value:opt.dataNum[2], name:opt.dataName[2],itemStyle:{
                          normal:{color:'#55668c'}
                      }},
                      {value:opt.dataNum[3], name:opt.dataName[3],itemStyle:{
                          normal:{color:'#fdbd59'}
                      }},
                      {value:opt.dataNum[4], name:opt.dataName[4],itemStyle:{
                          normal:{color:'#5c7fcc'}
                      }},
                      {value:opt.dataNum[5], name:opt.dataName[5],itemStyle:{
                          normal:{color:'#739bf1'}
                      }},             
                    ]
                }
            ]
        };
        /************调用*********/
       this.myChart.setOption(option);
        /************调用*********/
    }
    window["chartsGloabalMap"]=chartsGloabalMap;
})();