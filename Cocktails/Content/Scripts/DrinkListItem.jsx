﻿import React from 'react';
import { connect } from 'react-redux';
import { changeDrinkCount, removeDrink } from './Actions.jsx';

class DrinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onMinusClick = this.onMinusClick.bind(this);
    }

    onPlusClick() {
        this.props.changeDrinkCount(this.props.cocktail.ID, 1);
    }

    onMinusClick() {
        this.props.changeDrinkCount(this.props.cocktail.ID, -1);
    }

    render() {
        return (
           <li key={this.props.cocktail.ID} className="noselect">
               <img src={this.props.cocktail.Image} style={{ height: 49, width: 30 }} alt="" />                
               <div className="item-name">
                   <span className="addAndRemove">
                       <span className="icon-plus-square plusIcon" onClick={this.onPlusClick}></span> <span className="icon-minus-square" onClick={this.onMinusClick}></span>
                   </span>
                   <span className="itemName">{this.props.count} x {this.props.cocktail.Name}</span>
                   <span className="icon-trash removeAll" onClick={() => this.props.removeDrink(this.props.cocktail.ID)}></span>
               </div>
           </li>
        );   
    }    
}

const mapDispatchToProps = (dispatch) => ({
    changeDrinkCount: (cocktailId, changeBy) => dispatch(changeDrinkCount(cocktailId, changeBy)),
    removeDrink: (cocktailId) => dispatch(removeDrink(cocktailId))
});

export default connect(null, mapDispatchToProps)(DrinkListItem);