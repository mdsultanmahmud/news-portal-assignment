// load main catagory data 

const loadCatagroyData = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
}

loadCatagroyData()

// display all catagory name in website 

const displayCatagory = catagories =>{
   catagories.forEach(catagory =>{
    const catagoryName = catagory.category_name
    const catagoryContainer = document.getElementById('catagory-container')
    const li = document.createElement('li')
    li.classList.add('nav-link')
    li.innerText = catagoryName
    catagoryContainer.appendChild(li)
   })
}