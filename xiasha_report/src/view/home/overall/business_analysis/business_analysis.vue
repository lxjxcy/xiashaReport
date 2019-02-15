<template>
	<div class="business_analysis">
		<div class="title">
			<ul>
				<li v-for="(item,index) in list"><span :class="ifselect==index+1?'yesSelect':'noSelect'">{{item.communityName}}</span></li>
			</ul>
		</div>
		<ul>
			<li class="l">
				<ul style="overflow: hidden;padding-top:2%;height:170px;margin-left: 2%;">
					<li class="l"><occupancy  ref="occupancyChild"></occupancy></li>
				</ul>
				<ul>
					<li class="l">
						<div>
							<house ref="houseChild"></house>	
						</div>
					</li>
					<li class="l">
						<div>
							<income ref="incomeChild"></income>							
							<attract ref="attractChild"></attract>
						</div>
					</li>
					<li class="l">
						
					</li>
				</ul>
				
			</li>
			<li class="l">
				<div style="position: relative;top:-60px;width:500px">
					<vacancy ref="vacancyChild"></vacancy>
					<demand ref="demandChild"></demand>	
					<daynum ref="daynumChild"></daynum>
				</div>
			</li>
			
		</ul> 
		
	</div>
	
</template>

<script>
	import { mapGetters, mapState,mapMutations,mapActions} from 'vuex'
	import occupancy from "./rentes/occupancy.vue"

	
	import demand from "./demand.vue"
	import income from "./income.vue"
	import house from "./house.vue"
	import attract from "./attract.vue"
	import vacancy from "./vacancy.vue"
	import daynum from "./daynum.vue"
	export default {
		name:"business_analysis",
		components:{
			occupancy,
			demand,
			income,
			house,
			attract,
			vacancy,
			daynum
		
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
				if(classindex==5){
					classindex=1
				}
			  this.getclass(classindex)
			},12000)
		},
		methods:{
			getlist(){
				this.$api.getRentYear().then(res=>{
					this.list=res.data.content
			})
					
			},
			// ...mapActions(["increment"]),
			getclass(classindex){
				this.ifselect=classindex;
				this.setdata(classindex)
			},
			
			setdata(id){
				this.$refs.occupancyChild.getlist(id)
				this.$refs.incomeChild.getlist(id)
				this.$refs.houseChild.getlist(id)
				this.$refs.attractChild.getlist(id)
				this.$refs.daynumChild.getlist(id)
				this.$refs.demandChild.getlist(id)
				this.$refs.vacancyChild.getlist(id)
				
			}
			
		}
		
	}
</script>

<style scoped>
	.title{
		color:#fff;
	}
	.title ul{
		display:flex ;
		margin-top:1% ;
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
