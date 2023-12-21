import axios from "axios";
import {IData} from "./contracts";

const bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|100000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const lessDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

export const DataService = {
    async getData() {
        debugger;
        const resp = await axios.get<IData[]>(bigDataUrl)
        return resp.data
    },

    async getLessData() {
        debugger;
        const resp = await axios.get<IData[]>(lessDataUrl)
        return resp.data
    }
}