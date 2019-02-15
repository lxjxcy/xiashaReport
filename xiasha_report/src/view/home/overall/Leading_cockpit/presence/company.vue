<template>
	<div class="company echartall">
		<div>
			<div class="hradertitle">
				进驻企业
			</div>
			<table>
				<tr>
					<th><span>企业名称</span></th>
					<th><span>住进项目</span></th>
					<th><span>面积</span></th>
				</tr>
			</table>
			<vue-seamless-scroll :data="list" class="seamless-warp">
				<table class="item">
					<tr v-for="item in list">
						<td class="companyName" v-text="item.companyName"></td>
						<td class="communityName" v-text="item.communityName"></td>
						<td class="area" v-text="item.area"></td>
						
					</tr>
					
				</table>
				</vue-seamless-scroll>
				
			
		</div>
			


	</div>
	
</template>

<script>

	export default {
		name:"company",
		data() {
	    return {
	        animate:true,
	        list:[]
	    }

	  },
	created(){
		this.getlist()
//        setInterval(this.scroll,1000)
	},
  methods: {
	//获取企业数据
	getlist(){
		var params={}
		this.$api.getCompanyDetail(params).then(res=>{
			this.list=res.data
			
		})
	},
	//滚动
       scroll(){
        let con1 = this.$refs.rollul;
        con1[0].style.marginTop='30px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function(){
            that.list.push(that.list[0]);
            that.list.shift();
            con1[0].style.marginTop='0px';
            that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },0)
  }
}

	}
</script>

<style scoped>
	.company{
		width:585px;
		height:415px;
		
	}
	.hradertitle{
		font-size: 20px;
		font-weight: 400;
		line-height: 50px;
		color:#fff;
	}
	 .seamless-warp {
        height: 300px;
        overflow: hidden;
		line-height: 20px;
    }
	table{
		width:100%;
	}
	table tr th{
		width: 200px;
		text-align: center;
		line-height: 50px;
		color:#00FFFF;
		
	}
	 table tr th span{
		/* padding:0 5%; */
		text-align: center;
		line-height: 24px;
		border-radius: 5%;
		display: inline-block;
		color:#00FFFF;
		/* background: ; */
		
	}
	table tr td{
		width: 200px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}


</style>
