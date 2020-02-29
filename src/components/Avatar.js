/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import PropTypes from "prop-types";

import { ReactComponent as AvatarIcon } from "assets/avatar.svg";

const avatarTypes = ["main", "comment", "reply"];
const avatarSizes = {
    main: css`
      height: 40px;
      width: 40px;
      margin-right: 8px;
    `,
    comment: css`
      height: 32px;
      width: 32px;
      margin-right: 6px;
      margin-top: 3px;
    `,
    reply: css`
      height: 20px;
      width: 20px;
      margin-right: 6px;
      margin-top: 3px;
    `
};

const Avatar = ({ type, props }) => {
    return (
        <span
            {...props}
        >
            <AvatarIcon
                css={avatarSizes[type]}
            />
        </span>
        )
};

Avatar.propTypes = {
    type: PropTypes.oneOf(avatarTypes)
};

export default Avatar;
