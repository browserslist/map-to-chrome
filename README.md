<img width="520" height="68" src="./logo.svg" alt="Map-to-Chrome logo">

Map versions of Chromium-based browsers to their equivalent Chrome versions.

## About this project

This package was created for [Browserslist-GA](https://github.com/dmfrancisco/browserslist-ga),
a package that lets you use your own analytics with [Browserslist](https://github.com/ai/browserslist).
Browserslist uses data from [caniuse.com](https://github.com/Fyrd/caniuse) and so only supports the same browsers.

There are some other popular browsers however in some regions that are Chromium-based.
This package maps versions of those browsers to their equivalent Chrome/Chromium versions
so they can be tracked when used with tools such as Browserslist-GA.

## How does it work

Let's take the Yandex Browser (or YaBrowser), a popular browser in russian-speaking countries, as an example.
The Yandex Browser UA strings look like this:

```
Mozilla/5.0 (<platform>) AppleWebKit/<webkit-rev> (KHTML, like Gecko) Chrome/<chrome-version> YaBrowser/<yabrowser-version> Safari/<webkit-rev>
```

Platform can be Windows, Linux, macOS or Android (on iOS is different since all browsers use Safari's WebKit as the underlying engine).
This repository contains a file named `yabrowser.json` that maps YaBrowser major and minor versions to the equivalent Chrome versions.
The format is as follows:

```
[<yabrowser-major>, <yabrowser-minor>, <chrome-major>, <chrome-minor>]
```

## Supported browsers

* Yandex Browser (or YaBrowser), a [popular browser](http://gs.statcounter.com/browser-market-share/all/russian-federation) in russian-speaking countries
* Cốc Cốc Browser, the [2nd most popular browser](http://gs.statcounter.com/browser-market-share/all/viet-nam) in Vietnam
* QQ Browser for Windows, the [2nd most popular desktop browser](http://gs.statcounter.com/browser-market-share/desktop/china) in China
* Electron, a framework to develop cross-platform desktop applications

![Supported browsers table](./table.svg)

## Contributing

If you know more about any of these browsers or have a better way to achieve this,
please let us know by opening an issue or contacting the email in my [GitHub profile](https://github.com/dmfrancisco).

If you have data for another Chromium-based browser, please open a pull request.
Help us keep the data updated by contributing with new versions, also by opening a pull request.
Thank you in advance!

## Credits

The data for YaBrowser was initially extracted from [Browserslist-GA](https://github.com/dmfrancisco/browserslist-ga)
and is based on this [pull request](https://github.com/dmfrancisco/browserslist-ga/pull/2)
by [@Vasfed](https://github.com/Vasfed).  
Electron data was completed and confirmed thanks to the [electron-to-chromium](https://github.com/Kilian/electron-to-chromium) project.
