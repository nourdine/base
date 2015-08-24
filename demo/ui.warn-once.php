<!DOCTYPE html>
<html>
   <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style>

         body {
            margin: 0;
            padding: 0;
            font-family: arial;
         }

         .warn-once {
            background: yellow;
            padding: 10px;
         }

         .close {
            float: right;
            color: red;
            cursor: pointer;
         }
      </style>
   </head>

   <body>

      <script type="text/javascript" src="../bower_components/jquery/jquery.min.js"></script>
      <script type="text/javascript" src="../src/base/NS.js"></script>
      <script type="text/javascript" src="../src/base/persistency/Cookies.js"></script>
      <script type="text/javascript" src="../src/base/ui/WarnOnce.js"></script>
      <script type="text/javascript">

         base.ui.WarnOnce.init("Hi there, do you like our cookie policy?", "close");

      </script>

   </body>

</html>
