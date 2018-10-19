


Vue.component('image-modal', {
    template: '#zoomtmp',
    data: function(){ //provides data as a function, when you change sth here, it will change everywhere in the file
        return {
            imageData: '',
            username: '',
            comment: '',
            comments: '',
            uploadedComment: {}
        };
    },
    props: ['id'],


    mounted: function(){
        console.log('component has mounted');
        var self = this;
        axios
            .get("/zoom/" + this.id)
            .then(function(response) {
                self.imageData = response.data;
                console.log(" self.imageData:", self.imageData);
            })
            .catch(function(err) {
                console.log("ERROR IN AXIOS :", err.message);
            });
        axios.get("/comments/" + this.id)
            .then(function(response) {
                self.comments = response.data;
                console.log('self.comments', self.comments);
            })
            .catch(function(err) {
                console.log("ERROR IN GET comments :", err.message);
            });

    },
    methods: {
        handleChange: function(){

        },
        click: function(){
            this.heading  = this.id + '' + this.heading2;
            this.$emit('change', 'I love my couch');
        },
        upcomments: function(){
            var self = this;
            self.uploadedComment.image_id = self.id;
            console.log('self.uploadedComment ',self.uploadedComment);

            axios.post('/upcomments/' + self.id,
                self.uploadedComment
            )
                .then(function (response) { // second argument
                    self.uploadedComment.unshift(response.data[0]);
                    console.log('response.data[0]', response.data[0].comment);


                });
        }
    }
});



new Vue({
    el: "#main",

    data: {
        imageId: null,
        heading: "pixu",
        subHeading: "",
        images: [],
        comments: [],
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
                self.images = response.data;
            })
            .catch(function(err) {
                console.log("ERROR IN GET images :", err.message);
            });


    },
    methods: {
        handleFileChange: function(e){
            this.file = e.target.files[0];
        },
        zoom: function(id){
            console.log("here is the id: ",id);
            this.imageId = id;
        },
        upload: function(){ //to formData object append all the data you need
            var formData = new FormData;
            formData.append('file', this.file);//name of field you are adding and the file
            formData.append('desc', this.desc);
            formData.append('title', this.title);
            formData.append('username', this.username);
            axios.post('/upload', formData );

            var self = this;
            axios.post('/upload', formData).then(function (response) {
                self.images.unshift(response.data[0]);

            });
        }
    }
});
