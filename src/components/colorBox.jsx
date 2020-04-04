import React from "react";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ColorLensIcon from "@material-ui/icons/ColorLens";

export default class ColorBox extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state={
        anchorEl:null,
        open:false,
        changeColor:props.changeColor
    }
  }
  handleClick = event => {
    this.setState({
        anchorEl: event.currentTarget,
        open: !this.state.open
    });
  }
  
  render() {
    return (
      <div >
            <IconButton
            //  aria-describedby={id}
             variant="contained"
             color="grey"
             onClick={this.handleClick}>
                <ColorLensIcon />
            </IconButton>
        <Popover className="colorBoxRoot"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
          open={this.state.open}
          keepMounted
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
          
          
        >
          <div className="colorBox">
              <div style={{backgroundColor:'white',border:'solid 1px'}} color='#FFFFFF' color='#FFFFFF' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#fa8072'}} color='#fa8072' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#fd823b'}} color='#fd823b' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#ffff64'}} color='#ffff64' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#66ff66'}} color='#66ff66' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#5bb4b4'}} color='#5bb4b4' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#0606f8'}} color='#0606f8' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#00FFFF'}} color='#00FFFF' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#9b2c9b'}} color='#9b2c9b' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#FFC0CB'}} color='#FFC0CB' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#d10303'}} color='#d10303' onClick={this.state.changeColor}>
              </div>
              <div style={{backgroundColor:'#808080'}} color='#808080' onClick={this.state.changeColor}>
              </div>
              
          </div>
        </Popover>
      </div>
    );
  }
}
