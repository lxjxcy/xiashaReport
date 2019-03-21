export default{
	data(){
		return{
			hackReset:true,
		}
	},
	methods:{
		reset(){
			this.hackReset = false
				this.$nextTick(() => {
				this.hackReset = true
			})
		}

	}
}