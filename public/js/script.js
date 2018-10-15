(function() {
    new Vue({
        el: "#main",

        data: {
            heading: "Pix",
            subHeading: "the pix",
            images: []
        },
        mounted: function() {
            console.log("mounted");
            var self = this;
            axios
                .get("/image")
                .then(function(response) {
                    console.log("RESPONSE :", response);
                    console.log("1 :", response.data);
                    self.images = response.data;
                    console.log("2 :", response.data);
                })
                .catch(function(err) {
                    console.log("ERROR IN AXIOS :", err.message);
                });
        }
    });
})();

// (function() {
//     new Vue({
//         el: "#main",
//         data: {
//             heading: "My Vue App",
//             greetee: "World",
//             cities: []
//         },
//         mounted: function() {
//             var self = this;
//             axios
//                 .get("/cities")
//                 .then(function(response) {
//                     self.cities = response.data;
//                 })
//                 .catch(function(err) {});
//         },
//         methods: {
//             handleClick: function(e) {
//                 console.log("submits " + this.greetee);
//             },
//             handleMousedown: function(city) {
//                 console.log(city.name, city.country);
//             }
//         }
//     });
// })();
//
//

//app.$data ={heading:...}
//app.heading='My Vue App'

//data:{
//images:[],
//imageTopUpload:{}
//}
//input v-model="imageTouplaod.title" name:"title"
//input v-model="imageTouplaod.desc" name:"desc"
