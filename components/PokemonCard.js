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
            <em> #{{ getId }}</em>
        </div>
        <img :src="getImage"/>
        <button class="details" @click='demandDetails'>View Details</button>
    </div>`,
    methods: {
        demandDetails() {
            let payload = {
                id: this.getId
            }

            this.$emit('demand-details', payload)
        }
    },
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