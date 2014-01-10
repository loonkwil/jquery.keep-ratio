# Keep Ratio

A jQuery plugin for keeping the aspect ratio

Example usage: http://loonkwil.github.io/jquery.keep-ratio/

# Install

Requirements [Bower](https://github.com/bower/bower)

```bash
bower install
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body>
  <div></div>

  <script src="bower_components/jquery/jquery.js"></script>
  <script src="bower_components/request-animation-frame/rAF.js"></script>
  <script src="bower_components/jquery.keep-ratio/src/jquery.keep-ratio.js"></script>
  <script type="text/javascript">
    $(function() {
      $('div').keepRatio({ ratio: 4/3, calculate: 'width' });
    });
  </script>
</body>
```
