/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React, {useState} from 'react';
import PropTypes from "prop-types";
import Avatar from "../components/Avatar";
import Typography from "../components/Typography";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import LikeIcon from "assets/like.png";
import {
    differenceInSeconds,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInWeeks
} from 'date-fns'
import {connect} from "react-redux";
import {commentCreator} from "../reducers/comment";
import CommentInput from "./CommentInput";


function CommentRow({ no, type, name, content, postedTime, parentNo, deleteComment }) {
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

    const now = new Date();
    let timeDiff = '';
    const timeDiffText = ["주", "일", "시간", "분", "초"];
    [differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds].some((f, i) => {
        timeDiff = `${Math.abs(f(new Date(postedTime), now))}${timeDiffText[i]}`;
        return f(new Date(postedTime), now) !== 0;
    });

    if (comState === "show") {
        return (
            <Grid container
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                  css={css`padding-bottom: 10px;`}
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
                          wrap="nowrap"
                          css={css`
                          background-color: #f2f3f5;
                          border-radius: 18px;
                          padding: 8px 10px;
                          `}>
                        <Grid item>
                            <Typography
                                component={"a"}
                                textType={'userName'}
                                hyperlink
                                css={css`
                                padding-right: 3px;
                                `}>{name}</Typography>
                            <Typography
                                textType={'contents'}
                                css={css`
                                word-wrap: break-word;
                            `}>{content}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container
                          direction="row"
                          justify="space-between"
                          css={css`
                          padding-top: 2px;
                          margin-left: 10px;
                          `}>
                        <Grid item>
                            <Typography
                                component={"a"}
                                hyperlink
                                css={css`
                                    padding-right: 3px;
                                    `}>좋아요</Typography>
                            <span>・</span>
                            <Typography
                                component={"a"}
                                hyperlink
                                css={css`
                                    padding: 0 3px;
                                    `}>답글 달기</Typography>
                            <span>・</span>
                            <Tooltip
                                title={<Typography textType="tooltip" component={"p"}>
                                    {postedTime}
                                </Typography>}
                                arrow
                                css={css`display: inline-block;`}>
                                <div>
                                    <Typography hyperlink
                                                textType={'postedTime'}>
                                        {timeDiff}
                                    </Typography>
                                </div>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Grid container
                                  alignItems="center"
                                  css={css`
                                    width: 30px;
                                    background: #ffffff;
                                    border-radius: 10px;
                                    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
                                    color: #8d949e;
                                    font-size: 11px;
                                    padding: 2px 4px;
                                  `}>
                                <img src={LikeIcon}
                                     alt="like"
                                     css={css`
                                     width: 16px;
                                     height: 16px;
                                     margin-right: 3px;
                                     `}
                                />
                                {2}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {isShown && (
                    <>
                        <Grid item xs={1} container
                              alignItems='center'
                              css={css`
                              padding-bottom: 20px;
                              padding-left: 5px;
                              `}>
                            <Tooltip title={
                                <Typography textType="tooltip" component={"p"}>
                                    숨기기 또는 신고
                                </Typography>
                            }
                                     arrow
                                     css={css`display: inline-block;`}>
                                <div onClick={e => menuOpen(e)}>

                                    <MoreHorizIcon
                                        css={css`
                                        color: gray;
                                        cursor: pointer;
                                        `}/>
                                </div>
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
    postedTime: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (contents, time, parentNo, name) => {
        dispatch(commentCreator.addComment(contents, time, parentNo, name));
    },
    updateComment: (no, contents) => {
        dispatch(commentCreator.updateComment(no, contents));
    },
    deleteComment: (no) => {
        dispatch(commentCreator.deleteComment(no));
    }
});

export default connect(null, mapDispatchToProps)(CommentRow);
