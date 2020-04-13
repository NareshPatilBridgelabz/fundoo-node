import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import { searchUserByWord } from "../services/userServices";
import { getUserData } from "../services/userServices";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default class Collaborator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      searchWord: "",
      listOpen: false,
      listAnchorEl: null,
      searchedList: []
    };
    searchUserByWord('aaaa').then((response) =>
      this.setState({ searchedList: response.data.data.details })
    );
    this.state.currencies = [
      {
        value: "USD",
        label: "$",
      },
      {
        value: "EUR",
        label: "€",
      },
      {
        value: "BTC",
        label: "฿",
      },
      {
        value: "JPY",
        label: "¥",
      },
    ];
  }

  handleClick = (e) => {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget,
    });
  };
  onChangeSearch = (e) => {
    this.setState({ searchWord: e.target.value });
    searchUserByWord(e.target.value).then((response) =>
      this.setState({ searchedList: response.data.data.details })
    );
  };
  listHandleClose = (e) => {
    this.setState({
      listOpen: !this.state.listOpen,
      listAnchorEl: e.currentTarget,
    });
  };
  render() {
    return (
      <div className="collaborator">
        <IconButton onClick={this.handleClick}>
          <PersonAddIcon />
        </IconButton>
        <Popover
         
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Card  className='collabPop' >
            <div className="callaboratorTitle">Collaborators</div>
            <Divider />
            <CardContent>
              {/* <div >
                <Typography >
                  {this.props.noteData.user.firstName + ' ' + this.props.noteData.user.lastName}
                  (Owner)
                </Typography>
                <Typography color="textSecondary">
                  {this.props.noteData.user.email}
                </Typography>
              </div> */}

              <div className="collaboratorOwner">
                <div>
                  <IconButton>{/* <PersonAddIcon/> */}</IconButton>
                  <div className="collaboratorDetails">
                    <Typography>
                      {this.props.noteData.user.firstName +
                        " " +
                        this.props.noteData.user.lastName}
                      (Owner)
                    </Typography>
                    <Typography color="textSecondary">
                      {this.props.noteData.user.email}
                    </Typography>

                  </div>
                </div>
              </div>

              <div className="collaboratorListBox">
                
                {this.props.collaborators.map(callaber => {
                  return (
                    <div>
                      <div className="emailIcon">
                        {callaber.firstName.charAt(0)}
                      </div>
                      <div className="collaboratorDetails">
                        <Typography>
                          {callaber.firstName +
                            " " +
                            callaber.lastName}
                        </Typography>
                        <Typography color="textSecondary">
                          {callaber.email}
                        </Typography>
                      </div>
                      <HighlightOffIcon onClick={e => this.props.removeCollab(callaber.userId)} fontSize="large"/>
                    </div>
                  );
                })}
              </div>

              <IconButton>
                <PersonAddIcon />
              </IconButton>

              <InputBase
                placeholder="Search"
                value={this.state.searchWord}
                onChange={this.onChangeSearch}
                onClick={this.listHandleClose}
              />

              <Popover
                id="searchedListPopover"
                open={this.state.listOpen}
                anchorEl={this.state.listAnchorEl}
                onClose={this.listHandleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <div className="collabSearchList">
                  {this.state.searchedList.map((user) => {
                    return (
                      <MenuItem onClick={(e) => this.props.clickOnUser(user)}>
                        <div>{user.firstName + " " + user.lastName}</div>
                        <div>{"[" + user.email + "]"}</div>
                      </MenuItem>
                    );
                  })}
                </div>
              </Popover>

              {/* {this
                .state
                .currencies
                .map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              {/* </div> */}
              {/* </div> */}
            </CardContent>
            <CardActions className="collabAction">
              <Button size="small" color="primary" onClick={this.handleClick}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Popover>
      </div>
    );
  }
}
