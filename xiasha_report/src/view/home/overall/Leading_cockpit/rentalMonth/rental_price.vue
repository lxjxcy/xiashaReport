<template>
	<div>
		<div class="rental_price">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>
	
	</div>
	
</template>
<script>	
	export default {
		name:"rental_price",
		data() {
			return {
				id:"rental_price",
				width:"100%",
				height:"250px",
				j:0,
				option:{
				     title: {
						text: '租金收入月度趋势(万元)',
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
						 data: [],
						selectedMode:"single",
						inactiveColor: '#999',
						  selected:{
// 							  '海聚中心':true,
// 							  '文创园':false,
// 							  '服务外包':false,
// 							  '孵化器园区':false,
// 							  '生命科技中心':false
						  },
						icon: "circle",
						right: '3%',
						top: '10%',
						textStyle:{
						color:['#fff']
						},
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.xAxis,
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
			this.getlist()	
					this.moveLine()
		},
		methods: {
				getlist(){
					this.$api.getRentMonth().then(res=>{
						var list=[]
						var color=['#00975f','#00889c','#a52a5d','#ff9200',"#d62000"]
						this.option.legend.color=color;
						var selecteddata=res.data
							res.data.forEach((e, i, a)=> {
								this.option.legend.data[i]=e.communityName;	
								var numdata=[]
								var month=[]
								e.content.forEach((me,mi,ma)=>{
									numdata.push(me.num)
									month.push(me.month+'月')
								})
								this.option.xAxis.data=month;
									list.push({
											name:e.communityName,
											type:'line',
											 // symbol: "none",
											// stack: '总量',
											data:numdata,
											animation: false,
// 										
											itemStyle: {//直线颜色
												normal: {
													color: color[i],
													lineStyle: {
														color: color[i],
														width:5
													}
												}
											},
										
									})
							})
							this.option.series=list;							
					})
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
	.rental_price{
		height:260px;
		/* border-right:2px solid #fff;
		border-bottom:2px solid #fff; */
		/* padding: 2% 0; */
	}

	
</style>
