/**
*作者: weijie
*功能描述: 文章列表展示
*参数说明:
*时间: 2018/4/16 10:48
*/
import React, { PureComponent } from 'react';
import { Icon } from "antd"
import { timestampFromat } from "util/baseTool"
import history from "util/history"
import "./css.scss"

class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    getRandomBgColor = () => {
        var r = Math.floor(Math.random() * 256),
            g = Math.floor(Math.random() * 256),
            b = Math.floor(Math.random() * 256),
            a = 1;
        // a = Math.floor((Math.random()*.5 + .5)*10)/10;
        return `rgba(${r},${g},${b},${a})`
    }
    goTo = (id) => {
        if (!id) return
        history.push("/article/detail/" + id)
    }
    gotoEditPag = (id)=>{
        if (!id) return
        history.push("/set/article/edit/" + id)
    }
    render() {
        var { list,userInfo } = this.props;
        let {userId} = userInfo
        list = list || []
        console.log(list)
        const content = (
            <div className="article-list">
                {
                    list.map((data) => {
                        let tag = data.tags[0] && data.tags[0].toUpperCase() || "JS"
                        return <div className="article-list-item" key={data._id}>
                            {
                                data.img ?
                                    <div className="article-list-item-img">
                                        <img src={data.img} alt="" />
                                    </div>
                                    :
                                    <div className="article-list-item-text img-mask" style={{ backgroundColor: this.getRandomBgColor() }}>{tag}</div>
                            }

                            <h3 className="article-list-item-title underline" onClick={() => this.goTo(data._id)}>{data.title}</h3>
                            {
                                userId && data.autor && userId === data.autor._id ?
                                <span onClick={()=>this.gotoEditPag(data._id)} className="article-list-item-edit"><Icon type="edit" theme="outlined" /></span>
                                : null
                            }
                            <p className="article-list-item-descrption">{data.description}</p>
                            <div className="article-list-item-author">
                                <span className="mr10">
                                    <Icon className="pr5" type="user" />
                                    {data.autor && data.autor.name}
                                </span>
                                <span className="mr10">
                                    <Icon className="pr5" type="calendar" />
                                    {timestampFromat(data.createTime)}
                                </span>
                                <span className="article-list-item-tag mr10">
                                    <Icon type="tag-o" className="pr5" />
                                    {data.tags && data.tags.join("，")}
                                </span>
                                <span><Icon className="pr5" type="eye-o" />{data.time}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        )

        return (
            content
        );
    }
}

export default App
// onClick={() => this.onClick(data._id, data.time)}
{/* <div className="article-list-item-img">
    <img src="https://alpha.wallhaven.cc/wallpapers/thumb/small/th-602455.jpg" alt="" />
</div> */}

{/* <div className="article-list-item-text img-mask" style={{ backgroundColor: this.getRandomBgColor() }}>{tag}</div> */ }