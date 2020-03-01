/** @jsx jsx*/
import {css as cssEmotion, jsx} from "@emotion/core";
import React from 'react';
import LikeIcon from "assets/like.png";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "components/Typography";
import Container from "components/Container";

const cssBox = cssEmotion`
width: 30px;
background: #ffffff;
border-radius: 10px;
box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
color: #8d949e;
font-size: 11px;
padding: 2px 4px;
cursor: pointer;
`;

const cssReactionIcon = cssEmotion`
 width: 14px;
 height: 14px;
`;

function CommentReaction({reaction}) {
    if (reaction) {
        if (reaction.length === 0) return null;
        return (
            <Container css={cssBox}>
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
                    <div css={cssEmotion`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    `}>
                        <img src={LikeIcon}
                             alt="like"
                             css={[cssReactionIcon, cssEmotion`margin-right: 3px;`]}/>
                        <span>{reaction.length}</span>
                    </div>
                </Tooltip>

            </Container>
        )
    } else return null;
}

export default CommentReaction;