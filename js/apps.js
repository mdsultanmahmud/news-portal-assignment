// load main catagory data 

const loadCatagroyData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
    .catch(error =>{
        console.log(error)
    })
}

loadCatagroyData()

// display all catagory name in website 

const displayCatagory = catagories => {
    catagories.forEach(catagory => {
        const catagoryName = catagory.category_name
        const catagoryContainer = document.getElementById('catagory-container')
        catagoryContainer.innerHTML += `
        <li onclick="loadElementOfCat('${catagory.category_id}')">${catagoryName}</li>
        `
    })

}



// loading data of catagory element 
const loadElementOfCat = (catId) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${catId}`)
    .then(res => res.json())
    .then(data => displayCatagoriesElement(data.data))
    .catch(error =>{
        console.log(error)
    })
}

const displayCatagoriesElement = elements =>{
    const catagoryElementContainer = document.getElementById('catagory-element-container')
    catagoryElementContainer.innerHTML = ''
    document.getElementById('item-count-container').classList.remove('d-none')
    document.getElementById('item-count').innerText = `${elements.length} items found for`
    elements.forEach(element =>{
        catagoryElementContainer.innerHTML +=  `
        <div class="card my-3 mx-auto" style="max-width: 80%">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${element.thumbnail_url}" class="img-fluid w-100" alt="...">
            </div>
            <div class="col-md-8 col-sm-12 p-2">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${(element.details).slice(0, 200)}</p>
                    <div class="card-text d-flex justify-content-between align-items-center mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div><img src="${element.author.img}" class="img-fluid me-3" style="width:80px; height:80px; border-radius:50%;" alt=""></div>
                            <div>
                                <p><strong>${(element.author.name) ? element.author.name : 'No Author Found'}</strong></p>
                                <p class="text-muted">${(element.author.published_date) ? (element.author.published_date) : 'No Date Found'}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="fa-sharp fa-solid fa-eye me-2"></i>
                            <strong>${(element.total_view)? (element.total_view): 'No View Found'}</strong>
                        </div>
                        <div><i class="fa-solid fa-arrow-right text-danger"></i></div>
                    </div>
                    <button  onclick="loadDetailsData('${element._id}')" class="btn btn-danger d-block mx-auto px-4 py-2 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
            </div>
        </div>
        </div>
        `
    })
}


const loadDetailsData = newsId =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    fetch(url)
    .then(news => news.json())
    .then(newsDetails => showNewsDetails(newsDetails.data[0]))
    .catch(error =>{
        console.log(error)
    })
}

// showing details for every data 

const showNewsDetails = news => {
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



























