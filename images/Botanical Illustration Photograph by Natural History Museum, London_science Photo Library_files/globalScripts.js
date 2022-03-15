    // Common Scripts for All Pages

    var timeoutopen    = 200;
    var timeoutclose = 500;
    var closetimer = 0;
    var opentimer = 0;
    var dropDownMenuItem = 0;
    var dropDownMenuSourceItem = 0;
    var flaguserenteringkeyword = 0;
    menubaroverrideflag = 1;

    var closetimersearchtypeoptionsheader = 0;
    var globalFocusTrap;

    var httpobject = [];
    var requestcount = 0;

    function newHttpReq()
    {
        var newRequest = null;

        try
        {
            newRequest = new XMLHttpRequest();
        }
        catch(trymicrosoft)
        {
            try
            {
                newRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(othermicrosoft)
            {
                try
                {
                    newRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(failed)
                {
                    newRequest = null;
                }
            }
        }

        return newRequest;

    }

    function checksearchtagheader()
    {
        if(document.getElementById('searchtagheader'))
        {
            if(document.getElementById('searchtagheader').value == 'Search')
            {
                document.getElementById('searchtagheader').value = '';
                document.getElementById('searchtagheader').style.color = '#000000';
            }
        }
    }

    function keyDownSearchTypeOptionsHeader(targetId, theEvent)
    {
        theEvent = theEvent || window.event;
        if(theEvent.keyCode === 13)
        {
            showsearchtypeoptionsheader(targetId, 'keyDown');
        }
    }


    function showsearchtypeoptionsheader(targetId,triggerMethod)
    {
        triggerMethod = triggerMethod || 'default';

        cancelclosetimersearchtypeoptionsheader();

        if(targetId)
        {
            if(document.getElementById(targetId))
            {
                document.getElementById(targetId).style.display = 'inline-block';

                if(true || triggerMethod == 'keyDown')
                {
                    globalFocusTrap = focusTrap(document.getElementById(targetId),{onDeactivate: hidesearchtypeoptionsheader, clickOutsideDeactivates: true,});
                    globalFocusTrap.activate();
                }

                return;
            }
        }

        document.getElementById('searchtypeoptionsheaderdiv').style.display = 'inline-block';
    }


    function hidesearchtypeoptionstimeheader()
    {
        closetimersearchtypeoptionsheader = window.setTimeout(hidesearchtypeoptionsheader, 250);
    }

    function hidesearchtypeoptionsheader()
    {
        var elements = document.getElementsByClassName('searchTypeOptionsContainer');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].style.display = 'none';
        }

        if(document.getElementById('searchtypeoptionsheaderdiv'))
        {
            document.getElementById('searchtypeoptionsheaderdiv').style.display = 'none';
        }
        
        if(document.getElementById('searchFormHeaderInput'))
        {
            if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
            {
                globalFocusTrap.stopCallBack();
                globalFocusTrap.deactivate();
            }            
            
            document.getElementById('searchFormHeaderInput').focus();
        }
        
        if(document.getElementById('headerCustomSearchTag'))
        {
            if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
            {
                globalFocusTrap.stopCallBack();
                globalFocusTrap.deactivate();
            }            
            
            document.getElementById('headerCustomSearchTag').focus();
        }        
        
    }

    function cancelclosetimersearchtypeoptionsheader()
    {
        if(closetimersearchtypeoptionsheader)
        {
            window.clearTimeout(closetimersearchtypeoptionsheader);
            closetimersearchtypeoptionsheader = null;
        }
    }

    function toggleheaderoptions()
    {
        if(document.getElementById('headeroptionsdiv1').style.display != 'none')
        {
            document.getElementById('headeroptionsdiv1').style.display = 'none';
            document.getElementById('headeroptionsdiv2').style.display = 'inline-block';
        }
        else
        {
            document.getElementById('headeroptionsdiv1').style.display = 'inline-block';
            document.getElementById('headeroptionsdiv2').style.display = 'none';
        }
    }

    function detectsaveddiv()
    {
        if(document.getElementById('saveddiv'))
        {
            fadecounter = 100;
            setTimeout("fadeoutprogress()",2500);
        }
    }


    function showheadercurrencydiv()
    {
        document.getElementById('currencydivselect').style.display = 'inline-block';
        document.getElementById('currencydivlink').style.display = 'none';
    }


    function togglefootercurrency()
    {
        if(document.getElementById('currencylinkfooter').style.display == 'inline-block')
        {
            document.getElementById('currencylinkfooter').style.display = 'none';
            document.getElementById('currencyselectfooter').style.display = 'inline-block';
        }
        else
        {
            document.getElementById('currencylinkfooter').style.display = 'inline-block';
            document.getElementById('currencyselectfooter').style.display = 'none';
        }
    }


    function togglefooterunits()
    {
        if(document.getElementById('unitslinkfooter').style.display == 'inline-block')
        {
            document.getElementById('unitslinkfooter').style.display = 'none';
            document.getElementById('unitsselectfooter').style.display = 'inline-block';
        }
        else
        {
            document.getElementById('unitslinkfooter').style.display = 'inline-block';
            document.getElementById('unitsselectfooter').style.display = 'none';
        }
    }


    function fadeoutprogress()
    {

        var object = document.getElementById('saveddiv');

        object.style.filter = "alpha(opacity = " + fadecounter*1 + ")";
        object.style.opacity = fadecounter*0.01;

        fadecounter -= 1;

        if (fadecounter > 0)
        {
            t = setTimeout("fadeoutprogress()", 10);
        }
        else
        {
            object.parentNode.removeChild(object);
        }
    }


    function clearmenubaroverrideflag()
    {
        menubaroverrideflag = 0;
    }

    function mtoggle(id)
    {
        // close old layer
        if(dropDownMenuItem)
        {
            if(dropDownMenuItem.id != id)
            {
                dropDownMenuItem.style.visibility = 'hidden';
            }
        }

        dropDownMenuItem = document.getElementById(id);
        dropDownMenuItem.flagmobiledevice = 1;

        if(dropDownMenuItem.style.visibility != 'visible')
        {
            dropDownMenuItem.style.visibility = 'visible';

            if(id == 'mshop' && document.getElementById('headernavigationshoplink') && document.getElementById('headerarrow'))
            {
                var element = document.getElementById('headernavigationdiv');

                var xposition0 = 0;
                var yposition0 = 0;

                while(element)
                {
                    xposition0 += (element.offsetLeft);
                    yposition0 += (element.offsetTop);
                    element = element.offsetParent;
                }


                var element = document.getElementById('headernavigationshoplink');

                var xposition1 = 0;
                var yposition1 = 0;

                while(element)
                {
                    xposition1 += (element.offsetLeft);
                    yposition1 += (element.offsetTop);
                    element = element.offsetParent;
                }

                document.getElementById('headerarrow').style.left = (xposition1 - xposition0 + 8) + 'px';

            }

        }
        else
        {
            dropDownMenuItem.style.visibility = 'hidden';
        }
    }


    function userenteringkeyword()
    {
        flaguserenteringkeyword = 1;
    }


    // close shown layer
    function mclose()
    {
        menubaroverrideflag = 0;

        if(flaguserenteringkeyword == 1)
        {
            flaguserenteringkeyword = 0;
            return;
        }

        if(dropDownMenuItem)
        {
            if(dropDownMenuItem.flagmobiledevice == 1)
            {
                return;
            }

            dropDownMenuItem.style.visibility = 'hidden';
        }

        if(dropDownMenuSourceItem)
        {
            dropDownMenuSourceItem.className = dropDownMenuSourceItem.className.replace(' linkHighlighted', '');
        }

        if(document.getElementById('headerarrow'))
        {
            document.getElementById('headerarrow').style.visibility = 'hidden';
        }

        if(document.getElementById('headerarrow2'))
        {
            document.getElementById('headerarrow2').style.visibility = 'hidden';
        }
    }

    // go close timer
    function mclosetime()
    {
        mcancelopentime();
        closetimer = window.setTimeout(mclose, timeoutclose);
    }

    // cancel close timer
    function mcancelclosetime()
    {
        if(closetimer)
        {
            window.clearTimeout(closetimer);
            closetimer = null;
        }
    }

    function mcancelopentime()
    {
        if(opentimer)
        {
            window.clearTimeout(opentimer);
            opentimer = null;
        }
    }


    function closeoverride(id)
    {
        if(document.getElementById(id))
        {
            document.getElementById(id).style.visibility = 'hidden';
        }

        if(document.getElementById('headerarrow'))
        {
            document.getElementById('headerarrow').style.visibility = 'hidden';
        }

        if(document.getElementById('headerarrow2'))
        {
            document.getElementById('headerarrow2').style.visibility = 'hidden';
        }
    }

    // close layer when click-out
    document.onclick = mclose;
    document.onmousemove = clearmenubaroverrideflag();

    function showsmartphonesearch()
    {
        if(document.getElementById('headersearchdivnew'))
        {
            if(document.getElementById('headersearchdivnew').style.display != 'inline-block')
            {
                document.getElementById('headersearchdivnew').style.display = 'inline-block';
            }
            else
            {
                document.getElementById('headersearchdivnew').style.display = 'none';
            }
        }

        if(document.getElementById('headerartistwebsitesearchdiv'))
        {
            if(document.getElementById('headerartistwebsitesearchdiv').style.display != 'inline-block')
            {
                document.getElementById('headerartistwebsitesearchdiv').style.display = 'inline-block';
            }
            else
            {
                document.getElementById('headerartistwebsitesearchdiv').style.display = 'none';
            }
        }
    }

    function showwidgetsmartphonesearch()
    {
        if(document.getElementById('headerwidgetsearchdivnew'))
        {
            if(document.getElementById('headerwidgetsearchdivnew').style.display != 'inline-block')
            {
                document.getElementById('headerwidgetsearchdivnew').style.display = 'inline-block';
            }
            else
            {
                document.getElementById('headerwidgetsearchdivnew').style.display = 'none';
            }
        }

        if(document.getElementById('headerWidgetSearchDiv'))
        {
            if(document.getElementById('headerWidgetSearchDiv').style.display != 'inline-block')
            {
                document.getElementById('headerWidgetSearchDiv').style.display = 'inline-block';
            }
            else
            {
                document.getElementById('headerWidgetSearchDiv').style.display = 'none';
            }
        }
    }


    // New Navigation Functions
    function menuPreOpen2019(e)
    {
        e = e || window.event;
        e.stopPropagation();

        var eventSource = e.target || e.srcElement;
        var sourceId = eventSource.id;

        if(!sourceId)
        {
            sourceId = eventSource.parentNode.id;
        }

        if(document.getElementById(sourceId))
        {
            var targetId = document.getElementById(sourceId).getAttribute('data-targetMenuId');
        }           

        if(!targetId)
        {
            mcancelclosetime();
            mcancelopentime();            
            //console.log('menuPreOpen2019 NO TARGET - ' + targetId + ' - ' + sourceId);
            return;
        }
        
        //console.log('menuPreOpen2019 - ' + targetId + ' - ' + sourceId);

        mcancelclosetime();
        mcancelopentime();

        if(dropDownMenuItem)
        {
            if(dropDownMenuItem.style.visibility != 'hidden')
            {
                menuOpen(targetId,sourceId);
                return;
            }
        }

        opentimer = window.setTimeout(function() {menuOpen(targetId,sourceId);}, timeoutopen);
    }    
    
    

    function menuOpen(targetId,sourceId)
    {
        var flagShowArrow = 0;

        if(document.getElementById('headerarrow'))
        {
            document.getElementById('headerarrow').style.visibility = 'hidden';
        }

        if(document.getElementById('headerarrow2'))
        {
            document.getElementById('headerarrow2').style.visibility = 'hidden';
        }        
        
        if(document.getElementById(sourceId))
        {
            flagShowArrow = document.getElementById(sourceId).getAttribute('data-showarrow');
        }
        
        //console.log('targetId = ' + targetId + ' | sourceId = ' + sourceId + ' | flagShowArrow = ' + flagShowArrow);

        if(true && menubaroverrideflag == 1)
        {
            return;
        }
        
        // Cancel the close timer.
        mcancelclosetime();

        // Close the old menu.
        if(dropDownMenuItem)
        {
            dropDownMenuItem.style.visibility = 'hidden';
        }

        if(dropDownMenuSourceItem)
        {
            dropDownMenuSourceItem.className = dropDownMenuSourceItem.className.replace(' linkHighlighted', '');
        }

        // Get the new menu and show it.
        dropDownMenuItem = document.getElementById(targetId);
        dropDownMenuItem.style.visibility = 'visible';

        //console.log(dropDownMenuItem);

        if(document.getElementById(sourceId))
        {
            dropDownMenuSourceItem = document.getElementById(sourceId);

            var newClassName = dropDownMenuSourceItem.className + ' linkHighlighted';
            dropDownMenuSourceItem.className = newClassName;

            flagShowArrow = dropDownMenuSourceItem.getAttribute('data-showarrow');
        }

        if(flagShowArrow == 1 && document.getElementById('headerarrow'))
        {
            var element;

            if(document.getElementById('headernavigationdiv'))
            {
                element = document.getElementById('headernavigationdiv');
            }

            // This is for custom white-label websites (double-row navigation).
            if(document.getElementById('headerCustomNavigationMenuDiv'))
            {
                element = document.getElementById('headerCustomNavigationMenuDiv');
            }

            // This is for custom white-label websites (single-row navigation).
            if(document.getElementById('headerCustomNavigationSingleRowMenuDiv'))
            {
                element = document.getElementById('headerCustomNavigationSingleRowMenuDiv');
            }
            
            // This is for the new white-label websites for 2019.
            if(document.getElementById('headerNavigationDiv2019'))
            {
                element = document.getElementById('headerNavigationDiv2019');
            }            

            var xposition0 = 0;
            var yposition0 = 0;

            while(element)
            {
                xposition0 += (element.offsetLeft);
                yposition0 += (element.offsetTop);
                element = element.offsetParent;
            }


            var sourceElement = document.getElementById(sourceId);
            var width = sourceElement.offsetWidth;
            var height = sourceElement.offsetHeight;

            var arrowElement = document.getElementById('headerarrow');
            var widthArrow = arrowElement.offsetWidth;
            var heightArrow = arrowElement.offsetHeight;

            var xposition1 = 0;
            var yposition1 = 0;

            while(sourceElement)
            {
                xposition1 += (sourceElement.offsetLeft);
                yposition1 += (sourceElement.offsetTop);
                sourceElement = sourceElement.offsetParent;
            }

            var targetX = xposition1 - xposition0 + (width - widthArrow)/2;
            targetX = parseInt(targetX) + 'px';

            document.getElementById('headerarrow').style.left = targetX;
            document.getElementById('headerarrow').style.visibility = 'visible';
        }
    }

    function menuToggle2019(e)
    {
        e = e || window.event;
        //console.log(e);
        
        var eventSource = e.target || e.srcElement;
        var sourceId = eventSource.id;

        if(!sourceId)
        {
            sourceId = eventSource.parentNode.id;
        }
     
        //console.log('menuToggle2019 - ' + sourceId);
     
        if(document.getElementById(sourceId))
        {
            var targetId = document.getElementById(sourceId).getAttribute('data-targetMenuId');
            
            if(targetId)
            {
                //console.log('menuToggle2019 - ' + sourceId + ' - ' + targetId);
                e.preventDefault();
                
                mcancelclosetime();
                mcancelopentime();

                // Close old dropdown menu.
                if(dropDownMenuItem)
                {
                    if(dropDownMenuItem.id != targetId)
                    {
                        dropDownMenuItem.style.visibility = 'hidden';
                    }
                }

                dropDownMenuItem = document.getElementById(targetId);
                //dropDownMenuItem.flagmobiledevice = 1;

                if(dropDownMenuItem.style.visibility != 'visible')
                {
                    menuOpen(targetId,sourceId);
                }
                else
                {
                    dropDownMenuItem.style.visibility = 'hidden';

                    if(document.getElementById('headerarrow'))
                    {
                        document.getElementById('headerarrow').style.visibility = 'hidden';
                    }

                    if(document.getElementById('headerarrow2'))
                    {
                        document.getElementById('headerarrow2').style.visibility = 'hidden';
                    }
                }               
            }
        }
    }
    

    function menuKeyPress(e)
    {
        clearmenubaroverrideflag();
        
        e = e || window.event;

        var eventSource = e.target || e.srcElement;
        var sourceId = eventSource.id;

        if(!sourceId)
        {
            sourceId = eventSource.parentNode.id;
        }

        if(document.getElementById(sourceId))
        {
            var targetId = document.getElementById(sourceId).getAttribute('data-targetMenuId');

            if(e.keyCode === 13)
            {
                e.preventDefault();
                e.stopImmediatePropagation();

                mcancelclosetime();
                mcancelopentime();

                // Close old dropdown menu.
                if(dropDownMenuItem)
                {
                    if(dropDownMenuItem.id != targetId)
                    {
                        dropDownMenuItem.style.visibility = 'hidden';
                    }
                }

                dropDownMenuItem = document.getElementById(targetId);

                if(dropDownMenuItem.style.visibility != 'visible')
                {
                    menuOpen(targetId,sourceId);

                    dropDownMenuItem.dropDownLockFocus = focusTrap(dropDownMenuItem, {'onDeactivate': mclose, 'clickOutsideDeactivates': true,});
                    dropDownMenuItem.dropDownLockFocus.activate();

                }
                else
                {
                    dropDownMenuItem.style.visibility = 'hidden';

                    if(dropDownMenuItem.dropDownLockFocus)
                    {
                        dropDownMenuItem.dropDownLockFocus.deactivate();
                    }

                    if(document.getElementById('headerarrow'))
                    {
                        document.getElementById('headerarrow').style.visibility = 'hidden';
                    }

                    if(document.getElementById('headerarrow2'))
                    {
                        document.getElementById('headerarrow2').style.visibility = 'hidden';
                    }
                }

            }
    
        }
        
    }


    function toggleMobileNavigationDiv(targetAction)
    {
        var containers = document.getElementsByClassName('container');

        if(document.getElementById('mobileNavigationDiv').style.display != 'inline-block')
        {
            var body = document.body;
            var html = document.documentElement;

            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            height = height + 'px';

            for(var i = 0; i < containers.length; i++)
            {
                containers[i].style.marginLeft = '290px';
            }

            document.getElementById('mobileNavigationDiv').style.display = 'inline-block';
            document.getElementById('mobileNavigationDiv').style.width = '275px';
            document.getElementById('mobileNavigationDiv').style.height = height;

            document.getElementById('mobileNavigationBackgroundDiv').style.display = 'inline-block';
            document.getElementById('mobileNavigationBackgroundDiv').style.width = '100%';
            document.getElementById('mobileNavigationBackgroundDiv').style.height = '100%';
            showMobileMenu('mobileNavigationMenuMain');

            globalFocusTrap = focusTrap(document.getElementById('mobileNavigationDiv'),{'clickOutsideDeactivates': true, 'onDeactivate': toggleMobileNavigationDiv});
            globalFocusTrap.activate();
            
            if(targetAction == 'search')
            {
                if(document.getElementById('mobileNavigationSearchInput'))
                {
                    document.getElementById('mobileNavigationSearchInput').focus();
                }
            }
        }
        else
        {
            for(var i = 0; i < containers.length; i++)
            {
                containers[i].style.marginLeft = 'auto';
            }

            document.getElementById('mobileNavigationDiv').style.width = '0px';
            document.getElementById('mobileNavigationDiv').style.display = 'none';
            document.getElementById('mobileNavigationBackgroundDiv').style.width = '0%';
            document.getElementById('mobileNavigationBackgroundDiv').style.display = 'none';
            
            if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
            {
                globalFocusTrap.stopCallBack();
                globalFocusTrap.deactivate();
            }            
            
        }

         window.scrollTo(0, 0);
    }

    function showMobileMenu(menuId)
    {

        var menus = document.getElementsByClassName('mobileNavigationListContainer');

        for(var i = 0; i < menus.length; i++)
        {
            if(menus[i].id == menuId)
            {
                menus[i].style.display = 'inline-block';
            }
            else
            {
                menus[i].style.display = 'none';
            }
        }

    }

    function toggleMobileSubMenu(menuId)
    {
        if(document.getElementById(menuId).style.display != 'inline-block')
        {
            var menus = document.getElementsByClassName('mobileNavigationMenuSubList');

            for(var i = 0; i < menus.length; i++)
            {
                menus[i].style.display = 'none';
            }

            document.getElementById(menuId).style.display = 'inline-block';
        }
        else
        {
            document.getElementById(menuId).style.display = 'none';
        }
    }

    function selectSearchType(searchTypeId,searchTypeName)
    {
        var elements = document.getElementsByClassName('searchType');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].value = searchTypeId;
        }

        var elements = document.getElementsByClassName('searchTypeName');

        for(var i = 0; i < elements.length; i ++)
        {
            elements[i].innerHTML = searchTypeName;
        }

        hidesearchtypeoptionsheader();
    }

    function headerSearchFocus()
    {
        if(document.getElementById('searchFormHeader'))
        {
            var currentClassName = document.getElementById('searchFormHeader').className;
            if(currentClassName.indexOf('searchFormHeaderActivated') == -1)
            {
                var newClassName = currentClassName + ' searchFormHeaderActivated';
                document.getElementById('searchFormHeader').className = newClassName;
            }
        }
        
        if(document.getElementById('headerSearchTypeDiv'))
        {
            document.getElementById('headerSearchTypeDiv').style.display = 'inline-block';
        }

        if(document.getElementById('headerCustomSearchTypeDiv'))
        {
            document.getElementById('headerCustomSearchTypeDiv').style.display = 'inline-block';
        }
    }

    function customHeaderSearchFocus()
    {
        if(document.getElementById('headerCustomSearchForm'))
        {
            var currentClassName = document.getElementById('headerCustomSearchForm').className;
            if(currentClassName.indexOf('headerCustomSearchFormActivated') == -1)
            {
                var newClassName = currentClassName + ' headerCustomSearchFormActivated';
                document.getElementById('headerCustomSearchForm').className = newClassName;
            }
        }
        
        if(document.getElementById('headerCustomSearchTypeDiv'))
        {
            document.getElementById('headerCustomSearchTypeDiv').style.display = 'inline-block';
        }
    }    
    
    function createAddToCartForegroundAndBackgroundDiv()
    {
        var newdiv;
        var cssstyle;

        if(!document.getElementById('addToCartBackgroundDiv'))
        {
            // Background Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.50; filter: alpha(opacity=50);';
            newdiv.id = 'addToCartBackgroundDiv';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);
        }

        if(!document.getElementById('addToCartForegroundDiv'))
        {
            // Foreground Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; z-index: 5001; left: 0px; top: 0px; overflow: auto; padding: 0px; border: 1px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000; text-align: center;';
            newdiv.id = 'addToCartForegroundDiv';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);
        }

    }

    function showAddToCartForegroundAndBackgroundDiv()
    {
        var backgroundObject = document.getElementById('addToCartBackgroundDiv');
        backgroundObject.style.width = '100%';
        backgroundObject.style.height = '100%';
        backgroundObject.style.visibility = 'visible';

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        //alert(widthClient);

        if(heightClient < 400)
        {
            var widthTarget = parseInt(widthClient*0.95);
            var heightTarget = parseInt(heightClient*0.95);
        }
        else
        {
            if(widthClient > heightClient)
            {
                var widthTarget = parseInt(widthClient*0.80);
                var heightTarget = parseInt(heightClient*0.80);
            }
            else
            {
                var widthTarget = parseInt(widthClient*0.80);
                var heightTarget = parseInt(heightClient*0.80);
            }
        }



        var borderWidthTotal = 0;

        if((widthTarget + borderWidthTotal) > widthClient)
        {
            widthTarget = widthClient - borderWidthTotal;
        }

        if((heightTarget + borderWidthTotal) > heightClient)
        {
            heightTarget = heightClient - borderWidthTotal;
        }

        if(widthTarget > 900)
        {
            widthTarget = 900;
        }

        if(heightTarget > 800)
        {
            heightTarget = 800;
        }

        var offsetLeft = 0;
        var offsetTop = 0;

        var offsetX = 0;
        var offsetY = 0;

        if(document.documentElement.scrollTop && !document.body.scrollTop)
        {
            //offsetLeft = document.documentElement.scrollLeft;
            //offsetTop = document.documentElement.scrollTop;
        }
        else
        {
            //offsetLeft = document.body.scrollLeft;
            //offsetTop = document.body.scrollTop;
        }

        var addToCartForegroundDiv = document.getElementById('addToCartForegroundDiv');
        addToCartForegroundDiv.style.width = widthTarget + 'px';
        addToCartForegroundDiv.style.height = heightTarget + 'px';
        addToCartForegroundDiv.style.visibility = 'visible';
        addToCartForegroundDiv.innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; margin-top: 20px;'>";

        addToCartForegroundDiv.style.left = (offsetX + offsetLeft + parseInt((widthClient - (widthTarget + 0)) / 2)) + 'px';
        addToCartForegroundDiv.style.top = (offsetY + offsetTop + parseInt((heightClient - (heightTarget + 0)) / 2)) + 'px';

    }

    function globalAddToCartCompleteProductSku()
    {
		// Facebook
        if(simpleEcommerceId && typeof fbq == 'function')
        {
            fbq('track', 'AddToCart', {content_type: 'product', content_ids: [simpleEcommerceId], value: simpleEcommercePrice, currency: 'USD'});
        }
		
		// Pinterest
		if(simpleEcommerceId && typeof pintrk == 'function')
		{
		  pintrk('track', 'AddToCart', {
			value: simpleEcommercePrice,
			order_quantity: 1,
			currency: 'USD',
				line_items: [
					{
						product_id: simpleEcommerceId,
					},
				],
		  });
		}		

        createAddToCartForegroundAndBackgroundDiv();
        showAddToCartForegroundAndBackgroundDiv();

        var widthTarget = document.getElementById('addToCartForegroundDiv').style.width;
        var heightTarget = document.getElementById('addToCartForegroundDiv').style.height;

        widthTarget = widthTarget.replace('px','');
        heightTarget = heightTarget.replace('px','');

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('addToCartForegroundDiv').innerHTML = response[0];
                globalFocusTrap = focusTrap(document.getElementById('addToCartForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#buttonCheckout', 'onDeactivate': function(){globalHideAddToCartPopUp()}});
                globalFocusTrap.activate();

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);

                    if(responseData.hasOwnProperty('redirectUrl'))
                    {
                        if(responseData.redirectUrl !== '')
                        {
                            window.location = responseData.redirectUrl;
                            return;
                        }
                    }

                    if(responseData.hasOwnProperty('googleAnalyticsData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        
                        if(false)
                        {
                            window.dataLayer.push({
                                'event': 'addToCart',
                                'eventCategory': 'cart',
                                'eventAction': 'add',
                                'eventDescription': 'Add to Cart',
                                'ecommerce': responseData.googleAnalyticsData.ecommerce
                            });
                        }
                        else
                        {
                            window.dataLayer.push(responseData.googleAnalyticsData);
                        }
                    }
                }

                updateShoppingCartNumProducts();

            }


        };

        var postString = 'widthTarget=' + widthTarget + '&heightTarget=' + heightTarget;

        // http://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
        for (var i = 0; i < arguments.length; i++)
        {
            postString += '&completeProductSku[]=' + arguments[i];
        }

        var url = "/queries/queryAddToCart.php";

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }

    function globalAddToCartUniqueId(uniqueId, timeoutUrl, quantity)
    {
        createAddToCartForegroundAndBackgroundDiv();
        showAddToCartForegroundAndBackgroundDiv();

        if (typeof quantity == 'undefined')
        {
            quantity = 1;
        }

        var widthTarget = document.getElementById('addToCartForegroundDiv').style.width;
        var heightTarget = document.getElementById('addToCartForegroundDiv').style.height;

        widthTarget = widthTarget.replace('px','');
        heightTarget = heightTarget.replace('px','');

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('addToCartForegroundDiv').innerHTML = response[0];
                globalFocusTrap = focusTrap(document.getElementById('addToCartForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#buttonCheckout', 'onDeactivate': function(){globalHideAddToCartPopUp()}});
                globalFocusTrap.activate();

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);

                    if(responseData && responseData.hasOwnProperty('redirectUrl'))
                    {
                        if(responseData.redirectUrl !== '')
                        {
                            window.location = responseData.redirectUrl;
                            return;
                        }
                    }

                    if(responseData && responseData.hasOwnProperty('googleAnalyticsData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        
                        if(false)
                        {
                            window.dataLayer.push({
                                'event': 'addToCart',
                                'eventCategory': 'cart',
                                'eventAction': 'add',
                                'eventDescription': 'Add to Cart',
                                'ecommerce': responseData.googleAnalyticsData.ecommerce
                            });
                        }
                        else
                        {
                            window.dataLayer.push(responseData.googleAnalyticsData);
                        }
                    }
                    
					// Facebook
                    if(simpleEcommerceId && typeof fbq == 'function')
                    {
                        fbq('track', 'AddToCart', {content_type: 'product', content_ids: [simpleEcommerceId], value: simpleEcommercePrice, currency: 'USD'});
                    }
					
					// Pinterest
                    if(simpleEcommerceId && typeof pintrk == 'function')
                    {
					  pintrk('track', 'AddToCart', {
						value: simpleEcommercePrice,
						order_quantity: quantity,
						currency: 'USD'
					  });
                    }					
					
                }

                updateShoppingCartNumProducts();
            }
        };

        var postString = 'widthTarget=' + widthTarget + '&heightTarget=' + heightTarget + '&uniqueId=' + uniqueId + '&timeoutUrl=' + timeoutUrl + '&quantity=' + quantity;

        var url = "/queries/queryAddToCart.php";

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }

    function globalHideAddToCartPopUp()
    {
        document.getElementById('addToCartBackgroundDiv').style.visibility = 'hidden';
        document.getElementById('addToCartForegroundDiv').style.visibility = 'hidden';
        document.getElementById('addToCartForegroundDiv').innerHTML = '&nbsp;';

        if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
        {
            globalFocusTrap.stopCallBack();
            globalFocusTrap.deactivate();
        }
    }

    function checkForEnterSearchFormHeader(e)
    {
        if (e == null) {
            e = window.event;
        }

        if (e.keyCode === 13) {
            document.getElementById('searchFormHeader').submit();
        }
    }

    function checkForEnterHeaderCustomSearchForm(e)
    {
        if (e == null) {
            e = window.event;
        }

        if (e.keyCode === 13) {
            document.getElementById('headerCustomSearchForm').submit();
        }
    }

    function toggleMobileNavigation(parentDivId)
    {
        var currentClassName = document.getElementById(parentDivId).className;
        var newClassName = 'mobileNavigationElementContainer mobileNavigationElementContainerExpanded';

        if(currentClassName === newClassName)
        {
            newClassName = 'mobileNavigationElementContainer';
        }

        document.getElementById(parentDivId).className = newClassName;

    }

    function mobileNavigationSearchFocus()
    {
        var currentClassName = document.getElementById('mobileNavigationSearchForm').className;
        var additionalClassName = 'mobileNavigationSearchFormSelected';

        if(currentClassName.indexOf(additionalClassName) == -1)
        {
            document.getElementById('mobileNavigationSearchForm').className += ' ' + additionalClassName;
        }

        document.getElementById('mobileNavigationSearchTypeDiv').style.display = 'inline-block';

    }

    function selectMobileNavigationSearchType(searchType)
    {
        var newSearchType = searchType;
        var newSearchTypeName = document.getElementById('mobileNavigationSearchType-' + searchType).innerHTML;

        document.getElementById('mobileNavigationSearchType').value = searchType;
        document.getElementById('mobileNavigationSearchTypeName').innerHTML = newSearchTypeName;

        toggleMobileNavigation('mobileNavigationSearchTypeDiv');
    }

    // Determine which elements within a parent element can be reached by pressing the tab key on the keyboard.
    function getTabbableNodes(el, options)
    {
        options = options || {};

        var elementDocument = el.ownerDocument || el;

        var basicTabbables = [];
        var orderedTabbables = [];


        // A node is "available" if
          // - it's computed style
        var isUnavailable = createIsUnavailable(elementDocument);
        
          var candidateSelectors = [
            'input',
            'select',
            'a[href]',
            'textarea',
            'button',
            '[tabindex]',
          ];

          var candidates = el.querySelectorAll(candidateSelectors.join(','));

          if (options.includeContainer) {
            var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

            if (
              candidateSelectors.some(function(candidateSelector) {
                return matches.call(el, candidateSelector);
              })
            ) {
              candidates = Array.prototype.slice.apply(candidates);
              candidates.unshift(el);
            }
          }

          var candidate, candidateIndexAttr, candidateIndex;
          for (var i = 0, l = candidates.length; i < l; i++) {
            candidate = candidates[i];

            candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10)
            candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

            if (
              candidateIndex < 0
              || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
              || candidate.disabled
              || isUnavailable(candidate, elementDocument)
            ) {
              continue;
            }

            if (candidateIndex === 0) {
              basicTabbables.push(candidate);
            } else {
              orderedTabbables.push({
                index: i,
                tabIndex: candidateIndex,
                node: candidate,
              });
            }
          }

          var tabbableNodes = orderedTabbables
            .sort(function(a, b) {
              return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
            })
            .map(function(a) {
              return a.node
            });

          Array.prototype.push.apply(tabbableNodes, basicTabbables);

          return tabbableNodes;

    }

    function createIsUnavailable(elementDocument)
    {
        // Node cache must be refreshed on every check, in case
        // the content of the element has changed
        var isOffCache = [];

        // "off" means `display: none;`, as opposed to "hidden",
        // which means `visibility: hidden;`. getComputedStyle
        // accurately reflects visiblity in context but not
        // "off" state, so we need to recursively check parents.

        function isOff(node, nodeComputedStyle)
        {
            if (node === elementDocument.documentElement)
            {
                return false;
            }

            // Find the cached node (Array.prototype.find not available in IE9)
            for (var i = 0, length = isOffCache.length; i < length; i++)
            {
                if (isOffCache[i][0] === node)
                {
                    return isOffCache[i][1];
                }
            }

            nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

            var result = false;

            if (nodeComputedStyle.display === 'none')
            {
                result = true;
            }
            else if (node.parentNode)
            {
                result = isOff(node.parentNode);
            }

            isOffCache.push([node, result]);

            return result;
        }

        return function isUnavailable(node)
        {
            if (node === elementDocument.documentElement) return false;

            var computedStyle = elementDocument.defaultView.getComputedStyle(node);

            if (isOff(node, computedStyle)) return true;

            return computedStyle.visibility === 'hidden';
        }
    }

    var listeningFocusTrap = null;

    // Create a focus trap on the supplied element.
    function focusTrap(element, userOptions)
    {
        //console.log(element);
        
        var tabbableNodes = [];
        var firstTabbableNode = null;
        var lastTabbableNode = null;
        var nodeFocusedBeforeActivation = null;
        var active = false;
        var paused = false;
        var allowCallBackFunctions = true;
        var tabEvent = null;

        // If the supplied element is a string, then get the document node from the string.
        // Otherwise, assume that the supplied element is a document node.
        var container = (typeof element === 'string')
            ? document.querySelector(element)
            : element;

        // Set the config variable to the supplied userOptions or an empty object.
        var config = userOptions || {};

        config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
            ? userOptions.returnFocusOnDeactivate
            : true;

        config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
            ? userOptions.escapeDeactivates
            : true;

        var trap = {
            'activate': activate,
            'deactivate': deactivate,
            'pause': pause,
            'unpause': unpause,
            'isActive': isActive,
            'stopCallBack': stopCallBack,
        };

        return trap;

        function isActive()
        {
            return active;
        }

        function stopCallBack()
        {
            allowCallBackFunctions = false;
        }

        function activate(activateOptions)
        {
            if (active) return;

            var defaultedActivateOptions = {
                onActivate: (activateOptions && activateOptions.onActivate !== undefined)
                    ? activateOptions.onActivate
                    : config.onActivate,
            };

            active = true;
            paused = false;
            nodeFocusedBeforeActivation = document.activeElement;

            if (defaultedActivateOptions.onActivate)
            {
                defaultedActivateOptions.onActivate();
            }

            addListeners();
            return trap;
        }

        function deactivate(deactivateOptions)
        {
            if (!active) return;

            var defaultedDeactivateOptions = {

                returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
                    ? deactivateOptions.returnFocus
                    : config.returnFocusOnDeactivate,

                onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
                    ? deactivateOptions.onDeactivate
                    : config.onDeactivate,
            };

            removeListeners();

            active = false;
            paused = false;

            if (allowCallBackFunctions && defaultedDeactivateOptions.onDeactivate) {
                defaultedDeactivateOptions.onDeactivate();
            }

            if (defaultedDeactivateOptions.returnFocus) {
                setTimeout(function () {
                tryFocus(nodeFocusedBeforeActivation);
                }, 0);
            }

            return this;
        }

        function pause()
        {
            if (paused || !active) return;

            paused = true;
            removeListeners();
        }


        function unpause()
        {
            if (!paused || !active) return;

            paused = false;
            addListeners();
        }

        function addListeners()
        {
            if (!active) return;

            // There can be only one listening focus trap at a time.
            if (listeningFocusTrap)
            {
                listeningFocusTrap.pause();
            }

            listeningFocusTrap = trap;

            updateTabbableNodes();

            tryFocus(firstFocusNode());

            document.addEventListener('focus', checkFocus, true);
            document.addEventListener('click', checkClick, true);
            document.addEventListener('mousedown', checkPointerDown, true);
            document.addEventListener('touchstart', checkPointerDown, true);
            document.addEventListener('keydown', checkKey, true);

            return trap;
        }

        function removeListeners()
        {
            if (!active || listeningFocusTrap !== trap) return;

            document.removeEventListener('focus', checkFocus, true);
            document.removeEventListener('click', checkClick, true);
            document.removeEventListener('mousedown', checkPointerDown, true);
            document.removeEventListener('touchstart', checkPointerDown, true);
            document.removeEventListener('keydown', checkKey, true);

            listeningFocusTrap = null;

            return trap;
        }

        function getNodeForOption(optionName)
        {
            var optionValue = config[optionName];
            var node = optionValue;

            if (!optionValue)
            {
                return null;
            }

            if (typeof optionValue === 'string')
            {
                node = document.querySelector(optionValue);
                if (!node)
                {
                    throw new Error('`' + optionName + '` refers to no known node');
                }
            }

            if (typeof optionValue === 'function')
            {
                node = optionValue();

                if (!node)
                {
                    throw new Error('`' + optionName + '` did not return a node');
                }
            }

            return node;
        }

        function firstFocusNode()
        {
            var node;

            if (getNodeForOption('initialFocus') !== null)
            {
                node = getNodeForOption('initialFocus');
            }
            else if (container.contains(document.activeElement))
            {
                node = document.activeElement;
            }
            else
            {
                node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
            }

            if (!node)
            {
                throw new Error('You can\'t have a focus-trap without at least one focusable element.');
            }

            return node;
        }


        // This needs to be done on mousedown and touchstart instead of click
        // so that it precedes the focus event
        function checkPointerDown(e)
        {
            if (config.clickOutsideDeactivates && !container.contains(e.target))
            {
                deactivate({ returnFocus: false });
            }
        }

        function checkClick(e)
        {
            if (config.clickOutsideDeactivates) return;
            if (container.contains(e.target)) return;
            e.preventDefault();
            e.stopImmediatePropagation();
        }

        function checkFocus(e)
        {
            if (container.contains(e.target)) return;

            e.preventDefault();
            e.stopImmediatePropagation();

            // Checking for a blur method here resolves a Firefox issue (#15)
            if (typeof e.target.blur === 'function') e.target.blur();

            if (tabEvent)
            {
                readjustFocus(tabEvent);
            }
        }

        function checkKey(e)
        {
            if (e.key === 'Tab' || e.keyCode === 9)
            {
                handleTab(e);
            }

            if (config.escapeDeactivates !== false && isEscapeEvent(e))
            {
                deactivate();
            }
        }

        function handleTab(e)
        {
            updateTabbableNodes();

            if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0)
            {
                return tabEvent = e;
            }

            e.preventDefault();
            var currentFocusIndex = tabbableNodes.indexOf(e.target);

            if (e.shiftKey)
            {
                if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1)
                {
                    return tryFocus(lastTabbableNode);
                }

                return tryFocus(tabbableNodes[currentFocusIndex - 1]);
            }

            if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

            tryFocus(tabbableNodes[currentFocusIndex + 1]);
        }


        function updateTabbableNodes()
        {
            tabbableNodes = getTabbableNodes(container);
            firstTabbableNode = tabbableNodes[0];
            lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
        }

        function readjustFocus(e)
        {
            if (e.shiftKey) return tryFocus(lastTabbableNode);

            tryFocus(firstTabbableNode);
        }
    }

    function isEscapeEvent(e)
    {
        return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
    }

    function tryFocus(node)
    {
        if (!node || !node.focus) return;

        if (node === document.activeElement)  return;

        node.focus();

        if (node.tagName.toLowerCase() === 'input')
        {
            node.select();
        }
    }

    function updateShoppingCartNumProducts()
    {
        return;
        
        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = JSON.parse(httpobject[localvalue].responseText);

                if(document.getElementById('shoppingCartCounter'))
                {
                    document.getElementById('shoppingCartCounter').innerHTML = response.numProducts;

                    if(response.numProducts > 0)
                    {
                        document.getElementById('shoppingCartCounter').style.display = 'inline-block';
                    }
                    else
                    {
                        document.getElementById('shoppingCartCounter').style.display = 'none';
                    }
                }

            }


        };

        var postString = '';

        var url = "/queries/queryShoppingCartProductCount.php";

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;
    }

    function createGlobalForegroundAndBackgroundDiv()
    {
        var newdiv;
        var cssstyle;

        if(!document.getElementById('globalBackgroundDiv'))
        {
            // Background Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; box-sizing: border-box; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.50; filter: alpha(opacity=50);';
            newdiv.id = 'globalBackgroundDiv';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);
        }

        if(!document.getElementById('globalForegroundDiv'))
        {
            // Foreground Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; box-sizing: border-box; z-index: 5001; left: 0px; top: 0px; width: 10px; height: 10px; overflow: auto; padding: 0px; border: 1px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000; text-align: center;';
            newdiv.id = 'globalForegroundDiv';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);

        }

    }

    function showGlobalForegroundAndBackgroundDiv()
    {
        var backgroundDiv = document.getElementById('globalBackgroundDiv');
        var foregroundDiv = document.getElementById('globalForegroundDiv');

        backgroundDiv.style.width = '100%';
        backgroundDiv.style.height = '100%';
        backgroundDiv.style.visibility = 'visible';

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var widthTarget = Math.min(widthClient * 0.90, 1000);
        var heightTarget = Math.min(heightClient * 0.90, 1000 * heightClient / widthClient);

        var offsetLeft = 0;
        var offsetTop = 0;

        var offsetX = 0;
        var offsetY = 0;

        foregroundDiv.style.width = widthTarget + 'px';
        foregroundDiv.style.height = heightTarget + 'px';
        foregroundDiv.style.visibility = 'visible';
        foregroundDiv.innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; margin-top: 20px;'>";

        foregroundDiv.style.left = (offsetX + offsetLeft + parseInt((widthClient - widthTarget) / 2)) + 'px';
        foregroundDiv.style.top = (offsetY + offsetTop + parseInt((heightClient - heightTarget) / 2)) + 'px';

    }


	function createGlobalForegroundAndBackgroundDiv2()
    {
        var newdiv;
        var cssstyle;

        if(!document.getElementById('globalBackgroundDiv2'))
        {
            // Background Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; box-sizing: border-box; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.50; filter: alpha(opacity=50);';
            newdiv.id = 'globalBackgroundDiv2';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);
        }

        if(!document.getElementById('globalForegroundDiv2'))
        {
            // Foreground Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; box-sizing: border-box; z-index: 5001; left: 0px; top: 0px; width: 10px; height: 10px; overflow: auto; padding: 0px; border: 1px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000; text-align: center;';
            newdiv.id = 'globalForegroundDiv2';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);

        }

    }

    function showGlobalForegroundAndBackgroundDiv2()
    {
        var backgroundDiv = document.getElementById('globalBackgroundDiv2');
        var foregroundDiv = document.getElementById('globalForegroundDiv2');

        backgroundDiv.style.width = '100%';
        backgroundDiv.style.height = '100%';
        backgroundDiv.style.visibility = 'visible';

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var widthTarget = Math.min(widthClient * 0.90, 1000);
        var heightTarget = Math.min(heightClient * 0.90, 1000 * heightClient / widthClient);

        var offsetLeft = 0;
        var offsetTop = 0;

        var offsetX = 0;
        var offsetY = 0;

        foregroundDiv.style.width = widthTarget + 'px';
        foregroundDiv.style.height = heightTarget + 'px';
        foregroundDiv.style.visibility = 'visible';
        foregroundDiv.innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; margin-top: 20px;'>";

        foregroundDiv.style.left = (offsetX + offsetLeft + parseInt((widthClient - widthTarget) / 2)) + 'px';
        foregroundDiv.style.top = (offsetY + offsetTop + parseInt((heightClient - heightTarget) / 2)) + 'px';

    }
	

    function showGlobalEmailSubscriptionPopUp()
    {
        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var aspectRatio = widthClient / heightClient;

        if(aspectRatio < 0.80)
        {
            showGlobalEmailSubscriptionScrollUp();
            return;
        }
        
        if(aspectRatio > 1.2 && heightClient < 600)
        {
            
            return;
        }        
        
        createGlobalForegroundAndBackgroundDiv();
        showGlobalForegroundAndBackgroundDiv();

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];
                globalFocusTrap = focusTrap(document.getElementById('globalForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#subscriptionEmail', 'onDeactivate': function(){hideGlobalEmailSubscriptionPopUp()}});
                globalFocusTrap.activate();
                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                }
            }


        };

        var url = '/queries/queryGlobalEmailSubscriptionPopUp.php';
        var postString = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;
    }


    function globalCheckForEnterEmailSubscription(e)
    {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            e.stopImmediatePropagation();

            globalSubmitEmailSubscription();
        }
    }


    function globalSubmitEmailSubscription()
    {

        var localvalue = requestcount;
        var email = document.getElementById('subscriptionEmail').value;

        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('submitsubscriptionDiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 5px;'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                    if(responseData.hasOwnProperty('visitorData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'subscribeToEmailList',
                            'eventCategory': 'newsletter',
                            'eventAction': 'subscribe',
                            'eventLabel': 'pop-up',
                            'eventValue': '',
                            'eventDescription': 'Subscribe to Newsletter',                            
                            'visitorEmail': email
                        });
                    }
                }
            }
        };

        var url = '/queries/queryGlobalEmailSubscriptionPopUp.php';
        var postString = 'action=submit&email=' + email + '&sourcePage=' + window.location.pathname;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }


    function showGlobalEmailSubscriptionScrollUp()
    {
        createGlobalForegroundAndBackgroundDiv();
        //showGlobalForegroundAndBackgroundDiv();

        var foregroundDiv = document.getElementById('globalForegroundDiv');

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var aspectRatio = widthClient / heightClient;

        if(aspectRatio > 1.2 && heightClient < 600)
        {
            return;
        }

        var targetPercentage = 0.40;

        if(aspectRatio < 0.80)
        {
            targetPercentage = 0.50;
        }

        var heightTarget = parseInt(Math.min(heightClient * targetPercentage, 500));

        foregroundDiv.style.setProperty('-webkit-transition', 'height 1.5s');
        foregroundDiv.style.backgroundColor = 'transparent';
        foregroundDiv.style.boxShadow = 'none';
        foregroundDiv.style.border = 'none';
        foregroundDiv.style.width = '100%';
        foregroundDiv.style.height = '0px';
        foregroundDiv.style.overflow = 'hidden';
        foregroundDiv.style.visibility = 'visible';

        foregroundDiv.style.left = '0px';
        foregroundDiv.style.top = 'auto';
        foregroundDiv.style.bottom = '0px';
        foregroundDiv.style.height = heightTarget + 'px';

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];
                //globalFocusTrap = focusTrap(document.getElementById('globalForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#subscriptionEmail', 'onDeactivate': function(){hideGlobalEmailSubscriptionPopUp()}});
                //globalFocusTrap.activate();
                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                }
            }


        };

        var url = '/queries/queryGlobalEmailSubscriptionScrollUp.php';
        var postString = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;
    }


    function globalCheckForEnterEmailSubscriptionScrollUp(e)
    {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            e.stopImmediatePropagation();

            globalSubmitEmailSubscriptionScrollUp();
        }
    }


    function globalSubmitEmailSubscriptionScrollUp()
    {

        var localvalue = requestcount;
        var email = document.getElementById('subscriptionEmail').value;

        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('submitsubscriptionDiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 5px;'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                    if(responseData.hasOwnProperty('visitorData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'subscribeToEmailList',
                            'eventCategory': 'newsletter',
                            'eventAction': 'subscribe',
                            'eventLabel': 'scroll-up',
                            'eventValue': '',
                            'eventDescription': 'Subscribe to Newsletter',  
                            'visitorEmail': email
                        });
                    }
                }
            }
        };

        var url = '/queries/queryGlobalEmailSubscriptionScrollUp.php';
        var postString = 'action=submit&email=' + email + '&sourcePage=' + window.location.pathname;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }


	function showGlobalDiscountMessageScrollUp()
    {
		if(document.getElementById('globalForegroundDiv') && document.getElementById('globalForegroundDiv').style.visibility == 'visible')
		{
			return;
		}
		
        createGlobalForegroundAndBackgroundDiv();
        //showGlobalForegroundAndBackgroundDiv();

        var foregroundDiv = document.getElementById('globalForegroundDiv');

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var aspectRatio = widthClient / heightClient;

        if(aspectRatio > 1.2 && heightClient < 600)
        {
            return;
        }

        var targetPercentage = 0.40;

        if(aspectRatio < 0.80)
        {
            targetPercentage = 0.50;
        }

        var heightTarget = parseInt(Math.min(heightClient * targetPercentage, 500));

        foregroundDiv.style.setProperty('-webkit-transition', 'height 1.5s');
        foregroundDiv.style.backgroundColor = 'transparent';
        foregroundDiv.style.boxShadow = 'none';
        foregroundDiv.style.border = 'none';
        foregroundDiv.style.width = '100%';
        foregroundDiv.style.height = '0px';
        foregroundDiv.style.overflow = 'hidden';
        foregroundDiv.style.visibility = 'visible';

        foregroundDiv.style.left = '0px';
        foregroundDiv.style.top = 'auto';
        foregroundDiv.style.bottom = '0px';
        foregroundDiv.style.height = heightTarget + 'px';

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];
                //globalFocusTrap = focusTrap(document.getElementById('globalForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#subscriptionEmail', 'onDeactivate': function(){hideGlobalEmailSubscriptionPopUp()}});
                //globalFocusTrap.activate();
                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                }
            }


        };

        var url = '/queries/queryGlobalDiscountMessageScrollUp.php';
        var postString = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;
    }


    function globalCheckForEnterDiscountMessageScrollUp(e)
    {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            e.stopImmediatePropagation();

            globalSubmitEmailDiscountMessageScrollUp();
        }
    }


    function globalSubmitEmailDiscountMessageScrollUp()
    {

        var localvalue = requestcount;
        var email = document.getElementById('discountMessageEmail').value;

        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('submitDiscountMessageEmailDiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 5px;'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundDiv').innerHTML = response[0];

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                    if(responseData.hasOwnProperty('visitorData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'subscribeToEmailList',
                            'eventCategory': 'newsletter',
                            'eventAction': 'subscribe',
                            'eventLabel': 'scroll-up',
                            'eventValue': '',
                            'eventDescription': 'Subscribe to Newsletter',  
                            'visitorEmail': email
                        });
                    }
                }
            }
        };

        var url = '/queries/queryGlobalDiscountMessageScrollUp.php';
        var postString = 'action=submit&email=' + email + '&sourcePage=' + encodeURIComponent(window.location.pathname + window.location.search);

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }


    function hideGlobalDiscountMessagePopUp()
    {
        hideGlobalForegroundAndBackgroundDiv();

        document.getElementById('globalForegroundDiv').innerHTML = '&nbsp;';

        if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
        {
            globalFocusTrap.stopCallBack();
            globalFocusTrap.deactivate();
        }
    }
	

    function globalCheckForEnterEmailSubscriptionAddToCart(e)
    {
        if(e.keyCode === 13)
        {
            e.preventDefault();
            e.stopImmediatePropagation();

            globalSubmitEmailSubscriptionAddToCart();
        }
    }


    function globalSubmitEmailSubscriptionAddToCart()
    {
        var localvalue = requestcount;
        var email = document.getElementById('addToCartEmail').value;

        if(false && email == '')
        {
            alert('You must enter an e-mail address.');
            return;
        }

        document.getElementById('submitSubscriptionDiv').innerHTML = "<img src='/assets/images/Searching.gif' style='display: inline-block; padding-top: 5px;'>";

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('addToCartForegroundDiv').innerHTML = response[0];

                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);

                    if(false && responseData.hasOwnProperty('visitorData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'subscribeToEmailList',
                            'eventCategory': 'newsletter',
                            'eventAction': 'subscribe',
                            'eventLabel': 'add-to-cart',
                            'eventValue': '',
                            'eventDescription': 'Subscribe to Newsletter',
                            'visitorEmail': responseData.visitorData.email
                        });
                    }

                    if(responseData && responseData.hasOwnProperty('googleAnalyticsData'))
                    {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'event': 'addToCart',
                            'eventCategory': 'cart',
                            'eventAction': 'add',
                            'eventDescription': 'Add to Cart',
                            'ecommerce': responseData.googleAnalyticsData.ecommerce
                        });
                        //window.dataLayer.push(responseData.googleAnalyticsData);
                    }

                    if(true && responseData && responseData.hasOwnProperty('redirectUrl'))
                    {
                        if(responseData.redirectUrl !== '')
                        {
                            setTimeout(function(){window.location = responseData.redirectUrl}, 250);
                            return;
                        }
                    }

                }
            }
        };

        var url = '/queries/queryAddToCart.php';
        var postString = 'action=beginCheckoutWithEmail&email=' + email + '&sourcePage=' + window.location.pathname;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }


    function hideGlobalForegroundAndBackgroundDiv()
    {
        document.getElementById('globalBackgroundDiv').style.visibility = 'hidden';
        document.getElementById('globalForegroundDiv').style.visibility = 'hidden';
    }

    function hideGlobalForegroundAndBackgroundDiv2()
    {
        document.getElementById('globalBackgroundDiv2').style.visibility = 'hidden';
        document.getElementById('globalForegroundDiv2').style.visibility = 'hidden';
    }

    function hideGlobalEmailSubscriptionPopUp()
    {
        hideGlobalForegroundAndBackgroundDiv();

        document.getElementById('globalForegroundDiv').innerHTML = '&nbsp;';

        if(typeof globalFocusTrap === 'object' && globalFocusTrap.isActive())
        {
            globalFocusTrap.stopCallBack();
            globalFocusTrap.deactivate();
        }
    }


    function showCookiePolicy()
    {
        if(!document.getElementById('globalForegroundCookieDiv'))
        {
            // Foreground Div
            newdiv = document.createElement('div');
            cssstyle = 'position: fixed; box-sizing: border-box; z-index: 5010; left: 0px; top: 0px; width: 10px; height: 10px; overflow: auto; padding: 0px; border: 1px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000; text-align: center;';
            newdiv.id = 'globalForegroundCookieDiv';
            newdiv.setAttribute('style',cssstyle);
            newdiv.style.cssText = cssstyle;
            document.body.appendChild(newdiv);

        }

        var foregroundDiv = document.getElementById('globalForegroundCookieDiv');

        var widthClient = parseInt(document.documentElement.clientWidth);
        var heightClient = parseInt(document.documentElement.clientHeight);

        var aspectRatio = widthClient / heightClient;

        if(aspectRatio > 1.2 && heightClient < 600)
        {
            return;
        }

        var targetPercentage = 0.40;

        if(aspectRatio < 0.80)
        {
            targetPercentage = 0.50;
        }

        var heightTarget = parseInt(Math.min(heightClient * targetPercentage, 500));

        foregroundDiv.style.setProperty('-webkit-transition', 'height 1.5s');
        foregroundDiv.style.backgroundColor = 'transparent';
        foregroundDiv.style.boxShadow = 'none';
        foregroundDiv.style.border = 'none';
        foregroundDiv.style.width = '100%';
        foregroundDiv.style.height = 'auto';
        foregroundDiv.style.overflow = 'hidden';
        foregroundDiv.style.visibility = 'visible';

        foregroundDiv.style.left = '0px';
        foregroundDiv.style.top = 'auto';
        foregroundDiv.style.bottom = '0px';
        //foregroundDiv.style.height = heightTarget + 'px';

        //foregroundDiv.innerHTML = "<p style='color: #FFFFFF;'>This is a test.</p>\n";
        
        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("--JSON_RESPONSE_DATA--");

                document.getElementById('globalForegroundCookieDiv').innerHTML = response[0];
                //globalFocusTrap = focusTrap(document.getElementById('globalForegroundDiv'),{'clickOutsideDeactivates': true, 'initialFocus': '#subscriptionEmail', 'onDeactivate': function(){hideGlobalEmailSubscriptionPopUp()}});
                //globalFocusTrap.activate();
                if(response[1])
                {
                    var responseData = JSON.parse(response[1]);
                }
            }


        };

        var url = '/queries/queryGlobalCookiePolicyScrollUp.php';
        var postString = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;
    }    
    

    function hideGlobalCookiePolicyPopUp()
    {
        document.getElementById('globalForegroundCookieDiv').style.visibility = 'hidden';

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {

            }


        };
        
        var url = '/queries/queryGlobalCookiePolicyScrollUp.php';
        var postString = 'action=acceptCookies';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;        
        
    }    
    
    
    function updateCurrency()
    {
        var localvalue = requestcount;
        var currencyId = document.getElementById('currencyselectfooter').value;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText;
                var responseData = JSON.parse(response);

                if(responseData.hasOwnProperty('status'))
                {
                    if(responseData.status == 'success')
                    {
                        //window.scrollTo(0,0);
                        location.reload(true);
                    }
                    else
                    {
                        //console.log(responseData);
                    }                    
                }
                else
                {
                    //console.log(responseData);
                }               
            }
        };

        var url = '/queries/queryUpdateCurrency.php';
        var postString = 'action=updateCurrency&currencyId=' + currencyId;

        //alert(postString);
        
        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }

    function updateMeasurementUnits()
    {
        var localvalue = requestcount;
        var measurementId = document.getElementById('unitsselectfooter').value;

        httpobject[localvalue] = newHttpReq();
        httpobject[localvalue].onreadystatechange = function(){

            try
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }

                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }

            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText;
                var responseData = JSON.parse(response);

                if(responseData.hasOwnProperty('status'))
                {
                    if(responseData.status == 'success')
                    {
                        //window.scrollTo(0,0);
                        location.reload(true);
                    }
                    else
                    {
                        //console.log(responseData);
                    }
                }
                else
                {
                    //console.log(responseData);
                }
            }
        };

        var url = '/queries/queryUpdateMeasurementUnits.php';
        var postString = 'action=updateMeasurementUnits&measurementId=' + measurementId;

        //alert(postString);
        
        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(postString);

        requestcount += 1;

        return;

    }
    
    function goToUrl(url)
    {
        window.location = url;
    }