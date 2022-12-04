import {Component} from "react";

class PlayerItem extends Component {

    total_risk;
    last_sold = {
        "days":0,
        "price":0,
    };
    quantitySold = {};

    constructor(props) {
        super(props);
        if (this.props.playerTransactions !== undefined){
            this.grabLastSold()
            this.grabQuantitySold()
            this.calculate_total_risk()
        }
        // this.props.extraPlayerData[2]
        // this.props.extraPlayerData[3]
        // this.props.extraPlayerData[4]
    }

    grabLastSold(){
        for(let i=0;i<this.props.playerTransactions.length;i++){
            if(parseInt(this.props.playerTransactions[i]["price"])!==0){
                let soldDate = new Date(this.props.playerTransactions[i]["from"]).getTime();
                let now = new Date().getTime();
                let timeLeft = now - soldDate;
                let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                this.last_sold = {
                    "days":days,
                    "price": this.props.playerTransactions[i]["price"]
                }
                break;
            }
        }
    }

    grabQuantitySold(){
        let doContinue = true
        let values = [0,0,0,0]
        for(let i=0;doContinue;i++) {
            if(this.props.playerTransactions<i) break
            let soldDate = new Date(this.props.playerTransactions[i]["from"]).getTime();
            let now = new Date().getTime();
            let timeLeft = now - soldDate;
            let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            if (days<3) values[0]+=1;
            if (days<7) values[1]+=1;
            if (days<14) values[2]+=1;
            if (days<30) values[3]+=1;
            doContinue = days < 30
        }
        this.quantitySold = {
            "3_days": values[0],
            "7_days": values[1],
            "14_days": values[2],
            "30_days": values[3]
        }
    }

    calculate_total_risk(){
        let risk0 = this.last_sold["days"]/7
        let risk1 = 1 - this.quantitySold["7_days"]/40
        if(risk0>1) risk0=1
        if(risk1<0) risk1=0

        this.total_risk = Math.round((risk0 * 0.4 + risk1 * 0.6)*100)
    }

    GreenYellowRed(number) {

        let r,g,b

        if (number < 50) {
            // green to yellow
            r = Math.floor(255 * (number / 50));
            g = 255;

        } else {
            // yellow to red
            r = 255;
            g = Math.floor(255 * ((50-number%50) / 50));
        }
        b = 0;

        return r+","+g+","+b;
    }

    render() {
        return (
            <div className="player-card" style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                <div className="image-player-container">
                    <img
                        src= {this.props.playerInfo["player_image"]}
                        alt="immagine-player"/>
                        <div className="risk-percentage-container">
                            <div className="risk-percentage">
                                {this.total_risk}%
                            </div>
                            <div className="risk-percentage-circle"></div>
                        </div>
                </div>
                <div className="info-player-container" style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                    <div className="info-piece">
                        <span>Last Sold</span>
                        <div className="bar-info">
                            <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                {this.last_sold["days"]} Days Ago
                            </span>
                            <div className="bar"></div>
                        </div>
                        <div className="bar-info">
                            <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                {this.last_sold["price"]/Math.pow(10,18)} ETH
                            </span>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div className="divisor"></div>
                    <div className="info-piece">
                        <span>Floor Price</span>
                        <div className="bar-info">
                            <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>{this.props.playerInfo["best_market_price"]} ETH</span>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <div className="divisor"></div>
                    <div className="info-piece">
                        <span>Quantity Sold</span>
                        <div className="days">
                            <span>3 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>{this.quantitySold["3_days"]} Pcs</span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>7 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>{this.quantitySold["7_days"]} Pcs</span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>14 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>{this.quantitySold["14_days"]} Pcs</span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>30 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>{this.quantitySold["30_days"]} Pcs</span>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="divisor"></div>
                    <div className="info-piece">
                        <span>Average Price</span>
                        <div className="days">
                            <span>3 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                    {this.props.playerInfo["3_days"]} ETH
                                </span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>7 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                    {this.props.playerInfo["7_days"]} ETH
                                </span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>14 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                    {this.props.playerInfo["14_days"]} ETH
                                </span>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="days">
                            <span>30 days</span>
                            <div className="bar-info">
                                <span style={{background: "rgb("+this.GreenYellowRed(this.total_risk)+")"}}>
                                    {this.props.playerInfo["30_days"]} ETH
                                </span>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerItem