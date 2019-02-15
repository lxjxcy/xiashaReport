<template>
	<div class="innovate">
		<Charts :id="id" class="echartall" :option="option" :height="height" :width="width"/>
	</div>
	
</template>

<script>
	
		export default {
			name:"innovate",
	
			data() {
				return {
					id:"intellectual",
					width:"100%",
					height:"230px",
				option:{
						title : {
							text: '企业创新',
							x:'left',
							textStyle: {
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
									return name + '   |   ' + (parseInt(target)/parseInt(total)*100).toFixed(2) + '%'+ '   |   '+target+'件';
								},
						},
						color:['#00a2ff','#ff5872','#00cece','#00ce79','#ffd139','#9f5ce2'],
						series: [
							{
								name:'访问来源',
								type:'pie',
								itemGap: 70,
								
								// radius : '60%',
								radius: ['40%', '60%'],
								center: ['20%', '60%'],//饼图的位置 
								avoidLabelOverlap: false,
								
								
								label: {
									normal: {
										 show: true,
										 textStyle:{
										 	color:"#fff",
										 },
										position: 'center', 
										  formatter:function (argument) {
												var html;
												html='知识产权\r\n\r\n'+'123,224件';
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
					this.getlist()
			},
			methods: {
					getlist(){
						this.$api.getCompanynInnovation().then(res=>{
							var data=[];
							res.data.content.forEach((e, i, a)=> {
								data.push({
									value:e.num,
									name:e.type
								})
							})
							this.option.series[0].data=data
						})
					}
		
			},
		}
</script>

<style scoped>
	.innovate{
		height:240px;
		/* padding: 2%; */
		/* border-bottom: 1px solid #fff; */
	}

</style>
