'use strict';

angular.module('customerDreambeemcomApp')
    .config(function ($mdThemingProvider, $mdIconProvider, $mdAriaProvider) {
        $mdAriaProvider.disableWarnings();

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey');

        $mdThemingProvider.theme("success-toast");
        $mdThemingProvider.theme("error-toast");

        $mdIconProvider
            .icon('time24', 'bower_components/material-design-icons/action/svg/production/ic_history_24px.svg', 24)
            .icon('status24', 'bower_components/material-design-icons/action/svg/production/ic_cached_24px.svg', 24)
            .icon('explore24', 'bower_components/material-design-icons/action/svg/production/ic_explore_24px.svg', 24)
            .icon('shoppingbasket24', 'bower_components/material-design-icons/action/svg/production/ic_shopping_basket_24px.svg', 24)
            .icon('shoppingcart24', 'bower_components/material-design-icons/action/svg/production/ic_shopping_cart_24px.svg', 24)
            .icon('camera24', 'bower_components/material-design-icons/image/svg/production/ic_camera_alt_24px.svg', 24)
            .icon('furnybeem24', 'bower_components/material-design-icons/social/svg/production/ic_share_24px.svg', 24)
            .icon('dreambeem24', 'bower_components/material-design-icons/social/svg/production/ic_whatshot_24px.svg', 24)
            .icon('shopMain24', 'bower_components/material-design-icons/communication/svg/production/ic_business_24px.svg', 24)
            .icon('lager24', 'bower_components/material-design-icons/communication/svg/production/ic_clear_all_24px.svg', 24)
            .icon('portfolio24', 'bower_components/material-design-icons/communication/svg/production/ic_present_to_all_24px.svg', 24)
            .icon('sales24', 'bower_components/material-design-icons/action/svg/production/ic_store_24px.svg', 24)
            .icon('purchases24', 'bower_components/material-design-icons/action/svg/production/ic_add_shopping_cart_24px.svg', 24)
            .icon('performance24', 'bower_components/material-design-icons/content/svg/production/ic_gesture_24px.svg', 24)
            .icon('amount24', 'bower_components/material-design-icons/action/svg/production/ic_euro_symbol_24px.svg', 24)
            .icon('callsplit24', 'bower_components/material-design-icons/communication/svg/production/ic_call_split_24px.svg', 24)
            .icon('category24', 'bower_components/material-design-icons/action/svg/production/ic_book_24px.svg', 24)
            .icon('description24', 'bower_components/material-design-icons/action/svg/production/ic_assignment_24px.svg', 24)
            .icon('keywords24', 'bower_components/material-design-icons/action/svg/production/ic_code_24px.svg', 24)
            .icon('deliverytime24', 'bower_components/material-design-icons/action/svg/production/ic_find_replace_24px.svg', 24)
            .icon('action24', 'bower_components/material-design-icons/image/svg/production/ic_flare_24px.svg', 24)
            .icon('priceIncrease24','bower_components/material-design-icons/communication/svg/production/ic_call_merge_24px.svg',24)
            .icon('actual24','bower_components/material-design-icons/file/svg/production/ic_cloud_queue_24px.svg',24)
            .icon('plink24','bower_components/material-design-icons/social/svg/production/ic_public_24px.svg',24)

            .icon('home24', 'bower_components/material-design-icons/action/svg/production/ic_home_24px.svg', 24)
            .icon('label24', 'bower_components/material-design-icons/action/svg/production/ic_label_24px.svg', 24)
            .icon('star24', 'bower_components/material-design-icons/action/svg/production/ic_grade_24px.svg', 24)
            .icon('plz24', 'bower_components/material-design-icons/action/svg/production/ic_perm_media_24px.svg', 24)
            .icon('phone24', 'bower_components/material-design-icons/communication/svg/production/ic_call_24px.svg', 24)
            .icon('email24', 'bower_components/material-design-icons/communication/svg/production/ic_email_24px.svg', 24)
            .icon('fullname24', 'bower_components/material-design-icons/communication/svg/production/ic_email_24px.svg', 24)
            .icon('link24', 'bower_components/material-design-icons/action/svg/production/ic_exit_to_app_24px.svg', 24)
            .icon('shop24', 'bower_components/material-design-icons/action/svg/production/ic_face_24px.svg', 24)

            .icon('street24', 'bower_components/material-design-icons/action/svg/production/ic_label_24px.svg', 24)
            .icon('plz24', 'bower_components/material-design-icons/action/svg/production/ic_perm_media_24px.svg', 24)
            .icon('town24', 'bower_components/material-design-icons/communication/svg/production/ic_location_on_24px.svg', 24)
            .icon('country24', 'bower_components/material-design-icons/action/svg/production/ic_room_24px.svg', 24)
            .icon('delete24', 'bower_components/material-design-icons/action/svg/production/ic_delete_24px.svg', 24)
            .icon('kind24', 'bower_components/material-design-icons/maps/svg/production/ic_rate_review_24px.svg', 24)
            .icon('lang24', 'bower_components/material-design-icons/action/svg/production/ic_g_translate_24px.svg', 24)
            .icon('fame24', 'bower_components/material-design-icons/content/svg/production/ic_report_24px.svg', 24)

            .icon('dreamproducts24', 'bower_components/material-design-icons/action/svg/production/ic_copyright_24px.svg', 24)
            .icon('dreamevents24', 'bower_components/material-design-icons/action/svg/production/ic_find_replace_24px.svg', 24)
            .icon('dreampapers24', 'bower_components/material-design-icons/action/svg/production/ic_class_24px.svg', 24)

            .icon('tooltip24', 'bower_components/material-design-icons/action/svg/production/ic_help_outline_24px.svg', 24)

            .icon('information24', 'bower_components/material-design-icons/action/svg/production/ic_info_outline_24px.svg', 24)

            .icon('beemline24', 'bower_components/material-design-icons/alert/svg/production/ic_error_outline_24px.svg', 24)

            .icon('menu24', 'bower_components/material-design-icons/image/svg/production/ic_dehaze_48px.svg', 24)

            .icon('responsive48','bower_components/material-design-icons/action/svg/production/ic_important_devices_48px.svg', 48)

            .icon('dreamsWallet24', 'bower_components/material-design-icons/action/svg/production/ic_account_balance_48px.svg', 24)

            .icon('alertOk24', 'bower_components/material-design-icons/action/svg/production/ic_check_circle_24px.svg', 24)
            .icon('alertFalse24', 'bower_components/material-design-icons/action/svg/production/ic_highlight_off_24px.svg', 24)
            .icon('furnybeemAmount24', 'bower_components/material-design-icons/action/svg/production/ic_done_all_24px.svg', 24)

            .icon('allReach24', 'bower_components/material-design-icons/social/svg/production/ic_people_outline_24px.svg', 24)
            .icon('booking24', 'bower_components/material-design-icons/social/svg/production/ic_group_add_24px.svg', 24)
            .icon('meeting24', 'bower_components/material-design-icons/social/svg/production/ic_group_24px.svg', 24)

            .icon('assessmentVeryDissatisfiedEvent24', 'bower_components/material-design-icons/social/svg/production/ic_sentiment_very_dissatisfied_24px.svg', 24)
            .icon('assessmentDissatisfiedEvent24', 'bower_components/material-design-icons/social/svg/production/ic_sentiment_dissatisfied_24px.svg', 24)
            .icon('assessmentNeutralEvent24', 'bower_components/material-design-icons/social/svg/production/ic_sentiment_neutral_24px.svg', 24)
            .icon('assessmentSatisfiedEvent24', 'bower_components/material-design-icons/social/svg/production/ic_sentiment_satisfied_24px.svg', 24)
            .icon('assessmentVerySatisfiedEvent24', 'bower_components/material-design-icons/social/svg/production/ic_sentiment_very_satisfied_24px.svg', 24)

            .icon('knowledgeMeetings24', 'bower_components/material-design-icons/social/svg/production/ic_school_24px.svg', 24)
            .icon('location24', 'bower_components/material-design-icons/maps/svg/production/ic_add_location_24px.svg', 24)
            .icon('bike24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_bike_24px.svg', 24)
            .icon('bus24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_bus_24px.svg', 24)
            .icon('car24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_car_24px.svg', 24)
            .icon('railway24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_railway_24px.svg', 24)
            .icon('walk24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_run_24px.svg', 24)
            .icon('subway24', 'bower_components/material-design-icons/maps/svg/production/ic_directions_subway_24px.svg', 24)
            .icon('booking$24', 'bower_components/material-design-icons/maps/svg/production/ic_local_atm_24px.svg', 24)
            .icon('activity24', 'bower_components/material-design-icons/maps/svg/production/ic_local_activity_24px.svg', 24)
            .icon('party24', 'bower_components/material-design-icons/maps/svg/production/ic_local_bar_24px.svg', 24)
            .icon('coffee24', 'bower_components/material-design-icons/maps/svg/production/ic_local_cafe_24px.svg', 24)
            .icon('dinner24', 'bower_components/material-design-icons/maps/svg/production/ic_local_dining_24px.svg', 24)
            .icon('drink24', 'bower_components/material-design-icons/maps/svg/production/ic_local_drink_24px.svg', 24)
            .icon('nature24', 'bower_components/material-design-icons/maps/svg/production/ic_local_florist_24px.svg', 24)
            .icon('shopping24', 'bower_components/material-design-icons/maps/svg/production/ic_local_mall_24px.svg', 24)
            .icon('kino24', 'bower_components/material-design-icons/maps/svg/production/ic_local_movies_24px.svg', 24)
            .icon('fotos24', 'bower_components/material-design-icons/maps/svg/production/ic_local_see_24px.svg', 24)
            .icon('sprofile24', 'bower_components/material-design-icons/maps/svg/production/ic_person_pin_24px.svg', 24)
            .icon('lprofile24', 'bower_components/material-design-icons/maps/svg/production/ic_person_pin_circle_24px.svg', 24)
            .icon('dinnerp24', 'bower_components/material-design-icons/maps/svg/production/ic_restaurant_24px.svg', 24)
            .icon('fotosland24', 'bower_components/material-design-icons/maps/svg/production/ic_satellite_24px.svg', 24)
            .icon('fotosindus24', 'bower_components/material-design-icons/maps/svg/production/ic_terrain_24px.svg', 24)
            .icon('way24', 'bower_components/material-design-icons/maps/svg/production/ic_transfer_within_a_station_24px.svg', 24)

            .icon('logout24', 'bower_components/material-design-icons/action/svg/production/ic_compare_arrows_24px.svg', 24)

            .icon('receiver24', 'bower_components/material-design-icons/action/svg/production/ic_assignment_ind_24px.svg', 24)
            .icon('subject24', 'bower_components/material-design-icons/communication/svg/production/ic_import_contacts_24px.svg', 24)
            .icon('info24', 'bower_components/material-design-icons/action/svg/production/ic_perm_scan_wifi_24px.svg', 24)
            .icon('setting24', 'bower_components/material-design-icons/action/svg/production/ic_settings_24px.svg', 24)
            .icon('assessment24', 'bower_components/material-design-icons/communication/svg/production/ic_comment_24px.svg', 24)
            .icon('type24', 'bower_components/material-design-icons/image/svg/production/ic_filter_center_focus_24px.svg', 24)
            .icon('name24', 'bower_components/material-design-icons/action/svg/production/ic_perm_identity_24px.svg', 24)

            .icon('orders24', 'bower_components/material-design-icons/action/svg/production/ic_chrome_reader_mode_48px.svg', 24)
            .icon('wishlist24', 'bower_components/material-design-icons/action/svg/production/ic_favorite_border_48px.svg', 24)
            .icon('bills24', 'bower_components/material-design-icons/action/svg/production/ic_account_balance_48px.svg', 24)
            .icon('messages24', 'bower_components/material-design-icons/communication/svg/production/ic_mail_outline_48px.svg', 24)

            .icon('customer24', 'bower_components/material-design-icons/action/svg/production/ic_account_box_48px.svg', 24);

    });
