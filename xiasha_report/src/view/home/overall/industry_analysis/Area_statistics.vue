<template>

		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		

	
</template>

<script>
	import echarts from "echarts"
	export default {
		name:"Area_statistics",
		data(){
			return{
				id:"Area_statistics",
				width:"100%",
				height:"100%",
				option:{
						title: {
							text: '全国孵化器场地面积统计',
							subtext: '2010-2017年中国企业孵化器场地面积变化（单位：万平方米）',
							textStyle: this.$store.state.textStyle,
							subtextStyle: this.$store.state.subtextStyle,
						},
						grid: {
							left: '3%',
							right: '4%',
							
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							axisLine: {
								lineStyle: {
									type: 'solid',
									color: '#fff',
									width: '1'
								}
							},
							
							splitLine: {
								show: false
							}, //去除网格线
							splitArea: {
								show: false
							}, //保留网格区域
							data: [2010,2011,2012,2013,2014,2015,2016,2017,2018]
						},
						yAxis: {
							
							type: 'value',
							splitLine: {
								show: false
							}, //去除网格线
							axisLine: {
								rotate:45,
								lineStyle: {
									type: 'solid',
									color: '#fff',
									width: '1'
								}
							},
							
						},
						dataZoom: [
							{
								type: 'inside'
							}
						],
						series: [
							
							{
								data: [3043,3472,4375,5379,6034,8630,10703,11230,13049],
								type: 'line',
								// symbol: "none",
									// smooth:true,
								areaStyle: {normal: {
								color: new echarts.graphic.LinearGradient(
												0, 0, 0, 1,
												[
														{offset: 0, color: '#affa1a'},
														// {offset: 0.5, color: '#8ca53f'},
														{offset: 1, color: '#99c247'}
												]
								)
								}},
								itemStyle: {//直线颜色
									normal: {
										label : {
											show: true,
												position: 'top',
												textStyle: {
												color: 'white'
											},
										},
										color: "#a5b83b",
									
										lineStyle: {
											color: "#a5b83b",
											width:3,
										}
									}
								},
							},
						]
					}
				
			}
		}
		
	}
</script>

<style>

</style>
