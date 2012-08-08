/**
 * A jQuery plugin for adding certain text to textinputs or textareas that
 * disappear on focus and reappear on blur if left empty.
 *
 * Usage: call .emptyText() on selected textinputs or textareas. To define the
 * "empty text", write it into the element's title attribute.
 *
 * https://github.com/amcsi/emptytext
 *
 * @author Szerémi Attila
 **/

(function () {
    /**
     * @param bool|string valAction (Optional) If not left empty, then the
     *      following happens, depending on its type:
     *      - If it is a boolean true, it returns the element's value (returning
     *      an empty string if it is actually supposed to be empty). Does not
     *      turn the selected elements to emptyTexts!
     *      - If it is a string, it sets its value. If the element is already
     *      emptyTextized, it also is refreshed.
     **/
	$.fn.emptyText = function (valAction) {
        var thisOne;
        if (true === valAction) {
            thisOne = this.eq(0);
            return thisOne.hasClass('hasEmptyText') ?
                thisOne.data('emptyText').val() :
                thisOne.val();
        }
        else if ('string' == typeof valAction) {
            thisOne = this.eq(0);
            thisOne.hasClass('hasEmptyText') ?
                thisOne.data('emptyText').val(valAction) :
                thisOne.val(valAction);
            return this;
        }
        
        if (!this.length) {
            return this;
        }

		var elements = this.not('.hasEmptyText');

		if (elements.length) {
			elements.each(function () {
				var el = $(this);
				var onFocus = function() {
		            var el = $(this);
		            if (el.hasClass('empty')) {
						el.val('');
						el.removeClass('empty');
					}
		        };
		        var onBlur = function () {
		            var el = $(this);
		            if (!el.val()) {
						el.val(el.attr('title'));
						el.addClass('empty');
					}
					else {
						el.removeClass('empty');
					}
		        };
		    	el.focus(onFocus).blur(onBlur);
		        var data = {
		        	el: el,
		        	refresh: function () {
						onBlur.call(this.el[0]);
					},
					val: function (val) {
						// set
						if (arguments.length) {
							this.el.val(val);
							this.refresh();
						}
						// get
						else {
							return !this.el.hasClass('empty') ? this.el.val() : '';
						} 
					}
				};
				el.data('emptyText', data);
		        el.addClass('hasEmptyText');
				data.refresh();
			});
	        return this;
        }
        else {
			return this.eq(0).data('emptyText');
		}
	}
})();