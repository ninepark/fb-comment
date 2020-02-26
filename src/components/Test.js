/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function Test() {
    return (
        <h1 css={css`
        &:hover {
            color: blue;
        }
        `}>Test111</h1>
    )
}

export default Test;