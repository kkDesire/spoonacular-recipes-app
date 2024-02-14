import * as z from 'valibot'

const recipeShema = z.object({
    id: z.number(),
    title: z.string(),
    image: z.optional(z.string()),
    imageType: z.optional(z.string()),
    servings: z.number(),
    readyInMinutes: z.number(),
    sourceUrl: z.string(),
    summary: z.string(),
    analyzedInstructions: z.array(z.object({
        name: z.string(),
        steps: z.array(z.object({
            number: z.number(),
            step: z.string(),
            ingredients: z.array(z.object({
                id: z.number(),
                name: z.string(),
                localizedName: z.string(),
                image: z.string()
            })),
            equipment: z.array(z.object({
                id: z.number(),
                name: z.string(),
                localizedName: z.string(),
                image: z.string()
            }))
        }))
    })),
    extendedIngredients: z.array(z.object({
        id: z.number(),
        aisle: z.nullable(z.string()),
        image: z.nullable(z.string()),
        consistency: z.string(),
        name: z.string(),
        nameClean: z.nullable(z.string()),
        original: z.string(),
        originalName: z.string(),
        amount: z.number(),
        unit: z.string(),
        meta: z.array(z.string()),
        measures: z.object({
            us: z.object({
                amount: z.number(),
                unitShort: z.string(),
                unitLong: z.string(),
            }),
            metric: z.object({
                amount: z.number(),
                unitShort: z.string(),
                unitLong: z.string(),
            })
        })
    })),
    diets: z.array(z.string()),
    dishTypes: z.array(z.string()),
    instructions: z.string(),
    // occasions: z.array(z.string()),
    // originalId: z.number(),
    // spoonacularScore: z.string(),
    // spoonacularSourceUrl: z.string()
})
export default defineCachedEventHandler(async (event) => {    
    const { recipes } = await $fetch<{ recipes: unknown }>('https://api.spoonacular.com/recipes/random', {
        query: {
            limitLicense: true,
            number: 100,
            apiKey: useRuntimeConfig().spoonacular.apiKey
        }
    })
    try{
        return z.parse(z.array(recipeShema), recipes)
    }catch(e: any){
        console.log(e.issues.map((i: any) => i.path));
        return []
        
    }
    
},{
    base: 'recipes',
    getKey: () => 'recipes',
    shouldBypassCache: () => false,

    // 1 day 
    maxAge: 1000 * 60 * 60 * 24,
    staleMaxAge: 1000 * 60 * 60 * 24 * 7
})