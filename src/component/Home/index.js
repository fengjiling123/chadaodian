import React,{Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
import ReactSwipe from 'react-swipe';
import {NavLink} from 'react-router-dom'
import Islogin from '../common/Islogin'
import { Carousel, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile'
class Home extends Component{
	constructor(){
		super()
	}
	componentWillMount(){
		this.props.gethometoplist()
		this.props.gethomerecommondlist()
	
	}
	todetail(id){
		this.props.history.push(`/detail/${id}`)
	}
	render(){
		var swipe=(<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}}>
	               {

	               	this.props.hometoplist.length?
	               	(this.props.hometoplist[0].adv_list.item.map((item,index)=>              		
	               			<img src={item.image} key={item.image}/>

	               		)):<ActivityIndicator size="large" text="加载中..." className='loading'/>

	               }
	           </ReactSwipe>)
		var discount=(<div className='discound-content'>
   						{
   								this.props.hometoplist.length?
   								<div className='title'>{this.props.hometoplist[1].goods1.title}</div>
   								:null
   						}
   						<div className='discound'>
   		               {

   		               	this.props.hometoplist.length?
   		               	(this.props.hometoplist[1].goods1.item.map((item,index)=>
   		               		<div key={item.goods_id} onClick={this.todetail.bind(this,item.goods_id)}>
								<img src={item.goods_image} className='img'/> 
								<div className='goods_name'>{item.goods_name}</div>  
								<div className='goods_promotion_price'>{item.goods_promotion_price}</div>           	
   		               		</div>              		
   		               			
   		               		)):null

   		               }
   		               </div>
   		           
	           </div>)
		var recommond=(<div className='recommond'>
	           	<div className='title'>为您推荐</div>

	           	{
	           		this.props.recommondlist.length?
	           		this.props.recommondlist.map(item=>
	           			<div key={item.goods_id} className='goods_item'  onClick={this.todetail.bind(this,item.goods_id)}>
	           				<img src={item.goods_image_url}/>
	           				<div className=''>
	           					<p className='re_goods_name'>{item.goods_name}</p>
	           					<p className='store_name'>
	           						<span>品牌：{item.store_name}</span>

	           						<span>销量：{item.goods_salenum}</span>
	           					</p>
	           					<p className='recgoods_price'>￥{item.goods_price}</p>
	           				</div>
	           			</div>

	           			):null

	           	}
           </div>)
		return <div id='home'>
			<div className='homeheader'>
				<i className='iconfont icon-sanhengxian' onClick={()=>{this.props.history.push('/categroy')}}></i>
				<span>茶到店</span>
				<i className='iconfont icon-cart' onClick={()=>{this.props.history.push('/cart_list')}}></i>
			</div>
			<div className='homesearch clear' onClick={()=>{this.props.history.push('/search')}}>
				<div className='inp left'>
					<i className='iconfont icon-sousuo2'></i>
					<input placeholder='请输入关键字' />
				</div>
				
				<div className='right'>
					<i className='iconfont icon-caogaoxiang1'></i>
					消息
				</div>
			</div>
			<div key={this.props.hometoplist.length} className='bot'>
				{
					//轮播图
				}
				{swipe}
	           <div className='hometopnav'>
	           		<NavLink to='/categroy'>
	           			<span className='list'>
	           				<i></i>
	           			</span>
	           			<span>分类</span>
	           		</NavLink>
	           		<NavLink to='/cart_list'>
	           			<span className='cart'>
	           				<i></i>
	           			</span>
	           			<span>购物车</span>
	           		</NavLink>
	           		<NavLink to='/member'>
	           			<span className='member'>
	           				<i></i>
	           			</span>
	           			<span>我的账号</span>
	           		</NavLink>
	           		<NavLink to='/member'>
	           			<span className='signin'>
	           				<i></i>
	           			</span>
	           			<span>每日签到</span>
	           		</NavLink>
	           </div>
	           {
	           	//折扣
	           }
	          	{discount}
	        </div>
	        
           {
           	//推荐
           }
          {recommond}
          {
          	//底部
          }
         <Islogin/>

		</div>
	}
}


export default connect(
	(state)=>{
		//console.log(state)
		return {
			hometoplist:state.hometoplist,
			recommondlist:state.recommondlist,
			
		}
	},
	//第二个参数是对象可以写多个事件
	{
		//redux-promise 异步处理中间件
		gethometoplist:()=>{
			return axios.get(`/mobile/index.php?act=index`).then(res=>{
				//console.log(res.data)
				return {
					type:'hometoplist',
					payload:res.data.datas
				}
			})
		},
		gethomerecommondlist:()=>{
			return axios.get(`/mobile/index.php?act=index&op=onlyforyou`).then(res=>{
				//console.log(res.data)
				return {
					type:'homerecommondlist',
					payload:res.data.datas.goods_list
				}
			})
		}
	}

)(Home)