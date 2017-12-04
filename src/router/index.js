import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect,
	hashHistory
} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@/redux/store'
import App from '../component/App'
import Home from '../component/Home'
import Categroy from '../component/Categroy'
import Member from '../component/Member'
import Chat from '../component/Chat'
import Cart from '../component/Cart'
import Login from '../component/Login'
import Register from '../component/Register'
import Islogin from '../component/common/Islogin'
//商品详情
import Detail from '../component/Detail'
import Product_detail from '../component/Product_detail'
import Product_info from '../component/Product_info'
import Product_eval from '../component/Product_eval'

//搜索
import Search from '../component/Search'

//产品列表
import Product_list from '../component/Product_list'
const router=(
		<Provider store={store}>
		<Router>
		<App>
			<Switch>
				<Route path='/home' component={Home}/>	
				<Route path='/categroy' component={Categroy}/>	
				<Route path='/member' component={Member}/>
				<Route path='/chat_list' component={Chat}/>
				<Route path='/cart_list' component={Cart}/>
				<Route path='/login' component={Login}/>
				<Route path='/register' component={Register}/>
				<Route path='/islogin' component={Islogin}/>
				<Route path='/detail/:id' render={()=>
					<Detail>
						<Switch>
					 		<Route path="/detail/:id/product_detail" component={Product_detail}/>
					 		<Route path="/detail/:id/product_info" component={Product_info}/>
					 		<Route path="/detail/:id/product_detail" component={Product_detail}/>
					 		<Route path="/detail/:id/product_eval" component={Product_eval}/>
					 		<Redirect from='/' to={`/detail/${window.location.hash.split('/')[2]}/product_detail`}/>
						</Switch>
					</Detail>
				}/>
					
				<Route path='/search' component={Search}/>
				<Route path='/product_list/:id' component={Product_list}/>
				<Redirect from='*' to='/home'/>
			</Switch>			
		</App>
		</Router>
		</Provider>
	)

export default router