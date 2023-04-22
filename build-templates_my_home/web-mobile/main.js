window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    var onProgress = null;
    var rootUrl = 'https://j1.58cdn.com.cn/wuxianfe/my-home-game/web-mobile/assets/'

    var RESOURCES = rootUrl + cc.AssetManager.BuiltinBundleName.RESOURCES;
    var INTERNAL = rootUrl + cc.AssetManager.BuiltinBundleName.INTERNAL;
    var MAIN = rootUrl + cc.AssetManager.BuiltinBundleName.MAIN;
    function setLoadingDisplay () {
        // Loading splash scene
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.bar');
        onProgress = function (completedCount, totalCount) {
			var percent = (100 * completedCount) / totalCount;
			if (progressBar) {
				if (totalCount >= 3 && window.fakeProgressPrecent < percent) {
					// window.fakeProgressPrecent = percent;
					// progressBar.style.width = percent.toFixed(2) + "%";
					// if (window.fakeProgressTimer) {
					// 	clearInterval(window.fakeProgressTimer);
					// 	window.fakeProgressTimer = undefined;
					// }
				}
			}
        };
        splash.style.display = 'block';

		var precentStr = window.fakeProgressPrecent
			? window.fakeProgressPrecent.toFixed(2) + "%"
			: "0%";
		progressBar.style.width = precentStr;
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    var onStart = function () {
		// 隐藏状态栏和native返回栏
		function hideTitleHandle() {
			WBAPP && WBAPP.invoke("toggle_title_panel", {
				contain_status_bar: true,
				cmd: "hide",
				keep_through: true,
			});
			WBAPP && WBAPP.invoke("set_status_bar", {
				mode: "light",
			});
		}
        hideTitleHandle();

        
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isBrowser) {
            setLoadingDisplay();
        }

        if (cc.sys.isMobile) {
            console.log('-----在手机端设置竖屏');
            // if (settings.orientation === 'landscape') {
            //     cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            // }
            // else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                console.log('-----设置适配setResolutionPolicy', cc.ResolutionPolicy.FIXED_WIDTH);
                cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_WIDTH)
            // }
            // cc.view.enableAutoFullScreen([
            //     cc.sys.BROWSER_TYPE_BAIDU,
            //     cc.sys.BROWSER_TYPE_BAIDU_APP,
            //     cc.sys.BROWSER_TYPE_WECHAT,
            //     cc.sys.BROWSER_TYPE_MOBILE_QQ,
            //     cc.sys.BROWSER_TYPE_MIUI,
            //     cc.sys.BROWSER_TYPE_HUAWEI,
            //     cc.sys.BROWSER_TYPE_UC,
            // ].indexOf(cc.sys.browserType) < 0);
            cc.view.enableAutoFullScreen(false)
            cc.view.setDesignResolutionSize(false)
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.assetManager.downloader.maxConcurrency = 2;
            cc.assetManager.downloader.maxRequestsPerFrame = 2;
        }

        var launchScene = settings.launchScene;
        var bundle = cc.assetManager.bundles.find(function (b) {
            return b.getSceneInfo(launchScene);
        });
        
        bundle.loadScene(launchScene, null, onProgress,
            function (err, scene) {
                if (!err) {
                    cc.director.runSceneImmediate(scene);
                    if (cc.sys.isBrowser) {
                        // show canvas
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                        console.log('Success to load scene: ' + launchScene);
                    }
                }
            }
        );

    };

    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    cc.assetManager.init({ 
        bundleVers: settings.bundleVers,
        remoteBundles: settings.remoteBundles,
        server: settings.server
    });
    
    var bundleRoot = [INTERNAL];
    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);

    var count = 0;
    function cb (err) {
        if (err) return console.error(err.message, err.stack);
        count++;
        if (count === bundleRoot.length + 1) {
            cc.assetManager.loadBundle(MAIN, function (err) {
                if (!err) cc.game.run(option, onStart);
            });
        }
    }

    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x;}), cb);

    for (var i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
};

if (window.jsb) {
    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}