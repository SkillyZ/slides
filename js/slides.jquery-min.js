/**
 * @Author skilly	http://www.wuliaonimei.com/
 * Github	https://github.com/SkillyZ/slides
 * Create	2015-11-15
 * Update	2015-11-25
 * Version: 1.1
 */
(function(){var Slides=function(ele,opt){this.$element=ele,this.defaults={container:"slides_container",paginationClass:"pagination",speed:"350",effect:"fade",currentClass:"current",generateNextPrev:false,generatePagination:true,next:"next",prev:"prev",timeout:5000,auto:true},this.options=$.extend({},this.defaults,opt)};Slides.prototype={slides:function(){$("."+this.options.container,this.$element).css({overflow:"hidden",position:"relative",display:"block"}).children().wrapAll('<div class="slides_control"/>');var elem=$(this),ele=this.$element,control=$(".slides_control",this.$element),total=control.children().size(),width=control.children().outerWidth(),height=control.children().outerHeight(),options=this.options,start=0,next=0,prev=0,number=0,current=0,clicked,position,direction,pauseTimeout;if(options.generatePagination){$("."+options.container,ele).after('<ul class="'+options.paginationClass+'"></ul>');control.children().each(function(index,element){number++;$("."+options.paginationClass,ele).append('<li><a href="#'+index+'">'+number+"</a></li>")});$("."+options.paginationClass+" li:eq("+start+")",ele).eq(start).addClass(options.currentClass);$("."+options.paginationClass).on("click","li",function(){clicked=$(this).children().attr("href");clicked=clicked.substr(1,clicked.length-1);animate("pagination",options.effect,clicked)})}if(options.generateNextPrev){$("."+this.options.container,ele).after('<a href="#" class="next" >Next</a>'),$("."+this.options.container,ele).after('<a href="#" class="prev" >Prev</a>')}control.css({position:"relative",width:width*3,height:height,left:-width});control.children().each(function(index,element){if(index===start){$(this).css({position:"absolute",width:width,height:height,left:width,display:"block",opacity:1})}else{$(this).css({position:"absolute",width:width,height:height,left:0,display:"none",opacity:0})}});$("."+options.next,this.$element).click(function(){animate("next",options.effect)}),$("."+options.prev,this.$element).click(function(){animate("prev",options.effect)});function animate(direction,effect,clicked){switch(direction){case"next":prev=current;next=current+1;next=next===total?0:next;position=-width*2;direction=width*2;current=next;break;case"prev":prev=current;next=current-1;next=next===-1?total-1:next;position=0;direction=0;current=next;break;case"pagination":next=parseInt(clicked,10);prev=$("."+options.paginationClass+" li."+options.currentClass+" a",ele).attr("href");prev=prev.substr(1,prev.length-1);console.log(prev);if(next>prev){position=-width*2;direction=width*2}else{position=0;direction=0}current=next;break}if(options.auto){clearTimeout(pauseTimeout);pauseTimeout=setTimeout(function(){animate("next",options.effect)},options.timeout)}if(effect=="fade"){$("."+options.paginationClass+" li",ele).eq(prev).removeClass(options.currentClass);$("."+options.paginationClass+" li",ele).eq(next).addClass(options.currentClass);control.children().eq(prev).animate({opacity:0},options.speed,function(){control.children().eq(prev).css({display:"none"});control.children().eq(next).css({display:"block",left:width}).animate({opacity:1},options.speed)})}else{control.children().eq(current).css({display:"block",left:direction});$("."+options.paginationClass+" li",ele).eq(prev).removeClass(options.currentClass);$("."+options.paginationClass+" li",ele).eq(next).addClass(options.currentClass);control.animate({left:position},options.speed,function(){control.children().eq(prev).css({display:"none",left:0}),control.css({left:-width}),control.children().eq(current).css({left:width})})}}if(options.auto){setTimeout(function(){animate("next",options.effect)},options.timeout)}}};$.fn.slides=function(options){var sl=new Slides(this,options);return sl.slides()}})(jQuery);