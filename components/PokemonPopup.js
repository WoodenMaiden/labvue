app.component('pokemon-popup',
{
    template:
    /*html*/
    `<div class="popup" v-show="pokid">
        <span @click="closePopup" class="material-icons close">
            close
        </span>
        <h1>{{ this.pokdata.name }}</h1>
        <p>#{{ this.pokid }}</p>
        
        <img class="image" :src="this.image"/>
        <ul class="listType">
            <li v-for="t in this.types">
                <img class="type" :src="this.typesIcons[t]"/>
                <p>{{ t }}</p>
            </li>
        </ul>
        <p>"{{ this.flavor }}"</p>
    </div>`,
    data()  {
        return {
            pokdata: {},
            flavor: "", 
            image: "",
            types: [],
            typesIcons: {
                "Bug":"https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg",
                "Dark":"https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg",
                "Dragon":"https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg",
                "Electric":"https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg",
                "Fairy":"https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg",
                "Fighting":"https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg",
                "Fire":"https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg",
                "Flying":"https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg",
                "Ghost":"https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg",
                "Grass":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg",
                "Ground":"https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg",
                "Ice":"https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg",
                "Normal":"https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg",
                "Poison":"https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg",
                "Psychic":"https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg",
                "Rock":"https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg",
                "Steel":"https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg",
                "Water":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg"
            }
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
            return new Promise((res, rej) => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokid}`).then((data) => {
                    data.json().then((jsondata) => {
                        res(jsondata)
                    })
                })
            })
        },
        closePopup() {
            this.$emit('close-popup')
        },
        fetchFlavour() {
            return new Promise((res, rej) => {
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.pokid}/`).then((data) =>{
                    data.json().then( (jsondata) => {
                        let returned = jsondata.flavor_text_entries[0].flavor_text
                        res(returned)
                    })
                })
            })
            
        }
    },
    mounted() {
        let that = this

        this.fetchFlavour().then(function(data){
            that.flavor = data
        })

        this.fetchInfos().then(function(data){
            that.pokdata = Object.assign(that.pokdata, data)
            for (let i= 0; i < that.pokdata.types.length; ++i){
                let toUp = that.pokdata.types[i].type.name.charAt(0).toUpperCase() + that.pokdata.types[i].type.name.slice(1)
                that.types.push(toUp)   
            }
        })

        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokid}.png` 
    }
    
})
