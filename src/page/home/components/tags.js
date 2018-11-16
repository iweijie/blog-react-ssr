
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
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
                        return <li key={v.tagCode}><Link to={`/tags/${v.tagCode}`}>{v.tagName} <span>[{v.count}]</span></Link></li>
                    })
                }
            </ul>
        )
    }
}

export default Tags