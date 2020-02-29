/** @jsx jsx */
import {css as cssEmotion, jsx} from "@emotion/core";
import React, {useState} from 'react';
import PropTypes from "prop-types";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';

import {connect} from "react-redux";
import {commentCreator} from "../reducers/comment";
import CommentInput from "./CommentInput";

const cssCommentBox = cssEmotion`
 background-color: #f2f3f5;
 border-radius: 18px;
 word-wrap: break-word;
 padding: 8px 10px; 
 `;

function CommentRow({no, type, name, content, deleteComment}) {
    const [isShown, setIsShown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [comState, setComState] = useState("show");

    const menuOpen = e => {
        if (!Boolean(anchorEl)) setAnchorEl(e.currentTarget);
        else setAnchorEl(null);
    };

    const deleteClick = () => {
        deleteComment(no);
        setAnchorEl(null);
    };

    const updateClick = () => {
        setComState("edit");
        setAnchorEl(null);
    };

    const changeComState = () => {
        setComState("show");
    };

    if (comState === "show") {
        return (
            <Grid container
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                  css={cssEmotion`padding-bottom: 3px;`}
            >
                {
                    type === "reply"
                        ? <Grid item xs={1}></Grid>
                        : null
                }
                <Grid item container xs={1} justify="flex-end">
                    <Avatar type={type}/>
                </Grid>
                <Grid item xs={type === "comment" ? 9 : 8}>
                    <Grid container
                          direction="column"
                          wrap="nowrap">
                        <Grid item>
                            <div css={cssCommentBox}>
                                <Typography
                                    component={"a"}
                                    textType={'userName'}
                                    hyperlink
                                    css={cssEmotion`padding-right: 3px;`}>{name}</Typography>
                                <Typography
                                    textType={'contents'}>{content}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {isShown && (
                    <>
                        <Grid item xs={1} container
                              alignItems='center'
                              css={cssEmotion`
                              padding-left: 5px;
                              `}>
                            <Tooltip title={
                                <Typography textType="tooltip" component={"p"}>
                                    숨기기 또는 신고
                                </Typography>
                            }
                                     arrow
                                     css={cssEmotion`display: inline-block;`}>
                                <MoreHorizIcon onClick={e => menuOpen(e)}
                                               css={cssEmotion`color: gray; ursor: pointer;`}/>
                            </Tooltip>
                        </Grid>
                        <Menu anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={menuOpen}>
                            <MenuItem onClick={updateClick}>수정</MenuItem>
                            <MenuItem onClick={deleteClick}>삭제</MenuItem>
                        </Menu>
                    </>
                )}
            </Grid>
        )
    } else if (comState === "edit") {
        return <CommentInput type={type}
                             editNo={no}
                             oldValue={content}
                             editDone={changeComState}
        />
    }
}

CommentRow.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    deleteComment: (no) => {
        dispatch(commentCreator.deleteComment(no));
    }
});

export default connect(null, mapDispatchToProps)(CommentRow);
