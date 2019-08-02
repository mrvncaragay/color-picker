import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";

// Component styles
import styles from "./styles/ColorBoxStyles";

const ColorBox = ({
  background,
  name,
  colorUrl,
  showingFullPalette,
  classes
}) => {
  const [copied, setCopied] = useState(false);

  const changeCopiedState = () => {
    setCopied(true);
  };

  /*eslint-disable */
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1500);
    }
  }, [copied]);
  /*eslint-enable */

  return (
    <CopyToClipboard text={background} onCopy={changeCopiedState}>
      <div style={{ background: background }} className={classes.ColorBox}>
        <div
          style={{ background: background }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        />
        <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>

        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={colorUrl} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
