/** @jsx jsx*/
import {css, jsx} from "@emotion/core";
import React from 'react';
import PropTypes from "prop-types";
import Avatar from "components/Avatar";
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import {commentCreator} from "../reducers/comment";

import lightFormat from 'date-fns/lightFormat'


function CommentInput({type, parentNo=null, editNo=null, oldValue = '', editDone, inputClear, addComment, updateComment}) {
    const edit = oldValue !== '' ? true : false;

    const enterPress = (e) => {
        if (e.key === 'Enter') {
            if (!edit) {
                addCom(e.target.value, parentNo);
                inputClear(parentNo);
            }
            else {
                updateCom(editNo, e.target.value);
                editDone();
            }
            e.target.value = '';
        }
    };

    const addCom = (contents, parent) => {
        const time = lightFormat(new Date(), 'yyyy/MM/dd/HH:mm:ss');
        addComment(contents, time, parent);
    };

    const updateCom = (no, content) => {
        updateComment(no, content);
    };

    const placeholder = type === "comment" ? "댓글을 입력하세요..." : "댓글 달기";
    return (
        <Grid container
              alignItems="center"
              css={css`padding-bottom: 15px;`}>
            {
                type === "reply"
                    ? <Grid item xs={1}></Grid>
                    : null
            }
            <Grid item container xs={1} justify="flex-end">
                <Avatar type={type}/>
            </Grid>
            <Grid item xs={type === "comment" ? 11 : 10}>
                <Grid container
                      direction="column"
                      wrap="nowrap">
                        <input type="text"
                               autoFocus
                               placeholder={placeholder}
                               onKeyPress={e => enterPress(e)}
                               defaultValue={oldValue}
                               css={css`
                        width: 100%;
                        background-color: #f2f3f5;
                        border: 1px solid #ccd0d5;
                        border-radius: 16px;
                        font-size: 14px;
                        padding: 5px 10px;
                        `}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

CommentInput.propTypes = {
    type: PropTypes.string.isRequired,
};

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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
