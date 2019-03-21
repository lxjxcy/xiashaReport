<template>
	<!-- <div class="scale"> -->
		<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
	<!-- </div>	 -->
</template>

<script>
	export default {
		name:"numtype",
		data(){
			return{
				id:"numtype",
				width:"100%",
				height:"100%",
				hackReset:true,
				option:{
					 title : {
						text: '企业进驻数量类型占比top5',
						x:'left',
						textStyle: this.$store.state.textStyle,
					},
						grid: {
							left: '3%',
							right: '4%',
							top:"20%",
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
							radius : ["25%", "60%"],
							center : ['50%', '60%'],
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
									return arr.join('\n\n')
								},
								textStyle:{
									rich:{
										a:{
											fontSize:15,
											verticalAlign:'top',
											align:'left',
										},
										b:{
											fontSize:15,
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
			// this.getList()
		},
		methods:{
			getList(version,year,month){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
				this.$api.getCompanyTopNume(version,year,month).then(res=>{
					if(res.data.length==0){
						return
					}
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
