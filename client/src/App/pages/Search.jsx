import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FetchRecipe, RecipeSearch } from '../requests/Api';

class SearchResultView {
    id;
    name;
    ingredients;
}

var searchResultStyle = {
    color: '#212529',
    borderBottom: '2px solid #ced4da'
};

var searchButtonStyle = {
    marginTop: '5px'
}

function Search({ history }) {
    const queryStrings = new URLSearchParams(window.location.search);
    const recipeNameFromUrl = queryStrings.get('name');
    const [searchValue, setSearchValue] = useState(recipeNameFromUrl);
    const [searchResults, setSearchResults] = useState([]);
    const [showMyRecipesValue, setShowMyRecipesValue] = useState(false);

    useEffect(() => {
        if (searchValue) {
            performSearch(searchValue);
        }
    }, []);

    history.listen((location, action) => {
        var newQueryStrings = new URLSearchParams(window.location.search);
        var newRecipeNameFromUrl = newQueryStrings.get('name');
        setSearchValue(newRecipeNameFromUrl);
        performSearch(newRecipeNameFromUrl);
    });

    const updateSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    const updateShowMyRecipesValue = (e) => {
        setShowMyRecipesValue(e.target.checked);
    }

    const onSearchSubmit = (e) => {
        performSearch(searchValue, showMyRecipesValue);
        e.preventDefault();
    };

    const performSearch = (name, includeUserOwnedRecipes = false) => {
        RecipeSearch(name, includeUserOwnedRecipes)
        .then(res => res.json())
        .then((apiResponse) => {
            return apiResponse.success
                ?   apiResponse.data.map(result => {
                        var searchResultView = new SearchResultView();
                        searchResultView.id = result.Id;
                        return searchResultView;
                    })
                : [];
        })
        .then(hydrateSearchResultViewList)
        .then(setSearchResults);
    }

    function hydrateSearchResultViewList(list) {
        return new Promise(function(resolve, reject) {
            var promises = [];

            list.forEach(searchResult => {
                var promise = FetchRecipe(searchResult.id)
                    .then(res => res.json())
                    .then(fetchResult => {
                        if (fetchResult.success) {
                            searchResult.name = fetchResult.data.name;
                            searchResult.ingredients = fetchResult.data.ingredients;
                        } else {
                            searchResult.name = null;
                            searchResult.ingredients = null;
                        }
                    });
                promises.push(promise);
            });

            Promise.all(promises)
                .then(() => {
                    console.log(list);
                    resolve(list);
                    });
                });
    }

    const createNoResultItem = () => {
        return (
            <div className="row">
                No results
            </div>
        );
    }

    const createResultItem = (searchResultViewItem) => {
        return (searchResultViewItem.name)
            ? (<Link to={"/recipe/" + searchResultViewItem.id} key={searchResultViewItem.id}>
                    <div className="column mb-2" style={searchResultStyle}>
                        <h5 className="text-left mb-3">{searchResultViewItem.name}</h5>
                        <h6 className="text-left">Ingredients:</h6>
                        <p className="text-left">{searchResultViewItem.ingredients.reduce(function(total, current) {
                            return (total.length > 0)
                                ? total + ', ' + current.Name
                                : current.Name;
                        }, '')}</p>
                        <p className="text-left">Potential issues: {searchResultViewItem.ingredients.reduce(function(total, current) {
                            return Number(total) + Number(current.HasIssue);
                        }, 0)}</p>
                    </div>
                </Link>)
            : <React.Fragment key={searchResultViewItem.id}/>;
    }

    // Search menu
    const searchForm = (
        <form className="d-flex">
            <div className="mr-sm-2 text-left">
                <input className="form-control mr-sm-2" type="text" placeholder="Search for a recipe" aria-label="Search" value={searchValue} onChange={updateSearchValue} />
                <label><input name="showMine" type="checkbox" checked={showMyRecipesValue} onChange={updateShowMyRecipesValue}/> Show my recipes</label>
            </div>
            <div className="mr-sm-2">
                <button className="btn btn-dark" style={searchButtonStyle} type="submit" onClick={onSearchSubmit}>Search</button>
            </div>
        </form>
    );

    // Result list
    const resultList = (
        searchResults.length > 0
        ? searchResults.map(x => createResultItem(x))
        : createNoResultItem()
    );

    // Page
    const page = (
        <div className="d-flex flex-column">
            <div className="p-3 d-flex flex-row flex-grow-1">
                <div className="col-md-4">{searchForm}</div>
                <div className="col-md-8 border flex flex-column overflow-auto">{resultList}</div>
            </div>
        </div>
    );

  return (
    page
  );
}

export default withRouter(Search);