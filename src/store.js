import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageLocal from "redux-persist/lib/storage";

import reactionReducer from "reducers/reaction";
import commentReducer from "reducers/comment";

const rootReducer = combineReducers({
    reactions: reactionReducer,
    comments: commentReducer
});

const persistConfig = {
  key: 'fb-comments.state',
  storage: storageLocal
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer
);

export const persistor = persistStore(store);
