import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

class Tags extends PureComponent {
  // goTo = (id)=>{
  //     history.push("/tags/" + id)
  // }
  render() {
    const { list, currentTag } = this.props;
    return (
      <ul className="home-tags clearfix">
        {list.map((v) => {
          return (
            <li
              className={currentTag === v.tagCode ? "active" : ""}
              key={v.tagCode}
            >
              <Link to={`/tags/${v.tagCode}/1`}>
                {v.tagName} <span>[{v.count}]</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Tags;
