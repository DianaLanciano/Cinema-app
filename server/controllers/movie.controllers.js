
export const getMovies = async (req, res) => {
    res.send('getMovies endpoint');
};

export const getMovie = async (req, res) => {
    console.log('getMovie function');
    res.send('getMovie endpoint');
};

export const getSearchResult = async (req, res) => {
    console.log('getSearchResult function');
    res.send('getSearchResult endpoint');
};

export const addMovie = async (req, res) => {
    console.log('addMovie function');
    
    res.send('addMovie endpoint');
};

export const updateMovie = async (req, res) => {
    res.send('updateMovie endpoint');
};

export const deleteMovie = async (req, res) => {
    res.send('deleteMovie endpoint');
};
