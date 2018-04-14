import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { OHIF } from 'meteor/ohif:core';
import { viewportUtils } from '../../../lib/viewportUtils';
import { switchToImageRelative } from '../../../lib/switchToImageRelative';
import { switchToImageByIndex } from '../../../lib/switchToImageByIndex';

Template.contextMenu.onCreated(() => {

});

Template.contextMenu.onRendered(() => {

});

Template.contextMenu.onDestroyed(() => {
    const instance = Template.instance();
    // remove resize handler...
    instance.setResizeHandler(null);
});

Template.contextMenu.events({
    'click #context_wl'(event){
        document.getElementById('wwwc').click();
    },
    'click #context_pan'(event){
        document.getElementById('pan').click();
    },
    'click #context_zoom'(event){
        document.getElementById('zoom').click();
    },
    'click #context_reset'(event){
        document.getElementById('resetViewport').click();
    },
    'click #context_clear'(event){
        document.getElementById('clearTools').click();
    },
    'click #contextMenu'(event){
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = "none";
        if(event.which == 1){
            console.log("abc");
        }
    },
    'mousedown #contextMenu'(event){
        if(event.which != 1){
            event.preventDefault();
        }
    }
});

Template.contextMenu.helpers({

});
