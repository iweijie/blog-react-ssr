
import React, { PureComponent } from 'react';
class Bg extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { browserInfo,list } = this.props;
        let height = browserInfo.height;
        let src = list && list.length && list[0].fullUrl || ""
        return (
            <div className="home-bg img-mask" style={{ height: (height - 56) + "px" }}>
                <div className="home-bg-img opacity-1">
                    <img src={src} alt=""/>
                </div>
                <div className="say">
                    <div className="title">WEIJIE</div>
                    <div className="oath">from small beginning come great things</div>
                </div>
            </div>
        );
    }
}

export default Bg