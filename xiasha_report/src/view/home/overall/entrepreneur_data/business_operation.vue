<template>
		<!-- <div class="business_operation"> -->
			<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
		<!-- </div>		 -->
</template>
<script>
	import echarts from "echarts"
	export default {
		name:"business_operation",
		data() {
			return {
				hackReset:true,
				id:"business_operation",
				width:"100%",
				height:"100%",
				xAxis:['第一季度','第二季度','第三季度','第四季度'],
				clustering:[120, 132, 101, 134],
				incubator:[220, 182, 191, 433],
				technology:[220, 345, 191, 234],
				contrast:[
					{value:335, name:'主营业务收入'},
					{value:310, name:'企业税收'},
					{value:234, name:'研发投入'},
				],
				option:{
					 title: {
						text: '企业经营',
						x:'left',
						textStyle: this.$store.state.textStyle,
						
					},
					legend: {
						data:[],
						right: '3%',
						top: '10%',
						icon : 'circle',
						textStyle:{
						color:['#fff'],
						},
					},
					grid: {
						left: '3%',
						right: '4%',
						top: '20%',
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
								color: '#30dbe3',
								width: '1'
							}
						},
					},
					textStyle:{
						color:'#fff',
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: true
						}, //去除网格线
						axisLine: {
							lineStyle: {
								type: 'dashed',
								color: '#30dbe3',
								width: '0',
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
			getList(version,year,month){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
				this.$api.getCompanynManage(version,year,month).then(res=>{
					if(res.data.length==0){
						return
					}
					var list=[]
					var color=['#ec6d6f','#ff0001','#00e3d9'];
					var type=['line','line','bar']
					this.option.legend.color=color;
					var quarters=[]
					res.data.content[0].incomes.forEach((me,mi,ma)=>{
						
						quarters.push('第'+me.quarter+'季度')
					})
						res.data.content.forEach((e, i, a)=> {
							this.option.legend.data[i]=e.manageType;	
							var numdata=[]
							e.incomes.forEach((me,mi,ma)=>{
								if(e.manageType=="主营业务收入"){
									numdata.push(me.businessIncome)
								}else if(e.manageType=="企业税收"){
									numdata.push(me.enterpriseTax)
									
								}else {
									numdata.push(me.develoInvestment)
									
								}
								
							})
							
							
							
								list.push({
										name:e.manageType,
										type:type[i],
										// stack: '总量',
										x:20,
										barWidth : 20,
										data:numdata,
										itemStyle: {//直线颜色
											normal: {
												color: color[i],
												lineStyle: {
													color: color[i],
												}
											}
										},
									
								})
						})
						 this.option.xAxis.data=quarters;
						this.option.series=list
				})
				
			}
		}
	}
</script>
<style scoped>
	.business_operation{
		/* border: 1px ; */
		/* padding: 0 2%;
		margin-right: 2% */
		/* border-left: 2px solid #fff */
	}

	

</style>
