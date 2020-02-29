/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React from 'react';
import PropTypes from "prop-types";
import LikeIcon from "assets/like.png";
import Typography from "components/Typography";
import Tooltip from "@material-ui/core/Tooltip";

function ReactionCount({reactionList, clicked}) {
    const likeNames = reactionList.like;
    const reactionName = Object.values(reactionList).reduce((pv, cv) => {
        return pv.concat(cv);
    }, []);
    const reactionCount = Object.values(reactionList).reduce((pv, cv) => {
        return pv + cv.length
    }, 0);

    return (
        <>
            <Tooltip title={
                likeNames.map((v, i) => {
                    return (
                        <Typography key={i}
                                    textType="tooltip"
                                    component={"p"}>
                            {v}
                        </Typography>
                    )
                })
            } arrow>
                <img src={LikeIcon}
                     alt="likes icon"
                     css={css`
                     width: 20px;
                     margin-right: 3px;
                    `}/>
            </Tooltip>
            <Tooltip title={
                reactionName.map((v, i) => {
                    return (
                        <Typography key={i}
                                    textType="tooltip"
                                    component={"p"}>
                            {v}
                        </Typography>
                    )
                })
            } arrow>
                <div>
                    <Typography textType={"count"}
                                hyperlink>
                        {clicked ? `회원님, 외 ${reactionCount}명` : reactionCount}
                    </Typography>
                </div>
            </Tooltip>
        </>
    )
}

ReactionCount.propTypes = {
    reactionList: PropTypes.object
};

export default ReactionCount;