app.component('pokemon-list',
{
    template:
    /*html*/
    `
    <ul class="pokelist">
        <li v-for="p in pokemonArray" :key="p.id"><pokemon-card :pokemon="p"></pokemon-card></li>-->
    </ul>
    `,
    data() {
        return {
            pokemonArray: [],
            offset : -20 // so we can start at 20 on the frst iteration
        }
    },
    methods : {
        echo() {
            console.log("echo")
        },
        fetchList() {
            this.offset += 20
            return fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offset}`).then(function(data){
                return data.json()
            })
        }
    },
    mounted() {
        let that = this
        this.fetchList().then(function(data) {
            that.pokemonArray = data.results
        })
        this.echo()
    }
})