/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import PropTypes from "prop-types";
import { isMobile } from 'react-device-detect';

import { ReactComponent as AvatarIcon } from "assets/avatar.svg";

const avatarTypes = ["main", "comment", "reply"];
const avatarSizes = {
    main: css`
      height: 40px;
      width: 40px;
      margin-right: 8px;
    `,
    comment: css`
      height: 30px;
      width: 30px;
      margin-top: 3px;
    `,
    reply: css`
      height: 20px;
      width: 20px;
      margin-right: 6px;
      margin-top: 3px;
    `
};

const avatarSizesMobile = {
    main: css`
      height: 36px;
      width: 36px;
      margin-right: 8px;
    `,
    comment: css`
      height: 24px;
      width: 24px;
      margin-top: 3px;
    `,
    reply: css`
      height: 18px;
      width: 18px;
      margin-right: 6px;
      margin-top: 3px;
    `
};

const Avatar = ({ type, props }) => {

    return (
        <span {...props}>
            {
                isMobile
                    ? <AvatarIcon css={avatarSizesMobile[type]}/>
                    : <AvatarIcon css={avatarSizes[type]}/>
            }
        </span>
    )
};

Avatar.propTypes = {
    type: PropTypes.oneOf(avatarTypes)
};

export default Avatar;
