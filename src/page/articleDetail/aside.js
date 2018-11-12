
import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import logo from "images/logo.jpg"

class Aside extends PureComponent {
    state = {
        //0:中间值  1 ：文章目录  2 ： 站点概览
        currentPanel: 1,
    };
    gotoDom = (id) => {
        var element = document.getElementById(id);
        window.scrollTo({
            top: element.offsetTop - 56,
            behavior: "smooth"
        })
    }
    scrollHandle = () => {
    }
    getNav = (arr, level = 1, per = "") => {
        var className = "articl-aside-level-" + level
        return <ol className="articl-aside-ol">
            {
                arr.map((v, k) => {
                    return (<li key={v.id}>
                        <p className={className}>
                            {per ? <span>{per}</span> : null}
                            <span style={{ paddingRight: "15px" }}>{k + 1}.</span>
                            <span className="articl-aside-name" onClick={() => this.gotoDom(v.id)}>{v.name}</span>
                        </p>
                        {
                            v.child && v.child.length ?
                                this.getNav(v.child, level + 1, per + level + ".")
                                : null

                        }
                    </li>)
                })
            }
        </ol>
    }
    componentDidMount(){
        if(this.props.nav && !this.props.nav.length){
            this.setState({
                currentPanel:2
            })
        }
    }
    UNSAFE_componentWillReceiveProps(next){
        console.log("111111111111111111111111")
        console.log(next.nav)
        console.log(next.nav === this.props.nav)
        // if(next.nav === this.props.nav){

        // }
    }
    toggle = (index,flag)=>{
        let {currentPanel} = this.state ;
        if(flag && flag === currentPanel) return ;
        this.setState({
            currentPanel : index
        })
    }
    render() {
        let { nav } = this.props
        let { currentPanel } = this.state;
        let child = nav && nav.length ? this.getNav(nav) : null
        return (
            <div className="articl-aside">
                <div className="articl-aside-title">
                    {child ? <span className={currentPanel === 1 ?"active":""} onClick={()=>this.toggle(0,1)}>文章目录</span> : null}
                    <span className={currentPanel === 2 ?"active":""}  onClick={()=>this.toggle(0,2)}>站点概览</span>
                </div>
                {

                    child ?
                        <CSSTransition
                            in={currentPanel === 1}
                            timeout={300}
                            classNames="message"
                            unmountOnExit
                            onExited={()=>this.toggle(2)}
                        >
                            {child}
                        </CSSTransition>
                        :
                        null
                }
                <CSSTransition
                    in={currentPanel === 2}
                    timeout={300}
                    classNames="message"
                    unmountOnExit
                    onExited={()=>this.toggle(1)}
                >
                    <div className="articl-aside-user">
                        <img className="author-image" src={logo} alt="" />
                        <p className="author-name" >weijie</p>
                        <p className="author-describe">from small beginning come great things</p>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}
export default Aside
