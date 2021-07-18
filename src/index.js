import Post from "./Post"
import json from './assets/json.json'
import WebpackLogo from "./assets/logo.png"
import './styles/style.css'


const post = new Post('Webpack Post Title', WebpackLogo)

console.log('post to string:', post.toString())

console.log('JSON:', json)