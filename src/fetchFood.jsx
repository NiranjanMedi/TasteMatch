import axios from 'axios';
import React, {useEffect, useState} from 'react';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;


export async function fetchFood (count) {
    const url = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${API_KEY}`;

    try{
        const response = await axios.get(url);
        const recipes = response.data.recipes;

        return (
            recipes.map((r) => ({
                    name : r.title,
                    description: r.summary.replace(/<[^>]+>/g, ""),
                    url: r.image,
                    ingredients: r.extendedIngredients.map((ing) => ing.name),
                    points: 0
                })
            )
        );

    }  catch (e){
        console.error("Error fetching food data", e);
        return [];
    }
}