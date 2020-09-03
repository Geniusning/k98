<template>
	<div class="popUp-wrapper" :style="{width:width+'%',height:height+'rem',top:top+'%'}" v-if="showPopUp">
		<img @click="close" class="close" src="../../assets/image/close-round.png" alt="">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showPopUp: false
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			widh:{
				type:Number,
				default:100,
			},
			height:{
				type:Number,
				default:10
			},
			top:{
				type:Number,
				default:10
			}
		},
		methods: {
			close() {
				this.showPopUp = false
				this.$emit("close", false)
			},
		},
		watch: {
			show: function(newValue) {
				console.log("popUp---",newValue)
				this.showPopUp = newValue
			}
		}
	}
</script>

<style lang="less" scoped>
	.popUp-wrapper {
		width: 100%;
		height: 10rem;
		position: absolute;
		top: 10%; // left: 50%;
		// margin-left: -4.5rem;
		z-index: 9999;
		background-color: #fff;
		color: #333;
		border: 1px solid #ccc;
		box-shadow: darkgrey 10px 10px 30px 5px;
		border-radius: 6px;
		font-weight: 900;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		.close {
			position: absolute;
			top: 0rem;
			right: .3rem;
			margin-left: -0.5333rem;
			width: 1.0667rem;
			height: 1.0667rem;
		}
	}
</style>


