import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'antd/dist/antd.css'
import './assets/css/style.css'
import login from './containers/login/index.js'
import main from './containers/main/index.js'
import student_master from './containers/student_master/index.js'
import { HashRouter,BrowserRouter,Route,Link,Switch  } from 'react-router-dom'

const store = configureStore()

ReactDOM.render((
	<Provider store={store}>
		<HashRouter>
			<div>
				<Switch>
					<Route path="/login" component={login}/>
					<Route path="/main" component={main}/>
					<Route path="/student_master" component={student_master}/>
				</Switch>
			</div>
		</HashRouter>
	</Provider>
	),document.getElementById('app'));
