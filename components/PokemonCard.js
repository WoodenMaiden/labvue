app.component('pokemon-card', 
{
    props: {
        pokemon : {
            type: Object,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="card">
        <div class="cardheader">
            <h1>{{ pokemon.name }}</h1>
            <p> #{{ getId }}</p>
        </div>
        <img class="pokemonimage" :src="getImage"/>
        <button class="details">View Details</button>
    </div>`,
    computed:{
        getId(){
            const splitted = this.pokemon.url.split('/')
            return splitted[splitted.length - 2]
        },
        getImage() {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getId}.png`
        }
    }

})