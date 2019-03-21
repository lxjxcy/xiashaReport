<template>
			<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>	
</template>
<script>	
import util from "../../../../common/js/tool.js"
	export default {
		name:"rental_price",
		data() {
			return {
				id:"rental_price",
				hackReset:true,
				width:"100%",
				height:"100%",
				number:21,
				init:'',
				j:0,
				option:{
				     title: {
						text: '租金收入月度趋势（万元）',
						x:'left',
						textStyle:this.$store.state.textStyle,
						
					},
					legend: {
						data:[],
						
						right: '3%',
						top: '10%',
						selectedMode:"single",
						inactiveColor: '#999',
						selected:{},
						icon: "circle",
						textStyle:{
						color:["#fff"],
						},
					},
					grid: {
						left: '3%',
						right: '4%',
						top: '20%',
						bottom: '3%',
						containLabel: true,
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
								color: '#fff',
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
					this.moveLine()
		},
		methods: {
			clear(){
				window.clearInterval(this.init)
			},
				getList(version,year){
					this.hackReset = false
						this.$nextTick(() => {
						this.hackReset = true
					})
					this.clear()

					this.$api.getRentMonth(version,year,this.number).then(res=>{
						if(res.data.length==0){
							return
						}
						 this.savedata(res.data)
											 var arr=[]
												var len=res.data.length;						
												if(len<=1){
													this.savedata(res.data)						
													return;
												}
												for(var i=0;i<len;i++){
													var list=[]
													 list.push(res.data.slice(i,i+1))
													 arr.push(list)
												}						
												this.savedata(arr[0][0])
													var index=0;							
												this.init=window.setInterval(()=>{
													index++;
													if(index==res.data.length){
														index=0
													}
						
													this.hackReset = false
														this.$nextTick(() => {
														this.hackReset = true
													})
													// console.log(arr[index][0])
													this.savedata(arr[index][0])		
																				
												},2000)
// 						var list=[]
// 						var color=['#00975f','#00889c','#a52a5d','#ff9200',"#d62000"]
// 						this.option.legend.color=color;
// 						var selecteddata=res.data
// 						this.option.legend.data=[];
// 							res.data.forEach((e, i, a)=> {
// 								this.option.legend.data[i]=e.group;	
// 								var numdata=[]
// 								var month=[]
// 								e.content.forEach((me,mi,ma)=>{
// 									numdata.push(me.num)
// 									month.push(me.month+'月')
// 								})
// 								this.option.xAxis.data=month;								
// 									list.push({
// 											name:e.group,
// 											type:'line',
// 											 // symbol: "none",
// 											// stack: '总量',
// 											data:numdata,
// 											animation: false, 										
// 											itemStyle: {//直线颜色
// 												normal: {
// 													color: color[i],
// 													lineStyle: {
// 														color: color[i],
// 														width:5
// 													}
// 												}
// 											},
// 										
// 									})
// 							})
// 							this.option.series=[]
// 							this.option.series=list;							
					})
				},
							savedata(data){
								var list=[]
								var color=util.randomColor()
								this.option.legend.color=color;
								data.forEach((e, i, a)=> {
									this.option.legend.data[i]=e.group;	
									var numdata=[]
									var month=[]
									e.content.forEach((me,mi,ma)=>{
										numdata.push(me.num)
										month.push(me.month+'月')
									})
									this.option.xAxis.data=month;
										list.push({
												name:e.group,
												type:'line',
												animation: false,
												// stack: '总量',
												data:numdata,
												
				
												itemStyle: {//直线颜色
													normal: {
														
														color: color,
														lineStyle: {
															color: color,
															width:5
														}
													}
												},
											
										})
								})
								this.option.series=list;
							},
				 moveLine(){
				  this.timer = setTimeout(()=>{
					let selected = {};
					var legendData=this.option.legend.data;
				
					for(let i=0;i<legendData.length;i++){    // this.legendData是legend中data的值，上面是写死的值，做自动切换时不要写死
					  if(this.j==i){
						selected[legendData[i]] = true;
					  }else{
						selected[legendData[i]] = false;
					  }
					};					
					this.option.legend.selected = selected;    //更改legend里的selected
					this.j += 1;
					if(this.j == legendData.length){
					  this.j = 0;
					};
					this.moveLine();
				  },3000)
				}
		
		},
	}

</script>
<style scoped>
/* 	.rental_price{
		height:33%;

	} */

	
</style>
