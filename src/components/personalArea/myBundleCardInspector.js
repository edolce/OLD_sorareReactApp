import {Component} from "react";
import PlayerItem from "../playerItem";
import MyPersonalCard from "./myPersonalCard";

class MyBundleInspector extends Component {
    i = 0
    dataWasFetched = false
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.i=0
    }



    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.dataWasFetched) return
        this.dataWasFetched=true
    }


    render() {
        return(
            <div className="pop-up" >
                <button className="exit-popup" onClick={() => this.props.closePopup()}>
                    EXIT
                </button>
                <div className="players-container">
                    {
                        this.props.bundle.cards?.map(card => (
                            <MyPersonalCard key={this.i++} data-key={this.i} card={card}/>
                        ))}
                </div>
            </div>
        )
    }

}

export default MyBundleInspector;
