<template>
	<div class="business_analysis">
		<div style="display: flex;justify-content: flex-start;">
			<div class="title echartall">
				<ul>
					<li v-for="(item,index) in list"><span :class="ifselect==index+1?'yesSelect':'noSelect'">{{item.communityName}}</span></li>
				</ul>
				<occupancy  ref="occupancyChild"></occupancy>
			</div>
			<div>
				<custom ref="customChild"></custom>		
			</div>
					
		</div>
		
		<div style="display: flex;justify-content: flex-start;">
				<div>
					<ul style="display: flex;justify-content: flex-start;">
						<li><income ref="incomeChild"></income></li>
						<li><attract ref="attractChild"></attract></li>
						
					</ul>
					<ul style="display: flex;justify-content: flex-start;">
							<li><house ref="houseChild"></house></li>
							<li><vacancy ref="vacancyChild"></vacancy></li>
							<li><daynum ref="daynumChild"></daynum></li>
					</ul>
				</div>
				<div>
					<demand ref='demandChild'></demand>
				</div>
			
					
		</div>
	</div>
	
</template>

<script>
	import { mapGetters, mapState,mapMutations,mapActions} from 'vuex'
	import occupancy from "./occupancy.vue"//出租绿
	// import occupancy from "./rentes/occupancy.vue"
import custom from "./custom.vue"//进驻客户
	import demand from "./demand.vue"
	import income from "./income.vue"//租金收入
	import house from "./house.vue"//出租率分析
	import attract from "./attract.vue"//招商需求
	import vacancy from "./vacancy.vue"//空置面积占比分析
	import daynum from "./daynum.vue"//空置天数占比分析
	export default {
		name:"business_analysis",
		components:{
			occupancy,
			demand,
			income,
			house,
			attract,
			vacancy,
			daynum,
			custom	
		
		},
		data(){
			return{
				list:[],
				ifselect:1,
				
			}
		},
		mounted(){
			this.getlist()
			
			var classindex=1
			setInterval(()=>{
				classindex++;
				if(classindex==this.list.length+1){
					classindex=1
				}
			  this.getclass(classindex)
			},1200000000000000000)
		},
		methods:{
			getlist(){
				this.$api.getparkList().then(res=>{
					this.list=res.data;
					
					this.setdata(res.data[0].communityId)
			})
					
			},
			// ...mapActions(["increment"]),
			getclass(classindex){
				this.ifselect=classindex;
				this.setdata(this.list[classindex-1].communityId)
// 				if(classindex==1){
// 					
// 				}
// 				if(classindex==2){
// 					this.setdata(this.list[1].communityId)
// 				}
// 				if(classindex==3){
// 					this.setdata(this.list[2].communityId)
// 				}
// 				if(classindex==4){
// 					this.setdata(this.list[3].communityId)
// 				}
// 				if(classindex==5){
// 					this.setdata(this.list[4].communityId)
// 				}
				
			},
		
			setdata(id){
				this.$refs.occupancyChild.getlist(id)
				this.$refs.incomeChild.getlist(id)
				this.$refs.houseChild.getlist(id)
				this.$refs.attractChild.getlist(id)
				this.$refs.daynumChild.getlist(id)
				this.$refs.demandChild.getlist(id)
				this.$refs.vacancyChild.getlist(id)
				this.$refs.customChild.getlist(id)
			}
			
		}
		
	}
</script>

<style scoped>
	.business_analysis{
		width:1500px;
		height:700px;
		/* background: #A2BE35; */
	}
	.title{
		color:#fff;
		height:230px;
	}
	.title ul{
		display:flex ;
		/* margin-top:1% ; */
		justify-content: flex-start;
		
	}
	.title li span{
		line-height: 40px;
		display: inline-block;
		/* border:2px solid #fff; */
		padding:0 10px;
		margin: 0 5px;
		font-size: 18px;
	}
	.yesSelect{
		/* background: #00FFFF; */
		/* color:#000 */
		color:#00d4e0;
		font-weight: 800;
		border-bottom: 3px solid #00d4e0;
	}
	.noSelect{
		/* background: #0c2771; */
	}
		

</style>
