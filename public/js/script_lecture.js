(function(){
    console.log('yo');
    new Vue({
        el:  '#main',//selector for element, creates an instance
        data: {
            heading: 'My Vue App',
            className: 'funky',
            greetee: 'Lilli'
        },
        methods: {
            handleClick: function(e) {
                console.log('submit' + this.greetee);
            },
            handleMousedown: function(e) {
                console.log('submit' + this.city);
            },
            created: function( {
                console.log('created');
            },
            mounted: function( {
                var self = this;
                axios.get('/cities').then(function(response){
                    self.cities = response.data;
                    console.log('response');
                })
                .catch(function(err){

                });
                axios.post()
            })


        }

    });
}());
