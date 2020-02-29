import PropTypes from "prop-types";
import { css as cssEmotion, jsx } from "@emotion/core";

function Container({ component, css, children, ...inheritProps }) {
  return jsx(
    component,
    {
      ...inheritProps,
      css: [
        cssEmotion`
        width: 100%;
        max-width: 496px;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
        border-radius: 3px;
      `,
        css
      ]
    },
    children
  );
}

Container.proptTypes = {
  component: PropTypes.any,
  css: PropTypes.any
};

Container.defaultProps = {
  component: "div"
};

export default Container;
