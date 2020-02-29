
import {css as cssEmotion, jsx} from "@emotion/core";
import PropTypes from "prop-types";
import MuiTypography from "@material-ui/core/Typography";

export const textTypes = {
    count: cssEmotion`
    color: #606770;
  `,
    likesComment: cssEmotion`
    color: #606770;
    font-weight: 600;
  `,
    userName: cssEmotion`
    font-weight: 600;
  `,
    userCall: cssEmotion`
    color: #8d949e;
  `,
    contents: cssEmotion`
    color: #1c1e21;
    font-size: 13px;
    line-height: 16px;
  `,
    commentButton: cssEmotion`
    color: #385898;
    font-size: 12px;
  `,
    postedTime: cssEmotion`
    color: #606770;
  `,
    commentLikes: cssEmotion`
    color: #777d88;
    font-size: 11px;
    line-height: 16px;
  `,
    tooltip: cssEmotion`
    color: #ffffff;
    font-size: 12px;
  `
};

export const cssBase = {
    fontSize: "13px",
    color: "#385898",
    fontWeight: "normal",
    lineHeight: "normal",
    wordBreak: "keep-all",
};

export const cssHyperlink = cssEmotion`
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function Typography({textType, hyperlink, css, children, component, ...inheritProps}) {
    if (!component) {
        component = "span";
      }
    return jsx(
        MuiTypography,
        {
            ...inheritProps,
            component,
            variant: null,
            css: [cssBase, textTypes[textType], hyperlink && cssHyperlink, css]
        },
        children
    );
}

Typography.propTypes = {
    textType: PropTypes.oneOf(Object.keys(textTypes)),
    css: PropTypes.any
};

export default Typography;