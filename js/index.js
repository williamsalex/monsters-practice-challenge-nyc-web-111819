let i = 1
document.addEventListener('DOMContentLoaded',(event) =>{
    render()
    function create(name, age, description){
        fetch('http://localhost:3000/monsters/'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: {
                name: name,
                age: age,
                description: description
            }
        }
    }
    function render(){
        let container = document.getElementById("monster-container")
        while (container.firstChild){
            container.removeChild(container.firstChild)
        }
        fetch(`http://localhost:3000/monsters/?_limit=50_page=${i}`,{
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .then(json =>{
            let yule = document.createElement('ul')
            container.appendChild(yule)
            json.forEach(element => {
                let lee = document.createElement('li')
                lee.innerText = element
                yule.appendChild(lee)
            })
        })
    }
    document.addEventListener('click',event => {
        if(event.target.id === 'forward'){
            i++
            render()
        }
        if(event.target.id === 'back'){
            i--
            render()
        }
        if(event.target.innerText === 'Create'){
            event.preventDefault()
            create(
                document.getElementById('name').value,
                document.getElementById('age').value,
                document.getElementById('description').value
            )
            document.getElementById('monster-form').reset()
        }
    })
})