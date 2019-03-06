<!-- <template>
	<div>
		 <div class="charts">
			<pies :id="id" :option="option"></pies>
		  </div>
	</div>
	
</template>

<script>
	import pies from "../../../../../components/chart.vue"
	export default {
		name:"daynum",
		components:{
			pies
		},
		data() {
    return {
      id: 'test1',
      option: {
        chart: {
         type: 'pie',//饼图
					backgroundColor: 'rgba(0,0,0,0)',
           options3d: {
             enabled: true,//使用3d功能
             alpha: 60,//延y轴向内的倾斜角度
             beta: 0,  
           }
        },
        title: {
          text: '空置天数占比分析',//图表的标题文字,
            style: {
                color: '#fff',      //字体颜色
                "fontSize": "20px",   //字体大小
               
            }
        },

      plotOptions: {
        pie: {
          allowPointSelect: true,//每个扇块能否选中
          cursor: 'pointer',//鼠标指针
          depth: 25,//饼图的厚度
          		dataLabels: {
          		formatter: function () {
          				// display only if larger than 1
          				return this.y > 1 ? '<b>' + this.point.name + ':</b> ' +
          						this.y + '%' : null;
          		}
          },
        }
      },
        series: [
        {
          type: 'pie',
          name: '测试用1',//统一的前置词,非必须
					size:'40%',
            			
					center: ['50%', '20%'],//饼图的位置 
          data: [
            ['<300㎡',12],//模块名和所占比，也可以{name: '测试1',y: 12}
            ['300~500㎡',23],
            ['500~800㎡',19],
            ['>800㎡',29]
          ]
         }
        ]
      }
    }
  },
	}
</script>

<style scoped>
	.charts{
		width: 400px;
		
	}

</style>
 -->
 
 
 
  
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
  				id:"daynum",
  				width:"357px",
  				height:"200px",
  				option:{
  					title : {
  						text: '空置天数占比分析',
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
  					// color:['#62b6ed','#ffb400','#66f084','#ff9e55'],
// 						itemStyle: {
// 			                normal: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
													{offset: 0, color: '#00c7e0'  },
			//                    {offset: e.percent, color: '#2945b2' },
												{offset: 1, color: '#00e593' },
												], false),
// 			                }
// 			            },
  					series: [
  						{
  							name:'访问来源',
  							type:'pie',
  							itemGap: 60,
  							radius: ['48%', '60%'],
  							center: ['50%', '60%'],//饼图的位置 
  							avoidLabelOverlap: false,
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
  												length:10,
													 width:4
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
  				this.$api.getDayRoom(id).then(res=>{
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
  	/* margin-left: 2%; */
  
  }
  	
  </style>