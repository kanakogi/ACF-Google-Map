/**
 * ACF Google Map
 * Github : https://github.com/kanakogi/ACF-Google-Map/tree/master
 * 
 * This plugin is for ACF Google Map(http://www.advancedcustomfields.com/resources/google-map/)
 */
;
(function($) {

    $.fn.acfGoogleMap = function(opts) {

        var _ = this;

        // オプションとデフォルトをマージする
        var options = $.extend({}, $.fn.acfGoogleMap.defaults, opts);

        // 要素をひとつずつ処理
        _.each(function() {
            var map = null;

            // create map
            map = new_map($(this), options);

            //cssを追加
            $(this).css(options.css);
        });
        return this;
    };


    /*
     *  new_map
     *
     *  This function will render a Google Map onto the selected jQuery element
     *
     *  @type    function
     *  @date    8/11/2013
     *  @since   4.3.0
     *
     *  @param   $el (jQuery element)
     *  @return  n/a
     */

    function new_map($el, options) {

        // var
        var $markers = $el.find('.marker');


        // vars
        var args = {
            zoom: options.zoom,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        // create map               
        var map = new google.maps.Map($el[0], args);


        // add a markers reference
        map.markers = [];


        // add markers
        $markers.each(function() {

            add_marker($(this), map);

        });


        // center map
        center_map(map, options);


        // return
        return map;

    }

    /*
     *  add_marker
     *
     *  This function will add a marker to the selected Google Map
     *
     *  @type    function
     *  @date    8/11/2013
     *  @since   4.3.0
     *
     *  @param   $marker (jQuery element)
     *  @param   map (Google Map object)
     *  @return  n/a
     */

    function add_marker($marker, map) {

        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });

        // add to array
        map.markers.push(marker);

        // if marker contains HTML, add it to an infoWindow
        if ($marker.html()) {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content: $marker.html()
            });

            // show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function() {

                infowindow.open(map, marker);

            });
        }

    }

    /*
     *  center_map
     *
     *  This function will center the map, showing all markers attached to this map
     *
     *  @type    function
     *  @date    8/11/2013
     *  @since   4.3.0
     *
     *  @param   map (Google Map object)
     *  @return  n/a
     */

    function center_map(map, options) {

        // vars
        var bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        $.each(map.markers, function(i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });

        // only 1 marker?
        if (map.markers.length == 1) {
            // set center of map
            map.setCenter(bounds.getCenter());
            map.setZoom(options.zoom);
        } else {
            // fit to bounds
            map.fitBounds(bounds);
        }

    }

    
    /**
     * Defaults Options
     */
    $.fn.acfGoogleMap.defaults = {
        zoom: 16,
        css:{
            width:'100%',
            height:400,
            border:'#ccc solid 1px',
            margin:'20px 0'
        }
    };

})(jQuery);