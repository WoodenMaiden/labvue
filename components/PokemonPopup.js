app.component('pokemon-popup',
{
    template:
    
    `<div class="popup" v-show="pokid">
        <span @click="closePopup" class="material-icons">
            close
        </span>
        <p>{{ this.pokid }}</p>
    </div>`,
    data()  {
        return {

        }
    },
    props: {
        pokid: {
            type :Number,
            required: true
        }
    },
    methods:{
        fetchInfos() {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then(function(data){
                return data.json()
            })
        },
        closePopup() {
            this.$emit('close-popup')
        }

    }
})