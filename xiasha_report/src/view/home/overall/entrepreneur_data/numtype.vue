<template>
	<div class="scale">
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
	</div>	
</template>

<script>
	export default {
		name:"numtype",
		data(){
			return{
				id:"numtype",
				width:"380px",
				height:"220px",
				option:{
					 title : {
						text: '企业进驻数量类型占比top5',
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
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

					calculable : true,
					color:['#8600cc','#ff0000','#fdb800','#d717ff','#fff'],
					series : [
							 {
							name:'',
							type:'pie',
							radius : [25, 70],
							center : ['50%', '50%'],
							roseType : 'radius',
// 							label: {
// 								 formatter:(params)=>{
// 									 var name=params.name
// 									 var value=params.percent+"%";
// 									 return name+value
// 								 },
// 								 color:"#fff",
// 									emphasis: {
// 											show: true
// 									}
// 							},
							label: {
								formatter:(params)=>{
									var name=params.name
									var value=params.percent+"%";
									// return name+"\r\n"+value
										var arr = [
										'{a|'+name+'}',
										'{b|（'+value+'）}',
									]
									return arr.join('\n')
								},
								textStyle:{
									rich:{
										a:{
											fontSize:12,
											verticalAlign:'top',
											align:'left',
										},
										b:{
											fontSize:12,
											align:'left',
											color:"#fff",
										}
									}
								},
								
								
								
								
								color:"#fff",
									emphasis: {
											show: true
									}
							},
									labelLine:{  
										normal:{  
												length:2 
										}  
								}, 
						 data:[]
					},
					
						
					]
				},				
			}
		},
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				this.$api.getCompanyTopNume().then(res=>{
						this.option.series[0].data=this.getforeach(res.data)
				})				
			},
			getforeach(data){
				var seriesdata=[]
				data.forEach((e,i,a)=>{
					seriesdata.push({
						value:e.num,
						name:e.type,
					})
					
				})
				return seriesdata
			}
			
		}
		
	}
</script>

<style scoped>
	.scale{
		/* margin-top: 1%; */
		
	}

</style>
