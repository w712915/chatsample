(function() {

  // Socket.IOに接続
  var socket = window.io.connect();

  socket.on('connect', function() {
    // 以下の処理はSocket.IOのconnectメッセージ受信後(接続確立後)
    // に行わないと失敗する
    socket.get("/message", {}, function(messages) {
      for (var i = 0; i < messages.length; i++) {
        $("#chat-timeline").append('<li>' + messages[i].text + '</li>');
      }
    });

    socket.on('message', function(message) {
      if (message.verb == "created") {
        $("#chat-timeline").append('<li>' + message.data.text + '</li>');
      }
    });
  });

  $('#chat-send-button').on('click', function() {
    var $text = $('#chat-textarea');

    var msg = $text.val();

    socket.post("/message", {
      text: msg
    }, function(res) {
      $("#chat-timeline").append('<li>' + res.text + '</li>');
      $text.val('');
    });
  });
})();
