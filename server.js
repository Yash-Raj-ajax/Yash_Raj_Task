import express from 'express';
import es6Renderer from 'express-es6-template-engine';
const app = express();
import openurl from "openurl";

app.use(express.static('public'));
app.engine('html', es6Renderer);
app.set('/html/struct', 'views');
app.set('view engine', 'html');
 
app.get('/', (req, res) => {
  res.render('funn')
})


app.listen(3000,(req,res) =>{
    console.log(`started listening at server 3000`)
})

// openurl.open("http://localhost:3000");

