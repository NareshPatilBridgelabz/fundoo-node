import React,{Component} from 'react'
import { IconButton } from '@material-ui/core'
import SettingIcon from '@material-ui/icons/Settings'
class Test2 extends Component{
    render(){
        return(
            <React.Fragment>
                <IconButton>
                    <SettingIcon/>
                </IconButton>
            </React.Fragment>
        )
    }
}
export default Test2