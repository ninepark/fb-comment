/** @jsx jsx*/
import {css as cssEmotion, jsx} from "@emotion/core";
import React from 'react';
import LikeIcon from "assets/like.png";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "components/Typography";

const cssBox = cssEmotion`
width: 30px;
background: #ffffff;
border-radius: 10px;
box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
color: #8d949e;
font-size: 11px;
padding: 2px 4px;
`;

const cssReactionIcon = cssEmotion`
 width: 14px;
 height: 14px;
`;

function CommentReaction({reaction}) {
    if (reaction) {
        if (reaction.length === 0) return null;
        return (
            <Grid container
                  css={cssBox}>
                <Tooltip title={
                    reaction.map((v, i) => {
                        return (
                            <Typography key={i}
                                        textType="tooltip"
                                        component={"p"}>
                                {v}
                            </Typography>
                        )
                    })
                } arrow>
                    <Grid container
                          alignItems="center">
                        <img src={LikeIcon}
                             alt="like"
                             css={[cssReactionIcon, cssEmotion`margin-right: 3px;`]}
                        />
                        {reaction.length}
                    </Grid>
                </Tooltip>

            </Grid>
        )
    } else return null;
}

export default CommentReaction;