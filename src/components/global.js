import React from "react";
import { Global, css } from "@emotion/core";

const Globalstyle = ({textcolor,color}) => (
  <>
    <Global
      styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
          }
.projectheader{
   width: 100%;

              text-decoration: none;
              color: ${textcolor};
              :hover {
                text-decoration: underline;
              }
}
          /* More info: https://bit.ly/2PsCnzk */

          html,
          body {
            margin: 0;
            color: ${textcolor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: 18px;
            line-height: 1.4;
            background:${color};
            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color:${textcolor}
            line-height: 1.1;

            + * {
              margin-top: 0.5rem;
            }
          }

          strong {
            color:${textcolor};
          }

          li {
            margin-top: 0.25rem;
          }
       
        `}
    />
  </>
);
export default Globalstyle;
