﻿/************************************************************************
* Validation extensions for jTable										*
* Created by Peter Åslund (http://github.com/LazyTarget) 2014-10-09		*
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        options: $.hik.jtable.prototype.options,
        load: $.hik.jtable.prototype.load,
        _create: $.hik.jtable.prototype._create,
		_onSaveClickedOnCreateForm: $.hik.jtable.prototype._onSaveClickedOnCreateForm,
		_onSaveClickedOnEditForm: $.hik.jtable.prototype._onSaveClickedOnEditForm,
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {
            
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/
		
		
		
        /************************************************************************
        * CONSTRUCTOR AND INITIALIZING METHODS                                  *
        *************************************************************************/
        
        
		
        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/
		_onSaveClickedOnCreateForm: function () {
			var $form = this._$addRecordDiv.find('form');
			var queryString = $form.serialize();
			var data = this._convertQueryStringToObject(queryString);
			var res = this._validate(data, 'create');
			if (res !== false)
				base._onSaveClickedOnCreateForm.apply(this, arguments);
		},
		
        _onSaveClickedOnEditForm: function () {
			var $form = this._$editDiv.find('form');
			var queryString = $form.serialize();
			var data = this._convertQueryStringToObject(queryString);
			var res = this._validate(data, 'edit');
			if (res !== false)
				base._onSaveClickedOnEditForm.apply(this, arguments);
		},

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/
		_validate: function (data, formType) {
			var self = this;
			for (var fieldName in self.options.fields) {
				var field = self.options.fields[fieldName];
				var value = data[fieldName];
				
				if (field.key === true)
					continue;
				if (formType === 'create') {
					if (field.create === false || 
						field._create === false)
						continue;
				} else if (formType === 'edit') {
					if (field.edit === false || 
						field._edit === false)
						continue;
				}
				
				var isRequired = field.required;
				if (typeof(field.required) == "function")
					isRequired = field.required(data);
				
				if (isRequired && !value) {
					self._showError('Field "' + fieldName + '" is required');
                    return false;
				}
			}
		},
		
		_convertQueryStringToObject: function (queryString) {
            var jsonObj = {};
            var e,
                a = /\+/g,
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); };

            while (e = r.exec(queryString)) {
                jsonObj[d(e[1])] = d(e[2]);
            }

            return jsonObj;
        },

    });

})(jQuery);