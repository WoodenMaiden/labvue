app.component('pokemon-list',
{
    template:
    /*html*/
    `<ul class="pokelist">
        <li v-for="p in pokemons"><pokemon-card></pokemon-card></li>
        <li><pokemon-card :pokemon='{ name: "blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/"}'></pokemon-card></li>
        <li><pokemon-card :pokemon='{ name: "metapod", url: "https://pokeapi.co/api/v2/pokemon/10/"}'></pokemon-card></li>
        <li><pokemon-card :pokemon='{ name: "butterfree", url: "https://pokeapi.co/api/v2/pokemon/11/"}'></pokemon-card></li>
        <li><pokemon-card :pokemon='{ name: "weedle", url: "https://pokeapi.co/api/v2/pokemon/12/"}'></pokemon-card></li>
    <ul>
    <ul>
    <!--<button @click="fetchPokemons">Liste</button>-->`,
    data() {
        return {
            pokemonArray: []
        }
    },
    methods : {
        fetchPokemons() {
            let fetch = new Promise(function(resolve, reject){
                let xhr = new XMLHttpRequest()
                xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon', true)

                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status <= 300) {
                        resolve({
                            message: 'OK',
                            response : xhr.response
                        })
                    }
                    else reject({
                        message: 'FAILED',
                        code: xhr.status
                    })
                } 
            
                xhr.onerror = function() {
                    reject({
                        message: 'FAILED',
                        code: xhr.status
                    })
                }
                xhr.send()
            })
            let ar = []
            fetch.then(function(data) {
                    response = JSON.parse(data.response)
                    //console.log(response.results])
                    
                    
                    for(let i = 0; i < response.results.length; ++i){
                        console.log(response.results[i])
                        ar.push(response.results[i])
                    }
                    console.log(ar)
                    
                })
                .catch(function(data) {
                   console.log(data)
            })  
            this.pokemonArray = ar
            console.log("fetchPokemons")
            console.log(this.pokemonArray)
        }
    }

})