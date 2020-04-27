import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import QueAndAns from './queAndAns'
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
import ArchiveIcon from "@material-ui/icons/Archive";
import RefreshIcon from "@material-ui/icons/Refresh";
import DialpadIcon from "@material-ui/icons/Dialpad";
import userLogo from "../assets/svg/Avatar.svg";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Note from "./notes";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getUserNote } from "../services/noteServices";
import { setUserNote } from "../services/noteServices";
import { getNotesListByLabel } from "../services/noteServices";
import { uploadUserProfile } from "../services/userServices";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/Add";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ColorBox from './colorBox'
import LableSideBar from './lableSideBar'
import AddLabelNote from './addLabelNote'
import LabelIcon from '@material-ui/icons/Label';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CollaboratorNewNote from './collaboratorNewNote'
import ReminderNewNote from './reminderNewNote'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from './cart'

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
      MoreMenuAnchor: null,
      MoreMenuOpen: false,
      noteCardBackDisplay: "none",
      title: "",
      description: "",
      reminderMain: "",
      allNotes: [],
      allNotesTemp: [],
      reminderDisplay: "none",
      list: [],
      listMain: "",
      diplayCheckBox: "none",
      isArchive: false,
      noteColor:'',
      openBackDrop:'false',
      labelIdList:[],
      labelFilter:[],
      noteListView:true,
      searchNote:'',
      profileImage : JSON.parse(localStorage.getItem('userProfileImage')),
      snackbarOpen:false,
      snackbarMsg:'',
      snackbarMsgType:'',
      collaborators:[],
      userData:JSON.parse(localStorage.getItem('userDetails')),
      singleNoteData:[]
    }
    
  }
  componentWillMount = () => {
    this.userNoteRefresh();
  }
  containerRendering = (data,renderComponent) => {
    if(data){
      this.userNoteRefresh();
      this.setState({singleNoteData:data})
    }
    this.setState({containerRender:renderComponent})
  }
  displaySnackbar = (open,type,msg) => {
    this.setState({snackbarOpen:open,snackbarMsgType:type,snackbarMsg:msg})
  }

  addCollab = (collab) => {
    let matched = this.state.userData.email === collab.email?true:false
    this.state.collaborators.map(user => {
      matched = user.email === collab.email?true:matched
    })
    if(matched) {
      this.displaySnackbar(true,'info','Collaboratore already exist.')
      return
    }
    this.state.collaborators.push(collab)
    this.setState({ collaborators: this.state.collaborators});
  };
  removeCollab = (CID) => {
    let filterCollab = this.state.collaborators.filter(collab => {
      return collab.userId !==  CID
    })
    this.setState({collaborators:filterCollab})
  }

  onChangeSearchNote = e => {
    this.setState({searchNote:e.target.value})
    let filterSearch = [] 
     this.state.allNotesTemp.map((allnote) => {
      console.log(allnote.title,)
      if (!allnote.isDeleted && (allnote.title.startsWith(e.target.value) || allnote.description.startsWith(e.target.value))) {
        filterSearch.push(allnote)
      }
    });
    e.target.value ? filterSearch.length > 0 ? this.setState({allNotes:filterSearch}) :  this.setState({allNotes:filterSearch,snackbarOpen:true,snackbarMsgType:'error',snackbarMsg:'Note Not Available'})
    :  this.setState({allNotes:this.state.allNotesTemp})
  }

  onChangeProfile = (event) => {
      event.stopPropagation();
      event.preventDefault();

      let form_data = new FormData()
      form_data.append('file',event.target.files[0])
      uploadUserProfile(form_data).then(response => {
        this.setState({profileImage:response.data.status.imageUrl})
        localStorage.setItem('userProfileImage',response.data.status.imageUrl)
      })
  }
    
  containerRenderLable =async (label) => {
    this.setState({containerRender:label})
    let labelNote
    await getNotesListByLabel(label).then(response => labelNote=response.data.data.data)
    
    this.state.labelFilter = labelNote.map((allnote) => {
      if (!allnote.isDeleted) {
        return (
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh.bind(this)}
            displaySnackbar={this.displaySnackbar.bind(this)}
            containerRendering={this.containerRendering.bind(this)}
          />
        );
      }
    });
    this.setState({labelFilter:this.state.labelFilter})
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
  userNoteRefresh = async () => {
    // this.setState({openBackDrop:TextTrackCue})
    await getUserNote().then((response) => {
      if (response.data.data.data) {
        this.setState({openBackDrop:false})
        this.setState({ allNotes: response.data.data.data });
        this.setState({ allNotesTemp: response.data.data.data });
      }
    });
    console.log(this.state.allNotes)
  };
  handleClick = (event) => {
    this.setState({
      menuAnchor: event.currentTarget,
      menuOpen: !this.state.menuOpen
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
  moreMenuHandler = (event) => {
    this.setState({
      MoreMenuAnchor: event.currentTarget,
      MoreMenuOpen: !this.state.MoreMenuOpen,
    });
  };
  addNote = () => {
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
      form_data.append("collaberators", JSON.stringify(this.state.collaborators));

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
      this.setState({ collaborators: [] })
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
    this.setState({
      noteCardBackDisplay: this.state.noteCardBackDisplay === "" ? "none" : "",
    });
  };
  onTitleClickAway = () => {
    this.setState({
      noteCardBackDisplay: "none"
    });
  };
  onClickCheckList = () => {
    this.setState({ diplayCheckBox: this.state.diplayCheckBox ? "" : "none" });
  };
  reminderMainSet = (data) => {
    this.setState({reminderMain:data})
    this.setState({ reminderDisplay: "flex" });
  }
  
  
  reminderClose = () => {
    this.setState({ reminderDisplay: "none" });
    this.setState({ reminderMain: "" });
  };
  onChangeListMain = (event) => {
    if (event.key === "Enter") {
      let listData = { itemName: this.state.listMain, status: "open" };
      this.state.list.push(listData);
      this.setState({ listMain: "" });
      return
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
  changeNoteListView = () => {
    this.setState({noteListView:!this.state.noteListView})
  }
  snackbarClose = () =>  {
    this.setState({snackbarOpen:false})
  }
  render() {
    let arcObj = []
    this.state.allNotes.filter((allnote) => {
      if (!allnote.isDeleted && allnote.isArchived) {
        arcObj.push(<Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh.bind(this)}
            displaySnackbar={this.displaySnackbar.bind(this)}
            containerRendering={this.containerRendering.bind(this)}
            noteListView={this.state.noteListView}
          />)
      }
    });

    let trashObj = [] 
    this.state.allNotes.filter((allnote) => {
      if (allnote.isDeleted) {
        trashObj.push(
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh.bind(this)}
            displaySnackbar={this.displaySnackbar.bind(this)}
            containerRendering={this.containerRendering.bind(this)}
            noteListView={this.state.noteListView}
          />
        );
      }
    });
    let reminderObj = []
    this.state.allNotes.filter((allnote) => {
      if (allnote.reminder.length > 0 && !allnote.isDeleted) {
        reminderObj.push(
          <Note
            key={allnote.id}
            noteData={allnote}
            noteRefresh={this.userNoteRefresh.bind(this)}
            displaySnackbar={this.displaySnackbar.bind(this)}
            containerRendering={this.containerRendering.bind(this)}
            noteListView={this.state.noteListView}
          />
        );
      }
      
    });
    return (
      <div>
        <Snackbar open={this.state.snackbarOpen} autoHideDuration={3000} onClose={this.snackbarClose}>
          <Alert onClose={this.snackbarClose} severity= {this.state.snackbarMsgType}>
            {this.state.snackbarMsg}
          </Alert>
        </Snackbar>
        <div >
        <div className="headerbar">
          <div className="header_left">
            <IconButton onClick={this.sidebarActive}>
              <MenuIcon />
            </IconButton>
            {this.state.containerRender !== "createnote" ? (
              <div className="navigationSidebar">
                {this.state.containerRender}
              </div>
            ) : (
              <img src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" />
            )}
          </div>
          <div className={this.state.containerRender !== "queAndAns"?"searchBox":'hide'}>
            <Card id="searchbar">
              <Tooltip title="search">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <InputBase
                placeholder="Search"
                value={this.state.searchNote}
                onChange={this.onChangeSearchNote}
                fullWidth
              />
            </Card>
          </div>
          <div className={this.state.containerRender !== "queAndAns"?"buttonBundle1":'hide'}>
            <IconButton
              className="searchButton2"
              onClick={this.searchBarHandel}
            >
              <SearchIcon />
            </IconButton>
            <IconButton onClick={this.userNoteRefresh}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={e => this.containerRendering(null,'cart')}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton className="hideIcon" onClick={this.changeNoteListView}>
              {this.state.noteListView ? (
                <ViewModuleIcon />
              ) : (
                <ViewStreamIcon />
              )}
            </IconButton>
          </div>
          <div className="header_userProfile">
            <IconButton className="hideIcon">
              <DialpadIcon />
            </IconButton>
            <IconButton 
              size="small"
            >
              {this.state.profileImage ? (
                <img
                  src={
                    process.env.REACT_APP_DOMAIN_URL + this.state.profileImage
                  }
                  onClick={this.handleClick}
                  className="profile_logo"
                />
              ) : (
                <img
                  src={userLogo}
                  onClick={this.handleClick}
                  className="profile_logo"
                />
              )}
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
            onClose={this.handleClick}
          >
            <input
              id="myInput"
              type="file"
              ref={(ref) => (this.upload = ref)}
              style={{ display: "none" }}
              onChange={this.onChangeProfile.bind(this)}
            />
            <MenuItem
              onClick={() => {
                this.upload.click();
              }}
            >
              Profile
            </MenuItem>
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
            <LableSideBar containerRenderLable={this.containerRenderLable} />
            <Divider />
            <div
              className="sidebar_component"
              data="archive"
              onClick={this.changeMainContainer}
            >
              <ArchiveIcon />
              Archive
            </div>
            <div
              className="sidebar_component"
              data="trash"
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
                  <Card style={{ backgroundColor: this.state.noteColor }}>
                    <CardContent>
                      <Typography color="textSecondary">
                        <InputBase
                          className="fontStyle_main"
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
                        <AccessAlarmsIcon />
                        {this.state.reminderMain.substring(0, 11)}
                        <IconButton value="dfdf" onClick={this.reminderClose}>
                          <HighlightOffIcon />
                        </IconButton>
                      </div>
                      <div className="lableInNote">
                        {this.state.labelIdList.map((e, index) => {
                          return (
                            <div>
                              <div>{e.label}</div>
                              <IconButton size="small">
                                <HighlightOffIcon
                                  onClick={(e) => this.labelIdListRemove(index)}
                                />
                              </IconButton>
                            </div>
                          );
                        })}
                      </div>
                      <div className="collabAtNote">
                        {this.state.collaborators.map(collab => {
                          return(<div>{collab.firstName.charAt(0)}</div>)
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
                         
                         <ReminderNewNote reminderMainSet={this.reminderMainSet.bind(this)}
                                          reminderMain={this.state.reminderMain}
                         />

                           <CollaboratorNewNote data={{userData:this.state.userData,
                                                        collaborators:this.state.collaborators,
                                                        removeCollab:this.removeCollab.bind(this),
                                                        addCollab:this.addCollab.bind(this)
                            }}/>
                          <ColorBox changeColor={this.onClickChanageColor} />
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
                            <AddLabelNote
                              labelIdList={this.state.labelIdList}
                              labelIdListChange={this.labelIdListChange}
                            />
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

                <div className='notes_container'> 
                <div className="notes">
                  {this.state.allNotes.map((objNote) => {
                    if (!objNote.isDeleted && !objNote.isArchived) {
                      return (
                        <Note
                          key={objNote.id}
                          noteData={objNote}
                          noteRefresh={this.userNoteRefresh.bind(this)}
                          displaySnackbar={this.displaySnackbar.bind(this)}
                          containerRendering={this.containerRendering.bind(this)}
                          noteListView={this.state.noteListView}
                          style={{ width: "40%" }}
                        />
                      );
                    }
                  })}
                </div>
                </div>
              </div>
            ) : this.state.containerRender === "archive" ? (
              arcObj.length > 0 ? (
                <div className="notes">{arcObj}</div>
              ) : (
                <div className="emptySidebarMsgContainer">
                  <div className="emptySidebarMsg">
                    <ArchiveIcon />
                    <div>Your archived notes appear here</div>
                  </div>
                </div>
              )
            ) : this.state.containerRender === "trash" ? (
              trashObj.length > 0 ? (
                <div className="notes">{trashObj}</div>
              ) : (
                <div className="emptySidebarMsgContainer">
                  <div className="emptySidebarMsgContainer">
                    <DeleteSweepIcon />
                    <div>No notes in Trash</div>
                  </div>
                </div>
              )
            ) : this.state.containerRender === "cart" ? (
                <Cart displaySnackbar={this.displaySnackbar.bind(this)}/>
            ) : this.state.containerRender === "queAndAns" ? (
                <div><QueAndAns noteData={this.state.singleNoteData} 
                                                  containerRendering={this.containerRendering.bind(this)}
                                                  userNoteRefresh={this.userNoteRefresh.bind(this)}
                                        />
                                        {/* <QueAndAns noteData={this.state.noteData} queAns={{onClickQueAns:this.onClickQueAns.bind(this),askedQuesion:this.state.askedQuesion}}/> */}

                </div>
              )  : this.state.containerRender === "reminder" ? (
              reminderObj.length > 0 ? (
                <div className="notes">{reminderObj}</div>
              ) : (
                <div className="emptySidebarMsgContainer">
                  <div className="emptySidebarMsg">
                    <NotificationsNoneIcon />
                    <div>Notes with upcoming reminders appear here</div>
                  </div>
                </div>
              )
            ) : this.state.labelFilter.length > 0 ? (
              <div className="notes">{this.state.labelFilter}</div>
            ) : (
              <div className="emptySidebarMsgContainer">
                <div className="emptySidebarMsg">
                  <LabelIcon />
                  <div>No notes with this label yet</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Backdrop style={{ zIndex: 1 }} open={this.state.openBackDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      </div>
    );
  }
}
export default Dashboard;
