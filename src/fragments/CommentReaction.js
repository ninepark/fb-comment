/** @jsx jsx*/
import {css as cssEmotion, css, jsx} from "@emotion/core";
import React from 'react';
import LikeIcon from "assets/like.png";
import Grid from "@material-ui/core/Grid";

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
 width: 16px;
 height: 16px;
`;

function CommentReaction({ reaction }) {
    if (reaction) {
        return (
            <Grid container
                  alignItems="center"
                  css={cssBox}>

                <img src={LikeIcon}
                     alt="like"
                     css={[cssReactionIcon, cssEmotion`margin-right: 3px;`]}
                />
                {2}
            </Grid>
        )
    } else return null;
}

export default CommentReaction;