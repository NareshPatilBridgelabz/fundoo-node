import React, { Component } from 'react'
import { Drawer, Divider, IconButton, MuiThemeProvider, CssBaseline, createMuiTheme, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotesIcon from '@material-ui/icons/Notes';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import userServices from "../services/userServices"
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                width: "240px",
            }
        },
        MuiListItem: {
            root: {
                borderTopRightRadius: "70px",
                borderBottomRightRadius: "70px"
            }
        }
    }
}
)
class Drawers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgcolorN: '#FFA500',
            bgcolorR: '',
            bgcolorL: '',
            bgcolorE: '',
            bgcolorA: '',
            bgcolorB: '',
            nameChange: "Notes",
            labelNotes: [],
            prevLabel: '',
            change:false
        }
    }
    componentDidMount() {
        this.labelNote();
    }
    labelNote = () => {
        // let result = userServices.getNote();
        // result.then((res) => {
        //     this.setState({
        //         labelNotes: res
        //     })
        // })
    }

    render() {
        var a = this.state.labelId ? "labelColor" : "labelColor2"
        let labelColor = {
            backgroundColor: "red"
        }
        let labelColor2 = {
            backgroundColor: "blue"
        }
        let arrData = [];
        this.props.label.forEach(element => {
            if (element !== "") {
                arrData.push(element)
            }
        });
        let filterArr = arrData.filter((index, data) => {
            return arrData.indexOf(index) === data
        })
        let labelObj = filterArr.map((arrNotes, index) => {
            return (
                <div
                    className="noteIcon_decor">
                    <ListItem
                        key={index}
                        button
                        onClick={
                            async (event) => {
                                event.currentTarget.style.backgroundColor = "#FFA500"
                                await this.setState({
                                    bgcolorN: '',
                                    bgcolorR: '',
                                    bgcolorL: '',
                                    bgcolorE: '',
                                    bgcolorA: '',
                                    bgcolorB: '',
                                    nameChange: arrNotes,
                                })
                                this.props.panel(this.state.nameChange)
                            }
                        }
                        style={{
                            backgroundColor: "white"
                        }
                        }>
                        <ListItemIcon>
                            <LabelOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={arrNotes} />
                    </ListItem>

                </div>
            )
        })
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Drawer
                    class="drawer_decor"
                    variant="persistent"
                    anchor="left"
                    open={this.props.change}
                    onClose={this.props.value}
                >
                    <div className="drawer_head">
                        <div className="name_decor">
                            <span>{this.state.nameChange}</span>
                        </div>
                        <div className="arrow_decor">
                            <IconButton
                                onClick={this.props.value}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <List>
                            <ListItem
                                button
                                onClick={async () => {
                                    await this.setState({
                                        bgcolorN: '#FFA500',
                                        bgcolorR: '',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '',
                                        bgcolorB: '',
                                        nameChange: "Notes"
                                    })
                                    this.props.panel(this.state.nameChange)
                                }}
                                style={{
                                    backgroundColor: this.state.bgcolorN
                                }}
                            >
                                <div className="noteIcon_decor">
                                    <ListItemIcon>
                                        <NotesIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <span className="listItemName_decor">Notes</span>
                                    </ListItemText>
                                </div>
                            </ListItem>
                            <ListItem
                                button
                                onClick={async () => {
                                    await this.setState({
                                        bgcolorN: '',
                                        bgcolorR: '#FFA500',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '',
                                        bgcolorB: '',
                                        nameChange: "Remainder"
                                    })
                                    this.props.panel(this.state.nameChange)
                                }}
                                style={{
                                    backgroundColor: this.state.bgcolorR
                                }}
                            >
                                <div className="noteIcon_decor">
                                    <ListItemIcon>
                                        <NotificationsNoneOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <span className="listItemName_decor">Remainder</span>
                                    </ListItemText>
                                </div>
                            </ListItem>
                            <Divider />
                            <label className="label_decor">Label</label>
                            <div>
                                {labelObj}
                                <ListItem
                                    button
                                    onClick={async () => {
                                        await this.setState({
                                            bgcolorN: '',
                                            bgcolorR: '',
                                            bgcolorL: '',
                                            bgcolorE: '#FFA500',
                                            bgcolorA: '',
                                            bgcolorB: '',
                                            nameChange: "Edit Label"
                                        })
                                        this.props.panel(this.state.nameChange)
                                    }}
                                    style={{
                                        backgroundColor: this.state.bgcolorE
                                    }}
                                >
                                    <div className="noteIcon_decor">
                                        <ListItemIcon>
                                            <EditOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <span className="listItemName_decor">Edit Label</span>
                                        </ListItemText>
                                    </div>

                                </ListItem>
                            </div>
                            <Divider />
                            <ListItem
                                button
                                onClick={async () => {
                                    await this.setState({
                                        bgcolorN: '',
                                        bgcolorR: '',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '#FFA500',
                                        bgcolorB: '',
                                        nameChange: "Archive"
                                    })
                                    this.props.panel(this.state.nameChange)
                                }}
                                style={{
                                    backgroundColor: this.state.bgcolorA
                                }}
                            >
                                <div className="noteIcon_decor">
                                    <ListItemIcon>
                                        <ArchiveOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText >
                                        <span className="listItemName_decor">Archive</span>
                                    </ListItemText>
                                </div>
                            </ListItem>
                            <ListItem
                                button
                                onClick={async () => {
                                    await this.setState({
                                        bgcolorN: '',
                                        bgcolorR: '',
                                        bgcolorL: '',
                                        bgcolorE: '',
                                        bgcolorA: '',
                                        bgcolorB: '#FFA500',
                                        nameChange: "Bin"
                                    })
                                    this.props.panel(this.state.nameChange)
                                }}
                                style={{
                                    backgroundColor: this.state.bgcolorB
                                }}
                            >
                                <div className="noteIcon_decor">
                                    <ListItemIcon>
                                        <DeleteForeverIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <span className="listItemName_decor">Bin</span>
                                    </ListItemText>
                                </div>

                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </MuiThemeProvider>
        )
    }
}
export default Drawers