
	;(function(){
		//定义构造函数
		var Slides = function (ele, opt){
			this.$element = ele,
			this.defaults = {
				container: 'slides_container',//包裹轮播元素class
				paginationClass: 'pagination',//分页
				speed:'350',//速度
				effect:'slide',//特效类型
				currentClass: 'current',//分页当前class
				generateNextPrev: false,//是否生成下一页下一页
				generatePagination: true,//是否生成分页
				next: 'next',//下一页class
				prev: 'prev',//上一页class
				timeout:5000,//轮播时间
				auto: true//是否轮播
			},

			this.options = $.extend({}, this.defaults, opt)
		}

		//定义方法
		Slides.prototype = {
			slides : function(){

				//初始化腹肌div
				$('.'+this.options.container, this.$element).css({
				overflow : 'hidden',
				position : 'relative',
				display : 'block'
				}).children().wrapAll('<div class="slides_control"/>');


				var elem = $(this),
					ele = this.$element,
					control = $('.slides_control', this.$element),
					total = control.children().size(),
					width = control.children().outerWidth(),
					height = control.children().outerHeight(),
					options = this.options,
					start = 0, next = 0, prev = 0, number = 0, current = 0, clicked, position, direction, pauseTimeout;

				//生成分页
				if(options.generatePagination){
					$('.'+options.container, ele).after('<ul class="'+options.paginationClass+'"></ul>');

					control.children().each(function(index, element){

						number++;
						$('.'+options.paginationClass, ele).append('<li><a href="#'+index+'">'+number+'</a></li>');

					});

					$('.'+options.paginationClass + ' li:eq('+ start +')', ele).eq(start).addClass(options.currentClass);

					//继续绑定事件
					$('.'+options.paginationClass).on('click', 'li', function(){
						clicked = $(this).children().attr('href');
						clicked = clicked.substr(1, clicked.length-1);
						
						animate('pagination', options.effect, clicked);
					})

				}

				//生成上一页下一页
				if(options.generateNextPrev){
					$('.'+this.options.container, ele).after('<a href="#" class="next" >Next</a>'),
					$('.'+this.options.container, ele).after('<a href="#" class="prev" >Prev</a>');
				}
				
				//初始化control
				control.css({
					position : 'relative',
					width : width*3,
					height : height,
					left : -width
				});

				//初始化轮播元素
				control.children().each(function(index, element){
					if(index === start){
						$(this).css({
							position : 'absolute',
							width:width,
							height:height,
							left:width,
							display:'block'
						});
					}else{
						$(this).css({
							position : 'absolute',
							width:width,
							height:height,
							left:0,
							display:'none'
						});
					}
				});
				
				//绑定动作
				$('.'+options.next, this.$element).click(function(){
					animate('next', options.effect);
				}),
				$('.'+options.prev, this.$element).click(function(){
					animate('prev', options.effect);
				});

						
				//动画主要方法
				function animate(direction, effect, clicked){

					//判断动作类型
					switch (direction) {
						case 'next':
							prev = current;
							next = current + 1;
							next = next === total ? 0 : next;
							position = -width*2;
							direction = width*2;

							current = next;

						break;
						case 'prev':
							prev = current;
							next = current - 1;
							next = next === -1 ? total-1 : next;
							position = 0;
							direction = 0;

							current = next;

						break;
						case 'pagination':
							
							next = parseInt(clicked,10);
							//prev = $('.'+options.paginationClass +' li.'+options.currentClass + ' a', ele).attr('href').match('[^#/]+$');
							prev = $('.'+options.paginationClass +' li.'+options.currentClass + ' a', ele).attr('href');
							prev = prev.substr(1, prev.length-1);

							console.log(prev);
							if(next > prev){
								position = -width*2;
								direction = width*2;
							}else{
								position = 0;
								direction = 0;
							}

							current = next;
						break;
					}

					//轮播动画
					if(options.auto){
						clearTimeout(pauseTimeout);
						pauseTimeout = setTimeout(function(){animate('next')}, options.timeout);
					}

					//确定下一页上一页之后动作
					control.children().eq(current).css({
						display:'block',
						left:direction
					});

					$('.'+options.paginationClass +' li', ele).eq(prev).removeClass(options.currentClass);
					$('.'+options.paginationClass +' li', ele).eq(next).addClass(options.currentClass);

					control.animate({
						left:position
					},options.speed, function(){
						control.children().eq(prev).css({
							display:'none',
							left:0
						}),
						control.css({
							left:-width
						}),
						control.children().eq(current).css({
							left:width
						});


					});


					
				}

				if(options.auto)
					setTimeout(function(){animate('next')}, options.timeout);

				
			}
		}

		//在插件里使用轮播对象
		$.fn.slides = function(options){
			//创建对象
			var sl = new Slides(this, options);

			return sl.slides();
		}
	})(jQuery);