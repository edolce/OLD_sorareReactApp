import {Component} from "react";

class BundleItem extends Component {

    bundleValue = {
        "3_days": 0,
        "7_days": 0,
        "14_days": 0,
        "30_days": 0,
        "floor": 0
    };

    infoProfit = {
        "3_days": 0,
        "7_days": 0,
        "14_days": 0,
        "30_days": 0
    }

    infoMinProfit = {
        "3_days": 0,
        "7_days": 0,
        "14_days": 0,
        "30_days": 0
    }

    constructor(props) {
        super(props);
        if (this.props.playersAverages!==null) this.calculateProfitData()
    }

    calculateProfitData(){
        console.log("CALCUILATING")

        this.props.bundle.cards.map(
            card => {
                //bundle value
                this.bundleValue = {
                    "3_days": Math.round((this.props.playersAverages[card["displayName"]]["3_days"]+this.bundleValue["3_days"])*10000)/10000,
                    "7_days": Math.round((this.props.playersAverages[card["displayName"]]["7_days"]+this.bundleValue["7_days"])*10000)/10000,
                    "14_days": Math.round((this.props.playersAverages[card["displayName"]]["14_days"]+this.bundleValue["14_days"])*10000)/10000,
                    "30_days": Math.round((this.props.playersAverages[card["displayName"]]["30_days"]+this.bundleValue["30_days"])*10000)/10000,
                    "floor": Math.round((this.props.playersAverages[card["displayName"]]["best_market_price"]+this.bundleValue["floor"])*10000)/10000
                }
            }
        )

        //info profit
        this.infoProfit = {
            "3_days": Math.round((this.bundleValue["3_days"] - (this.props.bundle.minNextBid/Math.pow(10,18)))*10000)/10000,
            "7_days": Math.round((this.bundleValue["7_days"] - (this.props.bundle.minNextBid/Math.pow(10,18)))*10000)/10000,
            "14_days": Math.round((this.bundleValue["14_days"] - (this.props.bundle.minNextBid/Math.pow(10,18)))*10000)/10000,
            "30_days": Math.round((this.bundleValue["30_days"] - (this.props.bundle.minNextBid/Math.pow(10,18)))*10000)/10000
        }

        //info MIN profit
        // infoMinProfit viene calcolata la puntata che permette un guadagno del 7% rispetto al valore del bundle
        this.infoMinProfit = {
            "3_days": Math.round(this.bundleValue["3_days"]*0.93*10000)/10000,
            "7_days": Math.round(this.bundleValue["7_days"]*0.93*10000)/10000,
            "14_days": Math.round(this.bundleValue["14_days"]*0.93*10000)/10000,
            "30_days": Math.round(this.bundleValue["30_days"]*0.93*10000)/10000
        }

        this.setState({})
    }


    countDownDate = new Date(this.props.bundle.endDate).getTime();

    myfunc = setInterval( (countDownDate) => {
        var now = new Date().getTime();
        var timeleft = this.countDownDate - now;
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        document.getElementById("days"+this.props.key2).innerHTML = days + "d "
        document.getElementById("hours"+this.props.key2).innerHTML = hours + "h "
        document.getElementById("mins"+this.props.key2).innerHTML = minutes + "m "
        document.getElementById("secs"+this.props.key2).innerHTML = seconds + "s"

    }, 1000, this.countDownDate)


    render() {
        return(
        <div className="bundle-container" onClick={() => this.props.openPopup(this.props.bundle)}>
            <div className="bundle">
                <div className="bundle-image-container">
                    <div className="emblem-container">
                        <img className="emblem" src={this.props.bundle.emblem} alt="/"/>
                    </div>
                </div>
                <div className="info-container">
                    <div className="info time-left">
                        <span className="info-title">Time Left:</span>
                        <span id={"days"+this.props.key2}></span>
                        <span id={"hours"+this.props.key2}></span>
                        <span id={"mins"+this.props.key2}></span>
                        <span id={"secs"+this.props.key2}></span>
                    </div>
                    <div className="info current-bid">
                        <span>Current:</span>
                        <span>{this.props.bundle.currentPrice/Math.pow(10,18)} ETH</span>
                    </div>
                    <div className="info min-next-bid">
                        <span>Min-Bid:</span>
                        <span>{this.props.bundle.minNextBid/Math.pow(10,18)} ETH</span>
                    </div>
                    <div className="info bundle-value">
                        <span>Bundle Floor Value:</span>
                        <span>{this.bundleValue["floor"]} ETH</span>
                    </div>
                    <div className="info bundle-value">
                        <span>Bundle Value 3d:</span>
                        <span>{this.bundleValue["3_days"]} ETH</span>
                    </div>
                    <div className="info bundle-value">
                        <span>Bundle Value 7d:</span>
                        <span>{this.bundleValue["7_days"]} ETH</span>
                    </div>
                    <div className="info profit">
                        <span>Profit-24h:</span>
                        <span style={{color: ((this.infoProfit["3_days"] < 0) ? 'red' : 'green')}}>{this.infoProfit["3_days"]} ETH</span>
                    </div>
                    <div className="info min-profit">
                        <span>Snipe 7%: </span>
                        <span style={{color: (((this.props.bundle.minNextBid/Math.pow(10,18)) > this.infoMinProfit["3_days"]) ? 'red' : 'green')}}>{this.infoMinProfit["3_days"]} ETH</span>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default BundleItem