var FlickrCollection = Backbone.Collection.extend({
    model: PhotoModel,
    initialize: function () {
        var self = this;
        self.view = new PhotoCollectionView({collection: self});
        self.fetch('batman', 1);
    },
    current: 0,
    container: "#flickr-container",
    perPage: 150,
    api_key: "8e8b0a8d39a7af07485e7b992084a350",
    base_url: "http://api.flickr.com/services/rest/",
    loaderImage: "images/loader.gif",
    headerTitle: 'Photos',
    getRequestData: function (search, page, successCallback, errorCallback) {
        var self = this;
        var data = {
            api_key: self.api_key,
            per_page: self.perPage,
            format: 'json',
            nojsoncallback: 1,
            page: (page != null && page > 0) ? page : 1,
            method: (search != null && search.length > 0) ? 'flickr.photos.search' : 'flickr.photos.getRecent'
        };
        if ((search != null && search.length > 0)) {
            data.text = search;
        }
        $.ajax({
            url: self.base_url,
            data: data,
            success: function (res) {
                self.page = res.photos.page;
                self.pages = res.photos.pages;
                self.total = res.photos.total;
                self.search = search;
                self.reset();
                self.add(res.photos.photo);
                if (successCallback) successCallback();
            },
            error: function (jqXHR, textStatus) {
                if (errorCallback) errorCallback(jqXHR, textStatus);
            }
        });
    },
    fetch: function (search, page) {
        var self = this;
        self.view.startLoader();
        function success() {
            $(self.container).html(self.view.$el);
            self.trigger('photosReady');
        }
        self.getRequestData(search, page, success);
    },
    setCurrent: function (index) {
        if (index > -1 && index < this.size())
            this.current = this.at(index);
        else {
            return null;
        }
    },
    prev: function () {
        var self = this;
        var index = self.current - 1;
        if (index < 0) return null;
        return self.at(index);
    },
    next: function () {
        var self = this;
        var index = self.current + 1;
        if (index > self.size()) return null;
        return self.at(index);
    }

});