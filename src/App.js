import './App.css';
import './timer.js';
import BundleItem from './components/bundleItem'
import PopUp from './components/popUp'
import {Component} from "react";
import PersonalSpace from "./PersonalSpace";
import MyBundleInspector from "./components/personalArea/myBundleCardInspector";


class App extends Component {






    dataWasFetched = false
    i=0;

    constructor(props) {
        super(props);
        this.state = {
            bundles: [],
            playersAverages: null,
            popupManager:{
                popupActive:false,
                bundleSelected:null
            },
            popup2Manager:{
                popupActive:false,
                bundleSelected:null
            },
            extraPlayerData : {},
            showPersonalSpace: true,
            showBundleAuctions: false
        }
    }

    popupSelection(bundle){
        if (this.state.popupManager.popupActive) return
        this.setState({
            popupManager:{
                popupActive: true,
                bundleSelected: bundle
            }
        })
    }

    popup2Selection(bundle){
        if (this.state.popup2Manager.popupActive) return
        this.setState({
            popup2Manager:{
                popupActive: true,
                bundleSelected: bundle
            }
        })
    }

    popupReset(){
        if (!this.state.popupManager.popupActive) return
        this.setState({
            popupManager:{
                popupActive: false,
                bundleSelected: null
            }
        })
    }

    popup2Reset(){
        if (!this.state.popup2Manager.popupActive) return
        this.setState({
            popup2Manager:{
                popupActive: false,
                bundleSelected: null
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.i=0
        console.log(this.state)
    }

    componentDidMount() {
        if (this.dataWasFetched) return
        this.dataWasFetched = true
        fetch(
            "http://127.0.0.1:8000/bundles/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    bundles: json
                });
                this.dateSortBundles(json)
                let playersSlug = []
                json?.map(bundle => bundle["cards"].map(card => {
                    if (!playersSlug.includes(card["displayName"])) playersSlug.push(card["displayName"])
                }))
                this.fetchPlayersData(playersSlug)

            })
    }

    fetchPlayersData(playersSlug) {
        fetch(
            "http://127.0.0.1:8000/bundles/getPlayersAverage/", {
                mode: 'cors',
                method: 'POST',
                contentType: 'application/json; charset=utf-8',
                body: JSON.stringify(playersSlug)
                //headers: { 'names': escape(JSON.stringify(playersSlug))}
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    playersAverages: json
                })
            })
    }

    setParentStateExtraData(newExtraData){
        this.setState({
            extraPlayerData : newExtraData
        })
    }

    dateSortBundles(json){
        let bundlesSorted = [...json]
        bundlesSorted.sort( (a,b) => new Date(a["endDate"]).getTime()-new Date(b["endDate"]).getTime())
        this.setState({
            bundles: bundlesSorted
        });
    }

    render() {



        return (
            <div className="App">
                {this.state.popupManager.popupActive && <PopUp bundle={this.state.popupManager.bundleSelected} playersAverages={this.state.playersAverages} closePopup={ () => this.popupReset()} setParentStateExtraData={(newExtraData) => this.setParentStateExtraData(newExtraData)} extraPlayerData={this.state.extraPlayerData}/>}
                {this.state.popup2Manager.popupActive && <MyBundleInspector bundle={this.state.popup2Manager.bundleSelected} closePopup={ () => this.popup2Reset()}/>}
                <div className="main-div">
                    <header></header>
                    <section className="content">
                        {this.state.showPersonalSpace && <PersonalSpace openPopup={(bundle) => this.popup2Selection(bundle)}/>}
                        {this.state.showBundleAuctions &&
                            <div className="bundles-container">
                                {
                                    this.state.bundles?.map(bundle => (
                                        <BundleItem key={this.i++} key2={this.i} bundle={bundle}
                                                    playersAverages={this.state.playersAverages}
                                                    openPopup={(bundle) => this.popupSelection(bundle)}/>
                                    ))}
                            </div>
                        }
                    </section>
                    <footer></footer>
                </div>
            </div>
        );
    }


}

export default App;
