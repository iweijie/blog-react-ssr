
import React, { PureComponent } from 'react';
import history from "util/history"
class Tags extends PureComponent {
    constructor(props) {
        super(props);
    }
    goTo = (id)=>{
        history.push("/tags/" + id)
    }
    render() {
        let {list } = this.props
        return (
            <ul className="home-tags clearfix">
                {
                    list.map(v => {
                        return <li onClick={()=>this.goTo(v.tagCode)} key={v.tagCode}>{v.tagName} <span>[{v.count}]</span></li>
                    })
                }
            </ul>
        )
    }
}

export default Tags