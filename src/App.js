import React from 'react';
import {css} from "@emotion/core";
import './App.css';
import Test from 'components/Test';
import Test2 from 'components/Test2';
import Container from 'components/Container';


function App() {
    return (
        <div className="App">
            <Container css={css`
                background-color: white;
              `}>
                <Test/>
                <Test2/>
            </Container>
        </div>
    );
}

export default App;
