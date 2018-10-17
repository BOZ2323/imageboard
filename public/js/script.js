(function() {
    new Vue({
        el: "#main",

        data: {
            heading: "pixu",
            subHeading: "",
            images: [],
            title: '',
            desc: '',
            username:'',
            first:'',
            file: ''
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
        },
        methods: {
            handleFileChange: function(e){
                this.file = e.target.files[0];
            },
            upload: function(){ //to formData object append all the data you
                var formData = new FormData;
                formData.append('file', this.file);//name of field you are adding and the file
                formData.append('desc', this.desc);
                formData.append('title', this.title);
                formData.append('username', this.username);
                axios.post('/upload', formData );

                var me = this;
                axios.post('/upload', formData).then(function (response) {
                    me.images.unshift(response.data[0]);
                });
            }
        }
    });
})();
