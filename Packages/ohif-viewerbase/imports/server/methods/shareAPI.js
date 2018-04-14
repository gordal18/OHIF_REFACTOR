import { Meteor } from 'meteor/meteor';
Meteor.methods({
    /**
     * Retrieves Study metadata given a Study Instance UID
     * This Meteor method is available from both the client and the server
     */
    ShareAPI: function(apiData) {
        const url = "https://ivdev.scriptsender.com/api/image_viewer/share/create";
        console.log("shareAPI");
        console.log(apiData);
        try {
            var callResponse = HTTP.post(url, 
                { 
                    data:{
                        "url": "abcd",
                        "image-share-email": apiData.email,
                        "image-share-password": apiData.password,
                        "image-share-message": apiData.message,
                        "image-share-duration": parseInt(apiData.duration) 
                    }
                });
            console.log("shareAPI");
            return callResponse.content;
        }catch ( e ) {
            console.log( "Cannot get " + apiData, e );
        }
    }
});
