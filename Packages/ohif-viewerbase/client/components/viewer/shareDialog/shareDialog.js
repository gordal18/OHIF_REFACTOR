import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { OHIF } from 'meteor/ohif:core';
import { cornerstone, cornerstoneTools } from 'meteor/ohif:cornerstone';
OHIF.viewerbase.getshareDialogAnnotationTools = () => {
    return ['length', 'probe', 'simpleAngle', 'arrowAnnotate', 'ellipticalRoi', 'rectangleRoi'];
};

function share(){
    //ShareDialog API
    const email = document.getElementById("image-share-email").value;
    const password = document.getElementById("image-share-password").value;
    const mobile = document.getElementById("image-share-mobile").value;
    const message = document.getElementById("image-share-message").value;

    var sel = document.getElementById("duration");
    const duration = sel.options[sel.selectedIndex].value;
    var studyInstanceUid = OHIF.viewer.studies[0].studyInstanceUid;
    var apiURL = 'https://ivdev.scriptsender.com/api/';
    var apiURL = apiURL + 'PACS/export/dicom/'+ studyInstanceUid;

    const data = {
        apiURL: apiURL,
        study_description: OHIF.viewer.studies[0].studyDescription,
        study_date : OHIF.viewer.studies[0].studyDate,
        study_time : OHIF.viewer.studies[0].seriesList[0].studyTime,
        email: email,
        password: password,
        mobile: mobile,
        message: message,
        duration: duration
    };
    Meteor.call('ShareAPI', data, function(err, response){
        console.log(response);
    });
    // HTTP.call('POST','https://new.scriptsender.com/api/image_viewer/share/create', 
    //     {
    //         data:{
    //                 "study_description": OHIF.viewer.studies[0].studyDescription,
    //                 "study_date" : OHIF.viewer.studies[0].studyDate,
    //                 "study_time" : OHIF.viewer.studies[0].studyTime,
    //                 "image-share-email": email,
    //                 "image-share-password": password,
    //                 "image-share-mobile": mobile,
    //                 "image-share-message": message,
    //                 "image-share-duration": duration
    //             }
    //     }, 
    //     (error, result) => {
    //       if (!error) {
    //         console.log(result);    
    //         }
    // });
}

Template.shareDialog.onRendered(() => {

    //ShareDialog
    const instance = Template.instance();
    const dialog = instance.$('#shareDialog');
    dialogPolyfill.registerDialog(dialog.get(0));
});

Template.shareDialog.events({
    'click .btn-cancel'(event, instance) {
        // Action canceled, just close dialog without calling callback
        const dialog = instance.$('#shareDialog');
        dialog.get(0).close();
    },
    'click .btn-confirm'(event, instance){
        share();
    }
});

Template.shareDialog.helpers({
    keepAspect() {
        return Template.instance().keepAspect.get();
    },

    showQuality() {
        const instance = Template.instance();
        instance.changeObserver.depend();
        if (!instance.form) return true;
        return instance.form.item('type').value() === 'jpeg';
    }
});
