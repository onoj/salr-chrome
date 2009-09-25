// Copyright (c) 2009, Scott Ferguson
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the software nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY SCOTT FERGUSON ''AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL SCOTT FERGUSON BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Message event listener so that we can talk to the content-script
 *
 */
chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(data) {
        // Register the tab with the tagging page action
        chrome.pageActions.enableForTab("open_settings",
                                        { 
                                            tabId: port.tab.id,
                                            url: port.tab.url,
                                            title: "Click to open SALR settings",
                                            iconId: 0
                                        });
        // Respond with the username
        port.postMessage({
            'username': localStorage.getItem('username'),
            'userQuote': localStorage.getItem('user-quote'),
            'darkRead' : localStorage.getItem('dark-read'),
            'lightRead' : localStorage.getItem('light-read'),
            'darkNewReplies' : localStorage.getItem('dark-new-replies'),
            'lightNewReplies' : localStorage.getItem('light-new-replies'),
			'youtubeHighlight' : localStorage.getItem('youtube-highlight'),
            'hideAdvertisements' : localStorage.getItem('hide-advertisements'),
            'hideHeaderLinks' : localStorage.getItem('hide-header-links'),
            'hideFooterLinks' : localStorage.getItem('hide-footer-links'),
            'displayNewPostsFirst' : localStorage.getItem('display-new-posts-first'),
            'replaceImages' : localStorage.getItem('replace-images-with-links'),
			'inlineVideo' : localStorage.getItem('inline-video-links')
        });
    });
});

chrome.pageActions["open_settings"].addListener(function(pageActionId, reply) {
    onToolbarClick();
});

/**
 * Event handler for clicking on the toolstrip logo
 *
 * @param element - Toolstrip element
 */
function onToolbarClick() {
    window.open(chrome.extension.getURL('') + 'settings.html', 
                'salr-settings', 
                'location=0,scrollbars=0,toolbar=0,resizable=0,menubar=0,status=0,width=510,height=510');
}
