/** reaction */
export const ADD_REACTION = "ADD_REACTION";
export const CANCEL_REACTION = "CANCEL_REACTION";

/** action creators */
const addReaction = (kind, name='Hojeong Choi') => {
    return { type: ADD_REACTION, kind, name };
};

const cancelReaction = (kind, name='Hojeong Choi') => {
    return { type: CANCEL_REACTION, kind, name };
};

export const reactionCreator = {
    addReaction,
    cancelReaction
};

/** reducer */
export default function reactionReducer(state = initialState, action) {
    const { kind, name } = action;
    switch (action.type) {
        case ADD_REACTION:
            state[kind].push(name);
            return {
                ...state
            };

        case CANCEL_REACTION:
            state[kind].splice(state[kind].indexOf(name), 1);
            return {
                ...state
            };

        default:
            return state;
    }
}

const initialState = {
    like: ["김라잌", "Sam Smith"],
    love: ["이사랑"],
    haha: ["김하하"],
    wow: ["최와우"],
    sad: ["박새드"],
    angry: ["권앵거"]
};
