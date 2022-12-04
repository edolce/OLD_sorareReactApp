import {Component} from "react";


function MyInfoPiece(props){
    return(
        <div className="info-piece">
            <span>{props.data.infoName}</span>
            <div className="bar-info">
                            <span>
                                {props.data.value}
                            </span>
                <div className="bar"></div>
            </div>
        </div>
    )
}

class MyPersonalCard extends Component {

    infos = {
        sold:
            <div className="info-player-container">
                <MyInfoPiece data={{infoName:"Sold Price",value:"WIP ETH"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Sell Date",value:"WIP"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Percentage Profit",value:"WIP"}}/>
            </div>,
        "notSold-listed-notContested":
            <div className="info-player-container" >
                <MyInfoPiece data={{infoName:"Auction Price",value:"WIP ETH"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Insertion Date",value:"WIP"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Contested Times",value:"WIP"}}/>
            </div>,
        "notSold-listed-contested":
            <div className="info-player-container" >
                <MyInfoPiece data={{infoName:"Auction Price",value:"WIP ETH"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Insertion Date",value:"WIP"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Contested Times",value:"WIP"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"contesting cards",value:"WIP"}}/>
            </div>,
        "notSold-notListed":
            <div className="info-player-container">
                <MyInfoPiece data={{infoName:"Floor Price",value:"WIP ETH"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Best Auction Price",value:"WIP ETH"}}/>
                <div className="divisor"></div>
                <MyInfoPiece data={{infoName:"Average Price",value:"WIP ETH"}}/>
            </div>,
    }

    constructor(props) {
        super(props);
        this.state = {
            info: <></>
        }

        if (this.props.sold)
            this.setState({info:this.infos.sold})
        if (this.props.sold)
            this.setState({info:this.infos.sold})
        if (this.props.sold)
            this.setState({info:this.infos.sold})
        if (this.props.sold)
            this.setState({info:this.infos.sold})
    }





    render() {
        return (
            <div className="player-card">
                <div className="image-player-container">
                    <img src= {this.props.card["player_image"]} alt="immagine-player"/>
                </div>
                <div className="info-player-container">
                    {this.infos.sold}
                </div>
            </div>
        );
    }
}

export default MyPersonalCard