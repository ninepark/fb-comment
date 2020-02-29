/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React from 'react';
import {connect} from "react-redux";
import {commentCreator} from "../reducers/comment";

import Grid from "@material-ui/core/Grid";
import Container from "components/Container";
import Typography from "components/Typography";
import CommentRow from "./CommentRow";
import CommentInput from "./CommentInput";

function CommentList({comments, deleteComment}) {
    console.log(comments);

    let commentKey = Object.keys(comments).filter(k => comments[k].parentNo === null);
    let sortedComment = [];
    for (let k of commentKey) {
        let arr = [];
        arr.push(comments[k]);
        arr = arr.concat(Object.values(comments).filter(v => v.parentNo === k).sort((a, b) => {
            return a.time > b.time ? 1 : -1
        }));
        sortedComment.push(arr);
    }

    // const commentClicked = (no) => {
    //     console.log('clicked no', no);
    // };

    return (
        <Container>
            <Grid container
                  css={css`padding: 10px;`}>
                <Typography hyperlink>
                    댓글 38개 더 보기
                </Typography>
            </Grid>

            <Container css={css`padding: 10px; padding-bottom: 0;`}>
                {
                    sortedComment.map((parComment, i) => {
                        const parentNo = parComment[0].no;
                        let mainCom = parComment.map(com => {
                            return (
                                <CommentRow key={com.no}
                                            no={com.no}
                                            type={com.parentNo === null ? "comment" : "reply"}
                                            name={com.name}
                                            content={com.contents}
                                            postedTime={com.time}
                                            parentNo={parentNo}
                                            // commentClicked={commentClicked}
                                />
                            )
                        });
                        mainCom.push(
                            <CommentInput key={`parComInput${i}`}
                                          type={"reply"}
                                          parentNo={parentNo}/>
                        );
                        return mainCom
                    })
                }
            </Container>
            <Container css={css`padding: 10px; padding-top: 0;`}>
                <CommentInput type={"comment"} />
            </Container>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        'comments': state.comments,
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
