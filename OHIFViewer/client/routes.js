import { Router } from 'meteor/iron:router';
import { OHIF } from 'meteor/ohif:core';

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'layout'
});

Router.onBeforeAction('loading');

Router.route('/', function() {
    Router.go('studylist', {}, { replaceState: true });
}, { name: 'home1' });

Router.route('/studylist', function() {
    this.render('ohifViewer', { data: { template: 'studylist' } });
}, { name: 'studylist' });

Router.route('/study/:studyInstanceUid', function() {
    /*const studyInstanceUids = this.params.studyInstanceUids.split(';');*/
    const studyInstanceUid = this.params.studyInstanceUid;
    OHIF.viewerbase.renderViewer(this, studyInstanceUid, 'ohifViewer');
}, { name: 'viewerStudies' });

Router.route('/viewer/:studyInstanceUids', function() {
    const studyInstanceUids = this.params.studyInstanceUids.split(';');
    OHIF.viewerbase.renderViewerOrthanc(this, { studyInstanceUids }, 'ohifViewer');
}, { name: 'viewerStudiesOrthanc' });
/*Router.route('/study/:studyInstanceUid', function() {
    const studyInstanceUid = this.params.studyInstanceUid;
    OHIF.studybase.renderViewer(this, studyInstanceUid, 'ohifStudyViewer');
}, { name: 'viewerStudybase' });*/

// OHIF #98 Show specific series of study
/*Router.route('/study/:studyInstanceUid/series/:seriesInstanceUids', function () {
    const studyInstanceUid = this.params.studyInstanceUid;
    const seriesInstanceUids = this.params.seriesInstanceUids.split(';');
    OHIF.viewerbase.renderViewer(this, { studyInstanceUids: [studyInstanceUid], seriesInstanceUids }, 'ohifViewer');
}, { name: 'viewerSeries' });*/