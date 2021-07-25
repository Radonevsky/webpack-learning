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

const post = new Post("Webpack Post Title", WebpackLogo);

$('pre').addClass('date').html(post.toString());

console.log("JSON:", json);
console.log("XML:", xml);
console.log("CSV:", csv);
