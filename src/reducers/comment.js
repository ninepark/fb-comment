/** reaction */
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const REACT_COMMENT = "REACT_COMMENT";
// export const UNDO_REACT_COMMENT = "UNDO_REACT_COMMENT";

/** action creators */
const addComment = (contents, time, parentNo = null, replyNo=null, name = "Hojeong Choi") => {
    return {type: ADD_COMMENT, contents, time, name, parentNo, replyNo};
};

const updateComment = (no, contents) => {
    return {type: UPDATE_COMMENT, no, contents};
};

const deleteComment = (no) => {
    return {type: DELETE_COMMENT, no};
};

const reactComment = (no) => {
    return {type: REACT_COMMENT, no};
};

export const commentCreator = {
    addComment,
    updateComment,
    deleteComment,
    reactComment,
};

/** reducer */
export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            const newNo = Math.max.apply(Math, Object.keys(state)) + 1;
            state[newNo] = {
                no: newNo.toString(),
                name: action.name,
                contents: action.contents,
                time: action.time,
                parentNo: action.parentNo,
                replyNo: action.replyNo,
                reaction: null,
                updated: false
            };
            return {
                ...state
            };

        case UPDATE_COMMENT:
            state[action.no] = {
                ...state[action.no],
                contents: action.contents,
                updated: true
            };
            return {
                ...state
            };

        case DELETE_COMMENT:
            const reply = Object.keys(state).filter(k => { return state[k].parentNo === action.no.toString()});
            reply.forEach((k => { delete state[parseInt(k)]; }));
            delete state[parseInt(action.no)];
            return {
                ...state
            };

        case REACT_COMMENT:
            const reactionArr = state[action.no].reaction;
            if (!reactionArr) {
                state[action.no].reaction = ["Hojeong Choi"];
            } else {
                let idx = reactionArr.indexOf("Hojeong Choi");
                idx === -1 ? reactionArr.push("Hojeong Choi") : reactionArr.splice(idx, 1);
            }

            return {
                ...state
            };

        default:
            return state;
    }
}

const initialState = {
    1: {
        no: "1",
        name: "최와우",
        contents: "소설 속 배경 '우한'과 '바이러스'라는 점에서 선각자의 예언서라는 의심을 받기 충분",
        time: "2020/02/26/00:00:00",
        parentNo: null,
        replyNo: null,
        reaction: null,
        updated: false
    },
    2: {
        no: "2",
        name: "김하하",
        contents: "비슷한 책: 페스트, 눈먼 자들의 도시",
        time: "2020/02/27/02:10:00",
        parentNo: null,
        replyNo: null,
        reaction: ['강앨리'],
        updated: true
    },
    3: {
        no: "3",
        name: "박새드",
        contents: "정말 놀라우면서도 섬뜩",
        time: "2020/02/27/14:38:00",
        parentNo: "1",
        replyNo: "1",
        reaction: null,
        updated: false
    },
    4: {
        no: "4",
        name: "이사랑",
        contents: "곧 한글판 나온대요 @김라잌",
        time: "2020/02/27/22:00:00",
        parentNo: null,
        replyNo: null,
        reaction: ['김페북', '박로라'],
        updated: false
    },
    5: {
        no: "5",
        name: "권앵거",
        contents: "읽어봤냐?",
        time: "2020/02/28/01:30:00",
        parentNo: "1",
        replyNo: "3",
        reaction: null,
        updated: false
    },
    6: {
        no: "6",
        name: "김라잌",
        contents: "사진 무섭다 ㄷㄷ",
        time: "2020/02/28/21:53:20",
        parentNo: "4",
        replyNo: "4",
        reaction: null,
        updated: false
    },
    7: {
        no: "7",
        name: "Sam Smith",
        contents: "Yes I do I believe...",
        time: "2020/02/28/22:02:01",
        parentNo: "1",
        replyNo: "1",
        reaction: null,
        updated: false
    }
};