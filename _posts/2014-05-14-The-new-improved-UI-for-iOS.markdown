---
layout: post
title:  The new improved UI for iOS
author: Robert Leefmans
date:   2014-05-19 11:00:00
categories: blog
image:  SanFran-newUI.png
image-detail:  SanFran-newUI-detail.jpg
---
Our Rich Content Notification view is used to display the content that is sent with a notification. It can show a map, images, video or HTML, but, even better, Notificare makes this Rich Content actionable with Push Actions. These actions are displayed in an Action Sheet. 

Introducing new improved UI for iOS with the ‘More' icon for Actions

**Action Sheet**   
An Action Sheet displays a set of choices related to a task the user initiates.  
On iPhone, an action sheet emerges from the bottom of the screen.
On iPad, an action sheet is always displayed in a popover.  
<center><img src="/images/posts/actionsheet-iphone-ipad.png" alt="Action Sheet iOS"></center>

In our new User Interface we’ve improved the way the Action Sheet is triggered. 

## Introducing the ‘More' icon for Actions ##

<center><img src="/images/posts/actionsIcon@2x.png" alt="More Icon"></center>
With our new UI, when Push Actions are added to the Notification, the ‘More' icon appears in the top right corner, inside the Navigation Bar. We've removed the ‘Close' Icon from the Navigation Bar. Closing the message has to be done by tapping the ‘More' icon and then selecting ‘Close Message’ from the Action Sheet. By removing the ‘Close' button from the Navigation Bar the user is more inclined to use the Action Sheet. Also, a message cannot be closed by mistake anymore and you always see the available Actions before closing the message. These changes result in a better user experience while focussing the user on interacting with the message.

	
### iOS UI adjustments ###
* A ‘More' icon in the Navigation Bar
* Focus on the Action Sheet for Push Actions
* Opens the Action Sheet
* First action is always ‘Close Message’, which is displayed in red
* Default action is ‘Cancel’ on iPhone
* We recommend offering 2 or 3 actions for each message
* By tapping an image in the Rich Content View, an Activity Sheet is opened, giving you all the options for sharing or saving the image. 
* If there is no action at all, a ‘Close' icon still will appear on the top left inside the Navigation Bar
* Our UI also looks great in the ‘old’ iOS 6

Based on usability research, we came up with the new UI. This UI gives you a head start in your project with a neutral design. Of course, this is fully customizable for your app. You can change the colors to match your scheme, add your own icons, even add more icons to the navigation bar if you really want to. Enjoy the new UI for iOS!