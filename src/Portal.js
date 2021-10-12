import React ,{ Component} from "react";
import reactDom from "react-dom";

const portalRoot =document.getElementById('portal');
export default class Portal extends Component{
    constructor(){
        super();
        this.el=document.createElement('div');
    }
    componentDidMount =()=>{
        portalRoot.appendChild(this.el);
    }
    componentWillUnmount =()=>{
        portalRoot.removeChild(this.el);
    }
    render() {
        const {children} = this.props;
        return reactDom.createPortal(children, this.el);
            
    }
}