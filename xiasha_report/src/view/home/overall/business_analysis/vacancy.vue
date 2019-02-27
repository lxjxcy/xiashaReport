
 
 <template>
 	<div>
 		<div class="containers">
 			<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
 		</div>
 	</div>	
 </template>
 <script>	
 import echarts from "echarts"
 	export default {
 		name:"vacancy",
 		data() {
 			return {
 				id:"vacancy",
 				width:"355px",
 				height:"200px",
 				option:{
 					title : {
 						text: '空置面积占比分析',
 						x:'left',
 						textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
 							// fontFamily: 'Arial, Verdana, sans...',
 							fontSize: 20,
 							backgroundColor:"#f0f",
 							fontStyle: 'normal',
 							fontWeight: 'normal',
 							color:"#fff"
 						},
 					},
 					grid: {
 						left: '0',
 						top:"2%"
 						
 						
 					},
 					tooltip: {
 						trigger: 'item',
 						formatter: "{a} <br/>{b}: {c} ({d}%)"
 					},
 					color:['#62b6ed','#ffb400','#66f084','#ff9e55'],
 					series: [
 						{
 							name:'访问来源',
 							type:'pie',
 							itemGap: 60,
 							radius: ['40%', '60%'],
 							center: ['50%', '60%'],//饼图的位置 
 							avoidLabelOverlap: false,
 							label: {
 								formatter:(params)=>{
 									var name=params.name
 									var value=params.percent+"%";
 									return name+value
 								},
 								color:"#fff",
 									emphasis: {
 											show: true
 									}
 							},
 									labelLine:{  
 										normal:{  
 												length:10 
 										}  
 								}, 
								itemStyle:{
										borderWidth:5, //设置border的宽度有多大
										borderColor:'#252b35',
								},
			
 							data:[]
 						}
 					],
 				},			
 			}
 		},
 		mounted(){
 			// this.getlist(1)
 		
 		},
 		methods: {
 			getlist(id){
 				this.$api.getAreaRoom(id).then(res=>{
 					var data=[];
 					res.data.forEach((e, i, a)=> {
 						data.push({
 							value:e.num,
 							name:e.type
 						})
 					})
 					this.option.series[0].data=data;
 					
 				})
 			}
 		},
 	}
 
 </script>
 <style scoped>
 .containers{
	 height:260px;
 	/* margin-left: 2%; */
 
 }
 	
 </style>