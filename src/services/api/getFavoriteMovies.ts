const getFavoriteMovies = async () => {
    const response = await fetch('https://api-generator.retool.com/kJcM13/users_favorites')
    .then(res => res.json())
    return response;
}

export default getFavoriteMovies;