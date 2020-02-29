/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React from 'react';
import {connect} from 'react-redux';
import {reactionCreator} from "../reducers/reaction";

import Container from "components/Container";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "components/Typography";

import ReactionCount from "./ReactionCount";
import CommentList from "./CommentList";

import ThumbUpIcon from "assets/thumbup.svg";
import CommentIcon from "assets/comment.svg";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reactionClicked: false,
            commentListOpend: true,
        };
    }

    componentDidMount() {
        const reactions = this.props.reactions;
        for (let i in reactions) {
            if (reactions[i].some((v) => { return v === "Hojeong Choi" })) {
                this.setState({reactionClicked: true});
                break;
            }
        }
    }

    reactionClick = () => {
        const {addReaction, cancelReaction} = this.props;
        const reactionClicked = this.state.reactionClicked;
        if (!reactionClicked) {
            addReaction('like');
        } else {
            cancelReaction('like');
        }
        this.setState({reactionClicked: !reactionClicked})
    };

    commentClick = () => {
        const commentListOpend = this.state.commentListOpend;
        this.setState({commentListOpend: !commentListOpend})
    };


    render() {
        const { reactions, comments } = this.props;
        const { reactionClicked, commentListOpend } = this.state;

        const commentCount = Object.keys(comments).length;
        const commentName = Object.values(comments).reduce((pv, cv) => {
            return pv.concat(cv.name);
        }, []);

        return <>
            <Container css={css`
                padding: 10px;
            `}>
                <Grid container
                      direction="row"
                      alignItems="center"
                      justify="space-between">
                    <Grid item>
                        <Grid container alignItems="center">
                            <ReactionCount reactionList={reactions}
                                           clicked={reactionClicked}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center">
                            <Tooltip title={
                                commentName.map((v, i) => {
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
                                    <Typography
                                        textType={"count"}
                                        css={css`
                                            cursor: pointer;
                                        `}
                                        onClick={this.commentClick}
                                    >댓글 {commentCount}개</Typography>
                                </div>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Container css={css`
                padding: 0 10px;
            `}>
                <Grid container
                      css={css`
                          border-top: 1px solid rgba(0, 0, 0, 0.12);
                          padding: 5px 0;
                      `}>
                    <Grid item xs={6}>
                        <Button fullWidth
                                onClick={this.reactionClick}>
                            <img src={ThumbUpIcon}
                                 alt="thumbup icon"
                                 css={css`
                                     width: 18px;
                                     margin-right: 5px;
                                    `}/>
                            <Typography
                                textType={"likesComment"}
                                css={reactionClicked && css`
                                color: #385898;
                                font-weight: 800;
                                `}
                            >좋아요</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth
                                onClick={() => {
                                    this.setState({commentListOpend: true});
                                }}>
                            <img src={CommentIcon}
                                 alt="comments icon"
                                 css={css`
                                     width: 16px;
                                     margin-top: 3px;
                                     margin-right: 5px;
                                    `}/>
                            <Typography
                                textType={"likesComment"}
                            >댓글</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Divider/>
            {
                commentListOpend &&
                <CommentList />
            }
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        'reactions': state.reactions,
        'comments': state.comments,
    }
};

const mapDispatchToProps = (dispatch) => ({
    addReaction: (kind, name) => {
        dispatch(reactionCreator.addReaction(kind, name));
    },
    cancelReaction: (kind, name) => {
        dispatch(reactionCreator.cancelReaction(kind, name));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
