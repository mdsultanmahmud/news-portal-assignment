// load main catagory data 

const loadCatagroyData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
        .catch(error => {
            console.log(error)
        })
}

loadCatagroyData()

// display all catagory name in website 

const displayCatagory = catagories => {
    const catagoryContainer = document.getElementById('catagory-container')
    catagories.forEach(catagory => {
        const catagoryName = catagory.category_name
        catagoryContainer.innerHTML += `
        <li onclick="spinAndDataLoad('${catagory.category_id}', 'true')">${catagoryName}</li>
        `
    })
}

// two function call at once 
const spinAndDataLoad =(id, isTrue) =>{
    loadElementOfCat(id)
    spin(isTrue)
}


// spinner when data are loading 
const spin = isTrue => {
    if (isTrue) {

        document.getElementById('spinner').classList.remove('d-none')
    } else {
        document.getElementById('spinner').classList.add('d-none')

    }
}


const loadElementOfCat = (catId) => {
    const catagoryElementContainer = document.getElementById('catagory-element-container')
    catagoryElementContainer.innerHTML = ''
    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
        .then(res => res.json())
        .then(data => sortedData(data.data))
        .catch(error => {
            console.log(error)
        })

}


// sort data based on total_view 
const sortedData = items =>{
    // here I sort data from all items based on total_view
    const unSortedData = []
    for(const item of items){
        unSortedData.push(item.total_view)
    }
    const sortedArrayOfData = unSortedData.sort((a,b) => b - a)
    // find out main items based on  total_view and sort item
    const elements = []
    for(i = 0; i<sortedArrayOfData.length; i++){
        for(j = 0; j<items.length; j++){
            if(items[j].total_view === sortedArrayOfData[i]){
                elements.push(items[j])
                break
            }
        }
    }
    displayCatagoriesElement(elements)
    
}

// display total element of any category 
const displayCatagoriesElement = elements => {
    
    const catagoryElementContainer = document.getElementById('catagory-element-container')
    // show item count dom 
    document.getElementById('item-count-container').classList.remove('d-none')
    document.getElementById('item-count').innerText = `${elements.length > 0 ? elements.length : 'No News'} items found in this category`
    // check data empty or not 
    if(elements.length === 0){
        catagoryElementContainer.innerHTML= `<h2 class="text-center my-5"> No Data Found</h2>`
    }
    elements.forEach(element => {
        catagoryElementContainer.innerHTML += `
        <div class="card my-3 mx-auto" style="max-width: 80%">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${element.thumbnail_url}" class="img-fluid w-100" alt="...">
            </div>
            <div class="col-md-8 col-sm-12 p-2">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${(element.details).slice(0, 200)}...</p>
                    <div class="card-text d-flex justify-content-between align-items-center mt-4 flex-wrap">
                        <div class="d-flex justify-content-between align-items-center">
                            <div><img src="${element.author.img}" class="img-fluid me-3" style="width:60px; height:60px; border-radius:50%;" alt=""></div>
                            <div>
                                <p><strong>${(element.author.name) ? element.author.name : 'No Author Found'}</strong></p>
                                <p class="text-muted">${(element.author.published_date) ? (element.author.published_date) : 'No Date Found'}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="fa-sharp fa-solid fa-eye me-2"></i>
                            <strong>${(element.total_view) ? (element.total_view) : 'No View Found'}</strong>
                        </div>
                        <div><i style="cursor:pointer;" class="fa-solid fa-arrow-right text-danger " onclick="loadDetailsData('${element._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `
    })
    // spinner loading off here 
    spin(false)
}

// details data loading 
const loadDetailsData = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
        .then(news => news.json())
        .then(newsDetails => showNewsDetails(newsDetails.data[0]))
        .catch(error => {
            console.log(error)
        })
}

// showing details for every data 

const showNewsDetails = news => {
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = news.title
    
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <img src="${news.thumbnail_url}" style="width:150px; height:150px; border-radius:50%;" class="d-block mx-auto my-3" alt="">
    <p><strong>Category-Id: </strong>${(news.category_id) ? (news.category_id) : 'No ID Found'}<p>
    <p><strong>Author: </strong>${(news.author.name) ? (news.author.name) : 'No Author Found'}<p>
    <p><strong>Release: </strong>${(news.author.published_date) ? (news.author.published_date) : 'No Date Found'}<p>
    <p><strong>View: </strong>${(news.total_view) ? (news.total_view) : 'No View'}<p>
    <p><strong>Ratings: </strong>${(news.rating.number) ? (news.rating.number) : 'No Ratings Given'}<p>
  `
}

























