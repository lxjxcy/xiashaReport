<template>
	<div class="electric">			
	<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>	
	</div>
	
</template>
<script>	
	
	export default {
		name:"electric",

		data() {
			return {
				id:"electric",
				width:"690px",
				j:0,
				height:"220px",
				xAxis:['01月','02月','03月','04月','05月','06月','07月','08月','09月','10月','11月','12月',],
				yAxis:["0","150","300","450","600","750"],

				option:{
				     title: {
						text: '企业用电量（千度）',
						x:'left',
						textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
							// fontFamily: 'Arial, Verdana, sans...',
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
						selectedMode:"single",
						inactiveColor: '#999',
							selected:{

							},
						icon: "circle",
						textStyle:{
						color:["#fff"],
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
			this.moveLine()
		},
		methods: {
				getlist(){
					this.$api.getCompanyElectric().then(res=>{
						var list=[]
						var color=['#8600cc','#ff0000','#fdb800','#d717ff','#fff']
						this.option.legend.color=color;
							res.data.forEach((e, i, a)=> {
								this.option.legend.data[i]=e.fieldName;	
								var numdata=[]
								var month=[]
								e.content.forEach((me,mi,ma)=>{
									numdata.push(me.num)
									month.push(me.month+'月')
								})
								this.option.xAxis.data=month;
									list.push({
											name:e.fieldName,
											type:'line',
											// stack: '总量',
											data:numdata,
											itemStyle: {//直线颜色
												normal: {
													color: color[i],
													lineStyle: {
														color: color[i],
														width:3
													}
												}
											},
										
									})
							})
							this.option.series=list
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
.electric{
	/* border-left: 2px solid #fff; */
	/* padding-top:5px; */
	/* width:100% */
	/* padding-left: 2%; */
}
	
</style>