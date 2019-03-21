<template>

		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		

	
</template>

<script>
	import echarts from "echarts"
	export default {
		name:"number_statistics",
		data(){
			return{
				id:"number_statistics",
				width:"100%",
				height:"100%",
				option:{
						title: {
							text: '全国孵化器数量统计',
							subtext: '2014-2018年中国企业孵化器数量统计（单位：家）',
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
							data: [2014,2015,2016,2017,2018],
							axisLabel: {
								inside: false,
								textStyle: {
									color: '#fff'
								}
							},
							axisTick: {
								show: false
							},
// 							axisLine: {
// 								show: false
// 							},
							axisLine: {
								lineStyle: {
									type: 'solid',
									color: '#30dbe3',
									width: '1'
								}
							},
							// z: 10
						},
						yAxis: {
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						dataZoom: [
							{
								type: 'inside'
							}
						],
						series: [
							
							{
								type: 'bar',
								barWidth : 30,//柱图宽度
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: '#83bff6'},
												{offset: 0.5, color: '#188df0'},
												{offset: 1, color: '#188df0'}
											]
										),
										label: {
												show: true,
												position: 'top',
												textStyle: {
												color: 'white'
											},
										}
									},
									emphasis: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: '#2378f7'},
												{offset: 0.7, color: '#2378f7'},
												{offset: 1, color: '#83bff6'}
											]
										)
									},
									
								},

								data: [1748,2355,3255,4063,5163]
							}
						]
					}
				
			}
		}
		
	}
</script>

<style>

</style>
