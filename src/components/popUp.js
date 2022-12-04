import {Component} from "react";
import PlayerItem from "./playerItem";
import BundleItem from "./bundleItem";
import '../css/popup.css';

class PopUp extends Component {
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
        let missingExtraData = []
        this.props.bundle.cards?.map(card => {
            if(!(card["playerSlug"] in this.props.extraPlayerData)) missingExtraData.push(card["playerSlug"])
        })
        if (missingExtraData.length>0) this.getExtraPlayerData(missingExtraData)
        this.dataWasFetched=true
    }

    getExtraPlayerData(playersSlug){
        fetch(
            "http://127.0.0.1:8000/bundles/getExtraPlayerData/", {
                mode: 'cors',
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                body: JSON.stringify(playersSlug)
                //headers: { 'names': escape(JSON.stringify(playersSlug))}
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                this.props.setParentStateExtraData(Object.assign({}, this.props.extraPlayerData,json))
            })
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
                            <PlayerItem key={this.i++} data-key={this.i} playerTransactions={this.props.extraPlayerData[card["playerSlug"]]} card={card} playerInfo={this.props.playersAverages[card["displayName"]]}/>
                        ))}
                </div>
            </div>
        )
    }

}
export default PopUp