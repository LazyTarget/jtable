/************************************************************************
* Search extension for jTable                                           *
* Created by Peter Åslund (http://github.com/LazyTarget) 2014-09-22		*
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        options: $.hik.jtable.prototype.options,
        load: $.hik.jtable.prototype.load,
        _create: $.hik.jtable.prototype._create,
        _createJtParamsForLoading: $.hik.jtable.prototype._createJtParamsForLoading,
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {
            search: false,
            searchParamName: 'search',
            progressiveSearch: false
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _searchText: "",
        _$searchPanel: null,
        _$searchInput: null,


        /************************************************************************
        * CONSTRUCTOR AND INITIALIZING METHODS                                  *
        *************************************************************************/
        _create: function() {
            base._create.apply(this, arguments);
            if (this.options.search) {
                this._$mainContainer.addClass('jtable-searchable');
                this._$titleDiv.append($('<span>').addClass('clearfix'));
                this._createSearchPanel();
                this._createSearchInput();
            }
        },

        _createSearchPanel: function() {
            this._$searchPanel = $('<div />')
                .addClass('jtable-search-panel')
                .insertAfter(this._$titleDiv.find('.jtable-title-text'));

            this._jqueryuiThemeAddClass(this._$searchPanel, 'ui-state-default');
        },

        _createSearchInput: function () {
            var self = this;
            this._$searchInput = $('<input type="text" value="' + self._searchText + '" />')
                                    .addClass('jtable-search-input')
                                    .appendTo(self._$searchPanel)
                                    .keyup(function(event) {
                                        var val = self._$searchInput.val();
                                        if (event.which == 9 ||
                                            event.which == 27) {
                                            // tab or esc - do nothing
                                        } else if (event.which == 13) { // enter
                                            event.preventDefault();
                                            self._search(val);
                                        } else if (self.options.progressiveSearch) {
                                            self._search(val);
                                        }
                                    });
        },
        

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/
        

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/
        _search: function (query) {
            if (this.options.search) {
                query = typeof (query) != "undefined" ? query : this._$searchInput.val();
                this._lastPostData = $.extend({}, this._lastPostData);
                this._lastPostData[this.options.searchParamName] = query;
                this._reloadTable();
            }
        }

    });

})(jQuery);