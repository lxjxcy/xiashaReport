<template>
	
	<div :style="{height:'450px',width:'600'}" ref="myxiasha"></div>
	
</template>

<script>
	import echarts from "echarts"
	import xiashajson from "@/assets/map1.json"
	export default {
		name:"xiashaMap",
		data(){
			return{
				geoCoordMap:{
					'文创园':[120.3441300000,30.3002700000],
					'海聚中心':[120.3739930000,30.3070200000],
					'生命科技中心':[120.3139200000,30.3002500000],
					'孵化器':[120.3778839160,30.3098892722],
					'外包服务':[120.3682750000,30.3088070000],	
				},
				data: [
				 {name: '孵化器', value: 0},		 
				 {name: '生命科技中心', value: 1},
				 {name: '文创园', value: 2},
				 {name: '外包服务', value: 3},
				{name: '海聚中心', value: 4},
				

				],
			}
		},
		mounted(){
			this.getMap()
		},
		methods:{
			convertData(data){
				var res = [];
				for (var i = 0; i < data.length; i++) {
						var geoCoord = this.geoCoordMap[data[i].name];
						if (geoCoord) {
								res.push({
										name: data[i].name,
										value: geoCoord.concat(data[i].value)
								});
						}
				}
				return res;
		},
			getMap(){
				echarts.registerMap('下沙', xiashajson);
				let myxiasha = echarts.init(this.$refs.myxiasha); 
				
				myxiasha.setOption({
					// backgroundColor: '#404a59',
					title: {
							text: '',							
							left: 'left',
							textStyle: {
									color: '#fff'
							}
					},
					tooltip : {
							trigger: 'item'
					},
					legend: {
							orient: 'vertical',
							y: 'bottom',
							x:'right',
							data:['pm2.5'],
							textStyle: {
									color: '#fff'
							}
					},
					grid: {
						left: '10%',
						bottom:"10%"	
					},
					visualMap: { //图例值控制
							min : 0,
							max : 4,
							calculable : true,
							color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
							textStyle:{
									color:'#fff'
							}
					},
		

					
					geo: {
							map: '下沙',
							label: {
									emphasis: {
											show: false
									}
							},
							roam: true,
							zoom: 1,
							itemStyle: {
									normal: {
											areaColor: '#323c48',
											borderColor: '#111'
									},
									emphasis: {
											areaColor: '#2a333d'
									}
							}
					},
					series : [

							{
									name: 'Top 10',
									type: 'effectScatter',
									coordinateSystem: 'geo',
									data: this.convertData(this.data.sort((a, b)=> {
											return b.value - a.value;
									})),
									symbolSize: function (val) {
											return 10 ;
									},
									showEffectOn: 'render',
									rippleEffect: {
										period:3,   //动画时间，值越小速度越快
											brushType: 'stroke', //波纹绘制方式 stroke, fill
											scale: 3    //波纹圆环最大限制，值越大波纹越大
									},
									hoverAnimation: true,
									label: {
											normal: {
													formatter: '{b}',
													position: 'right',
													show: true
											}
									},
									itemStyle: {
											normal: {
													color: '#f4e925',
													shadowBlur: 10,
													shadowColor: '#333'
											}
									},
									zlevel: 1
							}
					]
				})
				
			}
		}
		
	}
</script>

<style>

</style>
