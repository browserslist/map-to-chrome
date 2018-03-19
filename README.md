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

## Notes

If you know more about any of these browsers or have a better way to achieve this,
please let us know by opening an issue or contacting the email in my [GitHub profile](https://github.com/dmfrancisco).

## Contributors

The data for YaBrowser was initially extracted from [Browserslist-GA](https://github.com/dmfrancisco/browserslist-ga)
and is based on this [pull request](https://github.com/dmfrancisco/browserslist-ga/pull/2)
by [@Vasfed](https://github.com/Vasfed).
