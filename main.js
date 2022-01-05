const app = Vue.createApp({
    data() {
        return {
            askedId : 0,
            showPopup : false
        }
    },
    methods: {
        show(payload) {
            //console.log("passage par la racine")
            this.askedId = Number(payload.id)
            this.showPopup = true
        },
        closePopup() {
            this.showPopup = false
        }
    }
})
