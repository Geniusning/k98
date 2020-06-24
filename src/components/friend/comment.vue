<template>
	<div class="comment-wrapper">
		<div class="content">
			<header>
				<div class="comment-header-left">
					<img src="../../assets/image/avatar1.jpeg" class="comment-avatarUrl" alt="">
					<span class="comment-name">员工A</span>
				</div>
				<div class="comment-header-right" @click="goHome">
					<img src="../../assets/image/home.png" class="comment-home" alt="">
				</div>
			</header>
			<div class="comment-slider">
				<swiper height="256px" :list="lifePhotolist" :interval="2000" :auto="true" :show-dots="false" v-model="swiperItemIndex" :min-moving-distance="120" @on-index-change="demo01_onIndexChange"></swiper>
			</div>
			<div class="comment-result">
				<ul class="comment-header-list">
					<li class="comment-divide" @click="giveThumb">
						<img src="../../assets/image/thumb_up.png" class="comment-icon" alt="">
						<span class="comment-count">{{staffCommentInfo.thumbCount}}</span>
					</li>
					<li class="comment-divide" @click="unGiveThumb">
						<img src="../../assets/image/thumb_down.png" class="comment-icon" alt="">
						<span class="comment-count">{{staffCommentInfo.unThumbCount}}</span>
					</li>
					<li class="comment-divide">
						<img src="../../assets/image/message_comment.png" class="comment-icon" alt="">
						<span class="comment-count">{{staffCommentInfo.messageCount}}</span>
					</li>
				</ul>
				<scroll ref="listView" class="comment_content" style="background:#f1f1f1;" :data="staffCommentInfo.messageList">
					<div>
						<div v-if="staffCommentInfo.thumbAvatarList" class="comment-thums-list">
							<img src="../../assets/image/thumb_up.png" alt="">
							<ul class="thumb-avatar-list">
								<li class="avatar" v-for="(avatar,index) in staffCommentInfo.thumbAvatarList" :key="index">
									<!-- <img src="../../assets/image/avatar1.jpeg" alt=""> -->
									<img :src="avatar" alt="">
								</li>
							</ul>
						</div>
						<div class="comment-message-list" v-show="staffCommentInfo.messageList.length>0?true:false">
							<img src="../../assets/image/message_comment.png" alt="">
							<ul class="message-list">
								<li class="message-item" v-for="(staff,index) in staffCommentInfo.messageList" :key="index">
									<img :src="staff.headImgUrl" alt="">
									<div class="message">
										<div class="message-top">
											<span class="name">{{staff.nickname}}</span>
											<span class="time">{{staff.time}}</span>
										</div>
										<div class="message-bottom">
											<p v-html="staff.message"></p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</scroll>
			</div>
		</div>
		<div class="comment-send">
			<div>
				<input v-model="inputValue" type="text" class="input-comment" placeholder="请输入评价">
				<!-- <img src="../../assets/image/chat_emotion.png" @click="showEmotion" class="face-icon" alt=""> -->
				<div class="btn" @click="send">发送</div>
			</div>
			<div class="emotion_area">
				<div @click="selectEmtion(item.name)" :key="index" v-for="(item,index) in emotionList" class="vux-center-h" style="box-sizing:border-box;display:inline-block;padding:0.2rem 0.18rem">
					<img onclick="return false" :src="item.num" alt>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Swiper,
		SwiperItem,
		Grid,
		GridItem,
	} from 'vux';
	import Scroll from "../../base/scroll/scroll.vue";
	import api from "common/api"
	import util from "common/util"
	import Bus from "common/bus"
	import {
		mapState,
		mapMutations,
	} from "vuex";
	export default {
		data() {
			return {
				emotionList: [{
						name: "[大哭]",
						num: "/static/face/3.gif"
					},
					{
						name: "[嘻嘻]",
						num: "/static/face/4.gif"
					},
					{
						name: "[晕]",
						num: "/static/face/7.gif"
					},
					{
						name: "[再见]",
						num: "/static/face/8.gif"
					},
					{
						name: "[爱心]",
						num: "/static/face/12.gif"
					},
					{
						name: "[点赞]",
						num: "/static/face/13.gif"
					},
					{
						name: "[握手]",
						num: "/static/face/14.gif"
					},
					{
						name: "[ok]",
						num: "/static/face/15.gif"
					},
					{
						name: "[玫瑰]",
						num: "/static/face/16.gif"
					}
				],
				emotionShow: false,
				swiperItemIndex: 0,
				avatarList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				lifePhotolist: [], //员工照片
				inputValue: "", // 输入框内容
				staffCommentInfo: {
					messageList: [],
				}
			}
		},
		created() {
			this.loadStaffCommentInfo()
			document.body.addEventListener("focusout", () => {
				//软键盘关闭事件
				window.scrollTo(0, 0); //解决ios键盘留白的bug
			});
		},
		mounted() {
			Bus.$on("userInfo",userInfo=>{
				console.log("userInfo----------",userInfo)
			})
			console.log("params---", this.$route.params.phone)
			if (this.userInfo.lifePhotoURL.lifePhotoURL.length === 0) {
				this.lifePhotolist.push({
					url: 'javascript:',
					img: this.userInfo.headimgurl,
					title: '求点赞'
				})
			} else {
				this.userInfo.lifePhotoURL.lifePhotoURL.forEach(img => {
					this.lifePhotolist.push({
						url: 'javascript:',
						img: img,
						title: '求点赞'
					})
				})
			}
			console.log("lifeImgList---", this.lifePhotolist)
		},
		computed: {
			...mapState(["l98Setting", "lifeImgList", "userInfo", ]),
		},
		methods: {
			goHome() {
				this.$router.push({
					name: "home"
				})
			},
			showEmotion() {
				this.emotionShow = !this.emotionShow
			},
			//点赞
			giveThumb() {
				api.giveThumb(this.$route.params.phone).then(res => {
					if (res.errCode === 0) {
						this.loadStaffCommentInfo()
					} else {
						this.$vux.toast.show({
							text: res.errMsg
						});
					}
				})
			},
			//鄙视
			unGiveThumb() {
				api.giveUnThumb(this.$route.params.phone).then(res => {
					if (res.errCode === 0) {
						this.loadStaffCommentInfo()
					} else {
						this.$vux.toast.show({
							text: res.errMsg
						});
					}
				})
			},
			//发布留言
			send() {
				var emotionArr = this.inputValue.match(/\[.{1,2}\]/g);
				var reg = /\[.{1,2}\]/;
				if (emotionArr) {
					for (let i = 0; i < emotionArr.length; i++) {
						for (var j = 0; j < this.emotionList.length; j++) {
							if (this.inputValue.indexOf(this.emotionList[j].name) !== -1) {
								this.inputValue = this.inputValue.replace(
									reg,
									`<img src=${
	                      this.emotionList[j].num
	                    } style="vertical-align: -6px;">`
								);
							}
						}
					}
				}
				let data = {
					message: this.inputValue,
					phone: this.$route.params.phone,
					time: new Date().getTime(),
					nickname: this.userInfo.nickname,
					headImgUrl: this.userInfo.headimgurl
				}
				api.sendCommentMessage(data).then(res => {
					console.log("发布留言----", res)
					if (res.errCode === 0) {
						this.loadStaffCommentInfo()
						this.inputValue = ""
					} else {
						this.$vux.toast.show({
							text: res.errMsg
						});
					}
				})
				console.log(this.inputValue)
			},
			selectEmtion(item) {
				this.inputValue += item;
			},
			loadStaffCommentInfo() {
				api.loadStaffCommentInfo(this.$route.params.phone).then(res => {
					console.log("员工评价内容---", res)
					if (res.errCode === 0) {
						this.staffCommentInfo = res.staffCommentInfo
						this.staffCommentInfo.messageList.forEach(message => {
							message.time = util.timestampToTime(message.time)
						})
					} else {
						this.$vux.toast.show({
							text: res.errMsg
						});
					}
					console.log("this.staffCommentInfo------", this.staffCommentInfo)
				})
			}
		},
		components: {
			Swiper,
			Scroll,
			SwiperItem,
			Grid,
			GridItem
		}
	}
</script>

<style lang="less" scoped>
	.comment-wrapper {
		height: 100%;
		background-color: #fff;
		color: #333;
		// display: flex;
		// flex-direction: column;
		.content {
			height: 88%;
			display: flex;
			flex-direction: column;
			header {
				display: flex;
				justify-content: space-between;
				padding: 0.3333rem 0.2667rem 0rem 0.2667rem;
				.comment-header-left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.comment-avatarUrl {
						width: 1.0667rem;
						height: 1.0667rem;
						border-radius: 50%;
					}
					.comment-name {
						font-size: 14px;
						font-weight: 900;
						margin-left: 0.2667rem;
					}
				}
				.comment-header-right {
					.comment-home {
						width: .8rem;
						height: .8rem;
					}
				}
			}
			.comment-slider {
				margin-top: 0.1333rem;
				img {
					height: 100%;
				}
			}
			.comment-result {
				padding: 0.1333rem 0.4667rem;
				box-sizing: border-box;
				border-radius: 20px;
				flex: 1;
				display: flex;
				flex-direction: column;
				height: 45%;
				.comment-header-list {
					display: flex;
					justify-content: space-between;
					height: 0.8333rem;
					line-height: .8333rem;
					.comment-divide {
						display: flex;
						align-items: center;
						.comment-icon {
							width: 0.6667rem;
						}
						.comment-count {
							color: red;
						}
					}
				}
				.comment_content{
					// height: 6.5rem;
					.comment-thums-list {
						display: flex;
						margin-top: 0.2667rem;
						background-color: #f1f1f1;
						border-radius: 10px;
						padding-right: 0rem;
						img {
							margin-top: 0.1333rem;
							width: 0.6667rem;
							height: .6667rem;
						}
						.thumb-avatar-list {
							display: flex;
							flex-wrap: wrap;
							.avatar {
								margin-left: 0.1333rem;
								img {
									width: .8rem;
									height: .8rem;
									border-radius: 6px;
								}
							}
						}
					}
					.comment-message-list {
						margin-top: 0.1333rem;
						background-color: #f1f1f1;
						border-radius: 4px;
						display: flex;
						img {
							width: 0.6667rem;
							height: 0.6667rem;
						}
						.message-list {
							margin-left: 0.1067rem;
							flex: 1;
							.message-item {
								display: flex;
								margin-bottom: 0.2333rem;
								img {
									width: .8rem;
									height: .8rem;
									border-radius: 6px;
								}
								.message {
									flex: 1;
									margin-left: 0.1333rem;
									.message-top {
										width: 100%;
										display: flex;
										justify-content: space-between;
										.name {
											color: #2E7CFD;
										}
										.time {
											color: #ccc
										}
									}
									.message-bottom {}
								}
							}
						}
					}
				}
			}
		}
		.comment-send {
			position: relative;
			padding: 0.1333rem 0.4667rem;
			height: 12%;
			display: flex;
			flex-direction: column;
			.emotion_area {
				height: 1rem; // left: .2rem;
				overflow: hidden;
				background: #f1f1f1;
			}
			.input-comment {
				background: #f1f1f1;
				min-height: 1rem;
				width: 100%;
				border: none;
				border-bottom: 1px solid #ccc;
				text-indent: 0.2667rem;
			}
			.face-icon {
				position: absolute;
				top: .2rem;
				right: 1.6rem;
				width: .8rem;
				height: .8rem;
			}
			.btn {
				position: absolute;
				top: .2rem;
				right: .5rem;
				width: .8rem;
				height: .8rem;
				width: 1rem;
				height: .8rem;
				text-align: center;
				line-height: .8rem;
				background-color: #ffdd44;
				color: #fff;
				border-radius: 4px;
			}
		}
	}
</style>


