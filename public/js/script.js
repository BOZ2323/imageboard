


Vue.component('image-modal', {
    template: '#zoomtmp',
    data: function(){ //provides data as a function, when you change sth here, it will change everywhere in the file
        return {
            heading: 'zoom pix'
        };
    },
    props: ['id', 'name','country','comment'],


    mounted: function(){
        console.log('component has mounted');
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
        handleChange: function(){
            console.log('hi');
        },
        click: function(){
            this.heading  = this.id + '' + this.heading2;
            this.$emit('change', 'I love change');//1st arg = name, 2.arg =
            //>> add to methods: handleChange;
        },
        // zoom: function(id){ //to formData object append all the data you need
        //     console.log("zoom works", id);
        //     // var formData = new FormData;
        //     // formData.append('file', this.file);//name of field you are adding and the file
        //     // formData.append('desc', this.desc);
        //     // formData.append('title', this.title);
        //     // formData.append('username', this.username);
        //     // axios.post('/zoom', formData );
        //
        //     // var me = this;
        //     // axios.post('/zoom', formData).then(function (response) {
        //     //     me.images.unshift(response.data[0]);
        //     // });
        // }
    }
});



new Vue({
    el: "#main",

    data: {
        imageId: null,
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
        zoom: function(id){
            console.log("here is the id: ",id);
            this.imageId = id;

            // axios.get('/zoom', this.imageId).then(function (response) {
            //     this.images.unshift(response.data[0]);
            //     console.log(response.data);
            // });

        },
        upload: function(){ //to formData object append all the data you need
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
