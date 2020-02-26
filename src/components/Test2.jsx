/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function Test2() {
    return (
        <h1 css={css`
        &:hover {
            color: blue;
        }
      `}>Test222</h1>
    )
}

export default Test2;