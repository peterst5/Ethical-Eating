const baseUrl = 'http://localhost:3000/api';

function RecipeSearch(recipeName, showUserRecipes) {
    var queryString = `name=${encodeURIComponent(recipeName)}`;
    if (showUserRecipes) queryString = `${queryString}&showUserRecipes`;

    let url = `${baseUrl}/search?${queryString}`;
    return(fetch(url));
}

function FetchRecipe(recipeId) {
    const queryString = `recipeId=${encodeURIComponent(recipeId)}`;
    let url = `${baseUrl}/recipe?${queryString}`;
    return(fetch(url));
}

function FetchRecipes() {
    let url = `${baseUrl}/recipes`

    return(fetch(url))
}

function FetchIngredient(ingredientId) {
    const queryString = `ingredientId=${encodeURIComponent(ingredientId)}`;
    let url = `${baseUrl}/ingredient?${queryString}`;
    return(fetch(url));
}

function FetchIngredients() {
    let url = `${baseUrl}/ingredients`;
    return(fetch(url));
}

function FetchIngredientIssue(ingredientId) {
    const queryString = `ingredientId=${encodeURIComponent(ingredientId)}`;
    let url = `${baseUrl}/ingredientIssue?${queryString}`;
    return(fetch(url));
}

function FetchIngredientAlternatives(ingredientId) {
    const queryString = `ingredientId=${encodeURIComponent(ingredientId)}`;
    let url = `${baseUrl}/ingredientAlternatives?${queryString}`;
    return(fetch(url));
}

function CreateAccount(email, password) {
    let url = `${baseUrl}/account`;
    let data = {
        'email': email,
        'password': password
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return(fetch(url, requestOptions));
}

function LoginAccount(email, password) {
    let url = `${baseUrl}/account/login`
    let data = {
        'email': email,
        'password': password
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        credentials: 'include'
    }

    return(fetch(url, requestOptions))
}

function LogoutAccount() {
    let url = `${baseUrl}/account/logout`

    const requestOptions = {
        credentials: 'include'
    }

    return(fetch(url, requestOptions))
}

function CreateRecipe(recipe) {
    let url = `${baseUrl}/createRecipe`;
    let data = recipe;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return(fetch(url, requestOptions));
}

module.exports = {
    RecipeSearch: RecipeSearch,
    FetchRecipe: FetchRecipe,
    FetchRecipes: FetchRecipes,
    CreateAccount: CreateAccount,
    LoginAccount: LoginAccount,
    LogoutAccount: LogoutAccount,
    FetchIngredient: FetchIngredient,
    FetchIngredients: FetchIngredients,
    FetchIngredientIssue: FetchIngredientIssue,
    FetchIngredientAlternatives: FetchIngredientAlternatives,
    CreateRecipe: CreateRecipe
};
