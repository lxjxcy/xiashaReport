<template>
	<div>
		<div class="income">
			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
		</div>
	
	</div>
	
</template>
<script>	

	export default {
		name:"income",

		data() {
			return {
			id:"income",
			width:"580px",
			height:"230px",
			j:0,
			
			option:{
				     title: {
						text: '租金收入（万元）',
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
						selected:{},
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
			// this.getlist(1)
			this.moveLine()
		},
		methods: {
			 getlist(id){
				 this.$api.getBuilding(id).then(res=>{
					 this.savedata(res.data)
					 // this.$store.commit('saveIncome',res.data)
				 })			
			},
			
			savedata(data){
				var list=[]
				var color=['#ff101c','#ff9100','#d03275','#00aad4',"#00bb6e",'#b4b32b']
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
				console.log(list)
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
.income{
	/* height:250px; */
	/* border-left: 2px solid #fff; */
	/* padding-top:3%; */
/* 	padding-left: 2%;
	margin-bottom: 1.2%; */
}
	
</style>