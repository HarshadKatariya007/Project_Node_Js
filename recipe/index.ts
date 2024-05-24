import express from 'express'
import { Request,Response } from 'express'
import { Data_Check } from './middleware'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: '15',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1
    }
  ]
  

app.get("/",(req:Request,res:Response) =>
{
    res.send("welcome to the recipe api")
})

app.get("/recipe/all",(req:Request,res:Response) =>
{
     res.send(initialRecipe)
})

app.get("/index",(req:Request,res:Response) =>
{
    res.sendFile(__dirname + "/index.html")
})

app.get("/add",(req:Request,res:Response) =>
{
    res.sendFile(__dirname + "/recipe.html")
})

app.get("/recipe/filter",(req:Request,res:Response) => 
{
    let {veg} = req.query
    let fil = initialRecipe.filter((ele) => ele.veg==false)
    res.send(fil)
})

app.post("/recipe/add",Data_Check,(req:Request,res:Response) =>
{   
   const {name,description,preparationTime,cookingTime,imageUrl,country,veg} = req.body

   let arry = {name,description,preparationTime,cookingTime,imageUrl,country,veg,id:initialRecipe.length + 1}

    initialRecipe.push(arry)
    res.send(initialRecipe)
})

app.patch("/recipe/update/:id",(req:Request,res:Response) =>
{
    let {id} = req.params
    let update = initialRecipe.findIndex(id => (update: { id: { name: string; description: string; preparationTime: string; cookingTime: string; imageUrl: string; country: string; veg: boolean; id:number } }) => update.id==id)
    if(update!=-1)
        {
            initialRecipe[update] = {...initialRecipe[update],...req.body}
            res.send(initialRecipe)
        }
        else
        {
            res.send("Updated Recipe")
        }
})

app.delete("/recipe/delete/:id",(req:Request,res:Response) =>
{   
   let {id} = req.params
   let delete_1 = initialRecipe.findIndex(id => (recipe: { id:{ name: string; description: string; preparationTime: string; cookingTime: string; imageUrl: string; country: string; veg: boolean; id: number } }) => recipe.id == id)
   if(delete_1!=-1)
       {
           initialRecipe.splice(delete_1,1)
           res.send(initialRecipe)
       }
})

app.listen(8090,() =>
{
    console.log("Serevr Is Running http://localhost:8090");
})