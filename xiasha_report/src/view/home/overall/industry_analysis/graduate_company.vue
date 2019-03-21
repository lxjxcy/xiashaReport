
<template>
	<!-- <div> -->
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		
	<!-- </div> -->
	
</template>

<script>
	import echarts from "echarts"
	export default {
		name:"graduate_company",
		data(){
			return{
				id:"graduate_company",
				width:"100%",
				height:"100%",
				option:{
						title: {
							text: '全国孵化器数量统计',
							subtext: '2018年中国企业孵化器在孵企业及累计毕业企业数量分地区情况（单位：个）',
							textStyle: this.$store.state.textStyle,
							subtextStyle: this.$store.state.subtextStyle,
						},
						legend: {
								data:['在孵企业','累计毕业企业'],
								icon: "circle",
								right: '10%',
								top: '20%',
								textStyle:{
								color:['#fff']
								},
								
						},
						grid: {
							left: '3%',
							right: '4%',
							top:'20%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							data: ['东部地区','中部地区','西部地区','东北地区'],
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
							splitLine: {
								show: false
							}, //去除网格线
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
								name:'在孵企业',
								barWidth : 20,//柱图宽度
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: '#ff8b00'},
												// {offset: 0.7, color: '#2378f7'},
												{offset: 1, color: '#ffcd41'}
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
												{offset: 0, color: '#ff8b00'},
												// {offset: 0.7, color: '#2378f7'},
												{offset: 1, color: '#ffcd41'}
											]
										)
									},
									
								},

								data: [107384,32553,25789,11816]
							},
							{
								type: 'bar',
								name:'累计毕业企业',
								barWidth : 20,//柱图宽度
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: '#00fcf7'},
												// {offset: 0.7, color: '#00e7hh'},
												{offset: 1, color: '#00bbba'}
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
												{offset: 0, color: '#00fcf7'},
												// {offset: 0.7, color: '#00e7hh'},
												{offset: 1, color: '#00bbba'}
											]
										)
									},
									
								},

								data: [67549,19955,15370,7827]
							}
						]
					}
				
			}
		}
		
	}
</script>

<style>

</style>

