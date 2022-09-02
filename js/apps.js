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
    elements.forEach(element =>{
        const catagoryElementContainer = document.getElementById('catagory-element-container')
        catagoryElementContainer.innerHTML +=  `
        <div class="card my-3 mx-auto" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
        </div>
        `

        console.log(element)
    })
}






























