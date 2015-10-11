# ACF Google Map
This jQuery Plugin is for WordPress Plugin's ACF Google Map
http://www.advancedcustomfields.com/resources/google-map/

## Example
    <?php if( $location = get_sub_field('location') ):?>
    <div class="acf-map">
        <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
    </div>
    <?php endif; ?>
    
    
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>    
    <script src="<?php echo get_template_directory_uri(); ?>/js/acf.googlemap.js"></script>    
    <script>
    jQuery(function($){
        $('.acf-map').acfGoogleMap(); 
    });
    </script>

## Options
### Defaults Options
    {
        zoom: 16,
        css:{
            width:'100%',
            height:400,
            border:'#ccc solid 1px',
            margin:'20px 0'
        }
    }

### Options Example
    <script>
    jQuery(function($){
        $('.acf-map').acfGoogleMap({
            zoom:14,
            css:{
                widht:100,
                height:200
            }
        }); 
    });
    </script>
