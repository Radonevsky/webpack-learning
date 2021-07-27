import * as $ from "jquery";
import Post from "@models/Post";
import json from "./assets/json";
import xml from "./assets/data.xml";
import csv from "./assets/data.csv";
import WebpackLogo from "@/assets/logo";
import "./styles/style.css";
import "./styles/less.less";
import "./styles/scss.scss";
import "./babel.js"
import React from "react";
import {render} from "react-dom";

const post = new Post("Webpack Post Title", WebpackLogo);
$('pre').addClass('date').html(post.toString());

const App = () => (
    <div className="container">
        <h1>Webpack learning</h1>
        <hr />
        <div className="logo" />
        <hr />
        <pre />
        <hr />
        <div className="box">
            <h2>Less check</h2>
        </div>
        <div className="card">
            <h2>Sass check</h2>
        </div>
    </div>
)

render(<App/>, document.getElementById('app'))

console.log("JSON:", json);
console.log("XML:", xml);
console.log("CSV:", csv);
