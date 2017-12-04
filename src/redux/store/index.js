import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'
import {
  reducer,
  recommondlistreducer,
  detaillistreducer,
  chatlistreducer,
  detaillist_inforeducer,
  searchlistreducer,
  cart_countreducer,
  cart_listreducer,
  userinforeducer
} from '../reducer'
import ReduxPromise from 'redux-promise'

//redux-devtools配置
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxPromise),
  // other store enhancers if any
);

const store=createStore(
		combineReducers({
			hometoplist:reducer,
      recommondlist:recommondlistreducer,
      detaillist:detaillistreducer,
      chatlist:chatlistreducer,
      detaillist_info:detaillist_inforeducer,
      searchlist:searchlistreducer,
      cart_count:cart_countreducer,
      cart_list:cart_listreducer,
      userinfo:userinforeducer
		}),
		enhancer
	)
export default store

