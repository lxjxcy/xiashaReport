<template>

		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>

	
</template>

<script>
	export default {
		name:"graduate_company_number",
		data(){
			return{
				id:"graduate_company_number",
				width:"100%",
				height:"100%",
				option:{
					title: {
						text: '全国孵化器在孵/毕业企业统计',
						subtext: '2010-2017年中国企业孵化器在孵企业及累计毕业企业数量（单位：个',
						textStyle: this.$store.state.textStyle,
						subtextStyle: this.$store.state.subtextStyle,
					},
					tooltip: {
							trigger: 'axis'
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
						top:"40%",
						bottom: '3%',
						containLabel: true
					},
					
						xAxis: {
							data: [2010,2011,2012,2013,2014,2015,2016,2017,2018],
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
					series: [
							{
									name:'在孵企业',
									type:'line',
									stack: '总量',
									data:[56382,60936, 70217, 77675, 78965,102170, 133286, 177542],
									itemStyle: {//直线颜色
										normal: {
											label : {
												show: true,
													position: 'top',
													textStyle: {
													color: 'white'
												},
											},
											color: '#0078d7',
											lineStyle: {
												color: "#0078d7",
												width:3
											}
										}
									},
							},
							{
									name:'累计毕业企业',
									type:'line',
									stack: '总量',
									data:[36485,39562, 45160, 52145, 61944, 74853, 89683,110708],
									itemStyle: {//直线颜色
										normal: {
											label : {
												show: true,
													position: 'top',
													textStyle: {
													color: 'white'
												},
											},
											color: "#e21918",
											lineStyle: {
												color: "#e21918",
												width:3
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
