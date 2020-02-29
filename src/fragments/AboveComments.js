/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import React from "react";

import Avatar from "components/Avatar";
import Container from "components/Container";
import Typography from "components/Typography";
import ImgPost from "assets/theEyeOfDarkness.jpg";
import Grid from "@material-ui/core/Grid";

const AboveComments = () => {
    return <React.Fragment>
        <Container css={css`
          padding: 10px;
          padding-bottom: 0;
        `}>
            <Grid container>
                <Grid item>
                    <Avatar type="main"/>
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography
                                hyperlink
                                css={css`
                                font-size: 14px;
                                font-weight: 600;
                            `}>Hojeong Choi</Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                textType={'postedTime'}
                                hyperlink
                            >2월 27일</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <Container css={css`
          padding: 10px;
          padding-top: 5px;
        `}>
            <Grid container>
                <Typography
                    component={"p"}
                    css={css`
                        font-size: 14px;
                        color: #1d2129;
                        line-height: 1.38;
                    `}
                >마치 현재의 상황을 묘사하는 듯한 1981년 작 딘 쿤츠의 장편소설 `The Eyes of Darkness`가 다시 주목받고 있다.</Typography>
            </Grid>
        </Container>
        <Container css={css`
            padding: 0 1px;
        `}>
            <img src={ImgPost}
                 alt="The Eyes of Darkness"
                 css={css`
                  width: 100%;
                `}/>
        </Container>

    </React.Fragment>
};


export default AboveComments;