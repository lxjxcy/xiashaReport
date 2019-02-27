<template>
	<div>
		<div class="house echartall">
			<Charts :id="id"  :option="option" :height="height" :width="width"/>
		</div>
	</div>

</template>
<script>	

	export default {
		name:"house",

		data() {
			return {
				id:"house",
			
				width:"430px",
				height:"200px",
			
				option:{
					title : {
						text: '出租率分析',
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
						left: '10%',
						top:"20%"	
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: '5%',
						icon : 'circle',
						top:'47%',
						
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
							return name + '   |   ' + (parseInt(target)/parseInt(total)*100).toFixed(2)+'%'
							},
					},
					color:['#ffb400','#00dfe6','#a9d341'],
					series: [
						{
							name:'',
							type:'pie',
							itemGap: 60,
							// radius : '60%',
							radius: ['30%', '50%'],
							center: ['20%', '50%'],//饼图的位置 
							avoidLabelOverlap: false,
							label: {
								normal: {
									 show: true,
									position: 'center', 
									  formatter:function (argument) {
											var html;
											html='租金收入\r\n\r\n'+'项目对比';
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
									borderColor:'#252b35',
							},
							 
							data:[]
						},
						{
								type: 'liquidFill',// 水波图
								center: ['80%', '20%'],//饼图的位置 
								data: [ //可以有多个水波
								{
										value: 0.5,//所占比例 0-1
										itemStyle: {
												color: '#a9d341',//水波的颜色
										}
								}],
								itemStyle: { color: "#fff" },//波线的阴影
								backgroundStyle :{color:'#fff'},//球状的背景颜色
								radius: '40%',//水波图的半径
								outline: {
										show: false //true显示水波图上的文字
								},
								label: {
										show: true, //不能对水波图设置事件
										formatter: function (value) {
											return '剩余租赁面积'+(value.value*100).toFixed(0)+"%";
										},
										position: ['50%', '70%'],
										textStyle: {
											color: '#000',
											fontSize: 12,
											
											// backgroundColor:"#f0f",
											fontStyle: 'normal',
											fontWeight: 'normal',
										
											
										}
								},
									
						}
					],
					
				},
			
			
			}
		},
		mounted(){
			// this.getlist(1)
		// this.option.series[0].data=this.contrast;
		},
		methods: {
			getlist(id){
				this.$api.getArea(id).then(res=>{
						this.savedata(res.data)
				})
			},
			savedata(data){
				var dataed=[];
				var total = 0;
				var target=0;
				data.forEach((e, i, a)=> {
					total += parseInt(e.num);
					if (e.type=="剩余租赁面积") {
						target = e.num;
						
					}
					dataed.push({
						value:e.num,
						name:e.type
					})
				})
				this.option.series[0].data=dataed;
				
				
						
				this.option.series[1].data[0].value=parseInt(target)/parseInt(total)//
			}
	
		},
	}

</script>
<style scoped>
.house{
	/* margin-left: 2%; */
}
	
</style>