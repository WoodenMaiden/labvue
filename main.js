const app = Vue.createApp({
    data() {
        return {
            askedId : 0,
            showPopup : false
        }
    },
    methods: {
        findIdByName() {
            return new Promise((res, rej) => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${this.searchArg.toLowerCase()}`).then(function(data) {
                    data.json().then((jsondata) => {
                        res(jsondata.id)
                    })
                })
            })
        },
        show(payload) {
            //console.log("passage par la racine")
            this.askedId = Number(payload.id)
            this.showPopup = true
        },
        closePopup() {
            this.askedId = 0
            this.showPopup = false
        },
        showOnSubmit(){
            let args = {
                id: this.searchArg.toLowerCase()
            }

            if (args.id === "") return;

            if (parseInt(args.id, 10))
                this.show(args)
            else 
                this.findIdByName().then((data) => {
                    console.log(data)
                    this.show({
                        id: data
                    })
                })
        }
    }
})
