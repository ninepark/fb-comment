/** @jsx jsx */
import {css as cssEmotion, jsx} from "@emotion/core";
import React from 'react';
import PropTypes from "prop-types";
import Typography from "../components/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    differenceInWeeks
} from "date-fns";
import {commentCreator} from "../reducers/comment";
import {connect} from "react-redux";


function CommentRowButtons({no, type, postedTime, comments, addReplyBtn, reactComment}) {
    const {parentNo, reaction, updated} = comments[parseInt(no)];

    let parsedTime = postedTime.split("/").slice(0, 3).join("-");
    parsedTime = parsedTime + "T" + postedTime.split("/")[3];
    const now = new Date();
    let timeDiff = '';
    const timeDiffText = ["주", "일", "시간", "분", "초"];
    [differenceInWeeks, differenceInDays, differenceInHours,
        differenceInMinutes, differenceInSeconds].some((f, i) => {
        timeDiff = `${Math.abs(f(new Date(parsedTime), now))}${timeDiffText[i]}`;
        return f(new Date(parsedTime), now) !== 0;
    });

    let oriPostTime = new Date(parsedTime);
    oriPostTime = oriPostTime.toDateString() + " " + oriPostTime.toTimeString().slice(0, 8);

    const clickReplyBtn = () => {
        addReplyBtn(no, parentNo);
    };

    const clickReactBtn = () => {
        reactComment(no);
    };

    return (
        <Grid container
              css={cssEmotion`padding-bottom: 5px;`}>
            {
                type === "reply"
                    ? <Grid item xs={1}></Grid>
                    : null
            }
            <Grid item
                  xs={type === "comment" ? 9 : 8}
                  css={type === "comment" ? cssEmotion`padding-left: 37px;` : cssEmotion`padding-left: 32px;`}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      css={cssEmotion`margin-left: 10px;`}>
                    <Grid item>
                        {
                            reaction &&
                            reaction.includes("Hojeong Choi")
                                ?
                                <Typography
                                    component={"a"}
                                    hyperlink
                                    onClick={clickReactBtn}
                                    css={cssEmotion`
                                    font-weight: 600;
                                    padding-right: 2px;
                                    `}>좋아요 취소</Typography>
                                :
                                <Typography
                                    component={"a"}
                                    hyperlink
                                    onClick={clickReactBtn}
                                    css={cssEmotion`padding-right: 2px;`}>좋아요</Typography>
                        }
                        <span>・</span>
                        <Typography
                            component={"a"}
                            hyperlink
                            onClick={clickReplyBtn}
                            css={cssEmotion`padding: 0 2px;`}>답글 달기</Typography>
                        <span>・</span>
                        <Tooltip arrow
                                 title={
                                     <Typography textType="tooltip" component={"p"}>
                                         {oriPostTime}
                                     </Typography>
                                 }

                                 css={cssEmotion`display: inline-block;`}>
                            <div css={cssEmotion`padding-left: 2px;`}>
                                <Typography hyperlink
                                            textType={'postedTime'}>
                                    {timeDiff}
                                </Typography>
                            </div>
                        </Tooltip>
                        {
                            updated && (
                                <>
                                    <span>・</span>
                                    <Typography css={cssEmotion`padding: 0 2px;`}>수정됨</Typography>
                                </>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

CommentRowButtons.propTypes = {
    no: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    postedTime: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        'comments': state.comments,
    }
};

const mapDispatchToProps = (dispatch) => ({
    reactComment: (no) => {
        dispatch(commentCreator.reactComment(no));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentRowButtons);
