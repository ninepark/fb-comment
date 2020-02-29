/** @jsx jsx */
import {css as cssEmotion, jsx} from "@emotion/core";
import React, {useState} from 'react';
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
import CommentReaction from "./CommentReaction";


function CommentRowButtons({ no, type, postedTime, updated, reaction, parentNo, addReplyBtn }) {
    const now = new Date();
    let timeDiff = '';
    const timeDiffText = ["주", "일", "시간", "분", "초"];
    [differenceInWeeks, differenceInDays, differenceInHours,
        differenceInMinutes, differenceInSeconds].some((f, i) => {
        timeDiff = `${Math.abs(f(new Date(postedTime), now))}${timeDiffText[i]}`;
        return f(new Date(postedTime), now) !== 0;
    });

    let oriPostTime = new Date(postedTime);
    oriPostTime = oriPostTime.toDateString() + " " + oriPostTime.toTimeString().slice(0, 8);

    const clickReplyBtn = () => {
        let commentNo = parentNo || no;
        addReplyBtn(commentNo);
    };

    return (
        <Grid container
              css={cssEmotion`padding-bottom: 5px;`}>
            <Grid item xs={type === "comment" ? 1 : 2}></Grid>
            <Grid item xs={type === "comment" ? 9 : 8}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      css={cssEmotion`margin-left: 10px;`}>
                    <Grid item>
                        <Typography
                            component={"a"}
                            hyperlink
                            // onClick={}
                            css={cssEmotion`padding-right: 2px;`}>좋아요</Typography>
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
                    <Grid item>
                        <CommentReaction reaction={reaction}/>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

CommentRowButtons.propTypes = {
    type: PropTypes.string.isRequired,
    postedTime: PropTypes.string.isRequired,
};

export default CommentRowButtons;