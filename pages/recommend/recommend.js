// pages/recommend/recommend.js
Page({

	data: {
		imgDatas:[],//轮播图数据
		musicDatas:[] //歌曲数据

	},
	onShow: function() {
		 this.getRotation() //执行请求轮播图函数
		 this.getMusic() //执行请求歌曲函数
	},
	getRotation(){ //请求轮播图函数
		let _self = this
		wx.request({
			url:"http://t2.ossjk.com/api/getRotation", //请求轮播图接口
			success(res){
				_self.setData({ //获取完数据之后，赋值给imgDatas,通过setData修改数据
					imgDatas:res.data,
				})
			}
		})
	},
	getMusic(){ //请求歌曲函数
		let _self = this
		wx.request({
			url:"http://t2.ossjk.com/api/getMusic", //请求歌曲接口
			success(res){
				_self.setData({ //获取完数据之后，赋值给musicDatas,通过setData修改数据
					musicDatas:res.data,
				})
			}
		})
	},
	toPlay($event){ //跳转播放页方法
		let _self = this
	//通过路由传递数据
	/*let item = JSON.stringify($event.currentTarget.dataset.item) //JSON.stringify转换json字符串
		wx.navigateTo({
			url:`/pages/play/play?item=${item}`,
		})*/
	
	//通过emit传递数据(事件订阅模式)
	 wx.navigateTo({
	 	url:`/pages/play/play`,
		success:function(res){
			res.eventChannel.emit('getMusicInfo',{
				data:$event.currentTarget.dataset.item, //当前歌曲信息
				musicList:_self.data.musicDatas //所有歌曲信息
			})
		}
	 })
	}
})
