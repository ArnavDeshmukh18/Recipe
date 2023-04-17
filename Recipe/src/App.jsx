import React, { useEffect, useState } from 'react'
import './App.css';
import Recipe from './Recipe';
import {MdCloudUpload} from 'react-icons/md'


//0db675b2edfd6ac959cabc39279d3841

//0db675b2edfd6ac959cabc39279d3841
const App = () => {
const APP_ID = "c9d15527";
const APP_KEY = "b141e3b0a62614a2a9ff81ef95f28cab";
const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState(null);
const [image,setImage]=useState(null)
const [fileName,setFileName]=useState("No Selected File")

useEffect(() => {
	getRecipes();
}, [query])
const getRecipes = async () => {
	const response = await fetch
		(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
	const data = await response.json();
	setRecipes(data.hits);
	// console.log(data);

};
const updateSearch = e => {
	setSearch(e.target.value);
};
const getSearch = e => {
	e.preventDefault();
	setQuery(search);
	setSearch("");
}

return (
	<div className="App">
	<form className="search-form" onSubmit={getSearch} >
		<input className="search-bar" type="text" value={search}
			onChange={updateSearch} />
		<button className="search-button" type="submit" >
			Search
		</button>
	</form>

  {/* <form  action="" className='uploader' onClick={()=>document.querySelector(".input-field").click()}>
            <input type="file" accept='image/*'  onChange={({target:{files}})=>{
              files[0] && setFileName(files[0].name)
              if(files)
              {
                setImage(URL.createObjectURL(files[0]))
				console.log(image.name)
              }

            }}/>

            {
              image?<img src={image} width={150} height={150} alt={fileName}/>
              :

              <MdCloudUpload color='#1474cf' size={60}/>
            }
        </form> */}





	<div className="recipes">
		{recipes.map(recipe => (
		<Recipe
			key={recipe.recipe.label}
			title={recipe.recipe.label}
			calories={recipe.recipe.calories}
			image={recipe.recipe.image}
			ingredients={recipe.recipe.ingredients}
		/>

		))}
	</div>

	</div>
);
}

export default App;
