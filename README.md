# Keep Ratio

A jQuery plugin for keeping the aspect ratio

Example usage: http://loonkwil.github.io/jquery.keep-ratio/

# Install

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body>
  <div></div>

  <script src="js/jquery.js"></script>
  <script src="js/jquery.auto-grow.js"></script>
  <script type="text/javascript">
    $(function() {
      $('div').keepRatio({ ratio: 4/3, calculate: 'width' });
    });
  </script>
</body>
```
