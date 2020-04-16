import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { searchUserByWord } from "../services/userServices";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default class CollaboratorNewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      searchWord: "",
      listOpen: false,
      listAnchorEl: null,
      searchedList: [],
      profileImage : JSON.parse(localStorage.getItem('userProfileImage')),
    };
    searchUserByWord('aaaa').then((response) =>
      this.setState({ searchedList: response.data.data.details })
    );
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

              <div className="collaboratorOwner">
                <img
                    src={
                      process.env.REACT_APP_DOMAIN_URL + this.state.profileImage
                    }
                    onClick={this.handleClick}
                    className="profile_logo"
                  />
                  <div className="collaboratorDetails">
                    <Typography>
                      {this.props.data.userData.firstName +
                        " " +
                        this.props.data.userData.lastName}
                      (Owner)
                    </Typography>
                    <Typography color="textSecondary">
                      {this.props.data.userData.email}
                    </Typography>

                </div>
              </div>

              <div className="collaboratorListBox">
                
                {this.props.data.collaborators.map(callaber => {
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
                      <HighlightOffIcon onClick={e => this.props.data.removeCollab(callaber.userId)} fontSize="large"/>
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
                      <MenuItem onClick={(e) => this.props.data.addCollab(user)}>
                        <div>{user.firstName + " " + user.lastName}</div>
                        <div>{"[" + user.email + "]"}</div>
                      </MenuItem>
                    );
                  })}
                </div>
              </Popover>
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
