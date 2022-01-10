app.component('pokemon-list',
{
    template:
    
    `<ul class="pokelist" >
        <li v-for="p in pokemonArray" :key="p.id">
            <pokemon-card @demand-details="detailsToApp" :pokemon="p"></pokemon-card> 
        </li>
    </ul>
    `,
    data() {
        return {
            pokemonArray: [],
            offset : -20 // so we can start at 20 on the first iteration
        }
    },
    methods : {
        fetchList() {
            this.offset += 20
            return fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offset}`).then(function(data){
                return data.json()
            })
        },
        detailsToApp(payload) {
            //console.log("passé par la liste")
            this.$emit('details-to-app', payload)
        }
    },
    mounted() {
        
        this.fetchList().then((data) => {
            this.pokemonArray = data.results
        })
        window.onscroll = (e) => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                that.fetchList().then((data) => {
                    for (let i= 0; i < data.results.length; ++i){
                        this.pokemonArray.push(data.results[i])
                        //TODO (Optionnal) Consider checking if piture is available because some pokemons return a 404
                    }
                })
            }
        };
    }
})