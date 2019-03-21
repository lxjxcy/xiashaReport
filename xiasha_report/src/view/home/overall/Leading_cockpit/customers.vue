<template>
		
	<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
	
</template>
<script>
	import echarts from "echarts"
	export default {
		name:"customers",
		data() {
			return {
			id:"customers",
			width:"100%",
			hackReset:true,
			number:25,
			height:"100%",	
			option:{
					 title: {
						text: '进驻客户数量',
						x:'left',
						textStyle: this.$store.state.textStyle,
						
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
						top: '30%',
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
			// this.getList()
			
		},
		methods: {
			getList(version,year){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
				this.$api.getCustomerNumber(version,year,this.number).then(res=>{
					if(res.data.length==0){
						return
					}
					var list=[]
					
					var color=['#00fff9','#be5769','#666666',];
					var type=["bar","line","line",]
					this.option.legend.color=color;
						res.data.forEach((e, i, a)=> {
							this.option.legend.data[i]=e.group;
							var numdata=[]
							var month=[]
							
							if(e.group=="进驻客户"){
								var len=e.content.length-1;
								var total=e.content[len].total;
								this.option.title.text="进驻客户数量"+total;
								
							}
							
							
							// 
							e.content.forEach((me,mi,ma)=>{
								
								numdata.push(me.num)
								month.push(me.month+'月')
							})
							this.option.xAxis.data=["1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
							// this.option.xAxis.data=month;
								list.push({
										name:e.group,
										type:type[i],
										// stack: '总量',
										x:20,
										barWidth : 20,//柱图宽度
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

</style>
