// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		myMusic:{}, //音乐播放器对象
		// musicDatas:[] //歌曲数据
		currentMusic:{}, //当前歌曲信息对象
		bool:true ,//播放状态
		progress:0 ,//播放进度条
		startTime:"00:00", //开始时间
		endTime:"00:00", //结束时间
		deg:0, //cd旋转
		musicList:[] //所有歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	  //通过路由接受数据
	 /* this.setData({
		  currentMusic:JSON.parse(options.item) //JSON.parse转回json对象
		  
	  })
	  console.log(this.data.currentMusic)*/
	  
	  // this.getMusic(function(res){
		 //  // console.log(res) //歌曲列表
		 //  // console.log(options) //当前歌曲id
		  
		 //  let arr= res
		 //  arr.forEach((item)=>{
			//   if(item.id === options.id){
			// 	  this.setData({ //循环迭代获得的歌曲信息赋值给currentMusic对象
			// 		  currentMusic:item
			// 	  })
			//   }
		 //  })
	  // }) 
	  
	  
	  
	  //方法二
		/*const eventChannel = this.getOpenerEventChannel()
		eventChannel.on('getId',function(data){
			console.log(data)
		})*/
		
		//通过on接受数据(事件订阅模式)
		let _self = this
		const eventChannel = this.getOpenerEventChannel()
		eventChannel.on('getMusicInfo',function(data){
			_self.setData({
				currentMusic:data.data, //当前歌曲信息
				musicList:data.musicList //所有歌曲
			})
		})
		console.log(this.data.currentMusic)
  },
  // getMusic(fn){ //请求歌曲函数
  // 	let _self = this
  // 	wx.request({
  // 		url:"http://t2.ossjk.com/api/getMusic", //请求歌曲接口
  // 		success(res){
  // 			fn(res.data) //把歌曲列表回调给fn
			
  // 		}
  // 	})
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  this.setData({
		  "myMusic":wx.createAudioContext("myMusic") //根据id生成音乐播放器上下文对象
	  })
	 this.data.myMusic.setSrc(this.data.currentMusic.mp3Url) //设置音乐播放歌曲地址
	  this.data.myMusic.play() //播放歌曲
	  
  },
  play(){ //播放
	  if(this.data.bool){ //如果true那么就是播放状态
		  this.setData({
			  "bool":false
		  })
		  this.data.myMusic.pause() //暂停歌曲
	  }else{
		 this.setData({
			  "bool":true
		 }) 
		 this.data.myMusic.play() //播放歌曲
	  }
  },
  timeupdate(obj){ //播放进度改变
	 let {currentTime,duration} = obj.detail
	 let progress = currentTime / duration
	 this.setData({
		 "progress":progress*100,
		 "startTime":this.formTime(currentTime),
		 "endTime":this.formTime(duration),
		 "deg":++this.data.deg
	 })
	 this.formTime(currentTime)
  },
  formTime(time){  //时间序列化
		let t = parseInt(time) //取整
		let m = parseInt(t/60) //分钟
		let minutes = m.length < 2 ? '0' + m : m
		let s = parseInt(t - m*60).toString() //秒
		let seconds = s.length < 2 ? '0' + s : s
		return minutes + ':' + seconds
  },
  next(){ //播放下一首歌曲
	  let list = this.data.musicList //所有歌曲信息
	  let current = this.data.currentMusic //当前歌曲信息
	  let i
	  list.forEach(function(item,idx){
		  if(item.id === current.id){
			 i =idx
		  }
	  })
	  if(i>=list.length-1){
		  i=0
	  }else{
		  i++
	  }
	  this.setData({
		  "currentMusic":list[i]
	  })
	  this.data.myMusic.setSrc(this.data.currentMusic.mp3Url) //设置音乐播放歌曲地址
	   this.data.myMusic.play() //播放歌曲
  },
  prev(){
	  let list = this.data.musicList //所有歌曲信息
	  let current = this.data.currentMusic //当前歌曲信息
	  let i
	  list.forEach(function(item,idx){
	  		  if(item.id === current.id){
	  			 i =idx
	  		  }
	  })
	  if(i<=0){
		  i=list.length-1
	  }else{
		  i--
	  }
	  this.setData({
	  		  "currentMusic":list[i]
	  })
	  this.data.myMusic.setSrc(this.data.currentMusic.mp3Url) //设置音乐播放歌曲地址
	   this.data.myMusic.play() //播放歌曲
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})