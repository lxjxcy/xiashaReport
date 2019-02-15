<template>
		<div class="customers">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>		
</template>
<script>
	import echarts from "echarts"
	export default {
		name:"customers",
		data() {
			return {
			id:"customers",
			width:"100%",
			height:"300px",	
			option:{
					 title: {
						text: '进驻客户数量',
						x:'left',
						textStyle: {
							fontSize: 18,
							backgroundColor:"#f0f",
							fontStyle: 'normal',
							fontWeight: 'normal',
							color:"#fff"
						},
						
					},
					legend: {
						data:[],
						right: '3%',
						top: '10%',
						textStyle:{
						color:[],
						},
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
						data: [],
						splitLine: {
							show: false
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#fff',
								width: '1'
							}
						},
						// axisLabel:{interval: 2}
					},
					textStyle:{
						color:'#fff',
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: false
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#30dbe3',
								width: '0'
							}
						},
					},
					series: []
				}
			}
		},
		mounted(){
			this.getlist()
			
		},
		methods: {
			getlist(){
				this.$api.getCompanyNumber().then(res=>{
					var list=[]
					var color=['#be5769','#666666','#00fff9'];
					var type=["line","line","bar"]
					this.option.legend.color=color;
						res.data.forEach((e, i, a)=> {
							this.option.legend.data[i]=e.clientType;
							var numdata=[]
							var month=[]
							e.content.forEach((me,mi,ma)=>{
								numdata.push(me.num)
								month.push(me.month+'月')
							})
							this.option.xAxis.data=month;
								list.push({
										name:e.clientType,
										type:type[i],
										// stack: '总量',
										x:20,
										barWidth : 15,//柱图宽度
										data:numdata,
										itemStyle: {//直线颜色
											normal: {
												color: new echarts.graphic.LinearGradient(
													0, 0, 0, 1,
													[
														{offset: 0, color: '#33b7b7'},
														{offset: 0.5, color: '#38bbb9'},
														{offset: 1, color: '#00fff9'}
													]
												),
												// color: color[i],
												lineStyle: {
													color: color[i],
													width:4
												}
											}
										},
									
								})
						})
						this.option.series=list
				})
			}
		}

		
	}
</script>

<style scoped>
	.customers{
		width:600px;
		height:310px;
		/* padding: 2% 0; */
	}
</style>
