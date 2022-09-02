// load main catagory data 

const loadCatagroyData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
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
}

const displayCatagoriesElement = elements =>{
    const catagoryElementContainer = document.getElementById('catagory-element-container')
    catagoryElementContainer.innerHTML = ''
    elements.forEach(element =>{
        catagoryElementContainer.innerHTML +=  `
        <div class="card my-3 mx-auto" style="max-width: 80%">
        <div class="row g-0">
            <div class="col-md-4 col-sm-12">
                <img src="${element.thumbnail_url}" class="img-fluid w-100" alt="...">
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${(element.details).slice(0, 200)}</p>
                    <div class="card-text d-flex justify-content-between align-items-center mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>img</div>
                            <div class="ms-2">
                                <p>name:</p>
                                <p>date:</p>
                            </div>
                        </div>
                        <div>akhan view</div>
                        <div>ratings</div>
                        <div>icon</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `

        console.log(element)
    })
}






























