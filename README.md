# SiS

## Getting Started

### Install Dependencies

Ensure Node version 0.12.7 is installed (versions higher or lower than this will result in build failures):
```
node --version
```

Add node modules:

```
npm install
```

configure api endpoint (this step must be completed before adding a platform)

```
npm_config_env=test npm_config_server=http://127.0.0.1:3000 npm run set_endpoint
```

Create the necessary directories and files for a Cordova project:

```
npm run build:prepare
```

Please note that the latest version of the SIS dashboard must be running on your local server in order for this client application to work properly. The dashboard project can be found here:

[SIS Dashboard](https://github.com/cbitstech/sis_dashboard)

## Platforms

### Android

#### Running project in an emulator

Configure Emulator

```
android
```

Create an AVD (Android Virtual Device) via **Tools** > **Manage AVDs...**. This
AVD will be used in your testing suite.

Add platform:

```
npm run android:add_platform
```

Run the project on the simulator (prepare, compile and install):

```
npm run android:simulator
```

#### Installing apk on Android Device

Install apk on Device (to do this you will need to connect the device to your
computer and enable developer options see [Android Developer Options](https://github.com/cbitstech/guides/tools/android/developer_options))

If you haven't yet added Android platform:

```
npm run android:add_platform
```

Build and install on connected device:

```
npm run android:build
```

### Browser

Add platform:

```
npm run browser:add_platform
```

Run the project on the simulator (prepare, compile and install):

```
npm run browser:simulator
```

## Building an apk (without installing it or running it)

You can build all platforms (andorid and browser) at once:

```
npm run build:all
```

Or build for each platform separately.

Browser:

```
npm run browser:build
```

Android:

```
npm run android:build
```

*NOTE: this should error out because of version issues between the LocalNotification plugin and Cordova. This can be resolved by:*

update the following file *platforms/android/src/de/appplant/cordova/plugin/localnotification/LocalNotification.java* by replacing the "sendJavascript" method (line 495) with the following:


```
private static synchronized void sendJavascript(final String js) {

        if (!deviceready) {
            eventQueue.add(js);
            return;
        }
        
        final android.webkit.WebView realView = (android.webkit.WebView) webView.getView();

        realView.post(new Runnable(){
            public void run(){
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    realView.evaluateJavascript(js, null);
                } else {
                    realView.loadUrl("javascript:" + js);
                }
            }
        });
    }
```

Finally, run:

```
platforms/android/cordova/build
```

## Developing

Serve locally for the web:

```
npm run serve
```

## Testing

### Unit testing

Test the sis_app unit test suite with the following command:

```
npm run test
```

## Travis CI

The Travis configuration file, .travis.yml, will cause Travis to run our tests
when code is pushed to GitHub.

## Additional information

### Contributors

Check them all at: [Contributors](https://github.com/cbitstech/sis_app/graphs/contributors)
