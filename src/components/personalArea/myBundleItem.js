import {Component} from "react";

function PlayerMiniItemMB(props) {
    let backgroundColor = "red"
    if (props.playerInfo.is_sold) backgroundColor = "green"
    if (props.playerInfo.is_contested) backgroundColor = "orange"
    return (
        <div className="mini-player-container" style={{background: backgroundColor}}>
            <div className="player-name">
                {props.playerInfo.player_name}
            </div>
            <div className="player-rarity">
                {props.playerInfo.player_rarity}
            </div>
            <div className="is-contested">
                {Boolean(props.playerInfo.is_contested).toString()}
            </div>
            <div className="is-sold">
                {Boolean(props.playerInfo.is_sold).toString()}
            </div>
        </div>
    );
}

class MyBundleItem extends Component {
    i=0

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.i=0
    }

    render() {
        return(
        <div className="bundle-container">
            <div className="top-side">
                <img src={this.props.bundle.image_url} alt="" className="emblem-image"/>
                <div className="mini-players-container" onClick={() => this.props.openPopupExtend()}>
                    <div className="mini-player-container" style={{background: "white"}}>
                        <div className="player-name">
                            Nome Giocatore
                        </div>
                        <div className="player-rarity">
                            Rarità
                        </div>
                        <div className="is-contested">
                            Contes..
                        </div>
                        <div className="is-sold">
                            Sold
                        </div>
                    </div>
                    {
                        this.props.bundle.cards?.map(card => (
                            <PlayerMiniItemMB key={this.i++} playerInfo={card}/>
                        ))}
                </div>
            </div>
            <div className="mid-side">
                <div className="buy-date">
                    <span>Data Aquisto:</span><span>{this.props.bundle.buy_date}</span>
                </div>
                <div className="buy-price">
                    <span>Prezzo Aquisto:</span><span>{this.props.bundle.buy_price/Math.pow(10,18)} ETH</span>
                </div>
                <div className="earnings">
                    <span>Guadagni Attuali:</span><span>WIP ETH</span>
                </div>
                <div className="planned-earnings">
                    <span>Guadagni Previsti:</span><span>WIP ETH</span>
                </div>
            </div>
            <div className="bottom-side"></div>
        </div>
        )
    }

}

export default MyBundleItem