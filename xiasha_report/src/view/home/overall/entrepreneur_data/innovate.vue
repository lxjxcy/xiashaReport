<template>
	<!-- <div class="innovate"> -->
		<Charts :id="id" v-if="hackReset" class="echartall" :option="option" :height="height" :width="width"/>
	<!-- </div> -->
	
</template>

<script>
	
		export default {
			name:"innovate",
	
			data() {
				return {
					id:"intellectual",
					width:"100%",
					height:"100%",
					hackReset:true,
				option:{
						title : {
							text: '知识产权',
							x:'left',
							textStyle: this.$store.state.textStyle,
						},
						grid: {
							left: '0',
							top:"2%"	
						},
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b}: {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							right: '0%',
							icon : 'circle',
							top:'20%',
							textStyle:{
							color:['#fff'],
								},
								formatter: (name)=>{
									var data=this.option.series[0].data
									var total = 0;
									var target;
									for (var i = 0;i < data.length; i++) {
									total += parseInt(data[i].value);
									if (data[i].name == name) {
										target = data[i].value;
										}
									}
									return name + '   |   ' + (parseInt(target)/parseInt(total)*100).toFixed(2) + '%';
								},
						},
						color:['#00a2ff','#ff5872','#00cece','#00ce79','#ffd139','#9f5ce2'],
						series: [
							{
								name:'访问来源',
								type:'pie',
								itemGap: 70,
								
								// radius : '60%',
								radius: ['40%', '50%'],
								center: ['20%', '60%'],//饼图的位置 
								avoidLabelOverlap: false,
								
								
								label: {
									normal: {
										 show: true,
										 textStyle:{
										 	color:"#fff",
										 },
										position: 'center', 
										  formatter:(argument)=> {
												var html;
												html='知识产权\r\n\r\n';
												return html;
											},　
									},
									emphasis: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)'
									},
								},
								labelLine: {
									normal: {
										show: false
									}
								},
								itemStyle:{
										borderWidth:5, //设置border的宽度有多大
										borderColor:'#fff',
								},
								data:[]
							}
						],
						
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
						this.$api.getCompanynInnovation(version,year,month).then(res=>{
							if(res.data.length==0){
								return
							}
							var data=[];
							res.data.forEach((e, i, a)=> {
								data.push({
									value:e.num,
									name:e.type
								})
							})
							var  total=0;
								data.forEach((e,i,a)=>{
									total += parseInt(e.value);
								})
								this.option.title.text='知识产权'+total+'件';
							this.option.series[0].data=data
						})
					}
		
			},
		}
</script>

<style scoped>
	.innovate{
		/* height:240px; */
		/* padding: 2%; */
		/* border-bottom: 1px solid #fff; */
	}

</style>
