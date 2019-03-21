<template>
	<!-- <div class="echartall"> -->
		<div :style="{height:'100%',width:'100%'}" class="echartall" ref="provincesMap"></div>
	<!-- </div> -->
	
</template>

<script>
	import echarts from "echarts"
	import '../../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
	export default {
		name:"provinces_map",
		data(){
			return{
				
			}
		},
		mounted(){
			this.getMap()
		},
		methods:{
			getMap(){
				let myChart = echarts.init(this.$refs.provincesMap); 
				
				var name_title = "中国人民大学2017年各省市计划录取人数"
var subname = '数据爬取自千栀网\n，\n上海、浙江无文理科录取人数'
var nameColor = " rgb(55, 75, 113)"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 18
var mapName = 'china'
var data = [
    {name:"北京",value:177},
    {name:"天津",value:42},
    {name:"河北",value:102},
    {name:"山西",value:81},
    {name:"内蒙古",value:47},
    {name:"辽宁",value:67},
    {name:"吉林",value:82},
    {name:"黑龙江",value:66},
    {name:"上海",value:24},
    {name:"江苏",value:92},
    {name:"浙江",value:114},
    {name:"安徽",value:109},
    {name:"福建",value:116},
    {name:"江西",value:91},
    {name:"山东",value:119},
    {name:"河南",value:137},
    {name:"湖北",value:116},
    {name:"湖南",value:114},
    {name:"重庆",value:91},
    {name:"四川",value:125},
    {name:"贵州",value:62},
    {name:"云南",value:83},
    {name:"西藏",value:9},
    {name:"陕西",value:80},
    {name:"甘肃",value:56},
    {name:"青海",value:10},
    {name:"宁夏",value:18},
    {name:"新疆",value:27},
    {name:"广东",value:123},
    {name:"广西",value:59},
    {name:"海南",value:14},
    ];
    
var geoCoordMap = {};
var toolTipData = [ 
    {name:"北京",value:[{name:"孵化器",value:95}]},
    {name:"天津",value:[{name:"孵化器",value:22}]},
    {name:"河北",value:[{name:"孵化器",value:60}]},
    {name:"山西",value:[{name:"孵化器",value:40}]},
    {name:"内蒙古",value:[{name:"孵化器",value:23}]},
    {name:"辽宁",value:[{name:"孵化器",value:39}]},
    {name:"吉林",value:[{name:"孵化器",value:41}]},
    {name:"黑龙江",value:[{name:"孵化器",value:35}]},
    {name:"上海",value:[{name:"孵化器",value:12}]},
    {name:"江苏",value:[{name:"孵化器",value:47}]},
    {name:"浙江",value:[{name:"孵化器",value:57}]},
    {name:"安徽",value:[{name:"孵化器",value:57}]},
    {name:"福建",value:[{name:"孵化器",value:59}]},
    {name:"江西",value:[{name:"孵化器",value:49}]},
    {name:"山东",value:[{name:"孵化器",value:67}]},
    {name:"河南",value:[{name:"孵化器",value:69}]},
    {name:"湖北",value:[{name:"孵化器",value:60}]},
    {name:"湖南",value:[{name:"孵化器",value:62}]},
    {name:"重庆",value:[{name:"孵化器",value:47}]},
    {name:"四川",value:[{name:"孵化器",value:65}]},
    {name:"贵州",value:[{name:"孵化器",value:32}]},
    {name:"云南",value:[{name:"孵化器",value:42}]},
    {name:"西藏",value:[{name:"孵化器",value:5}]},
    {name:"陕西",value:[{name:"孵化器",value:38}]},
    {name:"甘肃",value:[{name:"孵化器",value:28}]},
    {name:"青海",value:[{name:"孵化器",value:5}]},
    {name:"宁夏",value:[{name:"孵化器",value:10}]},
    {name:"新疆",value:[{name:"孵化器",value:27}]},
    {name:"广东",value:[{name:"孵化器",value:63}]},
    {name:"广西",value:[{name:"孵化器",value:8}]},
];
var max = 480,
    min = 9; // todo 
var maxSize4Pin = 100,
    minSize4Pin = 20;
/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});
var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
var option = {
    title: {
        text: "全国孵化器省份分布",
        x: 'left',
        textStyle: {
        	fontSize: 18,
        	backgroundColor:"#f0f",
        	fontStyle: 'normal',
        	fontWeight: 'normal',
        	color:"#fff",
        	marginBottom:20
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            if (typeof(params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                // console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                // console.log(toolTiphtml)
                // console.log(convertData(data))
                return toolTiphtml;
            }
        }
    },

    visualMap: {
        show: true,
        min: 0,
        max: 200,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
		textStyle:{
				color:'#fff'
		},
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿

        }
    },

    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [
		{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return 5;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
			
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return 10;
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            // data: convertData(data)
        },
    ]
};
myChart.setOption(option);
				
				
				
			}
		}
	}
</script>

<style>

</style>
