import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLogin} from '../utils'

export default function privateRouter({component:Component, restricted, ...rest}) {
    return (
        <Route {...rest} render={props => (
            // console.log('isLogin',isLogin())
            isLogin() ?   <Component {...props} />
                        : <Redirect to='/login' />
        )}
        />
    )
}