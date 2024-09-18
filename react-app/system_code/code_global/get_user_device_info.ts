
export const get_user_device_info = (user_device_window:any,user_device_features:any ) => {

    let window = user_device_window
    let ua = window?.navigator.userAgent;
    let platform = window.navigator.platform;
    let support = user_device_features;

    let device = {

        ready:false,
        is_touchable:false,

        userAgent:'',

        //=== OS
        os: {
            unix:false,
            macos:false,
            windows:false,
            ios: false,
            android: false,
        },

        //=== HARDWARE
        ipad : false,
        ipod : false,
        iphone : false,

        //=== TOPOLOGY
        is_wide_mode: false,

        screenWidth: 0,
        screenHeight: 0,

        ipad_info: [{}],

        native: {android:false,ios:false},
        is_native: false,

        browser: {safari: false, chrome:false, edge:false, opera:false, firefox:false},
        is_webview:false,

    };

    device.userAgent = ua;

    device.screenWidth = window.screen.width;
    device.screenHeight = window.screen.height;

    device.ipad = !!ua.match(/(iPad).*OS\s([\d_]+)/);
    device.ipod = !!ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    device.iphone = !!(!device.ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/))

    device.os.ios = device.iphone
    device.os.android = !!ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    device.os.windows = platform === 'Win32'
    device.os.macos = (platform === 'MacIntel') // iPadOs 13 fix

    device.is_wide_mode = device.screenWidth>device.screenHeight

    let iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
    if (!device.ipad && device.os.macos && support.touch && iPadScreens.indexOf(device.screenWidth + "x" + device.screenHeight) >= 0) {
        device.ipad = !!ua.match(/(Version)\/([\d.]+)/);
        if (!device.ipad) {
            device.ipad_info = [0, 1, '13_0_0'];
        }
        device.os.macos = false;
    } // Android

    if (device.os.android && !device.os.windows) {
        device.native.android = true;
    }

    if (device.ipad || device.iphone || device.ipod) {
        device.os.ios = true;
        device.native.ios = true;
    }



    device.is_native = device.native.ios || device.native.android

    device.is_webview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)

    device.ready = true

    device.is_touchable = !!user_device_features.touch

    device.browser.safari = !!(ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0)
    device.browser.firefox = !!(ua.indexOf('Firefox') >= 0)
    device.browser.edge = !!window.navigator.userAgent.match(/Edge/g)
    const ag = window.navigator?.userAgentData
    if(ag) {
        const br = window.navigator?.userAgentData?.brands
        if(br) {
            console.log("=== brands", window.navigator.userAgentData.brands)
            for (let i = 0; i < br.length; i++) {
                if (br[i].brand === '"Google Chrome') {
                    device.browser.chrome = true
                }
                if (br[i].brand === 'Opera') {
                    device.browser.opera = true
                }
            }
        }
    }

    return device

}

export const get_user_device_features = (user_device_window:any,user_device_document:any ) => {

    let window = user_device_window;
    let document = user_device_document;
    return {
        touch: !!(('ontouchstart' in window) || ((window.DocumentTouch) && (document instanceof window.DocumentTouch))),
        pointerEvents: !!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0,
        observer: function checkObserver() {
            return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
        }(),
        passiveListener: function checkPassiveListener() {
            let supportsPassive = false;

            try {
                let opts = Object.defineProperty({}, 'passive', {
                    // eslint-disable-next-line
                    get: function get() {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('testPassiveListener', null, opts);
            } catch (e) {// No support
            }

            return supportsPassive;
        }(),
        gestures: function checkGestures() {
            return 'ongesturestart' in window;
        }()
    };
}

