import './css/personalSpace.css'
import {Component} from "react";
import MyBundleItem from "./components/personalArea/myBundleItem";

class PersonalSpace extends Component {
    dataWasFetched = false
    i=0;

    constructor(props) {
        super(props);
        this.state = {
            myBundles: [
                {
                    image: "https://assets.sorare.com/club/aafb2c69-e14c-403a-8908-9ae0102e8077/picture/d93a1afd55a1cd2b8884c3acd4a9f1aa.png",
                    buyDate: "11-21-2000",
                    buyPrice: 0.2312,
                    cards:[
                        {
                            name: "Ciro Immobile",
                            playerRarity: "Limited",
                            isListed: true,
                            isContested: true,
                            isSold: false,
                            listingPrice: 0.1234,
                            contestingPrices: [
                                0.1232,0.1232,0.1234
                            ]
                        }
                    ]
                }
            ]
        }
    }

    componentDidMount() {
        if (this.dataWasFetched) return
        this.fetchBundles()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.i=0
    }


    fetchBundles() {
        fetch(
            "http://127.0.0.1:8000/bundles/init/", {
                mode: 'cors',
                method: 'GET',
                contentType: 'application/json; charset=utf-8'
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                this.setState({
                    myBundles: json
                })
            })
    }


    render() {
        return (
            <div className="personal-space-content">
                <h1>
                    I Miei Bundles
                </h1>
                <div className="my-bundles-container">
                    {
                        this.state.myBundles?.map(bundle => (
                            <MyBundleItem key={this.i++} bundle={bundle} openPopupExtend={() => this.props.openPopup(bundle)} />
                        ))}
                </div>
            </div>
        );
    }


}

export default PersonalSpace;
