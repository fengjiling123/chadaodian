import React,{Component} from 'react'
import './index.scss'
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux'
import { Carousel, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile'
class Search extends Component{
	constructor(){
		super()
		this.state={
			active:"zh",
			search_key_list:[],
			searchtype:null,
			tosearch:false,
			page:2,
			morelist:[],
			hasmore:false

		}
	}

	componentWillMount(){
		this.setState({
			page:2,
			morelist:[],
			hasmore:false
		})
		console.log(this.props.location.search)
		if(localStorage.getItem('loginuser')){
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			console.log(loginuser.key)
			axios.get(`/mobile/index.php?act=index&op=search_key_list`)
			.then(res=>{
				console.log(res.data.datas.list)
				this.setState({
					search_key_list:res.data.datas.list,
					page:2,
					morelist:[],
					hasmore:false
				})
			})
		}else{
			this.props.history.push('/login')
		}
		if(this.props.location.search){
			this.setState({
				tosearch:true,page:2,
				morelist:[],
				hasmore:false
			})
			var loginuser=JSON.parse(localStorage.getItem('loginuser'))
			this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.props.location.search.split('=')[1]}&page=10&curpage=1&keyword=${this.props.location.search.split('=')[1]}&key=${loginuser.key}`)
		}
		
	}
	
	render(){
		return <div id='search'>
			<div className='searchheader'>
				<span className='goback' onClick={this.goback.bind(this)}><i className='iconfont icon-fanhui'></i></span>
				<div className='inp' onClick={this.change.bind(this)}>
					<i className='iconfont icon-sousuo'></i>
					<input type='text' placeholder='请输入搜索关键词' ref='keyword'/>
				</div>
				<div className='sousuo' onClick={this.search.bind(this)}>搜索</div>
			</div>
			{
				this.state.tosearch?
				<div className='content'>
					<div className='searchtype'>
						<ul>
							<li className={this.state.active=='zh'?"active":''} onClick={this.search.bind(this,'zh')}>综合排序</li>
							<li className={this.state.active=='salenum'?"active":''} onClick={this.initsearch.bind(this,2,'salenum')}>销量优先</li>
							<li className={this.state.active=='sx'?"active":''} onClick={this.initsearch.bind(this,1,'sx')}>筛选</li>
						</ul>
					</div>
					{
						this.props.searchlist?
						<div key={this.state.searchtype}>
							<InfiniteScroll
							    pageStart={0}
							    loadMore={this.loadMore.bind(this)}
							    hasMore={this.state.morelist.length?this.state.hasmore:this.props.searchlist.hasmore}
							    loader={<ActivityIndicator size="large" text="加载中..." className='loadingmore'/>}
							    threshold={0}
							    initialLoad={false}
							>
							{
								this.props.searchlist.datas.goods_list.length?
								[...this.props.searchlist.datas.goods_list,...this.state.morelist].map(item=>
									<div key={item.goods_id} className='clear info_box' onClick={this.todetail.bind(this,item.goods_id)}>
										<div className='left img'>
											<img src={item.goods_image_url}/>
										</div>
										<div className='left info'>
											<p className='goods_name'>{item.goods_name}</p>
											<p className='goods_price'>￥{item.goods_price}</p>
											<p className='goods_salenum'>销量 {item.goods_salenum}</p>
					
										</div>
									</div>


									):<div className='noinfo'>没有找到任何相关信息</div>
							}
							</InfiniteScroll>
						</div>:<ActivityIndicator size="large" text="加载中..." className='loading'/>
					}
				</div>:
				<div key={this.state.search_key_list.length} className='key_search'>
					<p>热门搜索</p>
					{
						this.state.search_key_list.map(item=>
								<span key={item}>{item}</span>
							)
					}
				</div>

			}
			
		</div>
	}
	todetail(id){
		this.props.history.push(`/detail/${id}`)
	}
	goback(){
		history.go(-1)
	}
	loadMore(){

		console.log('11113434aaaaa')
		console.log(this.state.page)

		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		if(this.props.searchlist.hasmore){
			axios.get(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.props.location.search.split('=')[1]}&page=10&curpage=${this.state.page}&keyword=${this.props.location.search.split('=')[1]}&key=${loginuser.key}`)
			.then(res=>{
				console.log(res)
				//console.log(9999)
				this.setState({
					morelist:[...this.state.morelist,...res.data.datas.goods_list],
					hasmore:res.data.hasmore,
					page:this.state.page+1
				})
			})
		}
		//this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=b&page=10&curpage=2&keyword=b&key=${loginuser.key}`)
	}
	change(){
		if(this.props.location.search){
			this.refs.keyword.value=this.props.location.search.split("=")[1]
		}
		
		this.setState({
			tosearch:false,
			searchtype:null,
			page:2,
			morelist:[],
			hasmore:false
		})
	}
	search(){
		var loginuser=JSON.parse(localStorage.getItem('loginuser'))
		if(this.refs.keyword.value){
			this.props.history.push(`/search?keyword=${this.refs.keyword.value}`)
			this.setState({
				active:"zh",
				tosearch:true,
				searchtype:null,
				page:2,
				morelist:[],
				hasmore:false
			})
			this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.refs.keyword.value}&page=10&curpage=1&keyword=${this.refs.keyword.value}&key=${loginuser.key}`)
		}else if(this.props.location.search){
			this.setState({
				active:"zh",
				tosearch:true,
				searchtype:null,
				page:2,
				morelist:[],
				hasmore:false
			})
			this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.props.location.search.split('=')[1]}&page=10&curpage=1&keyword=${this.props.location.search.split('=')[1]}&key=${loginuser.key}`)
		}
	}

	initsearch(order,active){
		console.log(this.props.location.search)
		if(this.refs.keyword.value){
			this.setState({
				active:active,
				searchtype:order,
				page:2,
				morelist:[],
				hasmore:false
			})
			this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.refs.keyword.value}&page=10&curpage=1&keyword=${this.refs.keyword.value}&order=${order}`)
		}else if(this.props.location.search){
			this.setState({
				active:active,
				searchtype:order,
				page:2,
				morelist:[],
				hasmore:false
			})
			this.props.getsearchlist(`/mobile/index.php?act=goods&op=goods_list&keyword=${this.props.location.search.split('=')[1]}&page=10&curpage=1&keyword=${this.props.location.search.split('=')[1]}&order=${order}`)
		}
	}
}
//综合排序

//价格从高到低
//http://www.chadaodian.com/mobile/index.php?act=goods&op=goods_list&keyword=2&page=10&curpage=1&keyword=2&order=2
export default connect(
	(state)=>{
		console.log(state.searchlist)
		return {
			searchlist:state.searchlist
		}
	},
	{
		getsearchlist:(url)=>{
			return axios.get(url)
				.then(res=>{
					//console.log(res.data)
					return {
						type:'searchlist',
						payload:res.data
					}
				})
		}
	}

	)(Search)