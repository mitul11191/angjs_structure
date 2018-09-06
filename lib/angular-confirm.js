angular.module('ngConfirm', [])
	.directive('ngConfirm', function($document, $parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var buttonId,
					html,
					message,
					nope,
					yep,
					title,
                                        placement;

				buttonId = Math.floor(Math.random() * 10000000000);
				attrs.buttonId = buttonId;

				message = attrs.message || "Are you sure you want to delete?";
				yep = attrs.yes || "Yes,I’m sure";
				nope = attrs.no || "No";
				title = attrs.title || "Confirmation";
				placement = attrs.placement || "bottom";

				html = "<div id=\"button-" + buttonId + "\">"+
                       "<span class=\"confirmbutton-msg\">" + message + "</span>" +
					   "<div class=\"action\"><button class=\"confirmbutton-yes btn btn-danger btn-xs \">" + yep + "</button> " + 
					   "<button class=\"confirmbutton-no btn btn-default btn-xs\">" + nope + "</button></div></div>";
                
                var template ='<div class="popover popover-confirm"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
				
                element.popover({
					content: html,
					html: true,
					trigger: "manual",
					//title: title,
                    template: template,
					placement: placement
				});

				return element.bind('click', function(e) {
					var dontBubble, pop, isActive;
					dontBubble = true;
					isActive = true;

					e.stopPropagation();

					if(angular.isDefined(attrs.isActive)) {
						isActive = $parse(attrs.isActive)(scope);
					}

					if(isActive) {
						element.popover('show');

						pop = $("#button-" + buttonId);

						pop.closest(".popover").on('click', function(e) {
							if(dontBubble) {
								e.stopPropagation();
							}
						});
                                                pop.closest(".popover").on('mouseleave', function(e)
                                                {
                                                    element.popover('hide');
                                                });

						pop.find('.confirmbutton-yes').on('click', function(e) {
							dontBubble = false;
							$parse(attrs.ngConfirm)(scope);
						});

						pop.find('.confirmbutton-no').on('click', function(e) {
							dontBubble = false;
							$document.off('click.confirmbutton.' + buttonId);
							element.popover('hide');
						});

						$document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
							$document.off('click.confirmbutton.' + buttonId);
                                                        dontBubble = false;
							element.popover('hide');
						});
					}
				});
			}
		};
	});