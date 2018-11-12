import React, { Component } from 'react';
import { connect } from 'react-redux';
import dispatchAction from "util/dispatchAction"
import history from "util/history"
// import WordCloud from "util/wordcloud2"
import Topnav from "../comom/topNav"
import "./css.scss"
class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    tagsListPromise = null
    UNSAFE_componentWillMount() {
        let { asyncGetTagsList, tagsList } = this.props;
        if (!tagsList || !tagsList.length) {
            asyncGetTagsList()
        }
    }
    // componentDidMount() {
    //     let _this = this;
    //     this.tagsListPromise.then(result => {
    //         let label = _this.refs.label;
    //         let list = [];
    //         if(Array.isArray(result)){
    //             list = result.map(v=>[v.tagName,v.count * 1.5,v.tagCode])
    //         }
    //         WordCloud(label, {
    //             list,
    //             fontWeight:400,
    //             // minSize:100,
    //             backgroundColor:"#1ab",
    //             click:function(item, dimension, event){
    //                 console.log(item, dimension, event)
    //             }
    //         });
    //     })
    // }
    goback = () => {
        history.go(-1)
    }
    render() {
        let { tagsList } = this.props;
        return <div>
            <Topnav isFixed />
            <ul className="label-wrap">
                {
                    tagsList.map(v => {
                        return <li key={v.tagCode}>{v.tagName}</li>
                    })
                }
            </ul>
        </div>
    }
}

const mapStateToProps = (store) => {
    return {
        tagsList: store.tagsListModel,
        userInfo: store.userInfoModel
    }
}

export default connect(mapStateToProps, dispatchAction)(App)