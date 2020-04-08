import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { Menu, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Card, Tooltip } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import EditIcon from "@material-ui/icons/Edit";
import ArchiveIcon from "@material-ui/icons/Archive";
import SettingsIcon from "@material-ui/icons/Settings";
import ListAltIcon from "@material-ui/icons/ListAlt";
import RefreshIcon from "@material-ui/icons/Refresh";
import DialpadIcon from "@material-ui/icons/Dialpad";
import userLogo from "../assets/svg/Avatar.svg";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PlaceIcon from "@material-ui/icons/Place";
import Note from "./notes";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { getUserNote } from "../services/noteServices";
import { setUserNote } from "../services/noteServices";
import { removeNoteLabel } from "../services/noteServices";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ColorBox from './colorBox'
import LableSideBar from './lableSideBar'
import AddLabelNote from './addLabelNote'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// import Appbar from './appBar'
import AcUnitIcon from "@material-ui/icons/AcUnit";
// import Header from './dashbord/header'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerRender: "createnote",
      menuAnchor: null,
      menuOpen: false,
      sideBarOpen: false,
      sidebarLeft: "0%",
      mainContainer: "80%",
      reminderMenuAnchor: null,
      reminderMenuOpen: false,
      MoreMenuAnchor: null,
      MoreMenuOpen: false,
      noteCardBackDisplay: "none",
      title: "",
      description: "",
      reminderMain: "",
      allNotes: [],
      displayReminder: "",
      displayDatePick: "none",
      date: "",
      time: "",
      reminderDisplay: "none",
      list: [],
      listMain: "",
      diplayCheckBox: "none",
      isArchive: false,
      noteColor:'',
      openBackDrop:'false',
      labelIdList:[]
    };
    this.userNoteRefresh();
  }

  labelIdListChange = () => {
    this.setState({labelIdList:this.state.labelIdList})
  }
  labelIdListRemove = (index) => {
    console.log("Remove List")
    this.state.labelIdList.splice(index,1)
    this.setState({labelIdList:this.state.labelIdList})
  }
  changeMainContainer = (event) => {
    this.state.containerRender = event.target.getAttribute("data");
    this.setState({ containerRender: this.state.containerRender });
  };
  timing = [
    {
      value: "morning8:00AM",
      label: "morning     8:00 AM",
    },
    {
      value: "afternoon1:00PM",
      label: "afternoon   1:00 PM",
    },
    {
      value: "evening4:00PM",
      label: "evening     4:00 PM",
    },
    {
      value: "night8:00PM",
      label: "night       8:00 PM",
    },
  ];
  userNoteRefresh = () => {
    this.setState({openBackDrop:TextTrackCue})
    getUserNote().then((response) => {
      if (response.data.data.data) {
        this.setState({openBackDrop:false})
        this.setState({ allNotes: response.data.data.data });
      }
    });
  };

  handleClick = (event) => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen,
    });
  };
  handleClose = (event) => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen,
    });
  };
  sidebarActive = () => {
    this.setState({
      sideBarOpen: !this.state.sideBarOpen,
    });
    if (this.state.sideBarOpen) {
      this.setState({ sidebarLeft: "0%" });
      this.setState({ mainContainer: "80%" });
    } else {
      this.setState({ sidebarLeft: "-20%" });
      this.setState({ mainContainer: "100%" });
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    this.props.history.push("/login");
  };
  searchBarHandel = () => {
    alert("click");
  };
  remiderHandler = (event) => {
    this.setState({
      reminderMenuAnchor: event.currentTarget,
      reminderMenuOpen: !this.state.reminderMenuOpen,
    });
  };
  moreMenuHandler = (event) => {
    this.setState({
      MoreMenuAnchor: event.currentTarget,
      MoreMenuOpen: !this.state.MoreMenuOpen,
    });
  };
  addNote = () => {
    // label list
      let id = []
      this.state.labelIdList.map(e => { id.push(e.id) })

    if (this.state.title != "") {
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", this.state.reminderMain);
      form_data.append("checklist", JSON.stringify(this.state.list));
      form_data.append("isArchived", this.state.isArchive);
      form_data.append("color", this.state.noteColor);
      form_data.append("labelIdList", JSON.stringify(id));

      setUserNote(form_data).then((response) => {
        if (response) {
          this.userNoteRefresh();
          this.onFocusTitle();
        }
      });

      this.setState({ title: "" })
      this.setState({ description: "" })
      this.setState({ listMain: "" })
      this.setState({ reminderDisplay: "none" })
      this.setState({ list: [] })
      this.setState({ diplayCheckBox: "none" })
      this.setState({ noteColor: "" })
      this.setState({ labelIdList: [] })
      //for close the main Note Box
    }
  };
  onChangeTitle = (event) => {
    this.setState({ title: event.currentTarget.value });
  };
  onChangeNote = (event) => {
    this.setState({ description: event.currentTarget.value });
  };
  onFocusTitle = () => {
    // alert("sdsdsd");
    this.setState({
      noteCardBackDisplay: this.state.noteCardBackDisplay === "" ? "none" : "",
    });
  };
  onClickCheckList = () => {
    this.setState({ diplayCheckBox: this.state.diplayCheckBox ? "" : "none" });
  };
  clickPickDate = () => {
    this.setState({
      displayReminder: this.state.displayReminder === "" ? "none" : "",
    });
    this.setState({
      displayDatePick: this.state.displayDatePick === "" ? "none" : "",
    });
  };
  handleChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };
  handleChangeTime = (event) => {
    this.setState({ time: event.currentTarget.dataset.value });
  };
  setReminderOnclick = (event) => {
    let time = "";
    let date = new Date();
    if (event.target.getAttribute("time")) {
      time = new Date(
        date.setDate(
          date.getDate() + parseInt(event.target.getAttribute("time"))
        )
      ).toString();
    } else {
      time = new Date(this.state.date).toString();
    }
    this.setState({ reminderMain: time });
    this.setState({ reminderDisplay: "flex" });
    this.setState({ reminderMenuOpen: !this.state.reminderMenuOpen });
  };
  reminderClose = () => {
    this.setState({ reminderDisplay: "none" });
    this.setState({ reminderMain: "" });
  };
  onChangeListMain = (event) => {
    if (event.key === "Enter") {
      let listData = { itemName: this.state.listMain, status: "open" };
      this.state.list.push(listData);
      this.setState({ listMain: "" });
    }
    if (event.target.value) {
      this.setState({ listMain: event.target.value });
    }
  };
  listItemChange = (event, index) => {
    this.state.list[index] = event.target.value;
    this.setState({ list: this.state.list });
  };
  onclickRemoveList = (removeFrom) => {
    this.state.list.splice(removeFrom, 1);
    this.setState({ list: this.state.list });
  };
  onClickArchive = async () => {
    await this.setState({ isArchive: true });
    this.addNote();
  }
  onClickChanageColor = (event) => {
    this.setState({noteColor:event.target.getAttribute('color')})
  }
  render() {
    let arcObj = this.state.allNotes.map((allnote) => {
      if (!allnote.isDeleted && allnote.isArchived) {
        return (
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh}
          />
        );
      }
      return null;
    });

    let trashObj = this.state.allNotes.map((allnote) => {
      if (allnote.isDeleted) {
        return (
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh}
          />
        );
      }
      return null;
    });
    let reminderObj = this.state.allNotes.map((allnote) => {
      if (allnote.reminder.length > 0 && !allnote.isDeleted) {
        return (
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh}
          />
        );
      }
      return null;
    });

    return (
      <div>
        <div className="headerbar">
          <div className="header_left">
            <IconButton onClick={this.sidebarActive}>
              <MenuIcon />
            </IconButton>
            <img src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" />
          </div>
          <div className="searchBox">
            <Card id="searchbar">
              <Tooltip title="search">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <InputBase placeholder="Search" fullWidth />
            </Card>
          </div>
          <div className="buttonBundle1">
            <IconButton
              className="searchButton2"
              onClick={this.searchBarHandel}
            >
              <SearchIcon />
            </IconButton>
            <IconButton>
              <RefreshIcon />
            </IconButton>
            <IconButton className="hideIcon">
              <ListAltIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
          <div className="header_userProfile">
            <IconButton className="hideIcon">
              <DialpadIcon />
            </IconButton>
            <IconButton // variant='contained'
              // color='primary'
              size="small"
            >
              <img
                src={userLogo}
                onClick={this.handleClick}
                id="profile_logo"
              />
            </IconButton>
          </div>
          <Menu
            id="profile-menu"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={this.state.menuAnchor}
            keepMounted
            open={this.state.menuOpen}
            onClose={this.handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="dashboard_body">
          <div
            className="sidebar"
            style={{
              left: this.state.sidebarLeft,
            }}
          >
            <div
              className="sidebar_component"
              data="createnote"
              onClick={this.changeMainContainer}
            >
              <WbIncandescentIcon />
              Notes
            </div>
            <div
              className="sidebar_component"
              data="reminder"
              onClick={this.changeMainContainer}
            >
              <NotificationsNoneIcon />
              Reminder
            </div>
            <Divider />
            {/* <div
              className="sidebar_component"
              data="editlable"
              onClick={this.changeMainContainer}
            >
            
              <EditIcon />
              Edit Lable
            </div> */}
            <LableSideBar />
            <Divider />
            <div
              className="sidebar_component"
              data="archivenote"
              onClick={this.changeMainContainer}
            >
              <ArchiveIcon />
              Archive
            </div>
            <div
              className="sidebar_component"
              data="trashnote"
              onClick={this.changeMainContainer}
            >
              <DeleteSweepIcon />
              Trash

            </div>
          </div>

{/* CONDITIONAL RENDERING */}
          <div
            className="dashboard_container"
            style={{
              width: this.state.mainContainer,
            }}
          >
            {this.state.containerRender === "createnote" ? (
              <div>
                <div className="cardRow">
                  <Card style={{backgroundColor:this.state.noteColor}}>
                    <CardContent >
                      <Typography color="textSecondary">
                        <InputBase
                          className='fontStyle_main'
                          inputProps={{
                            placeholder: "Title",
                            "data-state": "Data State 1",
                          }}
                          value={this.state.title}
                          onChange={this.onChangeTitle}
                          onClick={this.onFocusTitle}
                        />
                        <IconButton>
                          <CheckBoxIcon
                            id="checkList"
                            onClick={this.onClickCheckList}
                          />
                        </IconButton>
                      </Typography>
                      <Typography
                        className="cardTakenoteField"
                        style={{
                          display: this.state.noteCardBackDisplay,
                        }}
                      >
                        <InputBase
                          type="textarea"
                          placeholder="Take a note..."
                          rowsMin={3}
                          value={this.state.description}
                          onChange={this.onChangeNote}
                        />
                        <div className="listItem"></div>
                      </Typography>

                      <div style={{ display: this.state.diplayCheckBox }}>
                        <ul className="list_ul">
                          {this.state.list.map((element) => {
                            return (
                              <li>
                                <Checkbox
                                  defaultChecked
                                  color="primary"
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                />
                                <InputBase
                                  value={element.itemName}
                                  onChange={(e) => {
                                    this.listItemChange(
                                      e,
                                      this.state.list.indexOf(element.itemName)
                                    );
                                  }}
                                  inputProps={{ "aria-label": "naked" }}
                                />
                                <IconButton>
                                  <HighlightOffIcon
                                    onClick={(e) =>
                                      this.onclickRemoveList(
                                        this.state.list.indexOf(element)
                                      )
                                    }
                                  />
                                </IconButton>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="listMainInput">
                          <AddIcon />
                          <InputBase
                            value={this.state.listMain}
                            onChange={this.onChangeListMain}
                            onKeyDown={this.onChangeListMain}
                            placeholder="enter list item"
                            inputProps={{ "aria-label": "naked" }}
                          />
                        </div>
                      </div>

                      <div
                        className="addReminderMain"
                        style={{ display: this.state.reminderDisplay }}
                      >
                        {/* <IconButton style={{cursor:"none"}}> */}
                        <AccessAlarmsIcon />
                        {/* </IconButton> */}
                        {this.state.reminderMain.substring(0, 11)}
                        <IconButton value="dfdf" onClick={this.reminderClose}>
                          <HighlightOffIcon />
                        </IconButton>
                      </div>

                      <div className="lableInNote">
                        {this.state.labelIdList.map((e, index) => {
                          return(<div >
                            <div>{e.label}</div>
                            <IconButton size="small">
                              <HighlightOffIcon onClick={e => this.labelIdListRemove(index)}/>
                            </IconButton>
                          </div>)
                        })}
                      </div>
                    </CardContent>
                    <CardActions
                      style={{
                        display: this.state.noteCardBackDisplay,
                      }}
                    >
                      <div className="cardActionsMain">
                        <div className="card_buttonsLeft">
                          <IconButton onClick={this.remiderHandler}>
                            <AddAlertIcon />
                          </IconButton>
                          <Menu
                            className="reminderMenu"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            anchorEl={this.state.reminderMenuAnchor}
                            keepMounted
                            open={this.state.reminderMenuOpen}
                            onClose={this.remiderHandler}
                          >
                            <div
                              style={{
                                display: this.state.displayReminder,
                              }}
                            >
                              <li className="reminderHeading">Reminder</li>
                              <MenuItem
                                time="0"
                                onClick={this.setReminderOnclick}
                              >
                                Later today 8:00 PM
                              </MenuItem>
                              <MenuItem
                                time="1"
                                onClick={this.setReminderOnclick}
                              >
                                Tomorrow 8:00 AM
                              </MenuItem>
                              <MenuItem
                                time="7"
                                onClick={this.setReminderOnclick}
                              >
                                Next Week 8:00 AM
                              </MenuItem>
                              <MenuItem onClick={this.clickPickDate}>
                                <WatchLaterIcon />
                                Pick date & time
                              </MenuItem>
                            </div>
                            <div
                              id="datePickBox"
                              style={{
                                display: this.state.displayDatePick,
                              }}
                            >
                              <Typography onClick={this.clickPickDate}>
                                <ArrowBackIcon />
                                Pick Date & Time
                              </Typography>
                              <TextField
                                id="date"
                                type="date"
                                onChange={this.handleChangeDate}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <TextField
                                id="standard-select-currency"
                                select
                                label="Time"
                                // value={this.state.time}
                                onChange={this.handleChangeTime}
                                helperText="Please select your time"
                              >
                                {this.timing.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <Button onClick={this.setReminderOnclick}>
                                Save
                              </Button>
                            </div>
                          </Menu>
                          <IconButton>
                            <PersonAddIcon />
                          </IconButton>
                             <ColorBox changeColor={this.onClickChanageColor}/>
                          <IconButton>
                            <AddPhotoAlternateIcon />
                          </IconButton>
                          <IconButton>
                            <ArchiveIcon onClick={this.onClickArchive} />
                          </IconButton>

                          <IconButton onClick={this.moreMenuHandler}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            style={{
                              top: "50px",
                            }}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                            anchorEl={this.state.MoreMenuAnchor}
                            keepMounted
                            open={this.state.MoreMenuOpen}
                            onClose={this.moreMenuHandler}
                          >
                            <AddLabelNote labelIdList={this.state.labelIdList} labelIdListChange={this.labelIdListChange}/>
                            <MenuItem>Add Drawing</MenuItem>
                            <MenuItem>Show checkboxes</MenuItem>
                          </Menu>
                        </div>
                        <div className="card_buttonsRight">
                          <Button onClick={this.addNote}>close</Button>
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </div>
                <div className="notes">
                  {this.state.allNotes.map((objNote) => {
                    if (!objNote.isDeleted && !objNote.isArchived) {
                      return (
                        <Note
                          key={objNote.id}
                          noteData={objNote}
                          noteRefresh={this.userNoteRefresh}
                      />
                      );
                    }
                  })}
                </div>
              </div>
            ) : this.state.containerRender === "archivenote" ? (
              <div className="notes">{arcObj}</div>
            ) : this.state.containerRender === "trashnote" ? (
              <div className="notes">{trashObj}</div>
            ) : this.state.containerRender === "reminder" ? (
              <div className="notes">{reminderObj}</div>
              // console.log(this.state.lables)
            ) : <div> </div> }
            
          </div>
        </div>
        <Backdrop style={{zIndex: 1}}  open={this.state.openBackDrop}>
              <CircularProgress color="inherit" />
            </Backdrop>
      </div>
      
    );
  }
}

export default withRouter(Dashboard);
