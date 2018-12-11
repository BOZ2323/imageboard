
do pagination before starting part 4
have a limit to the chunks of images you upload

SELECT * FROM images
WHERE id < $1
ORDER BY id DESC
LIMIT 9;


// to find the number of the last image in database
SELECT i FORM Images
ORDER BY id ASC
LIMIT 1

SELECT *,(
    SELECT i FORM Images
    ORDER BY id ASC
    LIMIT 1
)AS last FROM Images
WHERE id < 10
ORDER BY id DESC
LIMIT 9;



in index.html:
<button @click="getMore" class="button_home">more >></button>


methods: {
    getMore: function(){
        axios.get('/images/more' + this.images[this.images.length -1].id,
                instance.images = instanceimages.concat(response.data);
                if(!response.data.length){
                    instance.hasMore = false;
                    //hide the more button_home
                    //if the id of the last image you are showing is the id of the last image in the database
                    //in data set "has more" to true
                    if(instance.limages[instance.images.length -1]).id
                        instance.hasMore = false;
                }
        }
    }







when there are no more images, stop

PART 4

client side routing
associate with url javascript functions
on react: react router

on the final image board, I remove v-on click and replace it by an href:
<a :href="'#' + image.id";
I have a hashchange, that detects the id and opens the modal
change in data of orig vue:
imageId: location.hash.slice(1);
next: make all the links like this:
<a :href="'#' + image.id"; and add the eventlistener

mounted: function(){
    var me = this;
    addEventListener('hashchange');
}
watch:{
    id: function(){
        do exactly what you did in the mounted()
    }
}

closing the modal:

set location.hash to ''

google watcher
























<div id="main">
        <header>
            <h1>IMAGEbored</h1><i class="fas fa-kiwi-bird fa-2x"></i>
        </header>
        <!-- <img src="/img/logo.png" alt="ImageBored"> -->
        <!-- <h2>Add an Image Now!</h2> -->
        <!-- v-model doesnt work with files! -->
        <div class="uploadfield">
            <input v-model="imageToUpload.title" type="text" name="title" value="" placeholder="Image Title">
            <input v-model="imageToUpload.desc" type="text" name="desc" value="" placeholder="Description">
            <input v-model="imageToUpload.user" type="text" name="user" value="" placeholder="UserName">
            <input ref="fileInput" class="file" type="file" name="file" accept="image/*" @change="handleFileChange">
            <button v-on:click="upload" name="button">Upload</button>
        </div>
        <!-- <funky-chicken inline-template> makes sense for the modal. As there is only one.
            <h1>funky chicken</h1>
        </funky-chicken> -->
        <div class="section group">
            <div v-for="image in images" class="col span_1_of_4" v-if="images.length" :key="image.id">
                <div class="image">
                    <img v-on:click="modalpopup(image.id)" class="mainimages" :src="image.url" :alt="image.title">
                    <p v-on:click="modalpopup" >{{image.title}}
                </div>
            </div>
        </div>
        <image-zoom v-if="imageId" :id="imageId" @close="closeZoom"> </image-zoom>
    </div>



    <script type="text/x-template" id="modal">
        <!-- It needs to have only 1 ELEMENT!! -->
        <div class="modal">
            <!-- <h1><em>Funky Chickens</em></h1> -->
            <!-- <p>{{id}}</p> -->
            <div class="maincontent" v-for="image in imageData" v-if="imageData.length">
                <img class="mainimage" :src="image.url" :alt="image.title">
                <h2>{{image.title}}</h2>
                <p>
                    Description: {{image.description}} <br>
                    Submitted by: {{image.username}}
                </p>
                <h2>Add a Comment</h2>
                <div class="grid">
                    <p v-for="comment in comments" v-if="comments.length" class="gridcol">
                        {{comment.comment}}<br><br>
                        <span>Comment By: {{comment.username}}</span>
                    </p>
                </div>
            </div>
        </div>
    </script>
    <script src="/js/vue.js"></script>
    <script src="/js/axios.min.js"></script>
    <script src="/js/script.js"></script>
