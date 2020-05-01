import React from 'React'
import {Route, Redirect} from 'react-router-dom'
import {isLogin} from '../utils'

export default publicRouter = ({component:Component , restricted, ...rest}) => {
    return(
        <Route {...rest} render={props => (
            isLogin() && restricted ? <Redirect to='/dashboard' />
                        : <Component {...props} />
        )}
        />
    )
}