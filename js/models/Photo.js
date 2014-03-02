var PhotoModel = Backbone.Model.extend({
    src: function(sizeSuffix){
        var self = this;
        if(!sizeSuffix){
            sizeSuffix = 's';
        }
        return 'http://farm' + self.get('farm') + '.static.flickr.com/' + self.get('server') + '/' + self.get('id') + '_' + self.get('secret') + '_' + sizeSuffix + '.jpg';
    },
    url: function(){
        var self = this;
        return 'http://www.flickr.com/photos/' + self.get('owner')+'/'+self.get('id');
    }
});
