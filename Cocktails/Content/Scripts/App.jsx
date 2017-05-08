﻿import React from 'react';
import ReactDOM from 'react-dom';
import CocktailGrid from './CocktailGrid.jsx';
import DrinkList from './DrinkList.jsx';
import NavBar from './NavBar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drinkList: new Map(), data: [], showDrinkList: true };
        this.drinkListCount = this.drinkListCount.bind(this);
        this.changeDrinkCount = this.changeDrinkCount.bind(this);
        this.toggleDrinkList = this.toggleDrinkList.bind(this);
    }

    changeDrinkCount(cocktailId, changeBy) {
        let count = this.state.drinkList.has(cocktailId) ? this.state.drinkList.get(cocktailId) : 0;
        count += changeBy;
        const newDrinkList = new Map(this.state.drinkList);
        
        if (count > 0) {
            newDrinkList.set(cocktailId, count);
        } else if (this.state.drinkList.has(cocktailId)) {
            newDrinkList.delete(cocktailId);
        }
        this.setState({
            drinkList: newDrinkList
        });
    }

    drinkListCount() {
        return Array.from(this.state.drinkList.entries()).reduce(function(acc, keyToValue) {
            return acc + keyToValue[1];
        }, 0);
    }

    componentWillMount() {
        var component = this;

        function cocktailImageUrl(azureStorageUrl, imageName) {
            return imageName ? (azureStorageUrl + imageName) : "/Content/Images/cocktail_no_image_small.jpg";
        }

        var azureStoragePromise = $.get("/api/configuration");
        var cocktailsPromise = $.get("/api/cocktails");

        $.when(azureStoragePromise, cocktailsPromise)
            .done(function (azureStorageUrlData, cocktailsData) {
                $(cocktailsData[0]).each((index, item) => item.Image = cocktailImageUrl(azureStorageUrlData[0] + "/", item.Image));
                component.setState({ data: cocktailsData[0] });
            })
            .fail(function() {
                alert("Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.");
            });
    }

    toggleDrinkList() {
        this.setState({ showDrinkList: !this.state.showDrinkList });
    }

    render() {
        return (
       <div>
           <NavBar drinkListCount={this.drinkListCount()} toggleDrinkList={this.toggleDrinkList} />
           <DrinkList drinkList={this.state.drinkList} cocktails={this.state.data} showDrinkList={this.state.showDrinkList} 
                      toggleDrinkList={this.toggleDrinkList} changeDrinkCount={this.changeDrinkCount}/>
           <div className="container-fluid" style={{position: 'relative' }}>
               <div className="row">
                   <CocktailGrid cocktails={this.state.data} handlePlusClick={this.changeDrinkCount}/>
               </div>
           </div>
       </div>);
    }
}

ReactDOM.render(<App />, document.getElementById("content"));