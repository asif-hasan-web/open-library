
document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
document.getElementById('found-numbers').style.display = 'none';


const searchBook = () =>{
    
    const searchField = document.getElementById('search-input');
    // toggleSpinner('block');
    const searchText = searchField.value;
    // console.log(searchText);
    
    //clear data
    searchField.value ='';
    
    //  emty search request
    if(searchText == ''){
        displayError();
    }else{
        document.getElementById('spinner').style.display = 'block';
        // hide error
        document.getElementById('error-message').style.display = 'none';
        //clear search result
        document.getElementById('searchResult').textContent ='';

        document.getElementById('found-numbers').textContent = '';

         //load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBookResult(data))
        
    }
    
}


//error peramiter
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('found-numbers').textContent = '';

}

//display search result
const displayBookResult = books =>{
    // console.log(books);
    document.getElementById('found-numbers').textContent = '';
    const searchResult = document.getElementById("searchResult");
    searchResult.textContent= '';
    
    const bookList = books.docs;
    // console.log(books);

    if(bookList.length === 0){
        displayError(); //Show error
    }else{
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('found-numbers').style.display = 'block';
        document.getElementById('found-numbers').innerHTML = `Book Found ${books.numFound}, Showing ${bookList.length}`;

         //display in a card
         bookList.forEach(book =>{
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML= `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text mb-0">Author: ${book.author_name}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">First published date: ${book.publish_date}</small>
                </div>
            </div>
            
            `;
            searchResult.appendChild(div);
        });
    }
}