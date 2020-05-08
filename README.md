# MyIkyoku App

This is a mobile application for MyIkyoku website. This application corresponds to Android and iOS.

## Technology Stack

* React Native
* Firebase

## Environment

install node.js(Dubnium, > 10.13.0), jdk(> 1.8.0), android sdk, gradle(5.6.2), android studio, xcode

## Getting Started for Android
### Prerequisites
1. Download gradle and extract it on any location.

   e.g. C:\gradle-5.6.2

2. Add the absolute path of gradle's 'bin' directory to PATH environment variable.

   e.g. PATH=...;C:\gradle-5.6.2\bin

3. Add the absolute path of android sdk's 'platform-tools' directory to PATH environment variable.

   e.g. PATH=...;C:\Android\Sdk\platform-tools

### Build
$ git clone https://github.com/boksInc/myikyoku-app.git

$ cd myikyoku-app/

$ npm install

$ npm install –g react-native-cli

$ react-native run-android

## Getting Started for iOS
### Prerequisites
1. Install Homebrew.

   $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Install node.js(10.x).

   $ brew search node
   
   $ brew install node@10

   $ echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.bash_profile

   $ source ~/.bash_profile

   $ node -v

   $ npm -v

3. Install Watchman.

   $ brew install watchman

4. Install React Native

   $ sudo npm install -g react-native-cli
   
5. Run XCode and select Xcode menu, then Preferences, then Locations tab. Select your Xcode version from the dropdown and exit Xcode.

### Build
$ git clone https://github.com/boksInc/myikyoku-app.git

$ cd myikyoku-app/

$ cp .env.sample .env

$ vi .babelrc

  * Replace the current line with following line

    current : "presets": ["react-native"]

	replace : "presets": ["react-native", "react-native-dotenv"]
  

$ sudo npm install

$ sudo react-native run-ios

  or
  
  sudo react-native run-ios --simulator="iPhone 8"

## Push Notification URL Rule

  * Open URL: myikyoku://app/web?url=
  * Open News Page: myikyoku://app/news
  * Open RSS Page: myikyoku://app/rss
  * Open Magazine Page: myikyoku://app/magazine
  * Open Doctor Agent Page: myikyoku://app/doctor-agent
  * Open Resinavi Page: myikyoku://app/resinavi
  * Open myClip Page: myikyoku://app/myclip
  * Open notifications Page: myikyoku://app/notifications


## Troubleshooting

### clear cache for project

$ react-native start reset--cache

### unlink & uninstall npm module

$ npm uninstall react-native-push-notification --save

$ npm unlink --no-save react-native-push-notification

### link npm module

$ react-native link

$ react-native link react-native-vector-icons

### permission issues for ios

$ sudo chmod -R 775 ios/build/

$ sudo chmod -R 775 /Users/vendor/.config/

$ sudo chmod -R 775 node_modules/

$ sudo chmod 775 ios/myikyoku/Info.plist 

### issue of 'react-native-dotenv' module for ios

$ watchman watch-del-all

$ sudo rm -rf node_modules

$ sudo npm install

$ rm -rf /tmp/metro-bundler-cache-*

$ rm -rf /tmp/haste-map-react-native-packager-*
