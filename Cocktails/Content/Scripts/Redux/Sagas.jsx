﻿import { put, takeLatest, all } from 'redux-saga/effects';
import "regenerator-runtime/runtime";

const cocktailImageUrl = (imageName) => {
    return "/Content/Images/" + (imageName ? imageName : "cocktail_no_image_small.jpg");
};

function* fetchData() {
    const jsonResult = yield fetch("/api/cocktails")
        .then(resp => {
            if (resp.ok) { return resp.json() }

            throw new Error("Fetching returned response " + resp.status);

        }).catch(e => {
            console.log("Sorry! Fetching cocktails went horribly wrong! Try refreshing the page.");
        })    

    jsonResult.forEach((item, index) => item.Image = cocktailImageUrl(item.Image));
    yield put({ type: 'SET_DATA', value: jsonResult });
}

export default function* rootSaga() {
    yield takeLatest("FETCH_DATA", fetchData);
};