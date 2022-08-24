document.addEventListener('DOMContentLoaded',()=>{
    
    url = 'http://localhost:3000/pups'
    let dogData 
    const div = document.getElementById('dog-info')
    let dogDiv = document.getElementById('dog-bar')
    fetch(url)
    .then (resp=>resp.json())
    .then(data=>{
        renderDog(data)
        dogData = data;
        console.log(dogData);
        
    })
    setTimeout(()=>{console.log(dogData)},1000)
    console.log(dogData);
    const renderDog = (dogs)=>{
        dogs.forEach(dog=>{
            console.log(dog.name);
            let dogName = document.createElement('span')
            dogName.innerHTML = dog.name
            dogDiv.appendChild(dogName)
            dogName.addEventListener('click', ()=> {
                console.log('clicked');
                displayDog(dog)
            })
        })  
    }
    const displayDog = (dog)=>{
        console.log(dog);
        let dogStatus 
        if (dog.isGoodDog){
            dogStatus = 'Good Dog!'
        }else{
            dogStatus = 'Bad Dog!'
        }
        const image = document.createElement("img")
        image.setAttribute("src",dog.image)
        const h2 = document.createElement("h2")
        h2.textContent = dog.name
        const button = document.createElement("button")
        button.textContent = dogStatus
        div.textContent = ""
        div.appendChild(image)
        div.appendChild(h2)
        div.appendChild(button)
        button.addEventListener('click', ()=>{
            console.log('clicked');
            if(button.textContent==='Good Dog!'){
                dog.isGoodDog = false
                button.textContent='Bad Dog!'
            }else{
                dog.isGoodDog = true
                button.textContent='Good Dog!' 
            }
            updateStatus(dog)
        })      
    }
    let filterDogs = document.querySelector('.filterDogs')
    let goodDogFilter = document.querySelector('#good-dog-filter')
    console.log(goodDogFilter);
    console.log(filterDogs);
    goodDogFilter.addEventListener('click', ()=>{
        console.log('clicked');
        console.log(filterDogs.innerHTML);
        dogDiv.innerHTML = ""
        if(filterDogs.innerHTML === 'OFF'){
            filterDogs.innerHTML = 'ON'
            filterGoodDogs()      
        }else{
            filterDogs.innerHTML = 'OFF'
            renderDog(dogData)
        }
    })
    const filterGoodDogs = ()=>{
        console.log(dogData);
        const goodDogs = dogData.filter(dog=>{
            return dog.isGoodDog 
        })
        console.log(goodDogs);
        renderDog(goodDogs);
    }
    const updateStatus = (dogObj)=>{
        fetch(`http://localhost:3000/pups/${dogObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(dogObj)          
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
})