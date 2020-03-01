/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React, {useState} from 'react';
import {connect} from "react-redux";

import Container from "components/Container";
import CommentRow from "./CommentRow";
import CommentInput from "./CommentInput";
import CommentRowButtons from "./CommentRowButtons";

function CommentList({comments}) {
    const [addReplyObj, setAddReplyObj] = useState({});

    const commentKey = Object.keys(comments).filter(k => comments[k].parentNo === null);
    let sortedComment = [];
    for (let k of commentKey) {
        let arr = [];
        arr.push(comments[k]);
        arr = arr.concat(Object.values(comments).filter(v => v.parentNo === k).sort((a, b) => {
            return a.time > b.time ? 1 : -1
        }));
        sortedComment.push(arr);
    }

    const showReplyInput = (no, parentNo) => {
        let obj = {...addReplyObj};
        if (!parentNo) obj[no] = no;
        else obj[parentNo] = no;
        setAddReplyObj(obj);
    };

    const removeReply = (parentNo) => {
        let obj = {...addReplyObj};
        delete obj[parentNo];
        setAddReplyObj(obj);
    };

    const renderComment = (commentArr, parentNo) => {
        let result = commentArr.map(com => {
            return (<React.Fragment key={`com${com.no}`}>
                    <CommentRow key={`row-${com.no}`}
                                no={com.no}
                                type={com.parentNo === null ? "comment" : "reply"}
                                name={com.name}
                                replyNo={com.replyNo}
                                contents={com.contents}
                                reaction={com.reaction}/>
                    <CommentRowButtons key={`btn-${com.no}`}
                                       no={com.no}
                                       type={com.parentNo === null ? "comment" : "reply"}
                                       postedTime={com.time}
                                       addReplyBtn={showReplyInput}/>
                </React.Fragment>
            )
        });
        let idx = Object.keys(addReplyObj).indexOf(parentNo.toString());
        if (idx !== -1) {
            result.push(
                    <CommentInput key={`parComInput-${parentNo}`}
                                  type={"reply"}
                                  parentNo={parentNo}
                                  replyNo={addReplyObj[parentNo]}
                                  inputClear={removeReply}/>
                )
        }

        return result
    };

    return (
        <Container>
            <Container css={css`padding: 20px 10px; padding-bottom: 0;`}>
                {
                    sortedComment.map((parComment, i) => {
                        const parentNo = parComment[0].no;
                        return renderComment(parComment, parentNo);
                    })
                }
            </Container>
            <Container css={css`padding: 0 10px;`}>
                <CommentInput type={"comment"}
                              inputClear={removeReply}/>
            </Container>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        'comments': state.comments,
    }
};

export default connect(mapStateToProps)(CommentList);
