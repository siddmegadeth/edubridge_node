iOS Build CMD for new build system for xcode
Refer to : https://github.com/apache/cordova-ios/issues/407

cordova run ios --buildFlag='-UseModernBuildSystem=0'
cordova build ios --buildFlag='-UseModernBuildSystem=0'

cordova run --target='iPad-Air-2' --buildFlag='-UseModernBuildSystem=0'





G CLient ID
837308553424-g6er1gmqbqp0tajg9j8d3vdottaat8k5.apps.googleusercontent.com

Client Secret
anbhYdH2btlbfn3kmOOTMN9K

// var app = angular.module("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
// var log = console.log.bind(console);
// var warn = console.warn.bind(console);
// var error = console.error.bind(console);

// NEWS API KEY
// Your API key is: 0611219ea6bd42ca9b54409aaa8784ee


SHA

Certificate fingerprints:
	 MD5:  B7:61:73:CB:BD:31:99:28:68:79:F0:FB:2F:1F:2B:41
	 SHA1: E6:B2:38:76:EE:81:6E:C4:0E:ED:B6:C7:93:78:D3:40:90:3D:53:32
	 SHA256: E4:C2:2A:0E:D2:82:DD:6F:AE:B4:10:6F:F4:06:8B:36:2B:66:0A:A3:FE:95:07:73:BC:72:F7:5B:93:A1:6E:A0
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions: 

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 68 EC 48 54 AC DE 15 91   24 DA 13 38 15 D8 B5 58  h.HT....$..8...X
0010: D5 F4 A3 CB                                        ....
]
]


CLIENT ID FOR GOOGLE LOGIN CORDOVA (ONLINEONE)
837308553424-lf2t3ik4o1hh9glu08tqa7k982vvt56m.apps.googleusercontent.com
com.googleusercontent.apps.lf2t3ik4o1hh9glu08tqa7k982vvt56m-837308553424

reverse  : com.googleusercontent.apps.lf2t3ik4o1hh9glu08tqa7k982vvt56m-837308553424
// Steps
cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.lf2t3ik4o1hh9glu08tqa7k982vvt56m-837308553424 --variable WEB_APPLICATION_CLIENT_ID=837308553424-g6er1gmqbqp0tajg9j8d3vdottaat8k5.apps.googleusercontent.com


// Tooling

keytool -genkey -v -keystore android.keystore -alias android-app-key -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore app-release-unsigned.apk android-app-key
 /Users/siddharthc/Downloads/android/build-tools/28.0.3/zipalign -v 4 app-release-unsigned.apk app-release.apk
// For EACCES
//     sudo chmod -R a+rwx /Library/Java/JavaVirtualMachines *
// 2- sudo chmod -R a+rwx *
//  /Users/siddharthc/Downloads/android/build-tools/28.0.3/zipalign -v 4 app-release-unsigned.apk app-release.apk
// jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore app-release-unsigned.apk android-app-key

SIgning FB App 
keytool -exportcert -alias android-app-key -keystore android.keystore | openssl sha1 -binary | openssl base64 

keytool -exportcert -alias android-app-key -keystore android.keystore | openssl sha1 -binary | openssl base64


HASH FOR FB 
5rI4du6BbsQO7bbHk3jTQJA9UzI=
5rI4du6BbsQO7bbHk3jTQJA9UzI=



// FB CLient ID And Secret for getHike
// client ID 222520495862358 Secret 40df295bea4b4a3869ec1c45d8e3223f
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="169758621576054" --variable APP_NAME="onlineone.com.app"

cordova plugin remove cordova-plugin-facebook4 

For XCODE WHen error comes
cordova plugin add cordova-plugin-facebook4@6.2.0 --variable APP_ID="169758621576054" --variable APP_NAME="onlineone.com.app"


OPEN XCODE FOr IOS
sudo open -a Xcode platforms/ios



cordova plugin add cordova-plugin-admobpro --save --variable PLAY_SERVICES_VERSION=16.0.0 --variable ADMOB_ANDROID_APP_ID=" ca-app-pub-0127739996481367~2619723084" --variable ADMOB_IOS_APP_ID="__your_admob_ios_app_id___"

cordova plugin add cordova-plugin-admobpro --save --variable PLAY_SERVICES_VERSION=16.0.0 --variable ADMOB_ANDROID_APP_ID=" ca-app-pub-0127739996481367~2619723084"  --variable ADMOB_APP_ID="ca-app-pub-0127739996481367~2619723084"


 <framework src="FBSDKCoreKit" type="podspec" spec="5.15.0" />
 <framework src="FBSDKLoginKit" type="podspec" spec="5.15.0" />
 <framework src="FBSDKShareKit" type="podspec" spec="5.15.0" />

    

ADMOB APP ID :
 ca-app-pub-0127739996481367~2619723084
 Congrats! Your app has been added to AdMob

quicknotes
Android
App ID: ca-app-pub-0127739996481367~2619723084
content_copy
Next steps
Make a note of your new app ID. You'll need to add it to your app's source code to run AdMob.
Create an ad unit to display ads in your app.
If your app is published to Google Play or the App Store, remember to come back to link your app.

Interstettial:
heck_circle
Ad unit successfully created
Note that new ad units may take up to an hour to start showing ads.  Want to test with sample ad units while you wait?
Next, place the ad unit inside your app
Follow these instructions:
Complete the instructions in the Google Mobile Ads SDK guide using this app ID:
quicknotesca-app-pub-0127739996481367~2619723084
Follow the interstitial implementation guide to integrate the SDK. You'll specify ad type and placement when you integrate the code using this ad unit ID:
quicknotes_interca-app-pub-0127739996481367/1306641410
Review the AdMob policies to ensure your implementation complies.

Banner
Next, place the ad unit inside your app
Follow these instructions:
Complete the instructions in the Google Mobile Ads SDK guide using this app ID:
quicknotesca-app-pub-0127739996481367~2619723084
Follow the banner implementation guide to integrate the SDK. You'll specify ad type, size, and placement when you integrate the code using this ad unit ID:
quicknotes_bannerca-app-pub-0127739996481367/2779505185
Review the AdMob policies to ensure your implementation complies.



Base64-encoded RSA public key to include in your app binary. Remove any spaces.



MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAom91Vj1stykFSFnsw+BIXzoW4qRq2/yc3hAhYQrfsd1mo3kLCRabXaO7I7lbxYohRUqdtJp01W9J3TVGsAa5o7k8hPGy/Wwga2IEcztizKSRFmbqpCznY8Hz2D31tTAuUaMwyVemytY8pXj4tW1eKfDFvTV9D7p95VFjFT61e1M3qJnQJMRzBr3pT52nhSZBz50Srj4WOtO23TT7V9Pk78kFkqQC6qpruoZ6+8fPLpf1HKDEDZjnqBdv4gMJIWnKAZp4zqEyfasVOw8hYPMYlk+x9Z/2xCIy1DK/HAPMlixuWfSpMLbCZKtMGk2wKWACPmunzt1jF4+J19xykrvekQIDAQAB