import React from 'react';
import {css} from "@emotion/core";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";
import Container from 'components/Container';
import AboveComments from "fragments/AboveComments";
import Comments from "fragments/Comments";

function App() {
    return (
        <div className="App">
            <Container css={css`
                background-color: white;
                margin: 40px auto;
              `}>
                <AboveComments/>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Comments/>
                    </PersistGate>
                </Provider>
            </Container>
        </div>
    );
}

export default App;
